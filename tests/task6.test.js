const generateMenuCombinations = require("../00_tasks/task6");

// Функция для сортировки комбинаций
const sortCombinations = (combinations) => {
  return combinations
    .map((combination) => combination.sort()) // Сортируем элементы внутри каждой комбинации
    .sort((a, b) => {
      // Сортируем комбинации по длине, а затем лексикографически
      if (a.length !== b.length) return a.length - b.length;
      return a.toString().localeCompare(b.toString());
    });
};

test("Генерация комбинаций для пустого массива", () => {
  expect(sortCombinations(generateMenuCombinations([], 0))).toEqual([[]]);
  expect(sortCombinations(generateMenuCombinations([], 1))).toEqual([]);
});

test("Генерация комбинаций для одного элемента", () => {
  expect(sortCombinations(generateMenuCombinations(["Салат"], 1))).toEqual([
    ["Салат"],
  ]);
  expect(sortCombinations(generateMenuCombinations(["Салат"], 2))).toEqual([]);
});

test("Генерация комбинаций для двух элементов", () => {
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп"], 1))
  ).toEqual([["Салат"], ["Суп"]]);
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп"], 2))
  ).toEqual([["Салат", "Суп"]]);
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп"], 3))
  ).toEqual([]);
});

test("Генерация комбинаций для трех элементов", () => {
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп", "Десерт"], 1))
  ).toEqual(sortCombinations([["Салат"], ["Суп"], ["Десерт"]]));
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп", "Десерт"], 2))
  ).toEqual(
    sortCombinations([
      ["Салат", "Суп"],
      ["Салат", "Десерт"],
      ["Суп", "Десерт"],
    ])
  );
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп", "Десерт"], 3))
  ).toEqual(sortCombinations([["Салат", "Суп", "Десерт"]]));
  expect(
    sortCombinations(generateMenuCombinations(["Салат", "Суп", "Десерт"], 4))
  ).toEqual([]);
});

test("Генерация комбинаций для четырех элементов", () => {
  const dishes = ["Салат", "Суп", "Десерт", "Напиток"];
  expect(sortCombinations(generateMenuCombinations(dishes, 1))).toEqual(
    sortCombinations([["Салат"], ["Суп"], ["Десерт"], ["Напиток"]])
  );
  expect(sortCombinations(generateMenuCombinations(dishes, 2))).toEqual(
    sortCombinations([
      ["Салат", "Суп"],
      ["Салат", "Десерт"],
      ["Салат", "Напиток"],
      ["Суп", "Десерт"],
      ["Суп", "Напиток"],
      ["Десерт", "Напиток"],
    ])
  );
  expect(sortCombinations(generateMenuCombinations(dishes, 3))).toEqual(
    sortCombinations([
      ["Салат", "Суп", "Десерт"],
      ["Салат", "Суп", "Напиток"],
      ["Салат", "Десерт", "Напиток"],
      ["Суп", "Десерт", "Напиток"],
    ])
  );
  expect(sortCombinations(generateMenuCombinations(dishes, 4))).toEqual(
    sortCombinations([["Салат", "Суп", "Десерт", "Напиток"]])
  );
  expect(sortCombinations(generateMenuCombinations(dishes, 5))).toEqual([]);
});

test("Генерация комбинаций для пяти элементов", () => {
  const dishes = ["Салат", "Суп", "Десерт", "Напиток", "Гарнир"];
  expect(sortCombinations(generateMenuCombinations(dishes, 2))).toEqual(
    sortCombinations([
      ["Салат", "Суп"],
      ["Салат", "Десерт"],
      ["Салат", "Напиток"],
      ["Салат", "Гарнир"],
      ["Суп", "Десерт"],
      ["Суп", "Напиток"],
      ["Суп", "Гарнир"],
      ["Десерт", "Напиток"],
      ["Десерт", "Гарнир"],
      ["Напиток", "Гарнир"],
    ])
  );
  expect(sortCombinations(generateMenuCombinations(dishes, 3))).toHaveLength(
    10
  ); // C(5, 3) = 10
  expect(sortCombinations(generateMenuCombinations(dishes, 4))).toHaveLength(5); // C(5, 4) = 5
  expect(sortCombinations(generateMenuCombinations(dishes, 5))).toEqual(
    sortCombinations([["Салат", "Суп", "Десерт", "Напиток", "Гарнир"]])
  );
});
