<h1 align="center">MySQL学习记录</h1>


## 初识SQL语句

### 1.1 操作文件夹（库）

- **增**——`create database 库名 charset utf8;`
- **查**——`show create database 库名;`、`show databases;`
- **改**——`alter database 库名 charset gbk;`
- **删**——`drop database 库名;`

### 1.2 操作文件 （表）

> 切换文件夹：`use 库名;`
>
> 查看当前所在文件夹：`select database();`

- **增**——`create table 表名(id int, name char);`
- **查**——`show create table 表名;`、`show tables;`、`desc 表名;`
- **改**——`alter table 表名 modify name char(6);`、`alter table 表名 change name NAME char(7);`
- **删**——`drop table 表名;`

### 1.3 操作文件内容（记录）

- **增**——`insert 表名(id,name) values(1,'egon1'),(2,'egon2'),(3,'egon3');`
- **查**——`select id,name from 库名.表名;`、`select * from 库名.表名;`
- **改**——`updata 库名.表名 set name='alex';`、`updata 库名.表名 set name='alex' where id=2;`
- **删**——`delete from 表名;`、`delete from 表名 where id=2;`

---

## 库操作

### 1.1 系统数据库

- **information_schema**

  > 虚拟库，不占用磁盘空间，存储的是数据库启动后的一些参数，如用户表信息、列信息、权限信息、字符信息等

- **performance_schema**

  > MySQL 5.5开始新增的一个数据库
  >
  > 主要用于收集数据库服务器性能参数，记录处理查询请求时发生的各种事件、锁等现象

- **mysql**

  > 授权库，主要存储系统用户的权限信息

- **test**

  > MySQL数据库系统自动创建的测试数据库

### 1.2 创建数据库

#### 1.2.1 语法

```
create database 数据库名 charset utf8;
```

#### 1.2.2 数据库命名规则：

```
可以由字母、数字、下划线、@、#、$组成
区分大小写
具有唯一性
不能使用关键字，如：create、select
最长128位
```

### 1.3 数据库相关操作

```mysql
增加数据库
	——create database 库名 charset utf8;
查看数据库
	——show create database 库名;
	——show databases;
	——select database(); # 查看当前在哪个库下面
选择数据库
	——use 库名;
修改数据库
	——alter database 库名 charset gbk;
删除数据库
	——drop database 库名;
```

### 1.4 导出数据库

```mysql
导出数据库：mysqldump -u 用户名 -p 数据库名 > 导出的文件名

如::mysqldump -u root -p news > news.sql   (输入后会让你输入进入MySQL的密码)

如果导出单张表的话在数据库名后面输入表名即可

会看到文件news.sql自动生成到终端中的路径下   
```

---

## 表操作

### 1.1 存储引擎的介绍

#### 1.1.1 什么是存储引擎

mysql中建立的库===>文件夹

库中建立的表===> 文件

现实生活中我们用来存储数据的文件有不同的类型，每种文件类型对应各自不同的处理机制；比如处理文本用txt类型，处理表格用excel，处理图片用png等

数据库中的表也应该有不同的类型，表的类型不同，会对应mysql不同的存取机制，**表类型又称为存储引擎**

存储引擎说白了就是如何存储数据，如何为了存储的数据建立索引和如何更新、查询数据等技术的实现方法。因为在关系数据库中数据的存储是以表的形式存储的，所以存储引擎也可以称为表类型（即存储和操作此表的类型）

在Oracle和SQL Server等数据库中只有一种存储引擎，所有数据存储管理机制都是一样的。而MySql数据库提供了多种存储引擎。用户可以根据不同的需求为数据表选择不同的存储引擎，用户也可以根据自己的需求编写自己的存储引擎

#### 1.1.2 mysql支持的存储引擎

> MariaDB[(none)]> `show engines;`	# 查看所有支持的存储引擎
>
> MariaDB[(none)]> `show variables like 'storage_engine%';`

#### 1.1.3 指定表类型/存储引擎

