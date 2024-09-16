export interface PropriedadesDaPaginaDeLista {
    lista: ValoresListados[]
}

export interface ValoresListados {
    id: number
    title: string
    completed: boolean
}