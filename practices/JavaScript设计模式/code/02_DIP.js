/**
 * 依赖倒置原则 DIP()
 *  - 规则: 上层不应该依赖下层，下层应该依赖上层
 *  - 目标: 面向抽象进行编码, 而不是对实现进行coding, 降低需求与实现的耦合
 */

// 例需求
// 1.分享功能
class Store {
  constructor() {
    this.share = new Share()
  }
}
class Share {
  shareTo() {
    // 分享到不同平台
  }
}
const store = new Store()
store.share.shareTo('wx')

// 需求
// 新增一个评分功能
class Store1 {
  constructor() {
    this.share = new Share1()
    this.rate = new Rate()
  }
}
class Share1 {
  shareTo() {
    // 分享到不同平台
  }
}
class Rate {
  star(star) {
    // 评分
  }
}

// 重构: 新增逻辑不影响顶层代码
// 目标：暴露挂载

class Store2 {
  // 模块名单
  static modules = new Map()

  constructor() {
    // 遍历名单做初始化挂载
    for (let m of Store.modules.values()) {
      m.init(this)
    }
  }

  // 注入功能模块
  static inject(m) {
    Store.modules.set(m.constructor.name, m)
  }
}
class Rate1 {
  init(store) {
    store.rate = this
  }
  store(stars) {
    // 评分
  }
}
class Share2 {
  init(store) {
    store.share = this
  }
  shareTo(platform) {
    // 分享
  }
}

const rate = new Rate1()
Store2.inject(rate) // 注入

const store2 = new Store2()
store2.rate.star(5)