<h1 align="center">Vue3 学习记录</h1>

## 一、VSCode 代码片段

- 文件 -> 首选项 -> 用户片段
- 复制自己需要生成代码片段的代码
- 在https://snippet-generator.app中生成该代码片段
  - Description：对代码片段进行描述
  - Tab trigger：快速展开代码片段的关键字
  - Your snippet：要重复利用的代码片段
- 在VSCode中配置代码片段

## 二、基本指令

### 2.1 v-once

- 用于指定元素或者组件只渲染一次

- 当数据发生变化时，元素或者组件以及其所有的子元素将视为静态内容并且跳过

- 一般用于性能优化

  ```html
  <div v-once>
      <h2>当前计数：{{counter}} </h2>
      <button @click="increment">+1</button>
  </div>
  ```

### 2.2 v-text

- 用于更新元素的textContent

  ```html
  <span v-text="msg"></span>
  <!-- 等价于 -->
  <span>{{msg}}</span>
  ```

### 2.3 v-html

- 默认情况下，如果展示的内容本身是html，那么vue不会进行特殊的解析

- 如果希望这个内容可以被Vue解析出来，那么可以使用v-html

  ```html
  <template id="my-app">
  	<div v-html='info'></div>
  </template>
  
  <script>
  const App = {
      template: '#my-app',
      data(){
          return {
              info:'<h2>二级标题</h2>'
          }
      }
  }
  </script>
  ```

### 2.4 v-pre

- 用于跳过元素和它的子元素的编译过程，加快编译速度

- 显示原始的mustache标签

  ```html
  <template id="my-app">
  	<div v-pre>{{message}}</div>
  </template>
  ```

### 2.5 v-cloak

- 这个指令保持在元素上直到关联组件实例结束编译

- 和CSS规则如`[v-cloak]{display:none}`一起用时，这个指令可以隐藏未编译的Mustache标签直到组件实例准备完毕

  ```html
  <style>
      [v-cloak]{
          display: none;
      }
  </style>
  
  <body>
      <div id="app"></div>
      
      <template id="my-app">
          <!-- div标签不会显示，直到编译结束 -->
      	<div v-cloak>
              {{message}}
          </div>
      </template>
  </body>
  ```

### 2.6 v-bind

- 用于给标签动态绑定属性。动态地绑定一个或多个attribute，或一个组件prop到表达式

- 修饰符：

  - .camel - 将kebab-case attribute 名转换为 camelCase

- **对象语法**

  ```html
  <template id="my-app">
      <!-- 1.普通的绑定方式，绑定一个变量，可以不是对象 -->
  	<div :class="className">{{message}}</div>
      
      <!-- 2.对象绑定，属性值为true时绑定属性名 -->
      <!-- nba是不是变量无所谓，只会绑定nba。isActive是变量 -->
      <div class="abc" :class="{nba:true, 'james':true，'active': isActive}"></div>
      
      <!-- 3.绑定一个对象 -->
      <div :class="classObj"></div>
      
      <!-- 4.从methods中获取一个对象 -->
      <div :class="getClassObj()"></div>
  </template>
  ```

- **数组语法**

  ```html
  <template id="my-app">
      <!-- 1.直接传入一个数组 -->
  	<div :class="['why', nba]"></div>
      
      <!-- 2.数组中也可以使用三元运算符或者绑定变量 -->
      <div :class="['why', nba, isActive ? 'active' : '']"></div>
      
      <!-- 3.数组中也可以使用对象语法 -->
      <div :class="['why', nba, {'active': isActive}]"></div>
  </template>
  ```

- **动态绑定属性**

  ```html
  <template id="my-app">
      <!-- 属性的名称是动态的 -->
  	<div :[name]="value">
          {{message}}
      </div>
  </template>
  ```

- **将一个对象的所有属性，绑定到元素上的所有属性**

  ```html
  <template id="my-app">
      <!-- info是一个对象 -->
  	<div v-bind="info">
          {{message}}
      </div>
  </template>
  ```

### 2.7 v-on

- 绑定事件监听

- 修饰符：

  - .stop - 调用 event.stopPropagation()
  - .prevent - 调用 event.preventDefault()
  - .capture - 添加事件侦听器时使用 capture 模式
  - .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调
  - .{keyAlias} - 仅当事件是从特定键触发时才触发回调
  - .once - 只触发一次回调
  - .left - 只当点击鼠标左键时触发
  - .right - 只当点击鼠标右键时触发
  - .middle - 只当点击鼠标中键时触发
  - .passive - { passive : true } 模式添加侦听器

- **基本使用和参数传递**

  ```html
  <button v-on:click="btnClick">click</button>
  <button @click="btnClick">click</button>
  <button v-on="{click: btnClick, mousemove: mouseMove}">click</button>
  
  <!--
  如果该方法的参数列表为空，那么方法后的（）可以不添加
  如果方法的参数列表有一个参数，那么会默认将原生事件event传递进去，也不用加（）
  btnClick(event){
  	console.log(event)
  }
  如果需要同时传入某个参数，同时需要event，可以通过$event传入事件
  btnClick(event, message){
  	console.log(event, message)
  }
  -->
  <button @click="btnClick($event, 'abc')">click</button>
  ```

### 2.8 v-if、v-else、v-else-if、v-show

- 在某些情况下，我们需要根据当前的条件决定某些元素或组件是否渲染，这时需要进行条件判断

- v-if 的渲染原理

  - v-if是惰性的
  - 当条件为false时，其判断的内容完全不会被渲染或者会被销毁掉
  - 当条件为true时，才会真正渲染条件块中的内容

- v-if 基本使用

  ```html
  <template id="my-app">
  	<input type="text" v-model.number="score">
      <h2 v-if="score > 90">优秀</h2>
      <h2 v-else-if="score > 80">良好</h2>
      <h2 v-else-if="score > 60">普通</h2>
      <h2 v-else>不及格</h2>
  </template>
  ```

- v-if 高级使用

  ```html
  <template id="my-app">
  
      <template v-if="show">
          <h2>111</h2>
          <h2>222</h2>
          <h2>333</h2>
      </template>
  
      <template v-else>
          <h2>444</h2>
          <h2>555</h2>
          <h2>666</h2>
      </template>
      <!-- template元素可以当做不可见的包裹元素，并且在v-if上使用，但是最终template不会被渲染出来 -->
  </template>
  ```

- v-show 基本使用

  ```html
  <template id="my-app">
  	<h2 v-show="isShow">哈哈哈哈</h2>
  </template>
  ```

- **v-if 和 v-show 的区别**

  - v-show 不支持template
  - v-show 不可以和v-else一起使用
  - v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有渲染的，只是通过CSS的display属性来进行切换
  - v-if 当条件为false时，其对应的元素压根不会被渲染到DOM中
