function lowercaseKeys(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
}

module.exports = lowercaseKeys;