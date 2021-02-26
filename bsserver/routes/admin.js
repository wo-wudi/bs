//引入连接池模块
const pool=require('../pool')
const express=require('express');
var query=require("./query");
//创建路由器对象
const admin=express.Router();
//添加路由
//1.登录模块  get "/pro/v1/login/:uname&:upwd"
admin.post("/a1/login",(req,res) => {
	let _aname=req.body.aname;
	let _apwd=req.body.apwd;
	let _acode=req.body.acode
	let sql="select aname,apwd,acode from bs_admin where aname=? and apwd=MD5(?) and acode=?"
	pool.query(sql,[_aname,_apwd,_acode],(err,result) => {
		if(err)
			throw err;
		if(result.length>0)
			res.send(result)
		else
			res.send("0")
	})
})
//2.注册用户
admin.post("/a1/reg",(req,res) => {
	let _aname=req.body.aname
	let _apwd=req.body.apwd
	let sql="insert bs_admin(aname,apwd) values(?,MD5(?))"
	pool.query(sql,[_aname,_apwd],(err,result) => {
		if(err)
			throw err;
		if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
	})
})
//导出路由器对象
module.exports=admin;
