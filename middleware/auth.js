// For simplification, make your own token or use JWT
var myToken = "WsuJZRwjZsKDwdHUDkVHTmWjCejDQp";

/**
 * Verify token before granting access to the REST API
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function verifyToken(req, res, next) {

    const token = req.body.token || req.query.token || req.headers['access-token'];

    if (!token) {
        return res.status(404).send({ auth: false, message: 'No token provided.' });
    } else {
        if (token.localeCompare(myToken) != 0) return res.status(404).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
        next();
    }
};

module.exports = verifyToken;