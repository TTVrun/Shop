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

module.exports = { scrapeCategory, listLinkProductScrape, detailProduct }
