---
title: Nodejs学习记录
---

## HTTP服务

```js
// 1. 加载 http 核心模块
const http = require('http')

// 2. 使用 http.createServer()方法创建一个 Web 服务器
// 返回一个 Server 实例
const server = http.createServer()

// 3. 当客户端发送请求时，就会自动触发服务器的 request 请求事件，然后执行第二个参数，执行回调函数
server.on('request', function(req, res){
    console.log('收到客户端的请求了');
    res.write('hello world!');
    // Content-Type: https://tool.oschina.net/commons
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end()
    // res.end('hello nodejs');
})

// 4. 绑定端口号，启动服务器
server.listen(3000, function(){
    console.log('服务器启动成功！');
})
```

## 模板引擎

### art-template

- **安装**

  ```
  npm install art-template --save
  ```

- **在需要使用的文档中加载art-template**

- **查看文档，使用模板引擎的 API**

- **node使用例子**

  ```js
  var template = require('art-template')
  const fs = require('fs')
  
  // template('script 标签id', 对象/{})
  // template.render('模板字符串', 替换对象)
  fs.readFile('./tpl.html', (err, data) => {
      if(err){
          return console.log('读取文件失败')
      }
      // 将data二进制数据转换为字符串才可以传入
      var ret = template.render(data.toString(), {
          name: 'Jack'
      })
      console.log(ret);
  })
  ```

### express-art-template

> 为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础是封装了express-art-template

- 安装

  ```
  npm install art-template express-art-template
  ```

- js

  ```js
  var express = require("express")
  var path = require('path')
  var app = express()
  // 第一个参数是模板的后缀  第二个是使用的模板引擎
  app.engine('art',require('express-art-template'))
  // 设置express框架模板的位置
  app.set('views',path.join(__dirname,'views'))
  // 设置express框架模板后缀
  app.set('view engine','art')
  
  app.get('/index',(req,res,next) =>{
      // 1.拼接模板路径
      // 2.拼接模板后缀
      // 3.哪一个模块和哪一个数据进行拼接
      // 4.将拼接结果响应给了客户端
      res.render('index',{
          name:'xiaoke'
      })
  })
  
  // 监听端口
  app.listen(80)
  console.log('已启动');
  ```

- html

  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title></title>
      </head>
      <body>
          <h1>{{name}}</h1>
      </body>
  </html>
  ```
  
### ejs

- 安装

  ```
  npm install ejs --save
  ```

- Express 中 ejs 的使用

  ```js
  const express = require('express')
  let app = express();
  
  // 配置express的模板引擎 (不需要主动引入ejs)
  app.set("view engine", "ejs");
  // 使用 (默认加载模板引擎的文件夹是views)
  res.get("/", (req, res) => {
      let title = "hello, ejs"
      res.render("index.ejs", {
          title
      })
  })
  app.listen(3000)
  ```

  ```ejs
  // views => index.ejs
  <body>
      <h2><%=title%></h2>
  </body>
  ```

- 引入模板

  ```ejs
  <%- include ('header.ejs')%>
  ```

- 绑定数据

  ```
  <%=title%>
  <%-title%> // 此种方式可以解析title中的html标签
  ```

- 条件判断

  ```ejs
  <%if(flag == true){%>
  	<strong>flag=true</strong>
  <%}else{%>
  	<strong>flag=flase</strong>
  <%}%>
  ```

- 循环遍历

  ```ejs
  <ul>
      <%for(var i=0;i<list.length;i++){%>
          <li><%=list[i]%></li>
      <%}%>
  </ul>
  
  ```

- 指定模板位置，默认模板位置在views

  ```js
  app.set('views',__dirname+'/views');
  ```

- 更改模板文件的后缀

  ```js
  const ejs = require('ejs');
  // 注册 html 模板引擎
  app.engine('html', ejs.__express)
  // 将模板引擎换成html
  app.set('view engine', 'html');
  ```


## Express

### 安装
```
  npm install express --save
  npm install -g express-generator
  // 为什么有第二条命令，因为4.x版本，把generator分离出来了，需要单独安装
```

### 使用例子

```js
const express = require('express')
const fs = require('fs')
const baseDir = '.'
const port = 3000
var app = express();

   // 解决跨域问题
app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

app.get('/', (req, res) => {
    res.send('Index Page Show')
})

app.use('/json/', express.static('./json/'))

