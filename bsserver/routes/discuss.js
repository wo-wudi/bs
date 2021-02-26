//引入连接池模块
const pool=require('../pool')
const express=require('express');
var query=require("./query");
//创建路由器对象
const discuss=express.Router();
//添加路由
//1.获取评论
discuss.get('/d1/getdiscuss',(req,res) => {
	let sql="select did,dtime,dinner,dscore,uname from bs_discuss,bs_user where duserid=uid"
	pool.query(sql,(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
});
//2.添加评论
discuss.post('/d1/raisediscuss',(req,res) => {
  let obj=req.body
  let sql="insert into bs_discuss set?"
  pool.query(sql,[obj],(err,result) => {
    if(err)
      throw err
    if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
  })
});
//3.删除评论
discuss.get('/d1/del',(req,res) => {
	let _did=req.query.did
	let sql="delete from bs_discuss where did=?"
	pool.query(sql,[_did],(err,result) => {
		if(err)
		 	throw err
		if(result.affectedRows>0)
			res.send("1")
    else
      res.send("0")
	})
});
//4.搜索评论
discuss.get('/d1/search',(req,res) => {
	let _dscore=req.query.dscore
	let sql="select did,dtime,dinner,dscore,uname from bs_discuss,bs_user where dscore=? and duserid=uid"
	pool.query(sql,[_dscore],(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
})
//5.获取评分
discuss.get('/d1/getdscore',(req,res) => {
	let sql="select dscore from bs_discuss"
	pool.query(sql,(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
})
//导出路由器对象
module.exports=discuss;
