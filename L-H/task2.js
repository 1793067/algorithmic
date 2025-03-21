/**
* LEVEL 0.
  Есть склад спец. одежды разных размеров.
  store: Array<{ size: number, quantity: number}>
  
  К нам приходит заказ на спец. одежду
  order: Array<{ id: number, size: [s1: number] | [s1: number, s2: s1+1]  }>, 
  в котором указывается для каждого рабочего его id: number и size: [s1: number] | [s1: number, s2: s1+1]. 
    
  То есть по каждому рабочему может быть указан 
  либо один подходящий размер одежды, либо два, причем 2-ой размер только на 1 больше первого.
  
  Нужно написать функцию processOrder, которая бы на получила на вход:
  1) массив доступных размеров спец. одежды
  store: Array<{ size: number, quantity: number}>
  2) Заказ на спец. одежду для сотрудников:
  order: Array<{ id: number, size: [s1: number] | [s1: number, s2: s1+1]  }>
  
  На выходе функция должна выдать false, 
  если на складе недостаточно одежды на обеспечение всех сотрудников, 
  а если это возможно, то возвращала объект:
  {
    stats: Array<{size: number, quantity: number}>,
    assignment:  Array<{id: number, size: number}>
  }
  где stats - упорядоченный массив по возрастанию size массив 
              размеров size и количества quantity выдаваемой одежды со склада;
  assignment - массив распределения одежды по сотрудникам,
              где id - идентификатор рабочего из order, size - выданный ему размер
    
  Для проверки работоспособности функции запустить runTests()
  
  @param store: Array<{ size: number, quantity: number}>
  @param order: Array<{ id: number, size: [s1: number] | [s1: number, s2: s1+1]  }>
  @return false | {
    stats: Array<{size: number, quantity: number}>,
    assignment:  Array<{id: number, size: number}>
  }
*/

/*Рекурсивный поиск: Вместо простого итеративного решения используется рекурсивная функция
 findAssignments. Это необходимо, чтобы перебрать все возможные комбинации распределения размеров.

Резервное копирование состояния: В каждой ветке рекурсии создаются копии массива available и 
объекта stats, чтобы изменения в одной ветке не влияли на другие. Это критически важно для правильной работы рекурсивного алгоритма.

Перебор всех размеров: В функции findAssignments перебираются все возможные размеры для текущего 
ребенка (из orderItem.size). Это позволяет алгоритму рассматривать все варианты распределения.

Возврат первого решения: Функция findAssignments возвращает первое найденное возможное решение.
 В данном случае, нам достаточно просто проверить, существует ли какое-либо решение, удовлетворяющее 
 условиям задачи. Если нужно найти оптимальное решение (например, минимизировать количество выданной
     одежды большего размера), необходимо модифицировать алгоритм для перебора всех решений и выбора лучшего.

Как это работает:

Алгоритм рекурсивно строит дерево возможных распределений. Каждая ветвь дерева представляет собой 
один из возможных вариантов выдачи одежды. Если алгоритм доходит до конца дерева (то есть, все дети
     получили одежду), значит, он нашел возможное решение. Если ни одна ветвь не приводит к полному
      распределению, значит, задача не имеет решения.

Важные замечания:

Сложность алгоритма: Этот алгоритм имеет экспоненциальную сложность (O(2^n), где n - количество детей,
 которым подходит два размера). Это означает, что время выполнения может быстро расти с увеличением 
 количества заказов с двумя размерами. Для больших заказов может потребоваться оптимизация алгоритма
  или использование других подходов.

Не гарантируется оптимальность: Этот код находит любое возможное решение. Если нужно найти 
оптимальное решение (например, минимизировать количество выданной одежды большего размера), 
потребуется более сложный алгоритм, который перебирает все возможные решения и выбирает лучшее.

Тесты: Очень важно тщательно протестировать этот код с различными наборами данных, чтобы убедиться, 
что он работает правильно и не выдает неправильные результаты.
*/