```mysql
create table t1(id int)engine=innodb;
create table t2(id int)engine=memory;
create table t3(id int)engine=blackhole;
create table t4(id int)engine=myisam;
```

### 1.2 表的增删改查

#### 1.2.1 表介绍

表相当于文件，表中的一条记录就相当于文件的一行内容，不同的是，表中的一条记录有对应的标题，称为**表的字段**

#### 1.2.2 创建表

```mysql
create table 表名(
字段名1 类型[(宽度) 约束条件],
字段名2 类型[(宽度) 约束条件],
字段名3 类型[(宽度) 约束条件]
);

# 注意：
1. 在同一张表中，字段名是不能相同的
2. 宽度和约束条件可选
3. 字段名和类型是必须的
```

#### 1.2.3 查看表结构

```mysql
describe 表名;
# 查看表结构，可简写为desc 表名
show create table 表名\G;
# 查看表的详细结构，可加\G
```

#### 1.2.4 修改表结构

```
1. 修改表名
	alter table 表名
					rename 新表名;
2. 增加字段
	alter table 表名
					add 字段名 数据类型 [完整性约束条件··],
					add 字段名 数据类型 [完整性约束条件··];
	alter table 表名
					add 字段名 数据类型 [完整性约束条件··] first;
	alter table 表名
					add 字段名 数据类型 [完整性约束条件··] after 字段名;
3. 删除字段
	alter table 表名
					drop 字段名;
4. 修改字段
	alter table 表名
					modify 字段名 数据类型 [完整性约束条件··];
	alter table 表名
					change 旧字段名 新字段名 旧数据类型 [完整性约束条件··];
	alter table 表名
					change 旧字段名 新字段名 新数据类型 [完整性约束条件··];
```

#### 1.2.5 复制表

```mysql
复制表结构+记录（key不会复制；主键、外键和索引）
create table new_service select * from service;

只复制表结构（两种方法）
select * from service where 1=2; # 条件为假，查不到任何记录
create table new1_service select * from service where 1=2;
create table t4 like employees;
```

### 1.3 数据类型

#### 1.3.1 数值类型

- **整数类型**

  | 类型           | 大小  | 用途       |
  | -------------- | ----- | ---------- |
  | tiny int       | 1字节 | 小整数值   |
  | small int      | 2字节 | 大整数值   |
  | medium int     | 3字节 | 大整数值   |
  | int 或 integer | 4字节 | 大整数值   |
  | big int        | 8字节 | 极大整数值 |

  ```
  # 使用例子
  # 最小显示宽度为10，不足则0填充
  create table t1(id int(10) unsigned zerofill)
  ```

- **浮点型**

  | 类型    | 大小                                   | 用途                |
  | ------- | -------------------------------------- | ------------------- |
  | float   | 4字节                                  | 单精度<br/>浮点数值 |
  | double  | 8字节                                  | 双精度<br/>浮点数值 |
  | decimal | DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 小数值              |

  ```
  # FLOAT[(M,D)] [UNSIGNED] [ZEROFILL]
  定义：
  	单精度浮点数，m是数字总个数，d是小数点后个数，m最大值为255，d最大值为30
  
  *********************************************
  # DOUBLE[(M,D)] [UNSIGNED] [ZEROFILL]
  定义：
  	双精度浮点数，m是数字总个数，d是小数点后个数，m最大值为255，d最大值为30
  
  *********************************************
  # DECIMAL[(M,D)] [UNSIGNED] [ZEROFILL]
  定义：
  	准确的小数值，m是数字总个数（负号不算），d是小数点后个数，m最大值为65，d最大值为30
  	
  ```

#### 1.3.2 日期类型

- **使用方法**

  ```mysql
  create table student(
  	id int,
      name char(6),
      born_year year,    # 年
      birth_date date,   # 年、月、日
      class_time time,   # 时、分、秒
      reg_time, datetime # 年、月、日、时、分、秒
  );
  insert into student values(1,'egon',now(),now(),now(),now());
  ```

