const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var locationSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    commune: {
        type: String,
        required: true
    }
})

//Export the model
module.exports = mongoose.model('Location', locationSchema)
