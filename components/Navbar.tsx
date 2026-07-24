'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiHeart } from 'react-icons/hi2'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────────────────── */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'flex items-center justify-between px-[5%] py-[1.1rem]',
          'bg-white/95 backdrop-blur-[12px]',
          'border-b border-yye-green/[0.12]',
          'transition-shadow duration-300',
          scrolled ? 'shadow-nav' : '',
        ].join(' ')}
      >
        {/* Logo - full wordmark (green text variant for white navbar) */}
        <Link href="/" className="flex items-center no-underline" aria-label="Yewa Youth Elites home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/yye-wordmark-green.svg"
            alt="Yewa Youth Elites"
            height={36}
            width={100}
            className=''
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link
              href="/"
              className={`text-sm font-medium no-underline transition-colors duration-200 ${
                isActive('/') ? 'text-yye-green font-bold' : 'text-yye-dark hover:text-yye-green'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`text-sm font-medium no-underline transition-colors duration-200 ${
                isActive('/about') ? 'text-yye-green font-bold' : 'text-yye-dark hover:text-yye-green'
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#programs"
              className="text-sm font-medium no-underline text-yye-dark hover:text-yye-green transition-colors duration-200"
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              className={`text-sm font-medium no-underline transition-colors duration-200 ${
                isActive('/news') ? 'text-yye-green font-bold' : 'text-yye-dark hover:text-yye-green'
              }`}
            >
              News
            </Link>
          </li>
          <li>
            <Link href="/donate" className="nav-donate-btn">
              Donate
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="nav-cta-btn">
              Join Us
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-yye-dark rounded-sm" />
          <span className="block w-6 h-0.5 bg-yye-dark rounded-sm" />
          <span className="block w-6 h-0.5 bg-yye-dark rounded-sm" />
        </button>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-yye-green/[0.12] px-[5%] py-6 flex flex-col gap-5">
          <Link href="/" className="text-base font-medium text-yye-dark no-underline" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="text-base font-medium text-yye-dark no-underline" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/#programs" className="text-base font-medium text-yye-dark no-underline" onClick={() => setMobileOpen(false)}>
            Programs
          </Link>
          <Link href="/news" className="text-base font-medium text-yye-dark no-underline" onClick={() => setMobileOpen(false)}>
            News
          </Link>
          <Link
            href="/donate"
            className="bg-yye-yellow flex items-center gap-1 text-yye-dark px-6 py-3 rounded-[8px] text-center font-bold no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Donate  <HiHeart
                              className="text-red-600"
                              size={18}
                              aria-hidden="true"
                            />
          </Link>
          <Link
            href="/#contact"
            className="bg-yye-green text-white px-6 py-3 rounded-[8px] text-center font-bold no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Join Us 
          </Link>
        </div>
      )}
    </>
  )
}
