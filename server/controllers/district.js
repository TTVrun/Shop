const districtData = require('../../data/district.json')
const District = require('../models/district')

const insertDistrict = async (req, res, next) => {
    try {
        districtData.district.forEach(async (elm) => {
            await District.create({
                district: elm.district,
                province: elm.province
            })
        })

        return res.send('oke')
    } catch (error) {
        next(error)
    }
}

const getDistrictByProvince = async (req, res, next) => {
    try {
        const { province } = req.query
        if (!province) {
            throw new Error('Missing province')
        }
        const response = await District.find({ province })

        return res.json({
            success: response ? true : false,
            data: response ? response : []
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    insertDistrict,
    getDistrictByProvince
}
