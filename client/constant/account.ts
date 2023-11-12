import { email, max10, min2, min4, min6, notSpace, required } from '@/utils/handlestring'

export const invalidPathAccount: string[] = ['signin', 'signup', 'forgetpassword']
export const messagePath: string[] = ['sign in', 'sign up', 'forget password']
// export const messagePath: string[] = ['sign in', 'sign up', 'forget password']
export const namePath = {
    SIGN_IN: 'sign in',
    SIGN_UP: 'sign up',
    FOETGET_PASSWORD: 'forget password'
}
export const errorMethod = {
    name: [required, min2, max10],
    username: [required, notSpace, min4, max10],
    email: [required, email],
    password: [required, notSpace, min6]
}
export const listKeyName: string[] = ['name', 'username', 'email', 'password']
