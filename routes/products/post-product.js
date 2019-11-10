const client = require('../../database');

module.exports = async (req, res) => {
    /**
     * Insert product details
     */
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
}