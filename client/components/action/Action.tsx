'use client'

import React, { useState } from 'react'
import styles from './action.module.scss'
import { Cart } from '../cart'
import { Notification } from '../notification'
import { Account } from '../account'
import { ButtonAccount } from '../buttonaccount'

const Action = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    return (
        <>
            {isLogin && <Cart />}
            {isLogin && <Notification />}
            {isLogin && <Account />}
            {!isLogin && <ButtonAccount text="sign up" link="/account/signup" />}
            {!isLogin && <ButtonAccount text="sing in" link="/account/signin" />}
        </>
    )
}

export default Action
