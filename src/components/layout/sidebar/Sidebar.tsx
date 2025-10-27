import { Button } from '@/components/ui/button/Button'
import SidebarAuth from '@/components/widgets/sidebar/sidebarAuth/SidebarAuth'
import SidebarLink from '@/components/widgets/sidebar/sidebarLink/SidebarLink'
import { ListPagesPaths } from '@/config/pages'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <aside className='p-[var(--margin-main)] ml-3'>
      <div className='h-full flex flex-col justify-between items-start'>
        <div className='flex flex-col gap-3'>
          <SidebarLink href={ListPagesPaths.MAIN}>Главная</SidebarLink>
          <SidebarLink href={ListPagesPaths.CONCERTS}>Концерты</SidebarLink>
          <SidebarLink href={ListPagesPaths.NON_MUSIC}>Книги и подкасты</SidebarLink>
          <SidebarLink href={ListPagesPaths.COLLECTIONS}>Коллекции</SidebarLink>
        </div>
        <SidebarAuth />
      </div>
    </aside>
  )
}

export default Sidebar