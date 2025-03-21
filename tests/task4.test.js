const generatePalindromicSubstrings = require("../L-H/task4");

describe("generatePalindromicSubstrings", () => {
  it("should return all palindromic substrings for a simple string", () => {
    const input = "abc";
    const expected = [];
    expect(generatePalindromicSubstrings(input)).toEqual(expected);
  });

  it("should return all palindromic substrings for a string with repeating characters", () => {
    const input = "aaa";
    const expected = ["aa", "aaa"];
    expect(generatePalindromicSubstrings(input)).toEqual(
      expect.arrayContaining(expected)
    );
  });

  it("should handle an empty string", () => {
    const input = "";
    const expected = [];
    expect(generatePalindromicSubstrings(input)).toEqual(expected);
  });

  it("should handle a string with a single character", () => {
    const input = "a";
    const expected = [];
    expect(generatePalindromicSubstrings(input)).toEqual(expected);
  });

  it("should handle a string with no palindromic substrings longer than one character", () => {
    const input = "ab";
    const expected = [];
    expect(generatePalindromicSubstrings(input)).toEqual(expected);
  });
});
