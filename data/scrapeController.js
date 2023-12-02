const scrapers = require('./scraper')
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    //Product
    // const url = 'https://digital-world-store.myshopify.com/'
    //Province
    const url = 'https://vi.wikipedia.org/wiki/T%E1%BB%89nh_th%C3%A0nh_Vi%E1%BB%87t_Nam'
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
    } catch (error) {
        console.log(error)
    }
}

module.exports = scrapeController
