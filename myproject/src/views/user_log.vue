<template>
  <div class="user_log">
    <div class="position-relative mb-5">
      <img class="w-100" src="img/login/breadcrumb-bg.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">
        <div>用户登录界面</div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="text-center col-7 ml-auto mr-auto">
          <div class="login_reg_head d-flex justify-content-center">
            <span class="text-dark font-weight-bold h3">用户登录</span>
          </div>
          <div class="my-5">
            <div class="tab_login">
              <div class="login_form">
                <div>
                  <el-input prefix-icon="el-icon-s-custom" placeholder="学号" class="mb-4" v-model="stuNum"></el-input>
                  <el-input prefix-icon="el-icon-view" type="password" placeholder="密码" v-model="upwd" @keyup.13.native="log"></el-input>
                  <div class="d-flex justify-content-between">
                    <div>
                      <button class="btn btn-light border-1 border mt-3" @click="log">登录</button>
                      <button class="btn btn-light border-1 border mt-3 ml-2" @click="reg">注册</button>
                    </div>
                    <div class="mt-4"><span @click="update">忘记密码？</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>登录失败,学号或密码错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="updateVisible"
      width="400px">
      <el-form :model="updateForm" status-icon :rules="rules" ref="updateForm">
        <el-form-item prop="stuNum">
          <el-input placeholder="请输入学号" prefix-icon="el-icon-s-custom" v-model="updateForm.stuNum"></el-input>
        </el-form-item>
        <el-form-item prop="upwd">
          <el-input type="password" placeholder="输入新密码" prefix-icon="el-icon-view" v-model="updateForm.upwd"></el-input>
        </el-form-item>
        <el-form-item prop="checkUpwd">
          <el-input type="password" placeholder="请再次输入密码" prefix-icon="el-icon-view" v-model="updateForm.checkUpwd" @keyup.13.native="updateupwd('updateForm')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateupwd('updateForm')">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    var checkStuNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'));
      }
      setTimeout(() => {
        if (value.length!=9) {
          callback(new Error('请输入正确的学号'));
        } else {
            callback();
        }
      }, 100);
    }
    var checkUpwd = (rule, value, callback) => {
      let upwdRegexp=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,16}$/
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      setTimeout(() => {
        if (!upwdRegexp.test(value)) {
          callback(new Error('8-16位英文字母,数字或者符号(除空格)且字母,数字和标点符号至少包含两种'));
        } 
        else {
          callback();
        }
      }, 100);
    }
    var checkCheckUpwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'));
      }
      setTimeout(() => {
        if (value!=this.updateForm.upwd) {
          callback(new Error('两次输入不一致'));
        } 
        else {
          callback();
        }
      }, 100);
    }
    return{
      //获取输入的学号
      stuNum:'',
      //获取输入的密码
      upwd:'',
      //获取后台返回的结果
      res:'',
      //控制弹窗的值
      dialogVisible:false,
      //控制修改密码弹窗的值
      updateVisible:false,
      //获取修改密码的信息
      updateForm:{
        //获取输入的学号
        stuNum:'',
        //获取输入的新密码
        upwd:'',
        //获取再次输入的新密码
        checkUpwd:''
      },
      rules:{
        upwd:[
          {
            validator:checkUpwd,
            trigger:'change'
          }
        ],
        stuNum:[
          {
            validator:checkStuNum,
            trigger:'change'
          }
        ],
        checkUpwd:[
          {
            validator:checkCheckUpwd,
            trigger:'change'
          }
        ]
      }
    }
  },
  methods:{
    //将用户输入的值传入后台进行登录验证
    log(){
      let object={
        stuNum:this.stuNum,
        upwd:this.upwd
      }
      this.axios.post("/user/u1/login",this.qs.stringify(object)).then(res => {
        //将返回结果赋值给res
        this.res=res.data
        //如果登录失败，修改弹窗的值，显示弹窗
        if(this.res==0){
          this.dialogVisible=true
        }
        else{
          let storage = window.sessionStorage
          let userString=JSON.stringify(res.data[0])
          storage.setItem('user',userString)
          this.$store.commit('addUser',res.data[0])
          this.$router.push('/index')
        }
      })
    },
    reg(){
      this.$router.push('/reg')
    },
    update(){
      this.updateVisible=true
    },
    updateupwd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/user/u1/updateupwd",this.qs.stringify(this.updateForm)).then(res => {
            if(res.data){
              this.$confirm('修改成功', '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                this.updateVisible=false
              }).catch(()=>{
                this.updateVisible=false
              })
            }
            else{
              this.$confirm('修改失败,请检查学号是否输入正确', '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                this.updateVisible=true
              }).catch(()=>{
                this.updateVisible=true
              })
            }
          })
        }
        else{
          this.$message({
            message:'修改失败，请检查输入的内容',
            type:'warning'
          })
          return false;
        }
      })
    }
  }
}
</script>
<style scoped>
.main_font{
  top: 35%;
  left: 42%;
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
.d-flex .mt-4{
  cursor: pointer;
}
.d-flex .mt-4>span:hover{
  color: #4fb68d;
}
</style>