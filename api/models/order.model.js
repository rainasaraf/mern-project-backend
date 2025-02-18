const {Schema, model} = require('mongoose')
const { StringRequired, modelConfig, relation, orderStatus } = require('@/library/constants')

/* const orderSchema = new Schema({
    userId: StringRequired,
    status: StringRequired
}, modelConfig) */

const Order = model('Order', new Schema({
    userId: {...relation, ref: 'User'},
    status: {String, 
        enum: orderStatus
         }
}, modelConfig))

module.exports = Order