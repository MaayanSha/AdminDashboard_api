const express = require('express')
const router = express.Router()
const domainsController = require('../../controllers/domainsController')
const {verifyPublisherHeader, verifyPublisherBody, verifyDomain}  = require('../../controllers/publishersController')

//chaining the callbacks to avoid code repetition in controller:
//first validating that the required information is in the header (get/delete) or in body (post, patch)
//then moving the request over to the controller

//CRUD operations set up for the route "/" in the api
router.route('/')
    .get(domainsController.getAllPublishers)
    .post(verifyPublisherBody, domainsController.addPublisher)

//CRUD operations set up for the route "/publishers" in the api
router.route('/publishers')
    .get(verifyPublisherHeader, domainsController.getAllDomains)
    .post(verifyPublisherBody,verifyDomain, domainsController.addNewDomain)
    .patch(verifyPublisherBody, verifyDomain, domainsController.editExistingDomain)
    .delete(verifyPublisherHeader, domainsController.deleteDomain)
    
module.exports = router