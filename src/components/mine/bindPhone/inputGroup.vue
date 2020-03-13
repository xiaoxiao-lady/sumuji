<template>
  <div class="text_group">
    <!-- 组件结构 -->
    <!-- 组件容器 -->
    <div class="input_group" :class="{'is-invalid':error}">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input',$event.target.value)"
      >
      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')" class="codebtn">{{btnTitle}}</button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "inputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style scoped>

  input{
    border:none;
  }
.input_group {
  width: 100vw;
height:60px;
border-bottom: 1px solid #f1f1f1;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.input_group input {
  height: 100%;
  width: 53%;
  outline: none;
  background: none;
  margin-left: 5%;
  font-size:15px;
font-weight:400;
line-height:15px;
 text-align: left;
}
input::placeholder{
  color:rgba(153,153,153,1);

}
.input_group button {
border: none;
outline: none;
background: #fff;
width:90px;
height:30px;
border-radius:15px;
border:1px solid rgba(255,47,87,1);;
display: flex;
align-items: center;
justify-content: center;
font-size:12px;
font-weight:400;
color:rgba(255,42,83,1);
line-height:13px;
margin-right: 20px;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}

</style>
