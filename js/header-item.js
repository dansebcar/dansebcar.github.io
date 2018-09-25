Vue.component('header-item', {
  props: ['href'],
  template: `
    <a
      :href="href"
      :class="$bem()"
    >
      <slot></slot>
    </a>
  `,
});
