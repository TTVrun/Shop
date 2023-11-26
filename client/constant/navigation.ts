import { LuSmartphone, LuLaptop2 } from 'react-icons/lu'
import { BsLaptop } from 'react-icons/bs'
import { TfiHeadphone } from 'react-icons/tfi'
import { IoCameraOutline } from 'react-icons/io5'
import { HiMiniDeviceTablet } from 'react-icons/hi2'
import { BiPrinter } from 'react-icons/bi'
import { CiSpeaker } from 'react-icons/ci'
import { path } from './common'

const navigation = [
    {
        id: 0,
        icon: LuSmartphone,
        title: 'Smartphone',
        link: path.SMARTPHONE
    },
    {
        id: 1,
        icon: HiMiniDeviceTablet,
        title: 'Tablet',
        link: path.TABLET
    },
    {
        id: 2,
        icon: BsLaptop,
        title: 'Laptop',
        link: path.LAPTOP
    },
    {
        id: 3,
        icon: TfiHeadphone,
        title: 'Accessories',
        link: path.ACCESSORIES
    },
    {
        id: 4,
        icon: IoCameraOutline,
        title: 'Camera',
        link: path.CAMERA
    },
    {
        id: 5,
        icon: LuLaptop2,
        title: 'Television',
        link: path.TELEVISION
    },
    {
        id: 6,
        icon: BiPrinter,
        title: 'Printer',
        link: path.PRINTER
    },
    {
        id: 7,
        icon: CiSpeaker,
        title: 'Speaker',
        link: path.SPEAKER
    }
]

export default navigation
