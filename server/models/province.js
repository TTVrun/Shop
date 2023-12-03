const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var provinceSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true
    },
    abbreviatedCode: {
        type: String,
        required: true,
        unique: true
    },
    licensePlates: {
        type: String,
        required: true,
        unique: true
    }
})

//Export the model
module.exports = mongoose.model('Province', provinceSchema)
