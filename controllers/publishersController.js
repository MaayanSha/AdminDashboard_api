
//function for initial verification of publisher header field
const verifyPublisherHeader = (req, res, next) => {
    //expect publisher in request headers
    const publisherRequest = req.headers.publisher
    //ensure request contains relevant fields
    if (!publisherRequest){
        return res.status(400).json({message: "Invalid request: missing 'publisher' parameter in header."})
    }

    //if field exists, continue to the next function in chain
    next();
}

//function for initial verification of publisher header field
const verifyPublisherBody = (req, res, next) => {
    //expect publisher in request headers
    const publisherRequest = req.body.publisher
    //ensure request contains relevant fields
    if (!publisherRequest){
        return res.status(400).json({message: "Invalid request: missing 'publisher' parameter in body."})
    }

    //if field exists, continue to the next function in chain
    next();
}

const verifyDomain = (req, res, next) => {
    //expect domain details in request body
    const {domain, desktopAds, mobileAds} = req.body
    //ensure request contains relevant fields
    if (domain === undefined | desktopAds === undefined | mobileAds === undefined){
        return res.status(400).json({message: "Invalid request: missing domain parameters (domain, desktopAds, mobileAds)."})
    }
    //if fields exist, continue to the next function in chain
    next();
}

module.exports = {
    verifyPublisherHeader,
    verifyPublisherBody,
    verifyDomain
}