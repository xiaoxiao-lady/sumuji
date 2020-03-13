<template>
  <div class="pintuan">
    <tabGroup :title="title" ></tabGroup>
    <div class="dapai">
      <div>
        <span>大牌拼团</span>
        <span class="fr">
          距离结束
          <font color="#FF2B54">12:00</font>
        </span>
      </div>
      <div class="body" v-for="(item,key) in list" :key="key">
        <img :src='item.productIcon' style="width:6.5rem; height:6.5rem; margin-right:0.43rem;" class="fl" />
        <div>
          <p>{{item.productName}}</p>
          <p style="color:#999999; font-size:0.75rem;">{{item.description}}</p>
          <p class="fx">
            拼团价 ¥{{item.originalPrice}}
            <span
              style="color:#999999; font-size:0.75rem; text-decoration:line-through"
            >¥{{item.currentPrice}}</span>
          </p>
           <button @click="pintuangoods(key)">去拼团</button>
        </div>
        <div class="clear"></div>
      </div>
      <div style="margin-bottom:5rem;"></div>
    </div>
  </div>
</template>
<script>
import {} from 'vux'
import tabGroup from '@/components/group/tab'
export default {
  data () {
    return {
      cost: 3,
      title: '拼团商城',
      list: []
    }
  },
  components: {
    tabGroup: tabGroup
  },
  mounted () {
    this.pintuanlist();
  },
  methods: {
    getback () {
      history.go(-1)
    },
    pintuangoods (key) {
      this.$router.push({path: './pindetial', query: {id: this.list[key].productId}})
    },
    pintuanlist () {
      this.$http.get('sumuji-server/groupon/getGrouponList', {params: {pageNum: 1, pageSize: 3}}).then(res => {
        console.log(res)
        this.list = res.data.data
      }

   )
    }
  }
}
</script>
<style lang="scss" scoped>
.pintuan {
  .dapai {
    padding: 0.625rem;
    margin: 0.625rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .body {
      margin-top: 0.75rem;
      .fx {
        margin-top:2.5rem;
        color: #ff4f71;
        font-size: 0.75rem;
      }
      button {
        float: right;
        width: 4.5rem;
        height: 1.875rem;
        background-image: linear-gradient(to right, #ff214c, #ff4f71);
        border-radius: 1.125rem;
        border: none;
        box-shadow: 0px 0.125rem 0.25rem 0px rgba(255, 175, 189, 1);
        color: #ffffff;
        margin-top: -2rem;
      }
    }
    .clear {
      border: 0.0625rem solid #f4f4f4;
      margin-top: 1rem;
    }
  }
}
</style>
