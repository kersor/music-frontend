"use client"

import { Button } from '@/components/ui/button/Button'
import { ListPagesPaths } from '@/config/pages'
import React from 'react'

const SidebarAuth = () => {
  return (
    <div className='flex w-full'>
        <Button fullWidth component='a' href={`${ListPagesPaths.AUTH}?mode=login`}>Войти</Button>
    </div>
  )
}

export default SidebarAuth