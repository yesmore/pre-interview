const express = require('express')
const {
  urlencoded,
  json
} = require('body-parser')

const app = express()
app.use(urlencoded({
  extended: true
}))
app.use(json())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET|POST')
  next()
})

app.get('/', (req, res) => {
  res.send('Server')
})
app.post('/transfer', (req, res) => {
  let _c = req.body.code // 获取前端传来的字符串
  // console.log(_c);
  _c = _c.replace(/let|const/g, 'var')
  res.send(_c)
})

app.listen(8080, function () {
  console.log('Server: http://localhost:8080');
})