const client = require('../../database');

module.exports = async (req, res) => {
    /**
     * Update product details
     */
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
}