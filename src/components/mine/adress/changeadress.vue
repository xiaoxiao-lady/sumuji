<template>
  <div class="">
   <tabGroup :title="title" :rightTitle="rightTitle" @toother="finish()"></tabGroup>
  <group>
  <x-input title="姓名" v-model="value1"></x-input>
  <x-input title="电话" v-model="value1"></x-input>
   <x-address title="地区" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
   <x-address title="地区" v-model="addressValue" raw-value :list="addressData1" value-text-align="left" label-align="justify"></x-address>
    <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3" ></x-textarea>
  </group>
  <group>
       <x-switch title="设为默认地址" v-model="stringValue"></x-switch>
  </group>
  </div>
</template>

<script>
import tabGroup from '@/components/group/tab'
import { Group, XInput, XAddress, XTextarea, XSwitch } from 'vux'

export default {
  components: {
    tabGroup: tabGroup,
    Group,
    XInput,
    XAddress,
    XTextarea,
    XSwitch

  },
  data () {
    return {
      title: '修改地址',
      rightTitle: '完成',
      value1: '小屋的小屋',
      addressValue: ['广东省', '深圳市', '南山区'],
      addressData: {},
      addressData1: {},
      stringValue: true,
      id: this.$route.query.id,
      addressForm: {}

    }
  },
  methods: {
    finish () {
      console.log(this.list)
    }

  },
  mounted () {
    this.$http.get('sumuji-server/city/getCityList', {params: {addressId: this.id}}).then(res => {
      this.addressForm = res.data.data// 你要的详情
    })
  }
}
</script>

<style lang="scss" >
