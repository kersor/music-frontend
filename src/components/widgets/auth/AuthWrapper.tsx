"use client"

import AuthLogin from './AuthLogin'
import styles from './styles.module.css'
import AuthRegister from './AuthRegister'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type mode = 
  "login" |
  "register" 

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
    <div className='w-full h-full'>
      <div className='absolute top-5 left-5'>
        <Button onClick={handleMain} size="icon-lg" classNames='cursor-pointer'>
          <ArrowLeft />
        </Button>
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

