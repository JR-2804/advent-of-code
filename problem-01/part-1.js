const processInput = () => {
  return require("fs")
    .readFileSync("./problem-01/input.txt")
    .toString()
    .split("\n\n")
    .map((row) =>
      row
        .split("\n")
        .filter((r) => r.trim().length !== 0)
        .map((number) => Number.parseInt(number)),
    );
};

const calculateElfCalories = (totalElfCalories, currentFoodCalories) =>
  totalElfCalories + currentFoodCalories;

const calculateElvesCalories = (elves) => elves.reduce(calculateElfCalories, 0);

const findMax = (max, current) => {
  return current > max ? current : max;
};

// 67027
console.log(processInput().map(calculateElvesCalories).reduce(findMax, 0));
