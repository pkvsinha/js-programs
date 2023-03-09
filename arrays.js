function half(array) {
  let output = [];
  let rem = 0;
  for (let i = 0; i < array.length; i++) {
      let n = rem * 10 + array[i];
      if (n < 2) {
          if (i === array.length - 1) {
              output.push(Math.floor(n / 2));
              rem = n % 2;
              break;
          }
          output.push(0);
          n === 0 ? n = 0 : n = (n * 10) + array[++i];
      }
      output.push(Math.floor(n / 2));
      rem = n % 2;
  }
  return [output, rem];
}

console.log(half([1]), " = ", number(half([1])));

for (let i = 0; i < 1000000; i++) {
  let str = `${i}`;
  let [halfN, rem] = half([...str].map(e => parseInt(e)));
  let n = number(halfN);
  if (n !== Math.floor(i / 2) || rem != (i % 2)) {
    console.log(i, " is not corretly divided! expected: [", Math.floor(i / 2), ", ", (n % 2),"], actual= [", n, ", ", rem, "]");
    break;
  }
}

function number(digits) {
  let msd = Math.pow(10, digits.length - 1);
  let n = 0;
  for (let d of digits) {
      n += (d * msd);
      msd /= 10;
  }
  return n;
}