"use client"

import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGlobalAlert } from "@/store/useGlobalAlert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const HIDE_DELAY_MS = 4000

const GlobalAlert = () => {
  const { open, title, description, variant, hide } = useGlobalAlert(
    (state) => state
  )

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(hide, HIDE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [open, hide])

  if (!open) return null

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[1000] w-[min(420px,calc(100vw-2rem))] animate-in fade-in-0 slide-in-from-top-2 duration-300">
      <Alert variant={variant} className="pointer-events-auto shadow-md">
        {variant === "destructive" ? <AlertCircle /> : <CheckCircle2 />}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  )
}

export default GlobalAlert
