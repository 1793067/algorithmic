const logger = require("../logger");
/*Напишите функцию, которая принимает на вход набор чисел и возвращает 
все возможные пары чисел, сумма которых равна заданному целому числу target. 
Каждое число из набора может быть использовано только один раз.

Входные данные: nums =, target = 7

Условия
Каждое число из набора может быть использовано только один раз.
Порядок чисел в паре не имеет значения (т.е., [a, b] и [b, a] считаются одной и той же парой).
Если таких пар нет, функция должна вернуть пустой массив.*/

function task1(set, target) {
  return set
    .reduce(
      (subsets, item) => {
        const newSubsets = subsets.map((subset) => [...subset, item]);
        return subsets.concat(newSubsets);
      },
      [[]]
    )
    .filter((subset) => subset.reduce((acc, cur) => acc + cur, 0) === target);
}

//logger(task1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 30));

/*Задача
Напишите функцию, которая принимает на вход строку и возвращает все возможные анаграммы этой строки. 
Анаграмма — это слово или фраза, образованная путем перестановки букв другого слова или фразы, 
обычно используя все исходные буквы ровно один раз.

Примеры
Входные данные: "abc"
Выходные данные: ["abc", "acb", "bac", "bca", "cab", "cba"]

Условия
Каждая буква из исходной строки может быть использована только один раз в каждой анаграмме.
Анаграммы должны быть уникальными.*/

const task2 = (set, k = set.length) => {
  if (!k) return [[]];
  const result = [];
  for (let i = 0; i < k; i++) {
    const current = set[i];
    const rest = set.slice(0, i).concat(set.slice(i + 1));
    for (let permutation of task2(rest, k - 1)) {
      result.push([current, ...permutation]);
    }
  }
  return result;
};

//logger(task2(["a", "b", "c"]));

/*Напишите функцию, которая принимает на вход массив объектов
 и возвращает все возможные подмножества объектов, удовлетворяющие
  следующим условиям:
Сумма значений свойства value в каждом подмножестве должна быть равна заданному целому числу target.
Каждое подмножество должно содержать ровно k объектов.
Каждый объект из исходного массива может быть использован только один раз.*/

//Входные данные:
const objects = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 30 },
    { id: 6, value: 10 },
    { id: 7, value: 20 },
    { id: 8, value: 10 },
  ],
  target = 60,
  k = 4;

const task3 = (objects, target, k) => {
  const subsetsOfObjects = objects.reduce(
    (subsets, object) => {
      const newSubsets = subsets.map((subset) => [object, ...subset]);
      return subsets.concat(newSubsets);
    },
    [[]]
  );
  return subsetsOfObjects
    .filter((subset) => subset.length === k)
    .filter(
      (subset) => subset.reduce((acc, { value }) => acc + value, 0) === target
    );
};

//logger(task3(objects, target, k));
