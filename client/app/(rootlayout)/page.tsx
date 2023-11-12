'use client'

import { LoadingStyle } from '@/components/loading'
import { Modal } from '@/components/modal'
import { logout, signin } from '@/redux/features/userSlide'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useState } from 'react'

export default function Home() {
    const isSignin = useAppSelector((state) => state.userReducer.isSignin)
    const token = useAppSelector((state) => state.userReducer.token)
    const dispatch = useAppDispatch()
    return (
        <div>
            <h2>This is home page</h2>
            <div>{isSignin ? 'true' : 'false'}</div>
            <div>{token ? token : 'null'}</div>
            <button onClick={() => dispatch(signin('this is token'))}>Click</button>
            <button onClick={() => dispatch(logout())}>Click</button>
        </div>
    )
}
