import React, { useState } from 'react'
import styles from './location.module.scss'
import { OptionLocation } from '../optionlocation'
import { keyLocation } from '@/constant/location'

const Location = () => {
    const [locationData, setLocationData] = useState<TLocationData>({
        province: null,
        district: null,
        commune: null
    })

    //fetch api location

    console.log(locationData)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h4 className={styles.title}>Location</h4>
                <div className={styles.option}>
                    <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.PROVINCE} />
                    <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.DISTRICT} />
                    <OptionLocation data={locationData} setData={setLocationData} keyName={keyLocation.COMMUNE} />
                </div>
                {/* extra info */}
            </div>
        </div>
    )
}

export default Location
