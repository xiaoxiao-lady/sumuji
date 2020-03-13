<template>
  <button class="button">
    {{title}}
  </button>
</template>
 
 <script>
 export default {
   props: {
     title: {
       type: String,
       required: false,
       default: ''

     }
   }
 
 }
 </script>
 <style lang="scss" scoped>
 .button{
   width: 5.56rem;
   height: 1.875rem;
   line-height: 1.875rem;
   text-align: center;
   background: linear-gradient(to right,#FF214C,#FF4F71);
   color:#FFFFFF;
   border: none;
   border-radius:1rem;
    }
 
 </style>
 