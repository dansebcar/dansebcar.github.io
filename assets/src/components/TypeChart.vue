<script>
import defaultdict from 'utils/defaultdict.js';

import TypeChartIcon from './TypeChartIcon.vue';
import TypeChartFactor from './TypeChartFactor.vue';
import TypeChartTitle from './TypeChartTitle.vue';

export default {
    components: {
        TypeChartIcon,
        TypeChartFactor,
        TypeChartTitle,
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
        reverseFactorMap() {
            const reverseFactorMap = defaultdict(() => defaultdict(() => []));

            for (const outerName of Object.keys(this.types)) {
                const {factors} = this.types[outerName];
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

            const type = this.types[this.selected];
            if (type) {
                return type.factors;
            }

            return {};
        },
        displayFactors() {
            return Object.entries(this.factors).map(
                ([value, types]) => {
                    value = parseInt(value, 12) / 12;
                    types = types.map(k => this.types[k]);
                    return {value, types};
                }
            ).sort((a, b) => b.value - a.value);
        },
        title() {
            return this.isReversed ? 'Select attacking type' : 'Select defending type';
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
            class="text-lg font-bold"
        >Type chart</h2>
        <TypeChartTitle
            :isReversed.sync="isReversed"
        />
        <TypeChartIcon
            v-for="(type, name) in types"
            :key="name"
            :type="type"
            :isSelected="name == selected"
            @select="select"
        />
        <ul>
            <TypeChartFactor
                v-for="{value, types} in displayFactors"
                :key="`${value}-${types.map(k => k.name)}`"
                :value="value"
                :types="types"
            />
        </ul>
    </div>
</template>