app.listen(port, () => {
    console.log('app is running ....')
})
```

### 中间件

#### 什么是中间件

> 中间件就是一堆方法，可以接受客户端发来的请求，可以对请求做出响应，也可以将请求继续交给下一个中间件继续处理

> - 中间件主要由两部分构成，中间件方法以及请求处理函数
> - 中间件方法由Express提供，负责拦截请求，请求处理函数由开发人员提供，负责处理请求
> - 可以针对同一个请求设置多个中间件，对同一个请求进行多次处理
> - 默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，就终止匹配
> - 可以调用`next()`方法将请求的控制权交给下一个中间件，直到遇到结束请求的中间件为止

#### app.use

- **可以接受所有请求**

  ```js
  var express = require("express");
  var app = express();
  app.use((req, res, next) => {
      console.log("接受到了所有的请求");
      next();
  })
  app.listen(80);
  console.log("已经启动");
  ```

#### 中间件应用

- 路由保护，客户端在访问需要登陆的页面时，可以先使用中间件判断用户登陆状态，用户如果未登陆，则拦截请求，直接响应，禁止用户进入需要登陆的页面

  ```js
  // 导入express 框架
  var express = require("express")
  //创建网站服务器
  var app = express()
  
  app.use('/admin',(req,res,next)=>{
      var isLogin = true
          // 如果用户已经登陆
      if(isLogin){
          // 让请求继续执行下去
          next()
          
      } else {
          // 如果用户没有登陆 直接对客户端做出响应
          res.send('你还没有登陆，请登陆')
      }
  })
  
  app.get('/admin',(req,res,next)=>{
      res.send('你已登陆')
  })
  
  // 监听端口
  app.listen(80)
  console.log('已启动');
  ```

- 网站维护公告，在所有路由的最上面定义接受所有的请求的中间件，直接为客户端做出响应，网站正在维护中

  ```js
  // 导入express 框架
  var express = require("express")
  //创建网站服务器
  var app = express()
  // 接收所有的请求 直接做出响应 
  // 因为没有调用next()方法 所以请求只到这里 没有继续下去
  app.use((req,res,next)=>{
          res.send('网站正在维护')
  })
  app.get('/list',(req,res,next)=>{
          res.send('list')
  })
  app.get('/add',(req,res,next)=>{
          res.send('add')
  })
  // 监听端口
  app.listen(80)
  console.log('已启动');
  ```

- 自定义404页面

  ```js
  // 导入express 框架
  var express = require("express")
  //创建网站服务器
  var app = express()
  
  app.get('/list',(req,res,next)=>{
          res.send('list')
  })
  app.get('/add',(req,res,next)=>{
          res.send('add')
  })
  
  // 注意自定义404页面 这个路由 要才所有路由的最下面
  // 因为路由时从上到下的 所以吧这个路由定义到最下面就可以实现 自定义404页面 效果
  app.use((req,res) =>{
      // 为客户端响应404状态码以及提示信息
      res.status(404).send('页面找不到')
  })
  
  // 监听端口
  app.listen(80)
  console.log('已启动');
  ```

- 错误处理中间件

  > 在程序执行的过程中，不可避免的会出现一下无法预料的错误，比如文件读取失败，数据库连接失败，错误处理中间件是一个集中处理的地方。

  ```js
  // 导入express 框架
  var express = require("express")
  //创建网站服务器
  var app = express()
  
  app.get('/index',(req,res,next) =>{
      // 创建一个错误 信息
      throw new Error('程序发生了未知错误')
  })
  
  // 错误处理中间件
  app.use((err,req,res,next) =>{
      res.status(500).send(err.message)
  })
  
  // 监听端口
  app.listen(80)
  console.log('已启动');
  
  ```

---

### 路由系统

#### 构建模块化路由

- app.js

  ```js
  // 导入express 框架
  var express = require("express")
  //创建网站服务器
  var app = express()
  // 导入路由对象
  var home = require('./route/home')
  var admin = require('./route/admin')
  
  app.use('/home',home)
  app.use('/admin',admin)
  
  // 监听端口
  app.listen(80)
  console.log('已启动');
  ```

- home.js

  ```js
  // 导入express 框架
  var express = require("express")
  // 创建路由对象
  var home = express.Router()
  
  home.get('/index',(req,res)=>{
      res.send('欢迎来到home的index页面')
  })
  // 导出home路由对象
  module.exports = home
  ```

- admin.js

  ```js
  // 导入express 框架
  var express = require("express")
  // 创建路由对象
  var admin = express.Router()
  
  admin.get('/index',(req,res)=>{
      res.send('欢迎来到admin的index页面')
  })
  // 导出admin路由对象
  module.exports = admin
  ```

#### 路由参数/动态路由

```js
// 导入express 框架
var express = require("express")
//创建网站服务器
var app = express()
// 导入body-parser模块
var bodyParser = require("body-parser")

    // 多个参数  如果多个参数 请求的时候要全部请求到 才能响应
