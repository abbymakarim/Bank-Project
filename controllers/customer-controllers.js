const {Customer, Account, sequelize} = require('../models/index')
const changeBalance = require('../helpers/helpers')

class Controller {
    static showCustomer(req, res){
        Customer.findAll()
        .then(data => {
            res.render('customers.ejs', {
                customers : data
            })
        }).catch(err => {
            res.send(err)
        })
    }

    static getAddCustomer(req, res){
        if(req.query.error){
            let message = req.query.error.split(',')
            res.render('addcustomer.ejs', {
                messages : message
            })
        } else {
            res.render('addcustomer.ejs',{
                messages : 'no'
            })
        }
    }

    static postAddCustomer(req, res){
        let customer = {
            identityNumber : req.body.identityNumber,
            fullName : req.body.fullName,
            address : req.body.address,
            birthDate : req.body.birthDate,
            gender : req.body.gender
        }
        Customer.create(customer)
        .then(data => [
            res.redirect('/customers')
        ]).catch(err => {
            let messages = []
            err.errors.forEach(el => {
                messages.push(el.message)
            })
            console.log(err)
            res.redirect(`/customers/register?error=${messages}`)
        })
    }

    static getEditCustomer(req, res){
        let customerId = req.params.idCustomer
        Customer.findAll({
            where : {
                id : customerId
            },
            attributes : {
                exclude : ['accountNumber']
            }
        }).then(data => {
            let newdate = data[0].birthDate.toISOString().split('T')
            res.render('editcustomer', {
                customer : data,
                date : newdate[0]
            })
        }).catch(err => {
            res.send(err)
        })
    }

    static postEditCustomer(req, res){
        let customerId = +req.params.idCustomer
        let newProfile = {
            identityNumber : req.body.identityNumber,
            fullName : req.body.fullName,
            address : req.body.address,
            birthDate : req.body.birthDate,
            gender : req.body.gender
        }
        Customer.update(newProfile, {
            where : {
                id : customerId
            }
        }).then(data => {
            res.redirect('/customers')
        }).catch(err => {
            res.send(err)
        })
    }

    static getCustomerAccounts(req, res){
        let customerid = +req.params.idCustomer
        let message = req.query.errors
        Account.findAll({
            include : [Customer],
            where : {
                CustomerId : customerid,
            },
        }).then(data => {
            res.render('addcustomeraccount', {
                accounts : data,
                changeBalance : changeBalance,
                message : message
            })
        }).catch(err => {
            console.log(err)
        })
    }

    static postCustomerAccounts(req, res){
        let id = +req.params.idCustomer
        let newAccount = {
            type : req.body.type,
            balance : +req.body.balance,
            CustomerId : +req.params.idCustomer,
            accountNumber : ''
        }
        Account.create(newAccount)
        .then(data => {
            res.redirect(`/customers/${id}/accounts`)
        })
        .catch(err => {
            let messages = []
            err.errors.forEach(el => {
                messages.push(el.message)
            })
            res.redirect(`/customers/${id}/accounts?errors=${messages}`)
        })
    }

    static getTransfer(req, res){
        let accountId = +req.params.idAccount
        let account = ''
        Account.findOne({
            include : [Customer],
            where : {
                id : accountId
            }
        })
        .then(data => {
            account = data
            return Account.findAll({
                include: [Customer],
            })
        })
        .then(data => {
            res.render('transferwindow', {
                allcustomers : data,
                customer : account,
                changeBalance : changeBalance
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    static postTransfer(req, res){
        let accountId = +req.params.idCustomer
        let sourceId = +req.params.idAccount
        let destinationAccount = req.body.accountNumber
        let transferAmount = +req.body.balance
        // Account.decrement('balance', {
        //     by : transferAmount,
        //     where : {
        //         id : sourceId
        //     }
        // }).then(data =>{
        //     return Account.increment('balance', {
        //         by: transferAmount,
        //         where : {
        //             accountNumber : destinationAccount
        //         }
        //     })
        // })
        Account.update({
            balance : sequelize.literal(`balance - ${transferAmount}`)}, 
            { where : {
                id : sourceId
            },
        })
        .then(data => {
            return Account.update({
                balance : sequelize.literal(`balance + ${transferAmount}`)}, 
                { where : {
                    accountNumber : destinationAccount
                },
            })
        })
        .then(data =>{
            res.redirect(`/customers/${accountId}/accounts`)
        }).catch(err => {
            console.log(err)
        })
    }
}   

module.exports = Controller