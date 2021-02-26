<template>
  <div class="discuss">
    <my-header></my-header>
    <div class="position-relative">
      <img class="w-100" src="img/discuss/sample-6.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">用户评论</div>
    </div>
    <div class="mydis" @click="disbtn" v-show="disbar">我要评论</div>
    <el-row class="mx-4 bg-light py-2 mt-5">
      <el-col :span="20">
        <div class="grid-content bg-purple-dark mx-3">评价</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark mx-3 text-center">评分</div>
      </el-col>
    </el-row>
    <div v-for="(v,k) of results" :key="k">
      <el-row class="mx-4 mt-2">
        <el-divider></el-divider>
        <el-col :span="20">
          <div class="px-4 position-relative">
            <el-avatar :size="45" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <div class="ml-2 uname">
              <span>{{v.uname}}</span><br>
              <span>{{v.dtime}}</span>
            </div>
          </div>
          <div class="px-4">
            {{v.dinner}}
          </div>
        </el-col>
        <el-col :span="4">
          <div class="text-center py-5">
            <el-rate
              v-model="results[k].dscore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="text-center mt-5">
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
    <el-drawer
      title="我的评论"
      :visible.sync="drawer"
      direction="ttb">
      <div class="d-flex justify-content-between">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容(100字以内)"
          :autosize="{ minRows: 2, maxRows: 10}"
          v-model="textarea"
          class="textinput"
          maxlength="100">
        </el-input>
        <div class="w-15 ml-3 text-center">
          打分
          <el-rate
            v-model="value"
            :colors="colors">
          </el-rate>
        </div>
      </div>
      <el-button @click="discussbtn" class="mt-3 disbtn" type="primary" size="medium">提交<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-drawer>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  mounted(){
    this.getDate()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      //进行分页操作
      results:[],
      //获取后台评论结果
      res:[],
      //总数据量
      total: 0,
      //起始页码
      pagenum: 1,
      //每页最多得数据量
      pagesize: 10,
      //评论按钮的显示
      disbar: false,
      //评论弹窗
      drawer: false,
      //文本域输入内容
      textarea: '',
      //评分
      value: 0,
      //颜色
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
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
    handleScroll(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 250){
        this.disbar = true;
      }else if (scrollTop < 250) {
        this.disbar = false;
      }
    },
    disbtn(){
      this.drawer=true
    },
    discussbtn(){
      let duserid=this.$store.state.user.uid
      let time=new Date().valueOf()
      let object={
        dtime:time,
        dinner:this.textarea,
        dscore:this.value,
        duserid:duserid
      }
      this.axios.post("/discuss/d1/raisediscuss",this.qs.stringify(object)).then(res => {
        if(res.data){
          this.drawer=false
          this.$router.go(0)
        }
        else{
          this.$message({
            message:'评论失败，请检查输入的内容',
            type:'warning'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.main_font{
  top: 150px;
  left: 100px;
}
@keyframes font_move{
	from{
		transform: translateY(-500px);
	}
	50%{
		transform: scaleY(3.0);
	}
	to{
		transform: translateY(0px);
	}
}
.font_move{
	animation: font_move 2s ease;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
}
.uname{
  position: absolute;
  top: 0;
  left: 70px;
  color: #bbb;
}
.mydis{
  border: 1px solid #ddd;
  color: #000;
  background-color: #eee;
  text-align: center;
  width: 47px;
  height: 47px;
  border-radius: 2px;
  position: fixed;
  right: 0;
  top: 250px;
  z-index: 1;
  cursor: pointer;
}
.textinput{
  margin-left: 10px;
}
.w-15{
  width: 15%;
}
.disbtn{
  position: absolute;
  right: 50px;
}
</style>