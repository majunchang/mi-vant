import MiButton from './Button/index'
import Modal from './Modal/index'
import Input from './Input/index.vue'
import Textarea from './Input/textarea.vue'


const components = [
  MiButton,
  Modal,
  Input,
  Textarea
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
  MiButton,
  Modal,
  Input,
  Textarea,
  install
}

export default {
  install,
  version
}
