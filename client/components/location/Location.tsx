import React, { useState } from 'react'
import styles from './location.module.scss'
import { OptionLocation } from '../optionlocation'
import { keyLocation } from '@/constant/location'
import { InfoUser, TLocationDataSubmit } from '@/types/data'
import { Modal } from '../modal'
import { createLocationApi, deleteLocationApi } from '@/apis/location'
import { useAppSelector } from '@/redux/hooks'

interface Props {
    userInfo: InfoUser
}

const Location = ({ userInfo }: Props) => {
    const token = useAppSelector((state) => state.userReducer.token)
    const [listAddress, setListAddress] = useState(userInfo.address)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [textModal, setTextModal] = useState<string>('')
    const [isSuccessModal, setIsSuccessModal] = useState<boolean>(true)
    const [isShowUpdateButton, setIsShowUpdateButton] = useState<boolean>(true)
    const [extrainfo, setExtrainfo] = useState<string>('')
    const [locationData, setLocationData] = useState<TLocationData>({
        province: null,
        district: null,
        commune: null
    })

    const handleClickCacel = () => {
        setIsShowUpdateButton(true)
        setLocationData({
            province: null,
            district: null,
            commune: null
        })
        setExtrainfo('')
    }

    const handleUpdateData = async () => {
        if (Object.values(locationData).every((value) => value !== null) && extrainfo.length > 0) {
            const data: TLocationDataSubmit = {
                province: locationData.province as string,
                district: locationData.district as string,
                commune: locationData.commune as string,
                extrainfo
            }
            const response = await createLocationApi(token as string, data)
            if (response.success) {
                setListAddress((prev) => {
                    return [response.address, ...prev]
                })

                handleClickCacel()
            }
        } else {
            setIsOpenModal(true)
            setIsSuccessModal(false)
            setTextModal('Information is lacking')
        }
    }

    const handleDeleteAddress = async (aid: string) => {
        const response = await deleteLocationApi(token as string, aid)
        if (response.success) {
            setListAddress((prev) => prev.filter((address) => address._id !== aid))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h4 className={styles.title}>Location</h4>
                <div>
                    {!(listAddress.length > 0) ? (
                        <span>You have not updated your location</span>
                    ) : (
                        <div>
                            {listAddress.map((address, index) => {
                                return (
                                    <div className={styles.address} key={index}>
                                        <div className={styles.info}>
                                            <span
                                                className={styles.title}
                                            >{`${address.province} - ${address.district} - ${address.commune}`}</span>
                                            <span className={styles.sub}>{address.extrainfo}</span>
                                        </div>
                                        <button
                                            className={styles.delete}
                                            onClick={() => handleDeleteAddress(address._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                {isShowUpdateButton && (
                    <button className={styles.btn} onClick={() => setIsShowUpdateButton(false)}>
                        Add address
                    </button>
                )}
                {!isShowUpdateButton && (
                    <div className={styles.option}>
                        <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.PROVINCE} />
                        <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.DISTRICT} />
                        <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.COMMUNE} />
                        <input
                            className={styles.input}
                            type="text"
                            onChange={(e) => setExtrainfo(e.target.value)}
                            value={extrainfo}
                            placeholder="House number, street name, etc."
                        />
                        <div className={styles.wbutton}>
                            <button className={styles.cancel} onClick={handleClickCacel}>
                                Cancel
                            </button>
                            <button className={styles.add} onClick={handleUpdateData}>
                                Add
                            </button>
                        </div>
                    </div>
                )}
                {/* extra info */}
            </div>
            <Modal isOpen={isOpenModal} setOpen={setIsOpenModal} text={textModal} isSuccess={isSuccessModal} />
        </div>
    )
}

export default Location
