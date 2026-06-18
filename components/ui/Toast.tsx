'use client'

import Portal from './Portal'

type ToastVariant = 'error' | 'success'

type ToastProps = {
  message: string
  variant?: ToastVariant
  onClose: () => void
}

const variantStyles = {
  error: {
    dot: 'bg-red-500',
    title: 'Error',
    titleColor: 'text-red-700',
    border: 'border-red-100',
    bg: 'bg-white',
  },
  success: {
    dot: 'bg-yye-green',
    title: 'Success',
    titleColor: 'text-yye-green',
    border: 'border-yye-green/15',
    bg: 'bg-white',
  },
}

export default function Toast({ message, variant = 'error', onClose }: ToastProps) {
  const styles = variantStyles[variant]

  return (
    <Portal>
    <div className="fixed right-4 top-4 z-[130] w-[calc(100vw-2rem)] max-w-[380px]" role="alert">
      <div className={`flex items-start gap-3 rounded-[12px] border ${styles.border} ${styles.bg} p-4 shadow-card-hover`}>
        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`} />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-extrabold ${styles.titleColor}`}>{styles.title}</p>
          <p className="mt-1 text-sm leading-[1.5] text-yye-gray">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-[8px] px-2 py-1 text-sm font-bold text-yye-gray transition-colors hover:bg-yye-light hover:text-yye-dark"
          aria-label="Close notification"
        >
          x
        </button>
      </div>
    </div>
    </Portal>
  )
}
