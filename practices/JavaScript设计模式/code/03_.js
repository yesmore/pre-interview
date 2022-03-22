/**
 * 接口隔离原则 ISP
 *  - 目标: 多个专一的接口比单个胖接口好用
 */

// 需求
// 开发游戏后，需要实现游戏中台 - 快速生产游戏

class Game {
  constructor(name) {
    this.name = name;
  }
  play() {
    console.log(`${this.name} is playing`);
  }
  run() {
    // 跑
  }
  shot() {
    // 开枪
  }
  mega() {
    // 开大
  }
}

class PUGB extends Game {
  constructor() {

  }
}

class LOL extends Game {
  constructor() {

  }
}

let pubg = new PUBG('pubg')
pubg.run()
pubg.shot()
pubg.mega()

// 重构 - 用多个接口替代，每个接口服务于一个子模块

class Game {
  constructor(name) {
    this.name = name;
  }
  run() {} // 公用
}

class PUGB extends Game {
  constructor() {

  }
  shot() {
    // 开枪
  }
}

class LOL extends Game {
  constructor() {

  }
  mega() {
    // 开大
  }
}