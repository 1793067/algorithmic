const generateMenuCombinations = require("../00_tasks/task6");

// Функция для сортировки комбинаций
const sortCombinations = (combinations) => {
  return combinations
    .map((combination) => combination.sort()) // Сортируем элементы внутри каждой комбинации
    .sort(
      (a, b) => a.length - b.length || a.toString().localeCompare(b.toString())
    ); // Сортируем комбинации
};

test("Генерация комбинаций для пустого массива", () => {
  const result = generateMenuCombinations([]);
  const expected = [[]];
  expect(sortCombinations(result)).toEqual(sortCombinations(expected));
});

test("Генерация комбинаций для одного блюда", () => {
  const result = generateMenuCombinations(["Салат"]);
  const expected = [[], ["Салат"]];
  expect(sortCombinations(result)).toEqual(sortCombinations(expected));
});

test("Генерация комбинаций для двух блюд", () => {
  const result = generateMenuCombinations(["Салат", "Суп"]);
  const expected = [[], ["Салат"], ["Суп"], ["Салат", "Суп"]];
  expect(sortCombinations(result)).toEqual(sortCombinations(expected));
});

test("Генерация комбинаций для трех блюд", () => {
  const result = generateMenuCombinations(["Салат", "Суп", "Десерт"]);
  const expected = [
    [],
    ["Салат"],
    ["Суп"],
    ["Десерт"],
    ["Салат", "Суп"],
    ["Салат", "Десерт"],
    ["Суп", "Десерт"],
    ["Салат", "Суп", "Десерт"],
  ];
  expect(sortCombinations(result)).toEqual(sortCombinations(expected));
});

test("Генерация комбинаций для массива с повторяющимися блюдами", () => {
  const result = generateMenuCombinations(["Салат", "Салат"]);
  const expected = [[], ["Салат"], ["Салат"], ["Салат", "Салат"]];
  expect(sortCombinations(result)).toEqual(sortCombinations(expected));
});
