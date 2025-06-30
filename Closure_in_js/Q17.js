function memoize(fn) {
    const cache = new Map();

    return function(arg) {
        if (cache.has(arg)) {
            return cache.get(arg);
        }

        const result = fn(arg);
        cache.set(arg, result);
        if (cache.size > 5) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        return result;
    };
}

function slowSquare(n) {
    console.log("Calculating for", n);
    return n * n;
}

const memoizedSquare = memoize(slowSquare);

console.log(memoizedSquare(4));
console.log(memoizedSquare(4));
console.log(memoizedSquare(5));
console.log(memoizedSquare(6));
console.log(memoizedSquare(4));
