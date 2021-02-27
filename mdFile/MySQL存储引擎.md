#### 存储引擎

> 存储引擎其实就是如何存储数据，如何为储存数据建立索引和如何更新数据等技术的实现方法
>
> 因为关系型数据库中的数据是以表的形式储存的，所以存储引擎也可以称为表类型



#### 查询MySQL存储引擎

```
show engines;

show engines \g

以上两行代码是相同作用的

show engines \G 可以使得查询的结果更加美观
```

```
show variables like 'have%';
```



#### InnoDB存储引擎

```

InnoDB给MySQL提供的表事务，回滚，崩溃修复能力和多版本并发控制的事务安全，InnoDB也是MYSQL上第一个提供外键约束表引擎


InnoDB存储引擎中支持自动增长列AUTO_INCREAMENT. 自动增长列的值不能为空而且必须唯一，MySQL中规定自动增长必须为主键。


也就是当插入值时，会自动增长


InnoDB支持外键，外键所在的表为子表，外键所依赖的表为父表，父表中被外键关联的字段必须为主键


在InnoDB引擎中，创建的表的表结构存储在 .frm文件中，数据和引擎存储在 innodb_data_home_dir 和 innodb_data_file_path表中


但是其读写效率比较差，占用空间相对比较大

```



#### MyISAM存储引擎

```
frm表存储的结构

myd 存储数据，是MYData的简写

myi 存储索引，是MYIndex的简写
```



#### 数字类型

```
整型

TINYINT: 最小整数，有符号的范围：-127-127，无符号的范围：0-255，一个字节

BOOL: 最小整数，有符号的范围：-127-127，无符号的范围：0-255，一个字节

SMALLINT: 小型整数，有符号的范围：-32768-32767，无符号的范围：0-65536，两个字节

INT: 标准整数，4字节，

BIGINT: 大整数
```

```
浮点型

FLOAT: 单精度

DOUBLE: 双精度

DECIMAL: 可变
```



#### 选择技巧

```
选择最小的可用性，如果值永远小于127，则使用TINYINT比INT好

对于完全都是数字的，可以选择整数类型

浮点型用于可能具有小数，例如购物单价，网上交付金额
```



#### 字符串类型

```
普通文本字符串：CHAR和VARCHAR类型

可变类型：TEXT和BLOB

特殊类型：SET和ENUM
```



#### 普通文本字符串

> CHAR的长度是被固定的，VARCHAR长度是可变的，都是0-255个字符



#### 可变类型

```
大小可变，TEXT更适合用于存储长文本类型，

BLOB更适合于存储二进制数据，例如 图片，声音，文本。
```



#### 特殊类型

```
存储枚举值 Enum('value1','value2')

存储集合值 Set('value1','value2')
```



#### 选择技巧

```
当从速度方面考虑，优先选择CHAR类型

要节省空间，使用动态咧，可以选择VARCHAR

要列出内容限制在一种选择，可以使用ENUM类型

允许在一个列中有多于一条的条目，可以使用SET类型

如果要搜索内容不区分大小，可以使用TEXT类型

如果搜索的内容区分大小，可以使用BLOB类型
```



#### 日期和日期类型

```
DATE 日期格式YYYY-MM-DD

TIME 时间格式HH:MM:SS

DATETIME 日期和时间格式YYYY-MM-DD HH:MM:SS

TIMESTAMP 时间标签 1907-01-01 00:00:00  2037年的某个时间

YEAR 1901-2155
```



#### 算术运算符

```

= : 空值不能用(NULL) select id,books,id=27 from tb_books;

<>和!= : 空值不能用(NULL) select id,books,row<>1,row!=41,row!=24 from tb_books where id=27;

\> : 空值不能用(NULL) select id, books, roow>90 from tb_books;

IS NULL : select id,books,row IS NULL from tb_books;

BETWEEN AND : select row,row between 10 and 50, row between 25 and 28 from tb_books;

IN : select row,row IN(10,95,30) from tb_books;

LIKE : select user,user like "mr",user like "%1%" from tb_books;

```



