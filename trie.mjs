class TrieNode {
  constructor() {
    this.data = null;
    this.children = new Map();
  }
}
export class Trie {
  constructor() {
    this.root = null;
  }

  _add(node, word) {
    if (node === null) node = new TrieNode();
    let curr = node;
    for (const c of word) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new TrieNode());
      }
      curr = curr.children.get(c);
    }

    return node;
  }

  add(word) {
    return this.root = this._add(this.root, word);
  }
}

const trie = new Trie();
console.log(JSON.stringify(trie.add("hello")));