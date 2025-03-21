const logger = require("../logger");

// 7kyu
/*Задача
Напишите функцию, которая принимает на вход строку s, которая содержит хотя бы два символа,
 и возвращает все возможные подстроки длиной не менее 2 символа, которые являются палиндромами.
  Подстрока — это непрерывная последовательность символов внутри строки.

Примеры
Входные данные: "abc"
Выходные данные: [] (поскольку нет палиндромов длиной не менее 2 символов)

Входные данные: "aaa"
Выходные данные: ["aa", "aa", "aaa"]

Условия
Подстрока должна состоять из двух или более символов.
Порядок символов в подстроке имеет значение (т.е., "ab" и "ba" — разные подстроки).
Каждая подстрока должна быть уникальной в выходном списке.*/

function generatePalindromicSubstrings(s) {
  if (s.length < 2) return [];

  let result = new Set();

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 2; j <= s.length; j++) {
      const substr = s.slice(i, j);
      if (isPalindrome(substr)) {
        result.add(substr);
      }
    }
  }

  return Array.from(result);
}

function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

module.exports = generatePalindromicSubstrings;
