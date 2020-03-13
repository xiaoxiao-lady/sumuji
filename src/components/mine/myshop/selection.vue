<template>
  <div class="selection">
     <tabGroup :title="title" ></tabGroup>
    <div > 
    <detial-list
      v-for="(item,key) in list1"
      :key="key"
      :title="item.name"
      :imgurl="item.img"
      :cost="item.cost"
      :check="item.check"
      @checkChange="a=>{item.check=a}"
      :attribute="item.attribute"
      :icon-show="a"
    >
    </detial-list>
    
    <div class="div3" >
      <check-icon :value.sync="allcheck" class="icon" @click.native="quanxuan"></check-icon>
      <span>全选</span>
      <div class="fr">
        <an-niu :title="b" @click.native="detele()"></an-niu>
      </div>
    </div>

    </div>
   
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import detialList from '@/components/cart/detiallist'
import { CheckIcon, Confirm } from 'vux'
import anNiu from '@/components/group/anniu'

export default {
  components: {
    detialList: detialList,
    tabGroup: tabGroup,
    CheckIcon,
    anNiu: anNiu,
    Confirm
  },
  data () {
    return {
      list1: [
        { name: '1', img: '', cost: 1, check: false, attribute: 'ok' },
        { name: '1', img: '', cost: 2, check: false, attribute: 'ok' }
      ],
      title: '选货',
      allcheck: false,
      a: true,
      tishi: '是否删除该收藏？',
      b: '去支付 '
    }
  },
  props: {},
  computed: {},
  methods: {
    quanxuan () {
      if (this.allcheck === true) {
        for (let a = 0; a < this.list1.length; a++) {
          this.list1[a].check = true
        }
      } else {
        for (let a = 0; a < this.list1.length; a++) {
          this.list1[a].check = false
        }
      }
    },
    detele () {
      this.show = true
    }

  }
}
</script>

<style lang="scss" >
.selection {
  background: #f8f8f8;
  height: 100vh;
  .div3 {
    line-height: 4rem;
    height: 4rem;
    position: fixed;
    bottom: 0rem;
    width: 100%;
    background: #ffffff;
    .fr {
      float: right;
      margin-right: 1rem;
    }
  }
  .b {
  text-align: center;
  color: #d2d2d2;
  padding-top: 4rem;
}
}
</style>