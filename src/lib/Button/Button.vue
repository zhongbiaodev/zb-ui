<template>
  <div class="zb-button" :class="ClassList">
      <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'ZbButton',
    props: {
        disabled: {
            type: Boolean,
            default () {
                return false
            }
        },
        /**
         * 按钮类型
         *    默认为按钮主类型
         *      -main    对应ui主色
         *    可选类型
         *      -wechat  微信按钮颜色
         *      -danger  谨慎操作色
         */
        type: {
            type: String,
            default () {
                return 'main'
            }
        }
    },
    computed: {
        ClassList (vm) {
            let classList = []
            if (vm.disabled) {
                classList.push('disabled')
            }
            if (vm.hasGroup) {
                classList.push('group-button')
            }
            classList.push('zb-button-' + vm.type)
            return classList
        },
        hasGroup (vm) {
            // 判断按钮的父组件是否为 ButtonGroup
            return vm.$parent.name === 'ButtonGroup'
        }
    }
}
</script>

<style lang="scss">
.zb-button {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    // margin-left: -15px;
    // margin-right: -15px;
    text-align: center;
    border-radius: 4px;
    &.zb-button-main {
        background: $color-main;
        color: #fff;
    }
}
</style>