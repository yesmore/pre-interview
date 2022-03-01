const oSliderPage = document.querySelector('.slider-page'),
  oScrollWrapper = document.querySelector('.scroll-wrapper'),
  oSliderItems = document.querySelectorAll('.slider-item'),
  pageWidth = oSliderPage.offsetWidth; // 页面宽度

let startX = 0, // 鼠标点与手机左边框距离
  pageIndex = 0,
  distanceX = 0, // 滑动距离
  isMove = false; // 是否移动

const init = () => {
  bindEvents();
}


function bindEvents() {
  oScrollWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
  oScrollWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
  oScrollWrapper.addEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(e) {
  // e.preventDefault();
  startX = e.touches[0].clientX;
  // console.log(startX);
}

function handleTouchMove(e) {
  e.preventDefault();
  const moveX = e.touches[0].clientX; // 鼠标移动的距离

  // 边界处理: 通过 startX与moveX比较，如果 moveX > startX，则表示向右滑动，否则向左滑动
  if ((moveX > startX && pageIndex === 0) || //左边界
    (moveX < startX && pageIndex === oSliderItems.length - 1)) { // 右边界
    return
  }

  // 滑动距离 = 鼠标移动距离 - 鼠标点与手机左边框距离
  distanceX = moveX - startX;
  setTranslate(-pageWidth * pageIndex + distanceX);
  isMove = true;
}

function handleTouchEnd(e) {
  e.preventDefault();
  if (isMove) {
    if (Math.abs(distanceX) >= pageWidth / 3) {
      // 向右滑动
      if (distanceX > 0) {
        pageIndex--;
      }

      if (distanceX < 0) {
        pageIndex++;
      }
    }

    setTranslate(-pageWidth * pageIndex);
  }

  startX = 0
  distanceX = 0
  isMove = false
}

function setTranslate(transX) {
  oScrollWrapper.style.transition = `all .1s`;
  oScrollWrapper.style.transform = `translateX(${transX}px)`;
}

init()