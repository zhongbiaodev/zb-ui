<template>
  <div id="app">
    <button @click="show1 = !show1">多选控件-动画-侧滑</button>
    <button @click="show2 = !show2">多选控件无动画</button>
    <multiple-select
      @on-close="show1 = !show1"
      :animate="true"
      :show="show1"></multiple-select>
    <multiple-select
      @on-close="show2 = !show2"
      :animate="false"
      :show="show2"></multiple-select>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show1: false,
      show2: false
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
