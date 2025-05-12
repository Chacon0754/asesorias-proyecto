const lowercaseKeys = require('../utils/lowercaseKeys');

function transform(data) {
    if (Array.isArray(data)) return data.map(transform);
    if (data && typeof data === 'object' && !(data instanceof Buffer)) {
        return lowercaseKeys(data);
    }
    return data;
}

module.exports = function normalizeKeys(req, res, next) {
    const originalJson = res.json.bind(res);
    res.json = (payload) => originalJson(transform(payload));
    next();
};