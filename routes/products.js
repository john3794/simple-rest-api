const express = require('express');
const router = express.Router({ mergeParams: true });
const client = require('../database');

router.get('/', (req, res) => {
    res.json({
        message: 'API is working...'
    });
});

/**
 * Get product details by ID
 */
router.get('/product/:id', async (req, res) => {

    var query = { productId: req.params.id };

    try {
        const product = await findOne(query);
        // res.send(JSON.stringify(product));
        res.json({
            GET: true,
            received: product
        });
    } catch (err) {
        console.error(err);
    }

});

function findOne(query) {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) reject(new Error('cannot find product'));
            const collection = client.db('webshop').collection('products');
            collection.find(query).toArray((err, result) => {
                if (err) console.log(err);
                resolve({ product: result });
            });
        });
    });
};

/**
 * Insert product details
 */
router.post('/product', async (req, res) => {
    try {
        var product = undefined;

        // if body format, else query format
        if (req.is('application/json')) {
            product = {
                productId: req.body.productId,
                name: req.body.name,
                size: req.body.size,
                color: req.body.color,
                category: req.body.category,
                sport: req.body.sport,
            }
        } else {
            product = {
                productId: req.query.productId,
                name: req.query.name,
                size: req.query.size,
                color: req.query.color,
                category: req.query.category,
                sport: req.query.sport,
            }
        }

        if (product !== undefined) {
            var result = await createOne(product);
            res.json({
                POST: true,
                inserted: result
            });
        } else {
            console.log('product not defined');
            res.status(500).send('product not defined');
        }
    } catch (error) {
        console.log(error);
    }
});

function createOne(product) {
    return new Promise((resolve, reject) => {
        client.connect(() => {
            try {
                console.log('inserted:\n ', product);
                const collection = client.db('webshop').collection('products');
                collection.insertOne({
                    "productId": product.productId,
                    "name": product.name,
                    "size": product.size,
                    "color": product.color,
                    "category": product.category,
                    "sport": product.sport
                }, (err, result) => {
                    if (err) throw err;
                    resolve(result.ops);
                });
            } catch (err) {
                reject(err);
            }
        });
    });
}

/**
 * Update product details
 */
router.put('/product/:id', async (req, res) => {
    try {
        delete req.body.token; // do not include token

        var query = { productId: req.params.id };
        var properties = req.body;
        var updatedProduct = await update(query, properties);
        res.json({
            PUT: true,
            updated: updatedProduct
        });
    } catch (error) {
        console.log(error);
    }
});

function update(query, properties) {
    return new Promise((resolve, reject) => {
        client.connect(() => {
            try {
                // do not update undefined/null properties
                for (let property in properties) {
                    if (!properties[property]) delete properties[property];
                }

                console.log('updating properties:\n', properties);

                const collection = client.db('webshop').collection('products');
                collection.findOneAndUpdate(
                    query,
                    { $set: properties },
                    { returnOriginal: false },
                    (err, result) => {
                        if (err) throw err;
                        console.log('1 document updated');
                        resolve(result.value);
                    });
            } catch (error) {
                reject(error);
            }
        });
    });
}

module.exports = router;