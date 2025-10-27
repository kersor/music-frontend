import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface Props extends LinkProps {
    className?: string
}

const SidebarLink = (props: PropsWithChildren<Props>) => {
    const {
        href,
        className,
        children 
    } = props
    return (
        <Link className={clsx(
            className,
            styles.sidebar_link
        )} href={href}>{children}</Link>
    )
}

export default SidebarLink