function processOrder(store, order) {
  // Создаем копию склада, чтобы не изменять оригинал
  const available = store.map((item) => ({ ...item }));

  let bestAssignment = null;
  let bestStats = null;

  // Функция для рекурсивного поиска всех возможных распределений
  function findAssignments(
    index,
    currentAssignment,
    currentAvailable,
    currentStats
  ) {
    if (index === order.length) {
      // Все дети получили одежду - это возможное решение
      return { assignment: currentAssignment, stats: currentStats };
    }

    const orderItem = order[index];

    // Перебираем все возможные размеры для текущего ребенка
    for (const size of orderItem.size) {
      const storeItem = currentAvailable.find(
        (item) => item.size === size && item.quantity > 0
      );

      if (storeItem) {
        // Копируем текущее состояние, чтобы не испортить другие ветки рекурсии
        const nextAvailable = currentAvailable.map((item) => ({ ...item }));
        const nextStoreItem = nextAvailable.find((item) => item.size === size);
        nextStoreItem.quantity--;

        const nextAssignment = [
          ...currentAssignment,
          { id: orderItem.id, size: size },
        ];

        const nextStats = { ...currentStats };
        nextStats[size] = (nextStats[size] || 0) + 1;

        // Рекурсивно вызываем функцию для следующего ребенка
        const result = findAssignments(
          index + 1,
          nextAssignment,
          nextAvailable,
          nextStats
        );

        if (result) {
          return result; // Возвращаем первое найденное решение (т.к. нам нужно любое возможное)
        }
      }
    }

    // Если ни один размер не подошел, то решения нет
    return null;
  }

  // Запускаем рекурсивный поиск
  const result = findAssignments(0, [], available, {});

  if (result) {
    // Преобразуем статистику в нужный формат
    const statsArray = Object.entries(result.stats)
      .map(([size, quantity]) => ({ size: parseInt(size), quantity }))
      .sort((a, b) => a.size - b.size);

    return {
      stats: statsArray,
      assignment: result.assignment,
    };
  } else {
    return false; // Не удалось найти ни одного решения
  }
}

function compareArraysOfNumericArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let el1 of arr1) {
    if (arr2.findIndex((el2) => compareNumericArrays(el1, el2)) < 0) {
      return false;
    }
  }

  return true;
}

runTests();

