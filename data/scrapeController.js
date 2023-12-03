const convertData = require('./fn')
const scrapers = require('./scraper')
const fs = require('fs')
const listCommune = require('./listCommune.json')

const scrapeController = async (browserInstance) => {
    //Product
    // const url = 'https://digital-world-store.myshopify.com/'
    //Province
    // const url = 'https://vi.wikipedia.org/wiki/T%E1%BB%89nh_th%C3%A0nh_Vi%E1%BB%87t_Nam'
    //District
    // const url =
    // 'https://vi.wikipedia.org/wiki/Danh_s%C3%A1ch_%C4%91%C6%A1n_v%E1%BB%8B_h%C3%A0nh_ch%C3%ADnh_c%E1%BA%A5p_huy%E1%BB%87n_c%E1%BB%A7a_Vi%E1%BB%87t_Nam'
    //Commune list
    const url =
        'https://vi.wikipedia.org/wiki/Th%E1%BB%83_lo%E1%BA%A1i:Danh_s%C3%A1ch_x%C3%A3_t%E1%BA%A1i_Vi%E1%BB%87t_Nam'
    try {
        let browser = await browserInstance
        // Call scraper method in scaper file
        // get Info product
        /**
         * let categories = await scrapers.scrapeCategory(browser, url)
        let fullLink = {}
        // const listProduct = await scrapers.scraper(browser, categories[0].link, categories[0].category)
        for (let i of categories) {
            let links = await scrapers.listLinkProductScrape(browser, i.link, i.category)
            const key = i.category.toLowerCase()
            fullLink[key] = links
        }
        const keysOfLink = Object.keys(fullLink)
        const data = {}
        for (let key of keysOfLink) {
            let arr = []
            for (let obj of fullLink[key]) {
                let pro = await scrapers.detailProduct(browser, obj.link)
                if (pro) {
                    pro.categories = key
                }
                arr.push(pro)
            }
            data[key] = arr
        }
        fs.writeFile('xxx', JSON.stringify(data), (err) => {
            if (err) {
                console.log(err)
            }
            console.log('Successfully')
        })
         */

        //Province
        // const province = await scrapers.getProvince(browser, url)
        // const data = { province }
        // fs.writeFile('province.json', JSON.stringify(data), (err) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     console.log('Successfully')
        // })

        //District
        // const district = await scrapers.getDistrict(browser, url)
        // let data = { district }
        // fs.writeFile('district.json', JSON.stringify(data), (err) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     console.log('Successfully')
        // })

        //Commune list
        // const listLinkCommune = await scrapers.getLinkCommune(browser, url)
        // let data = { listLinkCommune }
        // fs.writeFile('listCommune.json', JSON.stringify(data), (err) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     console.log('Successfully')
        // })

        // await scrapers.getCommune(browser, listLinkCommune[1].link)
        // const data = {}
        // for (let i = 0; i < listCommune.listCommune.length; i++) {
        //     const rs = await scrapers.getCommune(browser, listCommune.listCommune[i].link)
        //     const code = listCommune.listCommune[i].code
        //     data[code] = rs
        // }
        // fs.writeFile('xxx', JSON.stringify(data), (err) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     console.log('Successfully')
        // })
    } catch (error) {
        console.log(error)
    }
}

module.exports = scrapeController
