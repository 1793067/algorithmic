const logger = require("../logger");

/*Сочетание(комбинация) — это набор элементов множества.
При этом:
1. Порядок следования элементов не имеет значения
2. Указана длина сочетания

{1, 2} и {2, 1} считаются одним и тем же сочетанием, поскольку порядок не важен*/

function myCombinationsRec(set, k) {
  if (k === 0) return [[]];
  const result = [];
  for (let i = 0; i < set.length; i++) {
    const curr = set[i];
    const rest = set.slice(i + 1);
    for (let combinations of myCombinationsRec(rest, k - 1)) {
      result.push([curr, ...combinations]);
    }
  }
  return result;
}

//сочетания (комбинации) с повторениями

function myCombinationsWithRepetitionsRec(set, k) {
  if (k === 0) return [[]];
  
  const result = [];
  for (let i = 0; i < set.length; i++) {
    const curr = set[i];
    for (let combinations of myCombinationsWithRepetitionsRec(set, k - 1)) {
      result.push([curr, ...combinations]);
    }
  }
  return result;
}

// Пример использования
let set = [1, 2, 3, 4];
let k = 4;

logger(myCombinationsRec(set, k));
//logger(myCombinationsWithRepetitionsRec(set, k));
