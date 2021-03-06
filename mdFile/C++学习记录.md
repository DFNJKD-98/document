---
title: C++学习记录
tags: c++
---

## 头文件与源文件

### [头文件如何来关联源文件?](https://wenku.baidu.com/view/2a120b16a45177232f60a2bd.html)

这个问题实际上是说，已知头文件`"a.h"`声明了一系列函数(仅有函数原型,没有函数实现)，`"b.cpp"`中实现了这些函数，那么如果我想在`"c.cpp"`中使用`"a.h"`中声明的这些在`"b.cpp"`中实现的函数，通常都是在`"c.cpp"`中使用`#include "a.h"`,那么`c.cpp`是怎样找到`b.cpp`中的实现呢?其实`.cpp`和`.h`文件名称没有任何直接关系，很多编译器都可以接受其他扩展名。
谭浩强老师的《C 程序设计》一书中提到，编泽器预处理时，要对`#include`命令进行"文件包含处理"：将`headfile.h`的全部内容复制到`#include headfile.h"`处。这也正说明了，为什么很多编译器并不 care 到底这个文件的后缀名是什么----因为`#include`预处理就是完成了一个"复制并插入代码”的工作。

**程序编译的时候，并不会去找` b.cpp`文件中的函数实现，只有在 link 的时候才进行这个工作**。我们在 `b.cpp`或`c.cpp` 中用`#include "a.h"`实际上是引入相关声明，使得编译可以通过，程序并不关心实现是在哪里，是怎么实现的。源文件编译后生成了目标文件（.o 或.obj 文件〉，目标文件中，这些函数和变量就视作一个个符号。在 link 的时候，需要在 `makefile`里面说明需要连接哪个.o 或.cbj 文件(在这里是 b.cpp 生成的.o 或.obj 文件〕，此时，连接器会去这个.o 或.obj 文件中找在 `b.cpp`中实现的函数，再把他们 build 到 `makefile`中指定的那个可以执行文件中。
在 VC 中，一般情况下不需要自己写`makefile`，只需要将需要的文件都包括在 project 中，VC 会自动帮你把 makefile 写好。
通常，编译器会在每个.o 或.obj 文件中都去找一下所需要的符号，而不是只在某个文件中找或者说找到一个就不找了。因此，如果在几个不同文件中实现了同一个函数，或者定义了同一个全局变量，链接的时候就会提示`"redefined"`

## 变量与对象

> 相关概念：自动对象、寄存器变量、静态局部变量

### 变量

- 变量是程序运行期间其值可改变的量
- 变量提供了程序可以操作的、有名字的存储区

### 对象

- 对象是内存中具有类型的存储区
- 对象提供了程序可操作的存储区，不管这些数据是基本类型还是构造类型，是有名字的还是没名字的，是可读写的还是只读的
- 一般而言，变量是有名字的对象

## 赋值与初始化

### 赋值

- 赋值的含义是擦除对象的当前值并用新值代替

### 初始化

- 对象定义时指定了变量的类型和标识符，也可以为对象提供初始值。
- 初始化除了提供初值外，还创建了对象。因此，创建对象并给它初始值就称为初始化

#### 复制初始化

- 语法形式为：

  ```c++
  类型 变量名=初值 // int a=10;
  ```

#### 直接初始化

- 语法形式为：

  ```c++
  类型 变量名(初值) // int x(10);
  ```

## 声明与定义

- 当`extern`声明出现在全局作用域上，`extern`声明允许出现初始化。但是此时不能再**定义对象**，随后给出的`extern`声明不能再初始化。比如：

  ```c++
  extern int a=100; // 允许
  int a; // 不能再定义
  extern int a=100; // 不能再初始化
  ```

- 在全局作用域上，可以让声明初始化。但是这种写法的声明被当作定义，因而只能出现一次

## 函数

### 定义

```c++
返回类型 函数名（形式参数列表）
{
    函数体
}
```

**注意：**

- 形式参数列表要么不写，要么写void。例如：`int fun(void){}`
- 早期的`C`语言规定如果没有给出返回类型，默认是`int`型

**相关概念：**

- 函数接口：函数名、形式参数列表和返回类型组成的函数头成为函数接口
- 函数体：函数体包含声明部分和执行语句
- 空函数：函数体无任何内容
- 调用点：函数A中调用函数B的代码位置成为调用点

### 函数参数

#### const参数

- 函数定义时，允许在形参的类型前面加上const限定，语法形式为：

  ```c++
  返回类型 函数名(const 类型 形式参数, ...)
  {
      函数体
  }
  ```

- `const`表示在函数体中不能对这个参数做修改

#### 可变函数参数

- `C++`支持函数的参数数目是不确定的，其语法形式为：

  ```c++
  返回类型 函数名(类型1 参数名1, 类型2 参数名2, ...)
  {
      函数体
  }
  ```

- 形参可以分为两个部分：个数确定的固定参数和个数可变的可选参数

- 代表可选参数的三个点只能位于形参列表的最后

- 在函数体中可以使用`<cstdarg>`头文件定义的几个`va_*`的宏来引用可变参数

- **如果函数形参列表中没有固定参数，将无法通过宏来提取参数，所以至少使用一个固定参数**

#### 默认参数

- 语法形式为：

  ```c++
  返回类型 函数名（类型1 参数名1, ..., 类型 默认参数名=默认值）
  {
      函数体
  }
  ```

- `C`语言中函数形参不能初始化

- `C++`允许在函数定义或函数声明时为形参指定默认值

- **注意：**

  - 在同一个作用域中，默认参数只能设置一次。**即如果在函数定义时设置了默认参数，就不能在函数声明中再次设置，即使设置完全相同；如果在一个函数声明中已经设置了默认参数，那么在其后的函数重复声明和函数定义均不能再次设置**
  - 可以设置多个默认参数，设置的顺序为自右向左，换言之，**要为某个参数设置默认值，则它右边的所有参数必须都是默认参数**

### 函数声明和函数原型

> 在函数调用前，需要给出函数声明，方法是使用函数原型

#### 函数声明

- 在调用一个函数前必须有该函数的声明
- 函数只能定义一次，但是可以声明多次
- 函数定义语法既是函数定义，也是函数声明

#### 函数原型

- 调用库函数（被存储为二进制）时，需要使用函数原型

- **函数原型属于C++的声明语句**

- 语法形式为：

  ```c++
  返回类型 函数名（类型1 参数名1, 类型2 参数名2, ...）；
  
      或
  
  返回类型 函数名（类型1, 类型2, ...); 
  ```

### 函数重载

- `C++`函数重载的语法规则是在同一个域中的同一个函数名可以用来定义多个函数，但是函数参数列表应彼此有不同：或者是参数个数不同，或者是参数类型不同，或者是两者均不同

### 函数模板

- 语法形式为：

  ```c++
  template<模板形参列表>返回类型 函数名（形式参数列表）
  {
      函数体
  }
  ```

- 模板形参列表的语法形式为：

  ```c++
  typename 类型参数名1, typename 类型参数名2, ...
      或
  class 类型参数名1, class 类型参数名2, ...
      或
  typename 类型参数名1, class 类型参数名2, ...
      或
  typename 类型参数名1, 类型 非类型形参1, ...
  ```

  - `typename` 和 `class` 都是关键字，早期`C++`标准只能使用关键字`class`

  - 对于第四种语法形式举例：

    ```c++
    template<class T, int N>void outchar(T a)
    {
        for (int i=1; i<=N; i++) cout << a;
    }
    ```

- 内联模板函数

  - 函数模板可以像非模板函数一样声明为内联，称为内联模板函数

  - 语法形式为：

    ```c++
    template<模板形参表>inline 返回类型 函数名(形式参数列表);
    ```

- 模板声明

  - 像普通函数一样，对于模板可以只声明而不定义。声明必须指出函数是一个模板

  - 语法形式为：

    ```c++
    template<模板形参表>返回类型 函数名(类型1 参数名1, ...);
    ```

## 作用域和生命期

### 局部变量

- 在**函数内部**或**复合语句**中定义的变量称为局部变量，又称为内部变量

### 全局变量

- 在**源文件中**，但是在**函数外部**定义的变量，称为全局变量

### 作用域

- `C++`的**实体**通常有三类：

  - 变量或对象，如基本类型对象、数组对象、指针对象和结构体对象等
  - 函数
  - 类型，如结构体类型和共用体类型等

- 在同一个作用域上，`C++`程序中每个**名字**都与唯一的**实体**对应；在不同的作用域上，可以多次使用同一个名字，对应作用域中的不同实体

- 作用域有如下五种：

  - 文件作用域：一个C++程序中**所有源文件构成的区域**。对于每个源文件来讲，就是从第一行到文件结束的区域
  - 函数作用域：从函数头开始直到函数的右大括号`}`结束之间的区域。所有的函数作用域都是在文件作用域中的
  - 块作用域：有复合语句的一对大括号`{}`界定的区域。块作用域只能在函数作用域内，不能直接放在文件作用域上
  - 类型声明作用域：指在结构体类型、共用体类型声明和类类型声明中由一堆大括号`{}`界定的区域。类型声明作用域可以放在文件作用域、函数作用域和块作用域中
  - 函数原型作用域：指函数原型中括号内的区域，即形参列表所处的区域。函数原型作用域可以放在文件作用域、函数作用域、块作用域和类型声明作用域中

- 在上述的几种作用域中，**文件作用域是全局作用域，其余为局部作用域**

- 除了函数原型作用域外，局部作用域都是用一堆大括号`{}`界定的

- 可以使用`extern`声明将**变量或函数实体**的可见区域（有效区域）往前延伸，称为**前置声明**

  - 语法形式为：

    ```c++
    // extern 声明变量实体的形式如下
    extern 类型 变量名, ...
    // extern 声明函数原型的形式如下
    extern 返回类型 函数名(类型1, 类型2, ...);
    ```

- **在全局作用域中，变量或函数实体若使用`static`修饰，则该实体对于其他源文件是屏蔽的，称为私有的**

  - 语法形式为：

    ```c++
    // static 修饰变量实体的形式为：
    static 类型 变量名[=初值], ...
    // static 修饰函数原型的形式为：
    static 返回类型 函数名(类型1, 类型2, ...);
    ```

## 预处理命令

### typedef

- 可以使用它来为类型取一个新的名字

  ```C++
  typedef unsigned char BYTE;
  ```

- 也可以使用 typedef 来为用户自定义的数据类型取一个新的名字

  ```c++
  typedef struct Books
  {
     char  title[50];
     char  author[50];
     char  subject[100];
     int   book_id;
  } Book;
  ```

### #define

- #define 是 C 指令，用于为各种数据类型定义别名

### 二者区别

- **typedef** 仅限于为类型定义符号名称，**#define** 不仅可以为类型定义别名，也能为数值定义别名，比如可以定义 1 为 ONE
- **typedef** 是由编译器执行解释的，**#define** 语句是由预编译器进行处理的

## 数组

### 一维数组

- 语法形式为：

  ```c++
  // 定义及初始化
  元素类型 数组名[常量表达式]={初值列表}, ...
  // 引用
  数组名[下标表达式]
  ```

- 初值列表提供的元素个数不能超过数组长度，但可以小于数组长度。此时，只初始化前面的数组元素，剩余元素初始化为0，即空字符

- 在提供了初值列表的前提下，数组定义时可以不用指定数组长度

### 多维数组

- 语法形式为：

  ```c++
  // 定义及初始化，以二维数组为例
  类型 数组名[常量表达式1][常量表达式2]={{初值列表1}, {初值列表2}}
  类型 数组名[常量表达式1][常量表达式2]={初值列表}
  // 引用
  数组名[下标表达式1][下标表达式2]...[下标表达式n]
  ```

- 在提供了初值列表的前提下，多维数组定义时可以不用指定第一维的数组长度，但是其余维度的长度必须指定

### 数组参数

- 语法形式为：

  ```c++
  返回类型 函数名(元素类型 数组名[常量表达式], ...)
  {
      函数体
  }
  ```

- 因为函数调用时，不会为形参数组分配存储空间。所以，形参数组的长度与实参数组长度可以不相同，**形参数组的长度可以是任意值，甚至可以不用给出长度。**例如：`void f(int A[]);`

- **多维数组作为函数的参数**，形参数组第一维可以与实参相同，也可以不相同；可以是任意长度，也可以不写长度；但**其他维度的长度需要相同**。例如：`void f(int A[][10]);`

### 字符串

#### 字符数组

- 定义及初始化：

  ```c++
  char 字符串名[常量表达式]={'a','b',...,'\0'};
  char 字符串名[]={字符串常量};
  char 字符串名[]=字符串常量;
  ```

- `C++`规定字符串是以`\0`字符作为结束符的字符数组，其中`\0`字符称为空字符（NULL字符）或零字符

- 字符串长度是指在第一个空字符之前的字符个数（不包括空字符）

- 如果第一个字符就是空字符，那么称该字符串为空字符串

- **字符串常量**是字符串的常量形式，它是一对双引号括起来的字符序列。`C++`总是在编译时自动在字符串常量后面增加一个空字符，**即使人为在后面加上空字符也是如此**

#### 字符串数组

- 定义及初始化：

  ```c++
  char 数组名[常量表达式1][常量表达式2]={{'c','+','+','\0'}, {'J','a','v','a','\0'}};
  char 数组名[常量表达式1][常量表达式2]={{"C++"}, {"Java"}, {"Python"}};
  char 数组名[][常量表达式2]={"C++", "Java", "Python"}; // 只给定其余维度长度
  ```

#### 输入字符串

- `cin.get` - 逐个字符输入输出
- `scanf` - 不能输入空格、Tab和回车
- `cin` - 不能输入空格、Tab和回车
- `gets` - 可以输入空格和Tab，不能输入回车

#### 输出字符串

- `printf` - 遇到空字符结束输出
- `cout` - 遇到空字符结束输出，不输出空字符
- `puts` - 遇到空字符结束输出，不输出空字符，输完再输出一个换行符`\n`

#### 字符串处理函数

- `strcpy`
- `strncpy`
- `strcat`
- `strncat`
- `strcmp`
- `strlen`
- `atof`
- `atoi`
- `sprintf`
- `sscanf`

## 指针

> 按**对象名称**存取对象的方式（访问存储空间的方式）称为**对象直接访问**
>
> 通过**对象地址**存取对象的方式称为**指针间接访问**
>
> C++**将地址称为指针**，即一个对象的地址称为该对象的指针

### 指针的基本使用

#### 指针变量

- 定义以及初始化：

  ```c++
  指向类型 *指针变量名=地址初值;
  ```

- 将专门用来存放对象地址的变量称为指针变量，其数据类型为**指针类型**

- 每个指针变量都有一个与之关联的**指向类型**，它决定了指针所指向的对象的数据类型

- 指向类型的不同表示指针变量所指向的对象的类型不同，而非指针变量的类型不同。**所有指针变量的内存形式均是相同的。**通常编译器为指针变量分配4个字节的存储空间，用来存放指针所指向对象的地址

- `C++`不会对不同指向类型的指针作隐式类型转换

#### 各种特殊的指针

- `C++`提供一种特殊的指向类型`void *`，它可以保存任何类型对象的地址，称这样的指针为***“纯指针”***
- 如果指针的值为0，称为0值指针，又称***“空指针”***
- 一个指针还没有初始化，称为***“野指针”***
- 一个指针曾经指向一个已知对象，在对象的内存空间释放后，指针所指的是未知对象，称为***“迷途指针”***

#### 指针运算

- 加减运算：

  - `p+1` 不是按数学意义来计算的，而是按指针的地址意义来计算的。
  - 一般地，如果指针所指向对象的类型为TYPE，那么`p+n`或者`p-n`的值为：p的地址值+/-n*sizeof(TYPE)

- 自增自减运算：
  - 后加和后减运算表达式的值(p++，p--)指向变量x，p指向变量x后的第一个int型内存单元
  - 前加和前减运算表达式的值(++p，--p)和p均指向变量x后的第一个int型内存单元
  
- 两个指针相减运算：

  - 设p1和p2是同一个指向类型的两个指针，则p2-p1的结果为两个指针之间的对象个数
  - 如果p2的地址值大于p1，结果为正，否则为负

- **显示类型转换**：`(转换类型 *)p`

  | 表达式   | 表达式结果 | 指针指向 |
  | -------- | ---------- | -------- |
  | `*p++`   | `a[0]`     | `a[1]`   |
  | `*++p`   | `a[1]`     | `a[1]`   |
  | `(*p)++` | `a[0]++`   | `a[0]`   |

#### 指针的const限定

- 指向const对象的指针（常量指针或常指针），定义形式为：

  ```c++
  const 指向类型 *指针变量名;
  const int *p; // p 的指向类型为 const int*
  ```

- const指针（指针常量），定义形式为：

  ```c++
  指向类型* const 指针变量名;
  int* const p; // p 的指向类型为 int *
  ```

- 指向const对象的const指针，定义形式为：

  ```c++
  const 指向类型* const 指针变量名;
  const int* const p; // p的指向类型为 const int*
  ```

### 多级指针

作为指针变量的内存单元也有地址。显然，存放指针变量地址的变量还是一个指针变量，即二级指针变量

- 定义语法形式：

  ```c++
  指向类型 **...* 指针变量名;
  ```

### 指针与数组

> C++规定，数组名即代表数组对象，又是数组首元素的**地址值**，即数组A与第0个元素的地址`&A[0]`相同
>
> 数组名A是一个**指针常量**，在整个程序运行期间是固定不变的
>
> **对数组名取地址，结果仍然为数组首地址**，即(`&A == A == &A[0]`)

#### 指针与一维数组

- `&a[i] == p+i == a+i == &p[i]`
- `a[i] == *(p+i) == *(a+i) == p[i]`
- 实际上，编译器总是将`a[i]`转换为`*(a+i)`、`&a[i]`转换为`a+i`处理的
- 使用指针引用法，指针变量直接指向元素，不必每次都重新计算地址，能提高运行效率

#### 指针与二维数组

假设由定义`int a[3][4]`。从二维数组的角度来看，`a`是二维数组首元素的地址，而这个首元素不是一个整型元素，而是由4个整型元素所组成的一维数组

- `a`与`&a[0][0]`等价
- `a[0]`与`&a[0][0]`等价
- `&a[i]`与`a+i`等价。**它们均指向第`i`行**

**注意：**`&a[i]`是第`i`行的地址，`a[i]`是第`i`行的首元素的地址，两者的值相同，但含义不一样。**`&a[i]`指向行，`a[i]`指向第`i`行的首元素（即指向第0列）。**`&a[i]+1`是下一行地址，而`a[i]+1`是第`i`行下一列（第1列）元素的地址。

#### 数组指针

`C++`可以定义一个指针变量，**其指向类型是一个数组**（一维或者多维），称为数组指针

- 定义语法形式：

  ```c++
  指向类型 (*指针变量名)[常量表达式1][常量表达式2],...
  ```

- `[]`的优先级比`*`高

#### 指针数组

一个数组，若其元素为指针类型，称为指针数组

- 定义的语法形式：

  ```c++
  指向类型 *数组名[常量表达式1][常量表达式2],...
  ```

- 若指针数组未初始化，则它的每个元素都是一个野指针

### 指针与字符串

- 字符指针指向字符串

  ```c++
  char *字符指针变量=字符串常量;
  ```

- 指针数组表示字符串数组

  ```c++
  char *数组名[]={字符串1, 字符串2, ...};
  ```

- 二维指针表示字符串数组

  ```c++
  char **指针变量=二维字符数组名/一维指针数组名;
  ```

### 指针与函数

#### 函数指针

函数是实现特定功能的程序代码的集合，实际上，函数代码在内存中也要占据一段存储控件，这段存储空间的起始地址称为函数入口地址。C++规定函数入口地址为函数的指针，即函数名即代表函数，又是函数的指针（或地址）

- C++允许定义指向函数的指针变量，定义形式为：

  ```c++
  返回类型 (*函数指针变量名)(形式参数列表);
  ```

- 它要求函数指针变量与指向函数必须有相同的返回类型、参数个数、参数类型

- 通过函数指针调用函数，一般形式为：

  ```c++
  (*函数指针)(实参)
  	或
  函数指针(实参)
  ```

- 函数指针变量可以作为函数形参，此使实参要求是函数名或函数指针

## 引用

> **引用是 c++对 c 的重要扩充。**在 c/c++中指针的作用基本都是一样的，但是 c++增加了另外一种给函数传递地址的途径，这就是按引用传递(pass-by-reference)
>
> 引用是C++实现的一种限制比较严格的常值指针，它在使用之前自动做间接引用，而指针需要显式的间接引用

### 定义

- 声明形式为：

  ```c+=
  引用类型 &引用名称=对象名称;
  ```

- 引用必须初始化

- 引用只能绑定在对象上，而不能与字面值或某个表达式的计算结果绑定在一起

- 引用在 C++内部的实现是**指针常量**(别人可以变，自己不能)，即引用初始化之后不能改变，即 b 是 a 的别名后，不能改为是 c 的别名。注意区别于**常指针**(指向谁，谁不能变)

- 引用不需要分配另外的内存单元

- 函数返回引用可以作为左值，即`fun(x,y)=z;`

- 不能有 NULL 引用。必须确保引用是和一块合法的存储单元关联

### 常引用

- 声明形式为：

  ```c++
  const 类型 &引用名称=对象名称;
  ```

- 不允许通过引用对绑定对象的值进行修改

- 不能声明非const引用作为const对象的别名。例如：不能把一个字面量赋给引用，但是可以把一个字面量赋给常引用

- **注意：**函数返回产生的临时对象是const类型的

### 数组引用

- 数组也是一种数据类型
- `int`和`int *`是不同的数据类型

```c++
int arr[] = {1,2,3,4,5};

// 第一种方式
typedef int(MY_ARR)[5]; // 定义数组类型
MY_ARR &arref = arr; // 建立引用，相当于 int &b = a

// 第二种方式
int (&arref2)[5] = arr;

// 第三种方式
typedef int(&MY_ARR2)[5]; // 建立引用数组类型
MY_ARR2 arref3 = arr;
```

## 自定义数据类型

### 结构体

> C语言的结构体类型只能用`struct 结构体类型名`表示。C++兼容C语言的结构体类型，即可以用C语言方式，又可以直接用`结构体类型名`表示

#### 结构体对象的定义和初始化

- 先定义结构体类型，再定义对象

  ```c++
  结构体类型名 结构体对象名 = {初值序列}; // C++方式
  struct 结构体类型名 结构体对象名; // 兼容的C语言方式
  ```

- 定义结构体类型的同时定义对象

  ```c++
  struct 结构体类型名 {
      成员列表
  }结构体对象名 = {初值序列};
  ```

- 直接定义结构体对象

  ```c++
  struct {
      成员列表
  }结构体对象名 = {初值序列};
  ```

### 共用体

共用体内存长度是所有成员内存长度的最大值，结构体内存长度是所有成员内存长度之和

**定义共同体对象时可以进行初始化，但只能按一个成员给予初值**

- 先定义共用体类型，再定义共用体对象

  ```c++
  共用体类型名 共用体对象名 = {初值};
  ```

- 同时定义共用体类型和定义共用体对象

  ```c++
  union 共用体类型名 {
      成员列表
  }共用体对象名 = {初值};
  ```

- 直接定义共用体对象

  ```c++
  union {
      成员列表
  }共用体对象名 = {初值};
  ```

### 枚举

## 命名空间

### 为什么有命名空间

- 解决多人协作时标识符重复命名的问题

### 什么是命名空间

```c++
namespace A{
    int name='bob';
    void show(){
        cout<<"hello"<<endl;
	}
}
```

### 使用命名空间

#### 作用域运算符的使用

```c++
int main(){
    std::cout<<"Hello World!"<<endl;
}
```

#### 匿名空间

- 意味着命名空间中的标识符只能在本文件内访问，相当于给这个标识符加上了 static，使得其可以作为内部连接

  ```c++
  namespace{
      d=30;
  }
  int main(){
      cout<<d<<endl;
  }
  ```

#### 给命名空间取别名

- `namespace 新名字=旧名字`

  ```c++
  int main(){
      namespace newA = A;
      cout<<newA::a<<endl;
  }
  ```

#### using

- using 声明是让命名空间中的某个标识符可以直接使用

  ```c++
  namespace A{
      int a=10;
  }
  int main(){
      using A::a;
      cout<<a<<endl; // a -> 10
  }
  ```

- **注意 using 声明了某个变量后，在该作用域不能定义同名的变量**

  ```c++
  namespace A{
      int a=10;
  }
  int main(){
      using A::a;
      cout<<a<<endl;
      int a; // 这是错误的，不能再定义同名的变量了
  }
  ```

#### using namespace

- 让某个命名空间中的所有标识符可以直接使用，不需要使用作用域运算符

- **同时可以在该作用域内定义同名的变量**

  ```c++
  namespace A{
      int a=10;
      int b=20;
      int c=30;
  }
  int main(){
      using namespace A;
      cout<<a<<endl; // a->10
      cout<<b<<endl; // b->20
      cout<<c<<endl; // c->30
      int a=40;
      cout<<a<<endl; // a->40
  }
  ```

### 注意

- 命名空间只能写在全局

- 命名空间可以嵌套命名空间

  ```c++
  namespace A{
      int a=10;
      namespace B{
          int b=20;
      }
  }
  ```

- 命名空间是开放的，随时可以加入新成员。但是，新成员只能在加入后使用

  ```c++
  namespace A{
      int c=30;
  }
  // 命名空间A中不只是有变量c，还有上面的变量a和命名空间B
  ```

- 声明和实现可分离

  ```c++
  // test.h
  namespace A{
      void func1();
      void func2(int param);
  }
  // test.cpp
  void A::func1(){
      cout<<"A::func1"<<endl;
  }
  void A::func2(int param){
      cout<<"B::func2"<<endl;
  }
  ```
