const processInput = () => {
  return require("fs")
    .readFileSync("./problem-08/input.txt")
    .toString()
    .split("\n")
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split("").map((i) => Number.parseInt(i)));
};

const getLeftDistance = (grid, row, column) => {
  let distance = 0;
  const tree = grid[row][column];

  for (let i = column - 1; i >= 0; i--) {
    if (grid[row][i] >= tree) {
      return distance + 1;
    }
    distance++;
  }

  return distance;
};

const getRightDistance = (grid, row, column) => {
  let distance = 0;
  const tree = grid[row][column];

  for (let i = column + 1; i < grid[row].length; i++) {
    if (grid[row][i] >= tree) {
      return distance + 1;
    }
    distance++;
  }

  return distance;
};

const getTopDistance = (grid, row, column) => {
  let distance = 0;
  const tree = grid[row][column];

  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][column] >= tree) {
      return distance + 1;
    }
    distance++;
  }

  return distance;
};

const getBottomDistance = (grid, row, column) => {
  let distance = 0;
  const tree = grid[row][column];

  for (let i = row + 1; i < grid.length; i++) {
    if (grid[i][column] >= tree) {
      return distance + 1;
    }
    distance++;
  }

  return distance;
};

const calculateScenicScore = (grid, row, column) => {
  return (
    getLeftDistance(grid, row, column) *
    getRightDistance(grid, row, column) *
    getTopDistance(grid, row, column) *
    getBottomDistance(grid, row, column)
  );
};

const grid = processInput();

let bestScenicScore = 0;
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    const scenicScore = calculateScenicScore(grid, i, j);
    if (scenicScore > bestScenicScore) {
      bestScenicScore = scenicScore;
    }
  }
}

// 291840
console.log(bestScenicScore);
