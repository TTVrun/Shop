'use client'

import React, { memo, useState, useEffect } from 'react'
import styles from './relatedproducts.module.scss'
import { relatedProductsApi } from '@/apis/product'
import { shortProduct } from '@/types/data'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
    category: string
    pid: string
}

interface Response {
    success: boolean
    data: shortProduct[]
}

const RelatedProducts = ({ category, pid }: Props) => {
    const [data, setData] = useState<shortProduct[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const response: Response = await relatedProductsApi(category, pid)
            if (response.success) {
                setData(response.data)
            }
        }

        fetchData()
    }, [category, pid])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Other customers also buy:</div>
            <>
                {data && (
                    <div className={styles.container}>
                        {data.map((item) => {
                            return (
                                <Link
                                    href={{
                                        pathname: `/collections/${category}/products/${item.slug.toLowerCase()}`,
                                        query: { pid: item._id }
                                    }}
                                    key={item._id}
                                    className={styles.product}
                                >
                                    <Image
                                        className={styles.img}
                                        src={item.images[0]}
                                        width={100}
                                        height={100}
                                        alt="Image"
                                        layout="responsive"
                                    />
                                    <div className={styles.content}>
                                        <h4 className={styles.name}>
                                            {item.title.length > 22 ? `${item.title.slice(0, 22)}...` : item.title}
                                        </h4>
                                        <span className={styles.like}>{`${item.sumLike} Like`}</span>
                                        <small
                                            className={styles.price}
                                        >{`$${item.variations[0].prices[0].price} USD`}</small>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </>
        </div>
    )
}

export default memo(RelatedProducts)
