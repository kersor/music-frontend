export interface IMusic {
    id: string
    name: string
    author: IAuthor
    filename: string
    image: string
    duration: number
}

export interface IAuthor {
    id: string
    name: string
}