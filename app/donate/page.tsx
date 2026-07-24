import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiAcademicCap,
  HiGlobeAlt,
  HiBuildingLibrary,
  HiUsers,
} from 'react-icons/hi2'
import RevealWrapper from '@/components/RevealWrapper'
import DonateForm from '@/components/DonateForm'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support Yewa Youth Elites. Every contribution helps us reach more Yewa youths, deliver more programs, and preserve our cultural heritage.',
}

const impactTiers = [
  { amount: '₦50,000', desc: 'Provides learning materials for students during outreach' },
  { amount: '₦200,000', desc: 'Covers transport and logistics for a school outreach visit' },
  { amount: '₦500,000', desc: 'Sponsor a skill development workshop' },
  { amount: '₦1,000,000', desc: 'Funds a full community outreach session in a local school' },
  { amount: '₦5,000,000', desc: 'Powers a cultural event or mentorship program from start to finish' },
]

const wayCards = [
  { icon: <HiAcademicCap size={40} />,    title: 'Fund Education',   desc: 'Support academic materials, school visits, and mentorship programs that help Yewa students succeed and stay in school.' },
  { icon: <HiGlobeAlt size={40} />,       title: 'Empower Youth',    desc: 'Fund skills workshops, career guidance sessions, and opportunities that prepare youth for a competitive, modern world.' },
  { icon: <HiBuildingLibrary size={40} />,title: 'Preserve Culture', desc: 'Help us organise cultural events and heritage initiatives that keep the Yewa identity alive and celebrated for generations.' },
  { icon: <HiUsers size={40} />,          title: 'Become a Partner', desc: 'Organisations and businesses can partner with YYE to co-sponsor programs and maximise community impact across Yewa.' },
]

export default function DonatePage() {
  return (
    <>
      {/* ══ PAGE HERO ════════════════════════════════════════════════ */}
      <div className="relative bg-yye-cream px-[5%] pt-[140px] pb-20 overflow-hidden" style={{ backgroundImage: "url('/yye-icon.svg')", backgroundRepeat: 'repeat', backgroundSize: '90px auto' }}><div className="absolute inset-0 bg-yye-cream/[0.92] pointer-events-none" />
        <div className="relative z-[2] max-w-[700px] m-auto text-center">
          
          <h1
            className="font-extrabold text-yye-dark leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Your generosity changes lives.
          </h1>
          <p className="text-base text-yye-dark/65 leading-[1.7] max-w-[540px] mx-auto">
            Every contribution helps us reach more Yewa youths, deliver more programs, and preserve our cultural heritage for future generations. No amount is too small.
          </p>
        </div>
      </div>

      {/* ══ IMPACT STRIP ════════════════════════════════════════════ */}
      <section id="impact" className="yye-pattern bg-yye-dark px-[5%] py-20">
        <RevealWrapper className="text-center mb-10">
          <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase text-yye-yellow bg-yye-yellow/[0.12] px-[14px] py-[5px] rounded-full mb-4">
            What Your Money Does
          </span>
          <h2 className="section-title text-center text-white mb-0">See the real impact of your donation.</h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {impactTiers.map(({ amount, desc }, i) => (
            <RevealWrapper key={amount} delay={i * 70}>
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-[16px] p-6 h-full">
                <div className="text-[1.8rem] font-extrabold text-yye-yellow mb-2">{amount}</div>
                <p className="text-[13px] text-white/70 leading-[1.5]">{desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ══ DONATION FORM SECTION ════════════════════════════════════ */}
      <section id="give" className="bg-yye-light px-[5%] py-24">
        <RevealWrapper className="text-center mb-12">
          <span className="section-tag">Make a Donation</span>
          <h2 className="section-title text-center">Give today. Transform tomorrow.</h2>
          <p className="section-sub mx-auto text-center">
            Choose an amount, fill in your details, and we&apos;ll ensure your contribution reaches where it matters most.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">

          {/* Donate form client component */}
          <RevealWrapper>
            <DonateForm />
          </RevealWrapper>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">

            {/* Bank transfer card */}
            <RevealWrapper>
              <div className="bg-white rounded-[20px] p-3 sm:p-8 border border-yye-green/[0.1]">
                <h3 className="text-[1.1rem] font-extrabold mb-1">Bank Transfer</h3>
                <p className="text-[13px] text-yye-gray leading-[1.6] mb-5">
                  Prefer to pay directly to our account? Transfer and send us your receipt.
                </p>
                {[
                  { label: 'Account Name', value: 'Yewa Youth Elites' },
                  { label: 'Account Number', value: 'Account details coming soon' },
                  { label: 'Bank', value: 'Bank details coming soon' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center px-4 py-3 bg-yye-light rounded-[10px] border border-yye-green/[0.08] text-[13px] mb-2"
                  >
                    <span className="text-yye-gray">{label}</span>
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
                <p className="text-[12px] text-yye-gray mt-3 leading-[1.6]">
                  After transferring, please email{' '}
                  <strong>yewayouthelites@gmail.com</strong>{' '}
                  with your full name and amount donated.
                </p>
              </div>
            </RevealWrapper>

            {/* Why donate card */}
            <RevealWrapper delay={80}>
              <div className="bg-yye-dark rounded-[20px]  p-3 sm:p-8">
                <h3 className="text-base font-extrabold text-yye-yellow mb-5 leading-[1.3]">
                  Your money goes directly to Yewa youth.
                </h3>
                {[
                  '100% of donations support YYE programs and community initiatives',
                  'Donors receive updates on how their contributions are being used',
                  'All gifts, large or small, make a real difference in young lives',
                  'YYE is a registered non-profit committed to transparency and accountability',
                ].map((text) => (
                  <div key={text} className="flex gap-3 items-start mb-3">
                    <span className="text-yye-green text-[18px] mt-0.5">✓</span>
                    <p className="text-[13px] text-white/75 leading-[1.5]">{text}</p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ══ WAYS TO GIVE ═════════════════════════════════════════════ */}
      <section id="ways" className="bg-white px-[5%] py-24">
        <RevealWrapper className="text-center mb-12">
          <span className="section-tag">Other Ways to Help</span>
          <h2 className="section-title text-center">There is more than one way to give.</h2>
          <p className="section-sub mx-auto text-center">
            Whether through money, time, or skills, every form of support moves YYE&apos;s mission forward.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wayCards.map(({ icon, title, desc }, i) => (
            <RevealWrapper key={title} delay={i * 80}>
              <div className="bg-yye-light border border-yye-green/[0.1] rounded-[16px] p-[1.8rem] transition-all duration-200 hover:-translate-y-px hover:shadow-card-hover h-full">
                <div className="w-[68px] h-[68px] rounded-[16px] bg-yye-green/[0.08] flex items-center justify-center text-yye-green mb-5">{icon}</div>
                <h4 className="text-base font-extrabold mb-2">{title}</h4>
                <p className="text-[13px] text-yye-gray leading-[1.6]">{desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>
    </>
  )
}
