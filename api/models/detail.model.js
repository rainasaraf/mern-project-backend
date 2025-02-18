const {Schema, model} = require('mongoose')
const { modelConfig, relation, numberRequired } = require('@/library/constants')

/* const detailSchema = new Schema({
    orderId: {IntegerValue, StringRequired},
    productId:{ StringRequired, IntegerValue},
    quantity: IntegerValue,
    price: IntegerValue,
    total: IntegerValue,
}, modelConfig) */

const Detail = model('Detail', new Schema({
    orderId: {...relation,ref: 'Product'},
    productId:{...relation,ref: 'Order'},
    qty: numberRequired,
    price: numberRequired,
    total: numberRequired
}, modelConfig))

module.exports = Detail