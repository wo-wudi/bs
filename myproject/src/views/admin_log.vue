<template>
  <div class="admin_log">
    <!-- 登录界面头开始 -->
    <div class="position-relative mb-5">
      <img class="w-100" src="img/login/breadcrumb-bg.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">
        <div>管理员登录界面</div>
      </div>
    </div>
    <!-- 登录界面头结束 -->
    <!-- 登录主题开始 -->
    <div class="container">
      <div class="row">
        <div class="text-center col-7 ml-auto mr-auto">
          <div class="login_reg_head d-flex justify-content-center">
            <a href="javascript:;"><span class="text-dark font-weight-bold h3">管理员登录</span></a>
          </div>
          <div class="my-5">
            <div class="tab_login">
              <div class="login_form text-left">
                <div>
                  <!-- 用户名输入框 -->
                  <el-input prefix-icon="el-icon-s-custom" placeholder="用户名" class="mb-4" v-model="aname"></el-input>
                  <!-- 密码输入框 -->
                  <el-input prefix-icon="el-icon-view" type="password" placeholder="密码" v-model="apwd"></el-input>
                  <!-- 登录码输入框 -->
                  <el-input prefix-icon="el-icon-star-on" placeholder="管理员登录码" class="w-100 mt-4" v-model="acode" @keyup.13.native="alog"></el-input>
                  <button class="btn btn-light border-1 border mt-3" @click="alog">登录</button>
                  <button class="btn btn-light border-1 border ml-2 mt-3" @click="areg">注册</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录主题结束 -->
    <!-- 弹窗开始 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>登录失败,用户名或密码错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗结束 -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      //获取输入的用户名
      aname:'',
      //获取输入的密码
      apwd:'',
      //获取输入的登录码
      acode:'',
      //获取后台的返回结果
      res:'',
      //控制弹窗的起始值
      dialogVisible:false
    }
  },
  methods:{
    //与数据库进行登录的验证
    alog(){
      let object={
        aname:this.aname,
        apwd:this.apwd,
        acode:this.acode
      }
      this.axios.post("/admin/a1/login",this.qs.stringify(object)).then(res => {
        //将后台传来的值赋值给res
        this.res=res.data
        //当登录失败时改变弹窗起始值，使弹窗显示
        if(this.res==0){
          this.dialogVisible=true
        }
        else{
          let storage = window.sessionStorage
          let userString=JSON.stringify(res.data[0])
          storage.setItem('admin',userString)
          this.$store.commit('addAdmin',res.data[0])
          this.$router.push('/au')
        }
      })
    },
    areg(){
      this.$router.push('/areg')
    }
  }
}
</script>
<style scoped>
.main_font{
  top: 35%;
  left: 40%;
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
.login_reg_head>a>span{
  color: #4fb68d !important;
}
</style>