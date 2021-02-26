<template>
  <div class="main">
    <div class="main_font">
      <h1>欢迎来到校园限制商品交易商城</h1>
      <h2>请选择</h2>
    </div>
    <div class="position-absolute font row">
      <div class="mr-15 p-5">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link h1 font-weight-bold">用户
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="log">用户登录</span></el-dropdown-item>
            <el-dropdown-item><span @click="reg">用户注册</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="p-5">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link h1 font-weight-bold">管理员
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="alog">管理员登录</span></el-dropdown-item>
            <el-dropdown-item><span @click="areg">管理员注册</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    //跳转到用户登录界面
    log(){
      this.$router.push('/log')
    },
    //跳转到管理员登录界面
    alog(){
      this.$router.push('/alog')
    },
    //跳转到用户注册界面
    reg(){
      this.$router.push('/reg')
    },
    //跳转到管理员注册界面
    areg(){
      this.$router.push('/areg')
    }
  }
}
</script>
<style scoped>
.main_font{
  text-align: center;
  margin-top: 6rem;
}
.el-dropdown-link{
  cursor: pointer;
}
.font{
  left: 20%;
}
.mr-15{
  margin-right: 36rem;
}
</style>