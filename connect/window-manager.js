class WindowManager {

  constructor(broker) {
    this.broker = broker;
  }

  spawn() {
    let channel = new Channel();
    let child = window.open("");
    broker.add(id, channel);
    return channel.left;
  }
}

