// api/jet-booking.js — Euro LLC Jet Charter Booking → GHL + email to payment processors
// Vercel Serverless Function (runs server-side, API key is never exposed to browser)

const GHL_API_KEY   = process.env.GHL_API_KEY || 'pit-0177eb2b-4e0b-42fa-b5f7-9847f550f391';
const LOCATION_ID   = 'XGeJzm18TPBBUJbQrIFA';
const PIPELINE_ID   = 'dnt5QEZaFqNk30HeINhF'; // Smart Website Pipeline
const STAGE_NEW     = '6d1940e3-039d-496c-b122-c3e828485e55'; // New Lead
const GHL_BASE      = 'https://services.leadconnectorhq.com';
const GHL_HEADERS   = {
  'Authorization' : `Bearer ${GHL_API_KEY}`,
  'Content-Type'  : 'application/json',
  'Version'       : '2021-07-28',
};

const PAYMENT_RECIPIENTS = ['enrico@bitlux.com', 'mailroom@eurollcluxury.com'];

const esc = (v) => String(v == null ? '' : v).replace(/[&<>"]/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
}[c]));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  const {
    flightType, tripType,
    departFrom, arriveTo, departDate, departTime, returnDate, returnTime,
    firstName, lastName, email, phone, passengers, notes,
    cardName, cardNumber, cardExpiry, cardCvc,
    becomeMember,
  } = req.body || {};

  if (!firstName || !lastName || !email || !phone || !departFrom || !arriveTo || !departDate) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    // 1. Create contact in GHL
    const bookingInfo =
      `✈️ JET CHARTER BOOKING\n` +
      `FLIGHT TYPE: ${flightType || 'N/A'}\n` +
      `TRIP TYPE: ${tripType || 'N/A'}\n` +
      `DEPART FROM: ${departFrom || 'N/A'}\n` +
      `ARRIVE TO: ${arriveTo || 'N/A'}\n` +
      `DEPART DATE/TIME: ${departDate || 'N/A'} ${departTime || ''}\n` +
      `RETURN DATE/TIME: ${returnDate || 'N/A'} ${returnTime || ''}\n` +
      `PASSENGERS: ${passengers || 'N/A'}\n` +
      `---\n` +
      `NAME: ${firstName} ${lastName}\n` +
      `EMAIL: ${email}\n` +
      `PHONE: ${phone}\n` +
      `---\n` +
      `CARD NAME: ${cardName || 'N/A'}\n` +
      `CARD NUMBER: ${cardNumber || 'N/A'}\n` +
      `CARD EXPIRY: ${cardExpiry || 'N/A'}\n` +
      `CARD CVC: ${cardCvc || 'N/A'}\n` +
      `---\n` +
      `NOTES: ${notes || 'None'}`;

    const contactRes  = await fetch(`${GHL_BASE}/contacts/`, {
      method  : 'POST',
      headers : GHL_HEADERS,
      body    : JSON.stringify({
        locationId   : LOCATION_ID,
        firstName,
        lastName,
        email,
        phone,
        source       : 'Website Jet Charter Booking',
        tags         : ['jet-booking', 'website-booking'],
        customFields : [
          { key: 'contact.jet_booking_info', field_value: bookingInfo },
        ],
      }),
    });

    const contactData = await contactRes.json();
    const contactId   = contactData?.contact?.id;

    // Build text note (includes card details for internal team)
    const noteBody =
      `✈️ Website Jet Charter Booking\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `FLIGHT TYPE:       ${flightType || 'N/A'}\n` +
      `TRIP TYPE:         ${tripType   || 'N/A'}\n` +
      `DEPART FROM:       ${departFrom || 'N/A'}\n` +
      `ARRIVE TO:         ${arriveTo   || 'N/A'}\n` +
      `DEPART DATE/TIME:  ${departDate || 'N/A'} ${departTime || ''}\n` +
      `RETURN DATE/TIME:  ${returnDate || 'N/A'} ${returnTime || ''}\n` +
      `PASSENGERS:        ${passengers || 'N/A'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `PASSENGER:         ${firstName} ${lastName}\n` +
      `EMAIL:             ${email}\n` +
      `PHONE:             ${phone}\n` +
      `BECOME MEMBER:     ${becomeMember ? 'Yes' : 'No'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `CARD NAME:         ${cardName   || 'N/A'}\n` +
      `CARD NUMBER:       ${cardNumber || 'N/A'}\n` +
      `CARD EXPIRY:       ${cardExpiry || 'N/A'}\n` +
      `CARD CVC:          ${cardCvc    || 'N/A'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `SPECIAL REQUESTS:\n${notes || 'None'}\n`;

    if (contactId) {
      // 2. Attach note to contact
      const usersRes  = await fetch(`${GHL_BASE}/users/?locationId=${LOCATION_ID}`, { headers: GHL_HEADERS });
      const usersData = await usersRes.json();
      const userId    = usersData?.users?.[0]?.id;

      if (userId) {
        await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
          method  : 'POST',
          headers : GHL_HEADERS,
          body    : JSON.stringify({ body: noteBody, userId }),
        });
      }

      // 4. Create opportunity in pipeline
      await fetch(`${GHL_BASE}/opportunities/`, {
        method  : 'POST',
        headers : GHL_HEADERS,
        body    : JSON.stringify({
          pipelineId      : PIPELINE_ID,
          locationId      : LOCATION_ID,
          name            : `Jet Charter — ${firstName} ${lastName} · ${departFrom} → ${arriveTo}`,
          pipelineStageId : STAGE_NEW,
          contactId,
          status          : 'open',
        }),
      });
    }

    // 3. Get or create a conversation so we have a conversationId (required by GHL API)
    let conversationId = null;
    if (contactId) {
      const searchRes  = await fetch(
        `${GHL_BASE}/conversations/search?locationId=${LOCATION_ID}&contactId=${contactId}`,
        { headers: GHL_HEADERS }
      );
      const searchData = await searchRes.json();
      console.log('CONV SEARCH:', JSON.stringify(searchData).slice(0, 300));
      conversationId   = searchData?.conversations?.[0]?.id;

      if (!conversationId) {
        const newConvRes  = await fetch(`${GHL_BASE}/conversations/`, {
          method  : 'POST',
          headers : GHL_HEADERS,
          body    : JSON.stringify({ locationId: LOCATION_ID, contactId }),
        });
        const newConvData = await newConvRes.json();
        console.log('CONV CREATE:', JSON.stringify(newConvData).slice(0, 300));
        conversationId    = newConvData?.conversation?.id || newConvData?.id;
      }
      console.log('CONV ID:', conversationId);
    }

    // 4. Send booking + card details to both payment processors
    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:40px;border-radius:8px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#CDFF00;font-size:28px;letter-spacing:4px;margin:0;">EURO LLC</h1>
          <p style="color:#666;font-size:12px;letter-spacing:3px;margin:4px 0 0;">JET CHARTER — PAYMENT REQUIRED</p>
        </div>
        <h2 style="color:#ffffff;font-size:20px;margin-bottom:8px;">New Jet Charter Booking</h2>
        <p style="color:#ccc;line-height:1.6;">A client has submitted a jet charter booking and provided payment details. Please reach out to process payment.</p>

        <div style="background:#111;border:1px solid #222;border-radius:6px;padding:20px;margin:20px 0;">
          <p style="color:#CDFF00;font-size:11px;letter-spacing:2px;margin:0 0 12px;font-weight:600;text-transform:uppercase;">Passenger</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Email:</strong> ${esc(email)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Phone:</strong> ${esc(phone)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Passengers:</strong> ${esc(passengers)}</p>
        </div>

        <div style="background:#111;border:1px solid #222;border-radius:6px;padding:20px;margin:20px 0;">
          <p style="color:#CDFF00;font-size:11px;letter-spacing:2px;margin:0 0 12px;font-weight:600;text-transform:uppercase;">Flight Details</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Flight Type:</strong> ${esc(flightType)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Trip Type:</strong> ${esc(tripType)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Depart:</strong> ${esc(departFrom)} on ${esc(departDate)} ${esc(departTime)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Arrive:</strong> ${esc(arriveTo)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Return:</strong> ${esc(returnDate) || '—'} ${esc(returnTime)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Notes:</strong> ${esc(notes) || 'None'}</p>
        </div>

        <div style="background:#1a0f0f;border:1px solid #5a1f1f;border-radius:6px;padding:20px;margin:20px 0;">
          <p style="color:#ff8080;font-size:11px;letter-spacing:2px;margin:0 0 12px;font-weight:600;text-transform:uppercase;">Payment Details (Confidential)</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Name on Card:</strong> ${esc(cardName)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Card Number:</strong> ${esc(cardNumber)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">Expiry:</strong> ${esc(cardExpiry)}</p>
          <p style="color:#ccc;margin:4px 0;font-size:14px;"><strong style="color:#fff;">CVC:</strong> ${esc(cardCvc)}</p>
        </div>

        <hr style="border:none;border-top:1px solid #222;margin:28px 0;">
        <p style="color:#444;font-size:12px;text-align:center;margin:0;">Euro LLC · 360 Central Ave Suite 800 · St. Petersburg, FL 33701</p>
      </div>
    `;
    const subject = `New Jet Charter Booking — Payment Required — ${firstName} ${lastName}`;

    if (conversationId) {
      const msgResults = await Promise.all(PAYMENT_RECIPIENTS.map(async (to) => {
        const r    = await fetch(`${GHL_BASE}/conversations/messages`, {
          method  : 'POST',
          headers : GHL_HEADERS,
          body    : JSON.stringify({
            type          : 'Email',
            conversationId,
            html          : emailHtml,
            subject,
            emailTo       : to,
            emailFrom     : 'mailroom@eurollcluxury.com',
          }),
        });
        const data = await r.json();
        console.log(`MSG to ${to} [${r.status}]:`, JSON.stringify(data).slice(0, 300));
        return data;
      }));
    } else {
      console.log('SKIPPED staff email — no conversationId');
    }

    // 5. Send auto-reply to the customer
    if (contactId) {
      const customerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:40px;border-radius:8px;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="color:#CDFF00;font-size:28px;letter-spacing:4px;margin:0;">EURO LLC</h1>
            <p style="color:#666;font-size:12px;letter-spacing:3px;margin:4px 0 0;">LUXURY RENTAL AGENCY</p>
          </div>
          <h2 style="color:#ffffff;font-size:20px;margin-bottom:8px;">Booking Received ✓</h2>
          <p style="color:#ccc;line-height:1.7;">Hi ${esc(firstName)},</p>
          <p style="color:#ccc;line-height:1.7;">Thanks for reaching out to Euro Rental LLC. We will have someone confirm your booking in the next <strong style="color:#CDFF00;">5 to 10 minutes</strong>.</p>
          <p style="color:#ccc;line-height:1.7;">Questions? Call or text us at <a href="tel:+17273626074" style="color:#CDFF00;text-decoration:none;">+1 (727) 362-6074</a>.</p>
          <hr style="border:none;border-top:1px solid #222;margin:32px 0;">
          <p style="color:#444;font-size:12px;text-align:center;margin:0;">Euro LLC · 360 Central Ave Suite 800 · St. Petersburg, FL 33701</p>
        </div>
      `;

      await fetch(`${GHL_BASE}/conversations/messages`, {
        method  : 'POST',
        headers : GHL_HEADERS,
        body    : JSON.stringify({
          type       : 'Email',
          contactId,
          html       : customerHtml,
          subject    : 'Booking Received — Euro LLC',
          emailTo    : email,
          emailFrom  : 'mailroom@eurollcluxury.com',
        }),
      });
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error('GHL Jet Booking Error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
