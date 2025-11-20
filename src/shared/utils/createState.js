export function createState(initial) {
    const watchers = {};

    const proxy = new Proxy(initial, {
        set(obj, prop, value) {
            obj[prop] = value;

            if (watchers[prop]) {
                watchers[prop].forEach(fn => fn(value));
            }
            return true;
        }
    });

    proxy.watch = (prop, fn) => {
        watchers[prop] = watchers[prop] || [];
        watchers[prop].push(fn);
    };

    return proxy;
}
