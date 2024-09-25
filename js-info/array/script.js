"use strict";

// 最大部分配列問題

/**
 * Kadane’s Algorithm
 * 配列を最初から順番に走査
 * 各要素に対して、その要素までの部分配列の合計を記録し、もしその合計が負になったら、その部分配列の開始位置を現在の要素に更新します（つまり、新しい部分配列を開始する）。
 * 走査中に見つけた最大の部分配列の合計を保持しておき、最終的にそれを返します。
 */
{
  // slow
  function getMaxSubSum(arr) {
    let maxSum = 0; // もし要素を取らない場合は0

    for (let i = 0; i < arr.length; i++) {
      let sumFixedStart = 0;

      for (let j = i; j < arr.length; j++) {
        sumFixedStart += arr[j];
        maxSum = Math.max(maxSum, sumFixedStart);
      }
    }

    return maxSum;
  }

  console.log(getMaxSubSum([-1, 2, 3, -9])); // 5
  console.log(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
  console.log(getMaxSubSum([-2, -1, 1, 2])); // 3
  console.log(getMaxSubSum([1, 2, 3])); // 6
  console.log(getMaxSubSum([100, -9, 2, -3, 5])); // 100
}

{
  // fast
  function getMaxSubSum(arr) {
    let maxSum = 0;
    let partialSum = 0;

    for (let item of arr) {
      partialSum += item;
      maxSum = Math.max(maxSum, partialSum);
      if (partialSum < 0) partialSum = 0;
    }

    return maxSum;
  }

  console.log(getMaxSubSum([-1, 2, 3, -9])); // 5
  console.log(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
  console.log(getMaxSubSum([-2, -1, 1, 2])); // 3
  console.log(getMaxSubSum([100, -9, 2, -3, 5])); // 100
  console.log(getMaxSubSum([1, 2, 3])); // 6
  console.log(getMaxSubSum([-1, -2, -3])); // 0
}
