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
              <el-menu-item index="1-3" @click="admind">评价管理</el-menu-item>
              <el-menu-item index="1-4" class="is-active">管理员操作与数据图</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
        <el-main>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="不同类别商品数量---柱状图" name="1">
              <div class="bar" ref="bar_ref"></div>
            </el-collapse-item>
            <el-collapse-item title="用户的不同评分---饼图" name="2">
              <div class="pie" ref="pie_ref"></div>
            </el-collapse-item>
            <el-collapse-item title="用户操作" name="3">
              <div>
                <div class="h1">管理员操作</div>
                <div class="font-weight-bold">管理员针对用户列表，可以对不同用户进行修改信息，查询对应用户以及删除对应用户的操作！！！</div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="商品和评价" name="4">
              <div>
                <div class="h1">管理员操作</div>
                <div class="font-weight-bold">管理员针对商品和评价，可以删除对应的商品和评价，可以根据商品类别名或者评分查询对应的商品和评价！！！</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-container>
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
      //接受登录界面传来的用户名
      aname:'',
      //注销确定弹窗的显示值
      quitVisible:false,
      //手风琴显示效果
      activeName: '1',
      //获取后台类目名称
      categoryName:[],
      //获取后台结果
      result:[],
      //获取条形图
      barInit:null
    }
  },
  mounted(){
    //调用获取数据的方法
    this.aname=this.$route.params.aname
    this.barChart()
    this.getCategoryName()
    this.pieChart()
  },
  methods:{
    //获取后台类目名称
    async getCategoryName(){
      this.$store.state.category=[]
      await this.axios.get("/product/p1/getcategory").then(res => {
        this.result=res.data
        this.result.forEach(item => {
          this.categoryName.push(item.cname)
          this.axios.get("/product/p1/count",{
            params:{
              categoryid:item.cid
            }
          }).then(res => {
            this.$store.commit('addCategory',res.data[0].count)
          })
        })
        // 绘制图表
        let changeoption = {
          xAxis: {
            data: this.categoryName
          },
        }
        this.barInit.setOption(changeoption)
      })
    },
    barChart(){
      this.barInit = echarts.init(this.$refs.bar_ref);
      let option = {
         title: {
            text: '商品类别数量柱状图',
            textStyle:{
              color:'#2e7df6'
            },
            left:'center'
          },
          tooltip: {},
          xAxis:{
            data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
            axisLine:{
              lineStyle:{
                color:'#2e7df6'
              }
            }
          },
          yAxis: {
            axisLine:{
              lineStyle:{
                color:'#2e7df6'
              }
            },
            axisLabel:{
              textStyle: {
                color:'#2e7df6'
              }
            }
          },
          series: [{
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#2e7df6' // 0% 处的颜色
              }, {
                  offset: 1, color: '#5052EE' // 100% 处的颜色
              }],
            },
            name: '销量',
            type: 'bar',
            data: this.$store.state.category,
            label:{
              show: true,
              position: 'top',
              textStyle: {
                color: '#47a1f7'
              }
            }
          }]
        }
        this.barInit.setOption(option)
    },
    async pieChart(){
      this.$store.state.dscore=[
        {value: 0, name: '0星'},
        {value: 0, name: '1星'},
        {value: 0, name: '2星'},
        {value: 0, name: '3星'},
        {value: 0, name: '4星'},
        {value: 0, name: '5星'}
      ]
      await this.axios.get("/discuss/d1/getdscore").then(res => {
        let result=res.data
        result.forEach(item => {
          this.$store.commit('addDscore',item.dscore)
        })
      })
      let pieInit = echarts.init(this.$refs.pie_ref);
      let option = {
        title: {
          text: '用户评分饼图',
          subtext: '实时监控',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [{
          name: '用户评分',
          type: 'pie',
          radius: '50%',
          data: this.$store.state.dscore,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      pieInit.setOption(option)
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
    admind(){
      this.$router.push('/ad')
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
.bar{
  width: 640px;
  height: 330px;
}
.pie{
  width: 640px;
  height: 330px;
}
</style>