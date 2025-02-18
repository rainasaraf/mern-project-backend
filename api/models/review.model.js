const {Schema, model} = require('mongoose')
const { StringRequired, modelConfig, numberRequired, relation } = require('@/library/constants')

/* const reviewSchema = new Schema({
    productId: StringRequired,
    userId: StringRequired,
    Comment: StringRequired,
    rating: IntegerValue,
},modelConfig) */

const Review = model('Review', new Schema({
    productId: {...relation, ref: 'Product'},
    userId: {...relation, ref: 'User'},
    comment: StringRequired,
    rating: numberRequired
},modelConfig))

module.exports = Review

