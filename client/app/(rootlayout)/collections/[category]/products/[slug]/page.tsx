'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { getProductApi } from '@/apis/product'
import { Product } from '@/types/data'
import styles from './page.module.scss'
import Image from 'next/image'
import { extrainfo } from '@/constant/product'
import { ProductInfo } from '@/components/productinfo'
import { Comments } from '@/components/comments'
import { RelatedProducts } from '@/components/releatedproducts'
import { SectionHeader } from '@/components/sectionheader'
import { ProductSlider } from '@/components/productslider'

interface Response {
    success: boolean
    data: Product
}

const Product = () => {
    const [data, setData] = useState<Product | null>(null)
    const [indexOption, setIndexOption] = useState<number>(0)
    const [indexColor, setIndexColor] = useState<number>(0)
    const [countQuantity, setCountQuantity] = useState<number>(1)
    const searchParams = useSearchParams()
    const pid = useMemo(() => {
        return searchParams.get('pid')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleIncreaseQuantity = () => {
        setCountQuantity((prev) => prev + 1)
    }

    const handleDecreaseQuantity = () => {
        if (countQuantity > 1) {
            setCountQuantity((prev) => prev - 1)
        }
    }

    const handleAddToCart = () => {
        console.log(`Count quantity: ${countQuantity}`)
        console.log(`Internal: ${data?.variations[indexOption].internal}`)
        console.log(`Color: ${data?.variations[indexOption].color[indexColor]}`)
        console.log(`Prices: ${data?.variations[indexOption].prices[0].price}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await getProductApi(pid as string)
            if (response.success) {
                setData(response.data)
            }
        }

        fetchData()
    }, [pid])

    useEffect(() => {
        const elementsBtnInternal: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.btninternal}`)
        if (elementsBtnInternal) {
            for (let index = 0; index < elementsBtnInternal.length; index++) {
                if (index === indexOption) {
                    elementsBtnInternal[index].style.border = '1px solid #349fe2'
                } else {
                    elementsBtnInternal[index].style.removeProperty('border')
                }
            }
        }
    }, [indexOption, data])

    useEffect(() => {
        const elementsBtnColor: NodeListOf<HTMLElement> = document.querySelectorAll(`.${styles.btncolor}`)
        if (elementsBtnColor) {
            for (let index = 0; index < elementsBtnColor.length; index++) {
                if (index === indexColor) {
                    elementsBtnColor[index].style.border = '1px solid #349fe2'
                } else {
                    elementsBtnColor[index].style.removeProperty('border')
                }
            }
        }
    }, [indexColor, data])

    return (
        <>
            {data && (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <SectionHeader title={data.title} />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.top}>
                            <div className={styles.image}>
                                <ProductSlider images={data.images} />
                            </div>
                            <div className={styles.wcontent}>
                                <small className={styles.price}>
                                    {`$${data.variations[indexOption].prices[0].price} USD`}
                                </small>
                                <small className={styles.like}>{`${data.sumLike} Like`}</small>
                                <ul className={styles.info}>
                                    {data.description.map((info) => {
                                        return <li key={info}>{info}</li>
                                    })}
                                </ul>
                                {data.variations.length > 1 && (
                                    <div className={styles.internal}>
                                        <span className={styles.title}>Internal</span>
                                        <div className={styles.wbutton}>
                                            {data.variations.map((item, index) => {
                                                return (
                                                    <button
                                                        className={styles.btninternal}
                                                        onClick={() => setIndexOption(index)}
                                                        key={item._id}
                                                    >
                                                        {item.internal}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                                <div className={styles.color}>
                                    <span className={styles.title}>Color</span>
                                    <div className={styles.wbutton}>
                                        {data.variations[indexOption].color.map((color, index) => {
                                            return (
                                                <button
                                                    onClick={() => setIndexColor(index)}
                                                    className={styles.btncolor}
                                                    key={color}
                                                >
                                                    {color}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={styles.quantity}>
                                    <span className={styles.title}>Quantity</span>
                                    <div>
                                        <button onClick={handleDecreaseQuantity} className={styles.btn}>
                                            -
                                        </button>
                                        <span className={styles.count}>{countQuantity}</span>
                                        <button onClick={handleIncreaseQuantity} className={styles.btn}>
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => setCountQuantity(1)} className={styles.reset}>
                                        Reset
                                    </button>
                                </div>
                                <div onClick={handleAddToCart} className={styles.add}>
                                    Add to card
                                </div>
                            </div>
                            <div className={styles.extrainfo}>
                                {extrainfo.map((item) => {
                                    return (
                                        <div className={styles.info} key={item.id}>
                                            <i className={styles.icon}>
                                                <item.icon />
                                            </i>
                                            <div className={styles.content}>
                                                <span className={styles.title}>{item.title}</span>
                                                <span className={styles.subtitle}>{item.subtitle}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            {data && (
                                <ProductInfo
                                    description={data.description}
                                    delivery={data.delivery}
                                    warranty={data.warranty}
                                    payment={data.payment}
                                />
                            )}
                            <Comments pid={data._id} />
                            {data && <RelatedProducts category={data.category} pid={data._id} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product