- **datetime与timestamp的区别**

  ```
  在实际应用的很多场景中，MySQL的这两种 日期类型都能够满足我们的需要，存储精度都为秒，但在某些情况下，会展现出他们各自的优劣。
  
  下面就来总结一下两种日期类型的区别。
  
  1. DATETIME的日期范围是1001-9999年， TIMESTAMP的时间范围是1970-2038年。
  
  2.DATETIME存储时间与时区无关，TIMESTAMP存储时间与时区有关，显示的值也依赖于时区。在mysql服务器，
  操作系统以及客户端连接都有时区的设置。
  
  3. DATETIME使用8字节的存储空间，TIMESTAMP的存储空间为4字节。因此，TIMESTAMP比IDATETIME的空间利用率更高。
  
  4.DATETIME的默认值为null; TIMESTAMP的字段默认不为空(not null),默认值为当前时间(CURRENT TIMESTAMP)，
  如果不做特殊处理，并且update语句中没有指定该列的更新值，则默认更新为当前时间。
  
  ```

#### 1.3.3 字符串类型

- **char**——定长
- **varchar**——变长

#### 1.3.4 枚举类型与集合类型

> 字段的值只能在给定范围中选择，如单选框，多选框
>
> enum 单选只能在给定的范围内选一个值，如性别sex 男male/女female
>
> set 多选在给定的范围内可以选择一个或一个以上的值(爱好1 ,爱好2,爱好...)

```mysql
create table consumer(
    id int,
    name char(16),
    sex enum('male' ,'female','other'),
    level enum('vip1','vip2','vip3')，
    hobbies set('play' ,'music','read','run')
);

insert into consumer values(1,'egon','male','vip2','music,read');

# 当传入的数据不在定好的范围内时，不会报错，而是内容为空
```

### 1.4 完整性约束

#### 1.4.1 not null 和 default

```mysql
# 性别不可以为空，如果为空，则使用默认值（男）
create table t16(
    id int,
    name char(6),
    sex enum('male' ,'female') not null default 'male'
);
```

#### 1.4.2 unique key

```mysql
# 单列唯一
# 方式一
create table department(
    id int unique,
    name char(10) unique
);
# 方式二:
create table department(
    id int,
    name char(10),
    unique(id),
    unique(name)
);

# 如果插入的数值重复，则会报错
insert into department values(1,'IT'),(2,'Sale');
```

```mysql
# 联合唯一
# ip可以重复，port可以重复，但是ip+port不可以重复
create table services(
    id int,
    ip char(15),
    port int,
    unique(id),
    unique(ip,port)
);
```

#### 1.4.3 primary key

> 约束: **not null 且 unique**
>
> 存储引擎(innodb) :对于innodb存储引擎来说，一张表内必须有一个主键
>
> 如果表中没有指定主键字段，则从上到下寻找第一个不为空且唯一的字段。如果还找不到，则用隐藏字段来作为主键

```mysql
# 单列主键
create table t17(
    id int primary key,
    name char(16)
);
insert into t17 values(1,'egon'),(2,'alex');
```

```mysql
# 复合主键
create table t19(
    ip char(15),
    port int,
    primary key(ip,port)
);

```

#### 1.4.4 auto

> **清空含有自增长字段的表时，用`truncate 表名;`命令，不要用`delete from 表名;`**
>
> **因为`delete`不会清除表对auto_increment的记录（即下一个应该记录的id）**

```mysql
# auto_ increment
create table t20(
    id int primary key auto_increment,
    name char(16)
);

# 不输入id时，id字段自动增加
insert into t20(name) values('egon'),('alex'),('wxx');

# 再输入id时，可以不按照顺序来
insert into t20(id,name) values(7,'yuanhao');

# 再再输入数据时，自增长按照最后一个记录的id增加
insert into t20(name) values('egon1'),('egon2'),('egon3'); 

```

