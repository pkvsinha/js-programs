function stringKey(str) {
  let chars = new Array(26).fill(0);
  for (let c of str) {
      chars[c.charCodeAt() - 'a'.charCodeAt()] += 1;
  }
  let key = "";
  for (let n of chars) {
    key += "#";
    key += n;
  }
  return key;
}

console.log(stringKey("eat"));