'use client'

import { useTheme } from '@/store/useTheme'
import React, { PropsWithChildren } from 'react'

const ThemeProvider = ({
    children
}: PropsWithChildren) => {
    const theme = useTheme(state => state.theme)

    return (
        <div className={`body ${
            theme == 'dark' ? 'dark' : ''
        }`}>
            {children}
        </div>
    )
}

export default ThemeProvider