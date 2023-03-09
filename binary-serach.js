
function binarySearch(nums, target, lo, hi) {
  if (lo > hi) return -1;
  
  var mid = Math.floor((lo + hi) / 2);
  if (target === nums[mid]) return mid;
  if (target < nums[mid]) return binarySearch(nums, target, lo, mid - 1);
  return binarySearch(nums, target, mid + 1, hi);
}

function search(nums, target) {
  console.log(binarySearch(nums, target, 0, nums.length - 1));
}

search([5,7,7,8,8,10], 8);