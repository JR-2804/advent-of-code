const processInput = () => {
  return require("fs")
    .readFileSync("./problem-08/input.txt")
    .toString()
    .split("\n")
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split("").map((item) => Number.parseInt(item)));
};

const isTreeVisibleFromLeft = (grid, row, column) => {
  const tree = grid[row][column];

  for (let i = column - 1; i >= 0; i--) {
    if (grid[row][i] >= tree) {
      return false;
    }
  }

  return true;
};

const isTreeVisibleFromRight = (grid, row, column) => {
  const tree = grid[row][column];

  for (let i = column + 1; i < grid[row].length; i++) {
    if (grid[row][i] >= tree) {
      return false;
    }
  }

  return true;
};

const isTreeVisibleFromTop = (grid, row, column) => {
  const tree = grid[row][column];

  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][column] >= tree) {
      return false;
    }
  }

  return true;
};

const isTreeVisibleFromBottom = (grid, row, column) => {
  const tree = grid[row][column];

  for (let i = row + 1; i < grid.length; i++) {
    if (grid[i][column] >= tree) {
      return false;
    }
  }

  return true;
};

const isTreeVisible = (grid, row, column) => {
  return (
    isTreeVisibleFromLeft(grid, row, column) ||
    isTreeVisibleFromRight(grid, row, column) ||
    isTreeVisibleFromTop(grid, row, column) ||
    isTreeVisibleFromBottom(grid, row, column)
  );
};

const grid = processInput();

const numberOfEdgeTrees = grid.length * 4 - 4;
let numberOfVisibleTrees = 0;
for (let row = 1; row < grid.length - 1; row++) {
  for (let col = 1; col < grid[row].length - 1; col++) {
    if (isTreeVisible(grid, row, col)) {
      numberOfVisibleTrees++;
    }
  }
}

// 1829
console.log(numberOfVisibleTrees + numberOfEdgeTrees);
