<template>
  <div class="zb-button" @click="onClick" :class="ClassList">
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
         *      -normal  普通色
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
    },
    methods: {
        onClick (event) {
            if (this.disabled) {
                return
            } else {
                this.$emit('click', event)
            }
        }
    }
}
</script>

<style lang="scss">
$color-wechat: #0f0;
$color-danger: #f00;
$color-normal: #ddd;
$button-colors:
    wechat $color-wechat #fff,
    danger $color-danger #fff,
    normal $color-normal $color-auxiliary,
    main $color-main #fff,
;
.zb-button {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    @each $name, $bg, $text in $button-colors {
        &.zb-button-#{$name} {
            background: $bg;
            color: $text;
        }
    }
    &.disabled {
        opacity: .6;
    }
}
</style>