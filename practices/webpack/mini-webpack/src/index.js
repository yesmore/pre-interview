import Content from './es6'

const instance = new Content()

function test(content) {
  document.querySelector('#app').innerHTML = content;
}

test(instance.count);