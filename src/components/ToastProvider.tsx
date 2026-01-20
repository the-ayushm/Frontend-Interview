import React, { createContext, useContext, useState, useCallback } from 'react'

type Toast = { id: number; message: string; type?: 'success' | 'error' }

const ToastContext = createContext<{ show: (msg: string, type?: Toast['type']) => void } | undefined>(undefined)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div className="fixed right-4 top-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[220px] rounded-lg border px-4 py-2 shadow-md ${
              t.type === 'success'
                ? 'border-primary/20 bg-primary text-primary-foreground'
                : 'border-destructive/20 bg-destructive text-white'
            }`}
            role="status"
            aria-live="polite"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
