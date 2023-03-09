if (!window.opener) { // master
  const broker = new Broker();
  window.manager = WindowManager(broker);
  window.register = function registerChild(id) {
    broker.ack(id);
  }
} else {
    window.master = false;
    window.id = generateId();
    window.opener.register(window.id)
}