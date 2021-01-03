const {Customer, Account} = require('../models/index')


function changeBalance(value){
    return value.toLocaleString('en-ID', {style: 'currency', currency: 'IDR' })
}

function isenough(id, value){
    
}

module.exports = changeBalance