/**
 * 小球类
 */

class Ball {
  constructor(props) {
    this.x = 0; // 球起始坐标
    this.y = 0;
    this.x3d = 0;
    this.y3d = 0;
    this.z3d = 0;
    this.r = 20; // 球半径
    this.vx = 0; // 水平(x轴)速度
    this.vy = 0; // 垂直(y轴)速度
    this.vz = 0; // z轴速度
    this.scaleX = 1; // 横向缩放倍数
    this.scaleY = 1; // 纵向缩放倍数
    this.strokeStyle = 'rgba(0, 0, 0, 0)'; // 颜色
    this.fillStyle = 'rgb(57, 119, 224)';
    this.alpha = 1; // 透明度
    Object.assign(this, props); // 初始化配置参数
    return this;
  }
  // 渲染小球
  render(ctx) {
    let { x, y, r, scaleX, scaleY, fillStyle, strokeStyle, alpha } = this;
    ctx.save(); // 保存绘制环境
    ctx.translate(x, y); // 将坐标系原点移动到小球的绘制坐标
    ctx.scale(scaleX, scaleY); // 缩放比
    ctx.strokeStyle = strokeStyle; // 颜色
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = alpha; // 全局透明度

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI); // 绘制圆形 (顺时针绘制)
    ctx.fill();
    ctx.stroke();
    ctx.restore(); // 恢复绘制环境
    return this;
  }

  isPoint(pos) {
    let { x, y } = pos;
    return this.r >= Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
  }
}