```mysql
# 了解
	# 查看所有开头为auto_inc的变量名
    show variables like 'auto_inc%';
    # 步长:
    auto_increment_increment默认为1
    # 起始偏移量
    auto_increment_offset默认 1
    
    # 设置步长
    set session auto_increment_increment= 5;	# 本次会话有效
    set global auto_increment_increment= 5;		# 每次会话都有效，但是得重新登录生效
    
    # 设置起始偏移量
    set global auto_increment_offset=3;
    # 强调:起始偏移量 <= 步长

```

#### 1.4.5 foreign key

> **不建议使用，因为会使得表与表之间的联系很强，不利于后续的扩展**
>
> **建议直接使用程序实现其中的逻辑**

```mysql
foreign key:建立表之间的关系
#1、建立表关系:
#先建被关联的表,并且保证被关联的字段唯一
create table dep(
    id int primary key, 
    name char(16)，
    comment char(50)
);
#再建关联的表
create table emp(
    id int primary key,
    name char(10),
    sex enum('male' ,'female'),
    dep_ id int,
    foreign key(dep_ id) references dep(id)
    on delete cascade # 删除同步
    on update cascade # 更新同步
);
```

```mysql
#2.插入数据.
#先往被关联表插入记录
insert into dep values
(1,"IT","技术能力有限部门"),
(2,"销售","销售能力不足部门"),
(3,"财务","花钱特别多部门");

#再往关联表插入记录
insert into emp values
(1,'egon','male',1),
(2,'alex','male',1),
(3,'wupeiqi','female',2),
(4,'yuanhao','male',3),
(5,'jinximn','male',2);
```

### 1.5 表关系

#### 1.5.1 多对一

foreign key

#### 1.5.2 多对多

另外建立一个表，id，foreign key，foreign key

#### 1.5.3 一对一

foreign key，unique

---

## 单表查询

### 1.1 单表查询的语法

```
SELECT 字段1,字段2... FROM 表名
                  WHERE 条件
                  GROUP BY field
                  HAVING 筛选
                  ORDER BY field
                  LIMIT 限制条数
```

### 1.2 关键字的执行优先级

```
from      #找到表
where     #拿着where指定的约束条件，去表中取出一条条记录
group by  #将取出的一条条记录进行分组group by，如果没有group by，则整体作为一组
having    #将分组的结果进行having过滤
select    #执行select
distinct  #去重
order by  #将结果按条件排序
limit     #限制结果的显示条数
```

### 1.3 简单查询

#### 1.3.1 准备表和记录

```mysql
# 准备表和记录
company.employee
    员工id      id                  int             
    姓名        emp_name            varchar
    性别        sex                 enum
    年龄        age                 int
    入职日期     hire_date           date
    岗位        post                varchar
    职位描述     post_comment        varchar
    薪水        salary              double
    办公室       office              int
    部门编号     depart_id           int



#创建表
create table employee(
id int not null unique auto_increment,
name varchar(20) not null,
sex enum('male','female') not null default 'male', #大部分是男的
age int(3) unsigned not null default 28,
hire_date date not null,
post varchar(50),
post_comment varchar(100),
salary double(15,2),
office int, #一个部门一个屋子
depart_id int
);

#插入记录
#三个部门：教学，销售，运营
insert into employee(name,sex,age,hire_date,post,salary,office,depart_id) values
('egon','male',18,'20170301','沙河办事处外交大使',7300.33,401,1), #以下是教学部
('alex','male',78,'20150302','teacher',1000000.31,401,1),
('wupeiqi','male',81,'20130305','teacher',8300,401,1),
('yuanhao','male',73,'20140701','teacher',3500,401,1),
('liwenzhou','male',28,'20121101','teacher',2100,401,1),
('jingliyang','female',18,'20110211','teacher',9000,401,1),
('jinxin','male',18,'19000301','teacher',30000,401,1),
('成龙','male',48,'20101111','teacher',10000,401,1),

('歪歪','female',48,'20150311','sale',3000.13,402,2),#以下是销售部门
('丫丫','female',38,'20101101','sale',2000.35,402,2),
('丁丁','female',18,'20110312','sale',1000.37,402,2),
('星星','female',18,'20160513','sale',3000.29,402,2),
('格格','female',28,'20170127','sale',4000.33,402,2),

('张野','male',28,'20160311','operation',10000.13,403,3), #以下是运营部门
('程咬金','male',18,'19970312','operation',20000,403,3),
('程咬银','female',18,'20130311','operation',19000,403,3),
('程咬铜','male',18,'20150411','operation',18000,403,3),
('程咬铁','female',18,'20140512','operation',17000,403,3);

#ps：如果在windows系统中，插入中文字符，select的结果为空白，可以将所有字符编码统一设置成gbk

准备表和记录
```

