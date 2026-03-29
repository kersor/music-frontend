export interface ICollection {
    id: string
    authorId: string
    image: string | null
    name: string
}

export type ICollectionUpdate = Partial<ICollection>