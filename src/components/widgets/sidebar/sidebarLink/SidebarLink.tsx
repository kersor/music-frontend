"use client"

import React, { PropsWithChildren } from "react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarMenuButton } from "@/components/ui/sidebar"

interface Props extends LinkProps {
  className?: string
  isHandleActiveLink?: boolean
}

const SidebarLink = ({
  href = "",
  className,
  children,
  isHandleActiveLink = true,
}: PropsWithChildren<Props>) => {
  const pathname = usePathname()
  const target = typeof href === "string" ? href : href.toString()
  const isRoot = target === "/"
  const isActive = isRoot ? pathname === "/" : pathname === target || pathname.startsWith(`${target}/`)

  return (
    <SidebarMenuButton
      render={<Link href={href} />}
      isActive={isHandleActiveLink && isActive}
      className={cn("text-sm", className)}
    >
      <span>{children}</span>
    </SidebarMenuButton>
  )
}

export default SidebarLink