function runTests() {
  const tests = [
    {
      store: [{ size: 2, quantity: 1 }],
      order: [{ id: 102, size: [1, 2] }],
      isPosible: true,
    },
    {
      store: [{ size: 3, quantity: 1 }],
      order: [{ id: 102, size: [1, 2] }],
      isPosible: false,
    },
    {
      store: [{ size: 2, quantity: 4 }],
      order: [
        { id: 101, size: [2] },
        { id: 102, size: [1, 2] },
      ],
      isPosible: true,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 2, quantity: 1 },
      ],
      order: [
        { id: 101, size: [2] },
        { id: 102, size: [1, 2] },
      ],
      isPosible: true,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 3, quantity: 1 },
      ],
      order: [
        { id: 101, size: [2] },
        { id: 102, size: [1, 2] },
      ],
      isPosible: false,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 2, quantity: 2 },
        { size: 3, quantity: 1 },
      ],
      order: [
        { id: 100, size: [1] },
        { id: 101, size: [2] },
        { id: 102, size: [2, 3] },
        { id: 103, size: [1, 2] },
      ],
      isPosible: true,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 2, quantity: 2 },
        { size: 3, quantity: 1 },
        { size: 4, quantity: 2 },
      ],
      order: [
        { id: 100, size: [1] },
        { id: 101, size: [2] },
        { id: 102, size: [2, 3] },
        { id: 103, size: [1, 2] },
        { id: 104, size: [4] },
        { id: 105, size: [3, 4] },
      ],
      isPosible: true,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 2, quantity: 1 },
        { size: 3, quantity: 2 },
        { size: 4, quantity: 2 },
      ],
      order: [
        { id: 100, size: [1] },
        { id: 101, size: [2] },
        { id: 102, size: [2, 3] },
        { id: 103, size: [1, 2] },
        { id: 104, size: [4] },
        { id: 105, size: [3, 4] },
      ],
      isPosible: false,
    },
    {
      store: [
        { size: 1, quantity: 1 },
        { size: 2, quantity: 3 },
        { size: 4, quantity: 2 },
      ],
      order: [
        { id: 100, size: [1] },
        { id: 101, size: [2] },
        { id: 102, size: [2, 3] },
        { id: 103, size: [1, 2] },
        { id: 104, size: [4] },
        { id: 105, size: [3, 4] },
      ],
      isPosible: true,
    },
    {
      store: [
        { size: 1, quantity: 2 },
        { size: 2, quantity: 2 },
        { size: 3, quantity: 1 },
        { size: 4, quantity: 2 },
      ],
      order: [
        { id: 100, size: [1] },
        { id: 101, size: [1, 2] },
        { id: 102, size: [1, 2] },
        { id: 103, size: [2] },
        { id: 104, size: [2, 3] },
        { id: 105, size: [4] },
        { id: 106, size: [3, 4] },
      ],
      isPosible: true,
    },
  ];

  let errors = 0;
  for (const test of tests) {
    try {
      const result = processOrder(test.store, test.order);

      if (!checkOrderProcessingResult(test, result)) {
        errors++;
        console.log("failed for", test);
      }
    } catch (e) {
      errors++;
      console.log("failed for", test, "exception", e.message);
    }
  }

  if (errors === 0) {
    console.log("processOrder test successfuly completed");
  } else {
    console.log(`processOrder test failed with ${errors} errors`);
  }
  console.log("////////////////////////////////////////");
  console.log("////////////////////////////////////////");
  console.log("////////////////////////////////////////");
  console.log("////////////////////////////////////////");
}

function checkOrderProcessingResult(test, result) {
  // console.log('test', test, 'result', result);

  if (!test.isPosible && !result) {
    //
    return true;
  }

  if ((!test.isPosible || !result) && test.isPosible != result) {
    return false;
  }

  compareStatsAndAssigmnet(result);
  compareOrderAndAssigment(test.order, result.assignment);
  compareStoreAndStats(test.store, result.stats);

  return true;
}

function compareStatsAndAssigmnet(result) {
  const { stats, assignment } = result;

  const calcStatsMap = new Map();
  for (const ass of assignment) {
    const m = calcStatsMap.get(ass.size);
    calcStatsMap.set(ass.size, (m || 0) + 1);
  }

  const calcStatsArr = [...calcStatsMap.entries()].sort(
    (e1, e2) => e1[0] - e2[0]
  );
  const orignalStatsArr = [...stats]
    .sort((e1, e2) => e1.size - e2.size)
    .filter((e) => e.quantity > 0);

  if (calcStatsArr.length !== orignalStatsArr.length) {
    throw new Error("stats does not correspond to assignment");
  }
}

function compareOrderAndAssigment(order, assignment) {
  for (const o of order) {
    const ass = assignment.find((a) => a.id == o.id);
    if (!ass) {
      throw new Error(`Cannot find assigment for id=${o.id}`);
    }

    if (!o.size.includes(ass.size)) {
      throw new Error(`Assigned wrong size (${ass.size}) for id=${o.id}`);
    }
  }
}

function compareStoreAndStats(store, stats) {
  for (const statsItem of stats) {
    if (statsItem.quantity === 0) {
      continue;
    }

    const storeItem = store.find((storeI) => storeI.size === statsItem.size);
    if (!storeItem) {
      throw new Error(
        `Cannot find store item for statsItem.size=${statsItem.size}`
      );
    }

    if (storeItem.quantity < statsItem.quantity) {
      throw new Error(
        `store item for size=${storeItem.size} has quantity=${storeItem.quantity} < statsItem.quantity=${statsItem.quantity}`
      );
    }
  }
}
