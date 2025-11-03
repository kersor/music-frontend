import SidebarProfile from '@/components/layout/sidebar/sidebarProfile/SidebarProfile';
import styles from './styles.module.css'

export default function DashboardProfileLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className={styles.wrapper}>
            <SidebarProfile />
            {children}
        </div>
  );
}