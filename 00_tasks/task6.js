/*
7kyu
Задача: Генерация всех возможных комбинаций для выбора блюд
Представьте, что вы составляете меню для ресторана. У вас есть список блюд, и вам нужно сгенерировать все возможные комбинации этих блюд для составления меню. Каждая комбинация может содержать от 0 до N блюд, где N — общее количество блюд.

Формат задачи:
Напишите функцию generateMenuCombinations(dishes), которая принимает массив блюд и возвращает массив всех возможных комбинаций этих блюд.

Пример:

javascript
const dishes = ["Салат", "Суп", "Десерт"];
const combinations = generateMenuCombinations(dishes);

Ожидаемый вывод:

javascript
[
  [],
  ["Салат"],  ["Суп"],  ["Десерт"],  ["Салат", "Суп"],
  ["Салат", "Десерт"],  ["Суп", "Десерт"],  ["Салат", "Суп", "Десерт"]
] */

function generateMenuCombinations(dishes, k) {
  if (k === 0) return [[]];
  const result = [];
  for (let i = 0; i < dishes.length; i++) {
    const curr = dishes[i];
    const rest = dishes.slice(i + 1);
    for (let combinations of generateMenuCombinations(rest, k - 1)) {
      result.push([curr, ...combinations]);
    }
  }
  return result;
}

module.exports = generateMenuCombinations;
