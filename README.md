# 众标Vue组件库

> Vue组件库

## MultipleSelect

> 多选选择器,用于进行多项选择。

### Props

| name         | type    | default | description |
| ----         | -----   | ------- | ----------- |
| value        | Array   |         | 选中的结果的key值 |
| range        | String  |         | 字典值名称, 如: areaAll |
| selectRange  | Array   |         | 在全部字典值中只提供部分进行选择时可用, 如: 全部地区中只提供北上广进行选择, 则可以传入[110000, 310000, 440100] |
| noLimit      | Boolean |         | 是否显示不限按钮 |
| show         | Boolean | false   | 用于控制组件显示隐藏 |
| animate      | Boolean | false   | 是否提供侧滑动画 |

### Events

| name         | params  | description            |
| ----         | -----   | ---------------------- |
| on-selected  | (value) | 当点击确定, 或保存时触发 |
| on-close     |         | 当show值为fasle时触发   |
