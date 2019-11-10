
const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

router.all('*', (req, res) => {
    res.status(404).send({
        routes: 'Not found!'
    });
});

module.exports = router;