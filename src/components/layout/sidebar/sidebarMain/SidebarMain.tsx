import { Button } from '@/components/ui/button/Button'
import SidebarAuth from '@/components/widgets/sidebar/sidebarAuth/SidebarAuth'
import SidebarLink from '@/components/widgets/sidebar/sidebarLink/SidebarLink'
import { ListPagesConfig } from '@/config/pages'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'
import { headers } from 'next/headers'

const SidebarMain = async () => {
  return (
    <aside className={styles.sidebar}>
      <div className='h-full flex flex-col justify-between items-start'>
        <div className='flex flex-col w-full'>
          <SidebarLink href={ListPagesConfig.MAIN.href}>Главная</SidebarLink>
          <SidebarLink href={ListPagesConfig.CONCERTS.href}>Концерты</SidebarLink>
          <SidebarLink href={ListPagesConfig.NON_MUSIC.href}>Книги и подкасты</SidebarLink>
          <SidebarLink href={ListPagesConfig.COLLECTIONS.href}>Коллекции</SidebarLink>
        </div>
        <SidebarAuth />
      </div>
    </aside>
  )
}

export default SidebarMain