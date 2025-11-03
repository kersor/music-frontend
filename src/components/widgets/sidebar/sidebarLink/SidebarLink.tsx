"use client"

import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation'

interface Props extends LinkProps {
    className?: string
    isHandleActiveLink?: boolean
}

const SidebarLink = (props: PropsWithChildren<Props>) => {
    const pathName = usePathname().split('/')
 

    const {
        href = '',
        className,
        children,
        isHandleActiveLink = true
    } = props

    const lastPathName = pathName[pathName.length - 1]

    const hrefSegments = (href as string).split('/')
    const lastHrefSegment = hrefSegments[hrefSegments.length - 1]
    const isActive = lastPathName === lastHrefSegment

    return (
        <Link className={clsx(
            className,
            (isHandleActiveLink && isActive) && styles.activeLink,
            styles.sidebar_link,
        )} href={href}>{children}</Link>
    )
}

export default SidebarLink