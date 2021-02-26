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
              <el-menu-item index="1-1" @click="adminu">用户管理</el-menu-item>
              <el-menu-item index="1-2" @click="adminp">商品管理</el-menu-item>
              <el-menu-item index="1-3" class="is-active">评价管理</el-menu-item>
              <el-menu-item index="1-4" @click="todata">管理员操作与数据图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
        <el-main>
          <div style="display: inline">
            <el-input
              v-model="input"
              placeholder="输入评分来搜索"
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              prefix-icon="el-icon-search"
              @keyup.13.native="search">
            </el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="search">搜索
           </el-button>
          </div>
          <el-table :data="results" stripe>
            <el-table-column prop="uname" label="用户名">
            </el-table-column>
            <el-table-column prop="dtime" label="评价时间">
            </el-table-column>
             <el-table-column prop="dscore" label="评价分数">
            </el-table-column>
             <el-table-column prop="dinner" label="评价内容">
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData(scope.row.did)">删除</el-button>
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
      //进行分页操作
      results:[],
      //获取后台评论结果
      res:[],
      //保存删除按钮传来的uid的值
      delId:'',
      //删除弹框的显示值
      delVisible:false,
      //总数据量
      total: 0,
      //页码
      pagenum: 1,
      //每页最多的数据量
      pagesize: 8,
      //接受登录界面传来的用户名
      aname:'',
      //注销确定弹窗的显示值
      quitVisible:false,
      //获取输入的内容
      input:''
    }
  },
  mounted(){
    //调用获取数据的方法
    this.getDate()
    this.aname=this.$route.params.aname
  },
  methods:{
    getDate(){
      //获取后台的评论数据
      this.axios.get("/discuss/d1/getdiscuss").then(res => {
        let result=res.data
        result.forEach(item => {
          item.dtime=this.moment.unix(item.dtime/1000).format('Y年MM月DD日HH:mm')
        });
        this.res=result
        this.total=result.length
        let start = (this.pagenum-1)*this.pagesize
        let end = this.pagenum*this.pagesize
        this.results=this.res.slice(start,end)
      })
    },
    handleSizeChange(val){
      console.log(val)
    },
    handleCurrentChange(val){
      this.pagenum=val
      let start = (this.pagenum-1)*this.pagesize
      let end = this.pagenum*this.pagesize
      this.results=this.res.slice(start,end)
    },
    //点击删除,将删除的did赋值给delId,并显示弹框
    delData(did){
      this.delId=did
      this.delVisible=true
    },
    del(){
      console.log(this.delId)
      //传delId给后台进行删除操作
      this.axios.get("/discuss/d1/del",{
        params:{
          did:this.delId
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
    quit(){
      this.quitVisible=true
    },
    close(){
      this.$router.push('/alog')
    },
    adminp(){
      this.$router.push('/ap')
    },
    adminu(){
      this.$router.push('/au')
    },
    todata(){
      this.$router.push('/data')
    },
    search(){
      if(this.input==''){
        this.$message({
          message:'请输入要查询的用户id',
          type:'warning'
        })
      }
      else{
        this.axios.get("/discuss/d1/search",{
          params:{
            dscore:this.input
          }
        }).then(res => {
          let result=res.data
          result.forEach(item => {
            item.dtime=this.moment.unix(item.dtime/1000).format('Y年MM月DD日HH:mm')
          });
          this.res=result
          this.total=result.length
          let start = (this.pagenum-1)*this.pagesize
          let end = this.pagenum*this.pagesize
          this.results=this.res.slice(start,end)
        })
      }
    }
  },
  watch:{
    input(){
      if(this.input==''){
        //向后台请求用户数据,并保存在res中
        this.getDate()
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