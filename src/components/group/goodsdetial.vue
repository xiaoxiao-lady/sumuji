<template>
  <div class="detial">
    <div class="img">
      <img :src="icon" />
    </div>
    <div class="info">
      <div class="info-title">{{title}}</div>
      <div class="info-price">
        ¥{{cost}}
        <span
          style="color:#999999; font-size:0.75rem; text-decoration:line-through"
        >¥{{cost1}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      // list: [
      //   { name: '1', img: '', cost: '1', count: 1 },
      //   { name: '1', img: '', cost: '2', count: 2 },
      //   { name: '2', img: '', cost: '3', count: 3 }
      // ]
    }
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    describe: {
      type: String,
      required: false,
      default: ''
    },
    cost: {
      type: String,
      required: false,
      default: ''
    },
    cost1: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.detial {
  height: 8.4rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img {
  width:104px;
height:104px;
background:rgba(247,247,247,1);
margin-left: 12px;
img{
  width:104px;
height:104px;
}
  }
  .info{
    height: 104px;
    width:268px;
    margin-left: 9px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    .info-price{
font-size:17px;
font-weight:400;
color:rgba(255,43,84,1);
line-height:17px;
    }
  }

}
</style>