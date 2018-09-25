import './header-item.js';

Vue.prototype.$bem = function(element = '', modifier = '') {
  let name = this.$options.name;

  if (element) {
    name += `__${element}`;
  }

  if (modifier) {
    name += `--${modifier}`;
  }

  return name;
};

new Vue({ el: '#app' });
