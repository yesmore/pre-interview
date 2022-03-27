/**
 * 绘制箭头类
 */

class Arrow {
  constructor(props) {
    this.x = 0; // 起始x坐标
    this.y = 0; // 起始y坐标
    this.w = 60; // 箭头宽度
    this.h = 30; // 箭头高度
    this.rotation = 0; // 旋转角度
    this.fillStyle = 'rgb(57, 119, 224)'; // 填充颜色
    this.strokeStyle = 'rgba(0, 0, 0, 0)'; // 不描边
    Object.assign(this, props); // 初始化
    return this;
  }

  // 绘制箭头图像
  createPath(ctx) {
    let { w, h } = this;
    ctx.beginPath();
    // 从左往右，从上到下画箭头
    ctx.moveTo(-w / 2, -h / 2); // 绘制起始点(箭头左上角 "=>")
    ctx.lineTo(w / 10, -h / 2); // 箭头横线右端点拐角处
    ctx.lineTo(w / 10, -h); // 箭头上尖端点
    ctx.lineTo(w / 2, 0); // 箭头顶端
    ctx.lineTo(w / 10, h); // 箭头下尖端点
    ctx.lineTo(w / 10, h / 2); // 箭头横线左端点拐角处
    ctx.lineTo(-w / 2, h / 2); // 绘制结束点(箭头右上角 "=>")
    ctx.closePath();
    return this;
  }

  // 渲染箭头
  render(ctx) {
    let { fillStyle, strokeStyle, rotation, x, y } = this;
    ctx.save(); // 保存绘图环境
    ctx.fillStyle = fillStyle; // 填充颜色
    ctx.strokeStyle = strokeStyle; // 描边颜色
    ctx.translate(x, y); // 平移到箭头起始点
    ctx.rotate(rotation); // 选择角度
    this.createPath(ctx);
    ctx.fill(); // 填充
    ctx.stroke(); // 描边
    ctx.restore(); // 恢复绘图环境
    return this;
  }
}