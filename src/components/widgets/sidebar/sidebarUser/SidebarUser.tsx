"use client"
import { useUser } from '@/store/useUser'
import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ListPagesConfig } from '@/config/pages'
import Avatar from '../../avatar/Avatar'

const SidebarUser = () => {
  const user = useUser(state => state.user)

  return (
    <div className={styles.user}>
      <Link href={ListPagesConfig.PROFILE_PERSONAL.href} className={styles.avatar}>
        <Avatar size='xs' />
      </Link>
      <div className={styles.names}>
        <div className={styles.names_name}>{user?.name}</div>
        <div className={styles.names_email}>{user?.email}</div>
      </div>
    </div>
  )
}

export default SidebarUser