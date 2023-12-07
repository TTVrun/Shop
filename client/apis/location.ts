import { TLocationDataSubmit } from '@/types/data'
import instance from '.'

export const getProvinceApi = async (token: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.get('province')
    return response.data
}

export const getDistrictApi = async (token: string, province: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.get(`district/${province}`)
    return response.data
}

export const getCommuneApi = async (token: string, province: string, district: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.get(`commune/${province}/${district}`)
    return response.data
}

export const createLocationApi = async (token: string, data: TLocationDataSubmit) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.post(`location`, data)
    return response.data
}

export const deleteLocationApi = async (token: string, aid: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.delete(`location/${aid}`)
    return response.data
}
