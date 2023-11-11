const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:
            'https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-png-free-buckle-notification-icon-bell-bell-icon-png-image_334048.jpg'
    }
})

//Export the model
module.exports = mongoose.model('Notification', notificationSchema)
