const logger = require("../logger");

function returnAllSubsets(set) {
  return set.reduce(
    (subsets, item) => {
      const newSubsets = subsets.map((subset) => [...subset, item]);
      return subsets.concat(newSubsets);
    },
    [[]]
  );
}

function returnAllSubsetsRecursive(set) {
  const iter = (index, subset, subsets) => {
    for (let i = index; i < set.length; i++) {
      subset.push(set[i]);
      subsets.push([...subset]);
      iter(i + 1, subset, subsets);
      subset.pop();
    }
    return subsets;
  };
  return iter(0, [], [[]]);
}

//logger(returnAllSubsets([1, 2, 4, 5]));
//logger(returnAllSubsetsRecursive([1, 2, 4, 5]));
