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

// 67027
console.log(
  processInput()
    .map(calculateElvesCalories)
    .sort((a, b) => b - a)[0],
);
