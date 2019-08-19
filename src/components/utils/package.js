const packageComponent = function (Comp) {

  Comp.install = function (Vue) {
    Vue.component(Comp.name, Comp)
  }

  if (typeof window !== 'undefined' && window.Vue) {
    Comp.install(window.Vue)
  }
  return Comp

}


export default packageComponent
