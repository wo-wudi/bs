#设计客户端连接服务器端的编码
set names utf8;
#丢弃数据库如果存在
drop database if exists bs;
#创建数据库，设计编码
create database bs charset=utf8;
#进入数据库
use bs;
#创建用户信息表
create table bs_user(
  uid int unsigned primary key auto_increment,
  uname varchar(12) NOT NULL comment '用户名',
  upwd varchar(64) NOT NULL comment '密码',
  phone char(11) NOT NULL comment '手机号',
  stuNum int unsigned NOT NULL comment '学号',
  userName varchar(32) NOT NULL comment '用户真实姓名'
);
insert into bs_user values(1,'aa','e10adc3949ba59abbe56e057f20f883e',13514565678,171549501,'鞥');
insert into bs_user values(2,'bb','e10adc3949ba59abbe56e057f20f883e',13516155678,171549502,'恩斯克');
insert into bs_user values(3,'cc','e10adc3949ba59abbe56e057f20f883e',13832345678,171549503,'康');
insert into bs_user values(4,'ddd','e10adc3949ba59abbe56e057f20f883e',13512574678,171549504,'闸并提');
insert into bs_user values(5,'dingd','e10adc3949ba59abbe56e057f20f883e',13513585678,171549505,'恩佐');
insert into bs_user values(6,'dingding','e10adc3949ba59abbe56e057f20f883e',13591245678,171549506,'寰宇');
insert into bs_user values(7,'denadas','e10adc3949ba59abbe56e057f20f883e',13589255678,171549507,'城际时');
insert into bs_user values(8,'famsdi','e10adc3949ba59abbe56e057f20f883e',13511385678,171549508,'无忌季');
insert into bs_user values(9,'qejaosd','e10adc3949ba59abbe56e057f20f883e',13512393678,171549509,'毒液');
insert into bs_user values(10,'afamxcasw','e10adc3949ba59abbe56e057f20f883e',13512345721,171549510,'克利夫兰');
insert into bs_user values(11,'dingding','e10adc3949ba59abbe56e057f20f883e',13513584138,171549511,'李春威');
insert into bs_user values(12,'ajmklasodji','e10adc3949ba59abbe56e057f20f883e',13513164895,171549512,'李春威');
insert into bs_user values(13,'okafsjio','e10adc3949ba59abbe56e057f20f883e',13516710235,171549513,'基色传说');
insert into bs_user values(14,'asdmkoc','e10adc3949ba59abbe56e057f20f883e',13865230149,171549514,'恩佐啦');
insert into bs_user values(15,'dingding','e10adc3949ba59abbe56e057f20f883e',13512321645,171549515,'德恒嘶');
insert into bs_user values(16,'diojxmcoi','e10adc3949ba59abbe56e057f20f883e',13512345678,171549516,'哞哞');
#创建管理员信息表
create table bs_admin(
  aid int unsigned primary key auto_increment,
  aname varchar(12) NOT NULL comment '管理员登录名',
  apwd varchar(64) NOT NULL comment '管理员登录密码',
  acode int default 58246 comment '管理员登录码'
);
insert into bs_admin values(1,'ranran','e10adc3949ba59abbe56e057f20f883e',default);
#创建商品表
create table bs_shangping(
  lid int unsigned primary key auto_increment,
  lname varchar(128) NOT NULL comment '商品名称',
  price decimal(4,2) NOT NULL comment '价格',
  images varchar(128) NOT NULL comment '图片路径',
  contact varchar(36) NOT NULL comment '联系方式',
  addr varchar(20) NOT NULL comment '交易地点',
  part varchar(20) NOT NULL comment '交易地点',
  userid int unsigned NOT NULL comment '外键,用户id',
  categoryid int unsigned NOT NULL comment '外键,类别id'
);
insert into bs_shangping values(1,'新鲜芒果','34.11','img/list/food/product-1.jpg','13865230149','南苑','13栋',14,1);
insert into bs_shangping values(2,'鲜榨芒果汁','53.21','img/list/food/product-2.jpg','13512345678','北苑','饭堂3楼',16,1);
insert into bs_shangping values(3,'一袋坚果','46.33','img/list/food/product-3.jpg','13512345678','北苑','操场',16,1);
insert into bs_shangping values(4,'黑糖薯片','59.33','img/list/food/product-4.jpg','13591245678','南苑','自习室',6,1);
insert into bs_shangping values(5,'核桃脑','46.13','img/list/food/product-5.jpg','13513585678','南苑','超市',5,1);
insert into bs_shangping values(6,'番茄沙示','69.99','img/list/food/product-6.jpg','13865230149','南苑','7栋',14,1);
insert into bs_shangping values(7,'酸死人','13.69','img/list/food/product-7.jpg','13514565678','北苑','23栋',1,1);
insert into bs_shangping values(8,'柚子和橙子','31.65','img/list/food/product-8.jpg','13514565678','北苑','23栋',1,1);
insert into bs_shangping values(9,'腰果','46.55','img/list/food/product-9.jpg','13513585678','南苑','超市',5,1);
insert into bs_shangping values(10,'香甜脐橙','45.89','img/list/food/product-10.jpg','13512393678','北苑','超市',9,1);
insert into bs_shangping values(11,'大咪咪','49.81','img/list/food/product-11.jpg','13512393678','北苑','超市',9,1);
insert into bs_shangping values(12,'洋葱圈','43.56','img/list/food/product-12.jpg','13512393678','北苑','超市',9,1);
insert into bs_shangping values(13,'千层酥','41.30','img/list/food/product-13.jpg','13514565678','北苑','23栋',1,1);
insert into bs_shangping values(14,'巨无霸','85.53','img/list/food/product-14.jpg','13516710235','南苑','五楼饭堂',13,1);
insert into bs_shangping values(15,'百香果汁','43.31','img/list/food/product-15.jpg','13513585678','南苑','超市',5,1);
insert into bs_shangping values(16,'三文鱼','98.35','img/list/food/product-16.jpg','13516710235','南苑','五楼饭堂',13,1);
insert into bs_shangping values(17,'人性的弱点','38.50','img/list/book/1.jpg','13516155678','南苑','五楼饭堂',2,2);
insert into bs_shangping values(18,'中华上下五年','58.10','img/list/book/2.jpg','13516155678','南苑','五楼饭堂',2,2);
insert into bs_shangping values(19,'提高情商','41.31','img/list/book/3.jpg','13516155678','北苑','21栋',2,2);
insert into bs_shangping values(20,'圣经的历史','23.20','img/list/book/4.jpg','13591245678','南苑','13栋',6,2);
insert into bs_shangping values(21,'生命哲学书','51.45','img/list/book/5.jpg','13589255678','南苑','10栋',7,2);
insert into bs_shangping values(22,'薛兆丰经济学讲义','41.31','img/list/book/6.jpg','13511385678','北苑','20栋',8,2);
insert into bs_shangping values(23,'中性笔一盒','15.30','img/list/study/1.jpg','13512345721','北苑','20栋',10,3);
insert into bs_shangping values(24,'彩色铅笔','15.55','img/list/study/2.jpg','13832345678','北苑','20栋',3,3);
insert into bs_shangping values(25,'彩色水笔','18.20','img/list/study/3.jpg','13512574678','北苑','21栋',4,3);
insert into bs_shangping values(26,'一盒笔芯','19.50','img/list/study/4.jpg','13513585678','北苑','24栋',5,3);
insert into bs_shangping values(27,'毛笔','25.00','img/list/study/5.jpg','13591245678','北苑','17栋',6,3);
insert into bs_shangping values(28,'薄笔记本','6.68','img/list/study/6.jpg','13513584138','北苑','22栋',11,3);
insert into bs_shangping values(29,'厚笔记本','8.57','img/list/study/7.jpg','13513164895','南苑','8栋',12,3);
insert into bs_shangping values(30,'字帖','5.00','img/list/study/8.jpg','13865230149','南苑','12栋',14,3);
insert into bs_shangping values(31,'正楷字帖','6.00','img/list/study/9.jpg','13512345678','南苑','13栋',16,3);
insert into bs_shangping values(32,'篮球一个','56.00','img/list/sports/1.jpg','13513164895','南苑','13栋',12,4);
insert into bs_shangping values(33,'乒乓球拍一副','16.20','img/list/sports/2.jpg','13516710235','南苑','12栋',13,4);
insert into bs_shangping values(34,'全新羽毛球5个','4.00','img/list/sports/3.jpg','13514565678','南苑','11栋',1,4);
insert into bs_shangping values(35,'小型床上书桌','14.38','img/list/desk/1.jpg','13513164895','北苑','18栋',12,5);
insert into bs_shangping values(36,'中型床上书桌','24.49','img/list/desk/2.jpg','13512574678','南苑','11栋',4,5);
insert into bs_shangping values(37,'大型床上书桌','34.14','img/list/desk/3.jpg','13511385678','北苑','21栋',8,5);
insert into bs_shangping values(38,'化妆棉一包','19.28','img/list/beatu/1.jpg','13511385678','北苑','22栋',8,6);
insert into bs_shangping values(39,'九成新卸妆水','15.35','img/list/beatu/2.jpg','13512393678','北苑','19栋',9,6);
insert into bs_shangping values(40,'四瓶十成新卸妆水','25.44','img/list/beatu/3.jpg','13865230149','北苑','17栋',14,6);
insert into bs_shangping values(41,'大包卸妆棉','15.26','img/list/beatu/4.jpg','13512345721','南苑','10栋',10,6);
#创建类目表
create table bs_category(
  cid int unsigned primary key auto_increment,
  cname varchar(16) NOT NULL comment '商品名称',
  cpath varchar(16) NOT NULL comment '商品路径'
);
insert into bs_category values(1,'食品','food');
insert into bs_category values(2,'书籍','book');
insert into bs_category values(3,'学习用品','study');
insert into bs_category values(4,'运动用品','sports');
insert into bs_category values(5,'书桌','desk');
insert into bs_category values(6,'化妆品','beatu');
#创建评论表
create table bs_discuss(
  did int unsigned primary key auto_increment,
  dtime bigint unsigned NOT NULL comment '评论时间',
  dinner varchar(128) NOT NULL comment '评论内容',
  dscore int unsigned NOT NULL comment '评论分数',
  duserid int unsigned NOT NULL comment '外键，评论用户id'
);
insert into bs_discuss values(1,1601456574482,'这网页做的真不错',1,1);
insert into bs_discuss values(2,1607836102365,'这网页做的好',3,3);
insert into bs_discuss values(3,1619506458741,'这个算是跳蚤市场了',5,1);
insert into bs_discuss values(4,1601596012369,'这网页做的真不错这网页做的真不错这网页做的真不错这网页做的真不错这网页做的真不错这网页做的真不错这网页做的真不错',4,11);
insert into bs_discuss values(5,1603486120485,'解决了我留在宿舍的东西，这网页做的还不错',3,10);
insert into bs_discuss values(6,1614856695410,'还在烦怎么解决留在宿舍的东西，这网页帮忙解决',4,10);
insert into bs_discuss values(7,1615846031025,' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nulla soluta labore ut cumque laboriosam quisquam voluptate. Ratione, aut consequatur quae minima velit, commodi enim, fugiat veniam quibusdam nulla earum.',4,14);
insert into bs_discuss values(8,1610396478103,'点赞点赞',2,13);
insert into bs_discuss values(9,1618756102974,' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nulla soluta labore ut cumque laboriosam quisquam voluptate. Ratione, aut consequatur quae minima velit, commodi enim, fugiat veniam quibusdam nulla earum.',4,7);
insert into bs_discuss values(10,1614566157402,'感觉还是挺不错的',5,9);
insert into bs_discuss values(11,1615896365014,'呸',2,7);
insert into bs_discuss values(12,1610346109871,'阿忒',1,5);
insert into bs_discuss values(13,1616946478103,'还行吧',3,3);
insert into bs_discuss values(14,1610576415263,'我也能做出来',3,11);
#创建首页走马灯卡片式图片表
create table bs_indexcard(
  imageid int unsigned primary key auto_increment,
  imagepath varchar(100) NOT NULL comment '走马灯卡片式图片路径'
);
insert into bs_indexcard values(1,'img/index/card/1.jpg');
insert into bs_indexcard values(2,'img/index/card/2.jpg');
insert into bs_indexcard values(3,'img/index/card/3.jpg');
insert into bs_indexcard values(4,'img/index/card/4.jpg');
insert into bs_indexcard values(5,'img/index/card/5.jpg');
insert into bs_indexcard values(6,'img/index/card/6.jpg');
#创建首页食品轮播图表
create table bs_indexlunbo(
  lunboid int unsigned primary key auto_increment,
  lunbopath varchar(100) NOT NULL comment '轮播图片路径'
);
insert into bs_indexlunbo values(1,'img/index/lunbo/1.jpg');
insert into bs_indexlunbo values(2,'img/index/lunbo/2.jpg');
insert into bs_indexlunbo values(3,'img/index/lunbo/3.jpg');
insert into bs_indexlunbo values(4,'img/index/lunbo/4.jpg');
insert into bs_indexlunbo values(5,'img/index/lunbo/5.jpg');
insert into bs_indexlunbo values(6,'img/index/lunbo/6.jpg');
insert into bs_indexlunbo values(7,'img/index/lunbo/7.jpg');
insert into bs_indexlunbo values(8,'img/index/lunbo/8.jpg');
insert into bs_indexlunbo values(9,'img/index/lunbo/1.jpg');
insert into bs_indexlunbo values(10,'img/index/lunbo/2.jpg');
insert into bs_indexlunbo values(11,'img/index/lunbo/3.jpg');
insert into bs_indexlunbo values(12,'img/index/lunbo/4.jpg');
#创建首页走马灯卡片式图片表
create table bs_indexcarousel(
  carouselid int unsigned primary key auto_increment,
  carouselpath varchar(100) NOT NULL comment '走马灯图片路径',
  carouselinto varchar(100) NOT NULL comment '介绍',
  carouselsinto varchar(100) NOT NULL comment '介绍'
);
insert into bs_indexcarousel values(1,'img/index/carousel/banner1.jpg','本网站致力于解决各个学生的闲置物品问题','希望可能获得广大学生的认可');
insert into bs_indexcarousel values(2,'img/index/carousel/banner2.jpg','学生既是商品买家','也可以当商品卖家');
insert into bs_indexcarousel values(3,'img/index/carousel/banner3.jpg','根据自己的需求','购买相应的物品');
insert into bs_indexcarousel values(4,'img/index/carousel/banner4.jpg','可以将自己的闲置物品上线','根据自身情况定交易地点');
insert into bs_indexcarousel values(5,'img/index/carousel/banner5.png','注意一定要写自己的联系方式','方便买家联系');
#创建首页类别表
create table bs_indexcategory(
  cateid int unsigned primary key auto_increment,
  cateimagepath varchar(100) NOT NULL comment '类别图片路径',
  catearticle varchar(12) NOT NULL comment '类别名称',
  catedetail varchar(12) NOT NULL comment '类别副名称'
);
insert into bs_indexcategory values(1,'img/index/category/1.jpg','零食饮料','适合吃货');
insert into bs_indexcategory values(2,'img/index/category/2.jpg','书籍书本','闲置书籍');
insert into bs_indexcategory values(3,'img/index/category/3.jpg','笔记本','课堂笔记');
insert into bs_indexcategory values(4,'img/index/category/4.jpg','运动健康','运动栏目');
insert into bs_indexcategory values(5,'img/index/category/5.jpg','书桌台灯','挑灯夜读');
insert into bs_indexcategory values(6,'img/index/category/6.jpg','美妆用品','爱美的你');