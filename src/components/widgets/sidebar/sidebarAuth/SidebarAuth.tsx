import { Button } from '@/components/ui/button/Button'
import { ListPagesConfig } from '@/config/pages'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'
import { getLocalStorage } from '@/utils/localstorage/localstorage'
import { getCookie } from '@/utils/cookie/client-cookie'
import { getIsAuthAsync } from '@/utils/getIsAuth'
import SidebarUser from '../sidebarUser/SidebarUser'

const SidebarAuth = async () => {
  const isAuth = await getIsAuthAsync()
  
  if (isAuth) {
    return <SidebarUser />
  } 
  
  return (
    <div className='flex w-full'>
        <Button fullWidth component='a' href={`${ListPagesConfig.AUTH.href}?mode=login`}>Войти</Button>
    </div>
  )

}

export default SidebarAuth