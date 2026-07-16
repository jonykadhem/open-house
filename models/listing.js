const { text } = require('express')
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })

const listingSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 0,

    },
    image: {
        type: String,
        default: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?_gl=1*1axbrom*_ga*MTkyMDczNjU2Ny4xNzgxNTA1OTMy*_ga_8JE65Q40S6*czE3ODQxMDM3OTEkbzMkZzEkdDE3ODQxMDM4MDUkajQ2JGwwJGgw',

    },
    streetAddress: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
        min: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    questins: [questionSchema],
    favoritedByUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing