class Graph {

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
    this.edges[v].add(u);
    this.edgeCount++;
  }

  print() {
    for (let i = 0; i < this.vertices; i++) {
      console.log(i, "=>", Array.from(this.edges[i]));
    }
  }
}

class DFS {
  constructor(graph, source) {
    this.source = source;
    this.graph = graph;
    this.edgeTo = new Array(graph.vertices);
    this.edgeTo[source] = source;
    this.marked = new Array(graph.vertices);
    this.color = new Array(graph.vertices);
    this.color[source] = true;
    this.cyclicPath = false;
    this.isTwoColorable = true;
    this.dfs(source, source);
  }

  dfs() {
    let stack = [this.source];
    this.marked[this.source] = true;
    while (stack.length > 0) {
      let v = stack.pop();
      for (let w of this.graph.adj(v)) {
        if (!this.marked[w]) {
          this.marked[w] = true;
          this.edgeTo[w] = v;
          this.color[w] = !this.color[v];
          stack.push(w);
        } else {
          if (!this.cyclicPath) this.cyclicPath = (w !== this.edgeTo[v]);
          if(!this.isTwoColorable) this.isTwoColorable = !(this.color[w] === this.color[v]);
        }
      }
    }
  }

  dfs_rec(v, u) {
    console.log("v= ", v, "u= ", u);
    this.marked[v] = true;
    for (let w of this.graph.adj(v)) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.color[w] = !this.color[v];
        this.dfs_rec(w, v);
      } else {
        this.cyclicPath = (w !== u);
        this.isTwoColorable = !(this.color[w] === this.color[v]);
      }
    }
  }

  hasCycle() {
    return this.cyclicPath;
  }

  isBipartite() {
    return this.isTwoColorable;
  }

  pathTo(v) {
    let stack = [];
    for (let x = v; x != this.source; x = this.edgeTo[x]) stack.push(x);
    stack.push(this.source);
    return stack;
  }
}

const g = new Graph(7);
[[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6]].forEach(([u, v]) => g.addEdge(u, v));
const dfs = new DFS(g, 0) 
console.log(dfs.pathTo(5));
console.log("has cycle => ", dfs.hasCycle());
console.log("isBipartite => ", dfs.isBipartite());
