"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        md: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type LegacyRadius = "xs" | "sm" | "md" | "lg" | "xl"

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  classNames?: string
  fullWidth?: boolean
  loading?: boolean
  component?: "a" | "button"
  href?: string
  radius?: LegacyRadius
}

const radiusClassMap: Record<LegacyRadius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}

function Button({
  className,
  classNames,
  variant = "default",
  size = "default",
  fullWidth = false,
  loading = false,
  disabled,
  component = "button",
  href,
  radius,
  ...props
}: ButtonProps) {
  const resolvedClassName = cn(
    buttonVariants({ variant, size, className }),
    classNames,
    fullWidth && "w-full",
    radius ? radiusClassMap[radius] : undefined
  )

  if (component === "a" && href) {
    const { children, ...anchorProps } = props

    return (
      <a
        href={href}
        className={cn(resolvedClassName, loading && "pointer-events-none opacity-50")}
        {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={resolvedClassName}
      disabled={disabled || loading}
      {...props}
    />
  )
}

interface ButtonIconProps extends Omit<ButtonProps, "size" | "variant"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: ButtonProps["variant"] | "subtle" | "light"
}

const iconSizeMap: Record<NonNullable<ButtonIconProps["size"]>, NonNullable<ButtonProps["size"]>> = {
  xs: "icon-xs",
  sm: "icon-sm",
  md: "icon",
  lg: "icon-lg",
  xl: "icon-lg",
}

const iconVariantMap = {
  subtle: "ghost",
  light: "secondary",
} as const

function ButtonIcon({
  size = "md",
  variant,
  ...props
}: ButtonIconProps) {
  const mappedVariant: ButtonProps["variant"] =
    variant === "subtle" ? "ghost" : variant === "light" ? "secondary" : variant

  return <Button size={iconSizeMap[size]} variant={mappedVariant} {...props} />
}

export { Button, ButtonIcon, buttonVariants }
