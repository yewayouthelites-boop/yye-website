'use client'

import { useState } from 'react'
import { HiHeart } from 'react-icons/hi2'
import { Button } from '@/components/ui/Button'

const PRESET_AMOUNTS = ['5000', '10000', '20000', '50000', '100000']
const FREQUENCIES = ['One-time', 'Monthly', 'Annually']

export default function DonateForm() {
  const [frequency, setFrequency] = useState('One-time')
  const [selectedAmount, setSelectedAmount] = useState('10000')
  const [customAmount, setCustomAmount] = useState('10000')
  const [submitted, setSubmitted] = useState(false)

  const handleAmountSelect = (val: string) => {
    setSelectedAmount(val)
    if (val) setCustomAmount(val)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customAmount) {
      alert('Please select or enter a donation amount.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.12] text-center py-16">
        <div className="flex justify-center mb-4 text-yye-yellow"><HiHeart size={56} /></div>
        <p className="font-extrabold text-yye-dark text-xl mb-2">
          Thank you for your generous gift!
        </p>
        <p className="text-sm text-yye-gray mb-1">
          Donation of <span className="font-bold text-yye-dark">₦{parseInt(customAmount || '0').toLocaleString()}</span>
        </p>
        <p className="text-sm text-yye-gray">The YYE team will be in touch with payment details shortly.</p>
        <Button
          variant="link-color"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="mt-8"
        >
          Make another donation
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.12]">
      <h3 className="text-[1.3rem] font-extrabold mb-1">Make a donation</h3>
      <p className="text-sm text-yye-gray mb-6">Every naira goes directly to YYE programs and initiatives.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Frequency */}
        <div>
          <label className="form-label mb-2">Frequency</label>
          <div className="flex gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={[
                  'flex-1 py-[0.6rem] border rounded-[8px] text-[13px] font-semibold cursor-pointer transition-all duration-200',
                  frequency === f
                    ? 'bg-yye-green/[0.08] text-yye-green border-yye-green'
                    : 'bg-white text-yye-gray border-yye-green/20 hover:border-yye-green/50',
                ].join(' ')}
              >
                {f}
              </button>
            ))}
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
                className={[
                  'py-3 border rounded-[10px] text-[15px] font-bold transition-all duration-200',
                  selectedAmount === amt
                    ? 'bg-yye-green text-white border-yye-green'
                    : 'bg-white text-yye-dark border-yye-green/20 hover:bg-yye-green hover:text-white hover:border-yye-green',
                ].join(' ')}
              >
                ₦{parseInt(amt).toLocaleString()}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setSelectedAmount(''); setCustomAmount('') }}
              className={[
                'py-3 border rounded-[10px] text-[15px] font-bold transition-all duration-200',
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
              className="flex-1 border border-yye-green/[0.15] px-4 py-3 rounded-r-[10px] font-sans text-[15px] text-yye-dark bg-white outline-none focus:border-yye-green transition-colors duration-200"
            />
          </div>
        </div>

        <hr className="border-none border-t border-yye-green/[0.1] my-1" />

        {/* Personal details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="form-label">First Name</label>
            <input type="text" placeholder="e.g. Adebayo" className="form-input" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="form-label">Last Name</label>
            <input type="text" placeholder="e.g. Okafor" className="form-input" required />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Email Address</label>
          <input type="email" placeholder="you@example.com" className="form-input" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Phone (optional)</label>
          <input type="tel" placeholder="+234 800 000 0000" className="form-input" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label">Message to YYE (optional)</label>
          <textarea
            placeholder="Share why you're supporting us..."
            className="form-input resize-y min-h-[80px]"
          />
        </div>

        <Button type="submit" variant="accent" size="xl" fullWidth className="mt-2">
          Donate Now →
        </Button>

        <p className="text-center text-[12px] text-yye-gray">
          🔒 Secure &amp; encrypted &nbsp;·&nbsp; Your data is safe with us
        </p>
      </form>
    </div>
  )
}
