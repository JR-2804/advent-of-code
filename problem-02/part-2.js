// A - Rock
// B - Paper
// C - Scissors

// A - Rock     (1)
// B - Paper    (2)
// C - Scissors (3)

// X - Need to loose
// Y - Need to draw
// Z - Need to win

// Won  (6)
// Draw (3)
// Lose (0)

const playerPlayPoints = {
  ["X"]: {
    ["A"]: 3,
    ["B"]: 1,
    ["C"]: 2,
  },
  ["Y"]: {
    ["A"]: 1,
    ["B"]: 2,
    ["C"]: 3,
  },
  ["Z"]: {
    ["A"]: 2,
    ["B"]: 3,
    ["C"]: 1,
  },
};

const roundOutcomesPoints = {
  ["X"]: 0,
  ["Y"]: 3,
  ["Z"]: 6,
};

const processInput = () => {
  return require("fs")
    .readFileSync("./problem-02/input.txt")
    .toString()
    .split("\n")
    .filter((r) => r.trim().length !== 0)
    .map((r) => r.split(" "));
};

const calculateRoundPoints = (opponentPlay, desiredOutcome) => {
  return (
    roundOutcomesPoints[desiredOutcome] +
    playerPlayPoints[desiredOutcome][opponentPlay]
  );
};

const calculateTotalPoints = (totalPoints, round) => {
  return totalPoints + calculateRoundPoints(round[0], round[1]);
};

// 13433
console.log(processInput().reduce(calculateTotalPoints, 0));
