//  整个vue 的入口

import initMixin from "./init"

import {compileToFunction} from './compiler/index';

// es6 的class 要求所有的扩展都在类的内部来进行拓展
// class Vue{}

function Vue(options){
  // console.log(options)
  this._init(options)
  this.$mount(this.$options.el)
}
initMixin(Vue)
// 给vue添加原型方法是通过文件方式添加

// 状态初始化完毕后，需要进行页面挂载

// if(vm.$options.el){
//   vm.$mount(vm.$options.el)
// }

Vue.prototype.$mount = function(el){
  const vm = this;
  el = document.querySelector(el);
  const options = vm.$options;
  if(!options.render){
    let template = options.template;
    if(!template){
      template = el.outerHTML
    }

    // 将模版编译成render函数

    // 创建 虚拟 DOM
    const render = compileToFunction(template)
    options.render = render

  }
}



export default Vue