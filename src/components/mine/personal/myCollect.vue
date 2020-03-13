<template>
  <div class="mycollect">
     <tabGroup :title="title" :rightTitle="showTxt" @rightTitle="Tomanage()"></tabGroup>
    <div v-if="c">
    <detial-list
      v-for="(item,key) in myCollectList"
      :key="key"
      :title="item.productName"
      :imgurl="item.productIcon"
      :cost="item.salePrice"
      :check="item.check"
      :allSelect="allSelect"
      @checkChange="e=>{clickItem(item,e)}"
      :attribute="item.attribute"
      :icon-show="managerStatus"
      :managerStatus="managerStatus"
    >
    <!--  :check="item.check" 将选择状态传给子组件，绑到check-icon上 -->
    <!-- checkChange="e=>{clickItem(item,e)}" 接收子组件传来的选择状态 将选择状态记录并操作 -->
     <!-- :check="item.check" 全选改变了item.check的值 但是这里不会响应更新并传值给子组件 -->
    </detial-list>

    <div class="div3" v-show="managerStatus">
      <check-icon :value.sync="allcheck"
                  class="icon"
                  id="allcheck"
                  @click.native="quanxuan">
      </check-icon>
      <label for="allcheck">全选</label>
      <div class="fr">
        <an-niu :title="b" @click.native="toDetele()"></an-niu>
      </div>
    </div>

    </div>

     <div v-else class="b">
      <img src="./收藏.png" />
      <p>暂时没有收藏…</p>
    </div>
      <confirm v-model="show"
      :title="tishi"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      </confirm>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import detialList from '@/components/cart/detial'
import { CheckIcon, Confirm } from 'vux'
import anNiu from '@/components/group/anniu'
import {getMyCollectList, batchDeleteMyCollect} from '@/api/collect'

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
      checkList: [],
      title: '我的收藏',
      showTxt: '管理',
      managerStatus: false,
      b: '删除',
      c: true,
      allcheck: false,
      show: false,
      tishi: '是否删除该收藏？',
      myCollectList: [],
      allSelect:false
    }
  },
  props: {},
  computed: {},
  mounted () {
    this.getCollectList()
  },
  methods: {
    Tomanage () {
      if (this.managerStatus === true) {
        this.showTxt = '管理';
           this.myCollectList.forEach(item => {
          item.check = false;
        });
           this.checkList=[];
      } else {
        this.showTxt = '完成';
        //完成的时候将所有选中变成未选
     
      }
      this.managerStatus = !this.managerStatus
    },
    quanxuan () {
      console.log(this.allcheck)
      if (this.allcheck) {
         this.allSelect=true;
      } else {
        this.allSelect=false;
      }
    },
    clickItem (item, id) {
      item.check = id;
      this.updateCkeckStatus(item)
    },
    updateCkeckStatus (item) {
      //操作从子组件传来的选择状态
      if (item.check) {
        this.checkList.push(item.collectId)
        
      } else {
        this.checkList.splice(this.checkList.indexOf(item.collectId), 1)
        
      }
      this.allcheck = this.myCollectList.filter(item => {
        return !item.check
      }).length === 0;
    },
    detele () {
      let data={
        userId:this.$store.getters.userInfo.userId,
        ids: this.checkList.toString()
      };
      console.log(data)
      batchDeleteMyCollect(data).then(response => {
        this.checkList.forEach(item => {
          this.myCollectList = this.myCollectList.filter(item1 => {
            return item1.collectId !== item
          })
        });
        this.checkList = [];
      });
    },
    toDetele(){
     this.show=true;
    },
    onCancel () {
      this.show = false
    },
    onConfirm () {
      this.detele ();
    },
    getCollectList () {
      let data={
        userId:this.$store.getters.userInfo.userId,
        pageNum:1,
        pageSize:10,
        collectType:1
      };
      getMyCollectList(data).then(response => {
        console.log(response)
        this.myCollectList = response.data;
        this.myCollectList.forEach(item => {
          item.check = false;
        });
      });
    }

  }
}
</script>

<style lang="scss" >
.mycollect {
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
