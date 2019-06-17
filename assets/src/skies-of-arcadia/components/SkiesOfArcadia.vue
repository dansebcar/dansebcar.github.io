<script>
import ImgMap from './ImgMap.vue';

export default {
    components: {
        ImgMap,
    },
};
</script>

<template>
    <div class="text-center">
        <h2
            class="my-8 text-xl font-bold"
        >Discoveries Map</h2>

        <figure>
            <ImgMap
                src="/images/skies-of-arcadia-map.png"
            />
            <figcaption
                class="my-4"
            >
                All discoveries available in Skies of Arcadia (Legends).
                Coordinate data by Game Psychotic, names taken from the
                <a href="http://skiesofarcadia.wikia.com">wiki</a>.
            </figcaption>
        </figure>
    </div>
</template>
