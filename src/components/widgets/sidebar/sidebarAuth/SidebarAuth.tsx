import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ListPagesConfig } from "@/config/pages"
import { getIsAuthAsync } from "@/utils/getIsAuth"
import SidebarUser from "../sidebarUser/SidebarUser"

const SidebarAuth = async () => {
  const isAuth = await getIsAuthAsync()

  if (isAuth) {
    return <SidebarUser />
  }

  return (
    <div className="flex w-full">
      <Button className="w-full cursor-pointer">
        <Link href={`${ListPagesConfig.AUTH.href}?mode=login`}>Войти</Link>
      </Button>
    </div>
  )
}

export default SidebarAuth
