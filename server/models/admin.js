const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avtar: {
        type: String,
        default:
            'https://media.istockphoto.com/id/679247772/vector/customer-care-service-and-support-icon-vector-person-avatar-with-headphone.jpg?s=170667a&w=0&k=20&c=KZYrmET1NVGzp83AWxv0CMOCBvdpRVHiYyoSo1Jk2l0='
    }
})

//Export the model
module.exports = mongoose.model('Admin', adminSchema)
