import React from "react"
import { ListPagesConfig } from "@/config/pages"
import SidebarLink from "@/components/widgets/sidebar/sidebarLink/SidebarLink"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const SidebarProfile = () => {
  return (
    <aside className="col-span-1 flex h-full flex-col gap-3 pr-[var(--padding-main)]">
      <SidebarGroup className="px-0 py-0">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarLink href={ListPagesConfig.PROFILE_PERSONAL.href}>Личная информация</SidebarLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarLink href={ListPagesConfig.PROFILE_MY_MUSIC.href}>Моя музыка</SidebarLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </aside>
  )
}

export default SidebarProfile
