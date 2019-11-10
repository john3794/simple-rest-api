const express = require('express')
const router = express.Router({ mergeParams: true })

const getProduct = require('./products/get-product.js')
const postProduct = require('./products/post-product.js')
const putProduct = require('./products/put-product.js')

router.get('/', (req, res) => {
    res.json({
        auth: true,
        message: 'API is working...'
    })
})

router.get('/product/:id', getProduct)
router.post('/product', postProduct)
router.put('/product/:id', putProduct)

module.exports = router