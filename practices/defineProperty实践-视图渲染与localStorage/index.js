// defineProperty实践-视图渲染与localStorage
import {
  observer
} from './observer'

;
(function (doc) {
  var oUsername = doc.querySelector('#username')
  var oAge = doc.querySelector('#age')
  var oEmail = doc.querySelector('#email')
  var oTel = doc.querySelector('#tel')
  var oSubmitBtn = doc.querySelector('#submitBtn')
  var oInfoTable = doc.querySelector('#infoTable')

  var userInfo = observer({
    username: '',
    age: '',
    email: '',
    tel: '',
  }, oInfoTable)

  console.log(userInfo);

  var init = function () {
    bindEvent()
  }

  function bindEvent() {
    oSubmitBtn.addEventListener("click", handleSubmit, false);
  }

  function handleSubmit() {
    var _username = oUsername.value.trim()
    var _age = oAge.value.trim()
    var _email = oEmail.value.trim()
    var _tel = oTel.value.trim()

    _username && (_username !== userInfo.username) && (userInfo.username = _username)
    _age && (_age !== userInfo.age) && (userInfo.age = _age)
    _email && (_email !== userInfo.email) && (userInfo.email = _email)
    _tel && (_tel !== userInfo.tel) && (userInfo.tel = _tel)

    oUsername.value = ''
    oAge.value = ''
    oEmail.value = ''
    oTel.value = ''
  }

  init()

})(document)