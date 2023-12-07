export interface InfoUser {
    name: string
    avatar: string
    cart: Array<any>
    countNewNotification: number
    email: string
    historyComment: Array<any>
    historyView: Array<any>
    notification: Array<Notification>
    wishList: Array<any>
    address: TLocation[]
    phone: string
    accountBalance: number
    __v: number
    _id: string
}

export interface TLocation {
    _id: string
    province: string
    district: string
    commune: string
    extrainfo: string
    __v: number
}

export interface Notification {
    title: string
    subtitle: string
    image: string
    _id: string
}

export interface Product {
    _id: string
    title: string
    slug: string
    variations: OptionProduct[]
    images: string[]
    sumLike: number
    likeBy: any[]
    category: string
    description: string[]
    warranty: string[]
    delivery: string[]
    payment: string[]
    comment: any[]
    __v: 0
}

export interface OptionProduct {
    internal: string
    color: string[]
    prices: Price[]
    _id: string
}

export interface Price {
    option: string
    price: number
    _id: string
}

export interface shortProduct {
    _id: string
    title: string
    slug: string
    variations: OptionProduct[]
    images: string[]
    sumLike: number
    category: string
}

export interface TComment {
    content: string
    createdAt: string
    commentBy: {
        avatar: string
        name: string
        role: string
        _id: string
    }
    updatedAt: string
    __v: number
    _id: string
    replies: TComment[]
}

export interface TProvince {
    province: string
    _id: string
}

export interface TDistrict {
    district: string
    _id: string
}

export interface TCommune {
    commune: string
    _id: string
}

export interface TLocationDataSubmit {
    province: string
    district: string
    commune: string
    extrainfo: string
}
