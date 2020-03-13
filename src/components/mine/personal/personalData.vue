<template>
  <div class="personalData">
    <tabGroup :title="title"></tabGroup>
     <group class="group1">
       <cell title="头像"  >
        <label for="img_input">
       <img :src="userInfo.userIcon" class="UerIcon_img" />
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
        <cell title="昵称" :value="userInfo.nickName" is-link @click.native="updateName()">
          
        </cell>
         <cell title="性别" value="女" is-link @click.native="updateGender">
           
         </cell>
     </group>
     <group class="group2">
       <cell title="更换手机号"  is-link ></cell>
        <cell title="修改密码"   :link='{path:"/changepassword"}'></cell>  
     </group>
      <!-- <group class="group2">
       <cell title="社区账号绑定"  is-link></cell>
        <cell title="感兴趣类别"  is-link>
          <span class="lb">口红</span>
          <span class="lb">腮红</span>
        </cell>  
     </group>    -->
     <div>
    
     </div>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'
import tabGroup from '@/components/group/tab'
import {modifyUser} from '@/api/user'
export default {
  components: {
    Cell,
    Group,
    tabGroup: tabGroup

  },
  data () {
    return {
      hello: '11',
      title: '个人信息',
      userInfo:{},
    }
  },
  props: {},
  created() {
  this.userInfo=this.$store.getters.userInfo;
  console.log(this.$store.state.userInfo.userInfo.userIcon);
  },
  methods: {
    getback () {
      this.$router.push({path: '/', query: {index: this.$route.query.from}})
    },
    tirggerIconFile(event) {//修改图片
    let iconFile = event.target.files[0];
      if (window.createObjectURL!=undefined) { // basic
           this.img_url = window.createObjectURL(iconFile) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
           this.img_url = window.URL.createObjectURL(iconFile) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            this.img_url = window.webkitURL.createObjectURL(iconFile) ;
        }
       console.log(this.img_url);
       let updateUserInfo=this.$store.state.userInfo.userInfo;
            updateUserInfo.userIcon=this.img_url;
       this.$store.commit("setUserInfo",updateUserInfo);
    },
    updateName(){
        let _this=this;
        let updateUserInfo=this.$store.state.userInfo.userInfo;
      this.$vux.confirm.show({
        title:'请输入新名字',
        showInput:true,
        onConfirm(value){
            updateUserInfo.nickName=value;
             _this.$store.commit("setUserInfo",updateUserInfo);
             let data={
              userId:updateUserInfo.userId,
              nickName:value
             }
             console.log(data)
            modifyUser(data).then(res=>{console.log(res.data)})
       },
      });
      // let data={
      //         userId:updateUserInfo.userId,
      //         nickName:this.$store.state.userInfo.userInfo.nickName
      //        }
      //        console.log(data)
      // modifyUser(data).then(res=>{console.log(res.data)})
    },
    updateGender(){
      
    }
  }
}
</script>

<style lang="scss" >
.personalData{
.group1{
.weui-cells{
  margin: 0rem;
}
}
.UerIcon_img{
  width: 90px;
  height: 90px;
}
.lb{
  color: #FF718D;
  background: #FFEFF2;
  width: 3rem;
  font-size:0.82rem;
  line-height: 1.625rem;
  padding:0.3rem 0.69rem;
  border-radius: 0.25rem;
}


}

</style>