const express=require('express');
const pool = require('../pool');
const product=express.Router();
const multer=require('multer');
const e = require('express');
var cpath=null
//获取商品保存路径
product.get('/p1/cpath',(req,res) => {
  let _cid=req.query.cid
  let sql="select cpath from bs_category where cid=?"
  pool.query(sql,[_cid],(err,result) => {
    if(err)
      throw err
    cpath=result[0].cpath
    res.send(cpath)
  })
})
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    //指定文件路径存储地
    cb(null,`../myproject/public/img/list/${cpath}/`);
  },
  filename:function(req,file,cb){
    //指定存储后的文件名(有两个问题)
    //1文件名重复覆盖  时间戳
    //2后缀名发生改变
    console.log('---',file);
    //图片原名字存储
    cb(null,file.originalname);
  }
});
var upload=multer({
  storage:storage
});
//图片上传
product.post("/upload",upload.single("file"),
  function (req, res) {
    let path=`/${req.file.originalname}`
    res.send(path)
  }
);
//添加商品
product.post("/p1/upload",(req,res) => {
  let obj=req.body
  let sql="insert into bs_shangping set?"
  pool.query(sql,[obj],(err,result) => {
    if(err)
      throw err
    if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
  })
})
//获取商品列表前台
product.get('/p1/list',(req,res) => {
  let _categoryid=req.query.categoryid
	let sql="select lid,lname,price,images,addr,part,contact,userid,uname from bs_shangping,bs_user where categoryid=? and userid=uid"
	pool.query(sql,[_categoryid],(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
});
//获取商品列表后台管理
product.get('/p1/backlist',(req,res) => {
	let sql="select lid,lname,price,images,addr,part,contact,uname,cname from bs_shangping inner join bs_user on userid=uid inner join bs_category on categoryid=cid"
	pool.query(sql,(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
});
//根据用户编号来搜索对应商品
product.get('/p1/getlist',(req,res) => {
  let _userid=req.query.userid
  let sql="select lid,lname,price,images,addr,part,contact from bs_shangping where userid=?"
  pool.query(sql,[_userid],(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//修改商品
product.post('/p1/update',(req,res) => {
  let _lid=req.body.lid
  let obj=req.body
  let sql="update bs_shangping set? where lid=?"
  pool.query(sql,[obj,_lid],(err,result) => {
    if(err)
      throw err
    if(result.affectedRows>0)
			res.send("1")
    else
      res.send("0")
  })
})
//删除商品
product.get('/p1/del',(req,res) => {
  let _lid=req.query.lid
  let sql="delete from bs_shangping where lid=?"
  pool.query(sql,[_lid],(err,result) => {
    if(err)
      throw err
    if(result.affectedRows>0)
			res.send("1")
    else
      res.send("0")
  })
})
//查询类别编号
product.get('/p1/searchcid',(req,res) => {
  let _cname=req.query.cname
  let sql="select cid from bs_category where cname=?"
  pool.query(sql,[_cname],(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//查询商品
product.get('/p1/search',(req,res) => {
  let _categoryid=req.query.categoryid
  let sql="select lid,lname,price,images,addr,part,contact,uname,cname from bs_shangping,bs_user,bs_category where categoryid=? and userid=uid and cid=?"
  pool.query(sql,[_categoryid,_categoryid],(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//计算类别数量
product.get('/p1/count',(req,res) => {
  let _categoryid=req.query.categoryid
  let sql="select count(categoryid) as count from bs_shangping where categoryid=?"
  pool.query(sql,[_categoryid],(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//获取类别名称
product.get('/p1/getcategory',(req,res) => {
  let sql="select cid,cname from bs_category"
  pool.query(sql,(err,result) => {
    if(err)
      throw err
    res.send(result)
  })
})
//导出product路由对象
module.exports=product

