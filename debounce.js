/**
 * delay the function execution unitl the given time.
 * always execute the last event received for trigger.
 * 
 * suitable for contorl events like clicks, searches. 
 * @param {*} fn 
 * @param {*} waitTime 
 * @returns 
 */
function debounce(fn, waitTime) {
  let timer;
  return function debouncedCall(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, waitTime);
  }
}

const fn = debounce((a, b) => {
  console.log("a + b = ", a + b);
}, 1000);

for (let i = 0; i < 5; i++) {
  fn(0, i);
}