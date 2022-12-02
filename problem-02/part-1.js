// A - Rock
// B - Paper
// C - Scissors

// X - Rock     (1)
// Y - Paper    (2)
// Z - Scissors (3)

// Won  (6)
// Draw (3)
// Lose (0)

const playerPlayPoints = {
  ["X"]: 1,
  ["Y"]: 2,
  ["Z"]: 3,
};

const roundOutcomesPoints = {
  ["A"]: {
    ["X"]: 3,
    ["Y"]: 6,
    ["Z"]: 0,
  },
  ["B"]: {
    ["X"]: 0,
    ["Y"]: 3,
    ["Z"]: 6,
  },
  ["C"]: {
    ["X"]: 6,
    ["Y"]: 0,
    ["Z"]: 3,
  },
};

const processInput = () => {
  return require("fs")
    .readFileSync("./problem-02/input.txt")
    .toString()
    .split("\n")
    .filter((r) => r.trim().length !== 0)
    .map((r) => r.split(" "));
};

const calculateRoundPoints = (opponentPlay, playerPlay) => {
  return (
    roundOutcomesPoints[opponentPlay][playerPlay] + playerPlayPoints[playerPlay]
  );
};

const calculateTotalPoints = (totalPoints, round) => {
  return totalPoints + calculateRoundPoints(round[0], round[1]);
};

// 13484
console.log(processInput().reduce(calculateTotalPoints, 0));
