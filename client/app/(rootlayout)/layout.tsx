import { Header } from '@/components/header'
import React from 'react'

const rootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default rootLayout
