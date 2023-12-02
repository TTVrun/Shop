const scrapeCategory = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('#digital-world-store')
        console.log('>> Website ready')

        const dataCategory = await page.$$eval(
            '#PageContainer > #shopify-section-header > .navigation-style-1 > .navigation-bar  ul > li',
            (els) => {
                let data = els.map((el) => {
                    return {
                        link: el.querySelector('a').href,
                        category: el.querySelector('a > .icon-name').innerText
                    }
                })
                return data
            }
        )
        console.log('Close tab')
        page.close()
        return dataCategory
    } catch (error) {
        console.log(error)
    }
}

const listLinkProductScrape = async (browser, url, category) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access' + url)
        await page.waitForSelector(`#${category.toLowerCase()}`)
        console.log('>> Website ready')

        const listLinkProduct = await page.$$eval(
            '#PageContainer > .main-content #CollectionSection > #collection_content #main-collection-product-grid > .collection > #collection-product-grid > .grid-element',
            (els) => {
                let data = els.map((el) => {
                    return {
                        link: el.querySelector('.grid-view-item > .grid-normal-display > .product-image > a').href
                    }
                })
                return data
            }
        )

        console.log('Close tab')
        page.close()
        return listLinkProduct
    } catch (error) {
        console.log(error)
    }
}

const detailProduct = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('body')
        console.log('>> Website ready')

        const product = await page.$eval(
            '#PageContainer > .main-content > #shopify-section-product-template > div > .wrapper > div > .product-single',
            (el) => {
                return {
                    // price: el.querySelector(
                    //     '.product-single__meta--wrapper > .product-single__meta .price_wrapper > #ProductPrice > span'
                    // ).innerText,
                    images: [
                        ...el.querySelectorAll(
                            '.large--two-fifths > .product-single__thumbnails > .owl-wrapper-outer > .owl-wrapper > .owl-item'
                        )
                    ].map((element) => {
                        return el.querySelector('li > a').href
                    }),
                    variations: [
                        ...el.querySelectorAll(
                            '.product-single__meta--wrapper > .product-single__meta .product-single__form > .radio-wrapper > #ProductSelect-option-0 > input'
                        )
                    ].map((input) => {
                        input.click()
                        const price = el.querySelector(
                            '.product-single__meta--wrapper > .product-single__meta .price_wrapper > #ProductPrice > span'
                        ).innerText
                        return {
                            internal: input.value,
                            color: [
                                ...el.querySelectorAll(
                                    '.product-single__meta--wrapper > .product-single__meta .product-single__form > .radio-wrapper > #ProductSelect-option-1 > input'
                                )
                            ].map((inputColor) => {
                                inputColor.click()
                                return inputColor.value
                            }),
                            prices: [
                                {
                                    price,
                                    option: 'Original Price'
                                }
                            ]
                        }
                    }),
                    information: [...el.querySelectorAll('.product-information > #tabs-information > .tab-panel')].map(
                        (element, index) => {
                            switch (index) {
                                case 0:
                                    return [...element.querySelectorAll('.spec > li')].map((li) => {
                                        return li.innerText
                                    })
                                case 1:
                                    return [...element.querySelectorAll('p')].map((p) => {
                                        return p.innerHTML.toString().replace('<br>', '","')
                                    })
                                case 2:
                                    console.log(index)
                                    return [element.innerText.toString()]
                                case 3:
                                    console.log(index)
                                    return [element.innerText.toString()]
                                default:
                                    break
                            }
                        }
                    )
                }
            }
        )
        console.log('Close tab')
        page.close()
        return product
    } catch (error) {
        console.log(error)
    }
}
const getProvince = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('.page-Tỉnh_thành_Việt_Nam')
        console.log('>> Website ready')

        const listProvince = await page.$$eval(
            '.mw-page-container > .mw-page-container-inner >.mw-content-container > #content > #bodyContent > #mw-content-text > .mw-parser-output > .wikitable > tbody > tr',
            (els) => {
                let data = els.map((el) => {
                    return {
                        provice: el.querySelectorAll('td')[1].innerText,
                        abbreviatedCode: el.querySelectorAll('td')[2].innerText,
                        licensePlates: el.querySelectorAll('td')[10].innerText
                    }
                })
                return data
            }
        )
        console.log(listProvince)

        console.log('Close tab')
        page.close()
        return listProvince
    } catch (error) {
        console.log(error)
    }
}

const getDistrict = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('.page-Danh_sách_đơn_vị_hành_chính_cấp_huyện_của_Việt_Nam')
        console.log('>> Website ready')

        const listDistrict = await page.$$eval(
            '.mw-page-container > .mw-page-container-inner >.mw-content-container > #content > #bodyContent > #mw-content-text > .mw-parser-output > .wikitable',
            (els) => {
                const data = [...els[0].querySelectorAll('tbody > tr')].map((el) => {
                    return {
                        district: el.querySelectorAll('td')[1].querySelector('a').innerText,
                        province: el.querySelectorAll('td')[2].querySelector('a').innerText
                    }
                })
                return data
            }
        )

        console.log('Close tab')
        page.close()
        return listDistrict
    } catch (error) {
        console.log(error)
    }
}

const getLinkCommune = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('.page-Thể_loại_Danh_sách_xã_tại_Việt_Nam')
        console.log('>> Website ready')

        const listLinkCommune = await page.$$eval(
            '.mw-page-container > .mw-page-container-inner >.mw-content-container > #content > #bodyContent > #mw-content-text > .mw-category-generated > #mw-pages > .mw-content-ltr > .mw-category-columns > .mw-category-group > ul > li',
            (els) => {
                let data = els.map((el, index) => {
                    return {
                        link: el.querySelector('a').href,
                        province: el.querySelector('a').innerText
                    }
                })
                return data
            }
        )
        console.log(listLinkCommune)

        console.log('Close tab')
        page.close()
        return listLinkCommune
    } catch (error) {
        console.log(error)
    }
}

const getCommune = async (browser, url) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab')
        await page.goto(url)
        console.log('>> Access ' + url)
        await page.waitForSelector('body')
        console.log('>> Website ready')

        const listCommune = await page.$$eval(
            '.mw-page-container > .mw-page-container-inner >.mw-content-container > #content > #bodyContent > #mw-content-text > .mw-parser-output > .wikitable > tbody > tr',
            (els) => {
                let data = els.map((el) => {
                    return {
                        commune: el.querySelectorAll('td')[0]?.innerText,
                        district: el.querySelectorAll('td')[1]?.innerText
                    }
                })
                return data
            }
        )

        console.log('Close tab')
        page.close()
        return listCommune
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    scrapeCategory,
    listLinkProductScrape,
    detailProduct,
    getProvince,
    getDistrict,
    getLinkCommune,
    getCommune
}
