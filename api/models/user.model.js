const {Schema, model} = require('mongoose')
const { StringRequired, booleanTrue, modelConfig } = require('@/library/constants')


const User = model('User', new Schema({
    name: StringRequired,
    email: {...StringRequired, unique: true },
    password:{...StringRequired, select: false},
    phone: {...StringRequired, MaxLength: [20, 'The phone must not exceed 20 characters.'] },
    address: StringRequired,
    role: {type:String, enum: ['Admin', 'Staff', 'Customer'], default: 'Customer'},
    status: booleanTrue
}, modelConfig))

module.exports =  User;
