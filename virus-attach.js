function findWayOut(matrix, [i, j]) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let q = [[[i, j]]];
  let visited = new Set();
  visited.add(cellIndex([i, j], cols));
  let paths = [];
  let minPath = Number.MAX_VALUE;
  while (q.length > 0) {
    const path = q.shift();
    const [x, y] = path[path.length - 1];
    if (onGate([x, y], rows, cols)) {
      const finalPath = path.map(([m, n]) => m * cols + n);
      paths.push(finalPath);
      minPath = Math.min(minPath, finalPath.length);
      continue;
    }
    for (let cell of adjacent(x, y, matrix)) {
      if (!visited.has(cellIndex(cell, cols))) {
        visited.add(cellIndex(cell, cols));
        q.push([...path, cell]);
      }
    }
  }

  return paths.filter(p => p.length === minPath);
}

function onGate([i, j], rows, cols) {
  return i === 0 || j === 0 || i === (rows - 1) || j === (cols - 1);
}

function adjacent(i, j, matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  return [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j -1]
  ].filter(([x, y]) => x >= 0 && y >= 0 && x < rows && y < cols && matrix[x][y] === '.');
}
var data = [
  ['#', '#', '.', '#'],
  ['#', '#', '.', '.'],
  ['.', '.', '.', '#'],
  ['#', '#', '.', '#']
];

console.log(findWayOut(data, [2, 2]));

function cellIndex([i, j], cols) {
  return i * cols + j;
}
