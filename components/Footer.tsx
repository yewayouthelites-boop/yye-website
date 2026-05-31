import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-yye-dark text-white px-[5%] pt-16 pb-8">
      {/* Top grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 pb-12 border-b border-white/[0.08]">

        {/* Brand col */}
        <div>
          {/* Icon mark only (no text) — sits on dark bg, original yellow+green colours work well */}
          <Link href="/" className="inline-flex no-underline mb-3" aria-label="Yewa Youth Elites home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yye-icon.svg" alt="YYE" style={{ height: 44, width: 'auto' }} />
          </Link>
          <p className="text-[13px] text-white/55 leading-[1.7] mt-4 max-w-[280px]">
            A movement committed to shaping the future of Yewa youths through education, mentorship, and cultural pride.
          </p>
        </div>

        {/* Navigate col */}
        <div>
          <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/40 mb-5">Navigate</h4>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About YYE' },
              { href: '/about#team', label: 'Executive Team' },
              { href: '/#programs', label: 'Programs' },
              { href: '/donate', label: 'Donate' },
              { href: '/#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-white/65 no-underline hover:text-yye-yellow transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus areas col */}
        <div>
          <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/40 mb-5">Focus Areas</h4>
          <ul className="list-none flex flex-col gap-2.5">
            {[
              'Education & Mentorship',
              'Youth Empowerment',
              'Cultural Promotion',
              'Community Development',
            ].map((label) => (
              <li key={label}>
                <Link href="/#programs" className="text-sm text-white/65 no-underline hover:text-yye-yellow transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-center pt-8 flex-wrap gap-4">
        <p className="text-[12px] text-white/35">© 2025 Yewa Youth Elites. All rights reserved.</p>
        <div className="flex gap-3">
          <a href="#" className="social-btn" aria-label="Instagram">ig</a>
          <a href="#" className="social-btn" aria-label="Twitter">𝕏</a>
          <a href="#" className="social-btn" aria-label="Facebook">fb</a>
        </div>
      </div>
    </footer>
  )
}
