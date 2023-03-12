class DiGraph {
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = new Array(vertices);
    this.edgeCount = 0;
    for (let i = 0; i < vertices; i++) {
      this.edges[i] = new Set();
    }
  }

  adj(v) {
    return Array.from(this.edges[v]);
  }

  addEdge(u, v) {
    this.edges[u].add(v);
    this.edgeCount++;
  }

  reverse() {
    let R = new DiGraph(this.vertices);
    for (let v = 0; v < this.vertices; v++) {
      for (let w of this.adj(v)) {
        R.addEdge(w, v);
      }
    }

    return R;
  }

  print() {
    for (let i = 0; i < this.vertices; i++) {
      console.log(i, "=>", Array.from(this.edges[i]));
    }
  }
}

class DirectedDFS {
  constructor(digraph, s) {
    this.marked = new Array(digraph.vertices);
    if (s.length) {
      for (let v of s) {
        if (!this.marked[v]) this.dfs(digraph, v);
      }
    } else {
      this.dfs(digraph, s);
    }
  }

  dfs(digraph, v) {
    this.marked[v] = true;
    for (let w of digraph.adj(v)) {
      if (!this.marked[w]) this.dfs(digraph, w);
    }
  }

  connected(v) {
    return this.marked[v];
  }
}

class DirectedCycleFinder {
  constructor(digraph) {
    this.edgeTo = new Array(digraph.vertices);
    this.marked = new Array(digraph.vertices);
    this.onStack = new Array(digraph.vertices);
    this.pre = [];
    this.post = [];
    this.reversePost = [];
    for (let v = 0; v < digraph.vertices; v++) {
      if (!this.marked[v]) this.dfs(digraph, v);
    }
  }

  dfs(digraph, v) {
    this.onStack[v] = true;
    this.marked[v] = true;
    for (let w of digraph.adj(v)) {
      if (this.hasCycle()) return;
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.dfs(digraph, w);
      } else if (this.onStack[w]) {
        this.cyclePath = [];
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this.cyclePath.push(x);
        }
        this.cyclePath.push(w);
        this.cyclePath.push(v);
      }
    }
    this.onStack[v] = false;
  }

  hasCycle() {
    return this.cyclePath != null;
  }

  cycle() {
    let path = [];
    let stack = Array.from(this.cyclePath);
    while (stack.length > 0) path.push(stack.pop());
    return path;
  }
}

class DepthFirstOrder {
  constructor(digraph) {
    this.marked = new Array(digraph.vertices);
    this.pre = [];
    this.post = [];
    this.reversePost = [];
    for (let v = 0; v < digraph.vertices; v++) {
      if (!this.marked[v]) this.dfs(digraph, v);
    }
  }

  dfs(digraph, v) {
    this.pre.push(v);
    this.marked[v] = true;
    for (let w of digraph.adj(v)) {
      if (!this.marked[w]) this.dfs(digraph, w);
    }
    this.post.push(v);
    this.reversePost.push(v);
  }

  preOrder() {
    let order = [];
    let queue = Array.from(this.pre);
    while (queue.length > 0) order.push(queue.shift());
    return order;
  }

  postOrder() {
    let order = [];
    let queue = Array.from(this.post);
    while (queue.length > 0) order.push(queue.shift());
    return order;
  }

  reversePostOrder() {
    let order = [];
    let stack = Array.from(this.reversePost);
    while (stack.length > 0) order.push(stack.pop());
    return order;
  }
}

class TopologicalSort {
  constructor(digraph) {
    let dag = DirectedCycleFinder(digraph);
    if (!dag.hasCycle()) {
      this.order = new DepthFirstOrder(digraph).reversePostOrder();
    }
  }

  order() {
    return [...this.order];
  }

  isDAG() {
    return this.order === null;
  }
}

class SCC {
  constructor(digraph) {
    this.marked = new Array(digraph.vertices);
    this.id = new Array(digraph.vertices);
    this.count = 0;
    let dfo = new DepthFirstOrder(digraph.reverse());
    for (let s of dfo.reversePostOrder()) {
      if (!this.marked[s]) {
        this.dfs(digraph, s);
        this.count++;
      }
    }
  }

  dfs(digraph, v) {
    this.marked[v] = true;
    this.id[v] = count;
    for (let w of digraph.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(digraph, w);
      }
    }
  }

  stronglyConnected(v, w) {
    return id[v] === id[w];
  }

  size() {
    return this.count;
  }

  id(v) {
    return this.id[v];
  }
}

/** cyclic */
const g = new DiGraph(6);
[[0, 5], [5, 4], [4, 3], [3, 5]].forEach(([u, v]) => g.addEdge(u, v));

const dag = new DirectedCycleFinder(g) 
console.log("has cycle => ", dag.hasCycle());
console.log("cycle => ", dag.cycle());

/** cyclic */
const sch = new DiGraph(13);
[[0, 1], [0, 5], [0, 6], [2, 0], [2, 3], [3, 5], [5, 4], [6, 4], [6, 9], [7, 6], [8, 7], [9, 10], [9, 11], [9, 12], [11, 12] ].forEach(([u, v]) => sch.addEdge(u, v));

console.log("has cycle => ", new DirectedCycleFinder(sch).hasCycle());
const dfo = new DepthFirstOrder(sch);
console.log("pre => ", dfo.preOrder());
console.log("post => ", dfo.postOrder());
console.log("reverse post => ", dfo.reversePostOrder());
