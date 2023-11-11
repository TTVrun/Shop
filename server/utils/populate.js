const Comment = require('../models/comment')
const Product = require('../models/product')

// Define a function to recursively populate replies
const populateReplies = async (comment, depth = 0) => {
    try {
        const populatedComment = await Comment.populate(comment, {
            path: 'replies',
            populate: [{ path: 'replies' }, { path: 'commentBy', select: 'name avatar role _id' }]
        })

        if (populatedComment.replies && populatedComment.replies.length > 0) {
            await Promise.all(
                populatedComment.replies.map(async (reply) => {
                    return populateReplies(reply, depth + 1)
                })
            )
        }

        return populatedComment
    } catch (err) {
        throw err
    }
}

const populateReliesProduct = async (product) => {
    try {
        const populatedProduct = await Comment.populate(product, {
            path: 'comment',
            populate: {
                path: 'replies',
                populate: 'replies'
            },
            populate: {
                path: 'commentBy',
                select: 'name _id role avatar'
            }
        })

        const populatedComments = await Promise.all(
            populatedProduct.comment.map((comment) => populateReplies(comment, 0))
        )
        return (populatedProduct.comment = populatedComments)
    } catch (error) {
        throw error
    }
}

// Usage
// const commentId = 'your_comment_id' // Replace with the actual comment ID
// try {
//     const comment = await Comment.findById(commentId).populate('replies')
//     const populatedComment = await populateReplies(comment)
//     console.log('Comment with populated replies:', populatedComment)
// } catch (err) {
//     console.error(err)
// }

module.exports = { populateReplies, populateReliesProduct }