#### 创建数据库

```
create database 数据库名;

创建数据库的时候，我们应该记住以下几点：

1 不能与其他数据库名重复

2 名称可以由任意字母，阿拉伯数字，下划线，美元符，但是必须以字母开头

3 名称最长为64个字符，别名最长可为256个字符

4 在windows系统下，数据库名称不区分大小写，在linux下区分大小写
```



#### 查看数据库

```
show databases;

查看所有的数据库
```



#### 选择数据库



```
use 数据库名;
```



#### 删除数据库

```
drop database 数据库名称;

这一步操作千万要谨慎，不然已经删除的数据库可能会找不回来了，这种操作太危险了，而且不是很常用
```



#### 创建数据表

```
create table 表名;

还有其他许多属性

create table 表名 (列名1 属性, 列名2 属性...);
```



#### 查看表结构

```
有三种方式

1 show columns from 表名 from 数据库名称;

2 show columns from 数据库名称.表名

3 desc 表名

4 查询某个字段 desc 表名 字段
```



#### 修改表结构

```
alter table 数据表名 。。。。

比如我们添加一个字段emil 类型为varchar(50) not null, 将字段user的类型由varchar(30)变为varchar(40)

alter table tb_admin add emil varchar(50) not null, modify user varchar(40);
```



#### 重命名表名

```
rename table 数据表名1 to 数据表名2
```



####  删除表

```
drop table 表名;
```



#### 插入数据



```
insert into 表名(字段名) values(字段值);
```



#### 查询数据

```
select [distinct][concat(col1,":",col2)] as collection_list

from 表名 指定数据表

where primary_constrait 查询条件

group by grouping_colums 如何对结果进行分组

order by sorting_columns 如何对结果进行排序

having secondary_constrait 查询条件

limit count 限制输出
```



#### 修改记录

```
update 表名 set 字段名=新的值 where 条件;
```



#### 删除记录

```
delete from 表名 where 条件;
```



#### 掌握函数

mysql函数

````

数学函数：

  用于处理数字，这类函数包括绝对值，正弦，余弦，随机函数等等

字符串函数：

  用于处理字符串，其中包含字符串链接，字符串比较，字符串字母的大小写字母转换

日期和时间函数：

  用于处理日期和时间，其中包括获取当前时间，获取当前日期，返回年份，返回日期

条件函数：

  用于处理控制SQL语句时

系统函数：

  用于获取MySQL数据库的系统信息

加密函数：

  用于对字符串进行加密解密

其他函数：

  包含格式化函数和锁函数

````



#### 绝对值函数

```
select abs(-5),abs(5);
```



#### floor()函数

```
select floor(1.5),floor(-2);
```



#### 随机函数

```
select rand(),rand();
```



#### PI函数

```
select PI();
```



#### 保留小数位

```
select truncate(2.13445566,3);
```



#### round函数

```
select round(1.6),round(1.2),round(1.123456,3);
```



#### sqrt函数

```
select sqrt(16),sqrt(25);
```



#### insert函数

```
select insert("mrkj",3,2,"book");
```



#### 字母转换函数

```
select upper("Ken"),ucase("kenn");
```



#### left函数

```
select left("ken",2);
```



#### rtrim()函数

```
select concat("+",rtrim(" mr "),"+");
```



#### substring(s,n,len)

```
select substring("mrbook",3,4);
```



#### 当前日期函数

````
select curdate(),current_date();
````



#### 当前时间函数

```
select curtime(),current_time();
```



#### 获取datetime函数

```
select now();
```



#### 获取mysql版本，以及连接id

```
select version(),connection_id();
```



#### 获取系统用户

```
select user(),system_user(),session_user();
```



#### 对字符串进行加密

```
select password("Ken");
```



#### 对字符串进行md5加密

