import instance from '.'

export const getProductsByCategory = async (category: string) => {
    const response = await instance.get(`product/getproductsbycategory/${category}`)
    return response.data
}

export const getProductApi = async (pid: string) => {
    const response = await instance.get(`product/${pid}`)
    return response.data
}

export const relatedProductsApi = async (category: string, pid: string) => {
    const response = await instance.get(`product/related/${category}/${pid}`)
    return response.data
}
