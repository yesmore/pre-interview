import observe from "./observe"

function observeArr(arr) {
  for (var i = 0; i < arr.length; i++) {
    observe(arr[i])
  }
}

export default observeArr