```
select md5("Ken");
```



#### 查询表中1列或者多列 

```
select cat_id,cat_name from cat;
```



#### 从一个表中或者多个表中获取数据

```
select tb_admin.id,tb_admin.tb_user,tb_students.id,tb_student.name
```



#### 查询所有字段

```
select * from 表名
```



#### 查询指定字段

```
select 字段名 from 表名
```



#### 例子

```
select user,pwd from tb_admin
```



#### 指定条件查询

````
select * from tb_login where user="mr";
````



#### 带IN关键字查询

```
select * from tb_login where user IN("mr","lx");
```



#### 带between and关键字查询

```
select * from tb_login where id between 5 and 7;
```



#### 带like的字符串匹配查询

```
% 可以匹配一个或者多个字符串，可以代表任意长的字符串，比如

_ 只匹配一个字符，

select * from tb_login where user like "%mr%";
```



#### 带 IS NULL 关键字查询空值

```
用来判断字段的值是否为空值

select books,row from tb_book where row IS NULL;
```



#### 带 AND 关键字查询

```
select * from tb_admin where user="mr" and section="php";
```



#### 带 or 关键字查询

```
select * from cat where cat_id=2 or cat_id=4;
```





#### 用DISTINCT关键字去除结果中的重复行

```
select distincr name from tb_login;
```



#### 用 order by 关键字对查询结果进行排序

```
desc 表示降序

asc 表示升序

select * from tb_login order by id desc;
```



#### 用group by 关键字分组查询

```
select id, books, talk from tb_book group by talk;
```



#### 按多个字段分组查询

```
select id,books,talk,user from tb_book group by user,talk;
```



#### 用limit限制查询的结果

```
select * from tb_login order by id asc limit 3;
```



#### count()函数

```
select count(*) from tb_login;

查询记录条数
```



#### sum()函数

````
select sum(row) from tb_login;

查询某个字段的值的综合
````



#### AVG()函数

```
select avg(row) from tb_login;

查询某个字段的值的均值
```



#### max()函数

```
select max(row) from tb_login;

查询某个字段的值的最大值
```



#### min()函数

```
select min(row) from tb_login;

查询某个字段的值的最小值
```



#### 内连接查询

```

内连接查询是最普遍的链接类型，而且是最均匀的，因为他们要求构成链接的每个部分的每一个表都匹配，不匹配的行将被排除。

用=等同链接使用是最常见的

select name,books from tb_login,tb_book where tb.login,user=tb_book.user;

```



#### 外连接查询

```

外连接是指使用outer join 关键字将两个表连接起来，外连接结果不仅包含符合链接条件的行数据，

而且还包含左表，右表，两边链接中所有的数据行

```



#### 左外链接

```

是指将左表中的所有数据分别与右表的每一条数据进行链接组合，返回结果除内连接数据外，还包含左表中不符合条件的数据，并在右表的相应列中加NULL值

select section,tb_login.user,books,row from tb_login left join tb_book on tb_login.user=tb_book.user;

```



#### 右外表链接

```

是指将右表的所有数据分别与左表中每条数据进行链接组合，返回的结果除内连接数据外，还包含左表中不符合条件的数据，并在左表中相应的列添加NULL

select section,tb_login.user,books,row from tb_login right join tb_book on tb_login.user=tb_book.user;

```



#### 复合链接查询

```
增加其他限制条件

select section,tb_login.user,books,row from tb_login , tb_book where tb_login.user=tb_book.user and row>5;

```



#### 带关键字 IN 的子查询

```
select * from tb_login where user in(select user from tb_book);
```



#### 带exist关键字的子查询

```
select * from tb_row where exist (select * from tb_book where id=27);
```



#### 带any关键字查询

```
select books,row from tb_book where row<any(select row from tb_row);

row<any表示小于所有值
```



#### 带ALL关键字的子查询

```
select books,row from tb_book where row>=ALL(select row from tb_row);
```