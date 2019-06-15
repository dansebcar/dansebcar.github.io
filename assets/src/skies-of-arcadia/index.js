import Vue from 'vue';

import SkiesOfArcadia from "./components/SkiesOfArcadia.vue";

const el = document.getElementById('skies-of-arcadia');

if (el) {
    new Vue({ el, render: h => h(SkiesOfArcadia) });
}
