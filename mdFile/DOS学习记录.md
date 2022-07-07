---
title: DOS学习记录
---

## DOS学习记录

### 命令/符号记录

#### echo

- 显示此命令后的字符

#### echo off

- 在此语句后所有运行的命令都不显示命令行本身

#### @

- 加在每个命令行的最前面，表示运行时不显示这一行的命令行

#### call

- 调用另一个批处理文件，执行完另一个批处理文件后还会返回执行当前文件的后续命令

#### pause

- 暂停批处理的执行，并在屏幕上显示Press any key to continue...的提示

#### rem

- 此命令后的字符为注释，不会显示在命令行窗口中

#### %

- 参数表示符

- %[1-9]表示参数

- 参数是指在运行批处理文件时在文件名后加的以空格（或者Tab）分隔的字符串

- 变量可以从%0到%9，%0表示批处理命令本身，其它参数字符串用%1到%9顺序表示

  ```
  // test.bat
  @echo off
  type %1
  type %2
  // 执行命令 test hello world
  %1 表示hello
  %2 表示world
  ```

#### if

- if 是条件语句，用来判断是否符合规定的条件，从而决定执行不同的命令。 有三种格式

  - if [not] "参数" == "字符串" 待执行的命令

    > 参数如果等于(not表示不等，下同)指定的字符串，则条件成立，运行命令，否则运行下一句。
    >
    > 例：if "%1"=="a" format a:

  - if [not] exist [路径\]文件名 待执行的命令

    > 如果有指定的文件，则条件成立，运行命令，否则运行下一句。
    >
    > 如: if exist c:\config.sys type c:\config.sys
    >
    > 表示如果存在c:\config.sys文件，则显示它的内容。

  - if errorlevel <数字> 待执行的命令

    > 很多DOS程序在运行结束后会返回一个数字值用来表示程序运行的结果(或者状态)，通过if errorlevel命令可以判断程序的返回值，根据不同的返回值来决定执行不同的命令(返回值必须按照从大到小的顺序排列)。如果返回值等于指定的数字，则条件成立，运行命令，否则运行下一句。
    >
    > 如if errorlevel 2 goto x2

#### goto

- 批处理文件运行到这里将跳到goto所指定的标号(标号即label，标号用:后跟标准字符串来定义)处，goto语句一般与if配合使用，根据不同的条件来执行不同的命令组。

  ```
  goto end
   
  :end 
  echo this is the end
  ```

#### choice

- 使用此命令可以让用户输入一个字符（用于选择），从而根据用户的选择返回不同的errorlevel，然后于if errorlevel配合，根据用户的选择运行不同的命令。
- **注意：choice命令为DOS或者Windows系统提供的外部命令，不同版本的choice命令语法会稍有不同，请用choice /?查看用法。**

#### for

- 循环命令，只要条件符合，它将多次执行同一命令

  ```
  FOR %%variable IN (set) DO command [command-parameters]
  
  %%variable   指定一个单一字母可替换的参数。
  (set)       指定一个或一组文件。可以使用通配符。
  command     指定对每个文件执行的命令。
  command-parameters
               为特定命令指定参数或命令行开关。
  ```

  > for %%c in (*.bat *.txt) do type %%c
  >
  > 则该命令行会显示当前目录下所有以bat和txt为扩展名的文件的内容。

#### IF EXIST && IF ERRORLEVEL

- IF EXIST 是用来测试文件是否存在的，格式为IF EXIST [路径+文件名] 命令
- IF ERRORLEVEL 是用来测试它的上一个DOS命令的返回值的，注意只是上一个命令的返回值，而且返回值必须依照从大到小次序顺序判断。

#### type

- 显示文本文件的内容

#### title

- 更改cmd窗口标题名字

#### color

- 设置cmd控制台前景和背景颜色

#### exit

- 退出cmd.exe程序
- 用参数/B则是退出当前批处理脚本而不是cmd.exe

### Links

- https://www.jb51.net/article/49627.htm

### FAQ

#### 开启一个新的cmd窗口来运行另一个bat文件

- `start “” cmd /k call b.bat`

  > “”是一段字符串，代表新打开的cmd窗口的名字，可以随便起名。 
  > /k是表示新打开的cmd窗口在执行完命令后保存打开状态，如果希望执行完就关闭窗口就使用/c 
  > call b.bat表示call命令，即调用b.bat文件；该命令可以用""括起来，即："call b.bat"
