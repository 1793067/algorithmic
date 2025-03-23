/**
 * Бинарный поиск в отсортированном массиве
 * @param {Array} arr Отсортированный массив (по возрастанию)
 * @param {any} target Искомый элемент
 * @returns {number} Индекс элемента или -1 если не найден
 */
function binarySearch(arr, target) {
    let left = 0;          // Левая граница поиска
    let right = arr.length - 1; // Правая граница поиска

    while (left <= right) {
        // Вычисляем середину текущего диапазона
        let mid = Math.floor((left + right) / 2);

        // Сравниваем элемент в середине с целевым
        if (arr[mid] === target) {
            return mid; // Нашли элемент
        } else if (arr[mid] < target) {
            // Если элемент меньше целевого, ищем в правой части
            left = mid + 1;
        } else {
            // Если элемент больше целевого, ищем в левой части
            right = mid - 1;
        }
    }

    return -1; // Элемент не найден
}

// Пример использования
let sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedArray, 9));  // Возвращает 4
console.log(binarySearch(sortedArray, 10)); // Возвращает -1

/**
 * Рекурсивный бинарный поиск в отсортированном массиве
 * @param {Array} arr Отсортированный массив (по возрастанию)
 * @param {any} target Искомый элемент
 * @param {number} left Левая граница поиска
 * @param {number} right Правая граница поиска
 * @returns {number} Индекс элемента или -1 если не найден
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Базовый случай: диапазон поиска пуст
    if (left > right) {
        return -1;
    }

    // Вычисляем середину текущего диапазона
    let mid = Math.floor((left + right) / 2);

    // Сравниваем элемент в середине с целевым
    if (arr[mid] === target) {
        return mid; // Нашли элемент
    } else if (arr[mid] < target) {
        // Если элемент меньше целевого, ищем в правой части
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        // Если элемент больше целевого, ищем в левой части
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Пример использования
let sortedArray2 = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(sortedArray2, 9));  // Возвращает 4
console.log(binarySearchRecursive(sortedArray2, 10)); // Возвращает -1
