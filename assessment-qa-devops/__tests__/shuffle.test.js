const shuffle = require("../src/shuffle");

describe("shuffle function is an array, is the same lenght, contains the same items, shuffle the items", () => {
  test("returns an array", () => {
    const arr = [1, 2, 3];
    const output = shuffle(arr);
    expect(Array.isArray(output)).toBe(true);
  });

  test("returns an array of the same length as the array sent in", () => {
    const arr = [1, 2, 3];
    const output = shuffle(arr);
    expect(output.length).toBe(arr.length);
  });

  test("contains all the same items as the array sent", () => {
    const arr = [1, 2, 3];
    const output = shuffle(arr);
    arr.forEach((item) => {
      expect(output).toContain(item);
    });
  });

  test("shuffles the items in the array", () => {
    const arr = [1, 2, 3, 4, 5];
    const output = shuffle(arr);
    expect(output).not.toEqual(arr);
  });
});
