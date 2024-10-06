// This is a simplified version of the useToast hook
import { useState } from 'react'

interface Toast {
  title: string
  description?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description }: Toast) => {
    setToasts((prevToasts) => [...prevToasts, { title, description }])
    // In a real implementation, you'd want to remove the toast after a delay
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }

  return { toast, toasts }
}