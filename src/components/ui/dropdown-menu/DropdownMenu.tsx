"use client"

import clsx from "clsx"
import React, {
    ButtonHTMLAttributes,
    HTMLAttributes,
    ReactElement,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import styles from "./styles.module.css"

type Align = "start" | "center" | "end"
type Side = "bottom" | "right"

interface DropdownMenuContextValue {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    closeAll: () => void
    openOnHover: boolean
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

const useDropdownMenuContext = () => {
    const context = useContext(DropdownMenuContext)
    if (!context) {
        throw new Error("DropdownMenu components must be used within DropdownMenu")
    }

    return context
}

interface DropdownMenuProps {
    children: React.ReactNode
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    openOnHover?: boolean
    hoverCloseDelay?: number
    isSub?: boolean
}

export const DropdownMenu = ({
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    openOnHover = false,
    hoverCloseDelay = 120,
    isSub = false,
}: DropdownMenuProps) => {
    const parentContext = useContext(DropdownMenuContext)
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen

    const setOpen = useCallback((nextOpen: SetStateAction<boolean>) => {
        const value = typeof nextOpen === "function"
            ? (nextOpen as (prevState: boolean) => boolean)(open)
            : nextOpen

        if (!isControlled) {
            setInternalOpen(value)
        }

        onOpenChange?.(value)
    }, [isControlled, onOpenChange, open])

    useEffect(() => {
        if (!open) {
            return
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (!rootRef.current) {
                return
            }

            if (!rootRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [open, setOpen])

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current)
                closeTimerRef.current = null
            }
        }
    }, [])

    const contextValue = useMemo(
        () => ({
            open,
            setOpen,
            openOnHover,
            closeAll: () => {
                setOpen(false)
                parentContext?.closeAll()
            },
        }),
        [open, openOnHover, parentContext, setOpen]
    )

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            <div
                ref={rootRef}
                className={clsx(
                    styles.dropdown_root,
                    isSub && styles.dropdown_sub_root
                )}
                onMouseEnter={() => {
                    if (openOnHover) {
                        if (closeTimerRef.current) {
                            clearTimeout(closeTimerRef.current)
                            closeTimerRef.current = null
                        }
                        setOpen(true)
                    }
                }}
                onMouseLeave={() => {
                    if (openOnHover) {
                        if (closeTimerRef.current) {
                            clearTimeout(closeTimerRef.current)
                        }
                        closeTimerRef.current = setTimeout(() => {
                            setOpen(false)
                            closeTimerRef.current = null
                        }, hoverCloseDelay)
                    }
                }}
            >
                {children}
            </div>
        </DropdownMenuContext.Provider>
    )
}

interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    asChild?: boolean
}

export const DropdownMenuTrigger = ({
    children,
    asChild = false,
    className,
    onClick,
    ...props
}: DropdownMenuTriggerProps) => {
    const { open, setOpen, openOnHover } = useDropdownMenuContext()

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
        onClick?.(event as React.MouseEvent<HTMLButtonElement>)
        if (openOnHover) {
            return
        }
        setOpen((prev) => !prev)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as ReactElement, {
            "aria-expanded": open,
            "aria-haspopup": "menu",
            onClick: handleClick,
        })
    }

    return (
        <button
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            className={clsx(styles.dropdown_trigger, className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    align?: Align
    side?: Side
    sideOffset?: number
}

export const DropdownMenuContent = ({
    children,
    align = "start",
    side = "bottom",
    sideOffset = 6,
    className,
    style,
    ...props
}: DropdownMenuContentProps) => {
    const { open } = useDropdownMenuContext()

    if (!open) {
        return null
    }

    return (
        <div
            role="menu"
            className={clsx(
                styles.dropdown_content,
                align === "start" && styles.dropdown_content__start,
                align === "center" && styles.dropdown_content__center,
                align === "end" && styles.dropdown_content__end,
                side === "right" && styles.dropdown_content__right,
                className
            )}
            style={{
                marginTop: side === "bottom" ? sideOffset : 0,
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    )
}

interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    inset?: boolean
    closeOnSelect?: boolean
}

export const DropdownMenuItem = ({
    children,
    className,
    onClick,
    inset = false,
    closeOnSelect = true,
    ...props
}: DropdownMenuItemProps) => {
    const { closeAll } = useDropdownMenuContext()

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick?.(event)
        if (closeOnSelect) {
            closeAll()
        }
    }

    return (
        <button
            type="button"
            role="menuitem"
            className={clsx(
                styles.dropdown_item,
                inset && styles.dropdown_item__inset,
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

interface DropdownMenuSubTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    inset?: boolean
}

export const DropdownMenuSubTrigger = ({
    children,
    className,
    onClick,
    inset = false,
    ...props
}: DropdownMenuSubTriggerProps) => {
    const { open, setOpen, openOnHover } = useDropdownMenuContext()

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick?.(event)
        if (openOnHover) {
            return
        }
        setOpen((prev) => !prev)
    }

    return (
        <button
            type="button"
            role="menuitem"
            aria-expanded={open}
            aria-haspopup="menu"
            className={clsx(
                styles.dropdown_item,
                styles.dropdown_subTrigger,
                inset && styles.dropdown_item__inset,
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

type DropdownMenuSubContentProps = Omit<DropdownMenuContentProps, "side">

export const DropdownMenuSubContent = ({
    align = "start",
    sideOffset = 12,
    ...props
}: DropdownMenuSubContentProps) => {
    return (
        <DropdownMenuContent
            align={align}
            side="right"
            sideOffset={sideOffset}
            {...props}
        />
    )
}

export const DropdownMenuSub = ({
    openOnHover = true,
    hoverCloseDelay = 160,
    ...props
}: DropdownMenuProps) => {
    return (
        <DropdownMenu
            isSub
            openOnHover={openOnHover}
            hoverCloseDelay={hoverCloseDelay}
            {...props}
        />
    )
}

interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    inset?: boolean
}

export const DropdownMenuLabel = ({
    children,
    className,
    inset = false,
    ...props
}: DropdownMenuLabelProps) => {
    return (
        <div
            className={clsx(
                styles.dropdown_label,
                inset && styles.dropdown_label__inset,
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export const DropdownMenuSeparator = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return <div className={clsx(styles.dropdown_separator, className)} {...props} />
}

export const DropdownMenuShortcut = ({
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) => {
    return <span className={clsx(styles.dropdown_shortcut, className)} {...props} />
}
