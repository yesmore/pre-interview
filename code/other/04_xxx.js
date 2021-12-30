var obj = {
  get a() {
    return Math.random() >= 0.5 ? 1 : 0
  }
}

// const round = obj.__lookupGetter__('a')

const round = Object.getOwnPropertyDescriptor(obj, 'a').get
console.log(round);