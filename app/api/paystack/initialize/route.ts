import { NextResponse } from 'next/server'
import {
  generateDonationReference,
  validateInitializePayload,
  type InitializePayload,
} from '../paystack-utils'

const PAYSTACK_INITIALIZE_ENDPOINT = 'https://api.paystack.co/transaction/initialize'

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

  const validated = validateInitializePayload(payload)

  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }

  const {
    amount,
    amountKobo,
    firstName,
    lastName,
    fullName,
    email,
    phone,
    message,
  } = validated.value
  const reference = generateDonationReference()

  const response = await fetch(PAYSTACK_INITIALIZE_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountKobo,
      email,
      reference,
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
