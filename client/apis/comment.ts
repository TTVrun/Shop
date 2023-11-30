import instance from '.'

export const commentProductApi = async (token: string, pid: string, data: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.post(`comment/${pid}`, { content: data })
    return response.data
}

export const replyCommentApi = async (token: string, cid: string, data: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await instance.post(`comment/replycomment/${cid}`, { content: data })
    return response.data
}

export const getCommentApi = async (cid: string) => {
    const response = await instance.get(`comment/${cid}`)
    return response.data
}
