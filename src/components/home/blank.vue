<template>
	<div></div>
</template>
<script>
	export default{
		data(){
			let userInfo=this.$store.getters.userInfo;
			userInfo.level++
			this.$store.dispatch('ActionSetUserInfo',userInfo)
			this.$router.replace({
				path:'/home',
				name:'home'
			})
			return {

			}
		}
	}
</script>
<style type="text/css"></style>