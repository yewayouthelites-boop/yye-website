export const MIN_DONATION_NAIRA = 1000

export type InitializePayload = {
  amount?: string | number
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  message?: string
}

export type NormalizedInitializePayload = {
  amount: number
  amountKobo: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  message: string
}

export type VerifiedTransactionPayload = {
  status?: unknown
  currency?: unknown
  amount?: unknown
  metadata?: {
    expected_amount_kobo?: unknown
  } | null
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function generateDonationReference() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 10).toUpperCase()

  return `YYE-donation-${timestamp}-${random}`
}

export function validateInitializePayload(payload: InitializePayload):
  | { ok: true; value: NormalizedInitializePayload }
  | { ok: false; error: string } {
  const amount = Number(payload.amount)
  const firstName = String(payload.firstName || '').trim()
  const lastName = String(payload.lastName || '').trim()
  const email = String(payload.email || '').trim()
  const phone = String(payload.phone || '').trim()
  const message = String(payload.message || '').trim()

  if (!Number.isFinite(amount) || amount < MIN_DONATION_NAIRA) {
    return {
      ok: false,
      error: `Donation amount must be at least ₦${MIN_DONATION_NAIRA.toLocaleString()}.`,
    }
  }

  if (!firstName || !lastName) {
    return { ok: false, error: 'Please enter your first and last name.' }
  }

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const amountKobo = Math.round(amount * 100)
  const fullName = `${firstName} ${lastName}`.trim()

  return {
    ok: true,
    value: {
      amount,
      amountKobo,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      message,
    },
  }
}

export function validateVerifiedTransaction(transaction: VerifiedTransactionPayload):
  | { ok: true; amountKobo: number }
  | { ok: false; error: string } {
  const expectedAmountKobo = Number(transaction?.metadata?.expected_amount_kobo)
  const paidAmountKobo = Number(transaction?.amount)
  const currency = String(transaction?.currency || '')
  const status = String(transaction?.status || '')

  if (status !== 'success') {
    return { ok: false, error: 'Payment was not successful.' }
  }

  if (currency !== 'NGN') {
    return { ok: false, error: 'Payment currency is invalid.' }
  }

  if (!expectedAmountKobo || paidAmountKobo !== expectedAmountKobo) {
    return { ok: false, error: 'Payment amount could not be verified.' }
  }

  return { ok: true, amountKobo: paidAmountKobo }
}
