// Install a promised-based shim for setImmediate
const resolved = Promise.resolve(null);
window.setImmediate = function setImmediatePromiseShim(callback, ...args) {
  resolved.then(args.length === 0 ? callback : () => callback(...args));
}
