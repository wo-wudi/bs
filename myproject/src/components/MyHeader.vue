<template>
  <div class="header bg-light position-sticky">
    <div class="row no-gutters">
      <div class="col-3">
        <div><a class="text-dark font-weight-bold ml-4" href="index.html">欢迎来到校园交易商城</a></div>
      </div>
      <div class="col-4"></div>
      <div class="col-5 d-flex justify-content-around">
        <div><router-link to="/index" class="text-dark font-weight-bold">首页</router-link></div>
        <div><router-link to="/discuss" class="text-dark font-weight-bold">用户评论</router-link></div>
        <div><router-link to="/list" class="text-dark font-weight-bold">商品列表</router-link></div>
        <div class="pt-2">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link text-dark font-weight-bold">{{this.$store.state.user.uname}}&nbsp;欢迎您！</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="quit">注销</span></el-dropdown-item>
              <el-dropdown-item><span @click="infor">个人信息</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    window.addEventListener('scroll',this.scrollChange)
  },
  destroyed(){
    window.removeEventListener('scroll',this.scrollChange)
  },
  methods:{
    scrollChange(){
      let tou = document.querySelector('.header');            
      if(window.scrollY>0){
        tou.classList.add("bian");
      }
      else{
        tou.classList.remove("bian");
      }
    },
    quit(){
      this.$confirm('是否注销', '注销', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/log')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    infor(){
      this.$router.push('/infor')
    }
  }
}
</script>
<style scoped>
.bian{
	background-color: rgba(222, 222, 222, .8) !important;
}
.header{
	height: 40px;
	top: 0px;
  z-index: 10;
}
.header a{
	line-height: 40px;
}
a:hover{
	text-decoration: none;
}
.header a:hover{
	color: #999 !important;
}
.row .col-5 .pt-2{
  cursor: pointer;
}
.row .col-5 .pt-2:hover span{
	color: #999 !important;
}
</style>