const {Schema, model} = require('mongoose')
const { StringRequired, booleanTrue, modelConfig } = require('@/library/constants')



const Category = model('Category', new Schema({
    name: StringRequired,
    status: booleanTrue
}, modelConfig))

module.exports = Category