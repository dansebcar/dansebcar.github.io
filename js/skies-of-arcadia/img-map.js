function percent(x) {
  return `${x * 100}%`;
}

function vectorCls({width = 1, height = 1} = {}, max = 1) {
  class Vector {
    constructor({x = 0, y = 0} = {}) {
      [this.x, this.y] = [x, y];
    }
    get floor() {
      const f = k => Math.floor(k / Vector.max);
      return new Vector({x: f(this.x), y: f(this.y)});
    }
    get scaledArray() {
      return [this.x * Vector.width, this.y * Vector.height];
    }
    get style() {
      return {
        top: percent(this.x),
        left: percent(this.y),
      };
    }
    static from(array) {
      return new Vector({x: array[0], y: array[1]});
    }
    static* segments(a, b) {
      const floor = a.floor;
      [a, b] = [a, b].map(k => k.sub(floor));

      while (true) {
        let min = 0, indexOfMin = -1;

        for (let i = 0; i < Vector.maps.length; i++) {
          const test = Vector.maps[i].getK(b);

          if (test < min) {
            min = test;
            indexOfMin = i;
          }
        }

        if (indexOfMin === -1) {
          break;
        }

        const {getK, getC, move} = Vector.maps[indexOfMin];
        const k = getK(a);
        const m = (b.y - a.y) / (b.x - a.x);

        const c = Vector.from(getC(a, k, m));

        yield [a, c];

        move(c);
        a = c;
        move(b);
      }
      yield [a, b];
    }
    add(v) {
      return new Vector({x: this.x + v.x, y: this.y + v.y});
    }
    mult(k) {
      return new Vector({x: k * this.x, y: k * this.y});
    }
    sub(v) {
      return this.add(v.mult(-1));
    }
  }

  const maps = [{
    getK: v => v.y,
    getC: (a, k, m) => [a.x - k / m, 0],
    move: v => v.y += 1,
  }, {
    getK: v => 1 - v.x,
    getC: (a, k, m) => [1, a.y + k * m],
    move: v => v.x -= 1,
  }, {
    getK: v => 1 - v.y,
    getC: (a, k, m) => [a.x + k / m, 1],
    move: v => v.y -= 1,
  }, {
    getK: v => v.x,
    getC: (a, k, m) => [0, a.y - k * m],
    move: v => v.x += 1,
  }];

  return Object.assign(Vector, {width, height, max, maps});
}

Vue.component('img-map', {
  props: ['src', 'href'],
  template: `
    <div :class="$bem()">
      <img
        :src="src"
        :class="$bem('map')"
        ref="map"
      >
      <span
        v-for="point in data"
        :class="$bem('point')"
        :style="point.style"
      >
        {{ point.index }}
      </span>
      <canvas
        ref="canvas"
      ></canvas>
    </div>
  `,
  data() {
    return {
      Vector: {},
      data: [],
    };
  },
  mounted() {
    this.$refs.map.addEventListener('load', this.onMapLoad);
  },
  methods: {
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
    handle(data) {
      let nv = k => new this.Vector(k);

      for (let i = 0; i < data.length; i++) {
        let item = data[i];

        if (Array.isArray(item)) {
          let path = item.map(nv);
          this.drawPath(path);

          item = Object.assign(nv(item[0]), {path});
        } else {
          item = nv(item);
        }

        item.index = i;

        data[i] = item;
      }

      this.data = data;
    },
    onMapLoad(event) {
      this.Vector = vectorCls(event.target);
      const c = this.$refs.canvas;

      [c.width, c.height] = [this.Vector.width, this.Vector.height];

      fetch(this.href)
        .then(response => response.json())
        .then(this.handle);
    }
  },
});
