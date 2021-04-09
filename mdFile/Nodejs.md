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

## 模板引擎art-template

- **安装包**

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

### 动态路由

```js
app.get("/article/:id", (req, res) => {
    let id = req.params["id"];
    res.send(`动态路由 ${id}`);
})
```

### 获取 get 传值

```js
app.get("/product", (req,res) => {
	let query = req.query;
    console.log(query); // query为一个对象
    res.send("product-" + query.id)
})
```

### ejs 模板引擎

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

  

---


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

  