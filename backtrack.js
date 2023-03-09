const BASE_CASE = false;
const backtrack = function(curr, ...args) {
  if (BASE_CASE) {
    return 99;
  }

  let ans = 0;
  for (let c in input) {
    curr = current.left;
    ans += backtrack(curr, ...args);
    
  }
}