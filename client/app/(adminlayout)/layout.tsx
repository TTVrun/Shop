import { Header } from '@/components/admin/header'
import { Navigation } from '@/components/navigation'
import React from 'react'

const adminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default adminLayout
