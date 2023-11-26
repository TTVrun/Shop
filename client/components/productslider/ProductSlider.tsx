'use client'

import React, { useEffect, useState } from 'react'
import styles from './productsliser.module.scss'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
    images: string[]
}

const ProductSlider = ({ images }: Props) => {
    const [indexStartShow, setIndexStartShow] = useState<number>(0)
    const [indexMainImage, setIndexMainImage] = useState<number>(0)

    const handleClickLeftBtn = () => {
        if (indexStartShow > 0) {
            setIndexStartShow((prev) => prev - 1)
        }
    }

    const handleClickRightBtn = () => {
        if (indexStartShow + 3 < images.length) {
            setIndexStartShow((prev) => prev + 1)
        }
    }

    const handleClickDot = (index: number) => {
        if (index + 3 >= images.length) {
            setIndexStartShow(images.length - 3)
        } else {
            setIndexStartShow(index)
        }
    }

    useEffect(() => {
        const elementsImg: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.img}`)
        if (elementsImg.length > 0) {
            for (let index = 0; index < elementsImg.length; index++) {
                if (index >= indexStartShow && index < indexStartShow + 3) {
                    elementsImg[index].style.display = 'block'
                } else {
                    elementsImg[index].style.display = 'none'
                }
            }
        }
    }, [indexStartShow])

    useEffect(() => {
        const elementsDot: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.dot}`)
        if (elementsDot.length > 0) {
            for (let index = 0; index < elementsDot.length; index++) {
                if (index >= indexStartShow && index < indexStartShow + 3) {
                    elementsDot[index].style.backgroundColor = '#000'
                } else {
                    elementsDot[index].style.backgroundColor = 'transparent'
                }
            }
        }
    }, [indexStartShow])

    return (
        <div className={styles.wimage}>
            <div className={styles.mainimage}>
                <Image src={images[indexMainImage]} alt="Image" width={100} height={100} layout="responsive" />
            </div>
            <div className={styles.slider}>
                {images.map((image, index) => {
                    return (
                        <Image
                            onClick={() => setIndexMainImage(index)}
                            className={styles.img}
                            key={index}
                            src={image}
                            alt="Image"
                            width={20}
                            height={20}
                            layout="responsive"
                        />
                    )
                })}
                <i onClick={handleClickLeftBtn} className={styles.btnleft}>
                    <FaChevronLeft />
                </i>
                <i onClick={handleClickRightBtn} className={styles.btnright}>
                    <FaChevronRight />
                </i>
                <ul className={styles.dots}>
                    {images.map((item, index) => {
                        return <li onClick={() => handleClickDot(index)} className={styles.dot} key={item}></li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ProductSlider
