import React, { useEffect, useState, memo } from 'react'
import styles from './productinfo.module.scss'
import { buttonProductInfo } from '@/constant/product'

interface Props {
    description: string[]
    warranty: string[]
    delivery: string[]
    payment: string[]
}

const ProductInfo = ({ description, warranty, payment, delivery }: Props) => {
    const [indexShow, setIndexShow] = useState<number>(0)
    const [dataShow, setDataShow] = useState<string[]>(description)

    const handleSetIndexShow = (index: number) => {
        setIndexShow(index)
        if (index === 0) {
            setDataShow(description)
        }
        if (index === 1) {
            setDataShow(warranty)
        }
        if (index === 2) {
            setDataShow(payment)
        }
        if (index === 3) {
            setDataShow(delivery)
        }
    }

    useEffect(() => {
        const elementsBtn: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.btn}`)
        if (elementsBtn.length > 0) {
            for (let index = 0; index < elementsBtn.length; index++) {
                if (index === indexShow) {
                    elementsBtn[index].classList.add(styles.active)
                } else {
                    elementsBtn[index].classList.remove(styles.active)
                }
            }
        }
    }, [indexShow])

    return (
        <div className={styles.wrapper}>
            <div className={styles.wbutton}>
                {buttonProductInfo.map((item, index) => {
                    return (
                        <button onClick={() => handleSetIndexShow(index)} className={styles.btn} key={item.id}>
                            {item.title}
                        </button>
                    )
                })}
            </div>
            <div className={styles.content}>
                {dataShow.map((item) => {
                    return <span key={item}>{item}</span>
                })}
            </div>
        </div>
    )
}

export default memo(ProductInfo)
