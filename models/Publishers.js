const mongoose = require('mongoose');
const Domain = require('../models/Domain')

const publishersSchema = new mongoose.Schema({
    publisher: {
        type: String,
        required: true,
    },
    //holds an array of Domain objects
    domains: [{
        type: Schema.Types.ObjectId,
        ref: 'Domain'
    }],
},
)

userSchema.pre('save', async function (next){
    //sanitize content
    next()
})

module.exports = mongoose.model('Publishers', publishersSchema, "publishers");