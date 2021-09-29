import {initState} from './state'

function initMixin (Vue){
  Vue.prototype._init = function(options){
    const vm = this
    this.$options = options // 所有后续拓展方法，都有$options

    

    // 对于实例的数据源， props data methods computes watch
    initState(vm)
  }
}

export default initMixin  