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

function generateMenuCombinations(dishes) {
  const result = [];

  const generate = (index, currentCombination) => {
    if (index === dishes.length) {
      result.push([...currentCombination]);
      return;
    }

    // Включаем текущее блюдо в комбинацию
    currentCombination.push(dishes[index]);
    generate(index + 1, currentCombination);

    // Исключаем текущее блюдо из комбинации
    currentCombination.pop();
    generate(index + 1, currentCombination);
  };

  generate(0, []);
  return result;
}

module.exports = generateMenuCombinations;
