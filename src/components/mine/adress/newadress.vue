<template>
  <div class="newadress">
    <tabGroup :title="$route.path=='/editAddress'?'编辑地址':'新增地址'"
              @rightTitle="finish()"
              :rightTitle="rightTitle"></tabGroup>
    <group>
      <x-input title="姓名" name="username" placeholder="请输入姓名"
               v-model="addressInfo.addressee" :show-clear=false></x-input>
      <x-input title="电话" name="" placeholder="输入收货人电话"
               v-model="addressInfo.addresseePhone" :show-clear=false></x-input >
      <x-address  :title="title1" :list="addressData" 
                     v-model="blockName"></x-address>
      <x-textarea @on-blur="onBlurEvent" :max="30" :placeholder="title3" v-model="addressInfo.address"></x-textarea>
      <x-switch title="设为默认地址" v-model="addressInfo.isDefault" ></x-switch>
    </group>
    <button class="deleteBtn" @click="deleteAddress()" v-if="$route.path=='/editAddress'">删除地址</button>


  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { XInput, Group, XAddress, XTextarea, XSwitch,Toast } from 'vux'
import {getAddressById, setDefaultAddress, deleteAddress, addAddress,
  modifyAddress, getCityList } from '@/api/address'
import city from './city.json'
export default {
  components: {
    tabGroup: tabGroup,
    XInput,
    Group,
    XAddress,
    XTextarea,
    XSwitch,
    Toast
  },
  data () {
    return {
      title: this.$route.query.id === '/editAddress' ? '编辑地址' : '新增地址',
      rightTitle: '完成',
      title1: '地区',
      title2: '街道',
      title3: '输入详细地址',
      addressData: [],
      showName:'请输入地址',
      addressId: this.$route.query.id,
      blockName:[],
      addressInfo: {
        addressee: '',//收货人名
        userId: '',
        addresseePhone: '',
        isDefault: '',
        address: ''
      }
    }
  },
  computed:{
// showName(){
//   if(this.blockName.length==0){
    
//    }else{
//      return this.blockName
//    }
 
// }
  },
  watch:{
    blockName:{
      handler(newval){
       this.showName=newval;
      },
     immediate: true
    }
  },
  methods: {
    onBlurEvent(){
       window.scroll(0,0);
       console.log('失去聚焦')
    },
    getAddressById () {
      getAddressById({addressId: this.addressId})
        .then(response => {
          console.log(response)
          if(response.data.isDefault==1){
             this.addressInfo.isDefault=true;
          }else{
            this.addressInfo.isDefault=false;
          }
          this.addressInfo.addressee = response.data.addressee
          this.addressInfo.userId = response.data.userId
          this.addressInfo.addresseePhone = response.data.addresseePhone
          this.addressInfo.address = response.data.address
          this.addressInfo.addressId = response.data.addressId
          this.blockName[0]=response.data.provinceCode
          this.blockName[1]=response.data.cityCode
          this.blockName[2]=response.data.provinceCode
        })
    },
    setDefaultAddress () {
      setDefaultAddress({addressId: this.addressId, userId:this.$store.getters.userInfo.userId})
        .then(response => {
          console.log(response)
        })
    },
    deleteAddress () {
      deleteAddress({addressId: this.addressId})
        .then(response => {
          console.log(response)
          if(response.code=200){
            this.$vux.toast.show({
              text:'删除成功'
            })
                this.$router.go(-1)
          }

        })
    },
    finish () {
       
       let data={
          addressee: this.addressInfo.addressee,
          userId: this.addressInfo.userId,
          addresseePhone: this.addressInfo.addresseePhone,
          provinceCode:this.blockName[0],
          cityCode:this.blockName[1],
          districtCode:this.blockName[2],
          address: this.addressInfo.address 
        }
        console.log(data)
        if(this.addressInfo.isDefault){
          data.isDefault=1;//1 是默认地址 2不是
        }else{
          data.isDefault=2;
        }

      if (this.addressId) {
        modifyAddress(this.addressInfo.addressId,data).then(response => {
          console.log(response)
          if(response.code==200){
            this.$vux.toast.show({
              text:'修改成功'
            })
                this.$router.go(-1)
          }

        })
      } else {
        data.userId=this.$store.getters.userInfo.userId;
        addAddress(data).then(response => {
          console.log(response)
            if(response.code==200){
            this.$vux.toast.show({
              text:'添加成功'
            })
              this.$router.go(-1)
          }

        })
      }
    },
  
   

  },
  mounted () {
    //this.getcitylist()
    this.addressData=city
    console.log(city)
    if (this.addressId) {
      this.getAddressById()
    }
  }
}
</script>

<style lang="scss" >

  .deleteBtn{
    width: 80%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background: linear-gradient(to right,#FF214C,#FF4F71);
    color:#FFFFFF;
    border: none;
    margin: 3rem 10%;
    border-radius:1rem;
  }
</style>
