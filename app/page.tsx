import type { Metadata } from 'next'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Yewa Youth Elites — Raising the Next Generation of Yewa Leaders',
}

/* ── Data ────────────────────────────────────────────────────────────── */
const snapCards = [
  { icon: '🌍', title: 'Who We Are', desc: 'A non-profit movement dedicated to empowering Yewa youths with education, mentorship, and cultural pride.', link: 'Learn about YYE →', href: '/about' },
  { icon: '👥', title: 'Our Executive Team', desc: 'Meet the 7 passionate leaders driving every program and initiative across Yewa communities.', link: 'Meet the team →', href: '/about#team' },
  { icon: '🎓', title: 'Our Programs', desc: 'From school outreach to cultural events — our programs are built around real community needs.', link: 'See programs →', href: '#programs' },
  { icon: '💛', title: 'Support Our Work', desc: 'Your donation directly funds mentorship, education, and cultural preservation for Yewa youth.', link: 'Donate now →', href: '/donate' },
]

const programs = [
  { icon: '🎓', tag: 'Education', title: 'Academic Support & Outreach', desc: 'School outreach programs, mentorship sessions, and learning initiatives that give Yewa students the guidance they need to excel — from the classroom to their careers.', variant: 'featured' },
  { icon: '💡', tag: 'Empowerment', title: 'Skills & Career Development', desc: 'Equipping young Yewa people with practical skills, entrepreneurial thinking, and career guidance to help them compete in a modern world.', variant: 'default' },
  { icon: '🏺', tag: 'Culture', title: 'Cultural Promotion & Heritage', desc: 'Through events, storytelling, and community engagement, we celebrate and preserve the traditions and identity of the Yewa people for future generations.', variant: 'default' },
  { icon: '🤝', tag: 'Community', title: 'Community Development Programs', desc: 'Working with schools, local leaders, and partners to design programs that address real challenges and foster unity across Yewa communities.', variant: 'dark' },
]

