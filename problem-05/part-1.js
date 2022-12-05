const isEmptyLine = (row) => row.trim().length !== 0;

const processStacks = (rawStacks) => {
  const rows = rawStacks.split("\n");
  const numberOfStacks = (rows[rows.length - 1].length + 2) / 4;
  const stacks = [];

  for (let i = rows.length - 2; i >= 0; i--) {
    for (let j = 0; j <= numberOfStacks - 1; j++) {
      if (!stacks[j]) {
        stacks[j] = [];
      }

      const currentItem = rows[i].slice(j * 4, (j + 1) * 4);
      if (currentItem.trim().length !== 0) {
        stacks[j].push(currentItem);
      }
    }
  }

  return {
    stacks,
  };
};

const processSteps = (rawSteps) => {
  return {
    steps: rawSteps
      .split("\n")
      .filter(isEmptyLine)
      .map((s) => {
        const [_, numberOfItems, from, to] =
          /move (\d+?) from (\d+?) to (\d+?)/.exec(s);

        return {
          numberOfItems,
          from,
          to,
        };
      }),
  };
};

const processInput = () => {
  return require("fs")
    .readFileSync("./problem-05/input.txt")
    .toString()
    .split("\n\n")
    .map((row, index) => {
      return index === 0 ? processStacks(row) : processSteps(row);
    })
    .reduce((acc, current) => {
      return { ...acc, ...current };
    });
};

const rearrange = ({ stacks, steps }) => {
  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];

    for (let j = 0; j < currentStep.numberOfItems; j++) {
      stacks[currentStep.to - 1].push(stacks[currentStep.from - 1].pop());
    }
  }

  return stacks;
};

const getTopCrates = (stacks) => {
  return stacks.reduce(
    (acc, current) => acc + /\[(.+?)\]/.exec(current.pop())[1],
    "",
  );
};

// TGWSMRBPN
console.log(getTopCrates(rearrange(processInput())));
