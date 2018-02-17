<template>
    <transition :name="animation_name">
    <div
        class="multiple-select"
        :class="modes"
        v-show="show"
        @click="onClose"
        ref="RegisteredCapitalInstance">
        <div class="multiple-select-body" @click="$event.stopPropagation()">
            <div @click="clear()"
                v-if="action_button_type === 'reset'"
                class="multiple-select-item"
                :class="{selected: $lodash.size(result) === 0}">{{action_button_label}}</div>
            <div @click="selectAll()"
                v-if="action_button_type === 'all'"
                class="multiple-select-item"
                :class="{selected: selected_all}">{{action_button_label}}</div>
            <div @click="select(item)"
                class="multiple-select-item"
                :class="{selected: item.selected}"
                :key="item.label"
                v-for="item in items">{{item.label}}</div>
        </div>
        <div class="multiple-select-footer" @click="$event.stopPropagation()">
            <div class="reset" @click="clear">重置</div>
            <div class="ok" @click="onSelect">保存</div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    name: 'ZbMultipleSelect',
    props: {
        value: Array,
        /**
         * 全范围字典名
         *     例: 'areaAll'
         */
        range: String,
        /**
         * 可选范围
         */
        selectRange: {
            type: Array,
            default () { return [] }
        },
        /**
         * 可选模式
         *   tag     标签模式
         *   list    列表模式
         */
        mode: {
            type: String,
            default () { return 'tag' }
        },
        /**
         * 内嵌模式
         *     若是开启此模式
         *          - 去除position布局
         *          - 去除button按钮, 及时响应选择
         *          - 去除遮罩层
         */
        inner: {
            type: Boolean,
            default () { return false}
        },
        /**
         * 配置最前面的功能按钮
         *     - 允许 String, Array
         *     - String 则为功能项
         *         - 可选功能项 reset
         *         - 可选功能项 all
         *     - Array 则为配置[功能项, 显示文字]
         *         - 例: ['all', '全国']
         *     - 若是空字符串或者空数组则, 不显示按钮
         */
        actionButton: {
            type: Array,
            default () {
                return []
            }
        },
        /**
         * 点击蒙版选择是否生效
         *     默认不生效
         */
        maskSelect: {
            type: Boolean,
            default () {
                return false
            }
        },
        /**
         * 控件显示隐藏
         */
        show: Boolean,
        /**
         * 是否动画
         * 若是为Boolean类型且为true  使用slider动画
         * 若是为String 类型, 则运行对应的动画
         * 可选的值有 slider fold accordion down
         */
        animate: {
            type: [Boolean, String],
            default () {
                return false
            }
        }
    },
    created () {
        this.init()
    },
    data () {
        return {
            items: []
        }
    },
    computed: {
        // 动画名称
        animation_name () {
            if (!this.animate) {
                return ''
            } else {
                if (typeof this.animate === 'boolean') {
                    return 'slider'
                } else {
                    return this.animate
                }
            }
        },
        // 返回结果
        result (vm) {
            let r = vm.items.filter(item => item.selected).map(item => item.value)
            return r
        },
        // 是否选中了全部选项
        selected_all (vm) {
            return vm.result.length === vm.items.length
        },
        // 选择器模式
        modes (vm) {
            let modes = []
            modes.push(vm.mode)
            vm.inner && modes.push('inner')
            return modes
        },
        // 功能按钮类型
        action_button_type (vm) {
            let type = vm.actionButton[0]
            return type
        },
        // 功能按钮显示的名字
        action_button_label (vm) {
            let type = vm.actionButton[0]
            let types = {
                'reset': '不限',
                'all': '全部'
            }
            let defaultText = types[type]
            return vm.actionButton[1] || defaultText
        }
    },
    methods: {
        clear () {
            this.items.forEach(item => {
                item.selected = false
            })
        },
        selectAll () {
            if (this.selected_all) {
                this.items.forEach(item => {
                    item.selected = false
                })
            } else {
                this.items.forEach(item => {
                    item.selected = true
                })
            }
        },
        select (item) {
            // if (this.selectedAll) this.clear()
            item.selected = !item.selected
            // 若是内嵌模式, 即时响应选择
            if (this.inner) {
                this.onSelect()
            }
        },
        onSelect () {
            this.$emit('input', this.result)
            this.$emit('on-selected', this.result)
        },
        onClose () {
            this.$emit('on-close')
            if (this.maskSelect) {
                this.onSelect()
            }
        },
        init () {
            // init data
            // let all = dicts[this.range]
            let all = {
                110000: '北京',
                120000: '天津'
            }
            let dict = {}
            if (this.selectRange.length > 0) {
                this.selectRange.forEach(code => {
                    dict[code] = all[code]
                })
            } else {
                dict = all
            }
            this.items = Object.keys(dict).map(item => {
                return {selected: false, label: dict[item], value: item}
            })

            // init value
            this.items.forEach(item => {
                let val = this.value || []
                if (val.includes(item.value)) {
                    item.selected = true
                } else {
                    item.selected = false
                }
            })
        }
    },
    watch: {
        show () {
            this.init()
        }
    }
}
</script>

<style lang="scss">
$color-reset-button: $color-tag-bg;
.multiple-select {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: $color-mask;
    &.inner {
        position: static;
        background-color: none;
        .multiple-select-footer {
            display: none;
        }
    }
    &.tag {
        .multiple-select-body {
            background-color: #fff;
            padding: 30px 15px 20px;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        .multiple-select-item {
            background-color: $color-tag-bg;
            color: $color-multiple-text;
            padding: 0 10px;
            display: inline-block;
            font-size: 14px;
            box-sizing: border-box;
            height: 30px;
            line-height: 30px;
            margin-right: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .multiple-select-item.selected {
            background-color: $color-main;
            color: $color-text-selected;
        }
    }
    &.list {
        .multiple-select-body {
            background-color: #fff;
            padding: 30px 15px 20px;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        .multiple-select-item {
            color: #000;
            width: 100%;
            height: 44px;
            line-height: 44px;
            @include thin-border(bottom)
        }
        .multiple-select-item.selected {
            color: $color-main;
            position: relative;
            &:before {
                content: $icon-ok-code;
                font-family: 'font-icon';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
        }
    }
    
    .multiple-select-footer {
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .multiple-select-footer .reset{
        flex: 1;
        background-color: $color-reset-button;
        color: $color-auxiliary;
    }
    .multiple-select-footer .ok{
        flex: 1;
        background-color: #4182eb;
        color: #fff;
    }
}
.multiple-select.slider-enter-active {
    animation: fade-in .3s linear;
    .multiple-select-body,
    .multiple-select-footer {
        animation: slider-left-in .3s linear;
    }
}
.multiple-select.slider-leave-active {
    animation: fade-in .3s linear reverse;
    .multiple-select-body,
    .multiple-select-footer {
        animation: slider-left-in .3s linear reverse;
    }
}
</style>