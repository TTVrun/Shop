import { email, max10, min2, min4, min6, notSpace, required } from '@/utils/handlestring'

export const listInvalidPathAccount: string[] = ['signin', 'signup', 'forgetpassword']

export const pathAccount = {
    SIGN_IN: 'signin',
    SIGN_UP: 'signup',
    FOETGET_PASSWORD: 'forgetpassword'
}

export const errorMethod = {
    name: [required, min2, max10],
    username: [required, notSpace, min4, max10],
    email: [required, email],
    password: [required, notSpace, min6]
}
export const listKeyName: string[] = ['name', 'username', 'email', 'password']

export const keyNameObj = {
    NAME: 'name',
    USERNAME: 'username',
    EMAIL: 'email',
    PASSWORD: 'password'
}

export const content = {
    TITLE: 'Welcome back!',
    SIGN_IN: 'To keep connected with us please login with your personal info',
    SIGN_UP: 'Enter your personal details and start journey with us',
    FOETGET_PASSWORD: 'Enter your registered email address to reset your password and continue your journey with us'
}
