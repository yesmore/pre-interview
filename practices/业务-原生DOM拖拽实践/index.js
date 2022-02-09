/**
 * 
 * 
 * 
 */
(() => {
  const idioms = ['岁月静好', '多愁善感', '排山倒海', '翻云覆雨'],
    oCharCellGroup = document.querySelector('.char-cell-group'),
    oBlanks = document.querySelectorAll('.blank-cell-group .wrapper');

  let charCollection = [] // 打乱后的字符缓存区
  let oChars = null // 被打乱的字符dom集合

  let charAreas = [] // 字符格初始位置缓存区
  let blankAreas = [] // 顶部四个格子位置缓存区
  let resArr = [undefined, undefined, undefined, undefined] // 存放答案

  let startX = 0, // 开始拖动时 鼠标的x坐标
    startY = 0; // 开始拖动时 鼠标y坐标
  let cellX = 0, // 字符单元格距左边框的距离x坐标
    cellY = 0 // 字符单元格距上边框的距离y坐标
  let mouseX = 0, // 字符单元格到鼠标的水平距离（保持不变）
    mouseY = 0; // 字符单元格到鼠标的垂直距离（保持不变）

  let t = null

  const init = () => {
    charCollection = formatCharsArr()
    render()

    oChars = document.querySelectorAll('.char-cell-group .cell-item .wrapper');
    getAreas(oBlanks, blankAreas) // 保存四个顶部格子位置
    getAreas(oChars, charAreas) // 保存字符格初始位置
    bindEvent()
  }

  // 渲染打乱后的字符到DOM
  function render() {
    let list = '';

    charCollection.forEach((char, index) => {
      list += charCellTpl(char, index)
    })

    oCharCellGroup.innerHTML = list;
  }
  // 格式化字符数组
  function formatCharsArr() {
    let _arr = [];

    idioms.forEach(idiom => {
      _arr = _arr.concat(idiom.split(''))
    })

    return _arr.sort(randomSort)
  }
  // 字符模板
  function charCellTpl(char, index) {
    return (
      `
      <div class="cell-item">
        <div class="wrapper" data-index="${index}">${char}</div>
      </div>
      `
    )
  }
  // 洗牌
  function randomSort(_a, _b) {
    return Math.random() > 0.5 ? 1 : -1
  }

  // 绑定拖拽事件
  function bindEvent() {
    let oChar = null;

    for (let i = 0; i < oChars.length; i++) {
      oChar = oChars[i]
      oChar.addEventListener('touchstart', handleTouchStart, { passive: false })
      oChar.addEventListener('touchmove', handleTouchMove, { passive: true })
      oChar.addEventListener('touchend', handleTouchEnd, { passive: false })

      // oChar.addEventListener('mousedown', handleTouchStart, { passive: false })
      // oChar.addEventListener('mousemove', handleTouchMove, { passive: true })
      // oChar.addEventListener('mouseup', handleTouchEnd, { passive: false })
    }
  }
  // 拖拽开始
  function handleTouchStart(e) {
    // 获取字符单元格宽高
    const cellW = this.offsetWidth;
    const cellH = this.offsetHeight;

    cellX = this.offsetLeft;
    cellY = this.offsetTop;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    // startX = e.target.clientX
    // startY = e.target.clientY
    mouseX = startX - cellX;
    mouseY = startY - cellY;

    this.style.width = cellW / 10 + 'rem';
    this.style.height = cellH / 10 + 'rem';
    this.style.position = 'fixed';

    // 初始位置
    setPosition(this, { x: cellX, y: cellY })
    // console.log(e);
  }
  // 拖拽中
  function handleTouchMove(e) {
    // e.preventDefault();
    const moveX = e.touches[0].clientX
    const moveY = e.touches[0].clientY

    cellX = moveX - mouseX
    cellY = moveY - mouseY

    setPosition(this, { x: cellX, y: cellY })
    // console.log(moveX, moveY);
  }
  // 拖拽结束
  function handleTouchEnd(e) {
    // 是否到顶部停留
    const blankWidth = oBlanks[0].offsetWidth;
    const blankHeight = oBlanks[0].offsetHeight;

    for (let i = 0; i < blankAreas.length; i++) {
      // 判断当前拖拽的位置是否含有字符格子（是否被填充）
      if (resArr[i] !== undefined) {
        // console.log('已经填充过了');
        continue
      }

      let { startX, startY } = blankAreas[i]

      if (
        (cellX > startX &&
          cellX < startX + blankWidth / 2 &&
          cellY > startY &&
          cellY < startY + blankHeight / 2) ||
        (cellX + blankWidth > startX + blankWidth / 2 &&
          cellX + blankWidth < startX + blankWidth &&
          cellY > startY &&
          cellY < startY + blankHeight / 2)
      ) {
        setPosition(this, { x: startX, y: startY })
        setResArr(this, i)
        // console.log(resArr);

        if (!resArr.includes(undefined)) {
          t = setTimeout(() => {
            if (!checkResult()) {
              alert('错')
            } else {
              alert('对')
            }

            resetPosition()
          }, 500)
        }
        return
      }
    }

    // 回原位
    const _index = Number(this.dataset.index),
      charArea = charAreas[_index];

    setPosition(this, { x: charArea.startX, y: charArea.startY })
    // console.log(_index);
  }

  // 吸附功能
  function setPosition(el, { x, y }) {
    el.style.left = x / 10 + 'rem';
    el.style.top = y / 10 + 'rem';
  }

  // 保存初始位置
  function getAreas(domCollection, arrWrapper) {
    let startX = 0,
      startY = 0,
      oItem = null;

    for (let i = 0; i < domCollection.length; i++) {
      oItem = domCollection[i]
      startX = oItem.offsetLeft
      startY = oItem.offsetTop

      arrWrapper.push({
        startX,
        startY
      })
    }
    // console.log(arrWrapper);
  }

  // 保存顶部四格子字符内容
  function setResArr(el, index) {
    resArr[index] = {
      char: el.innerText,
      el
    }
  }

  // 检查是否为正确成语
  function checkResult() {
    let idiom = '';

    resArr.forEach(item => {
      idiom += item.char
    })
    // console.log(idiom);

    return idioms.find(item => item === idiom)
  }

  // 重置所有位置
  function resetPosition() {
    resArr.forEach(item => {
      const el = item.el
      const index = Number(el.dataset.index)
      const { startX, startY } = charAreas[index]

      setPosition(el, {
        x: startX,
        y: startY
      })
    })

    resArr = [undefined, undefined, undefined, undefined]
    startX = 0;
    startY = 0;
    cellX = 0;
    cellY = 0;
    mouseX = 0;
    mouseY = 0;
    if (t) clearTimeout(t)
    t = null
  }

  init()
})()