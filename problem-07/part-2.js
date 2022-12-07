const { addAbortSignal } = require("stream");

const processInput = () => {
  return require("fs")
    .readFileSync("./problem-07/input.txt")
    .toString()
    .split("\n")
    .filter((row) => row.trim().length !== 0);
};

const parseTerminalOutput = (commands, currentRow) => {
  const [, command, path] = /\$ (..)( .+)?/.exec(currentRow) || [];

  if (command === "cd") {
    return [
      ...commands,
      {
        command,
        path: path.trim(),
      },
    ];
  }

  if (command === "ls") {
    return [
      ...commands,
      {
        command,
        output: [],
      },
    ];
  }

  const [, directoryName] = /dir (.+)/.exec(currentRow) || [];
  if (directoryName) {
    commands[commands.length - 1].output.push({
      name: directoryName,
      type: "directory",
    });
    return commands;
  }

  const [, fileSize, fileName] = /(.+?) (.+)/.exec(currentRow) || [];
  commands[commands.length - 1].output.push({
    name: fileName,
    size: Number.parseFloat(fileSize),
    type: "file",
  });

  return commands;
};

const buildTreeFromCommands = (data, currentCommand) => {
  if (!data.currentNode) {
    data.currentNode = data.tree;
  }

  if (currentCommand.command === "ls") {
    data.currentNode.children = currentCommand.output.map((item) => ({
      name: item.name,
      ...(item.type === "directory" && { children: [] }),
      ...(item.type === "file" && { size: item.size }),
      type: item.type,
      parent: data.currentNode,
    }));
    return data;
  }

  if (currentCommand.path === ".." && data.currentNode.parent) {
    data.currentNode = data.currentNode.parent;
  } else {
    data.currentNode = data.currentNode.children.find(
      (child) => child.name === currentCommand.path,
    );
  }

  return data;
};

const calculateSizes = (node) => {
  if (node.size) {
    return node.size;
  }

  const size = node.children.reduce(
    (acc, current) => acc + calculateSizes(current),
    0,
  );
  node.size = size;
  return size;
};

let result = Number.MAX_VALUE;
const calculateTotal = (node, required) => {
  if (
    node.type === "directory" &&
    node.size >= required &&
    node.size < result
  ) {
    result = node.size;
  }

  if (node.children) {
    node.children.forEach((n) => calculateTotal(n, required));
  }
};

const tree = processInput()
  .reduce(parseTerminalOutput, [])
  .slice(1)
  .reduce(buildTreeFromCommands, {
    tree: { name: "/", children: [] },
  }).tree;

calculateSizes(tree);
calculateTotal(tree, (40000000 - tree.size) * -1);

// 4443914
console.log(result);
