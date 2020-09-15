const safeFn = (fn, ...params) => (typeof fn === 'function' ? fn(...params) : undefined)

module.exports = safeFn
