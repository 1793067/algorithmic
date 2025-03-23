const logger = require("../logger");

/* 5kyu
Напишите функцию, которая принимает:

Массив объектов sections, где каждый объект представляет раздел библиотеки/магазина и содержит информацию о доступных книгах по тематикам.
Пример объекта:

javascript
{
  fantasy: 5, // 5 книг в жанре фэнтези
  detective: 3,
  science: 2
}
Запрос order — объект с требуемым количеством книг по тематикам.
Пример:

javascript
{
  fantasy: 3,
  detective: 2
}

Условия:
Из каждого раздела можно взять любое количество книг любой тематики, 
но при условии, что в секции останется хотя бы 2 книги данной тематики.
При выполнении заказа вы не можете взять из раздела больше книг, чем там фактически есть.
Функция должна вернуть true, если заказ можно выполнить, и false в противном случае.*/

function canFulfillOrder(sections, order) {
  const themes = Object.keys(order);

  // Рекурсивная проверка комбинаций
  function check(sectionIndex, remainingOrder) {
    if (sectionIndex === sections.length) {
      // Все разделы обработаны — проверяем, выполнен ли заказ
      return Object.values(remainingOrder).every((val) => val <= 0);
    }

    const currentSection = sections[sectionIndex];
    // Варианты: не брать ничего из раздела или выбрать любое количество книг любой тематики
    const options = [{}];
    for (const theme of themes) {
      if (currentSection[theme] > 2 && remainingOrder[theme] > 0) {
        for (
          let take = 1;
          take <= Math.min(currentSection[theme] - 2, remainingOrder[theme]);
          take++
        ) {
          const option = { ...options[0] };
          option[theme] = take;
          options.push(option);
        }
      }
    }

    // Проверяем все варианты выбора для текущего раздела
    for (const option of options) {
      const newRemainingOrder = { ...remainingOrder };
      let isValid = true;

      for (const theme of themes) {
        if (option[theme]) {
          newRemainingOrder[theme] -= option[theme];
          if (newRemainingOrder[theme] < 0) isValid = false;
        }
      }

      if (isValid && check(sectionIndex + 1, newRemainingOrder)) {
        return true;
      }
    }

    return false;
  }

  return check(0, { ...order });
}

module.exports = canFulfillOrder;
