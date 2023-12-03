const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var districtSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    }
})

//Export the model
module.exports = mongoose.model('District', districtSchema)
