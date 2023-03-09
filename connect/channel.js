class Endpoint {
  send(data) {
    this.right.postMessage("", JSON.stringify(data));
  }

  onMessage(callback) {
    this.onMessage(callback);
  }
}

class Channel { 
  constructor(left, right) {
    this.left = new Endpoint();
    this.right = new Endpoint();
  }

}