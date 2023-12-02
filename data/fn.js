const listCommune = require('./listCommune.json')
const province = require('./province.json')

const convertData = () => {
    const convertedData = listCommune.listLinkCommune.map((elm) => {
        return {
            ...elm,
            code: province.province.filter((item) => item.provice === elm.province)[0]?.abbreviatedCode
        }
    })
}

module.exports = convertData
