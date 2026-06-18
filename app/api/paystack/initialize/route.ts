import { NextResponse } from 'next/server'

const PAYSTACK_INITIALIZE_ENDPOINT = 'https://api.paystack.co/transaction/initialize'
const MIN_DONATION_NAIRA = 1000

type InitializePayload = {
  amount?: string | number
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Paystack is not configured.' },
      { status: 500 },
    )
  }

  let payload: InitializePayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const amount = Number(payload.amount)
  const firstName = String(payload.firstName || '').trim()
  const lastName = String(payload.lastName || '').trim()
  const email = String(payload.email || '').trim()
  const phone = String(payload.phone || '').trim()
  const message = String(payload.message || '').trim()

  if (!Number.isFinite(amount) || amount < MIN_DONATION_NAIRA) {
    return NextResponse.json(
      { error: `Donation amount must be at least ₦${MIN_DONATION_NAIRA.toLocaleString()}.` },
      { status: 400 },
    )
  }

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: 'Please enter your first and last name.' },
      { status: 400 },
    )
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const amountKobo = Math.round(amount * 100)
  const fullName = `${firstName} ${lastName}`.trim()

  const response = await fetch(PAYSTACK_INITIALIZE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountKobo,
      email,
      currency: 'NGN',
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      metadata: {
        donor_name: fullName,
        first_name: firstName,
        last_name: lastName,
        phone,
        message,
        frequency: 'One-time',
        expected_amount_kobo: amountKobo,
      },
    }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.status) {
    return NextResponse.json(
      { error: data?.message || 'Unable to initialize payment.' },
      { status: 502 },
    )
  }

  return NextResponse.json({
    accessCode: data.data.access_code,
    reference: data.data.reference,
    amount,
    amountKobo,
  })
}
