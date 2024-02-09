const router = express.Router()
const domainsController = require('../../controllers/domainsController')

router.route('/')
    .get(domainsController.getAllDomains)
    .post(domainsController.addNewDomain)
    .patch(domainsController.editExistingDomain)
    .delete(domainsController.deleteDomain)
    
module.exports = router