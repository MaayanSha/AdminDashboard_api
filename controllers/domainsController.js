//import model Domain to query on
const {verifyNameAndAdd, removeDomain} = require('./domainNames')

const publishersDataBase = {
    publishers: require('../models/publishers.json'),
}

const getAllPublishers = (req, res) => {
    res.status(200).json(publishersDataBase.publishers)
}

//add a new publisher to the database
const addPublisher = (req, res) => {
    const {publisher} = req.body
    const newPublisher = {
        publisher: publisher,
        domains: [],
    }
    publishersDataBase.publishers.push(newPublisher)
    res.status(200).json(newPublisher)
}

//:GET
//Read all domains under a specific publisher
const getAllDomains = (req, res) => {
    const publisherRequest = req.headers.publisher
    //find the requested publisher object
    const domainList = publishersDataBase.publishers.find(obj => obj.publisher === publisherRequest)
    if (!domainList){
        return res.status(404).json({message: "Error: publisher name not found."})
    }
    res.status(200).json(domainList)
}

//:POST
//add a new domain under a specific publisher
const addNewDomain = (req, res) => {
    const {domain, desktopAds, mobileAds, publisher} = req.body
    //check if domain name is available
    const isAvailable = verifyNameAndAdd(domain)
    //if domain name already taken, return error
    if (!isAvailable){
        return res.status(409).json({message: "Error: domainName is unavailable."})
    }
    //create new domain object
    const newDomain = 
    {
        "domain": domain,
        "desktopAds": Number(desktopAds),
        "mobileAds": Number(mobileAds)
      }
    //find the location of the publisher in the db
    const publisherObjIndex = publishersDataBase.publishers.findIndex(obj => obj.publisher === publisher)
    //append the new domain at the domain list of the publisher
    publishersDataBase.publishers[publisherObjIndex].domains.push(newDomain)
    //return the updated domain list
    res.status(200).json(newDomain)
}

//:PUT
//edit an existing domain under a specific publisher
const editExistingDomain = (req, res) => {
    const {domain, desktopAds, mobileAds, publisher} = req.body
    //check if there is a new domain name in the request
    const newDomain = req.body?.newDomain
    const oldDomain = domain
    //if the domain name should be updated, update it in the name list
    if (newDomain){
        removeDomain(domain)
        verifyNameAndAdd(newDomain)
    }
    const updatedDomain = {
        "domain": newDomain || domain,
        "desktopAds": Number(desktopAds),
        "mobileAds": Number(mobileAds)
    }
    //find the old domain object and update it
    //find the publisher location in the DB
    const publisherObjIndex = publishersDataBase.publishers.findIndex(obj => obj.publisher === publisher)
    //find the old domain location in the DB under the publisher
    const domainIndex = publishersDataBase.publishers[publisherObjIndex].domains.findIndex(domain => domain.domain === oldDomain)
    console.log(domainIndex)
    //set the updated domain properties
    publishersDataBase.publishers[publisherObjIndex].domains[domainIndex] = updatedDomain

    res.status(200).json(updatedDomain)

}

//:DELETE
//delete an existing domain under a specific publisher
const deleteDomain = (req, res) => {
    const {domain, publisher} = req.headers
    //find the publisher location in the DB
    const publisherObjIndex = publishersDataBase.publishers.findIndex(obj => obj.publisher === publisher)
    //find the old domain location in the DB under the publisher
    const domainIndex = publishersDataBase.publishers[publisherObjIndex].domains.findIndex(domain => domain.domain === domain)
    //if found the domain under the publisher, remove the domain from the list.
    if (domainIndex){
        publishersDataBase.publishers[publisherObjIndex].domains.pop(domainIndex)
    }
    res.status(200).json({message: "domain deleted succesfully"})

}

module.exports = {
    getAllPublishers,
    addPublisher,
    getAllDomains,
    addNewDomain,
    editExistingDomain,
    deleteDomain
}