import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface Props {
    classNames?: string
}

const PageTitle = ({
    classNames,
    children
}: PropsWithChildren<Props>) => {
  return (
    <h1 className={clsx(
        classNames,
        styles.title
    )}>{children}</h1>
  )
}

export default PageTitle