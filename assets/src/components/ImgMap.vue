<script>
import discos from "utils/discoveries.json";
import DiscoBox from "./DiscoBox.vue";
import vectorCls from "utils/vector.js";

export default {
  components: {
    DiscoBox,
  },
  props: {
    src: {type: String, required: true},
  },
  data() {
    return {
      Vector: {},
      discos,
    };
  },
  mounted() {
    this.$refs.map.addEventListener('load', this.onMapLoad);
  },
  methods: {
    clearPoint(v, size = 0.035) {
      const ctx = this.$refs.canvas.getContext('2d');
      const x = this.Vector.from([size, size]);

      ctx.clearRect(...v.sub(x.mult(0.5)).scaledArray, ...x.scaledArray);
    },
    drawLine(a, b, style = 'white', width = 1.5) {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.strokeStyle = style;
      ctx.lineWidth = width;

      for (const [x, y] of this.Vector.segments(a, b)) {
        ctx.beginPath();
        ctx.moveTo(...x.scaledArray);
        ctx.lineTo(...y.scaledArray);
        ctx.stroke();
      }
    },
    drawPath(path) {
      for (let i = 0; i < path.length; i++) {
        const v1 = path[i];
        const v2 = path[i + 1] || path[0];

        this.drawLine(v1, v2);
      }
    },
    handle(discos) {

    },
    onMapLoad(event) {
      this.Vector = vectorCls(event.target);
      const c = this.$refs.canvas;

      [c.width, c.height] = [this.Vector.width, this.Vector.height];

      const nv = k => new this.Vector(k);

      for (const disco of this.discos) {
        disco.point = nv(disco.point);

        if (disco.path) {
          let path = disco.path.map(nv);
          disco.path = path;
          this.drawPath(path);
          this.clearPoint(disco.point);
        }
      }

      this.discos = discos;
    },
  },
};
</script>

<template>
  <div class="ImgMap">
    <img
      :src="src"
      ref="map"
      class="map"
    >
    <canvas
      ref="canvas"
      class="paths"
    ></canvas>
    <DiscoBox
      v-for="(disco, index) in discos"
      :disco="disco"
      :index="index + 1"
      :key="index + 1"
    >
    </DiscoBox>
  </div>
</template>

<style scoped lang="scss">
@import "sass/vars.scss";

.ImgMap {
  position: relative;
  object-fit: contain;
  user-select: none;
  max-width: $bp;
}

.paths {
  position: absolute;
  left: 0;
  top: 0;
}

.map {
  width: 100%;
}
</style>
