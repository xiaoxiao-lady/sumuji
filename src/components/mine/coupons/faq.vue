<template>
  <div class="faq">
    <tabGroup :title="title"></tabGroup>
   <group v-for="(item,key) in questionList" :key="key">
      <cell
      :title="item.questionName"
      is-link
      :arrow-direction="iconuodown===key ? 'up' : 'down'"
      @click.native="updowm(key)"></cell>
      <p class="slide" v-if="showContent===key">{{item.answers}}</p>
   </group>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group, Cell, CellBox } from 'vux'
import { getQuestionList } from '@/api/question'

export default {
  components: {
    tabGroup: tabGroup,
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      title: '常见问题',
      showContent: '',
      iconuodown: '',
      questionList: []
    }
  },
  props: {},
  computed: {},
  mounted () {
    this.getQuestionList()
  },
  methods: {
    getQuestionList () {

        getQuestionList({pageNum: 1, pageSize: 10}).then(response=>{

          this.questionList = response.data;

            // this.$message({
            //   type: 'success',
            //   message: '获取问题列表成功!'
            // });
          });
    },
    updowm (a) {
      if (this.iconuodown !== a) {
        this.iconuodown = a
        this.showContent = a
      } else {
        this.iconuodown = ''
        this.showContent = ''
      }
    }
  }
}
</script>

<style lang="scss" >
.faq {
.slide{
    padding: 0.75rem;
font-size:0.875rem;
color:rgba(153,153,153,1);
line-height:1.56rem;
  }
  .weui-cells{
    margin-top: 0rem;
  }
}
</style>
