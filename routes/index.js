const router = require('express').Router()
const Controller = require('../controllers/customer-controllers')

router.get('/', (req, res) => {
    res.send('hi')
})
//show customers data
router.get('/customers', Controller.showCustomer)

//add customer
router.get('/customers/register', Controller.getAddCustomer)
router.post('/customers/register', Controller.postAddCustomer)

//update customer data
router.get('/customers/:idCustomer/editProfile', Controller.getEditCustomer)
router.post('/customers/:idCustomer/editProfile', Controller.postEditCustomer)

//show all customer accounts
router.get('/customers/:idCustomer/accounts', Controller.getCustomerAccounts)
router.post('/customers/:idCustomer/accounts', Controller.postCustomerAccounts)

//transfer form to other account
router.get('/customers/:idCustomer/accounts/:idAccount/transfer', Controller.getTransfer)
router.post('/customers/:idCustomer/accounts/:idAccount/transfer', Controller.postTransfer)
module.exports = router