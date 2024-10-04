"use strict";

let range = {
  from: 1,
  to: 5
};

// 1: for...of の呼び出しは最初にこれを呼び出す
range[Symbol.iterator] = function () {
  // iteratorオブジェクトを返す
  // 2: 以降、for...ofはこのイテレータでのみ機能し、次の値を要求する
  return {
    current: this.from,
    last: this.to,

    // 3: for...of ループにより、各繰り返しで next() が呼び出される
    next() {
      // 4: オブジェクト {done: .., value: ...} を返す必要がある
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of range) {
  alert(num);
}
