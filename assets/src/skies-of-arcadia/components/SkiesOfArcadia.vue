<script>
import ImgMap from './ImgMap.vue';

export default {
    components: {
        ImgMap,
    },
};
</script>

<template>
    <div>
        <h2>Discoveries Map</h2>

        <figure>
            <ImgMap
                src="map.png"
            />
            <figcaption>
                All discoveries available in Skies of Arcadia (Legends).
                Coordinate data by Game Psychotic, names taken from the
                <a href="http://skiesofarcadia.wikia.com">wiki</a>.
            </figcaption>
        </figure>
    </div>
</template>
