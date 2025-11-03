"use client"

import { Button } from '@/components/ui/button/Button';
import styles from './styles/styles.module.css'
import { LoaderCircle } from "lucide-react";

export default function NotFound () {
    return (
        <div className={styles.found}>
            <div className={styles.found_container}>
                <h3>Ничего не нашлось</h3>
                <div>
                    Попробуйте поискать в этом разделе
                </div>
                <div className='mt-5'>
                    <Button size="md" radius="xl" component='a' href='/'>Главная</Button>
                </div>
            </div>
        </div>
    )
}