import styles from './styles/styles.module.css'
import { LoaderCircle } from "lucide-react";

export default function Loading () {
    return (
        <div className={styles.loader}>
            <div className={styles.loader_container}>
                <LoaderCircle size={40} />
            </div>
        </div>
    )
}