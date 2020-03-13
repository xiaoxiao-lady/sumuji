<template>
  <div class="setsuccess">
    <tabGroup :title="title" ></tabGroup>
    <div  class="b">
      <img src="./img/编组.png" />
      <p>密码重置成功</p>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
export default {
  components: {
    tabGroup: tabGroup
  },
  data () {
    return {
      title: '重置成功'
    }
  },
  props: {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.setsuccess{
  background: #ffffff;
  height: 100vh;
  .b {
  text-align: center;
  color: #d2d2d2;
  padding-top: 4rem;
  background-color: #ffffff;
}
}

</style>