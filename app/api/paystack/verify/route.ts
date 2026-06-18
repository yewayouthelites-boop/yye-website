import { NextResponse } from 'next/server'
import { validateVerifiedTransaction } from '../paystack-utils'

const PAYSTACK_VERIFY_ENDPOINT = 'https://api.paystack.co/transaction/verify'

type VerifyPayload = {
  reference?: string
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Paystack is not configured.' },
      { status: 500 },
    )
  }

  let payload: VerifyPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const reference = String(payload.reference || '').trim()

  if (!reference) {
    return NextResponse.json(
      { error: 'Payment reference is required.' },
      { status: 400 },
    )
  }

  const response = await fetch(`${PAYSTACK_VERIFY_ENDPOINT}/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json().catch(() => null)

  if (!response.ok || !result?.status) {
    return NextResponse.json(
      { error: result?.message || 'Unable to verify payment.' },
      { status: 502 },
    )
  }

  const transaction = result.data
  const verified = validateVerifiedTransaction(transaction)

  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: 400 })
  }

  return NextResponse.json({
    paid: true,
    reference: transaction.reference,
    amount: verified.amountKobo / 100,
    amountKobo: verified.amountKobo,
    email: transaction.customer?.email || '',
  })
}
