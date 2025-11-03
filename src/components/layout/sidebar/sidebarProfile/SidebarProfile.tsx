import { Button } from '@/components/ui/button/Button'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'
import { ListPagesConfig } from '@/config/pages'
import SidebarLink from '@/components/widgets/sidebar/sidebarLink/SidebarLink'

const SidebarProfile = () => {
  return (
    <div className={styles.sidebar}>
        <SidebarLink href={ListPagesConfig.PROFILE_PERSONAL.href}>Личная информация</SidebarLink>
        <SidebarLink href={ListPagesConfig.PROFILE_MY_MUSIC.href}>Моя музыка</SidebarLink>
    </div>
  )
}

export default SidebarProfile