//引入连接池模块
const pool=require('../pool')
const express=require('express');
var query=require("./query");
//创建路由器对象
const index=express.Router();
//添加路由
//获取走马灯图片
index.get('/i1/getcarousel',(req,res) => {
  let sql="select carouselid,carouselpath,carouselinto,carouselsinto from bs_indexcarousel"
  pool.query(sql,(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//获取类别数据
index.get('/i1/getcategory',(req,res) => {
  let sql="select cateid,cateimagepath,catearticle,catedetail from bs_indexcategory"
  pool.query(sql,(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//获取轮播图片
index.get('/i1/getlunbo',(req,res) => {
  let sql="select lunboid,lunbopath from bs_indexlunbo"
  pool.query(sql,(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//获取卡片式图片
index.get('/i1/getcard',(req,res) => {
  let sql="select imageid,imagepath from bs_indexcard"
  pool.query(sql,(err,result) => {
    if(err)
     throw err
    res.send(result)
  })
})
//导出路由器对象
module.exports=index;
