import React, { useEffect, useRef, useState } from 'react'
import styles from './optionlocation.module.scss'
import { keyLocation } from '@/constant/location'
import { useAppSelector } from '@/redux/hooks'
import { getCommuneApi, getDistrictApi, getProvinceApi } from '@/apis/location'
import { TCommune, TDistrict, TProvince } from '@/types/data'

interface Props {
    keyName: string
    setData: React.Dispatch<React.SetStateAction<TLocationData>>
    data: TLocationData
}

interface Response<T> {
    success: boolean
    data: T[]
}

type Data = [] | TProvince[] | TDistrict[] | TCommune[]

const OptionLocation = ({ keyName, setData, data }: Props) => {
    const token = useAppSelector((state) => state.userReducer.token)
    const [isChoose, setIsChoose] = useState<boolean>(false)
    const [listData, setListData] = useState<Data>([])
    const [listDataShow, setListDataShow] = useState<Data>([])

    const handleClickItem = (obj: TProvince | TDistrict | TCommune) => {
        setIsChoose(false)

        if (keyName === keyLocation.PROVINCE) {
            setData({
                district: null,
                commune: null,
                province: obj[keyName as keyof typeof obj]
            })
        } else if (keyName === keyLocation.DISTRICT) {
            setData((prev) => {
                return {
                    ...prev,
                    district: obj[keyName as keyof typeof obj]
                }
            })
        } else {
            setData((prev) => {
                return {
                    ...prev,
                    commune: obj[keyName as keyof typeof obj]
                }
            })
        }
    }

    useEffect(() => {
        if (isChoose) {
            if (keyName === keyLocation.PROVINCE) {
                const fetchData = async () => {
                    const response: Response<TProvince> = await getProvinceApi(token as string)
                    if (response.success) {
                        setListData(response.data)
                        setListDataShow(response.data)
                    }
                }

                fetchData()
            } else if (keyName === keyLocation.DISTRICT) {
                const fetchData = async () => {
                    const response: Response<TDistrict> = await getDistrictApi(token as string, data.province as string)
                    if (response.success) {
                        setListData(response.data)
                        setListDataShow(response.data)
                    }
                }

                fetchData()
            } else {
                const fetchData = async () => {
                    const response: Response<TCommune> = await getCommuneApi(
                        token as string,
                        data.province as string,
                        data.district as string
                    )
                    if (response.success) {
                        setListData(response.data)
                        setListDataShow(response.data)
                    }
                }

                fetchData()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChoose, data])

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{keyName.charAt(0).toUpperCase() + keyName.slice(1)}</h4>
            <div className={styles.container}>
                <span className={styles.text} onClick={() => setIsChoose((prev) => !prev)}>
                    {data[keyName as keyof typeof data] || `Select ${keyName}`}
                </span>
                {isChoose && listDataShow.length > 0 && (
                    <ul className={styles.list}>
                        {listDataShow.map((item) => {
                            return (
                                <li
                                    className={styles.item}
                                    onClick={() => handleClickItem(item)}
                                    key={item[keyName as keyof typeof item]}
                                >
                                    {item[keyName as keyof typeof item]}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default OptionLocation
