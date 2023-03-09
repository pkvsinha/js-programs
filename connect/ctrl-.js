
// from inside the controller: pipeops

// parent
window.manager.register("controller::pipeops");
function updateBalance(upstream, downstream) {
  $scope.balance = upstream - downstream;
}

$scope.on("downstreamChanged", (downstream) => {
  updateBalance($scope.upstream, data);
})

// child
function hide() {
  // hide this controller. and act as a shadow.
  // ask the layout manager for relayout
}

function popOut() {
  let channel = window.manager.spawn(); // load the whole app.
  hide();
  channel.send([]); // whole table data.
  channel.onMessage = ({key, data}) => {
    switch(key) {
      case 'up':
        $scope.emit("downstreamChanged", "data");
    }
  }
}
