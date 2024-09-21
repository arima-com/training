"use strict";

// x の n乗をするpow(x, n)
// 関数が何をすべきか（specification, spec）

// どのような機能か
describe("pow", function () {
  it("raises to n-th power", function () {
    // テストするための関数
    assert.equal(pow(2, 3), 8);
  });
});
