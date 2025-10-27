import AuthWrapper from '@/components/widgets/auth/AuthWrapper';
import styles from './styles.module.css';

export default function Auth () {
    return (
        <div className={styles.auth}>
            <AuthWrapper />
        </div>
    )
}