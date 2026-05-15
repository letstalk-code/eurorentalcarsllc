// api/_spam-check.js — shared anti-spam helper for form endpoints
// Layer 1: honeypot field (hidden input bots auto-fill)
// Layer 2: Origin/Referer must match the site (blocks direct API POSTs from bot scripts)
// Layer 3: content heuristics — reject obvious link-spam patterns
// Layer 4: Cloudflare Turnstile token verification (if configured)
//
// Returns one of:
//   { ok: true }                              — request looks human, proceed
//   { ok: false, silent: true }               — silent drop: respond 200 OK so the bot stops retrying, but skip GHL
//   { ok: false, silent: false, reason: '' }  — Turnstile/missing-token failure; reject with 400

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || '';
const HONEYPOT_FIELD   = 'company_url';

// Allowed Origin/Referer hosts. Add your custom domain(s) here as needed.
const ALLOWED_HOSTS = [
  'eurorentalcarsllc.com',
  'www.eurorentalcarsllc.com',
  'eurollcluxury.com',
  'www.eurollcluxury.com',
  'localhost',
];

// Spam content heuristics. Most contact-form spam is link bait + CTA in the message body.
const URL_RE          = /(https?:\/\/|www\.)/i;
const BBCODE_RE       = /\[(url|link)[=\]]/i;
const CYRILLIC_RE     = /[Ѐ-ӿ]/;          // Cyrillic chars — almost never legit on an English-only US business site
const CJK_RE          = /[぀-ヿ一-鿿]/; // Japanese/Chinese — same reasoning
const SPAM_KEYWORDS   = /\b(seo services?|backlinks?|crypto investment|viagra|cialis|casino|loan offer|click here to)\b/i;

function hostFromUrl(u) {
  try { return new URL(u).hostname.toLowerCase(); } catch { return ''; }
}

function looksLikeLinkSpam(body) {
  // Concatenate all string fields and scan once.
  const blob = Object.values(body).filter(v => typeof v === 'string').join(' \n ');
  if (URL_RE.test(blob))        return true;
  if (BBCODE_RE.test(blob))     return true;
  if (CYRILLIC_RE.test(blob))   return true;
  if (CJK_RE.test(blob))        return true;
  if (SPAM_KEYWORDS.test(blob)) return true;
  return false;
}

async function spamCheck(req) {
  const body = req.body || {};

  // Layer 1: honeypot — must be empty
  if (body[HONEYPOT_FIELD]) {
    console.log('[spam-check] honeypot tripped');
    return { ok: false, silent: true };
  }

  // Layer 2: Origin/Referer check — request must come from our site
  const origin  = req.headers.origin  || '';
  const referer = req.headers.referer || '';
  const host    = hostFromUrl(origin) || hostFromUrl(referer);
  const hostOk  = host && (ALLOWED_HOSTS.includes(host) || host.endsWith('.vercel.app'));
  if (!hostOk) {
    console.log('[spam-check] bad origin:', { origin, referer, host });
    return { ok: false, silent: true };
  }

  // Layer 3: content heuristics — link bait, foreign-script bait, common spam keywords
  if (looksLikeLinkSpam(body)) {
    console.log('[spam-check] content matched spam pattern');
    return { ok: false, silent: true };
  }

  // Layer 4: Turnstile — only enforced if a secret is configured
  if (TURNSTILE_SECRET) {
    const token = body.cfTurnstileToken;
    if (!token) {
      return { ok: false, silent: false, reason: 'Missing verification token' };
    }
    try {
      const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
      const params = new URLSearchParams();
      params.append('secret',   TURNSTILE_SECRET);
      params.append('response', token);
      if (ip) params.append('remoteip', ip);

      const vRes  = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method  : 'POST',
        body    : params,
      });
      const vData = await vRes.json();
      if (!vData.success) {
        return { ok: false, silent: false, reason: 'Verification failed' };
      }
    } catch (err) {
      console.error('Turnstile verify error:', err);
      return { ok: false, silent: false, reason: 'Verification error' };
    }
  }

  return { ok: true };
}

module.exports = { spamCheck, HONEYPOT_FIELD };
