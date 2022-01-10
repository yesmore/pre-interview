import {
  personalInfo
} from './data'
import {
  personalInfoDefine
} from './dataDefine'
import {
  useStrictObject
} from './defineObject'

;
(() => {
  const _personalInfo = useStrictObject(personalInfo, personalInfoDefine)
  console.log(_personalInfo);

  // 测试
  _personalInfo[0].job = 'IT工程师'
  // _personalInfo[1].name = '李华' // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'

  _personalInfo[2].setConfig('privateKey', 'enumerable', true)

  _personalInfo.forEach(item => {
    for (let key in item) {
      console.log(key); // 无 publicKey属性
    }
  })
})()