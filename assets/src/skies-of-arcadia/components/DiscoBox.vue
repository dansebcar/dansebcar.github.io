<script>
export default {
    props: {
        disco: {type: Object, required: true},
        index: {type: Number, required: true},
    },
    data() {
        return {
            expanded: false,
        };
    },
    computed: {
        note() {
            const d = this.disco;
            let s = `${d.point.altitude}`;

            if (d.path) {
                s += ` moving`;
            }

            s += ` (${d.both ? 'both games' : 'legends exclusive'})`;

            return s;
        },
    },
};
</script>

<template>
    <div
        :class="{expanded}"
        class="DiscoBox text-2xs md:text-sm"
        :style="disco.point.style"
        @click="expanded = !expanded"
    >
        <button
            v-if="!expanded"
            class="point px-1 hover:bg-indigo-700"
            :title="disco.name"
        >
            {{ index }}
        </button>
        <div
            v-else
            class="tip"
        >
            <span class="title">{{ index }}. {{ disco.name }}</span>
            <span class="note">{{ note }}</span>
            <a
                class="m-2 text-indigo-700"
                :href="disco.href"
            >Wiki</a>
        </div>
    </div>
</template>

<style>
.DiscoBox {
    position: absolute;
    transform: translate(-50%, -50%);

    text-align: center;

    cursor: pointer;

    &.expanded {
        z-index: 1;
    }
}

.point {
    color: white;
    background: unset;
    border: unset;
    cursor: inherit;
}

.tip {
    transform: translate(40%, 40%);
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 5px 10px;

    background-color: white;
    border: 1px solid black;
}

.tip-title {
    white-space: nowrap;
}

.tip-note {
    margin-bottom: 10px;

    font-size: 15px;
}
</style>
