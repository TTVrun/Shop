export interface CommonData {
    name: string
    username: string
    email: string
    password: string
}

export interface SubmitData {
    name?: string
    username: string
    email?: string
    password: string
}

export interface CommonError {
    name: string | null
    username: string | null
    email: string | null
    password: string | null
}

export interface CheckError {
    name?: string | null
    username: string | null
    email?: string | null
    password: string | null
}

export type handleError = (keyName: string) => null | string
