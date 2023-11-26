import React, { memo, useEffect, useState } from 'react'
import styles from './cart.module.scss'
import { TiShoppingCart } from 'react-icons/ti'
import { useAppSelector } from '@/redux/hooks'

const Cart: React.FC = () => {
    const cart = [1, 2]

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <TiShoppingCart />
                {cart.length > 0 && <span className={styles.number}>{cart.length}</span>}
            </div>
        </div>
    )
}

export default memo(Cart)
