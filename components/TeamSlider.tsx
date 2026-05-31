'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

/* ── Team data lives here so the slider is self-contained ────────────── */
const TEAM = [
  { initials: 'VA', name: 'Victor Adeleye',           role: 'President, YYE',                           color: '#11A32C', isPresident: true  },
  { initials: 'YA', name: 'Yosola Adekanmbi',         role: 'General Secretary',                        color: '#1E7A35', isPresident: false },
  { initials: 'SW', name: 'Sewedo Wusa',               role: 'Director of Communications & Media',       color: '#0c7d21', isPresident: false },
  { initials: 'OA', name: 'Olayinka Abiodun',          role: 'Director of ICT',                          color: '#2d8a3e', isPresident: false },
  { initials: 'AJ', name: 'Ajibola Julius Olarenwaju', role: 'Director of Programs & Events Planning',   color: '#156b25', isPresident: false },
  { initials: 'JA', name: 'Joseph Aretola',            role: 'Director of Welfare & Logistics',          color: '#0e5c1e', isPresident: false },
  { initials: 'DF', name: 'Damilola Fagbohun',         role: 'Director of Membership',                   color: '#1a7a30', isPresident: false },
]

const INTERVAL = 5500 // ms per slide

/* ── Slide animation variants ────────────────────────────────────────── */
const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 340, damping: 34 },
  },
  exit: (d: number) => ({
    x: d > 0 ? '-40%' : '40%',
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.22, ease: 'easeIn' as const },
  }),
}

/* ─────────────────────────────────────────────────────────────────────── */
export default function TeamSlider() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)
  const [paused, setPaused] = useState(false)

  const navigate = useCallback((to: number) => {
    const resolved = ((to % TEAM.length) + TEAM.length) % TEAM.length
    setDir(to > active ? 1 : -1)
    setActive(resolved)
  }, [active])

  const next = useCallback(() => navigate(active + 1), [active, navigate])
  const prev = useCallback(() => navigate(active - 1), [active, navigate])

  /* Auto-advance */
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const member = TEAM[active]

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Main card ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.10)]">

        {/* Slide track */}
        <div className="relative h-[340px] sm:h-[320px] md:h-[300px]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              /* Swipe / drag to navigate */
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next()
                if (info.offset.x >  60) prev()
              }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-[260px_1fr] cursor-grab active:cursor-grabbing"
            >
              {/* ── LEFT  – avatar panel ──────────────────────────── */}
              <div
                className="hidden md:flex flex-col items-center justify-center relative overflow-hidden p-8"
                style={{ backgroundColor: member.color }}
              >
                {/* Brand pattern overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "url('/yye-icon.svg')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '70px auto',
                    opacity: 0.08,
                  }}
                />

                {/* Radial glow behind avatar */}
                <div className="absolute inset-0 bg-radial-glow pointer-events-none" style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)`
                }} />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    key={`avatar-${active}`}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.08 }}
                    className="w-[110px] h-[110px] rounded-full flex items-center justify-center text-[2.2rem] font-extrabold text-white ring-[3px] ring-white/25"
                    style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
                  >
                    {member.initials}
                  </motion.div>

                  {/* <span className="text-white/55 text-[11px] font-bold tracking-[0.14em] tabular-nums">
                    {String(active + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}
                  </span> */}
                </div>
              </div>

              {/* ── RIGHT – info panel ───────────────────────────── */}
              <div className="bg-white flex flex-col justify-between p-8 md:p-10">

                {/* Mobile avatar row */}
                <div className="flex items-center gap-4 md:hidden mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold text-white shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  {/* <span className="text-yye-gray text-[11px] font-bold tracking-[0.12em]">
                    {String(active + 1).padStart(2, '0')} of {TEAM.length}
                  </span> */}
                </div>

                {/* Member details */}
                <div>
                  {member.isPresident && (
                    <motion.span
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block bg-yye-green text-white text-[10px] font-bold tracking-[0.10em] uppercase px-3 py-[3px] rounded-full mb-4"
                    >
                      President
                    </motion.span>
                  )}

                  <motion.h3
                    key={`name-${active}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="font-extrabold text-yye-dark leading-[1.1] tracking-[-0.02em] mb-2"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    key={`role-${active}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[15px] text-yye-gray leading-[1.6] max-w-[320px]"
                  >
                    {member.role}
                  </motion.p>
                </div>

                {/* Bottom row – dots + arrows */}
                <div className="flex items-center justify-between pt-6 border-t border-yye-green/[0.08] mt-6">

                  {/* Dot indicators */}
                  <div className="flex items-center gap-1.5">
                    {TEAM.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(i)}
                        aria-label={`Go to member ${i + 1}`}
                        className={[
                          'rounded-full transition-all duration-300 focus:outline-none',
                          i === active
                            ? 'w-6 h-[5px] bg-yye-green'
                            : 'w-[5px] h-[5px] bg-gray-200 hover:bg-gray-400',
                        ].join(' ')}
                      />
                    ))}
                  </div>

                  {/* Arrow buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous member"
                      className="w-9 h-9 rounded-full border border-yye-green/20 flex items-center justify-center text-yye-dark transition-all duration-200 hover:bg-yye-green hover:text-white hover:border-yye-green"
                    >
                      <HiChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next member"
                      className="w-9 h-9 rounded-full border border-yye-green/20 flex items-center justify-center text-yye-dark transition-all duration-200 hover:bg-yye-green hover:text-white hover:border-yye-green"
                    >
                      <HiChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-advance progress bar */}
        {!paused && (
          <motion.div
            key={`bar-${active}`}
            className="absolute bottom-0 left-0 h-[3px] rounded-full origin-left"
            style={{ backgroundColor: member.color, width: '100%' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* ── Thumbnail strip ──────────────────────────────────────────── */}
      <div className="mt-5 flex justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TEAM.map(({ initials, name, color }, i) => (
          <motion.button
            key={i}
            onClick={() => navigate(i)}
            aria-label={`View ${name}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={[
              'flex flex-col items-center gap-1.5 px-3 py-2 rounded-[12px] transition-all duration-200 shrink-0 cursor-pointer focus:outline-none',
              i === active
                ? 'bg-yye-green/[0.08] ring-1 ring-yye-green/30'
                : 'hover:bg-gray-50',
            ].join(' ')}
          >
            <div
              className={[
                'w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white transition-all duration-200',
                i === active ? 'ring-2 ring-offset-2' : '',
              ].join(' ')}
              style={{
                backgroundColor: color,
                boxShadow: i === active ? `0 0 0 3px ${color}44` : undefined,
              }}
            >
              {initials}
            </div>
            <span className={`text-[10px] font-semibold whitespace-nowrap leading-none transition-colors duration-200 ${
              i === active ? 'text-yye-green' : 'text-yye-gray'
            }`}>
              {name.split(' ')[0]}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
