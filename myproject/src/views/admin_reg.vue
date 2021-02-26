<template>
  <div class="admin_reg">
    <div class="position-relative mb-5">
      <img class="w-100" src="img/login/breadcrumb-bg.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">
        <div>管理员注册界面</div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="text-center col-7 ml-auto mr-auto">
          <div class="login_reg_head d-flex justify-content-center">
            <span class="text-dark font-weight-bold h3">管理员注册</span>
          </div>
          <div class="my-5">
            <div class="tab_reg">
              <div class="login_form text-left">
                <div>
                  <el-input prefix-icon="el-icon-s-custom" placeholder="用户名" class="mb-2" v-model="aname"></el-input>
                  <el-input prefix-icon="el-icon-view" type="password" placeholder="密码" class="mb-2" v-model="apwd" @keyup.13.native="reg"></el-input>
                  <button class="btn btn-light border-1 border mt-3" @click="reg">注册</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      //获取输入的用户名
      aname:'',
      //获取输入的密码
      apwd:''
    }
  },
  methods:{
    //传值给后台让后台进行管理员用户的注册并将返回值赋值给res
    reg(){
      let object={
        aname:this.aname,
        apwd:this.apwd
      }
      this.axios.post("/admin/a1/reg",this.qs.stringify(object)).then(res => {
        if(res.data){
          this.$confirm('注册成功,是否去登录', '提示', {
          }).then(() => {
            this.$router.push('/alog')
          }).catch(()=>{
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.main_font{
  top: 35%;
  left: 45%;
}
@keyframes font_move{
	from{
		transform: translateY(-500px);
	}
	50%{
		transform: scale(1.5);
	}
	to{
		transform: translateY(0px);
	}
}
.font_move{
	animation: font_move 2s ease;
}
.login_form{
  background: transparent none repeat scroll 0 0;
  box-shadow: 0 0 6px rgba(0,0,0,.1);
  padding: 80px;
}
.login_reg_head>span{
  color: #4fb68d !important;
}
</style>