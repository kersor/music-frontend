
import AuthWrapper from '@/components/widgets/auth/AuthWrapper';
import styles from './styles.module.css';
import { Suspense } from 'react';

export default function Auth () {
    return (
        <div className="relative">
            <Suspense>
                <AuthWrapper />
            </Suspense>
        </div>
    )
}