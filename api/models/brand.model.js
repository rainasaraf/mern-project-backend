const {Schema,  model} = require('mongoose')
const { StringRequired, booleanTrue, modelConfig } = require('@/library/constants')

/* const brandSchema = new Schema({
    name: StringRequired,
    status: booleanTrue
}, modelConfig) */

const Brand = model('Brand', new Schema({
    name: StringRequired,
    status: booleanTrue
}, modelConfig))

module.exports = Brand
