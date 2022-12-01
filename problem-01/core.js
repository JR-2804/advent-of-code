const result = require("fs")
  .readFileSync("./problem-01/input.txt")
  .toString()
  .split("\n\n")
  .map((r) => r.split("\n").map((n) => Number.parseInt(n)))
  .map((rows) => rows.reduce((acc, current) => acc + current, 0))
  .sort()
  .reverse();

console.log(result);
