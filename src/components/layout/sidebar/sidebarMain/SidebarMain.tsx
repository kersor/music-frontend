import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SidebarAuth from "@/components/widgets/sidebar/sidebarAuth/SidebarAuth"
import SidebarLink from "@/components/widgets/sidebar/sidebarLink/SidebarLink"
import { ListPagesConfig } from "@/config/pages"

const SidebarMain = () => {
  return (
    <Sidebar
      collapsible="none"
      className="my-5 h-[calc(100vh-(var(--margin-main)*2))] rounded-[10px] border border-sidebar-border bg-sidebar p-3"
    >
      <SidebarHeader className="px-0 pb-4 pt-0 text-center">
        <div className="text-sm font-semibold text-sidebar-foreground/80 uppercase">kersor музыка</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0 py-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarLink href={ListPagesConfig.MAIN.href}>Главная</SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink href={ListPagesConfig.CONCERTS.href}>Концерты</SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink href={ListPagesConfig.NON_MUSIC.href}>Книги и подкасты</SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink href={ListPagesConfig.COLLECTIONS.href}>Коллекции</SidebarLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-0 pt-4 pb-0">
        <SidebarAuth />
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarMain
