import { NextResponse } from 'next/server'

const RESEND_EMAIL_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_TO_EMAIL = 'yewayouthelites@gmail.com'
const DEFAULT_FROM_EMAIL = 'YYE Website <onboarding@resend.dev>'

type ContactPayload = {
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  message?: string
  company?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 500 },
    )
  }

  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const firstName = String(payload.firstName || '').trim()
  const lastName = String(payload.lastName || '').trim()
  const email = String(payload.email || '').trim()
  const role = String(payload.role || 'Not specified').trim()
  const message = String(payload.message || '').trim()
  const company = String(payload.company || '').trim()

  if (company) {
    return NextResponse.json({ ok: true })
  }

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const fullName = `${firstName} ${lastName}`.trim()
  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL
  const subject = `New YYE contact message from ${fullName}`
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Role: ${role}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const html = `
    <h2>New YYE contact message</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <tr>
        <td style="font-weight:bold;border:1px solid #ddd;">Name</td>
        <td style="border:1px solid #ddd;">${escapeHtml(fullName)}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;border:1px solid #ddd;">Email</td>
        <td style="border:1px solid #ddd;">${escapeHtml(email)}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;border:1px solid #ddd;">Role</td>
        <td style="border:1px solid #ddd;">${escapeHtml(role)}</td>
      </tr>
      <tr>
        <td style="font-weight:bold;border:1px solid #ddd;">Message</td>
        <td style="border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(message)}</td>
      </tr>
    </table>
  `

  const response = await fetch(RESEND_EMAIL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      html,
      text,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    return NextResponse.json(
      { error: error?.message || 'Unable to send message right now.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
