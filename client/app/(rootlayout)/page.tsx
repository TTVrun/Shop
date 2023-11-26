'use client'

import { LoadingStyle } from '@/components/loading'
import { Modal } from '@/components/modal'
import { logout, signin } from '@/redux/features/userSlide'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h2>This is home page</h2>
            <Link href="/account/signin">Sign in</Link>
        </div>
    )
}
