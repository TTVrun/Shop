import { Header } from '@/components/header'
import { Navigation } from '@/components/navigation'
import React from 'react'

const rootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <Navigation />
            {children}
        </div>
    )
}

export default rootLayout
