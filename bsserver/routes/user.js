//引入连接池模块
const pool=require('../pool')
const express=require('express');
var query=require("./query");
//加载MD5模块
const md5=require('md5')
//创建路由器对象
const user=express.Router();
//添加路由
//1.登录模块  get "/pro/v1/login/:uname&:upwd"
user.post("/u1/login",(req,res) => {
	let _stuNum=req.body.stuNum;
	let _upwd=req.body.upwd;
	let sql="select uid,uname from bs_user where stuNum=? and upwd=MD5(?)"
	pool.query(sql,[_stuNum,_upwd],(err,result) => {
		if(err)
			throw err;
		if(result.length>0)
			res.send(result)
		else
			res.send("0")
	})
})
//2.用户列表  get "/pro/v1/list"
user.get("/u1/list",(req,res) => {
	let pagesize=parseInt(req.query.pagesize)
	let pagenum=parseInt(req.query.pagenum)
	let offset=(pagenum-1)*pagesize
	let sql="select count(uid) as count from bs_user"
	pool.query(sql,(err,result) => {
		if(err)
			throw err
		if(result.length>0){
			let length=result[0].count
			sql="select uid,uname,phone,stuNum,userName from bs_user limit ?,?"
			pool.query(sql,[offset,pagesize],(err,result) => {
				if(err)
					throw err
				res.send({result:result,length:length});
			})
		}
	})
})
//3.根据uid删除用户
user.get("/u1/del",(req,res) => {
	let _uid=req.query.uid;
	let sql="delete from bs_user where uid=?"
	pool.query(sql,[_uid],(err,result) => {
		if(err)
			throw err;
		if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
	})
})
//4.根据uid查询用户
user.get("/u1/search",(req,res) => {
	let _uid=req.query.uid;
	let sql="select uid,uname,phone,stuNum,userName from bs_user where uid=?"
	pool.query(sql,[_uid],(err,result) => {
		if(err)
			throw err
		if(result.length>0)
			res.send(result)
		else
			res.send("0")
	})
})
//5.根据uid修改用户信息
user.post("/u1/update",(req,res) => {
	let _uid=req.body.uid;
	let obj=req.body;
	let sql="update bs_user set? where uid=?"
	pool.query(sql,[obj,_uid],(err,result) => {
		if(err)
			throw err
		if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
	})
})
//6.验证是否已存在该用户，注册用户
user.post("/u1/reg",(req,res) => {
	let _uname=req.body.uname;
	let _phone=req.body.phone;
	let _stuNum=req.body.stuNum
	let _user_name=req.body.userName;
	let _upwd=req.body.upwd
	let sql="select uname from bs_user where stuNum=?"
	pool.query(sql,[_stuNum],(err,result) => {
		if(err)
			throw err
		if(result.length>0)
			res.send("0")
		else{
			sql="insert into bs_user values(null,?,MD5(?),?,?,?)"
			pool.query(sql,[_uname,_upwd,_phone,_stuNum,_user_name],(err,result) => {
				if(err)
					throw err;
				if(result.affectedRows>0)
					res.send("1")
			})
		}
	})
})
//7.根据stuNum修改密码
user.post("/u1/updateupwd",(req,res) => {
	let _stuNum=req.body.stuNum;
	let _upwd=req.body.upwd;
	let sql="update bs_user set upwd=MD5(?) where stuNum=?"
	pool.query(sql,[_upwd,_stuNum],(err,result) => {
		if(err)
			throw err
		if(result.affectedRows>0)
			res.send("1")
		else
			res.send("0")
	})
})
//8.用户信息
user.get('/u1/getinfo',(req,res) => {
	let _uid=req.query.uid
	let sql="select uname,phone,stuNum,userName from bs_user where uid=?"
	pool.query(sql,[_uid],(err,result) => {
		if(err)
			throw err
		res.send(result)
	})
})
//导出路由器对象
module.exports=user;
