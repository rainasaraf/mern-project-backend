const {Schema, model,Types} = require('mongoose')
const { StringRequired, modelConfig, booleanTrue, numberRequired, relation } = require('@/library/constants')


const Product = model('Product', new Schema({
    name: StringRequired,
    price: numberRequired,
    discountedPrice: {type: Number, default: 0},
    description: StringRequired,
    summary: StringRequired,
    categoryId: {...relation, ref: 'Category'},
    brandId: {...relation, ref: 'Brand'},
    images: [StringRequired],
    status: booleanTrue,
    featured: {type: Boolean, default: false},
}, modelConfig))

module.exports = Product