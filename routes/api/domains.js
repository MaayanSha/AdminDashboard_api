const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const domainSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
    },
    mobileAds:  {
        type:Number,
        required: true,
    },
    desktopAds: {
        type:Number,
        required:true
    },
},
{ timestamps: true }
)

userSchema.pre('save', async function (next){
    //sanitize content
    next()
})

module.exports = mongoose.model('User', userSchema, "user");