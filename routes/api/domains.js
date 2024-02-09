const express = require('express')
const router = express.Router()
const domainsController = require('../../controllers/domainsController')
const {verifyPublisher, verifyDomain}  = require('../../controllers/publishersController')


//CRUD operations set up for the route "/" in the api

router.route('/')
    .get(domainsController.getAllPublishers)
//chaining the callbacks to avoid code repetition in controller:
//first validating that the headers are ok, then moving the request over to the controller
router.route('/publishers')
    .get(verifyPublisher, domainsController.getAllDomains)
    .post(verifyPublisher,verifyDomain, domainsController.addNewDomain)
    .patch(verifyPublisher, verifyDomain, domainsController.editExistingDomain)
    .delete(verifyPublisher, domainsController.deleteDomain)
    
module.exports = router