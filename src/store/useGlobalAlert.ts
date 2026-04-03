import { create } from "zustand"

type AlertVariant = "default" | "destructive"

interface GlobalAlertState {
  open: boolean
  title: string
  description: string
  variant: AlertVariant
  show: (payload: {
    title: string
    description: string
    variant?: AlertVariant
  }) => void
  hide: () => void
}

export const useGlobalAlert = create<GlobalAlertState>((set) => ({
  open: false,
  title: "",
  description: "",
  variant: "default",
  show: ({ title, description, variant = "default" }) => set({ open: true, title, description, variant }),
  hide: () => set({ open: false }),
}))

