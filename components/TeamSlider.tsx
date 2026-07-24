'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

/* ── Team data ───────────────────────────────────────────────────────── */
const TEAM = [
  { initials: 'VA', name: 'Victor Adeleye',           role: 'President, YYE',                           color: '#11A32C', isPresident: true  },
  { initials: 'YA', name: 'Yosola Adekanmbi',         role: 'General Secretary',                        color: '#1E7A35', isPresident: false },
  { initials: 'SW', name: 'Sewedo Wusa',               role: 'Director of Communications & Media',       color: '#0c7d21', isPresident: false },
  { initials: 'OA', name: 'Olayinka Abiodun',          role: 'Director of ICT',                          color: '#2d8a3e', isPresident: false },
  { initials: 'AJ', name: 'Ajibola Julius Olarenwaju', role: 'Director of Programs & Events Planning',   color: '#156b25', isPresident: false },
  { initials: 'JA', name: 'Joseph Aretola',            role: 'Director of Welfare & Logistics',          color: '#0e5c1e', isPresident: false },
  { initials: 'DF', name: 'Damilola Fagbohun',         role: 'Director of Membership',                   color: '#1a7a30', isPresident: false },
]

const INTERVAL = 5500

/* ── Kente cloth colour sequence (authentic West African palette) ─────── */
const KENTE = [
  '#11A32C', // YYE green
  '#D4A300', // gold
  '#1E1E1E', // dark/black
  '#C47B35', // terracotta
  '#8B2500', // deep red
  '#D4A300', // gold
  '#11A32C', // YYE green
  '#1E1E1E', // dark
  '#C47B35', // terracotta
  '#8B2500', // deep red
]

/* ── Slide variants ──────────────────────────────────────────────────── */
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
  center: {
    x: 0, opacity: 1, scale: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 32 },
  },
  exit: (d: number) => ({
    x: d > 0 ? '-40%' : '40%', opacity: 0, scale: 0.96,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

/* ══════════════════════════════════════════════════════════════════════
   AFRICAN ART ELEMENTS
   ══════════════════════════════════════════════════════════════════════ */

/** Diamond lattice - ubiquitous in West/Central African textile weaving */
export function DiamondLattice() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="yye-lattice" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          {/* Outer diamond */}
          <polygon
            points="24,2 46,24 24,46 2,24"
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"
          />
          {/* Inner diamond */}
          <polygon
            points="24,12 36,24 24,36 12,24"
            fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1"
          />
          {/* Centre dot */}
          <circle cx="24" cy="24" r="2" fill="rgba(255,255,255,0.28)" />
          {/* Cardinal corner dots */}
          <circle cx="24" cy="2"  r="1.2" fill="rgba(255,255,255,0.20)" />
          <circle cx="46" cy="24" r="1.2" fill="rgba(255,255,255,0.20)" />
          <circle cx="24" cy="46" r="1.2" fill="rgba(255,255,255,0.20)" />
          <circle cx="2"  cy="24" r="1.2" fill="rgba(255,255,255,0.20)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#yye-lattice)" />
    </svg>
  )
}

/**
 * Adinkrahene (Chief of Adinkra symbols) watermark
 * Represents greatness, charisma, and leadership - perfect for a team section.
 * Concentric circles + cardinal diamond markers.
 */
