const express = require('express')
const router = require('./routes/index')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(PORT, () => {
    console.log('Currently listening to port:', PORT)
})