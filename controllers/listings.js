const Listing = require('../models/listing')
const User = require('../models/user')


const showNewForm = (req,res) => {
    res.render('listings/new.ejs')
}

const creat = async (req,res) => {
    const listingData = {}
    listingData.price = req.body.price
    listingData.streetAddress = req.body.streetAddress
    listingData.city = req.body.city
    listingData.size = req.body.size
    listingData.owner = req.session.user._id

    if(req.body.image){
        listingData.image = req.body.image

    }

    let creatListing = await Listing.create(listingData)
    res.redirect('/listings')
}

const index = async (req, res) => {
    let allListings = await Listing.find()
    res.render('listings/index.ejs', {
        allListings: allListings
    })
}


module.exports = {
    showNewForm,
    creat,
    index,
}