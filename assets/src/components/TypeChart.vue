<script>
import defaultdict from 'utils/defaultdict.js';

import TypeChartIcon from './TypeChartIcon.vue';
import TypeChartFactor from './TypeChartFactor.vue';

export default {
    components: {
        TypeChartIcon,
        TypeChartFactor,
    },
    props: {
        types: Object,
    },
    data() {
        return {
            selected: '',
            isReversed: false,
        };
    },
    computed: {
        namedTypes() {
            const namedTypes = {};

            for (const [name, type] of Object.entries(this.types)) {
                namedTypes[name] = {name, ...type};
            }

            return namedTypes;
        },
        reverseFactorMap() {
            const reverseFactorMap = defaultdict(() => defaultdict(() => []));

            for (const outerName of Object.keys(this.namedTypes)) {
                const {factors} = this.namedTypes[outerName];
                for (const [factor, innerNames] of Object.entries(factors)) {
                    for (const innerName of innerNames) {
                        reverseFactorMap[innerName][factor].push(outerName);
                    }
                }
            }

            return reverseFactorMap;
        },
        factors() {
            if (this.isReversed) {
                return this.reverseFactorMap[this.selected];
            }

            const type = this.namedTypes[this.selected];
            if (type) {
                return type.factors;
            }

            return {};
        },
        displayFactors() {
            return Object.entries(this.factors).map(
                ([value, types]) => {
                    value = parseFloat(value);
                    types = types.map(k => this.namedTypes[k]);
                    return {value, types};
                }
            ).sort((a, b) => b.value - a.value);
        },
        title() {
            return this.isReversed ? 'Select defending type' : 'Select attacking type';
        },
    },
    methods: {
        select(name) {
            this.selected = name;
        },
    },
};
</script>

<template>
    <div class="TypeChart">
        <h2
            class="mt-8 mb-4 text-lg font-bold"
        >Type chart</h2>
        <h3 class="select-none">
            <input
                v-model="isReversed"
                id="reverse"
                type="checkbox"
            >
            <label
                for="reverse"
            >
                {{ title }}
            </label>
        </h3>

        <TypeChartIcon
            v-for="type in namedTypes"
            :key="type.name"
            :type="type"
            :isSelected="type.name == selected"
            @select="select"
        />
        <table class="text-left">
            <tbody>
                <TypeChartFactor
                    v-for="{value, types} in displayFactors"
                    :key="`${value}-${types.map(k => k.name)}`"
                    :value="value"
                    :types="types"
                />
            </tbody>
        </table>
    </div>
</template>