#### 1.3.2 简单查询

```mysql
#简单查询
    SELECT id,name,sex,age,hire_date,post,post_comment,salary,office,depart_id 
    FROM employee;

    SELECT * FROM employee;

    SELECT name,salary FROM employee;

#避免重复DISTINCT
    SELECT DISTINCT post FROM employee;    

#通过四则运算查询
    SELECT name, salary*12 FROM employee;
    SELECT name, salary*12 AS Annual_salary FROM employee;
    SELECT name, salary*12 Annual_salary FROM employee;

#定义显示格式
   CONCAT() 函数用于连接字符串
   SELECT CONCAT('姓名: ',name,'  年薪: ', salary*12)  AS Annual_salary 
   FROM employee;
   
   CONCAT_WS() 第一个参数为分隔符
   SELECT CONCAT_WS(':',name,salary*12)  AS Annual_salary 
   FROM employee;

   结合CASE语句：
   SELECT
       (
           CASE
           WHEN NAME = 'egon' THEN
               NAME
           WHEN NAME = 'alex' THEN
               CONCAT(name,'_BIGSB')
           ELSE
               concat(NAME, 'SB')
           END
       ) as new_name
   FROM
       emp;
```

### 1.4 where 约束

> where字句中可以使用：
>
> 1. 比较运算符：> < >= <= <> !=
> 2. between 80 and 100 值在10到20之间
> 3. in(80,90,100) 值是10或20或30
> 4. like 'egon%'
>      pattern可以是%或_，
>      %表示任意多字符
>      _表示一个字符
> 5. 逻辑运算符：在多个条件直接可以使用逻辑运算符 and or not

#### 1.4.1 单条件查询

```mysql
SELECT name FROM employee WHERE post='sale';
```

#### 1.4.2 多条件查询

```mysql
SELECT name,salary FROM employee WHERE post='teacher' AND salary>10000;
```

#### 1.4.3 关键字 between and

```mysql
SELECT name,salary FROM employee WHERE salary BETWEEN 10000 AND 20000;

SELECT name,salary FROM employee WHERE salary NOT BETWEEN 10000 AND 20000;
```

#### 1.4.4 关键字 is null

```mysql
SELECT name,post_comment FROM employee WHERE post_comment IS NULL;

SELECT name,post_comment FROM employee WHERE post_comment IS NOT NULL;
        
SELECT name,post_comment FROM employee WHERE post_comment=''; 
# 注意''是空字符串，不是null
# 执行update employee set post_comment='' where id=2;再用上条查看，就会有结果了
```

#### 1.4.5 关键字 in 集合查询

```mysql
SELECT name,salary FROM employee WHERE salary=3000 OR salary=3500 OR salary=4000 OR salary=9000 ;
    
SELECT name,salary FROM employee WHERE salary IN (3000,3500,4000,9000);

SELECT name,salary FROM employee WHERE salary NOT IN (3000,3500,4000,9000) ;
```

#### 1.4.6 关键字 like 模糊查询

```mysql
# 通配符’%’
SELECT * FROM employee WHERE name LIKE 'eg%';

# 通配符’_’
SELECT * FROM employee WHERE name LIKE 'al__';
```

