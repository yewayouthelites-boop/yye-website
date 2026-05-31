'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const ROLE_OPTIONS = [
  { label: 'Student', value: 'student' },
  { label: 'Mentor / Professional', value: 'mentor' },
  { label: 'Community Member', value: 'community' },
  { label: 'Potential Partner / Sponsor', value: 'partner' },
  { label: 'Other', value: 'other' },
]

export default function ContactForm() {
  const [role, setRole] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.1] text-center py-16">
        <div className="w-16 h-16 bg-yye-green/[0.08] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-yye-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-extrabold text-yye-dark text-lg mb-2">Message received!</p>
        <p className="text-sm text-yye-gray leading-[1.6]">
          Thank you for reaching out. The YYE team will be in touch soon.
        </p>
        <Button
          variant="link-color"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="mt-6"
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.1]">
      <h3 className="text-[1.15rem] font-extrabold mb-6 text-yye-dark">Send us a message</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name" placeholder="e.g. Adebayo" required />
          <Input label="Last Name" placeholder="e.g. Okafor" required />
        </div>

        {/* Email */}
        <Input label="Email Address" type="email" placeholder="you@example.com" required />

        {/* Custom Select for role */}
        <Select
          label="I am a…"
          options={ROLE_OPTIONS}
          placeholder="Choose your role"
          value={role}
          onChange={setRole}
        />

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-yye-gray uppercase tracking-[0.05em]">
            Message
          </label>
          <textarea
            placeholder="Tell us how you'd like to get involved…"
            required
            className="w-full px-4 py-3 rounded-[10px] border border-yye-green/[0.18] bg-white font-sans text-sm text-yye-dark placeholder:text-gray-400 outline-none transition-all resize-y min-h-[110px] focus:border-yye-green focus:ring-1 focus:ring-yye-green/[0.15]"
          />
        </div>

        <Button iconRight type="submit" fullWidth className="mt-1">
          Send Message 
        </Button>
      </form>
    </div>
  )
}