export function AdinkraheneWatermark() {
  const cx = 70, cy = 70, r1 = 64, r2 = 46, r3 = 28, r4 = 12
  return (
    <svg
      className="absolute"
      style={{ right: -18, bottom: -18, width: 140, height: 140, opacity: 0.09, pointerEvents: 'none' }}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric circles - Adinkrahene */}
      <circle cx={cx} cy={cy} r={r1} stroke="white" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r2} stroke="white" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r3} stroke="white" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r4} fill="white" opacity="0.7" />

      {/* Cardinal spokes */}
      <line x1={cx} y1={cy - r1} x2={cx} y2={cy - r2} stroke="white" strokeWidth="1.5" />
      <line x1={cx} y1={cy + r2} x2={cx} y2={cy + r1} stroke="white" strokeWidth="1.5" />
      <line x1={cx - r1} y1={cy} x2={cx - r2} y2={cy} stroke="white" strokeWidth="1.5" />
      <line x1={cx + r2} y1={cy} x2={cx + r1} y2={cy} stroke="white" strokeWidth="1.5" />

      {/* Cardinal diamond markers */}
      <polygon points={`${cx},${cy-r1-2} ${cx+4},${cy-r1+6} ${cx},${cy-r1+10} ${cx-4},${cy-r1+6}`} fill="white" />
      <polygon points={`${cx},${cy+r1+2} ${cx+4},${cy+r1-6} ${cx},${cy+r1-10} ${cx-4},${cy+r1-6}`} fill="white" />
      <polygon points={`${cx-r1-2},${cy} ${cx-r1+6},${cy+4} ${cx-r1+10},${cy} ${cx-r1+6},${cy-4}`} fill="white" />
      <polygon points={`${cx+r1+2},${cy} ${cx+r1-6},${cy+4} ${cx+r1-10},${cy} ${cx+r1-6},${cy-4}`} fill="white" />
    </svg>
  )
}

/**
 * Kente corner triangle accent - top-left of avatar panel.
 * Kente cloth traditionally uses bold geometric triangles.
 */
export function KenteCornerTriangles() {
  return (
    <svg
      className="absolute top-0 left-0"
      width="72" height="72" viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Three stacked triangles - terracotta, gold, white */}
      <polygon points="0,0 72,0 0,72" fill="#C47B35" opacity="0.30" />
      <polygon points="0,0 48,0 0,48" fill="#D4A300" opacity="0.35" />
      <polygon points="0,0 24,0 0,24" fill="rgba(255,255,255,0.28)" />
      {/* Small diamond accent at corner */}
      <polygon points="0,0 4,8 8,0 0,8" fill="rgba(255,255,255,0.5)" />
    </svg>
  )
}

/** Bottom-right corner accent - mirrors top-left */
export function KenteCornerBottomRight() {
  return (
    <svg
      className="absolute bottom-0 right-0"
      width="56" height="56" viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="56,56 0,56 56,0" fill="#D4A300" opacity="0.20" />
      <polygon points="56,56 20,56 56,20" fill="#C47B35" opacity="0.25" />
    </svg>
  )
}

/**
 * Cardinal-point rings around the avatar.
 * Inspired by African circular jewelry (brass rings, beaded collars).
 * Diamond-tipped markers at N/S/E/W.
 */
function AvatarRings({ size = 160 }: { size?: number }) {
  const c = size / 2
  const r1 = c - 6   // outer dashed ring
  const r2 = c - 22  // inner ring

  return (
    <svg
      className="absolute"
      style={{
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size, height: size,
        pointerEvents: 'none',
      }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer dashed ring */}
      <circle
        cx={c} cy={c} r={r1}
        stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      {/* Inner ring */}
      <circle
        cx={c} cy={c} r={r2}
        stroke="rgba(255,255,255,0.12)" strokeWidth="1"
      />
      {/* N / S / E / W diamond markers */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const mx = c + r1 * Math.sin(rad)
        const my = c - r1 * Math.cos(rad)
        return (
          <polygon
            key={deg}
            points={`${mx},${my - 6} ${mx + 4},${my} ${mx},${my + 6} ${mx - 4},${my}`}
            fill="rgba(255,255,255,0.55)"
          />
        )
      })}
    </svg>
  )
}

/**
 * Kente horizontal colour band - top edge of the info panel.
 * A signature element of Kente weaving from Ghana.
 */
export function KenteStrip() {
  return (
    <div className="flex h-[7px] w-full overflow-hidden" style={{ borderRadius: '0' }}>
      {KENTE.map((color, i) => (
        <div key={i} style={{ backgroundColor: color, flex: 1 }} />
      ))}
    </div>
  )
}

/**
 * Mud-cloth (Bogolanfini) inspired sidebar stripe - left edge of info panel.
 * Mali mud cloth uses alternating filled rectangles in earthy tones.
 */
