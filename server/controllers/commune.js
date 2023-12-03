const commnueData = require('../../data/commune.json')
const provinceData = require('../../data/province.json')
const Commune = require('../models/commune')

const insertCommune = async (req, res, next) => {
    try {
        Object.keys(commnueData).forEach((key) => {
            commnueData[key].forEach(async (item) => {
                await Commune.create({
                    district: item.district,
                    commune: item.commune,
                    province: provinceData.province.find((obj) => obj.abbreviatedCode === key).province
                })
            })
        })

        return res.send('oke')
    } catch (error) {
        next(error)
    }
}

const getDistrictByProvinceAndDistrict = async (req, res, next) => {
    try {
        const { province, district } = req.query
        if (!province || !district) {
            throw new Error('Missing province')
        }
        const response = await Commune.find({ province, district })

        return res.json({
            success: response ? true : false,
            data: response ? response : []
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    insertCommune,
    getDistrictByProvinceAndDistrict
}