### 1.5 分组查询 group by

#### 1.5.1 什么是分组？为什么要分组？

> 1、首先明确一点：分组发生在where之后，即分组是基于where之后得到的记录而进行的
>
> 2、分组指的是：将所有记录按照某个相同字段进行归类，比如针对员工信息表的职位分组，或者按照性别进行分组等
>
> 3、为何要分组呢？
>     取每个部门的最高工资
>     取每个部门的员工数
>     取男人数和女人数
>
> 小窍门：‘每’这个字后面的字段，就是我们分组的依据
>
> 4、大前提：
>     可以按照任意字段分组，但是分组完毕后，比如group by post，只能查看post字段，如果想查看组内信息，需要借助于聚合函数

#### 1.5.2 only_full_group_by

```mysql
#查看MySQL 5.7默认的sql_mode如下：
mysql> select @@global.sql_mode;
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

#！！！注意
ONLY_FULL_GROUP_BY的语义就是确定select target list中的所有列的值都是明确语义，简单的说来，在ONLY_FULL_GROUP_BY模式下，target list中的值要么是来自于聚集函数的结果，要么是来自于group by list中的表达式的值。


#设置sql_mole如下操作(我们可以去掉ONLY_FULL_GROUP_BY模式)：
mysql> set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

！！！SQL_MODE设置！！！
```

```mysql
mysql> select @@global.sql_mode;
+-------------------+
| @@global.sql_mode |
+-------------------+
|                   |
+-------------------+
1 row in set (0.00 sec)

mysql> select * from emp group by post; 
+----+------+--------+-----+------------+----------------------------+--------------+------------+--------+-----------+
| id | name | sex    | age | hire_date  | post                       | post_comment | salary     | office | depart_id |
+----+------+--------+-----+------------+----------------------------+--------------+------------+--------+-----------+
| 14 | 张野 | male   |  28 | 2016-03-11 | operation                  | NULL         |   10000.13 |    403 |         3 |
|  9 | 歪歪 | female |  48 | 2015-03-11 | sale                       | NULL         |    3000.13 |    402 |         2 |
|  2 | alex | male   |  78 | 2015-03-02 | teacher                    | NULL         | 1000000.31 |    401 |         1 |
|  1 | egon | male   |  18 | 2017-03-01 | 老男孩驻沙河办事处外交大使 | NULL         |    7300.33 |    401 |         1 |
+----+------+--------+-----+------------+----------------------------+--------------+------------+--------+-----------+
4 rows in set (0.00 sec)


#由于没有设置ONLY_FULL_GROUP_BY,于是也可以有结果，默认都是组内的第一条记录，但其实这是没有意义的

mysql> set global sql_mode='ONLY_FULL_GROUP_BY';
Query OK, 0 rows affected (0.00 sec)

mysql> quit #设置成功后，一定要退出，然后重新登录方可生效
Bye

mysql> use db1;
Database changed
mysql> select * from emp group by post; #报错
ERROR 1055 (42000): 'db1.emp.id' isn't in GROUP BY
mysql> select post,count(id) from emp group by post; #只能查看分组依据和使用聚合函数
+----------------------------+-----------+
| post                       | count(id) |
+----------------------------+-----------+
| operation                  |         5 |
| sale                       |         5 |
| teacher                    |         7 |
| 老男孩驻沙河办事处外交大使 |         1 |
+----------------------------+-----------+
4 rows in set (0.00 sec)
```

#### 1.5.3 GROUP BY

```mysql
单独使用GROUP BY关键字分组
    SELECT post FROM employee GROUP BY post;
    注意：我们按照post字段分组，那么select查询的字段只能是post，想要获取组内的其他相关信息，需要借助函数

GROUP BY关键字和GROUP_CONCAT()函数一起使用
    SELECT post,GROUP_CONCAT(name) FROM employee GROUP BY post;#按照岗位分组，并查看组内成员名
    SELECT post,GROUP_CONCAT(name) as emp_members FROM employee GROUP BY post;

GROUP BY与聚合函数一起使用
    select post,count(id) as count from employee group by post;#按照岗位分组，并查看每个组有多少人
```

