---
title: CSS学习记录
---

<h2 align="center">CSS学习记录</h2>

### 2020/10/9学习记录

- calc()(calculate的缩写，CSS3新增，为元素指定动态宽度、长度等，注意此处的动态是计算之后得一个值)作为一个值。我可能使用它结合像素为一个元素设置了动态宽度.
  **width: calc(100% - 50px);**
  
- 类选择器有更高的优先级，因此会应用类选择器的规则——即使元素选择器顺序在它后面。
  
  类选择器的权重大于元素选择器，因此类上定义的属性将覆盖应用于元素上的属性。
  
- **inherit**:设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承"。
  
  **initial**:设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit
  
  **unset**:将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial一样。
  
  属性 all 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个(inherit, initial, unset, or revert)。
  
- **通用选择器 (\*)，组合符 (+, >, ~, ' ')，和否定伪类 (:not) 不会影响优先级。**

- 标签属性选择器、伪类选择器、伪元素选择器、运算符选择器等等等等-----需要再多多了解。

- 全局选择器，是由一个星号（*）代指的，它选中了文档中的所有内容（或者是父元素中的所有内容，比如，它紧随在其他元素以及邻代运算符之后的时候）。

- 指向特定元素的类:span.highlight、h1.highlight·····(可以这样子写选择器，识别同一类下的不同元素)

- 如果你想在大小写不敏感的情况下，匹配属性值的话，你可以在闭合括号之前，使用i值。这个标记告诉浏览器，要以大小写不敏感的方式匹配ASCII字符。没有了这个标记的话，值会按照文档语言对大小写的处理方式，进行匹配——HTML中是大小写敏感的。

------

### 2020/10/17学习记录

- **opacity 属性**:设置 div 元素的不透明级别,从 0.0 （完全透明）到 1.0（完全不透明）。
- **:target 选择器**:突出显示活动的 HTML 锚。emmmm，可以实现切换输入框的效果，具体见：**https://www.cnblogs.com/bgwhite/p/9414282.html**
- **:before 选择器**在被选元素的内容前面插入内容,使用 content 属性来指定要插入的内容。
- **:after 选择器**在被选元素的内容后面插入内容,请使用 content 属性来指定要插入的内容。
- WebKit 是一个开源的浏览器引擎, 同时WebKit 也是苹果Mac OS X 系统引擎框架版本的名称, WebKit 前身是 KDE 小组的 KHTML。Apple将 KHTML 发扬光大，推出了装备 KHTML 改进型 WebKit 引擎的浏览器 Safari。
- -moz代表baifirefox浏览器du私有zhi属性。
  -ms代表ie浏览器私有属性。
  -webkit代表safari、chrome私有属性。
  -o-代表Opera。
- **transition属性**是一个简写属性，用于设置四个过渡属性：transition: property duration timing-function delay;
  transition-property 规定设置过渡效果的 CSS 属性的名称。
  transition-duration 规定完成过渡效果需要多少秒或毫秒。
  transition-timing-function 规定速度效果的速度曲线。
  transition-delay 定义过渡效果何时开始。
- **text-shadow**: 5px 5px 5px #FF0000;规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色
- **@font-face 规则**中，必须首先定义字体的名称（比如 myFirstFont），然后src指向该字体文件。如需为 HTML 元素使用字体，需要通过font-family属性来引用字体的名称 (myFirstFont)。

------

### 2020/10/18学习记录

- 2D 转换方法：
  1. translate(): 元素从其当前位置根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数移动。
  2. rotate(): 元素根据给定的角度顺时针旋转。允许负值，此使元素逆时针旋转。
  3. scale()：根据给定的宽度（X 轴）和高度（Y 轴）参数，元素的尺寸会增加或减少。
  4. skew()：元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数。
  5. matrix()：把所有 2D 转换方法组合在一起。需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
  
- **3D 转换方法:** rotateX(); rotateY()

- **transform:** 向元素应用 2D 或 3D 转换。

- **@keyframes 规则:**
  
  规定至少两项 CSS3 动画属性，即可将动画绑定到选择器：规定动画的名称 ; 规定动画的时长。
  
  例如：animation: myfirst 5s;
  
- **resize 属性**规定是否可由用户调整元素尺寸。both:用户可调整元素的高度和宽度。horizontal:用户可调整元素的宽度。vertical:用户可调整元素的高度。

- **overflow 属性**规定当内容溢出元素框时发生的事情。auto: 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。

- **Flex布局:** display:flex; Flex布局不同于盒子模型的布局，详细了解见：**https://www.runoob.com/w3cnote/flex-grammar.html**

------

### 2020/10/22学习记录

- **要使用resize属性，使用户可以控制盒子的宽度和高度，还要同时加上overflow属性（可以赋值auto）**

- **Grid 布局**，学习见：**http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html**
  
  项目只能是容器的顶层子元素，不包含项目的子元素，Grid 布局只对项目生效。
  
  repeat()接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。
  
- **vh就是当前屏幕可见高度的1%，也就是说heigth: 100vh;可以使得元素占满整个屏幕。**

- 三明治布局可以采用flex布局或者是grid布局来实现，具体实现方法可以参考some-links的实现方法。**需要注意的是要给包含三个元素的父元素添加min-height属性，这样子才会布满整个页面。**

