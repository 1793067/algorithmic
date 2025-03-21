const canFulfillOrder = require("../L-H/task3");

describe("canFulfillOrder", () => {
  const tests = [
    {
      name: "Order can be fulfilled",
      sections: [
        { fantasy: 5, detective: 3 },
        { fantasy: 2, science: 4 },
        { detective: 5 },
      ],
      order: { fantasy: 3, detective: 3 },
      expected: true,
    },
    {
      name: "Order cannot be fulfilled",
      sections: [
        { fantasy: 5 },
        { fantasy: 1, detective: 2 },
        { detective: 3 },
      ],
      order: { fantasy: 6, detective: 3 },
      expected: false,
    },
    {
      name: "Order requires all books from one theme",
      sections: [{ fantasy: 5 }],
      order: { fantasy: 3 },
      expected: true,
    },
    {
      name: "Order exceeds available books",
      sections: [{ fantasy: 2 }],
      order: { fantasy: 3 },
      expected: false,
    },
    {
      name: "No books are required",
      sections: [{ fantasy: 5 }],
      order: {},
      expected: true,
    },
    {
      name: "Order requires books from non-existent theme",
      sections: [{ fantasy: 5 }],
      order: { science: 1 },
      expected: false,
    },
  ];

  tests.forEach((test) => {
    it(test.name, () => {
      const result = canFulfillOrder(test.sections, test.order);
      expect(result).toBe(test.expected);
    });
  });
});
