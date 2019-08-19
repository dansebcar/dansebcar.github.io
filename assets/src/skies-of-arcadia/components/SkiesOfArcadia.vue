<script>
import types from '../types.yaml';

import TypeChart from 'components/TypeChart.vue';
import ImgMap from './ImgMap.vue';

export default {
    components: {
        ImgMap,
        TypeChart,
    },
    data() {
        return {
            types,
        };
    },
};
</script>

<template>
    <div class="text-center">
        <h2
            class="my-8 text-xl font-bold"
        >Discoveries Map</h2>

        <figure class="max-w-xl mx-auto">
            <ImgMap
                src="/images/skies-of-arcadia-map.jpg"
            />
            <figcaption
                class="my-4"
            >
                All discoveries available in Skies of Arcadia (Legends).
                Coordinate data by Game Psychotic, names taken from the
                <a
                    class="text-indigo-700"
                    href="http://skiesofarcadia.wikia.com"
                >wiki</a>.
            </figcaption>
        </figure>

        <TypeChart
            :types="types"
        />
    </div>
</template>
