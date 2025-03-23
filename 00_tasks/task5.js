const logger = require("../logger");

/*6kyu
Напишите функцию, которая принимает на вход вложенные в массив списки целых чисел
 и возвращает все возможные подмножества чисел, 
 удовлетворяющие следующим условиям:
Сумма чисел в каждом подмножестве должна быть равна заданному целому числу target.
Каждое подмножество должно содержать ровно k чисел.
Из каждого вложенного списка можно выбрать только одно число.

Входные данные:

const nestedList = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
  ],
  target = 15,
  k = 3;*/

const getAllCombinationsOfNestedListByTarget = (list, target, k) => {
  //генерация всех комбинаций
  const getAllCombinationsOfList = (nestedList, k) => {
    if (k === 0) return [[]];
    const result = [];
    for (let i = 0; i < nestedList.length; i++) {
      const subList = nestedList[i];
      const rest = nestedList.slice(i + 1);
      for (let num of subList) {
        for (let combination of getAllCombinationsOfList(rest, k - 1)) {
          result.push([num, ...combination]);
        }
      }
    }
    return result;
  };
  //фильтр по условию === target
  return getAllCombinationsOfList(list, k).filter(
    (combination) => combination.reduce((acc, cur) => acc + cur, 0) === target
  );
};

module.exports = getAllCombinationsOfNestedListByTarget;
