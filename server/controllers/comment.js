const User = require('../models/user')
const Product = require('../models/product')
const Comment = require('../models/comment')
const { populateReplies } = require('../utils/populate')

const commentProduct = async (req, res, next) => {
    try {
        //Get user id and product id and content of comment
        const { _id } = req.user
        const { pid } = req.params
        const { content } = req.body
        //Check content
        if (!content) {
            throw new Error('Missing content to comment')
        }
        //Create new comment for product
        const newComment = await Comment.create({ content, commentBy: _id })
        //update comment for product
        await Product.findOneAndUpdate({ _id: pid }, { comment: newComment._id }, { new: true })
        //update history comment of user
        await User.findOneAndUpdate({ _id }, { historyComment: newComment._id }, { new: true })

        return res.json({
            success: newComment ? true : false,
            mes: newComment ? 'Comment is successfully' : 'Something is wrong'
        })
    } catch (error) {
        next(error)
    }
}

const replyComment = async (req, res, next) => {
    try {
        const { cid } = req.params
        const { _id } = req.user
        const { content } = req.body
        //Check content
        if (!content) {
            throw new Error('Missing content to comment')
        }
        //Create new comment(Comment reply)
        const newComment = await Comment.create({ content, commentBy: _id })
        //Update histore comment of user who commented
        await User.findOneAndUpdate({ _id }, { $push: { historyComment: newComment._id } }, { new: true })
        //Push reply comment into comment which was reped
        const updateComment = await Comment.findByIdAndUpdate(
            cid,
            { $push: { replies: newComment._id } },
            { new: true }
        )
        //Return data
        return res.json({
            success: updateComment ? true : false,
            mes: updateComment ? 'Correct' : 'Wrong'
        })
    } catch (error) {
        next(error)
    }
}

const getComment = async (req, res, next) => {
    try {
        const { commentId } = req.params
        //Find comment and populate a few fields
        const comment = await Comment.findById(commentId)
            .populate('replies')
            .populate('commentBy', '_id name avatar role')
        //Populate comment
        const populatedComment = await populateReplies(comment)
        //Return data
        return res.json({
            success: true,
            populatedComment
        })
    } catch (error) {
        next(error)
    }
}

//Delete comment

module.exports = {
    commentProduct,
    replyComment,
    getComment
}
