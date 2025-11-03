import { ArrowBigDownDash } from "lucide-react"

// Тип страниц (ключи)
export type ListPages =
  | 'MAIN'
  | 'CONCERTS'
  | 'NON_MUSIC'
  | 'COLLECTIONS'
  | 'AUTH'
  | 'PROFILE'
  | 'PROFILE_PERSONAL'
  | 'PROFILE_MY_MUSIC'
  | 'LOGOUT'

// Тип элемента страницы
export type PageItem = {
  href: string
  icon?: React.ComponentType
}

// Пути (если нужно централизованное хранение)
export const ListPagesPaths: Record<ListPages, string> = {
  MAIN: '/',
  CONCERTS: '/concerts',
  NON_MUSIC: '/non-music',
  COLLECTIONS: '/collection',
  AUTH: '/auth',
  PROFILE: '/profile',
  PROFILE_PERSONAL: '/personal',
  PROFILE_MY_MUSIC: '/my-music',
  LOGOUT: '/logout',
}

// Основной объект с данными о страницах
export const ListPagesConfig: Record<ListPages, PageItem> = {
  MAIN: {
    href: ListPagesPaths.MAIN,
    icon: ArrowBigDownDash,
  },
  CONCERTS: {
    href: ListPagesPaths.CONCERTS,
  },
  NON_MUSIC: {
    href: ListPagesPaths.NON_MUSIC,
  },
  COLLECTIONS: {
    href: ListPagesPaths.COLLECTIONS,
  },
  AUTH: {
    href: ListPagesPaths.AUTH,
  },
  PROFILE: {
    href: ListPagesPaths.PROFILE,
  },
  PROFILE_PERSONAL: {
    href: `${ListPagesPaths.PROFILE}${ListPagesPaths.PROFILE_PERSONAL}`,
  },
  PROFILE_MY_MUSIC: {
    href: `${ListPagesPaths.PROFILE}${ListPagesPaths.PROFILE_MY_MUSIC}`,
  },
  LOGOUT: {
    href: ListPagesPaths.LOGOUT,
  },
}
