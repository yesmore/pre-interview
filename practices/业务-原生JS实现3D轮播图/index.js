const oSliderItems = document.querySelectorAll('.slider-item');
const classNames = []
let t = null

const init = () => {
  // 1.收集类名
  collectClassNames()
  // 2.切换类名
  sliderAction()
}

// 设置类名
function render() {
  let oSliderItem = null;

  for (let i = 0; i < oSliderItems.length; i++) {
    oSliderItem = oSliderItems[i]
    oSliderItem.className = classNames[i]
  }
}

function collectClassNames() {
  let oSliderItem = null;

  for (let i = 0; i < oSliderItems.length; i++) {
    oSliderItem = oSliderItems[i]
    classNames.push(oSliderItem.className)
  }
}

function setClassNames() {
  classNames.unshift(classNames.pop())
  render()
}

function sliderAction() {
  t = setInterval(setClassNames, 2000)
}

init()