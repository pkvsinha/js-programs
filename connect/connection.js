class Broker {
  
  constructor() {
    this.children = {};
  }

  add(id, win) {
    this.children[id] = {
      state: "INIT",
      win
    };
  }

  ack(id) {
    this.children[id] = {
      state: "ACTIVE",
      win
    };
  }
}

