import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack"
import Sidebar from "@/components/layout/sidebar/sidebarMain/SidebarMain"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex gap-5 min-h-screen w-full max-w-[1300px]">
      <Sidebar />
      <SidebarInset className="container-content min-h-screen p-5">
        <main className="page-content p-3">{children}</main>
        <ChooseTrack />
      </SidebarInset>
    </div>
  )
}
