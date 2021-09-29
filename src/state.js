import {observe} from "./observer/index"

export function initState(vm){

  const options = vm.$options

  if(options.data){
    initData(vm)
  }

}

function proxy (vm,source,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(val){
      vm[source][key] = val
    }
  })
}

function initData(vm){
  let data = vm.$options.data
  // 如果是函数就拿到返回值, 否则直接采用data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data


  for(let key in data){
    proxy(vm,'_data',key)
  }

  // 属性进行劫持，defineProperty 
  observe(data)
  console.log(data);
}