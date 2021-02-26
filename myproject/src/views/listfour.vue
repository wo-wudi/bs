<template>
  <div class="listfour">
    <my-header></my-header>
    <div class="position-relative">
      <img class="w-100" src="img/list/sample-5.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">商品列表</div>
    </div>
    <div class="mx-4 bg-light py-2 mt-5">
      <span class="font-weight-bold mx-3" @click="changeList">食品</span>
      <span class="font-weight-bold mx-3" @click="changeListtwo">书籍</span>
      <span class="font-weight-bold mx-3" @click="changeListthree">学习用品</span>
      <span class="text-primary font-weight-bold mx-3">运动用品</span>
      <span class="font-weight-bold mx-3" @click="changeListfive">书桌</span>
      <span class="font-weight-bold mx-3" @click="changeListsix">化妆品</span>
    </div>
    <div class="row no-gutters pl-4">
      <div class="main col-lg-3 col-sm-6 position-relative" v-for="v of res" :key="v.lid" @click="details(v)">
        <div class="mr-4">
          <div class="border border-1 d-flex flex-column mt-5 position-relative">
            <img class="image" :src="v.images">
            <div class="text-muted small pl-3 py-2">用户:{{v.uname}}</div>
            <div class="font-weight-bold pl-3">{{v.lname}}</div>
            <div class="pl-3 font-weight-bold">￥：{{v.price}}</div>
          </div>
        </div>
      <span class="move position-absolute font-weight-bold h4">查看详情</span>
      </div>
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
    <el-dialog
      title="商品详情"
      :visible.sync="detailVisible"
      width="25%">
      <el-form>
        <img class="w-50" :src="detail.images">
        <el-form-item label="商品名称">
          <span>{{detail.lname}}</span>
        </el-form-item>
        <el-form-item label="商品价格">
          <span>{{detail.price}}</span>
        </el-form-item>
        <el-form-item label="交易地点">
          <span>{{detail.addr}}{{detail.part}}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <span>{{detail.contact}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  data(){
    return{
      //当前类别号
      categoryid: 4,
      //进行分页操作
      res:[],
      //用于接收后台请求的结果
      results:[],
      //控制商品详情弹框的值
      detailVisible:false,
      //获取商品详情的信息
      detail:{},
      //获取用户id
      uid:'',
      //总数据量
      total: 0,
      //起始页码
      pagenum: 1,
      //每页最多得数据量
      pagesize: 12
    }
  },
  mounted(){
   this.getData()
  },
  methods:{
    getData(){
      //发请求获取商品列表
      this.axios.get("/product/p1/list",{
        params:{
          categoryid:this.categoryid
        }
      }).then(res => {
        this.total=res.data.length
        this.results=res.data
        let start = (this.pagenum-1)*this.pagesize
        let end = this.pagenum*this.pagesize
        this.res=this.results.slice(start,end)
      })
    },
    changeList(){
      this.$router.push('/list')
    },
    changeListtwo(){
      this.$router.push('/listtwo')
    },
    changeListthree(){
      this.$router.push('/listthree')
    },
    changeListfive(){
      this.$router.push('/listfive')
    },
    changeListsix(){
      this.$router.push('/listsix')
    },
    details(value){
      this.detailVisible=true
      this.detail=value
    },
    handleSizeChange(val){
      console.log(val)
    },
    handleCurrentChange(val){
      this.pagenum=val
      let start = (this.pagenum-1)*this.pagesize
      let end = this.pagenum*this.pagesize
      this.res=this.results.slice(start,end)
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
.image{
  width: 100%;
  height: 340px;
}
.bg-light>span:hover{
  cursor: pointer;
	color: #409EFF;
}
.main{
  cursor: pointer;
}
.main>.mr-4>.border{
	border-radius: 5px;
}
.main>.mr-4>.border div:last-child{
	color: #17a2b8 !important;
}
.main>.mr-4>.border:hover{
	border-color: #17a2b8 !important;
}
.main:hover .move{
  transform: translateY(200px);
}
.move{
  z-index: -1;
  top: 200px;
  left: 120px;
  transition: transform .5s ease;
	color: #17a2b8 !important;
}
</style>