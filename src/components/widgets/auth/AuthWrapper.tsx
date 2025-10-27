"use client"

import React, { useState } from 'react'
import AuthLogin from './AuthLogin'
import styles from './styles.module.css'
import AuthRegister from './AuthRegister'
import { useRouter, useSearchParams } from 'next/navigation'

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


  return (
    <div className={styles.auth}>
      {
        mode === "login" 
        ? <AuthLogin handleMode={handleMode}  /> 
        : <AuthRegister handleMode={handleMode} />
      } 
    </div>
  )
}

export default AuthWrapper