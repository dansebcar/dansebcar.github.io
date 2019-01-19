export default function defaultdict(factory) {
  return new Proxy({}, {
    get(target, name) {
      if (!(name in target)) {
        target[name] = factory();
      }
      return target[name];
    },
  });
}
