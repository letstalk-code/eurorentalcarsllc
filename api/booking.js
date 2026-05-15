// api/booking.js — Euro LLC Reservation Request → GHL
// Vercel Serverless Function (runs server-side, API key is never exposed to browser)

const { spamCheck } = require('./_spam-check.js');

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

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  const check = await spamCheck(req);
  if (!check.ok) {
    if (check.silent) { res.status(200).json({ success: true }); return; }
    res.status(400).json({ error: check.reason || 'Verification failed' });
    return;
  }

  const {
    firstName, lastName, email, phone,
    dateOfBirth, vehicle, pickupDate, returnDate,
    pickupTime, pickupLocation,
    driversLicense, licenseState, licenseExpiry,
    notes,
  } = req.body || {};

  if (!firstName || !lastName || !email || !phone) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    // 1. Create contact in GHL
    const contactRes  = await fetch(`${GHL_BASE}/contacts/`, {
      method  : 'POST',
      headers : GHL_HEADERS,
      body    : JSON.stringify({
        locationId : LOCATION_ID,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth || undefined,
        source     : 'Website Reservation Request',
        tags       : ['reservation-request', 'website-booking'],
        customFields: [
          pickupDate     ? { key: 'contact.pickup_date',      field_value: pickupDate     } : null,
          returnDate     ? { key: 'contact.return_date',      field_value: returnDate     } : null,
          vehicle        ? { key: 'contact.vehicle_requested', field_value: vehicle       } : null,
          pickupLocation ? { key: 'contact.pickup_location',  field_value: pickupLocation } : null,
        ].filter(Boolean),
      }),
    });

    const contactData = await contactRes.json();
    const contactId   = contactData?.contact?.id;

    if (contactId) {
      // 2. Add full reservation details as a note
      const noteBody =
        `🚗 Website Reservation Request\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `VEHICLE REQUESTED: ${vehicle        || 'N/A'}\n` +
        `PICK-UP DATE:      ${pickupDate     || 'N/A'}\n` +
        `RETURN DATE:       ${returnDate     || 'N/A'}\n` +
        `PICK-UP TIME:      ${pickupTime     || 'N/A'}\n` +
        `PICK-UP LOCATION:  ${pickupLocation || 'N/A'}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `DATE OF BIRTH:     ${dateOfBirth    || 'N/A'}\n` +
        `DRIVER'S LICENSE:  ${driversLicense || 'N/A'}\n` +
        `LICENSE STATE:     ${licenseState   || 'N/A'}\n` +
        `LICENSE EXPIRY:    ${licenseExpiry  || 'N/A'}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `SPECIAL REQUESTS:\n${notes || 'None'}\n`;

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

      // 3. Send auto-reply email to customer
      const emailHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:40px;border-radius:8px;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="color:#CDFF00;font-size:28px;letter-spacing:4px;margin:0;">EURO LLC</h1>
            <p style="color:#666;font-size:12px;letter-spacing:3px;margin:4px 0 0;">LUXURY RENTAL AGENCY</p>
          </div>
          <h2 style="color:#ffffff;font-size:20px;margin-bottom:8px;">Reservation Request Received ✓</h2>
          <p style="color:#ccc;line-height:1.7;">Hi ${firstName},</p>
          <p style="color:#ccc;line-height:1.7;">Thank you for your reservation request! Our team will review your submission and contact you within <strong style="color:#CDFF00;">24 hours</strong> to confirm availability and next steps.</p>
          <div style="background:#111;border:1px solid #222;border-radius:6px;padding:20px;margin:24px 0;">
            <p style="color:#CDFF00;font-size:11px;letter-spacing:2px;margin:0 0 12px;font-weight:600;text-transform:uppercase;">Your Request Summary</p>
            <p style="color:#ccc;margin:6px 0;font-size:14px;"><strong style="color:#fff;">Vehicle:</strong> ${vehicle || 'N/A'}</p>
            <p style="color:#ccc;margin:6px 0;font-size:14px;"><strong style="color:#fff;">Pick-Up Date:</strong> ${pickupDate || 'N/A'}</p>
            <p style="color:#ccc;margin:6px 0;font-size:14px;"><strong style="color:#fff;">Return Date:</strong> ${returnDate || 'N/A'}</p>
            <p style="color:#ccc;margin:6px 0;font-size:14px;"><strong style="color:#fff;">Pick-Up Location:</strong> ${pickupLocation || 'N/A'}</p>
          </div>
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
          html       : emailHtml,
          subject    : 'Reservation Request Received — Euro LLC',
          emailTo    : email,
          emailFrom  : 'mailroom@eurollcluxury.com',
        }),
      });

      // 4. Create opportunity in pipeline (New Lead stage)
      await fetch(`${GHL_BASE}/opportunities/`, {
        method  : 'POST',
        headers : GHL_HEADERS,
        body    : JSON.stringify({
          pipelineId      : PIPELINE_ID,
          locationId      : LOCATION_ID,
          name            : `Reservation — ${firstName} ${lastName} · ${vehicle || 'Vehicle TBD'}`,
          pipelineStageId : STAGE_NEW,
          contactId,
          status          : 'open',
        }),
      });
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error('GHL Booking Error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
