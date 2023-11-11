const scrapers = require('./scraper')
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    const url = 'https://digital-world-store.myshopify.com/'
    try {
        let browser = await browserInstance
        // Call scraper method in scaper file
        let categories = await scrapers.scrapeCategory(browser, url)
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
    } catch (error) {
        console.log(error)
    }
}

module.exports = scrapeController
