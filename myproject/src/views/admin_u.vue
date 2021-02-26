<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header class="d-flex justify-content-between">
        <span class="font-weight-bold">后台管理员系统界面</span>
        <div style="text-align:right">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="quit">注销</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{this.$store.state.admin.aname}}&nbsp;欢迎您！</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>管理员操作</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="is-active">用户管理</el-menu-item>
              <el-menu-item index="1-2" @click="adminp">商品管理</el-menu-item>
              <el-menu-item index="1-3" @click="admind">评价管理</el-menu-item>
              <el-menu-item index="1-4" @click="todata">管理员操作与数据图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
        <el-main>
          <div style="display: inline">
            <el-input
              v-model="input"
              placeholder="输入用户编号来搜索"
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              prefix-icon="el-icon-search"
              @keyup.13.native="search">
            </el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="search">搜索
           </el-button>
          </div>
          <el-table :data="res" stripe>
            <el-table-column prop="uid" label="用户编号">
            </el-table-column>
            <el-table-column prop="uname" label="用户名">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
             <el-table-column prop="stuNum" label="学号">
            </el-table-column>
             <el-table-column prop="userName" label="真实姓名">
            </el-table-column>
            <el-table-column label="编辑" width="100">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeData(scope.row.uid)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData(scope.row.uid)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-right">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              :total="total"
              :page-size="pagesize">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="修改"
      :visible.sync="changeVisible">
      <el-form ref="form" label-width="80px">
        <el-form-item label="uid" style="width:300px">
          <el-input :value="changeForm.uid" disabled></el-input>
        </el-form-item>
        <el-form-item label="uname" style="width:300px">
          <el-input v-model="changeForm.uname" placeholder="请输入修改的用户名"></el-input>
        </el-form-item>
        <el-form-item label="phone" style="width:300px">
          <el-input v-model="changeForm.phone" placeholder="请输入修改的电话号码"></el-input>
        </el-form-item>
        <el-form-item label="stuNum" style="width:300px">
          <el-input v-model="changeForm.stuNum" placeholder="请输入修改的学号"></el-input>
        </el-form-item>
        <el-form-item label="userName" style="width:300px">
          <el-input v-model="changeForm.userName" placeholder="请输入修改的真实姓名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delVisible">
      <span>确定删除？删除不可恢复！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="quitVisible">
      <span>确定注销吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quitVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //保存后台传来的数据
      res:[],
      //保存删除按钮传来的uid的值
      delId:'',
      //删除弹框的显示值
      delVisible:false,
      //保存修改的值
      changeForm: {},
      //修改弹窗的显示值
      changeVisible:false,
      //保存修改传来的uid值
      changeId:'',
      //获取搜索框输入的值
      input:'',
      //总数据量
      total: 0,
      //页码
      pagenum: 1,
      //每页最多的数据量
      pagesize: 10,
      //接受登录界面传来的用户名
      aname:'',
      //注销确定弹窗的显示值
      quitVisible:false
    }
  },
  mounted(){
    //调用获取数据的方法
    this.getData(this.pagesize,this.pagenum)
    this.aname=this.$route.params.aname
  },
  methods:{
    //向后台请求用户数据,并保存在res中
    getData(pagesize,pagenum){
      this.axios.get("/user/u1/list",{
        params:{
          pagesize:pagesize,
          pagenum:pagenum
        }
      }).then(res => {
        this.res=res.data.result
        this.total=res.data.length
      })
    },
    //点击删除,将删除的uid赋值给delId,并显示弹框
    delData(uid){
      this.delId=uid
      this.delVisible=true
    },
    del(){
      //传delId给后台进行删除操作
      this.axios.get("/user/u1/del",{
        params:{
          uid:this.delId
        }
      }).then(res => {
        console.log(res.data)
      })
      // this.res.splice(this.delIndex,1)
      //刷新一次页面
      this.$router.go(0)
      //弹框消失
      this.delVisible=false
    },
    //点击编辑,将取得的uid分别赋值给changeId和弹窗中的第一个文本框,并显示弹窗
    changeData(uid){
      this.changeForm.uid=uid
      this.changeId=uid
      this.changeVisible=true
    },
    change(){
      //将输入的值传入后台进行修改
      this.axios.post("user/u1/update",this.qs.stringify(this.changeForm)).then(res => {
        console.log(res.data)
      })
      //刷新一次页面
      this.$router.go(0)
      //弹框消失
      this.changeVisible=false
    },
    search(){
      if(this.input==''){
        this.$message({
          message:'请输入要查询的用户id',
          type:'warning'
        })
      }
      else{
        this.axios.get("/user/u1/search",{
          params:{
            uid:this.input
          }
        }).then(res => {
          this.res=res.data
          this.total=this.res.length
        })
      }
    },
    handleSizeChange(val) {
      this.pagesize=val
    },
    //点击下一页或者输入跳转页码时,将新的页码重新传到后台，请求相应页码的数据
   handleCurrentChange(val){
     this.getData(this.pagesize,val)
    },
    quit(){
      this.quitVisible=true
    },
    close(){
      this.$router.push('/alog')
    },
    adminp(){
      this.$router.push('/ap')
    },
    admind(){
      this.$router.push('/ad')
    },
    todata(){
      this.$router.push('/data')
    },
  },
  watch:{
    input(){
      if(this.input==''){
        //向后台请求用户数据,并保存在res中
        this.getData(this.pagesize,this.pagenum)
      }
    }
  }
}
</script>
<style scoped>
.el-header {
    background: linear-gradient(to right,#EEF1F6,#EEF1FD,#EEF1F6);
    color: #333;
    line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>