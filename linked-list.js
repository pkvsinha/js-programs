function of(...array) {
  let head;
  let node;
  for (let el of array) {
    if (!node) {
      head = node = { value: el, next: null };
    } else {
      node.next = { value: el, next: null };
      node = node.next;
    }
  }

  return head;
}

function print(list) {
  let node = list;
  let output = [];
  while (node !== null) {
    output.push(node.value);
    node = node.next;
  }

  return output;
}

function reverse(list) {
  let prev = null;
  let curr = list;
  let next = null;
  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

function incr(list) {
  let rev = reverse(list);
  let acc = 1;
  let node = rev;
  do {
    node.value += acc;
    if (node.value >= 10) acc = 1;
    else acc = 0;
    node.value %= 10;
    node = node.next;
  } while (node != null);
  if (acc > 0) {
    return { value: acc, next: reverse(rev) };
  }
  return reverse(rev);
}

function increc(list) {
  let acc = addrec(list, 1);
  if (acc > 0) {
    return { value: acc, next: list };
  }
  return list;
}

function addrec(node, acc) {
  if (acc == 0 || node === null) return acc;
  node.value += addrec(node.next, acc);
  if (node.value >= 10) acc = 1;
  else acc = 0;
  node.value %= 10;
  return acc;
}
// let list1 = of([3, 4, 5, 6, 7, 9]);
// console.log(print(reverse(list1)));
console.log(print(increc(of(9, 9, 9, 9))));