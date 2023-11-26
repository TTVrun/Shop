import { getProductsByCategory } from '@/apis/product'
import { NotFoundStyle } from '@/components/notfound'
import { pathCollection } from '@/constant/collection'
import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import { path } from '@/constant/common'
import { FaArrowRight } from 'react-icons/fa'
import { Product } from '@/types/data'
import Image from 'next/image'
import { SectionHeader } from '@/components/sectionheader'

interface Response {
    success: boolean
    data: Product[]
}

const Collection = async ({ params: { category } }: { params: { category: string } }) => {
    const isValidPath = Object.values(pathCollection).includes(category)
    const response: Response = await getProductsByCategory(category)

    return (
        <>
            {isValidPath ? (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <SectionHeader title={category} />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.main}>
                            {response.success ? (
                                <>
                                    {response.data.map((item) => {
                                        return (
                                            <div className={styles.product} key={item._id}>
                                                <Image
                                                    className={styles.image}
                                                    src={item.images[0]}
                                                    alt="Image"
                                                    width={100}
                                                    height={100}
                                                    layout="responsive"
                                                />
                                                <div className={styles.content}>
                                                    <small className={styles.namephone}>
                                                        {item.title.length > 20
                                                            ? `${item.title.slice(0, 22)}...`
                                                            : item.title}
                                                    </small>
                                                    <span
                                                        className={styles.price}
                                                    >{`$${item.variations[0].prices[0].price} USD`}</span>
                                                    <div className={styles.wlink}>
                                                        <Link
                                                            className={styles.link}
                                                            href={{
                                                                pathname: `/collections/${category}/products/${item.slug.toLowerCase()}`,
                                                                query: { pid: item._id }
                                                            }}
                                                        >
                                                            <i className={styles.icon}>
                                                                <FaArrowRight />
                                                            </i>
                                                            <span>More info</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <div>Can not find products</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <NotFoundStyle />
            )}
        </>
    )
}

export default Collection
