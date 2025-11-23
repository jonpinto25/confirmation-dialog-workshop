export interface Place {
    id: number,
    title: string,
    childIds: number[]
}

export type Plan = Record<number, Place>
