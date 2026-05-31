'use client'

import { useState, useRef, useEffect, useId } from 'react'

interface Option {
  label: string
  value: string
}

interface SelectProps {
  label?: string
  options: Option[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: string
}

export default function Select({
  label,
  options,
  placeholder = 'Select an option',
  value,
  onChange,
  disabled,
  error,
}: SelectProps) {
  const id = useId()
  const labelId = `${id}-label`
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Auto-focus search when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 10)
  }, [open])

  const toggle = () => {
    if (disabled) return
    setOpen((prev) => {
      if (prev) setSearch('')
      return !prev
    })
  }

  const select = (val: string) => {
    onChange?.(val)
    setOpen(false)
    setSearch('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); setSearch('') }
  }

  return (
    <div ref={containerRef} className="relative w-full text-left" onKeyDown={handleKeyDown}>
      {/* Label */}
      {label && (
        <label
          id={labelId}
          htmlFor={id}
          className="block text-[12px] font-semibold text-yye-gray uppercase tracking-[0.05em] mb-1.5 cursor-default"
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={label ? labelId : undefined}
        className={[
          'flex items-center justify-between w-full px-4 py-3 rounded-[10px] border bg-white',
          'text-sm text-left font-sans transition-all duration-200 outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400/20'
            : open
              ? 'border-yye-green ring-1 ring-yye-green/[0.15]'
              : 'border-yye-green/[0.18] hover:border-yye-green/40 focus:border-yye-green focus:ring-1 focus:ring-yye-green/[0.15]',
        ].join(' ')}
      >
        <span className={selectedLabel ? 'text-yye-dark' : 'text-gray-400'}>
          {selectedLabel ?? placeholder}
        </span>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-[12px] border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.10)] z-[200] overflow-hidden"
          role="listbox"
          aria-labelledby={label ? labelId : undefined}
        >
          {/* Search row */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            {/* Search icon */}
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              className="flex-1 text-sm text-yye-dark bg-transparent outline-none placeholder:text-gray-400 font-sans"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Options */}
          <ul className="p-1 max-h-[240px] overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((opt) => {
                const isSelected = opt.value === value
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => select(opt.value)}
                      className={[
                        'relative flex items-center justify-between w-full pl-3 pr-9 py-2.5 text-sm font-medium rounded-[8px] text-left transition-colors duration-150',
                        isSelected
                          ? 'bg-yye-green/[0.08] text-yye-green'
                          : 'text-yye-dark hover:bg-yye-green/[0.06] hover:text-yye-green',
                      ].join(' ')}
                    >
                      {opt.label}
                      {isSelected && (
                        <span className="absolute right-2.5 flex items-center">
                          {/* Check icon */}
                          <svg className="w-4 h-4 text-yye-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </li>
                )
              })
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