/* ── Component ───────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="yye-pattern relative min-h-screen bg-yye-dark flex items-center overflow-hidden px-[5%] pt-[120px] pb-20"
      >
        {/* Soft radial glow accents — sit above the pattern layer */}
        <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-yye-green opacity-[0.18] rounded-full pointer-events-none blur-3xl" style={{ zIndex: 1 }} />
        <div className="absolute bottom-[-100px] right-[200px] w-[300px] h-[300px] bg-yye-yellow opacity-[0.12] rounded-full pointer-events-none blur-2xl" style={{ zIndex: 1 }} />

        {/* Content — above pattern (z-0) and glow (z-1) */}
        <div className="relative z-[2] max-w-[700px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yye-yellow/[0.12] border border-yye-yellow/30 text-yye-yellow px-[14px] py-1.5 rounded-full text-[12px] font-semibold tracking-[0.08em] uppercase mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-yye-yellow rounded-full" />
            Yewa Youth Elites
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold text-white leading-[1.05] tracking-[-0.02em] mb-6 animate-fade-up-1"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
          >
            Raising the{' '}
            <em className="text-yye-yellow not-italic">next generation</em>{' '}
            of Yewa leaders.
          </h1>

          {/* Sub */}
          <p
            className="text-white/65 leading-[1.7] max-w-[520px] mb-10 animate-fade-up-2"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
          >
            We empower Yewa youths through education, mentorship, and cultural pride — building a generation that is grounded in identity and ready for the world.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap animate-fade-up-3">
            <Link href="#programs" className="btn-primary">Explore Our Programs</Link>
            <Link href="/donate" className="btn-yellow">Support YYE ♥</Link>
            <Link href="/about" className="btn-outline">About Us</Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-8 border-t border-white/10 flex-wrap animate-fade-up-4">
            {[
              { num: '4+', label: 'Focus Areas' },
              { num: '7', label: 'Executives' },
              { num: '1', label: 'Shared Mission' },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[2rem] font-extrabold text-yye-yellow">{num}</span>
                <span className="text-[12px] text-white/50 font-medium tracking-[0.05em] uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SNAPSHOT ══════════════════════════════════════════════════ */}
      <section id="snapshot" className="bg-yye-light px-[5%] py-24">
        <RevealWrapper className="text-center mb-2">
          <span className="section-tag">What We Do</span>
        </RevealWrapper>
        <RevealWrapper className="text-center" delay={80}>
          <h2 className="section-title text-center">Everything YYE stands for.</h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {snapCards.map(({ icon, title, desc, link, href }, i) => (
            <RevealWrapper key={title} delay={i * 80}>
              <Link
                href={href}
                className="bg-white border border-yye-green/[0.1] rounded-[18px] p-[1.8rem] block no-underline text-yye-dark transition-all duration-200 hover:-translate-y-px hover:shadow-card-hover hover:border-yye-green/25 h-full"
              >
                <div className="text-[2rem] mb-4">{icon}</div>
                <h3 className="text-[1.05rem] font-extrabold mb-1.5">{title}</h3>
                <p className="text-[13px] text-yye-gray leading-[1.6]">{desc}</p>
                <span className="inline-block mt-[0.9rem] text-[12px] font-bold text-yye-green tracking-[0.05em]">{link}</span>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ══ PROGRAMS ══════════════════════════════════════════════════ */}
      <section id="programs" className="bg-white px-[5%] py-24">
        <RevealWrapper className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <div>
            <span className="section-tag">Programs & Initiatives</span>
            <h2 className="section-title mb-0">What we do on the ground.</h2>
          </div>
          <Link href="#contact" className="btn-primary">Get Involved</Link>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map(({ icon, tag, title, desc, variant }, i) => (
            <RevealWrapper key={title} delay={i * 80}>
              <ProgramCard icon={icon} tag={tag} title={title} desc={desc} variant={variant as 'featured' | 'dark' | 'default'} />
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ══ MISSION / VISION ══════════════════════════════════════════ */}
      <section className="yye-pattern bg-yye-dark px-[5%] py-24">
        <div className="text-center mb-2">
          <span className="section-tag">Our Purpose</span>
        </div>
        <RevealWrapper>
          <h2 className="section-title text-center text-white mb-0">Driven by mission. Guided by vision.</h2>
        </RevealWrapper>

        <RevealWrapper delay={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <div className="bg-yye-green rounded-[20px] p-10 border border-white/[0.08]">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70 mb-3">Our Mission</p>
              <h3 className="text-[1.5rem] font-extrabold text-white leading-[1.2] mb-3">
                Empowering Yewa youths through education, mentorship, and culture.
              </h3>
              <p className="text-sm leading-[1.8] text-white/85">
                We build capacity, preserve cultural values, and create pathways for young Yewa people to thrive — both within their communities and in the wider world.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/[0.04] rounded-[20px] p-10 border border-white/[0.08]">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70 mb-3">Our Vision</p>
              <h3 className="text-[1.5rem] font-extrabold text-yye-yellow leading-[1.2] mb-3">
                A generation of Yewa youths who are grounded, equipped, and globally competitive.
              </h3>
              <p className="text-sm leading-[1.8] text-white/75">
                We see a future where every Yewa youth has the identity, knowledge, and opportunity to lead a meaningful, impactful life.
              </p>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* ══ DONATE CTA ════════════════════════════════════════════════ */}
      <section id="donate-cta" className="bg-yye-yellow px-[5%] py-20">
        <RevealWrapper className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <h2
              className="font-extrabold text-yye-dark leading-[1.2] max-w-[520px]"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              Your support builds the future of Yewa youth.
            </h2>
            <p className="text-[15px] text-yye-dark/70 mt-2 max-w-[480px]">
              Every contribution — large or small — funds real programs that change real lives in Yewa communities.
            </p>
          </div>
          <Link href="/donate" className="btn-dark">Donate Now →</Link>
        </RevealWrapper>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════ */}
      <section id="contact" className="bg-yye-light px-[5%] py-24">
        <RevealWrapper className="text-center mb-12">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title text-center">Join the YYE movement.</h2>
          <p className="section-sub mx-auto text-center">
            Whether you&apos;re a student, mentor, partner, or simply someone who cares about the Yewa community — there is a place for you here.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Contact info */}
          <RevealWrapper>
            <h3 className="text-[1.3rem] font-extrabold mb-3">We&apos;d love to hear from you.</h3>
            <p className="text-sm text-yye-gray leading-[1.7] mb-8">
              Reach out through any of the channels below, or fill in the form and the YYE team will get back to you.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@yewayouthelites.org" className="contact-link">
                <div className="contact-link-icon">✉️</div>
                info@yewayouthelites.org
              </a>
              <a href="#" className="contact-link">
                <div className="contact-link-icon">📸</div>
                @YewaYouthElites on Instagram
              </a>
              <a href="#" className="contact-link">
                <div className="contact-link-icon">🐦</div>
                @YYE on X (Twitter)
              </a>
              <a href="#" className="contact-link">
                <div className="contact-link-icon">📘</div>
                Yewa Youth Elites on Facebook
              </a>
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={80}>
            <ContactForm />
          </RevealWrapper>
        </div>
      </section>
    </>
  )
}

/* ── Program card sub-component ─────────────────────────────────────── */
function ProgramCard({
  icon,
  tag,
  title,
  desc,
  variant = 'default',
}: {
  icon: string
  tag: string
  title: string
  desc: string
  variant?: 'featured' | 'dark' | 'default'
}) {
  const base = 'rounded-[16px] p-8 border transition-all duration-200 hover:-translate-y-px hover:shadow-card-hover h-full'

  const styles = {
    featured: `bg-yye-green border-transparent ${base}`,
    dark: `bg-yye-dark border-transparent ${base}`,
    default: `bg-white border-yye-green/[0.1] ${base}`,
  }

  const iconBg = {
    featured: 'bg-white/15',
    dark: 'bg-white/[0.08]',
    default: 'bg-yye-green/[0.08]',
  }

  const tagStyle = {
    featured: 'bg-yye-yellow/20 text-yye-yellow',
    dark: 'bg-yye-green/20 text-[#6ee883]',
    default: 'bg-yye-green/[0.08] text-yye-green',
  }

  const titleColor = variant === 'default' ? 'text-yye-dark' : 'text-white'
  const descColor = variant === 'dark' ? 'text-white/70' : variant === 'featured' ? 'text-white/80' : 'text-yye-gray'

  return (
    <div className={styles[variant]}>
      <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-5 ${iconBg[variant]}`}>
        {icon}
      </div>
      <span className={`inline-block text-[10px] font-bold tracking-[0.1em] uppercase px-[10px] py-[3px] rounded-full mb-3 ${tagStyle[variant]}`}>
        {tag}
      </span>
      <h3 className={`text-[1.15rem] font-extrabold mb-2.5 ${titleColor}`}>{title}</h3>
      <p className={`text-[13px] leading-[1.7] ${descColor}`}>{desc}</p>
    </div>
  )
}
