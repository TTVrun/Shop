const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var communeSchema = new mongoose.Schema({
    commune: {
        type: String,
        required: true
    },
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
module.exports = mongoose.model('Commune', communeSchema)
