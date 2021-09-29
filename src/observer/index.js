import arrayPrototype from "./array"



class Observer {
  constructor(data) {

    Object.defineProperty(data,'__ob__',{
      value: this,
      enumerable:false  // 不可遍历
    })
    // data.__ob__ = this  // 可遍历

    if (Array.isArray(data)) {
      // 如果数组也使用 defineProperty 会浪费很多性能

      // 改写数组的方法，用户调用了改写数组的方法，就去劫持这个方法
      //变异方法 push pop shift unshift reverse sort splice
      // 修改数组的索引和长度是无法更新视图的

      data.__proto__ = arrayPrototype
      // 如果数组里面放的是对象的话，也需要响应式化
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }

  observeArray(data) {
    data.forEach(item => {
      observe(item)  // 是对象才会观测
    })
  }

  walk(data) {  // 循环对西那个， 不要用for in ，会遍历原型链




    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })

  }
}


// 性能不好，所有的属性都被重新定义了一遍
// 一上来需要将对象深度代理，性能差
function defineReactive(data, key, value) {  // 闭包

  observe(value); // 递归代理属性

  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newVal) {
      if (newVal === value) return
      observe(newVal) // 新值 也要响应式
      value = newVal
    }
  })

}

export function observe(data) {



  if (typeof data !== 'object' || data == null) {
    return;  // 不是对象类型，不做任何处理
  }

  if(data.__ob__){ // 已经劫持过了
    return data;
  }

  new Observer(data)
}