#### 1.5.4 聚合函数

```mysql
#强调：聚合函数聚合的是组的内容，若是没有分组，则默认一组

#示例：
    SELECT COUNT(*) FROM employee;
    SELECT COUNT(*) FROM employee WHERE depart_id=1;
    SELECT MAX(salary) FROM employee;
    SELECT MIN(salary) FROM employee;
    SELECT AVG(salary) FROM employee;
    SELECT SUM(salary) FROM employee;
    SELECT SUM(salary) FROM employee WHERE depart_id=3;
```

### 1.6 having过滤

> 执行优先级从高到低：where > group by > having 
>
> 1. Where 发生在分组group by之前，因而Where中可以有任意字段，但是绝对不能使用聚合函数。
>
> 2. Having发生在分组group by之后，因而Having中可以使用分组的字段，无法直接取到其他字段,可以使用聚合函数

```mysql
mysql> select @@sql_mode;
+--------------------+
| @@sql_mode         |
+--------------------+
| ONLY_FULL_GROUP_BY |
+--------------------+
1 row in set (0.00 sec)

mysql> select * from emp where salary > 100000;
+----+------+------+-----+------------+---------+--------------+------------+--------+-----------+
| id | name | sex  | age | hire_date  | post    | post_comment | salary     | office | depart_id |
+----+------+------+-----+------------+---------+--------------+------------+--------+-----------+
|  2 | alex | male |  78 | 2015-03-02 | teacher | NULL         | 1000000.31 |    401 |         1 |
+----+------+------+-----+------------+---------+--------------+------------+--------+-----------+
1 row in set (0.00 sec)

mysql> select * from emp having salary > 100000;
ERROR 1463 (42000): Non-grouping field 'salary' is used in HAVING clause

mysql> select post,group_concat(name) from emp group by post having salary > 10000;#错误，分组后无法直接取到salary字段
ERROR 1054 (42S22): Unknown column 'salary' in 'having clause'
mysql> select post,group_concat(name) from emp group by post having avg(salary) > 10000;
+-----------+-------------------------------------------------------+
| post | group_concat(name) |
+-----------+-------------------------------------------------------+
| operation | 程咬铁,程咬铜,程咬银,程咬金,张野 |
| teacher | 成龙,jinxin,jingliyang,liwenzhou,yuanhao,wupeiqi,alex |
+-----------+-------------------------------------------------------+
2 rows in set (0.00 sec)

验证
```

### 1.7 查询排序 ORDER BY

```mysql
# 按单列排序
    SELECT * FROM employee ORDER BY salary;
    SELECT * FROM employee ORDER BY salary ASC;
    SELECT * FROM employee ORDER BY salary DESC;

# 按多列排序:先按照age排序，如果年纪相同，则按照薪资排序
    SELECT * from employee ORDER BY age, salary DESC;
```

### 1.8 限制查询的记录数 LIMIT

```mysql
# 默认初始位置为0 
SELECT * FROM employee ORDER BY salary DESC LIMIT 3;  

# 从第0开始，即先查询出第一条，然后包含这一条在内往后查5条
SELECT * FROM employee ORDER BY salary DESC LIMIT 0,5; 

# 从第5开始，即先查询出第6条，然后包含这一条在内往后查5条
SELECT * FROM employee ORDER BY salary DESC LIMIT 5,5; 
```

### 1.9 正则表达式查询

```mysql
SELECT * FROM employee WHERE name REGEXP '^ale';

SELECT * FROM employee WHERE name REGEXP 'on$';

SELECT * FROM employee WHERE name REGEXP 'm{2}';

# 小结：对字符串匹配的方式
WHERE name = 'egon';
WHERE name LIKE 'yua%';
WHERE name REGEXP 'on$';
```

