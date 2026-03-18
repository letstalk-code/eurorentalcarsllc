// app/api/contact/route.js — Euro LLC Contact Form → GHL
import { NextResponse } from 'next/server';

const GHL_API_KEY   = process.env.GHL_API_KEY || 'pit-0177eb2b-4e0b-42fa-b5f7-9847f550f391';
const LOCATION_ID   = 'XGeJzm18TPBBUJbQrIFA';
const GHL_BASE      = 'https://services.leadconnectorhq.com';
const GHL_HEADERS   = {
  'Authorization' : `Bearer ${GHL_API_KEY}`,
  'Content-Type'  : 'application/json',
  'Version'       : '2021-07-28',
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, vehicle, message } = body || {};

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create or update contact in GHL
    const contactPayload = {
      locationId : LOCATION_ID,
      firstName,
      lastName,
      email,
      phone      : phone || undefined,
      source     : 'Website Contact Form',
      tags       : ['website-contact'],
      customFields: [
        subject ? { id: 'pJVSIE2zLvZHZcvI8CT8', field_value: subject  } : null,
        vehicle ? { id: 'pYRKjlqKiICx3Q8aVBkf', field_value: vehicle  } : null,
        message ? { id: '7yey6Zh6slXZonsaEQ1n', field_value: message  } : null,
      ].filter(Boolean),
    };

    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
      method  : 'POST',
      headers : GHL_HEADERS,
      body    : JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();
    const contactId   = contactData?.contact?.id;

    // 2. Add note with full message details (best effort)
    if (contactId && message) {
      const noteBody =
        `📩 Website Contact Form Submission\n\n` +
        `Subject: ${subject  || 'N/A'}\n` +
        `Vehicle of Interest: ${vehicle || 'N/A'}\n\n` +
        `Message:\n${message}`;

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

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('GHL Contact Error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
