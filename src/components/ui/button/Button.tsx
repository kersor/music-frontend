import clsx from "clsx"
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, MouseEventHandler, PropsWithChildren } from "react"
import styles from './styles.module.css'
import { LoaderCircle } from "lucide-react"
import Link from "next/link"

type variant = 
    "filled" |
    "light" |
    "outline" |
    "subtle"

type size = 
    "xs" |
    "sm" | 
    "md" |
    "lg" | 
    "xl"

type radius = 
    "xs" |
    "sm" | 
    "md" |
    "lg" | 
    "xl"

type component = 
    "a" |
    "button"


interface CommonProps {
    classNames?: string

    variant?: variant
    size?: size
    radius?: radius

    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean

    component?: component
    href?: string
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { component?: "button" };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { component: "a" };
type Props = ButtonAsButton | ButtonAsLink;

export const Button = ({
    classNames,
    children,
    onClick,
    variant = "filled",
    size = "sm",
    radius = "sm",
    disabled = false,
    loading = false,
    fullWidth = false,
    component = "button",
    href = "",
    ...otherProps
}: Props) => {

    const classNames_variant: Record<variant, string> = {
        filled: styles.button_filled,
        light: styles.button_light,
        outline: styles.button_outline,
        subtle: styles.button_subtle
    }

    const classNames_size: Record<size, string> = {
        xs: styles.button_size__xs,
        sm: styles.button_size__sm, 
        md: styles.button_size__md,
        lg: styles.button_size__lg, 
        xl: styles.button_size__xl,
    }

    const classNames_radius: Record<radius, string> = {
        xs: styles.button_radius__xs,
        sm: styles.button_radius__sm, 
        md: styles.button_radius__md,
        lg: styles.button_radius__lg, 
        xl: styles.button_radius__xl,
    }

    const isDisabled = disabled || loading;

    const commonClassNames = clsx(
        classNames,
        styles.button,
        classNames_variant[variant],
        classNames_size[size],
        classNames_radius[radius],
        fullWidth && 'flex-1',
        isDisabled ? styles.button_disabled : styles.button_notdisabled
    )

    if (component === "a") {
        const hanldeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (isDisabled) {
                e.preventDefault()
                return
            }
            (onClick as React.MouseEventHandler<HTMLAnchorElement>)?.(e)
        }

        return (
            <Link 
                href={isDisabled ? '' : href}
                className={commonClassNames}
                onClick={hanldeClick}
                {...(otherProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                <Content loading={loading}>{children}</Content>
            </Link>
        )
    }

    return (
        <button 
            disabled={isDisabled}
            onClick={onClick as MouseEventHandler<HTMLButtonElement>}
            className={commonClassNames}
            {...(otherProps as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            <Content loading={loading}>{children}</Content>
        </button>
    )
}

interface PropsContent {
    loading?: boolean
}

const Content = ({
    loading = false,
    children,
}: PropsWithChildren<PropsContent>) => {
    return (
        <React.Fragment>
            {
                loading ? (
                    <div className="animate-spin">
                        <LoaderCircle />
                    </div>
                ) : (
                    <>{children}</>
                )
            }
        </React.Fragment>
    )
}