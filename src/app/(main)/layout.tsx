import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className={`grid grid-cols-7 min-h-screen`}>
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