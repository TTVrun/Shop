const mongoose = require('mongoose') // Erase if already required
const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default:
                'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
        },
        notification: [{ type: mongoose.Types.ObjectId, ref: 'Notification' }],
        countNewNotification: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: 'user'
        },
        accountBalance: {
            type: Number,
            default: 5000
        },
        isBlock: {
            type: Boolean,
            default: false
        },
        cart: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        historyComment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        historyView: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.pre('findOneAndUpdate', async function (next) {
    let update = this.getUpdate()
    if (!update.password) {
        return next()
    }
    const salt = bcrypt.genSaltSync(10)
    this._update.password = await bcrypt.hash(this._update.password, salt)
})

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema)
