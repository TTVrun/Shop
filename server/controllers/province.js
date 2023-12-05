const provinceData = require('../../data/province.json')
const Province = require('../models/province')

const insertProvince = async (req, res, next) => {
    try {
        provinceData.province.forEach(async (elm) => {
            await Province.create(elm)
        })

        return res.send('oke')
    } catch (error) {
        next(error)
    }
}

const getProvince = async (req, res, next) => {
    try {
        const provinces = await Province.find().select('province')

        return res.json({
            success: provinces ? true : false,
            data: provinces ? provinces : []
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    insertProvince,
    getProvince
}
