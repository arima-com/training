"use strict";

{
  // コンテキストはメモリを必要とする -> ループ処理だとメモリを節約できる
  function pow(x, n) {
    if (n === 1) {
      return x;
    } else {
      return x * pow(x, n - 1);
    }
  }

  //   console.log(pow(2, 3));
}

{
  // フィボナッチ数
  function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
  }

  //   alert(fib(3)); // 2
  //   alert(fib(7)); // 13
  //   alert(fib(77)); // 5527939700884757
}

{
  // 単一連結リストを出力
  let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null,
        },
      },
    },
  };

  // loop
  function printListLoop(list) {
    let temp = list;
    while (temp) {
      console.log(temp.value);
      temp = temp.next;
    }
  }
  printListLoop(list);

  // 再帰的
  function printList(list) {
    console.log(list.value);
    if (list.next) {
      printList(list.next);
    }
  }
  printList(list);
}
