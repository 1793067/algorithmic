const logger = require("../logger");

/*Размещения — это способ последовательно расположить элементы множества.
При этом:
1. Порядок следования элементов имеет значение
2. Указана длина размещения

Если количество элементов в размещении равно количеству элементов множества: k === n,
то такое размещение называют "Перестановкой"*/

function permutationsRecursive(set, k) {
  if (k === 0) return [[]];

  let result = [];
  for (let i = 0; i < set.length; i++) {
    let current = set[i];
    let rest = set.slice(0, i).concat(set.slice(i + 1));
    for (let perm of permutationsRecursive(rest, k - 1)) {
      result.push([current, ...perm]);
    }
  }
  return result;
}

//Перестановки с повторениями
function permutationsWithRepetitionRecursive(set, k) {
  if (k === 0) return [[]];

  let result = [];
  for (let i = 0; i < set.length; i++) {
    let current = set[i];
    for (let perm of permutationsWithRepetitionRecursive(set, k - 1)) {
      result.push([current, ...perm]);
    }
  }
  return result;
}

let set = [1, 2, 3];
let k = 3;
logger(permutationsWithRepetitionRecursive(set, k));