app.get('/index/:id/:name/:age',(req,res,next) =>{
    // 接收POST请求参数
    res.send(req.params)
})
app.get("/article/:id", (req, res) => {
    let id = req.params["id"];
    res.send(`动态路由 ${id}`);
})

// 监听端口
app.listen(80)
console.log('已启动');

```

#### 静态资源的处理

> 提供Express内置的express.static可以方便地托管静态资源文件，例如img、css、js文件等

```js
app.use(express.static("静态资源文件夹地址"));
app.use('/json/', express.static('./json/'))
```

#### GET参数的获取

> Express框架中使用`req.query`既可获取GET参数，框架内部会将GET参数转换为对象并返回

```js
// 导入express 框架
var express = require("express")
//创建网站服务器
var app = express()

//接收 地址栏中我问号后面的参数 用 & 来隔开
// 例如： http://localhost/?name=xiaoke&age=18
app.get('/',(req,res) => {
    res.send('ok')
    // req.query 返回的是对象
    console.log(req.query) //{ name: 'xiaoke', age: '18' }
})

// 监听端口
app.listen(80)
console.log('已启动');
```

#### POST参数的获取

> Express中接收POST请求的参数需要借助第三方包body-parser

```
npm install body-parser
```

```js
// 导入express 框架
var express = require("express")
//创建网站服务器
var app = express()
// 导入body-parser模块
var bodyParser = require("body-parser")
// 配置body-parser模块
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true  方法内部使用第三方qs模块处理请求参数的格式
app.use(bodyParser.urlencoded({extended:false}))

app.post('/add',(req,res) =>{
    // req.body接收POST参数 并且响应到客户端
    res.send(req.body)
})
// 监听端口
app.listen(80)
console.log('已启动');
```


## Mysql

- **安装**

  ```
  npm install mysql --save
  ```

- **使用实例**

  ```js
  const { json } = require('express');
  const mysql = require('mysql')
  let options = {
      host: "localhost",
      //port:"3306", //可选，默认3306
      user: "root",
      password: 'dfnjkd98', // 这里改成你自己的数据库连接密码
      database: "kublog",
    };
    //创建与数据库进行连接的连接对象
    let connection = mysql.createConnection(options);
    
    //建立连接
    connection.connect((err) => {
      if (err) {
        // 数据库连接成功
        console.log(err);
      } else {
        // 数据库连接失败
        console.log("数据库连接成功");
      }
    });
  
    const sql = 'select * from article'
    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err)
        }else{
            console.log(res);
            console.log(JSON.stringify(res));
        }
    })
  
    connection.end(err => {
        if(err){
            console.log(err);
        }else{
            console.log('成功关闭数据库');
        }
    })
  ```


## 热启动

- **安装**

  ```
  npm install nodemon -g
  ```

- **第二选择**

  ```
  npm install supervisor  -g
  ```


## Koa-router

### 路由拆分

- 建立多个路由配置文件router1-3.js, 文件内容大致如下

  ```js
  const Router = require('koa-router')
  const router = new Router()
  
  router.get('/', async (ctx, next) => {
      ctx.body = 'router-1';
      next();
  })
  
  module.exports = router.routes()
  ```

- 建立总路由配置文件router.js, 用它关联其他模块的路由

  ```js
  const Router = require('koa-router')
  const router1 = require('../routes/router1')
  const router2 = require('../routes/router2')
  const router3 = require('../routes/router3')
  
  var router = new Router()
  router.use('/test', router1);
  router.use('/test2', router2);
  router.use('/test3', router3);
  
  module.exports = router
  ```

- 在app.js里面启动总路由

  ```js
  const router = require('./myApp/config/router')
  app.use(router.routes()).use(router.allowedMethods());
  ```

  