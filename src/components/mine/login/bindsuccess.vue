<template>
  <div class="bindsuccess">
    <tabGroup :title="title"></tabGroup>
    <big-anniu :title="anniu"></big-anniu>
    <div class="b">
       <img src="../img/绑定成功.png" >
       <p>
        登录成功！
       </p>

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
      title: '绑定成功'

    }
  },
  props: {},
  computed: {},
  methods: {

  }
}
</script>

<style lang="scss" >
.bindsuccess{
  background: #FFFFFF;
  height: 100vh;
  .b{
    text-align: center;
    color: #D2D2D2;
    padding-top:4rem;
  }
}
</style>