- **place-self该CSS样式一定要放在项目的描述中，不可以放在容器的描述中（此时是没有效果的）**

- ```css
  @media (max-width: 700px){
  	h3{color: red;}
  }
  ```

  > 当浏览器宽度小于等于700px时，h3标题颜色变为红色
  >
  > 此CSS操作是响应式操作的基础

- **BootStrap栅格系统**

  - col-lg-1 ——大屏幕 大桌面显示器
  - col-md-1 ——中等屏幕 桌面显示器
  - col-sm-1 ——小屏幕 平板
  - col-xs-1 ——无响应式

---

### 2021/1/20学习记录

- **滚动条**

  ```html
  <div class="test test-5">
        <div class="scrollbar"></div>
  </div>
  ```

  ```css
  .test-5::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
  }
  .test-5::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius   : 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
      );
  }
  .test-5::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      background   : #ededed;
      border-radius: 10px;
  }
  ```
  
- **禁止历史记录的显示**

  ```html
  <input class="" type="text" autocomplete="off"></input>
  ```

---

### CSS选择器

#### 类型、类和ID选择器

- `h1{}`
- `.box{}`
- `#unique{}`

#### 标签属性选择器

- **根据一个元素上的某个标签的属性的存在以选择元素**

  `a[title]{}`

- **根据一个有特定值的标签属性是否存在来选择**

  `a[href="https://example.com"]{}`

#### 伪类与伪元素

- **这组选择器包含了伪类，用来样式化一个元素的特定状态**

  `a:hover{}`

- **还可以包含伪元素，选择一个元素的某个部分而不是元素自己**

  `p::first-line{}`

#### 运算符

- **这一类选择器可以将其他选择器组合起来，更复杂的选择元素**

- **后代选择器**

  `article p`

- **子代选择器**

  `article > p`

  > 当使用  `>` 选择符分隔两个元素时,它只会匹配那些作为第一个元素的**直接后代(**子元素)的第二元素. 与之相比, 当两个元素由**后代选择器**相连时, 它表示匹配存在的所有由第一个元素作为祖先元素(但不一定是父元素)的第二个元素, 无论它在 DOM 中"跳跃" 多少次.

- **相邻兄弟选择器**

  `h1 + p`

  > **相邻兄弟选择器** (`+`) 介于两个选择器之间，当第二个元素*紧跟在*第一个元素之后，并且两个元素都是属于同一个父[`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/元素)的子元素，则第二个元素将被选中。

- **通用兄弟选择器**

  `h1 ~ p`
  
  > 兄弟选择符，位置无须紧邻，只须同层级，`A~B` 选择`A`元素之后所有同层级`B`元素。

### box-shadow transition

You can not transition from a *normal* box shadow to a *inset* box shadow.

Luckily, you can set multiple box shadows, so you can write

```
.header-link {
    box-shadow:0 0 10px rgba(0, 0, 0, 0.7) inset, 0px 0px 0px white;
}
```

and

```
.header-link:hover {
    box-shadow: 0px 0px 0px white inset, 0 0 10px rgba(0, 0, 0, 0.7);
}
```

Notice that these shadows are the same that the ones that you had, because the extra shadow has 0px, so won't be displayed. Notice also that the order is important: the browser will transition it only if the first shadow is inset (or normal) in both, the second one is inset (or normal) in both, and so on

### 计算属性

#### Viewport
- viewport：可视窗口，也就是浏览器。
- vw Viewport宽度， 1vw 等于viewport宽度的1%
- vh Viewport高度， 1vh 等于viewport高的的1%

#### CSS3使用Calc

calc()使用通用的数学运算规则，但是也提供更智能的功能：

> 使用`+`、`-`、`*` 和 `/`四则运算；
> 可以使用百分比、px、em、rem等单位；
> 可以混合使用各种单位进行计算；
> 表达式中有`+`和`-`时，其前后必须要有空格，如`widht: calc(12%+5em)`这种没有空格的写法是错误的；
> 表达式中有`*`和`/`时，其前后可以没有空格，但建议留有空格。

```css
div{
    /*减号前后必须有空格*/
    height: calc(100vh - 100px);
}
```

### text-align

- **text-align不会作用于块级元素**
- **text-align作用于文本**
- **text-align作用于内联元素**
- **text-align作用于图片**

### 内部盒子因为margin整体下移

- 在父级没有设置border 或 overflow 的情况下，子级的margin 会和父级的margin 合并起来(是合并，不是增加)
- 也就是说假如，你设置了父级的margin-top为50px,子级设置的是 80px，那么由于边距合并，显示的就是 父级离顶部的距离为 80px
- 解决边距合并的方法很多，最常用的是给父级设置 overflow:hidden；
- 除了这个方法，还可以通过设置浮动，定位, 设置padding 来替代等方法来解决边距合并问题。

### 输入框的属性

#### placeholder

- 规定帮助用户填写输入字段的提示。
- ::placeholder可以设置占位符文本的样式

#### autocomplete

- on/off
- 规定是否使用输入字段的自动完成功能。

#### spellchek

- true/false
- 是否进行拼写检查

---

网页字体参考：<https://www.5axxw.com/tools/api/webfont.html>

css2在线文档：<https://www.5axxw.com/tools/api/css2_cn.html>

css3中文参考手册：<https://www.5axxw.com/tools/api/css3_cn.html>

------

赶快开始新的学习吧··········