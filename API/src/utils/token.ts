const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT, { expiresIn: '1h' });
}
