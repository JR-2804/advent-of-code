const processInput = () => {
  return require("fs")
    .readFileSync("./problem-08/input.txt")
    .toString()
    .split("\n")
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split("").map((i) => Number.parseInt(i)));
};

const IsTreeVisibleFromLeft = (grid, rowIndex, columnIndex) => {
  const tree = grid[rowIndex][columnIndex];

  for (let i = columnIndex - 1; i >= 0; i--) {
    if (grid[rowIndex][i] >= tree) {
      return false;
    }
  }

  return true;
};

const IsTreeVisibleFromRight = (grid, rowIndex, columnIndex) => {
  const tree = grid[rowIndex][columnIndex];

  for (let i = columnIndex + 1; i < grid[rowIndex].length; i++) {
    if (grid[rowIndex][i] >= tree) {
      return false;
    }
  }

  return true;
};

const IsTreeVisibleFromTop = (grid, rowIndex, columnIndex) => {
  const tree = grid[rowIndex][columnIndex];

  for (let i = rowIndex - 1; i >= 0; i--) {
    if (grid[i][columnIndex] >= tree) {
      return false;
    }
  }

  return true;
};

const IsTreeVisibleFromBottom = (grid, rowIndex, columnIndex) => {
  const tree = grid[rowIndex][columnIndex];

  for (let i = rowIndex + 1; i < grid.length; i++) {
    if (grid[i][columnIndex] >= tree) {
      return false;
    }
  }

  return true;
};

const isTreeVisible = (grid, rowIndex, columnIndex) => {
  return (
    IsTreeVisibleFromLeft(grid, rowIndex, columnIndex) ||
    IsTreeVisibleFromRight(grid, rowIndex, columnIndex) ||
    IsTreeVisibleFromTop(grid, rowIndex, columnIndex) ||
    IsTreeVisibleFromBottom(grid, rowIndex, columnIndex)
  );
};

const countVisibleTreesInRow = (grid, rowIndex) => {
  return grid[rowIndex].reduce((total, currentItem, columnIndex) => {
    if (columnIndex === 0 || columnIndex === grid[rowIndex].length - 1) {
      return total + 1;
    }

    return isTreeVisible(grid, rowIndex, columnIndex) ? total + 1 : total;
  }, 0);
};

const countVisibleTreesInGrid = (grid) => (total, currentRow, rowIndex) => {
  if (rowIndex === 0 || rowIndex === grid.length - 1) {
    return total + currentRow.length;
  }

  return total + countVisibleTreesInRow(grid, rowIndex);
};

// 1829
const grid = processInput();
console.log(grid.reduce(countVisibleTreesInGrid(grid), 0));
