/**
 * 开闭原则 OCP(Open Close Principle)
 *  - 规则: 对扩展开放，对修改关闭
 *  - 目标: 已有的场景下，对于需要拓展的功能进行开放，拒绝直接的功能修改
 * 
 * 单一职责原则 SRP
 *  - 岗位职责单一、互不重叠
 */

class Game {
  constructor(name) {
    this.name = name;
  }
  start() {
    console.log(`${this.name} is starting...`);
  }
  setColor() {
    console.log('set color...');
  }
  openDialog() {}
}

class LOL extends Game {
  constructor() {
    super('LOL');
  }
  openDialog() {
    console.log('LOL折扣来啦~');
  }
}

class PUBG extends Game {
  constructor() {
    super('PUBG');
  }
  setColor() {
    console.log('PUBG color...');
  }
}