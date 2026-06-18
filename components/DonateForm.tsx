'use client'

import { useState } from 'react'
import { HiHeart } from 'react-icons/hi2'
import { Button } from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import Portal from '@/components/ui/Portal'

const PRESET_AMOUNTS = ['50000', '200000', '500000', '1000000', '5000000']
const PAYSTACK_SCRIPT_SRC = 'https://js.paystack.co/v2/inline.js'

type PaymentStatus = 'idle' | 'initializing' | 'paying' | 'verifying' | 'success' | 'error'

type InitializeResponse = {
  accessCode: string
  reference: string
  amount: number
}

type VerifyResponse = {
  paid: boolean
  reference: string
  amount: number
  email: string
}

type PaystackTransaction = {
  reference?: string
  status?: string
  message?: string
}

type PaystackInline = {
  resumeTransaction: (
    accessCode: string,
    options?: {
      onSuccess?: (transaction: PaystackTransaction) => void
      onCancel?: () => void
    },
  ) => void
}

declare global {
  interface Window {
    PaystackPop?: new () => PaystackInline
  }
}

function loadPaystackScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.PaystackPop) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SCRIPT_SRC}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Paystack.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = PAYSTACK_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Unable to load Paystack.'))
    document.body.appendChild(script)
  })
}

function formatNaira(amount: string | number) {
  return `₦${Number(amount || 0).toLocaleString()}`
}

