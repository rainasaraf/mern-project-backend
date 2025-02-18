const {Types} = require("mongoose")

const StringRequired = {type: String, required: true}
const booleanTrue = {type: Boolean, default: true}
const modelConfig = {timestamps: true, autoIndex: true, autoCreate: true}
const numberRequired =  {type:Number, required: true}
const relation = { type: Types.ObjectId, required: true }
const orderStatus = ['processing', 'confirmed', 'shipping', 'delivered', 'cancelled']


module.exports = { StringRequired, booleanTrue, modelConfig,numberRequired,relation,orderStatus }