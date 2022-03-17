var obj = { first: 'fundebug.com'};
obj = { second: 'fundebug.cn'};

console.log(obj)

function changeAgeAndReference(person) {
  person.age = 25;
  person = {
      name: 'John',
      age: 50
  };
  
  return person;
}
var personObj1 = {
  name: 'Alex',
  age: 30
};
var personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1); // -> ?
console.log(personObj2); // -> ?