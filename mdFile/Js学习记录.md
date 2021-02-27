<h2 align="center">Js学习记录</h2>

### 2020/10/22学习记录

- 当数值和字符串相加时，JavaScript 将把数值视作字符串。

- JavaScript 对象用花括号来书写。对象属性是 name:value 对，由逗号分隔。

- 使用 JavaScript 的 typeof 来确定 JavaScript 变量的类型(类似python中的type（）函数)
  typeof 运算符对数组返回 "object"，因为在 JavaScript 中数组属于对象。

- Undefined 与 null 的值相等，但类型不相等：undefined的类型是undefined，null的类型是对象。

- 调用函数时，没有加上括号，将返回函数的定义。

- JavaScript的对象的方法，将函数定义存储在属性中，以键值对的形式封装在内部。在函数定义中，this 引用该函数的“拥有者”。

- 通过关键词 "new" 来声明 JavaScript 变量，该变量会被创建为对象。

- 常见的 HTML 事件：

  1. onchange HTML 元素已被改变
  2. onclick 用户点击了 HTML 元素
  3. onmouseover 用户把鼠标移动到 HTML 元素上
  4. onmouseout 用户把鼠标移开 HTML 元素
  5. onkeydown 用户按下键盘按键
  6. onload 浏览器已经完成页面加载

- === 运算符需要类型和值同时相等。

- indexOf() 方法返回字符串中指定文本首次出现的索引（位置）;
  lastIndexOf() 方法返回指定文本在字符串中最后一次出现的索引;
  如果未找到文本， indexOf() 和 lastIndexOf() 均返回 -1。

- search() 方法搜索特定值的字符串，并返回匹配的位置。但是要注意的是：
  search() 方法无法设置第二个开始位置参数。
  indexOf() 方法无法设置更强大的搜索值（正则表达式）。

- 提取部分字符串

  ,有三种提取部分字符串的方法：

  1. slice(start, end);
  2. substring(start, end);
  3. substr(start, length)

- **替换字符串内容:**
  replace() 方法用另一个值替换在字符串中指定的值。
  replace() 方法不会改变调用它的字符串。它返回的是新字符串。
  默认地，replace() 对大小写敏感。如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）
  如需替换所有匹配，请使用正则表达式的 g 标志（用于全局搜索）

- **转换为大写和小写**
  通过 toUpperCase() 把字符串转换为大写。
  通过 toLowerCase() 把字符串转换为小写。

- **所有字符串方法都会返回新字符串。它们不会修改原始字符串。正式地说：字符串是不可变的：字符串不能更改，只能替换。**

- String.trim()--------trim() 方法删除字符串两端的空白符。

- 把字符串转换为数组,通过 split() 将字符串转换为数组。
  如果省略分隔符，被返回的数组将包含 index [0] 中的整个字符串。
  如果分隔符是 ""，被返回的数组将是间隔单个字符的数组。

------

### 2020/10/24学习记录

- 对象是易变的：它们通过引用来寻址，而非值。无法将对象赋值给另外一个变量创建副本。
- for (x in person) 会遍历person对象中的属性。
- delete 关键词从对象中删除属性:delete person.age;delete 操作符不应被用于预定义的 JavaScript 对象属性。这样做会使应用程序崩溃。
- 在 JavaScript 中，被称为 this 的事物，指的是拥有该 JavaScript 代码的对象。this 的值，在函数中使用时，是“拥有”该函数的对象。
- 由我们创建但不由我们调用的函数为回调函数

------

赶快开始新的学习吧··········