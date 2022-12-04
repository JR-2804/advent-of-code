const processInput = () => {
  return require("fs")
    .readFileSync("./problem-04/input.txt")
    .toString()
    .split("\n")
    .filter((row) => row.trim().length !== 0)
    .map((pairs) => {
      const [range1, range2] = pairs.split(",");
      const [range1Start, range1End] = range1.split("-");
      const [range2Start, range2End] = range2.split("-");

      return {
        range1: {
          start: Number.parseInt(range1Start),
          end: Number.parseInt(range1End),
        },
        range2: {
          start: Number.parseInt(range2Start),
          end: Number.parseInt(range2End),
        },
      };
    });
};

const rangeIsFullyContainedIn = (range1, range2) => {
  return range1.start >= range2.start && range1.end <= range2.end;
};

const hasFullyContainedRanges = ({ range1, range2 }) => {
  return (
    rangeIsFullyContainedIn(range1, range2) ||
    rangeIsFullyContainedIn(range2, range1)
  );
};

const count = (total) => {
  return total + 1;
};

// 450
console.log(processInput().filter(hasFullyContainedRanges).reduce(count, 0));
