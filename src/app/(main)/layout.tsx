import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import Sidebar from "@/components/layout/sidebar/sidebarMain/SidebarMain";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className={`grid grid-cols-5 min-h-screen max-w-[1300px] mx-auto`}>
            <Sidebar />
            <div className="container-content">
                <main className='page-content'>
                    {children}
                </main>
                <ChooseTrack />
            </div>
        </div>
  );
}