# Electron

## 开发环境搭建

- NodeJs(nodejs.org)

  ```
  node -v
  npm -v
  ```

- electron

  ```
  npm init
  npm install electron --save-dev
  npx electron -v
  ```
  
- vue-cli3 中 electron 环境搭建

  - 创建项目

    ```
    vue create my-project
    ```

  - 添加插件

    ```
    vue add electron-builder
    ```

  - 使用开发模式运行

    ```
    npm run electron:serve
    ```

  - 打包程序

    ```
    npm run electron:build
    ```
    
  - 错误解决
  
    - 手动下载所需文件
      第一步下载 [https://cdn.npm.taobao.org/dist/electron/7.1.7/electron-v7.1.7-win32-x64.zip ](https://cdn.npm.taobao.org/dist/electron/7.1.7/electron-v7.1.7-win32-x64.zip)拷贝到electron的目录下
  
    - 第二步编辑install.js文件找到extractFile函数添加`extractFile('./electron-v7.1.7-win32-x64.zip')`这行代码
  
      ```js
      // downloads if not cached
      downloadArtifact({
        version,
        artifactName: 'electron',
        force: process.env.force_no_cache === 'true',
        cacheRoot: process.env.electron_config_cache,
        platform: process.env.npm_config_platform || process.platform,
        arch: process.env.npm_config_arch || process.arch
      }).then((zipPath) => extractFile(zipPath)).catch((err) => onerror(err))
      // 插入这段代码引入文件
      extractFile('./electron-v7.1.7-win32-x64.zip')
      // unzips and makes path.txt point at the correct executable
      function extractFile (zipPath) {
        extract(zipPath, { dir: path.join(__dirname, 'dist') }, function (err) {
          if (err) return onerror(err)
          fs.writeFile(path.join(__dirname, 'path.txt'), platformPath, function (err) {
            if (err) return onerror(err)
          })
        })
      }
      
      ```
  
    - 打开命令行切换到electron根路径用node编译install文件
  
      ```
      node install.js
      ```

## Hello World

- index.html

  ```html
  <body>
      <h2>Hello,World</h2>
  </body>
  ```

- main.js

  ```js
  let electron = require('electron')
  let app = electron.app
  let BrowserWindow = electron.BrowserWindow
  let mainWindow = null //声明要打开的主窗口
  app.on('ready', () => {
      mainWindow = new BrowserWindow({width: 300, height: 300})
      // 加载 html 页面
      mainWindow.loadFile('index.html')
      // 监听窗口的关闭事件，若关闭，则赋值为null，否则内存会占用越来越多
      mainWindow.on('closed', ()=> {
          mainWindow = null
      })
  })
  ```

- **运行程序**

  ```
  electron .
  ```

## Remote模块

```js
const btn = this.document.querySelector("#btn")
const BrowserWindow = require('electron').remote.BrowserWindow
window.onload = ()=>{
	btn.onclick = ()=>{
        newWindow = new BrowserWindow({
            width:  500,
            height: 500
        })
        newWin.loadFile('index2.html')
        newWin.on('closed',()=>{
            newWin = null
        })
    }
}
```

## Background图片路径问题

- **组件 data 中 require 引入文件**

  ```js
  data(){
      return{
          backgroundImage: require('../assets/01.jpg'),
          testImage: require('D://01.jpg')
      }
  }
  ```

  > - 绝对路径 和 相对路径 都可以
  > - 可以含有中文
  > - **路径中不能有空格**

- **refs 设置背景图片**

  ```js
  methods: {
      setBackground(){
          this.$refs.bigBox.style.background = `url(${this.backgroundImage}) no-repeat`;
          this.$refs.bigBox.style.backgroundSize = '100% 100%';
          this.$refs.bigBox.style.filter = 'blur(14px)';
      }
  }
  ```

- **毛玻璃效果**

  ```css
  .big-box{
      height: 100vh;
      display: flex;
      align-items: stretch;
      z-index: 1;
      position: relative;
      overflow: hidden;
  }
  .big-box .background{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      margin: -30px;
  }
  ```

  ```html
  <div class="big-box">
      <side-bar/>
      <main-win class="main-win"/>
      <div class="background" ref="bigBox"></div>
  </div>
  ```

  

