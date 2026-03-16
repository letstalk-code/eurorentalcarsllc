// api/booking.js — Euro LLC Reservation Request → GHL
// Vercel Serverless Function (runs server-side, API key is never exposed to browser)

const GHL_API_KEY   = process.env.GHL_API_KEY || 'pit-0177eb2b-4e0b-42fa-b5f7-9847f550f391';
const LOCATION_ID   = 'XGeJzm18TPBBUJbQrIFA';
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
    const contactPayload = {
      locationId : LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dateOfBirth || undefined,
      source     : 'Website Reservation Request',
      tags       : ['reservation-request', 'website-booking'],
      customFields: [
        vehicle        ? { key: 'vehicle_requested',   field_value: vehicle        } : null,
        pickupDate     ? { key: 'pickup_date',          field_value: pickupDate     } : null,
        returnDate     ? { key: 'return_date',          field_value: returnDate     } : null,
        pickupLocation ? { key: 'pickup_location',      field_value: pickupLocation } : null,
        driversLicense ? { key: 'drivers_license',      field_value: driversLicense } : null,
      ].filter(Boolean),
    };

    const contactRes  = await fetch(`${GHL_BASE}/contacts/`, {
      method  : 'POST',
      headers : GHL_HEADERS,
      body    : JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();
    const contactId   = contactData?.contact?.id;

    // 2. Add full reservation details as a note
    if (contactId) {
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

      // Fetch first user in location to attach note
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
    }

    res.status(200).json({ success: true });

  } catch (err) {
    console.error('GHL Booking Error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
