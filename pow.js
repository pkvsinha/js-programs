function times(a, b, callback) {
  let n = 1;
  while (b > 1) {
    for (let i = 1; i <= a; i++) {
      for (let j = 1; j <= a; j++) {
        console.log(`time: [${i}, ${j}]`, n++);
      }
    }
    b--;
  }
}

times(3, 2);