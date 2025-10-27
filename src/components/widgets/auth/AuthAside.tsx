"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import styles from './styles.module.css'

const AuthAside = () => {
    const params = useSearchParams()
    const mode = params?.get('mode')

    return (
        <div className={styles.aside}>{mode === "login" ? 'Войти' : 'Регистрация'}</div>
    )
}

export default AuthAside