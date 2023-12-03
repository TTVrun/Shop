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
    address: {
        province: string
        district: string
        commune: string
        extrainfo: string
    }
    phone: string
    accountBalance: number
    __v: number
    _id: string
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
