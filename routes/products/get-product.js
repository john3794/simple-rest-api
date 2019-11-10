const client = require('../../database');

module.exports = async (req, res) => {
    /**
     * Get product details by ID
     */

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
}