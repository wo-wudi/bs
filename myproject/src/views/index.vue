<template>
  <div class="index">
    <my-header></my-header>
    <div class="position-relative">
      <el-carousel height="500px" :interval="4000">
        <el-carousel-item v-for="item in carouselimages" :key="item.carouselid">
          <img class="w-100" :src="item.carouselpath" alt="">
          <div class="position-absolute carouseltext">
            <div class="h1 text-muted">{{item.carouselinto}}</div>
            <div class="h3 mt-5 text-dark">{{item.carouselsinto}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="row no-gutters my-5 pl-4">
      <div class="col-3 pr-4">
        <div class="img_hover">
          <a href="#"><img class="w-100" src="img/index/1.jpg" alt=""></a>
        </div>
      </div>
      <div class="col-6 pr-4">
        <div class="img_hover">
          <a href="#"><img class="w-100" src="img/index/2.jpg" alt=""></a>
        </div>
      </div>
      <div class="col-3 pr-4">
        <div class="img_hover">
          <a href="#"><img class="w-100" src="img/index/3.jpg" alt=""></a>
        </div>
      </div>
    </div>
    <div class="mx-4"><span class="h4 font-weight-bold">人气类​​别<p class="h6 font-weight-light text-muted mt-3">将热门类别添加到每周排队</p></span></div>
    <div class="row no-gutters my-5 pl-4">
      <div class="col-4" v-for="v in categorydata" :key="v.cateid">
        <div class="mr-4 mb-5">
          <div class="d-flex flex-column position-relative thumb_img">
          <img class="w-100 bg-transparent" :src="v.cateimagepath" alt="">
          <div class="position-absolute thumb">
            <div class="h5 font-weight-bold text-muted">{{v.catearticle}}</div>
            <div class="text-muted small mb-3">{{v.catedetail}}</div>
            <div class="a_move">
              <span href="list.html" class="text-dark small d-block mt-4" @click="tolist(v.cateid)">
                现在去购物
                <div class="icon bg-success text-white ml-1">△</div>
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-4 mb-5"><span class="h4 font-weight-bold">商品展示<p class="h6 font-weight-light text-muted mt-3">各个类别的商品展示</p></span></div>
    <div class="my-5">
      <el-carousel :interval="4000" type="card" height="600px">
        <el-carousel-item v-for="item in cardimages" :key="item.imageid">
          <img class="w-100" :src="item.imagepath" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mx-4 mb-5"><span class="h4 font-weight-bold">食品类<p class="h6 font-weight-light text-muted mt-3">食品类产品的轮播展示</p></span></div>
    <div class="m border border-1 d-flex">
      <div class="my-5 w-100 move d-flex">
        <div class="col-3" v-for="v in lunboimages" :key="v.lunboid">
          <img class="w-100" :src="v.lunbopath" alt="">
        </div>
      </div>
    </div>
    <div class="m-4 d"><a href="#"><img class="w-100" src="img/index/4.jpg" alt=""></a></div>
    <div class="mx-4 my-5"><span class="h4 font-weight-bold">最新评价<p class="h6 font-weight-light text-muted mt-3">以最佳方式呈现帖子，以突出显示用户对网站使用的感受。</p></span></div>
    <div class="row no-gutters mx-4">
      <div class="col-4 mt-4" v-for="v in discussres" :key="v.did">
        <div class="p-4 bg-light position-relative mr-3"> 
          <img src="img/index/discuss/blog-1.jpg" alt="" class="position-absolute w-100" style="z-index: -1;">
          <span class="mb-3 btn btn-dark btn-sm border border-0"><span>{{v.dscore}}星</span></span>
          <div class="my-2 font-weight-bold">这是用户：{{v.uname}}的评价</div>
          <div class="inner">{{v.dinner}}</div>
          <div>评论时间：{{v.dtime}}</div>
          <div class="a_move1 mt-3">
            <span class="small w-25 d-block" @click="dis">
              阅读原文
            </span>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  mounted(){
    this.getCarouselImage()
    this.getDisDate()
    this.getLunboImage()
    this.getCardImage()
    this.getCategoryData()
  },
  data(){
    return {
      //获取卡片式图片
      cardimages:[],
      //获取轮播图片
      lunboimages:[],
      //获取后台的评论数据
      discussres:[],
      //获取后台走马灯图片
      carouselimages:[],
      //获取后台类别数据
      categorydata:[]
    }
  },
  methods:{
    //获取走马灯图片
    getCarouselImage(){
      this.axios.get("/index/i1/getcarousel").then(res => {
        this.carouselimages=res.data
        console.log(this.carouselimages)
      })
    },
    //获取类别数据
    getCategoryData(){
      this.axios.get("/index/i1/getcategory").then(res => {
        this.categorydata=res.data
      })
    },
    //获取卡片式图片
    getCardImage(){
      this.axios.get("/index/i1/getcard").then(res => {
        this.cardimages=res.data
      })
    },
    //获取轮播图片
    getLunboImage(){
      this.axios.get("/index/i1/getlunbo").then(res => {
        this.lunboimages=res.data
      })
    },
    //获取评论数据
    getDisDate(){
      this.axios.get("/discuss/d1/getdiscuss").then(res => {
        let result=res.data
        result.forEach(item => {
          item.dtime=this.moment.unix(item.dtime/1000).format('Y年MM月DD日HH:mm')
        });
        this.discussres=result.slice(6,12)
      })
    },
    dis(){
      this.$router.push('/discuss')
    },
    tolist(key){
      switch(key){
        case 1:
          this.$router.push('/list')
          break
        case 2:
          this.$router.push('/listtwo')
          break
        case 3:
          this.$router.push('/listthree')
          break
        case 4:
          this.$router.push('/listfour')
          break
        case 5:
          this.$router.push('/listfive')
          break
        case 6:
          this.$router.push('/listsix')
          break
      }
    }
  }
}
</script>
<style scoped>
.carouseltext{
  top: 20%;
  left: 30%;
  z-index: 10;
}
.img_hover{
	overflow: hidden;
}
.img_hover>a img{
	cursor: pointer;
	transition: transform 3s ease;
}
.img_hover>a img:hover{
	transform: scale(1.1)
}
.thumb_img{
	overflow: hidden;
}
.thumb_img img{
	cursor: pointer;
	transition: transform 3s ease;
}
.thumb_img img:hover{
	transform: scale(1.1)
}
.thumb{
	top: 25px;
	left: 50px;
}
.icon{
	width: 16px;
	height: 16px;
	line-height: 16px;
	font-size: 14px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
	color: #098;  
}
.a_move>span{
	transition: transform 0.5s linear;
}
.a_move>span:hover{
  cursor: pointer;
	color: #098 !important;
	transform: translateY(-5px);
}
@keyframes move{
	from{
		transform: translate(0px);
	}
	to{
		/* transform: translate(-3036px); */
		transform: translate(-3000px);
	}
}
.m{
	overflow: hidden;
}
.move{
	animation: move 15s linear infinite;
}
.d{
	overflow: hidden;
}
.d>a img{
	transition: transform 4s ease;
}
.d>a img:hover{
	transform: scale(1.1)
}
.row>.col-4>.bg-light{
	transition: all 0.5s ease;
	overflow: hidden;
}
.row>.col-4>.bg-light:hover{
	background-color: rgba(0, 0, 0,.6) !important;
	color: #fff !important;
}
.row>.col-4>.bg-light:hover>.a_move1>span{
	color: #fff;
}
.row>.col-4>.bg-light:hover>.a_move1 div{
	background:  #fff;
	color: #000;
}
.row>.col-4>.bg-light:hover>span{
	background-color: #fff !important;
	color: #000 !important;
}
.row>.col-4>.bg-light>img{
	top: 0;
	left: 0;
}
.row>.col-4>.bg-light>span{
	border-radius: 50px;
	width: 15% !important;
	font-size: 0.7rem !important;
}
.row>.col-4>.bg-light>span:hover{
	background-color: #4fb68d !important;
}
.a_move1>span{
	color: #000;
	transition: transform 0.5s linear;
}
.a_move1>span:hover{
  cursor: pointer;
	color: #098 !important;
	transform: translateX(10px);
}
.inner{
  width: 400px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>