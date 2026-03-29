import { ReactNode, Suspense } from 'react';
import AuthAside from '@/components/widgets/auth/AuthAside';

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <main className="page-auth">
          <AuthAside />
          {children}
        </main>
      </Suspense>
  );
}
