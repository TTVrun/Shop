import { SubmitData } from '@/types/account'
import instance from '.'

export const signupApi = async (data: SubmitData) => {
    const response = await instance.post('user/signup', data)
    return response.data
}

export const signinApi = async (data: SubmitData) => {
    const response = await instance.post('user/signin', data)
    return response
}

export const forgetpasswordApi = async (data: SubmitData) => {
    const response = await instance.post('user/forgetpassword', data)
    return response.data
}
