<template>
  <div id="app">
    <zb-loadmore ref="loadmore" :top-method="refresh" :bottom-method="more">
      <div>
      <zb-button @click="show1 = !show1" :disabled="true">多选控件-动画-侧滑</zb-button>
      <zb-button class="mt10" @click="show1 = !show1">多选控件-动画-侧滑</zb-button>
      <zb-button class="mt10" @click="show2 = !show2">多选控件-无动画</zb-button>
      <zb-button class="mt10" @click="show3 = !show3">多选控件-功能按钮-不限</zb-button>
      <zb-button class="mt10" @click="show4 = !show4">多选控件-功能按钮-全部</zb-button>
      <div class="mt20 text-center f25">多选控件-内嵌模式</div>
      <div class="box">
        <zb-multiple-select
          :inner="true"
          mode="list"
          v-model="model1"
          :show="true"></zb-multiple-select>
          <div class="box">{{model1}}</div>
      </div>
      <zb-button class="mt10" @click="show5 = !show5">多选控件-无动画</zb-button>
      <zb-button class="mt10" v-for="i in n" :key="i">充数的{{i}}</zb-button>
      
      <zb-multiple-select
        @on-close="show1 = !show1"
        :animate="true"
        :show="show1"></zb-multiple-select>
      <zb-multiple-select
        @on-close="show2 = !show2"
        :animate="false"
        :show="show2"></zb-multiple-select>
      <zb-multiple-select
        @on-close="show3 = !show3"
        :animate="true"
        :action-button="['reset', '自定义不限文字']"
        :show="show3"></zb-multiple-select>
      <zb-multiple-select
        @on-close="show4 = !show4"
        :animate="true"
        :action-button="['all', '全部-全选-全国']"
        :show="show4"></zb-multiple-select>
      <zb-multiple-select
        @on-close="show5 = !show5"
        :animate="true"
        :show="show5"></zb-multiple-select>
      </div>
    </zb-loadmore>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    let obj = {n: 15}
    for (let i = 1; i <= 10; i++) {
      obj['show' + i] = false
      obj['model' + i] = []
    }
    return obj
  },
  methods: {
    refresh () {
      console.log('刷新')
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 2000);
    },
    more () {
      console.log('下一页')
      setTimeout(() => {
        this.n += 5
        this.$refs.loadmore.onBottomLoaded()
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 15px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.box { border: 1px solid #ccc;padding: 15px; }
</style>
