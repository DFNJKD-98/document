<h1 align="center" id="index">aardio学习记录</h1>

## aardio包的使用

- ###### 添加aardio包

  ```shell
  npm install aardio
  ```

- `main.js`文件中导入

  ```js
  import aardio from "aardio";
  // 3200为rpc服务端的启动端口
  aardio.open(3200).then((v) => {
    console.log("connect aardio successfully");
  });
  Vue.prototype.$aardio = aardio.xcall;
  ```

- `component.vue`文件中使用

  ```vue
  <script>
  export default {
    name: "ApplicationBar",
    methods: {
      min() {
        $aardio('min');
      },
      max() {
        $aardio('max');
      },
      close() {
        $aardio('close');
      },
      caption() {
        $aardio('caption');
      },
    },
  };
  </script>
  ```

- `rpcServer`代码

  ```js
  // 启动服务
  var server = web.rpc.externalServer();
  // 通过external导出交互函数
  server.external={
  	showMsg = function(msg){
  		win.msgbox(msg, server.getUrl("aardio.js"));
  		return true; 
  	}
  	max = function(){
  		mainForm.hitMax();
  	}
  	close = function(){
  		mainForm.close();
  	}
  	min = function(){
  		mainForm.hitMin();
  	}
  	caption = function(){
  		mainForm.hitCaption();
  	}
  }
  // 路由处理
  server.httpHandler["/test"] = function(response, request){
  	response.write("aaa");
  }
  // 启动服务
  server.start(3200);
  ```

## webview2的使用

- `aardio`代码

  ```js
  var wb = web.view(mainForm);
  wb.external={
  	showMsg = function(msg){
  		win.msgbox(msg, server.getUrl("aardio.js"));
  		return true; 
  	}
  	max = function(){
  		mainForm.hitMax();
  	}
  	close = function(){
  		mainForm.close();
  	}
  	min = function(){
  		mainForm.hitMin();
  	}
  	caption = function(){
  		mainForm.hitCaption();
  	}
  }
  
  /* 显示网页界面 */
  if(_STUDIO_INVOKED){
  	//开发环境下
  	wb.go('http://localhost:8080/#/');
  }else{
  	//打包exe后
  	//查找可用端口创建HTTP服务器，返回SPA单页应用首页网址
  	wb.go(wsock.tcp.simpleHttpServer.startSpaUrl("\res\index.html"));
  }
  ```

- `main.js`文件

  ```js
  Vue.prototype.$aardio = window.aardio;
  ```

- `component.vue`文件

  ```vue
  <script>
  export default {
    name: "ApplicationBar",
    methods: {
      min() {
        this.$aardio.min();
      },
      max() {
        this.$aardio.max();
      },
      close() {
        this.$aardio.close();
      },
      caption() {
        this.$aardio.caption();
      },
    },
  };
  </script>
  ```


## 资源文件内嵌exe

- 把资源文件复制进资源管理器“工程目录\res”文件夹中。 

- 在工程管理器的“资源文件”右击，选“同步本地目录“。 

## 关于res目录、美元$包含符的区别

可以这样理解：res目录放在exe程序文件内的res虚拟目录中，里面的资源文件以原始文件名记录。
所以在项目时的/res目录中存放多个md5一样但文件名不同的文件，发布后会按总大小来算。

而用美元`$`包含符则把资源文件放在exe程序文件中的某个虚拟目录中，比如shadow（只是举例）。
用`$`包含进来的文件以md5值之类的方式命名（放在shadow下），所以包含多个文件内容一样，

但名称不一样的文件，发布后按单个文件大小计算。

同时测试过res、lib的内外优先级问题。
比如在程序发布前，res目录中有一个file.txt，内容是『exe内的txt』，运行win.msgbox会弹该字串。
但发布后如果在exe文件下新建立一个res/file.txt，内容为『程序外的txt文件』。

则在程序运行时，会弹的是『程序外的txt文件』这个字串，即优先使用同级目录下的res/file.txt文件。

需要注意的是，放在lib目录中的文件并不会在发布时编译进exe程序中。
所以对于string.load、loadcode等函数，若不是string.load("/res/file.txt")，而是放在其他的目录，
那么最好是用string.load($"/other/path/file.txt")，使其在编译时变成string.load("/shadow/xmd5xxx")，
并把文件放到exe程序内的shadow虚拟目录下（该shadow目录是举例的名字）。



## 拖动边框改变大小（未完）

```js
import win.ui;
/*DSG{{*/
mainForm = win.form(text="test";right=959;bottom=591;border="thin";mode="popup";sysmenu=false;title=false)
mainForm.add(
button={cls="button";text="Button";left=396;top=289;right=638;bottom=355;z=1};
button2={cls="button";text="Button";left=395;top=393;right=637;bottom=493;z=2};
button3={cls="button";text="Button";left=701;top=290;right=894;bottom=356;z=3}
)
/*}}*/

import mouse.hook;
import console;
import MyNameSpace;

var minMaxTool = MyNameSpace.NoBorderForm(mainForm.hwnd);

mainForm.button.oncommand = function(id,event){
	var hCur = ::User32.LoadCursor(null,0x7F85/*_IDC_SIZENS*/);
	win.ui.waitCursor(true,hCur);
}

mainForm.button2.oncommand = function(id,event){
	win.ui.waitCursor(false);
}

mainForm.button3.oncommand = function(id,event){
	mainForm.applyDisableDragFullWindow(
		lambda() ::SendMessageInt(mainForm.hwnd, 0x112/*_WM_SYSCOMMAND*/,0xF003 ,0xC/*_HTTOP*/ ) 
	);
}

mainForm.wndproc = function(hwnd,message,wParam,lParam){ 
	var ptCurPos = ::POINT();
	::User32.GetCursorPos(ptCurPos);
	var x = ptCurPos.x;
	var y = ptCurPos.y;
	var location = minMaxTool.ptInBorder(win.getRect(mainForm.hwnd,true),x,y,10);
	select(message) {
		case 0x84/*_WM_NCHITTEST*/{
			console.log("NCHITTEST",location);
			select(location) {
				case "left" {return 0xA/*_HTLEFT*/; }
				case "right" {return 0xB/*_HTRIGHT*/; }
				case "top" {return 0xC/*_HTTOP*/; }
				case "bottom" {return 0xF/*_HTBOTTOM*/; }
				case "lefttop" {return 0xD/*_HTTOPLEFT*/; }
				case "leftbottom" {return 0x10/*_HTBOTTOMLEFT*/; }
				case "righttop" {return 0xE/*_HTTOPRIGHT*/; }
				case "rightbottom" {return 0x11/*_HTBOTTOMRIGHT*/; }
				else {return 2/*_HTCAPTION*/; }
			}
		}
		case 5/*_WM_SIZE*/{
			console.log("WM_SIZE");
			var rc = ::RECT();
			::GetClientRect(mainForm.hwnd,rc);
			::InvalidateRect(mainForm.hwnd,rc,0);
		}
		case 0xA1/*_WM_NCLBUTTONDOWN*/{
			console.log("NCLBUTTONDOWN");
			return mainForm._defWindowProc(hwnd,message,wParam,lParam);
		}
	}
}

mainForm.show();
return win.loopMessage();
```

