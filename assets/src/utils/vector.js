function percent(x) {
  return `${x * 100}%`;
}

export default function({width = 1, height = 1} = {}, max = 1) {
  class Vector {
    constructor({x = 0, y = 0, z = 'm'} = {}) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    get altitude() {
      return `${Vector.altitudeDict[this.z]} sky`;
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
        top: percent(this.y),
        left: percent(this.x),
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

        for (let i = 0; i < Vector.boundaryConditions.length; i++) {
          const test = Vector.boundaryConditions[i].getK(b);

          if (test < min) {
            min = test;
            indexOfMin = i;
          }
        }

        if (indexOfMin === -1) {
          break;
        }

        const {getK, getC, move} = Vector.boundaryConditions[indexOfMin];
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

  const boundaryConditions = [{
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

  const altitudeDict = {
    'h': 'Upper',
    'l': 'Lower',
    'm': 'Central',
  };

  return Object.assign(Vector, {
    width,
    height,
    max,
    boundaryConditions,
    altitudeDict,
  });
}