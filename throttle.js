/**
 * will execute the given action within the given specified time.
 * it executes the continues actions at regular intervals. unlike
 * debouce, where it delay's the function execution after a certain 
 * time after the last action is taken.
 * 
 * Throtle takes the first action but after the given time lapses. Once triggered,
 * it agian the first action after that, for the said time.
 * 
 * @param {*} fn 
 * @param {*} wait 
 * @returns 
 */
function throttle(fn, wait) {
  let shouldFire = true;
  return function throttledCall(...args) {
    if (shouldFire) {
      fn.call(this, ...args);
      shouldFire = false;

      setTimeout(() => {
        shouldFire = true;
      }, wait);
    }
  };
}


const fn = throttle((a, b) => {
  console.log("a + b = ", a + b);
}, 1000);

for (let i = 0; i < 5; i++) {
  fn(0, i);
}