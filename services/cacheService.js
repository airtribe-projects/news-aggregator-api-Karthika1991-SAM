let cache = {};

const getFromCache = (key) => {
    return cache[key];
};

const setInCache = (key, value) => {
    cache[key] = value;
};

const updateCache = (key, value) => {
    cache[key] = value;
};

const clearCache = (key) => {
    delete cache[key];
};

module.exports = {
    getFromCache,
    setInCache,
    updateCache,
    clearCache
};
