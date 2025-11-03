"use client"

import React, { useState } from 'react'
import AuthLogin from './AuthLogin'
import styles from './styles.module.css'
import AuthRegister from './AuthRegister'
import { useRouter, useSearchParams } from 'next/navigation'
import { ButtonIcon } from '@/components/ui/button/ButtonIcon'
import { ArrowLeft } from 'lucide-react'

export type mode = 
  "login" |
  "regoster" 

const AuthWrapper = () => {
  const router = useRouter()
  const search = useSearchParams() 
  const mode = search.get('mode')

  const handleMode = () => {
    router.push(`?mode=${mode === "login" ? "register" : "login"}`)
  }

  const handleMain = () => {
    router.push(`/`)
  }


  return (
    <div className={styles.auth}>
      <div className={styles.auth_main}>
        <ButtonIcon onClick={handleMain} size="lg">
          <ArrowLeft />
        </ButtonIcon>
      </div>
      {
        mode === "login" 
        ? <AuthLogin handleMode={handleMode}  /> 
        : <AuthRegister handleMode={handleMode} />
      } 
    </div>
  )
}

export default AuthWrapper