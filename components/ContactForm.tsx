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
  const selectedRole = ROLE_OPTIONS.find((option) => option.value === role)?.label || 'Not specified'

  return (
    <div className="bg-white rounded-[20px] p-10 border border-yye-green/[0.1]">
      <h3 className="text-[1.15rem] font-extrabold mb-6 text-yye-dark">Send us a message</h3>

      <form
        action="https://formsubmit.co/yewayouthelites@gmail.com"
        method="POST"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="_subject" value="New YYE contact message" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="Role" value={selectedRole} />

        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="First Name" label="First Name" placeholder="e.g. Adebayo" required />
          <Input name="Last Name" label="Last Name" placeholder="e.g. Okafor" required />
        </div>

        {/* Email */}
        <Input name="email" label="Email Address" type="email" placeholder="you@example.com" required />

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
            name="Message"
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
