const Listing = require('../models/listing')
const User = require('../models/user')


const showNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

const creat = async (req, res) => {
    const listingData = {}
    listingData.price = req.body.price
    listingData.streetAddress = req.body.streetAddress
    listingData.city = req.body.city
    listingData.size = req.body.size
    listingData.owner = req.session.user._id

    if (req.body.image) {
        listingData.image = req.body.image

    }

    let creatListing = await Listing.create(listingData)
    res.redirect('/listings')
}

const index = async (req, res) => {
    let allListings = await Listing.find().populate('owner')
    res.render('listings/index.ejs', {
        allListings
    })
}

const showListing = async (req, res) => {
    let foundListing = await Listing.findById(req.params.listingId).populate('owner').populate('questins.author')
    const userHasFavorited = foundListing.favoritedByUsers.some(user => {
       return user.equals(req.session.user._id)
    })
    res.render('listings/show.ejs', {
    foundListing,
    userHasFavorited
    })
}

const deleteListing = async (req, res) => {
    let foundListing = await Listing.findById(req.params.listingId).populate('owner')

    if (foundListing.owner.equals(req.session.user._id)) {
        await Listing.findByIdAndDelete(req.params.listingId)
        res.redirect('/listings')
    } else {
        res.render('error.ejs', {
            msg: "you can't"
        })
    }
}
const showEditList = async (req, res) => {
    let foundListing = await Listing.findById(req.params.listingId).populate('owner')
    res.render('listings/edit.ejs',{
    foundListing
})

}

const editListing = async (req, res) => {
    // const listingData = {}
    // listingData.price = req.body.price
    // listingData.streetAddress = req.body.streetAddress
    // listingData.city = req.body.city
    // listingData.size = req.body.size
    // listingData.image = req.body.image
    await Listing.findByIdAndUpdate(req.params.listingId, req.body)
    res.redirect(`/listings/${req.params.listingId}`)

}

const favorite = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.listingId, {
        $push: { favoritedByUsers: req.params.userId }
    })

    res.redirect(`/listings/${req.params.listingId}`)
}
const unfavorite = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.listingId, {
        $pull: { favoritedByUsers: req.params.userId }
    })

    res.redirect(`/listings/${req.params.listingId}`)
}


module.exports = {
    showNewForm,
    creat,
    index,
    showListing,
    deleteListing,
    editListing,
    showEditList,
    favorite,
    unfavorite,
}