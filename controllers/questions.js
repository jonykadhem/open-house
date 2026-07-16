const Listing = require('../models/listing')

const creat = async (req,res) => {
    let foundListing = await Listing.findById(req.params.listingId).populate('owner')
    const questinData = {}
    questinData.text = req.body.text
    questinData.author = req.session.user._id

    foundListing.questins.push(questinData)
    await foundListing.save()
    
    res.redirect(`/listings/${req.params.listingId}`)
}

module.exports = {
    creat,
}