var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};
/**
   [
     {
       student: No.1,
       order: 0
     },
     {
       student: No.2,
       order: 1
     },
     {
       student: No.3,
       order: 2
     },
   ]
 */

const newArr = Array.from(obj, function (item, index) {
  return {
    student: this.prefix + item,
    order: index,
  }
}, {
  prefix: 'No.',
})

// const data = newArr.map((item, index) => {
//   return {
//     student: item,
//     order: index,
//   }
// })

console.log(newArr);


console.log(Array.from.length);
// Array.from()