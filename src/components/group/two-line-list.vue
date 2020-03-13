<template>
  <div class="single">
      
      <div class="img_box">
        <img :src="imgurl" class="product_img" />
      </div>

      <div class="ms">
        <span class="product_title">{{title}}</span>
        <div class="product_price">
          <div v-if="isMember">
            <div v-if="isequal">
               <span>￥{{stockList[0].memberPrice}}</span>
               <span style="text-decoration:line-through;font-size: 12px;color: #ccc;">￥{{stockList[0].salePrice}}</span>
            </div>
            <div v-else>
              <span>￥{{memberMin}}</span>
              <span style="text-decoration:line-through;font-size: 12px;color: #ccc;">￥{{normalMin}}</span>
            </div>
          </div>
          <div v-else>
             <div v-if="isequal">
              <span>￥{{stockList[0].salePrice}}</span>
              <span  style="font-size: 12px;color:#DAA520;">￥{{stockList[0].memberPrice}}</span>
            </div>
            <div v-else>
              <span>￥{{normalMin}}</span>
              <span style="font-size: 12px;color:#DAA520;">￥{{memberMin}}</span>
            </div>
          </div>
         <!--  <span class="word" v-else>已售23件</span> -->
        </div>
      </div>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    imgurl: {
      type: String,
      required: false,
      default: ''
    },
    cost: {
      type: Number,
      required: false,
      default: 0
    },
    cost1: {
      type: Number,
      required: false,
      default: 0
    },
    stockList:null,
    isMember:null
  },
  data () {
    return {
    normalMax:'',
    normalMin:'',
    memberMax:'',
    memberMin:'',
    normal:[],
    member:[],
    isequal:false
    }
  },
  created(){
    this.compare();
  },
  methods:{
       compareNormal(a){
    let min = a[0]; 
let max =a[0];
　　　　　　for(let i = 0; i < a.length; i++){
　　　　　　　　let cur = a[i];
　　　　　　　　cur > max ? max = cur : null;
　　　　　　　　cur < min ? min = cur : null;　　
　　　　　　}
 this.normalMax=max;
 this.normalMin=min;
     },
    compareMember(a){
let min = a[0]; 
let max =a[0];
　　　　　　for(let i = 0; i < a.length; i++){
　　　　　　　　let cur = a[i];
　　　　　　　　cur > max ? max = cur : null;
　　　　　　　　cur < min ? min = cur : null;　　
　　　　　　}
 this.memberMax=max;
 this.memberMin=min;
    },
    compare(){
      if(this.stockList.length>1){
         let normal=[];
         let member=[];
            this.stockList.forEach(val=>{ //价格区间
          this.normal.push(val.salePrice)
          this.member.push(val.memberPrice)
        })
         this.compareMember(this.member);
         this.compareNormal(this.normal)
          if(this.normalMax==this.normalMin){
            this.isequal=true;
          }
        }else{
           this.isequal=true;
        }
    }
  }
}
</script>
<style lang="scss" scoped>
.single {
 width:172px;
height:248px;
background:rgba(255,255,255,1);
border-radius:4px;
border:1px solid rgba(244,244,244,1);
margin-top:8px;
.img_box{
 width:172px;
height:172px;
border-radius:4px 4px 0px 0px;
display: flex;
justify-content: center;
align-items: center;
.product_img{
width: 100%;
height: 100%;
}
}
.ms{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height:76px;
  .product_title{
  color:rgba(51,51,51,1);
text-align: left;
font-size:13px;
    font-weight:400;
    line-height:18px;
  }
  .product_price{
    font-size: 16px;
    line-height: 17px;
  color:rgba(218,2,23,1);
  width: 80%;
  display: flex;
  justify-content: flex-start;
  .product_price>span{
    font-size: 12px;
  }
  .original_price{
     font-size: 12px;
color:rgba(153,153,153,1);
  }
  }
}
}
</style>
