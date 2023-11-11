const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        commentBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        replies: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
    },
    {
        timestamps: true
    }
)

//Export the model
module.exports = mongoose.model('Comment', commentSchema)
