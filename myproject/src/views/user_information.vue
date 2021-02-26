<template>
  <div class="user_information">
    <my-header></my-header>
    <div class="position-relative mb-5">
      <img class="w-100" src="img/cart/sample-1.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">
        <div>个人信息</div>
      </div>
    </div>
    <div>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>个人中心</span>
              </div>
              <div class="name-role">
                <span class="sender">用户名 - {{res.uname}}</span>  
              </div>
              <el-divider></el-divider>
              <div class="personal-relation">
                <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{res.phone}}</div></div>
              </div>
              <div class="personal-relation">
                <div class="relation-item">真实姓名:  <div style="float: right; padding-right:20px;">{{res.userName}}</div></div>      
              </div>
              <div class="personal-relation">
                <div class="relation-item">学号:  <div style="float: right; padding-right:20px;">{{res.stuNum}}</div></div>      
              </div>
              <el-button size="mini" type="primary" @click="update">修改密码</el-button>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="mr-5">已上架商品</span>
              <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addlist">添加商品</el-button>
            </div>
              <div>
                <el-table :data="results" height="295">
                  <el-table-column prop="lname" label="商品名">
                  </el-table-column>
                  <el-table-column prop="price" label="价格">
                  </el-table-column>
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <img :src="scope.row.images" class="w-100">
                    </template>
                  </el-table-column>
                  <el-table-column prop="contact" label="联系方式">
                  </el-table-column>
                  <el-table-column prop="addr" label="交易地点">
                  </el-table-column>
                  <el-table-column prop="part" label="具体地点">
                  </el-table-column>
                  <el-table-column label="修改" width="100">
                    <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeData(scope.row.lid)">修改</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="删除" width="100">
                    <template slot-scope="scope">
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData(scope.row.lid)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="changeVisible"
      width="25%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="价格" style="width:300px">
          <el-input v-model="changeForm.price" placeholder="请输入修改的价格"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" style="width:300px">
          <el-input v-model="changeForm.contact" placeholder="请输入修改的联系方式"></el-input>
        </el-form-item>
        <span>修改交易地点</span>&nbsp;
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加商品"
      :visible.sync="addVisible"
      width="27%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="商品名" style="width:300px">
          <el-input v-model="goods.lname" placeholder="请输入商品名字"></el-input>
        </el-form-item>
        <el-form-item label="价格" style="width:300px">
          <el-input v-model="goods.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" style="width:300px">
          <el-input v-model="goods.contact" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <span>初选交易地点</span>&nbsp;
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader><br><br>
        <span>选择商品类别</span>&nbsp;
        <el-select v-model="values" placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select><br><br>
        <span>商品图片</span><br>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          multiple
          :limit="1"
          :on-exceed="handleExceed">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
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
    <my-footer></my-footer>
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
      //获取登录的用户的uid
      uid:'',
      //获取用户信息
      res:[],
      //获取该用户的上架的商品
      results:[],
      //保存修改的值
      changeForm: {},
      //修改弹窗的显示值
      changeVisible:false,
      //新增商品弹窗控制值
      addVisible:false,
      //获取新增的所有商品的值
      goods:{},
      //获取添加商品中的地址值
      value:[],
      //获取图片
      imgList:[],
      //创建选项卡的值
      options:[{
        value:'南苑',
        label:'南苑',
        children:[{
          value:'1栋',
          label:'1栋'
        },{
          value:'2栋',
          label:'2栋'
        },{
          value:'3栋',
          label:'3栋'
        },{
          value:'4栋',
          label:'4栋'
        },{
          value:'5栋',
          label:'5栋'
        },{
          value:'6栋',
          label:'6栋'
        },{
          value:'7栋',
          label:'7栋'
        },{
          value:'8栋',
          label:'8栋'
        },{
          value:'9栋',
          label:'9栋'
        },{
          value:'10栋',
          label:'10栋'
        },{
          value:'11栋',
          label:'11栋'
        },{
          value:'12栋',
          label:'12栋'
        },{
          value:'13栋',
          label:'13栋'
        },{
          value:'14栋',
          label:'14栋'
        },{
          value:'15栋',
          label:'15栋'
        }]
      },{
        value:'北苑',
        label:'北苑',
        children:[{
          value:'16栋',
          label:'16栋'
        },{
          value:'17栋',
          label:'17栋'
        },{
          value:'18栋',
          label:'18栋'
        },{
          value:'19栋',
          label:'19栋'
        },{
          value:'20栋',
          label:'20栋'
        },{
          value:'21栋',
          label:'21栋'
        },{
          value:'22栋',
          label:'22栋'
        },{
          value:'23栋',
          label:'23栋'
        },{
          value:'24栋',
          label:'24栋'
        },{
          value:'25栋',
          label:'25栋'
        }]
      },{
        value:'南苑',
        label:'南苑',
        children:[{
          value:'大礼堂',
          label:'大礼堂'
        },{
          value:'2楼自习室',
          label:'2楼自习室'
        },{
          value:'3楼自习室',
          label:'3楼自习室'
        },{
          value:'4楼饭堂',
          label:'4楼饭堂'
        },{
          value:'5楼饭堂',
          label:'5楼饭堂'
        }]
      },{
        value:'北苑',
        label:'北苑',
        children:[{
          value:'1楼饭堂',
          label:'1楼饭堂'
        },{
          value:'2楼饭堂',
          label:'2楼饭堂'
        },{
          value:'3楼饭堂',
          label:'3楼饭堂'
        }]
      }],
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
      },
      option: [{
        value: '1',
        label: '食品'
      }, {
        value: '2',
        label: '书籍'
      }, {
        value: '3',
        label: '学习用品'
      }, {
        value: '4',
        label: '运动用品'
      }, {
        value: '5',
        label: '书桌'
      }, {
        value: '6',
        label: '化妆品'
      }],
      values: '1',
      cpath: ''
    }
  },
  mounted(){
    this.getInfo()
    this.getList()
  },
  methods:{
    getInfo(){
      this.uid=this.$store.state.user.uid
      this.axios.get('/user/u1/getinfo',{
        params:{
          uid:this.uid
        }
      }).then(res => {
        this.res=res.data[0]
      })
    },
    getList(){
      this.axios.get('/product/p1/getlist',{
        params:{
          userid:this.uid
        }
      }).then(res => {
        let result=res.data
        result.forEach(item => {
          this.results.push(item)
        });
      })
    },
    changeData(lid){
      this.changeVisible=true
      this.changeForm.lid=lid
    },
    change(){
      this.changeForm.addr=this.value[0]
      this.changeForm.part=this.value[1]
      this.axios.post("/product/p1/update",this.qs.stringify(this.changeForm)).then(res => {
        console.log(res.data)
      })
      //刷新一次页面
      this.$router.go(0)
      //弹框关闭
      this.changeVisible=false
    },
    addlist(){
      this.addVisible=true
    },
    handleChange(file, fileList) {
      this.imgList = fileList[0].raw;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    add(){
      this.axios.get("/product/p1/cpath",{
        params:{
          cid:this.values
        }
      }).then(res => {
        this.cpath=res.data
      })
      this.goods.addr=this.value[0]
      this.goods.part=this.value[1]
      //formData 模拟一个表单，用于封装请求参数
      let formdata=new FormData()
      formdata.append('file',this.imgList)
      this.axios.post("/product/upload",formdata).then(res => {
        this.goods.images=`img/list/${this.cpath}/${res.data}`
        this.goods.userid=this.uid
        this.goods.categoryid=this.values
        this.axios.post("/product/p1/upload",this.qs.stringify(this.goods)).then(res => {
          this.$router.go(0)
        })
      })
      this.addVisible=false
    },
    delData(lid){
      this.$confirm('确定删除？删除不可恢复！','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.axios.get("/product/p1/del",{
          params:{
            lid:lid
          }
        }).then(res => {
          this.$router.go(0)
        })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    update(){
      this.updateVisible=true
    },
    updateupwd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/user/u1/updateupwd",this.qs.stringify(this.updateForm)).then(res => {
            if(res.data){
              this.$alert('修改成功','提示',{
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/log')
                }
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
  left: 20%;
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
.clearfix:before,.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 100%;
}
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align:center;
}
.sender{
  text-align:center;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%
}
.relation-item {
  padding: 12px; 
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
  }
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>