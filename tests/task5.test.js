const getAllCombinationsOfNestedListByTarget = require("../00_tasks/task5");

describe("getAllCombinationsOfNestedListByTarget", () => {
  it("should return all combinations with sum equal to target and length k", () => {
    const input = {
      nestedList: [
        [1, 2, 3],
        [4, 5],
        [6, 7, 8, 9],
      ],
      target: 15,
      k: 3,
    };
    const expected = [
      [3, 5, 7],
      [3, 4, 8],
      [2, 5, 8],
      [2, 4, 9],
      [1, 5, 9],
    ];
    expect(
      getAllCombinationsOfNestedListByTarget(
        input.nestedList,
        input.target,
        input.k
      )
    ).toEqual(expect.arrayContaining(expected));
  });

  it("should handle empty nested list", () => {
    const input = {
      nestedList: [],
      target: 10,
      k: 2,
    };
    const expected = [];
    expect(
      getAllCombinationsOfNestedListByTarget(
        input.nestedList,
        input.target,
        input.k
      )
    ).toEqual(expected);
  });

  it("should handle k greater than nested list length", () => {
    const input = {
      nestedList: [
        [1, 2],
        [3, 4],
      ],
      target: 10,
      k: 3,
    };
    const expected = [];
    expect(
      getAllCombinationsOfNestedListByTarget(
        input.nestedList,
        input.target,
        input.k
      )
    ).toEqual(expected);
  });

  it("should handle target that cannot be reached", () => {
    const input = {
      nestedList: [
        [1, 2],
        [3, 4],
      ],
      target: 100,
      k: 2,
    };
    const expected = [];
    expect(
      getAllCombinationsOfNestedListByTarget(
        input.nestedList,
        input.target,
        input.k
      )
    ).toEqual(expected);
  });

  it("should handle k equal to 1", () => {
    const input = {
      nestedList: [
        [1, 2],
        [3, 4],
      ],
      target: 3,
      k: 1,
    };
    const expected = [[3]];
    expect(
      getAllCombinationsOfNestedListByTarget(
        input.nestedList,
        input.target,
        input.k
      )
    ).toEqual(expect.arrayContaining(expected));
  });
});
