const publishers =require('../models/publishers.json')

//keep domains in a map for quick runtime access
const occupiedDomains = new Map()

//at startup, insert all existing domains to the map
const initDomainNames = () => {
    //iterate all publishers and all domain lists
    publishers.forEach(obj =>{
        obj.domains.forEach(domain =>{
            //set the domain name in the map
            occupiedDomains.set(domain, true)
        })
    })
}

//for adding new domain, ensure name is not taken
const verifyNameAndAdd = (domain) => {
    //if there is a domain with the same name, i.e the value is not false, null or undefined, return null
    if (occupiedDomains.has(domain)){
        return null
    }
    occupiedDomains.set(domain, true)
    return domain
}

//for removing a domain, name is now available
const removeDomain = (domain) => {
    if (!occupiedDomains.has(domain)){
        return null
    }
    return occupiedDomains.delete(domain)
}

module.exports = {
    initDomainNames,
    verifyNameAndAdd,
    removeDomain
}