function MudclothSidebar() {
  const segs = ['#11A32C', '#D4A300', '#C47B35', '#1E1E1E', '#D4A300', '#11A32C', '#C47B35', '#8B2500', '#11A32C', '#D4A300']
  return (
    <div className="absolute left-0 top-0 bottom-0 w-[5px] flex flex-col overflow-hidden">
      {segs.map((color, i) => (
        <div key={i} style={{ backgroundColor: color, flex: 1 }} />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN SLIDER
   ══════════════════════════════════════════════════════════════════════ */
export default function TeamSlider() {
  const [active, setActive] = useState(0)
  const [dir,    setDir]    = useState(1)
  const [paused, setPaused] = useState(false)

  const navigate = useCallback((to: number) => {
    const resolved = ((to % TEAM.length) + TEAM.length) % TEAM.length
    setDir(to > active ? 1 : -1)
    setActive(resolved)
  }, [active])

  const next = useCallback(() => navigate(active + 1), [active, navigate])
  const prev = useCallback(() => navigate(active - 1), [active, navigate])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev])

  const member = TEAM[active]

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── MAIN CARD ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.13)]">

        {/* Kente strip runs full width across the very top */}
        <KenteStrip />

        {/* Slide track */}
        <div className="relative h-[320px] sm:h-[300px] md:h-[280px]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.07}
              onDragEnd={(_, info) => {
                if (info.offset.x < -55) next()
                if (info.offset.x >  55) prev()
              }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-[240px_1fr] cursor-grab active:cursor-grabbing"
            >

              {/* ── AVATAR PANEL ──────────────────────────────────── */}
              <div
                className="hidden md:flex flex-col items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: member.color }}
              >
                {/* African diamond lattice */}
                <DiamondLattice />

                {/* Adinkrahene watermark */}
                <AdinkraheneWatermark />

                {/* Kente corner triangles */}
                <KenteCornerTriangles />
                <KenteCornerBottomRight />

                {/* Soft radial glow for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.12) 0%, transparent 65%)' }}
                />

                {/* Avatar + decorative rings */}
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="relative">
                    {/* Cardinal-point rings behind avatar */}
                    <AvatarRings size={164} />

                    {/* Avatar circle */}
                    <motion.div
                      key={`avatar-${active}`}
                      initial={{ scale: 0.65, opacity: 0, rotate: -8 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.06 }}
                      className="relative z-10 w-[108px] h-[108px] rounded-full flex items-center justify-center text-[2rem] font-extrabold text-white"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.22)',
                        boxShadow: '0 0 0 3px rgba(255,255,255,0.20), 0 8px 32px rgba(0,0,0,0.25)',
                      }}
                    >
                      {member.initials}
                    </motion.div>
                  </div>

                  {/* Member counter */}
                  <div className="flex items-baseline gap-1 z-10">
                    <span className="text-white text-[1.4rem] font-extrabold leading-none tabular-nums">
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/40 text-[0.9rem] font-bold leading-none tabular-nums">
                      /{String(TEAM.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── INFO PANEL ───────────────────────────────────── */}
              <div className="relative bg-[#FDFAF5] flex flex-col justify-between pl-10 pr-8 py-8 md:pl-12 md:pr-10 md:py-10">

                {/* Mud-cloth sidebar stripe */}
                <MudclothSidebar />

                {/* Mobile avatar row */}
                <div className="flex items-center gap-4 md:hidden mb-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold text-white shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <span className="text-[11px] text-yye-gray font-bold tracking-[0.1em] tabular-nums">
                    {String(active + 1).padStart(2, '0')} of {TEAM.length}
                  </span>
                </div>

                {/* Member details */}
                <div>
                  {/* President badge */}
                  {member.isPresident && (
                    <motion.div
                      key={`badge-${active}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 }}
                      className="flex items-center gap-2 mb-4"
                    >
                      {/* Small Adinkrahene dot pattern */}
                      <span className="flex gap-[3px] items-center">
                        {[0,1,2].map(i => (
                          <span
                            key={i}
                            className="block rounded-full"
                            style={{ width: 5, height: 5, backgroundColor: KENTE[i * 2] }}
                          />
                        ))}
                      </span>
                      <span className="inline-block bg-yye-green text-white text-[10px] font-bold tracking-[0.10em] uppercase px-3 py-[3px] rounded-full">
                        President
                      </span>
                    </motion.div>
                  )}

                  {/* Name */}
                  <motion.h3
                    key={`name-${active}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.05 }}
                    className="font-extrabold text-yye-dark leading-[1.08] tracking-[-0.025em] mb-2"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
                  >
                    {member.name}
                  </motion.h3>

                  {/* Role */}
                  <motion.p
                    key={`role-${active}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.10 }}
                    className="text-[14px] text-yye-gray leading-[1.6] max-w-[280px]"
                  >
                    {member.role}
                  </motion.p>

                  {/* Decorative kente divider below role */}
                  <motion.div
                    key={`divider-${active}`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.18, duration: 0.4 }}
                    className="flex gap-[2px] mt-4 origin-left"
                  >
                    {KENTE.slice(0, 6).map((c, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: c, width: 20, height: 3, borderRadius: 2 }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Bottom row - dots + arrows */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-yye-green/[0.08]">

                  {/* Diamond dot indicators */}
                  <div className="flex items-center gap-2">
                    {TEAM.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(i)}
                        aria-label={`Member ${i + 1}`}
                        className="focus:outline-none transition-all duration-300"
                      >
                        {i === active ? (
                          /* Active: small coloured diamond */
                          <svg width="14" height="14" viewBox="0 0 14 14">
                            <polygon
                              points="7,1 13,7 7,13 1,7"
                              fill={member.color}
                            />
                          </svg>
                        ) : (
                          /* Inactive: hollow diamond */
                          <svg width="10" height="10" viewBox="0 0 10 10">
                            <polygon
                              points="5,1 9,5 5,9 1,5"
                              fill="none" stroke="#D1D5DB" strokeWidth="1.2"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Arrow navigation */}
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="w-9 h-9 rounded-full border border-yye-green/20 flex items-center justify-center text-yye-dark transition-all duration-200 hover:bg-yye-green hover:text-white hover:border-yye-green"
                    >
                      <HiChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next"
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

        {/* Auto-advance progress bar (member colour) */}
        {!paused && (
          <motion.div
            key={`bar-${active}`}
            className="absolute bottom-0 left-0 h-[3px] origin-left"
            style={{ backgroundColor: member.color, width: '100%' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* ── THUMBNAIL STRIP ───────────────────────────────────────────── */}
      <div className="mt-4 flex justify-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {TEAM.map(({ initials, name, color }, i) => (
          <motion.button
            key={i}
            onClick={() => navigate(i)}
            aria-label={`View ${name}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className={[
              'flex flex-col items-center gap-1.5 px-2.5 py-2 rounded-[10px] shrink-0 focus:outline-none transition-all duration-200',
              i === active ? 'bg-white shadow-sm ring-1 ring-yye-green/20' : 'hover:bg-white/60',
            ].join(' ')}
          >
            {/* Avatar circle */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white"
              style={{
                backgroundColor: color,
                boxShadow: i === active ? `0 0 0 3px ${color}38` : undefined,
              }}
            >
              {initials}
            </div>

            {/* Active indicator: small Kente bar row */}
            {i === active ? (
              <div className="flex gap-[1.5px]">
                {[color, '#D4A300', '#C47B35'].map((c, k) => (
                  <div key={k} style={{ backgroundColor: c, width: 6, height: 2.5, borderRadius: 1 }} />
                ))}
              </div>
            ) : (
              <div className="w-2 h-[3px] rounded-full bg-gray-200" />
            )}

            <span className={`text-[9px] font-semibold whitespace-nowrap leading-none ${
              i === active ? 'text-yye-green' : 'text-yye-gray/70'
            }`}>
              {name.split(' ')[0]}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
