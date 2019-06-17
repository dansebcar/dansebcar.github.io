<script>
import TypeChartIcon from './TypeChartIcon.vue';

export default {
    components: {
        TypeChartIcon,
    },
    props: {
        value: Number,
        types: Array,
    },
};
</script>

<template>
    <tr>
        <th
            scope="row"
        >{{ value }} &times;</th>
        <td>
            <TypeChartIcon
                v-for="type in types"
                :key="type.name"
                :type="type"
            />
        </td>
    </tr>
</template>
