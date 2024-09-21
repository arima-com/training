"use strict";

// x の n乗をするpow(x, n) nは自然数
// 関数が何をすべきか（specification, spec）

// どのような機能か
describe("pow", function () {
  it("2 raises to n-th power 3 is 8", function () {
    // テストするための関数
    assert.equal(pow(2, 3), 8);
  });

  it("3 raises to n-th power 3 is 27", function () {
    // テストするための関数
    assert.equal(pow(3, 3), 27);
  });
});

describe("pow", function () {
  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the pow 3 is ${expected}`, function () {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x < 6; x++) {
    makeTest(x);
  }
});

describe("pow", function () {
  // 他のテストではmakeTestは使用しないので、descriptionのネストでグループ化
  describe("raises x to power n", function () {
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the pow 3 is ${expected}`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x < 6; x++) {
      makeTest(x);
    }
  });

  // 他のテスト...
  it("for negative n the result is NaN", function () {
    assert.isNaN(pow(2, -1));
  });

  it("for non-integer n the result is NaN", function () {
    assert.isNaN(pow(2, 1.5));
  });
});
