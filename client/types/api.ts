import { InfoUser } from './data'

export interface ResponseSuccessSignin {
    success: boolean
    mes: string
    token: string
}

export interface ResponseSuccess {
    success: boolean
    mes: string
}

export interface TGetCurrent {
    success: boolean
    data: InfoUser
}
