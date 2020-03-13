<template>
  <div class="myAdress">
    <tabGroup :title="title"></tabGroup>
    <div v-if="adress">
      <div
        class="address1"
        v-for="(item,key) in adresslist"
        :key="key"
      >
        <div>
          <div class="ad" @click="selectAddress(item)">
            <div>{{item.addressee}}&nbsp;&nbsp;{{item.addresseePhone}}</div>
            <div style="display: block;word-break: break-all">
              <span class="moren" v-if="item.isDefault==1">默认</span>
              <span style="color:#666666; font-size:0.8rem;">{{item.address}}</span>
            </div>
          </div>
          <div @click="tochangeadress(item)" class="bianji">编辑</div>
        </div>
      </div>
    </div>
    <div v-else class="wu">
      <img src="./无地址.png" />
      <p>您还没添加收货地址…</p>
    </div>
    <div class="bc">
      <button class="button" @click="newchange()">新增收货地址</button>
    </div>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group,Toast} from 'vux'
import {getAddressList } from '@/api/address'

export default {
  components: {
    tabGroup: tabGroup,
    Group,
    Toast
  },
  data () {
    return {
      title: '收货地址',
      adress: true,
      adresslist: [],
      skipRouter: ''
    }
  },
  props: {},
  computed: {},
  mounted () {
    this.getaddress()
  },
  methods: {
    newchange () {
      this.$router.push('./newAddress')
    },
    tochangeadress (item) {
    
      this.$router.push({
        path: './editAddress',
        query: { id: item.addressId }
      })
    },
    getaddress () {

      getAddressList({
         userId:this.$store.getters.userInfo.userId,//this.$store.getters.userInfo.userId,
         pageNum: 1, pageSize: 100
      }).then(response => {
         
        console.log(response)
        this.adresslist = response.data
        // this.$message({
        //   type: 'success',
        //   message: response.message
        // })
      })
      
    },
    selectAddress (item) {
      if (this.skipRouter !== 'HelloWorld') {
        this.$store.commit('setSelectedAddress', item);
        this.$vux.toast.show({
          text:'切换成功'
        })
        this.$router.go(-1)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {          //  这里的vm指的就是vue实例，可以用来当做this使用
      vm.skipRouter = from.name
    })
  }
}
</script>

<style lang="scss" >
.myAdress {
  height: 100vh;
  background-color: #ffffff;
  .address1 {
    position: relative;
    background: #ffffff;
    padding-right: 0.85rem;
    padding-left: 0.85rem;
    height: 4.68rem;
    border-bottom: 0.0625rem solid #e6e6e6;
    .ad {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 80vw;
    }
    .bianji {
      float: right;
      line-height: 4.68rem;
    }
    .moren {
      width: 2rem;
      height: 1.25rem;
      background: rgba(255, 46, 87, 1);
      border-radius: 0.125rem;
      color: #ffffff;
      line-height: 1.25rem;
      padding: 0.25rem;
      font-size: 0.75rem;
    }
    .fl {
      float: left;
      padding: 0.85rem;
    }
    .fr {
      float: right;
    }
    .bianji1 {
      float: right;
      line-height: 4.68rem;
      text-align: center;
      position: absolute;
      right: 0rem;
    }
    .blue {
      float: left;
      width: 5.2rem;
      background: #1987ff;
      color: #ffffff;
      height: 4.7rem;
      line-height: 4.7rem;
    }
    .red {
      float: right;
      width: 5.2rem;
      color: #ffffff;
      height: 4.7rem;
      background: #ff8721;
      line-height: 4.7rem;
    }
  }
  .active {
    margin-left: -5rem;
    padding: 0rem;
  }
  .bc {
    background: #ffffff;
    width: 100vw;
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    .button {
      width: 90%;
      height: 3.125rem;
      background: linear-gradient(
        225deg,
        rgba(255, 33, 76, 1) 0%,
        rgba(255, 79, 113, 1) 100%
      );
      box-shadow: 0px 0.25rem 0.5rem 0px rgba(255, 175, 189, 1);
      border-radius: 2.2rem;
      border: none;
      color: #ffffff;
      font-size: 1rem;
    }
  }

  .wu {
    text-align: center;
    color: #d2d2d2;
    padding-top: 4rem;
  }
}
</style>
