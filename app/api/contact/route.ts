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
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').replace(/\/$/, '')
  const logoUrl = siteUrl ? `${siteUrl}/yye-wordmark-green.svg` : ''
  const textureUrl = siteUrl ? `${siteUrl}/yye-texture.jpeg` : ''
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
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f4f7f1;font-family:Arial,Helvetica,sans-serif;color:#1E1E1E;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f7f1;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2eadf;box-shadow:0 14px 36px rgba(30,30,30,0.08);">
                <tr>
                  <td style="background:#1E1E1E;padding:0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td
                          style="padding:26px 28px;background-color:#1E1E1E;${textureUrl ? `background-image:linear-gradient(90deg,rgba(30,30,30,0.96),rgba(30,30,30,0.80)),url('${textureUrl}');background-size:cover;background-position:center;` : ''}"
                        >
                          ${logoUrl ? `<img src="${logoUrl}" width="162" alt="Yewa Youth Elites" style="display:block;height:auto;margin:0 0 22px 0;background:#ffffff;border-radius:10px;padding:8px;" />` : ''}
                          <p style="margin:0 0 8px 0;color:#d4a300;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Website Contact</p>
                          <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:800;">New YYE contact message</h1>
                          <p style="margin:10px 0 0 0;color:rgba(255,255,255,0.72);font-size:14px;line-height:1.7;">A visitor submitted the contact form on the YYE website.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:0 0 16px 0;">
                          <p style="margin:0;color:#6b6b6b;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Sender Details</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
                      <tr>
                        <td style="width:38%;padding:14px 16px;background:#f7faf5;border:1px solid #e2eadf;border-right:none;border-radius:12px 0 0 12px;color:#5f6a5d;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Name</td>
                        <td style="padding:14px 16px;background:#ffffff;border:1px solid #e2eadf;border-left:none;border-radius:0 12px 12px 0;color:#1E1E1E;font-size:15px;font-weight:700;">${escapeHtml(fullName)}</td>
                      </tr>
                      <tr>
                        <td style="width:38%;padding:14px 16px;background:#f7faf5;border:1px solid #e2eadf;border-right:none;border-radius:12px 0 0 12px;color:#5f6a5d;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Email</td>
                        <td style="padding:14px 16px;background:#ffffff;border:1px solid #e2eadf;border-left:none;border-radius:0 12px 12px 0;color:#0c7d21;font-size:15px;font-weight:700;">
                          <a href="mailto:${escapeHtml(email)}" style="color:#0c7d21;text-decoration:none;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:38%;padding:14px 16px;background:#f7faf5;border:1px solid #e2eadf;border-right:none;border-radius:12px 0 0 12px;color:#5f6a5d;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;">Role</td>
                        <td style="padding:14px 16px;background:#ffffff;border:1px solid #e2eadf;border-left:none;border-radius:0 12px 12px 0;color:#1E1E1E;font-size:15px;font-weight:700;">${escapeHtml(role)}</td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:18px;">
                      <tr>
                        <td style="background:#0c7d21;border-radius:14px;padding:2px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="background:#ffffff;border-radius:12px;padding:20px;">
                                <p style="margin:0 0 10px 0;color:#0c7d21;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">Message</p>
                                <p style="margin:0;color:#1E1E1E;font-size:15px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(message)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;">
                      <tr>
                        <td style="background:#fff8d9;border:1px solid #f2df89;border-radius:14px;padding:16px;">
                          <p style="margin:0;color:#5f4a00;font-size:13px;line-height:1.6;">Reply directly to this email or use the sender email above to continue the conversation.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 28px;background:#1E1E1E;text-align:center;">
                    <p style="margin:0;color:rgba(255,255,255,0.58);font-size:12px;line-height:1.6;">Yewa Youth Elites website notification</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
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
