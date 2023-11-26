const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String
        },
        variations: [
            {
                internal: String,
                color: [String],
                prices: [
                    {
                        price: Number,
                        option: String
                    }
                ]
            }
        ],
        images: {
            type: Array
        },
        sumLike: {
            type: Number,
            default: 0
        },
        likeBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        category: {
            type: String,
            required: true
        },
        description: {
            type: Array
        },
        warranty: {
            type: Array
        },
        delivery: {
            type: Array
        },
        payment: {
            type: Array
        },
        comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
    },
    {
        timestamps: true
    }
)

//Export the model
module.exports = mongoose.model('Product', productSchema)
