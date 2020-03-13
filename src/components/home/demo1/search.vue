<template>
    <div class="search"> 
    <img :src="ab()" class="search_img" v-show="show_search_img"  >
    <input type="text"  :placeholder="placeholder" class="search-input" :value="value" @input="$emit('input',$event.target.value)"  @click="change_searchImg()"  >
    </div>  
</template>

<script>

export default {
  components: {
  
  },
  data () {
    return {
       show_search_img:true
    }
  },
  created(){
 this.show_search_img=true;
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
  value:{
      type: String,
      required: false,
      default: ''
    },
    // show_search_img:Boolean
  },
  directives:{//设置一个指令 当focus时 改变show_search_img 的值
    'whenFocus'(el,binding,vnode){
      let currentInput=el.querySelector('input');
      currentInput.onfocus=function(){
       console.log(binding.value)
         binding.value=' ';
       console.log(this.show_search_img)
       // console.log(show_search_img)
       // let curretImg=el.querySelector('img');
       // curretImg.parentNode.removeChild(curretImg);

      }
    }

  },
  methods: {
    ab () {
      return require('@/assets/qita/search.png')
    },
    change_searchImg(){
     this.show_search_img=false;
    }

  }
}
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder {
padding-left: 3.5rem;
}
.search{
width:82.4%;
height:28px;
display: flex;
position: relative;
justify-content: flex-start;
align-items: center;
z-index:1;
border-radius:14px;
 }
 .search_img{
  position: absolute;
  left: 28px;
 }
 input{
  border: none;
 }
 .search-input{
 position: absolute;
 width:100%;
height:28px;
  
  border-radius:14px;
    opacity:0.2896;
 }
 input:focus{
  border: none;
  border-radius: 14px;
    border-color: #9ecaed;
    box-shadow: 0 0 5px #9ecaed;
}
input[placeholder]{
  font-size: 24rpx;
  color: #000;
  text-align: left;
}



</style>
