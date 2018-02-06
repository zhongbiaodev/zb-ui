<template>
    <transition name="open-filter" :duration="animate ? 500 : 0">
        <div
            class="multiple-select animated"
            v-show="show"
            @click="onClose"
            ref="RegisteredCapitalInstance">
            <div class="multiple-select-body" @click="$event.stopPropagation()">
                <div @click="clear()"
                    v-if="noLimit"
                    class="multiple-select-item"
                    :class="{selected: $lodash.size(result) === 0}">不限</div><div
                    @click="select(item)"
                    class="multiple-select-item"
                    :class="{selected: item.selected}"
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
// import * as dicts from '../../constant/dict.js'
export default {
    name: 'MultipleSelect',
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
         * 是否展示不限按钮
         *     默认展示
         */
        noLimit: {
            type: Boolean,
            default () {
                return true
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
         */
        animate: {
            type: Boolean,
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
        result (vm) {
            let r = vm.items.filter(item => item.selected).map(item => item.value)
            return r
        },
        selectedAll (vm) {
            return vm.result.length === vm.items.length
        }
    },
    methods: {
        clear () {
            this.items.forEach(item => {
                item.selected = false
            })
        },
        selectAll () {
            this.items.forEach(item => {
                item.selected = true
            })
        },
        select (item) {
            // if (this.selectedAll) this.clear()
            item.selected = !item.selected
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
            console.log()

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

<style>
.multiple-select {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0,0,0,.5);
}
.multiple-select .multiple-select-body {
    background-color: #fff;
    /*height: 100%;*/
    padding: 30px 15px 20px;
    box-sizing: border-box;
    overflow-x: hidden;
}
.multiple-select .multiple-select-item {
    background-color: #eff2f7;
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
.multiple-select .multiple-select-item.selected {
    background-color: #4182eb;
    color: #fff;
}
.multiple-select-footer {
    /*position: absolute;
    left: 0;
    right: 0;
    bottom: 0;*/
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
.multiple-select-footer .reset{
    flex: 1;
    background-color: #eff1f4;
    color: #576b95;
}
.multiple-select-footer .ok{
    flex: 1;
    background-color: #4182eb;
    color: #fff;
}
/**
 * 动画
 */
/*初始状态*/
.open-filter-enter-active, .open-filter-leave-active,
.open-filter-enter-active .multiple-select-body, .open-filter-leave-active .multiple-select-body {
    transition: all .5s;
}
/* .open-filter-leave-active in below version 2.1.8 */
.open-filter-enter, .open-filter-leave-to {
    opacity: 0
}
.open-filter-leave, .open-filter-enter-to {
    opacity: 1
}
/*关闭状态*/
.open-filter-enter .multiple-select-body, .open-filter-leave-to .multiple-select-body {
    transform: translateX(100%);
}
/*打开状态*/
.open-filter-leave .multiple-select-body, .open-filter-enter-to .multiple-select-body {
    transform: translateX(0);
}
</style>