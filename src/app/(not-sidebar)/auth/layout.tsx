import { ReactNode } from 'react';
import AuthAside from '@/components/widgets/auth/AuthAside';

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <main className="page-auth">
      <AuthAside />
      {children}
    </main>
  );
}
