import Button from './Button/index'
import Modal from './Modal/index'

const components = [
  Button,
  Modal
]

const version = '1.0.0'

const install = function (Vue) {
  if (install.installed) return
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}


if (typeof window !== 'undefined' && window.Vue) {
  console.log('运行环境为window');
  install(window.Vue)
}

export {
  Button,
  Modal,
  install
}

export default {
  install,
  version
}
