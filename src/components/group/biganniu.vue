<template>
  <button class="bigbutton">
    <img :src="icon">
   <p> {{title}}</p>
  </button>
</template>
 <script>
 export default {
   props: {
     title: {
       type: String,
       required: false,
       default: ''
     },
     icon: {
       type: String,
       required: false,
       default: ''
     }
   }
 }
 </script>
 <style lang="scss" scoped>
 .bigbutton{
   margin-top: 1rem;
    width: calc(100% - 3.5rem);
    height: 3.125rem;
    background: linear-gradient(
      225deg,
      rgba(255, 33, 76, 1) 0%,
      rgba(255, 79, 113, 1) 100%
    );
     display: flex;
     justify-content:center;
     align-items: center;
    img{
      margin-right: 9px;
    } 
    border-radius: 2.2rem;
    border: none;
    color: #ffffff;
    font-size: 1rem;
  
 }
 
 
 </style>
