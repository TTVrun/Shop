const Product = require('../models/product')
const User = require('../models/user')
const Comment = require('../models/comment')
const slugify = require('slugify')
const { populateReliesProduct } = require('../utils/populate')

//Chưa Hoàn chỉnh
const createProduct = async (req, res, next) => {
    try {
        const data = req.body
        if (!data.title || !data.variations || !data.category) {
            throw new Error('Missing input to createProduct')
        }
        data.slug = slugify(data.title)
        const newProduct = await Product.create(data)
        return res.json({
            success: newProduct ? true : false,
            mes: newProduct ? 'Create product is successfully' : 'Something is wrong to create product'
        })
    } catch (error) {
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        //Find product and populate comment fields
        const product = await Product.findById(pid).populate('comment')
        //Populate the entire comment
        const populatedProduct = await populateReliesProduct(product)
        //Return data
        return res.json({
            success: populatedProduct ? true : false,
            data: populatedProduct ? populatedProduct : null
        })
    } catch (error) {
        next(error)
    }
}

const getProducts = async (req, res, next) => {
    try {
        const queryObj = req.query
        //Check query conditions(If there is no query, return all products)
        if (!queryObj) {
            const products = await Product.find()
            return res.json({
                success: products ? true : false,
                data: products ? products : null
            })
        }
        //Converted to suit the syntax
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        const query = JSON.parse(queryString)
        //Config to query data
        const queryProduct = {}
        if (query.pid) {
            queryProduct._id = query.pid
        }
        if (query.title) {
            queryProduct.title = { $regex: query.title, $options: 'i' }
        }
        if (query.category) {
            queryProduct.category = query.category
        }
        if (query.price) {
            queryProduct['variations.prices'] = { $elemMatch: { price: query.price } }
        }
        //Find product
        const product = await Product.find(queryProduct).select('_id title slug images')

        //Return data
        return res.json({
            success: product ? true : false,
            data: product ? product : null
        })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.body
        //Check product id to find product
        if (!pid) {
            throw new Error('Cannot find product to update')
        }
        //Delete key pid to check data
        delete req.body.pid
        if (!req.files && Object.keys(req.body).length < 1) {
            throw new Error('No data to update')
        }
        //Update images fields of product
        if (req.files) {
            await Promise.all(
                req.files.map((ele) => {
                    return Product.findByIdAndUpdate(pid, { $push: { images: ele.path } }, { new: true })
                })
            )
        }
        //Update product
        const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
        return res.json({
            success: updateProduct ? true : false,
            mes: updateProduct ? 'Update is succussfully' : 'Can not update product'
        })
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        //Find product and delete
        const deleteProduct = await Product.findByIdAndDelete(pid)
        //Return result
        return res.json({
            success: deleteProduct ? true : false,
            mes: deleteProduct ? 'Delete product is successfully' : 'Can not delete product'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}
