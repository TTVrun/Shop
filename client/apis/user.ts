import { SubmitData } from '@/types/account'
import instance from '.'
import { useAppSelector } from '@/redux/hooks'

export const signupApi = async (data: SubmitData) => {
    const response = await instance.post('user/signup', data)
    return response.data
}

export const signinApi = async (data: SubmitData) => {
    const response = await instance.post('user/signin', data)
    return response.data
}

export const forgetpasswordApi = async (data: SubmitData) => {
    const response = await instance.post('user/forgetpassword', data)
    return response.data
}

export const getCurrentApi = async (token: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.get('user/getcurrent')
    return response.data
}

export const resetCount = async () => {
    const response = await instance.get('user/resetcount')
    return response.data
}

export const logoutApi = async () => {
    const response = await instance.get('user/logout')
    return response.data
}
