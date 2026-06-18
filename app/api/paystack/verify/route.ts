import { NextResponse } from 'next/server'

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
  const expectedAmountKobo = Number(transaction?.metadata?.expected_amount_kobo)
  const paidAmountKobo = Number(transaction?.amount)
  const currency = String(transaction?.currency || '')
  const status = String(transaction?.status || '')

  if (status !== 'success') {
    return NextResponse.json(
      { error: 'Payment was not successful.' },
      { status: 400 },
    )
  }

  if (currency !== 'NGN') {
    return NextResponse.json(
      { error: 'Payment currency is invalid.' },
      { status: 400 },
    )
  }

  if (!expectedAmountKobo || paidAmountKobo !== expectedAmountKobo) {
    return NextResponse.json(
      { error: 'Payment amount could not be verified.' },
      { status: 400 },
    )
  }

  return NextResponse.json({
    paid: true,
    reference: transaction.reference,
    amount: paidAmountKobo / 100,
    amountKobo: paidAmountKobo,
    email: transaction.customer?.email || '',
  })
}
