import React from 'react'
import styles from './cart.module.scss'
import { TiShoppingCart } from 'react-icons/ti'

const Cart = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <TiShoppingCart />
                <span className={styles.number}>1</span>
            </div>
        </div>
    )
}

export default Cart
