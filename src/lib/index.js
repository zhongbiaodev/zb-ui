import MultipleSelect from './MultipleSelect'
import Button from './Button'
import lodash from 'lodash'
const components = [
  MultipleSelect,
  Button
]

let plugin = {
  install (Vue) {
    components.map(component => {
      Vue.component(component.name, component)
    })
    // 挂载全局函数
    Vue.prototype.$lodash = lodash
  },
  MultipleSelect
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
