function same(arr1, arr2) {
  let res = []
  for(let i = 0; i < arr2.length; i++) {
    for(let j = 0; i < arr1.length; j++) {
      if(arr1[j] === arr2[i]) {
        res.push(arr1[j])
      }
    }
  }
  return res
} 



console.log(a)
let a = 1