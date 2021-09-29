
/**
 * 嵌套一层，先调用自己的方法，在调用原生的方法
 */

let oldArrayPrototype = Array.prototype;
// arrPrototype.__proto__ = Array.prototype;

let arrayPrototype = Object.create(oldArrayPrototype);

let methods = [
  'push','pop','shift','unshift','reverse','sort','splice'
]

methods.forEach(method => {
  arrayPrototype[method] = function(...args){


    let inserted;
    let ob = this.__ob__
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if(inserted){
      // 对新增的数据再次进行 observe
      ob.observeArray(inserted)
    }

    console.log('劫持了数组的',method);   
    // 触发视图的更新
    return oldArrayPrototype[method].call(this,...args)
  }
})

export default arrayPrototype

/**
 * 响应式原理， 就是给每个属性增加 get set 属性 ，而且是递归操作，
 * 尽量不要把数据的层级写的太深，赋值一个新对象也会变成响应式
 * 
 * 数组没有使用defineProperty 采用的是函数劫持，创造一个新的原型，重新这个原型的7个方法，
 * 
 * 
 */