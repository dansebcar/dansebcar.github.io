import Vue from 'vue';

import Pokemon from './components/Pokemon.vue';

const el = document.getElementById('pokemon');

if (el) {
    new Vue({el, render: h => h(Pokemon)});
}
