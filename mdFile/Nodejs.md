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

- **安装**

  ```
  npm install express --save
  ```

- **使用例子**

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

  

  