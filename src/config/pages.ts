export type ListPages = 
    'MAIN' |
    'CONCERTS' |
    'NON_MUSIC' |
    'COLLECTIONS' |
    'AUTH'


export const ListPagesPaths: Record<ListPages, string> = {
    "MAIN": '/',
    'NON_MUSIC': '/non-music',
    'CONCERTS': '/concerts',
    "COLLECTIONS": '/collection',
    "AUTH": "/auth"
}