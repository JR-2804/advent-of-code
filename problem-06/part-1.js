const processInput = () => {
  return require("fs")
    .readFileSync("./problem-06/input.txt")
    .toString()
    .split("")
    .filter((item) => item.trim().length !== 0);
};

const hasRepeatedCharacter = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }

  return false;
};

const zen = (data, current, index) => {
  if (data.array.length === 4) {
    data.array.shift();
    data.array.push(current);
  } else {
    data.array.push(current);
    return data;
  }

  if (!data.result && !hasRepeatedCharacter(data.array)) {
    data.result = index + 1;
  }

  return data;
};

// 1909
console.log(processInput().reduce(zen, { array: [] }).result);
