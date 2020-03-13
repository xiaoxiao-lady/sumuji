<template>
  <div class="shopMessage">
    <group class="group1">
      <cell title="店铺头像" is-link>
        <label for="img_input">
          <span>修改头像</span>
        </label>
          <input v-show='false'
          type="file"
          id="img_input"
          @change="tirggerIconFile($event)"
          multiple
          ng-submit
          accept="aplication/zip, aplication/rar"
        />
      </cell>
      <x-switch title="修改店铺名称"  is-link v-model="show"  ></x-switch>
    </group>

    <group class="group2">
      <x-switch title="自动补货" v-model="stringValue"></x-switch>
    </group>

    <div v-transfer-dom>
      <confirm v-model="show" show-input :title="popup_title" :placeholder="shop_title" @on-confirm="onConfirm" ref="changeName">
      </confirm> 
    </div>
    <toast v-model='show_toast'>{{changeNamesuccess}}</toast>
  </div>
</template>

<script>
import { Cell, Group, XSwitch, Confirm,TransferDom, Toast } from 'vux'
import tabGroup from '@/components/group/tab'
import {mapMutations} from 'vuex'
import {modifyMerchant} from '@/api/merchant'
export default {
  components: {
    Cell,
    Group,
    tabGroup: tabGroup,
    XSwitch,
    Confirm,
    Toast
  },
  data () {
    return {
      stringValue: true,
      popup_title:'修改店铺名',
      shop_title:'我的小屋',
      original_img:'',
      show:false,
      changeNamesuccess:'修改成功',
      show_toast:false,
      iconFile:'',
      img_url:null,
      merchant:{}
    }
  },
  props: {
    shopTitle:String
  },

  mounted(){

  },
  computed: {},
  methods: {
    onConfirm(value){
       this.$refs.changeName.setInputValue(this.shop_title);
        let updateUserInfo=this.$store.getters.userInfo;
            updateUserInfo.merchant.merchantName=value;
       this.$store.commit("setUserInfo",updateUserInfo);
       this.submitMerchantInfo(value);
       this.show_toast=true;
    },
    tirggerIconFile(event) {
      this.iconFile = event.target.files[0];
      if (window.createObjectURL!=undefined) { // basic
           this.img_url = window.createObjectURL(this.iconFile) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
           this.img_url = window.URL.createObjectURL(this.iconFile) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            this.img_url = window.webkitURL.createObjectURL(this.iconFile) ;
        }
       let updateUserInfo=this.$store.getters.userInfo;
            updateUserInfo.merchant.merchantIcon=this.img_url;
       this.$store.commit("setUserInfo",updateUserInfo);
       this.submitMerchantInfo();
    },
  submitMerchantInfo(value){
      if(value){
        let data={
          userId:380,
          merchantName:value
        }
         modifyMerchant(data).then(res=>{
         window.alert(res.data);
     })
      }else{
        let data={
          userId:380,
          merchantIcon:this.img_url
        }
         modifyMerchant(data).then(res=>{
          console.log(res.data)
     })
      }
      
    
    },
  },
   directives: {
    TransferDom
  }
}
</script>

<style lang="scss" >
.shopMessage {
  .group1 {
    .weui-cells {
      margin: 0rem;
      /deep/  input{
  background: none;
  border: none;
}
    }
  }
}

.bannerFile{
  background: none;
  border: none;
}
</style>