export default function DonateForm() {
  const [selectedAmount, setSelectedAmount] = useState('50000')
  const [customAmount, setCustomAmount] = useState('50000')
  const [status, setStatus] = useState<PaymentStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [verifiedDonation, setVerifiedDonation] = useState<VerifyResponse | null>(null)

  const handleAmountSelect = (val: string) => {
    setSelectedAmount(val)
    if (val) setCustomAmount(val)
  }

  const verifyPayment = async (reference: string) => {
    setStatus('verifying')

    const response = await fetch('/api/paystack/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.error || 'Unable to verify payment.')
    }

    setVerifiedDonation(data as VerifyResponse)
    setStatus('success')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setVerifiedDonation(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      amount: customAmount,
      firstName: String(formData.get('firstName') || '').trim(),
      lastName: String(formData.get('lastName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }

    if (!payload.amount || Number(payload.amount) < 100) {
      setStatus('error')
      setErrorMessage('Please select or enter a donation amount of at least ₦100.')
      return
    }

    try {
      setStatus('initializing')

      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to initialize payment.')
      }

      const initialized = data as InitializeResponse
      await loadPaystackScript()

      if (!window.PaystackPop) {
        throw new Error('Paystack could not be loaded.')
      }

      setStatus('paying')

      const paystack = new window.PaystackPop()
      paystack.resumeTransaction(initialized.accessCode, {
        onSuccess: (transaction) => {
          const reference = transaction.reference || initialized.reference
          verifyPayment(reference).catch((error) => {
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Unable to verify payment.')
          })
        },
        onCancel: () => {
          setStatus('error')
          setErrorMessage('Payment was cancelled. You can try again when you are ready.')
        },
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start payment.')
    }
  }

  const handleCloseSuccess = () => {
    setSelectedAmount('50000')
    setCustomAmount('50000')
    setVerifiedDonation(null)
    setStatus('idle')
  }

  const isBusy = status === 'initializing' || status === 'paying' || status === 'verifying'
  const buttonLabel = {
    idle: 'Donate Now ',
    initializing: 'Preparing payment...',
    paying: 'Complete payment in Paystack...',
    verifying: 'Verifying payment...',
    success: 'Donate Now ',
    error: 'Try Again ',
  }[status]

  return (
    <>
      <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.12]">
        <h3 className="text-[1.3rem] font-extrabold mb-1">Make a donation</h3>
        <p className="text-sm text-yye-gray mb-6">Every naira goes directly to YYE programs and initiatives.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="form-label mb-2">Frequency</label>
            <div className="rounded-[10px] border border-yye-green/[0.16] bg-yye-green/[0.05] px-4 py-3 text-sm font-semibold text-yye-green">
              One-time donation
            </div>
          </div>

          {/* Preset amounts */}
          <div>
            <label className="form-label mb-2">Select an amount</label>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  disabled={isBusy}
                  className={[
                    'py-3 border rounded-[10px] text-[15px] font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
                    selectedAmount === amt
                      ? 'bg-yye-green text-white border-yye-green'
                      : 'bg-white text-yye-dark border-yye-green/20 hover:bg-yye-green hover:text-white hover:border-yye-green',
                  ].join(' ')}
                >
                  {formatNaira(amt)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setSelectedAmount(''); setCustomAmount('') }}
                disabled={isBusy}
                className={[
                  'py-3 border rounded-[10px] text-[15px] font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
                  selectedAmount === ''
                    ? 'bg-yye-green text-white border-yye-green'
                    : 'bg-white text-yye-dark border-yye-green/20 hover:bg-yye-green hover:text-white hover:border-yye-green',
                ].join(' ')}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <label className="form-label mb-2">Or enter a custom amount</label>
            <div className="flex">
              <span className="bg-yye-green/[0.08] border border-r-0 border-yye-green/[0.15] px-4 py-3 rounded-l-[10px] text-[15px] font-bold text-yye-green">
                ₦
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount('') }}
                placeholder="Enter amount"
                min="100"
                disabled={isBusy}
                className="flex-1 border border-yye-green/[0.15] px-4 py-3 rounded-r-[10px] font-sans text-[15px] text-yye-dark bg-white outline-none focus:border-yye-green transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <hr className="border-none border-t border-yye-green/[0.1] my-1" />

          {/* Personal details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">First Name</label>
              <input name="firstName" type="text" placeholder="e.g. Adebayo" className="form-input" required disabled={isBusy} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Last Name</label>
              <input name="lastName" type="text" placeholder="e.g. Okafor" className="form-input" required disabled={isBusy} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" placeholder="you@example.com" className="form-input" required disabled={isBusy} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Phone (optional)</label>
            <input name="phone" type="tel" placeholder="+234 800 000 0000" className="form-input" disabled={isBusy} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Message to YYE (optional)</label>
            <textarea
              name="message"
              placeholder="Share why you're supporting us..."
              className="form-input resize-y min-h-[80px]"
              disabled={isBusy}
            />
          </div>

          <Button type="submit" variant="accent" size="xl" fullWidth className="mt-2" disabled={isBusy}>
            {buttonLabel}
          </Button>

          <p className="text-center text-[12px] text-yye-gray">
            Secure Paystack checkout &nbsp;·&nbsp; Your payment is verified before confirmation
          </p>
        </form>
      </div>

      {status === 'error' && (
        <Toast
          message={errorMessage}
          onClose={() => {
            setStatus('idle')
            setErrorMessage('')
          }}
        />
      )}

      {status === 'success' && verifiedDonation && (
        <Portal>
        <div
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-yye-light px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-success-title"
        >
          <div className="absolute inset-0 opacity-[0.05] yye-pattern" />
          <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[760px] flex-col items-center justify-center text-center">
            <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-600">
              <HiHeart size={52} />
            </div>
            <h3
              id="donation-success-title"
              className="mb-3 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.05] text-yye-dark"
            >
              Donation successful
            </h3>
            <p className="max-w-[520px] text-base leading-[1.8] text-yye-gray">
              Thank you for supporting YYE. Your payment has been verified.
            </p>
            <div className="my-8 w-full max-w-[460px] rounded-[16px] bg-white p-5 text-left shadow-card-hover">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-yye-gray">Amount</span>
                <span className="font-extrabold text-yye-dark">{formatNaira(verifiedDonation.amount)}</span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-4 text-sm">
                <span className="text-yye-gray">Reference</span>
                <span className="max-w-[210px] break-words text-right font-bold text-yye-dark">{verifiedDonation.reference}</span>
              </div>
            </div>
            <Button type="button" fullWidth onClick={handleCloseSuccess}>
              Make another donation
            </Button>
          </div>
        </div>
        </Portal>
      )}
    </>
  )
}
