
//function for initial verification of publisher header field
const verifyPublisher = (req, res, next) => {
    //expect publisher in request headers
    const publisherRequest = req.headers.publisher || req.body.publisher
    //ensure request contains relevant fields
    if (!publisherRequest){
        return res.status(400).json({message: "Invalid request: missing 'publisher' parameter."})
    }

    //if field exists, continue to the next function in chain
    next();
}

const verifyDomain = (req, res, next) => {
    //expect domain details in request body
    const {domainName, desktopAds, mobileAds} = req.body
    //ensure request contains relevant fields
    if (!domainName | !desktopAds | !mobileAds){
        return res.status(400).json({message: "Invalid request: missing domain parameters (domainName, desktopAds, mobileAds)."})
    }
    //if fields exist, continue to the next function in chain
    next();
}

module.exports = {
    verifyPublisher,
    verifyDomain
}