## 配置深色主题
  - setting -> 外观 -> dark
  - 使用GNOME扩展安装Yaru深色shell主题
    ```shell
    sudo apt install chrome-gnome-shell
    ```
  - 进入扩展页面启用扩展
  - 安装GNOME调整工具
    ```shell
    sudo apt install gnome-tweaks
    ```
  - 打开GNOME调整工具，进入外观部分，切换Shell主题

## 安装软件
### 什么是软件源
  - 在使用Debian或者Ubuntu的apt-get工具来安装需要的软件时，其实就是从服务器获取需要安装的软件并把它安装在本地计算机的过程。所谓的软件源，就是我们获取软件的来源，它是定义在/etc/apt/sources.list文件里的
### [换源](https://www.cnblogs.com/liuzhenbo/p/11069285.html)
  - 查看Ubuntu系统的Codename
    ```shell
    lsb_release -a
    ```
    
  - LSB是一套核心标准，它保证了LINUX发行版同LINUX应用程序之间的良好结合。它是 Linux 标准化领域中事实上的标准，制定了应用程序与运行环境之间的二进制接口。这里检测到LSB，模块没有获取，执行以下语句获取
    ```shell
    dfnjkd98@dfnjkd98-Inspiron-5590:~$ sudo apt install lsb-core -y
    dfnjkd98@dfnjkd98-Inspiron-5590:~$ lsb_release -a
    LSB Version:	core-11.1.0ubuntu2-noarch:security-11.1.0ubuntu2-noarch
    Distributor ID:	Ubuntu
    Description:	Ubuntu 20.04.2 LTS
    Release:	20.04
    Codename:	focal
    dfnjkd98@dfnjkd98-Inspiron-5590:~$ 
    ```
    
- 备份并修改sources.list

  ```shell
  sudo cp /etc/apt/sources.list /etc/apt/sources.beifen.list
  ```

  ```shell
  # 创建并编辑清华源的配置文件
  sudo gedit /etc/apt/sources.qinghua.list
  
  # 清华源信息：
  # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
  deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
  # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
  deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
  # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
  deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
  # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
  deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
  # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
  # 预发布软件源，不建议启用
  # deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-proposed main restricted universe multiverse
  # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-proposed main restricted universe multiverse
  ```

  ```shell
  # 创建并编辑阿里源的配置文件
  sudo gedit /etc/apt/sources.aliyun.list
  # 阿里源信息：
  # deb cdrom:[Ubuntu 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.1)]/ xenial main restricted
  deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties
  deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
  deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties
  deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
  deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties
  deb http://mirrors.aliyun.com/ubuntu/ xenial universe
  deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
  deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
  deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
  deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
  deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties
  deb http://archive.canonical.com/ubuntu xenial partner
  deb-src http://archive.canonical.com/ubuntu xenial partner
  deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
  deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties
  deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
  deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse
  ```

  ```shell
  # 选用阿里源
  sudo cp sources.aliyun.list sources.list
  ```

- 刷新

  ```shell
  sudo apt-get update
  ```
### apt是什么？
  - Advanced Packaging Tool（apt）是Linux下的一款安装包管理工具

  - APT由几个名字以“apt-”打头的程序组成。apt-get、apt-cache 和apt-cdrom是处理软件包的命令行工具

  - 作为操作的一部分，APT使用一个文件列出可获得软件包的镜像站点地址，这个文件就是/etc/apt/sources.list

  - APT作为dpkg的前端. Linux命令—apt，也是其它用户前台程序的后端，如dselect 和aptitude

    | **命令**                 | **含义**               |
    | :----------------------- | :--------------------- |
    | sudo apt-get update      | 获得最新的软件包的列表 |
    | sudo apt-get install xxx | 从源中安装xxx软件      |
    | sudo apt-get remove xxx  | 删除xxx软件            |
    | sudo apt-get clean       | 清理安装包             |

### 软件包安装

- 在Ubuntu下安装文件为deb格式

- 软件安装

  ```shell
  sudo dpkg -i xxx.deb
  ```

- 软件卸载

  ```shell
  sudo dpkg -r 软件名
  ```

### 安装flameshot
  - 使用命令
    ```shell
    sudo apt-get install flameshot
    ```
  - 出现错误
    ```shell
    无法获得锁 /var/lib/dpkg/lock。锁正由进程 14257（dpkg）持有
    ```
  - 解决错误
    ```shell
    sudo kill 14257
    ```
  - 什么是dpkg
    - dpkg是Debian package的简写，为“Debian”操作系统 专门开发的套件管理系统，用于软件的安装，更新和移除
  - 设置快捷键，快捷启动截图软件, 设置->键盘快捷键->底部点击+号->添加启动快捷键
### 安装Typora
  - [下载二进制文件](https://www.typora.io/#linux)

  - 使用tar命令解压
    ```shell
    tar -xzvf Typora-linux-x64.tar.gz
    ```
    
- 创建桌面图标

  ```shell
  touch Typora.desktop
  ```

- 编辑桌面图标

  ```shell
  [Desktop Entry]
  Name=Typora
  GenericName=Editorubuntu / linux 
  Comment=Typroa - a markdown editor
  Exec="/home/dfnjkd98/下载/bin/Typora-linux-x64/Typora" %U
  Icon=/home/dfnjkd98/下载/bin/Typora-linux-x64/resources/assets/icon/icon_256x256.png
  Terminal=false
  Categories=Markdown;ux
  StartupNotify=false
  Type=Application
  ```

- 移动文件

  ```shell
  sudo -mv Typora.desktop /usr/share/applications
  ```

### 安装Vim

```shell
sudo apt install vim
```

## 命令解释器

> Linux系统中提供了好几种不同的命令解释器，如shell(/bin/sh)、bash(/bin/bash)等，一般默认使用bash作为默认的解释器

### Bash解释器常用快捷键

#### Tab键

- 补齐命令
- 补齐路径
- 显示当前目录下的所有目录

#### 清屏

`clear`可以清楚终端上的显示（类似于DOS的cls清屏功能），也可使用快捷键：`Ctrl+L`

#### 终端进程

`Ctrl+c`的作用是中断终端的操作

#### 遍历输入的历史命令

- 从当前位置向上遍历：`Ctrl+p`(**↑**)
- 从当前位置向下遍历：`Ctrl+n`（**↓**）

#### 光标相关操作

- 光标左移：`Ctrl+b`（**←**）
- 光标右移：`Ctrl+f`（**→**）
- 移动到头部：`Ctrl+a`（**Home**）
- 移动到尾部：`Ctrl+e`（**End**）

#### 字符删除

- 删除光标前面的字符：`Ctrl+h`（Backspace）

- 删除光标后边的字符：`Ctrl + d`

  光标后边的字符即光标覆盖的字符

- 删除光标前所有内容：`Ctrl + u`

- 删除光标后所有内容：`Ctrl + k`

### 终端相关快捷键

- 复制：`Ctrl+Shift+C`
- 粘贴：`Ctrl+Shift+V`
- 放大终端字体：`Ctrl+-Shift+=`
- 缩小终端字体：`Ctrl+-`
- 普通大小：`Ctrl+0`
- 切换全屏：`F11`

### 文件内容查看

- 显示下一行：`Ctrl+n`（回车）
- 显示上一行：`Ctrl+p`
- 显示下一页：`PageDown`
- 显示上一页：`PageUp`
- 退出：`q`
- 获取帮助：`h`

## 文件管理与目录权限控制

### 文件类型

- 在Unix/Linux操作系统中也必须区分文件类型，通过文件类型可以判断文件属于可执行文件、文本文件还是数据文件。在Unix/Linux系统中文件可以没有扩展名。

- 通常，Unix/Linux系统中常用的文件类型有7种：普通文件、目录文件、设备文件、管道文件、链接文件和套接字

#### 普通文件

> 普通文件是计算机操作系统用于存放数据、程序等信息的文件，一般都长期存放于外存储器（磁盘、磁带等）中。普通文件一般包括**文本文件、数据文件、可执行的二进制程序文件**等。
>
> 在Unix/Linux中可以通过file命令来查看文件的类型。如果file文件后面携带文件名，则查看指定文件的类型，如果携带通配符“*”，则可以查看当前目录下的所有文件的类型。

#### 目录文件

> Unix/Linux系统**把目录看成是一种特殊的文件**，利用它构成文件系统的树型结构。
>
> 目录文件只允许系统管理员对其进行修改，用户进程可以读取目录文件，但不能对它们进行修改。
>
> 每个目录文件至少包括两个条目，“..”表示上一级目录，“.”表示该目录本身。

#### 设备文件

> Unix/Linux系统**把每个设备都映射成一个文件**，这就是设备文件。它是用于向I/O设备提供连接的一种文件，分为字符设备和块设备文件。
>
> 字符设备的存取以一个字符为单位，块设备的存取以字符块为单位。每一种I/O设备对应一个设备文件，存放在/dev目录中，如行式打印机对应/dev/lp，第一个软盘驱动器对应/dev/fd0。

#### 管道文件

> 管道文件也是Unix/Linux中较特殊的文件类型，这类文件多用于进程间的通信。

#### 链接文件

> 类似于 windows 下的快捷方式，**链接又可以分为软链接（符号链接）和硬链接**。

### 文件相关命令

#### 创建文件

- 用法：`touch [选项] 文件`
- 说明：
  - 如果文件不存在, 创建新文件(只能是普通文件，不能是文件夹)
  - 如果文件存在, 更新文件时间

#### 查看文件

##### cat

- 将文件内容一次性输出到终端
- 缺点：终端显示的内容有限，如果文件太长无法全部显示

##### gedit

- 用文本编辑器打开文件

##### more

- 将文件内容分页显示到终端，但是只能一直向下浏览，不能回退

##### less

- 将文件内容分页显示到终端，可以自由上下浏览

##### head

- `head –n[行数] 文件名`

- head命令从文件头部开始查看前 n 行的内容。
- 如果没有指定行数，默认显示前10行内容。

##### tail

- `tail –n[行数] 文件名`
- 从文件尾部向上查看最后 n 行的内容
- 如果没有指定行数，默认显示最后10行内容

#### 复制文件

- 用法：`cp [选项] 文件/目录 文件/目录`

- 参数说明：

  | 选项 | 含义                                                         |
  | :--- | ------------------------------------------------------------ |
  | -a   | 该选项通常在复制目录时使用，它保留链接、文件属性，并递归地复制目录，简单而言，保持文件原有属性。 |
  | -f   | 删除已经存在的目标文件而不提示                               |
  | -i   | 交互式复制，在覆盖目标文件之前将给出提示要求用户确认         |
  | -r   | 若给出的源文件是目录文件，则cp将递归复制该目录下的所有子目录和文件，目标文件必须为一个目录名。 |
  | -v   | 显示拷贝进度                                                 |

#### 移动文件

- 用法：`mv`

- 参数说明：

  | **选项** | **含义**                                                     |
  | :------- | :----------------------------------------------------------- |
  | -f       | 禁止交互式操作，如有覆盖也不会给出提示                       |
  | -i       | 确认交互方式操作，如果mv操作将导致对已存在的目标文件的覆盖，系统会询问是否重写，要求用户回答以避免误覆盖文件 |
  | -v       | 显示移动进度                                                 |

#### 删除文件

- 用法：`rm`

- **注意**：可通过rm删除文件或目录。使用rm命令要小心，因为文件删除后不能恢复。为了防止文件误删，可以在rm后使用-i参数以逐个确认要删除的文件。

- 参数说明：

  | **参数** | **含义**                                         |
  | :------- | :----------------------------------------------- |
  | -i       | 以进行交互式方式执行                             |
  | -f       | 强制删除，忽略不存在的文件，无需提示             |
  | -r       | 递归地删除目录下的内容，删除文件夹时必须加此参数 |

#### 压缩文件

- `tar`和`gzip`结合使用实现文件打包、压缩

- tar只负责打包文件，但不压缩，用gzip压缩tar打包后的文件，其扩展名一般用xxxx.tar.gz

- tar命令的用法：`tar [选项] 打包文件名 文件`

  | **参数** | **含义**                                                  |
  | :------- | :-------------------------------------------------------- |
  | -c       | 生成档案文件，创建打包文件                                |
  | -v       | 列出归档解档的详细过程，显示进度                          |
  | -f       | 指定档案文件名称，f后面一定是.tar文件，所以必须放选项最后 |
  | -t       | 列出档案中包含的文件                                      |
  | -x       | 解开档案文件                                              |
  | -z       | 指定压缩包的格式为：file.tar.gz                           |

- **注意**：除了f需要放在参数的最后，其它参数的顺序任意

  - `tar -cvf` 创建归档文件

  - `tar -xvf`解除归档文件(还原)

  - `tar -tvf` 查看归档文件内容

  - tar这个命令并没有压缩的功能，它只是一个打包的命令，但是在tar命令中增加一个选项(-z)可以调用gzip实现了一个压缩的功能，实行一个先打包后压缩的过程。

    `tar cvzf 压缩包包名 文件1 文件2 ...`

- gzip命令的用法：`gzip [选项] 被压缩文件`

  | **选项** | **含义**       |
  | :------- | :------------- |
  | -d       | 解压           |
  | -r       | 压缩所有子目录 |

- `tar`与`bzip2`命令结合使用实现文件打包、压缩(用法和gzip一样)。

  - tar只负责打包文件，但不压缩，用bzip2压缩tar打包后的文件，其扩展名一般用xxxx.tar.bz2。
  - 在tar命令中增加一个选项(-j)可以调用bzip2实现了一个压缩的功能，实行一个先打包后压缩的过程。
  - 压缩用法：tar jcvf 压缩包包名 文件...(tar jcvf bk.tar.bz2 *.c)

- `zip`与`unzip`

  - 通过zip压缩文件的目标文件不需要指定扩展名，默认扩展名为zip
  - 压缩文件：zip -r 目标文件(没有扩展名) 源文件
  -  解压文件：unzip -d 解压后目录文件 压缩文件

#### 解压文件

- **解压用法：** 

  - tar zxvf 压缩包包名
  - tar jxvf 压缩包包名 (tar jxvf bk.tar.bz2)

  ```shell
  # 把 1.c 2.c 3.c 4.c 压缩成 test.tar.gz
  tar zcvf test.tar.gz 1.c 2.c 3.c 4.c
  ```

- **解压到指定目录：**-C （大写字母“C”）

  ```shell
  # 将 new.tar.gz 解压到当前目录下的 test 目录下
  tar -xvf new.tar.gz -C ./test/ 
  ```

#### 更改文件权限

##### 访问用户分类

> 通过设定权限可以从以下三种访问方式限制访问权限：
>
> **1）只允许用户自己访问（所有者）**
>
> 所有者就是创建文件的用户，用户是所有用户所创建文件的所有者，用户可以允许所在的用户组能访问用户的文件。
>
> **2）允许一个预先指定的用户组中的用户访问（用户组）**
>
> 用户都组合成用户组，例如，某一类或某一项目中的所有用户都能够被系统管理员归为一个用户组，一个用户能够授予所在用户组的其他成员的文件访问权限。
>
> **3）允许系统中的任何用户访问（其他用户）**

##### 访问权限说明

> 用户能够控制一个给定的文件或目录的访问程度，一个文件或目录可能有读、写及执行权限：
>
> - 读权限（r）
>
> 对文件而言，具有读取文件内容的权限；对目录来说，具有浏览目录的权限。
>
> - 写权限（w）
>
> 对文件而言，具有新增、修改文件内容的权限；对目录来说，具有删除、移动目录内文件的权限。
>
> - 可执行权限（x）
>
> 对文件而言，具有执行文件的权限；对目录了来说该用户具有进入目录的权限。
>
> 注意：通常，Unix/Linux系统只允许文件的属主(所有者)或超级用户改变文件的读写权限。

##### 命令更改权限

- `chmod`

  - chmod 修改文件权限有两种使用格式：字母法与数字法。

  - **字母法：**chmod u/g/o/a +/-/= rwx 文件

    | **[ u/g/o/a ]** | **含义**                                                  |
    | :-------------- | :-------------------------------------------------------- |
    | u               | user 表示该文件的所有者                                   |
    | g               | group 表示与该文件的所有者属于同一组( group )者，即用户组 |
    | o               | other 表示其他以外的人                                    |
    | a               | all 表示这三者皆是                                        |

    | **[ +-= ]** | **含义** |
    | :---------- | :------- |
    | +           | 增加权限 |
    | -           | 撤销权限 |
    | =           | 设定权限 |

    | **rwx** | **含义**                                                     |
    | :------ | :----------------------------------------------------------- |
    | r       | read 表示可读取，对于一个目录，如果没有r权限，那么就意味着不能通过ls查看这个目录内部的内容。 |
    | w       | write 表示可写入，对于一个目录，如果没有w权限，那么就意味着不能在目录下创建新的文件。 |
    | x       | excute 表示可执行，对于一个目录，如果没有x权限，那么就意味着不能通过cd进入这个目录。 |

  - **数字法：**“rwx” 这些权限也可以用数字来代替

    | r    | 读取权限，数字代号为 "4"      |
    | :--- | :---------------------------- |
    | w    | 写入权限，数字代号为 "2"      |
    | x    | 执行权限，数字代号为 "1"      |
    | -    | 不具任何权限，数字t代号为 "0" |

- `chown`

  - chown用于修改文件所有者
  - 使用方法：`chown 用户名 文件或目录名`

- `chgrp`

  - chgrp用于修改文件所属组
  - 使用方法：`chgrp 用户组名 文件或目录名`

### 目录相关命令

#### 查看当前工作目录的路径

- 用法：`pwd [-LP]`
- 说明：打印当前的工作目录

#### 查看当前工作目录的内容

- 用法：`ls [选项] [文件]`

- 说明：ls是英文单词list的简写，其功能为列出目录的内容，是用户最常用的命令之一，它类似于DOS下的dir命令。

- **注意**：Linux文件或者目录名称最长可以有256个字符，“.”代表当前目录，“..”代表上一级目录，以“.”开头的文件为隐藏文件，需要用 -a 参数才能显示。

- 参数说明：

  | **参数** | **含义**                                     |
  | :------- | :------------------------------------------- |
  | -a       | 显示指定目录下所有子目录与文件，包括隐藏文件 |
  | -l       | 以列表方式显示文件的详细信息                 |
  | -h       | 配合 -l 以人性化的方式显示文件大小           |


#### 切换目录

- 用法：`cd 目录`

- 示例说明：

  | **命令** | **含义**                                                     |
  | :------- | :----------------------------------------------------------- |
  | cd       | 切换到当前用户的主目录(/home/用户目录)，用户登陆的时候，默认的目录就是用户的主目录。 |
  | cd ~     | 切换到当前用户的主目录(/home/用户目录)                       |
  | cd .     | 切换到当前目录                                               |
  | cd ..    | 切换到上级目录                                               |
  | cd -     | 可进入上一个进入的目录                                       |

#### 创建目录

- 用法：`mkdir [选项] 目录`
- 说明：通过`mkdir`命令可以创建一个新的目录（不能新建普通文件），参数`-p`可递归创建目录
- **注意**：新建目录的名称不能与当前目录中已有的目录或文件同名，并且目录创建者必须对当前目录具有写权限

#### 删除目录

- 用法：`rmdir [选项] 目录`
- 说明：可使用rmdir命令删除一个目录。必须离开目录，并且目录必须为空目录，不然提示删除失败

#### 更改目录权限

### 软链接

- 软链接不占用磁盘空间，源文件删除则软链接失效
- 用法：`ln -s 源文件 链接文件`
- 如果没有-s选项代表建立一个硬链接文件，两个文件占用相同大小的硬盘空间，即使删除了源文件，链接文件还是存在，所以-s选项是更常见的形式
- 如果软链接文件和源文件不在同一个目录，源文件最好要使用绝对路径，不要使用相对路径

### 硬链接

- 硬链接只能链接普通文件，不能链接目录
- 用法：`ln 源文件 链接文件`
- `readlink`命令读取符号链接文件的内容(存储目标文件的路径)


## 用户与用户组管理

### 用户管理

> Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

#### 单个添加用户

> 添加用户账号就是在系统中创建一个新账号，然后为新账号分配用户号、用户组、主目录和登录Shell等资源。刚添加的账号是被锁定的，无法使用。
>
> 增加用户账号就是在/etc/passwd文件中为新用户增加一条记录，同时更新其他系统文件如/etc/shadow, /etc/group等。

- 命令：`useradd 选项 用户名`

  - 选项
    - -c comment 指定一段注释性描述。
    - -d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
    - -g 用户组 指定用户所属的用户组。
    - -G 用户组，用户组 指定用户所属的附加组。
    - -s Shell文件 指定用户的登录Shell。
    - -u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。
  - 用户名：新账号的登陆名

- 示例：

  ```shell
  useradd -s /bin/sh -g group –G adm,root userB
  ```

#### 管理用户口令

> 用户管理的一项重要内容是用户口令的管理。用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。
>
> 指定和修改用户口令的Shell命令是`passwd`。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。

- 命令：`passwd 选项 用户名`

  - 选项
    - -l 锁定口令，即禁用账号。
    - -u 口令解锁。
    - -d 使账号无口令。
    - -f 强迫用户下次登录时修改口令。

- 修改当前用户口令：

  ```shell
  $ passwd 
  Old password:****** 
  New password:******* 
  Re-enter new password:*******
  ```

- 超级用户修改任何用户的口令：

  ```shell
  $ passwd userB
  New password:******* 
  Re-enter new password:*******
  ```

#### 批量添加用户

- 编辑文本文件，记录所有要添加的用户信息 - `user.txt`

  ```
  user001::600:100:user:/home/user001:/bin/bash
  user002::601:100:user:/home/user002:/bin/bash
  user003::602:100:user:/home/user003:/bin/bash
  user004::603:100:user:/home/user004:/bin/bash
  user005::604:100:user:/home/user005:/bin/bash
  user006::605:100:user:/home/user006:/bin/bash
  ```

- 以root身份执行命令`/usr/sbin/newusers`，从刚创建的用户文件`user.txt`中导入数据，创建用户：

  ```shell
  newusers < user.txt
  ```

- 执行命令 `/usr/sbin/pwunconv`，将 `/etc/shadow` 产生的 `shadow` 密码解码，然后回写到 `/etc/passwd` 中，并将`/etc/shadow`的`shadow`密码栏删掉。这是为了方便下一步的密码转换工作，即先取消 `shadow password` 功能

- 编辑每个用户的密码对照文件 - `passwd.txt`

  ```shell
  # 用户名:密码
  user001:123456
  user002:123456
  user003:123456
  user004:123456
  user005:123456
  user006:123456
  ```

- 以root身份执行命令 `/usr/sbin/chpasswd`，创建用户密码，`chpasswd` 会将经过 `/usr/bin/passwd` 命令编码过的密码写入 `/etc/passwd` 的密码栏。

  ```shell
  chpasswd < passwd.txt
  ```

- 确定密码经编码写入`/etc/passwd`的密码栏，执行命令 `/usr/sbin/pwconv` 将密码编码为 `shadow password`，并将结果写入 `/etc/shadow`。

  ```shell
  pwconv
  ```

#### 单个删除用户

> 如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将/etc/passwd等系统文件中的该用户记录删除，必要时还删除用户的主目录。

- 命令：`userdel 选项 用户名`

  - 选项：
    - -r 把用户的主目录一起删除

- 示例：

  ```shell
  userdel -r userB
  ```

#### 批量删除用户

#### 修改账号

> 修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录Shell等。

- 命令：`usermod 选项 用户名`

  - 选项：
    - -l 新用户名，将原来的用户名改为新的用户名

- 示例：

  ```shell
  usermod -s /bin/ksh -d /home/z -g developer sam
  ```

### 用户组管理

> 每个用户都有一个用户组
>
> Linux下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建
>
> 用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改**实际上就是对/etc/group文件的更新**
>
> 如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限
>
> 用户组的所有信息都存放在/etc/group文件中。此文件的格式也类似于/etc/passwd文件，由冒号(:)隔开若干个字段，这些字段有：
>
> ```
> 组名:口令:组标识号:组内用户列表
> ```

#### 添加用户组

- 命令：`groupadd 组名`
  - 选项
    - -g GID 指定新用户组的组标识号（GID）。
    - -o 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同。
- 不使用`-g`选项时，新组的组标识号是在当前已有的最大组标识号的基础上加1

#### 删除用户组

- 命令：`groupdel 用户组`

#### 修改用户组

- 命令：`groupmod 选项 用户组`
  - 选项：
    - -g GID 为用户组指定新的组标识号。
    - -o 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
    - -n 新用户组 将用户组的名字改为新名字

#### 切换用户组

- 命令：`newgrp 目标用户组`

## 进程与磁盘管理

### 创建进程

### 查看进程

- 命令：`ps 选项`

  - 选项：
    - -a 显示终端上的所有进程，包括其他用户的进程
    - -u 显示进程的详细状态
    - -x 显示没有控制终端的进程
    - -w 显示加宽，以便显示更多的信息
    - -f  只显示正在运行的进程

- 命令：`top`

  | **按键** | **含义**                           |
  | -------- | ---------------------------------- |
  | M        | 根据内存使用量来排序               |
  | P        | 根据CPU占有率来排序                |
  | T        | 根据进程运行时间的长短来排序       |
  | U        | 可以根据后面输入的用户名来筛选进程 |
  | K        | 可以根据后面输入的PID来杀死进程。  |
  | q        | 退出                               |
  | h        | 获得帮助                           |

### 杀死进程

- 命令：`kill [-signal] pid`

  - 信号值从0到15，其中9为绝对终止，可以处理一般信号无法终止的进程

- 命令：`killall [-signal] 进程名`

  - 通过进程名字杀死进程

    ```shell
    killall -9 sleep
    ```

### 查看磁盘使用

- 命令：`du 选项 目录/文件名`（查看某个目录或文件的大小）

  | **选项** | **含义**                                           |
  | -------- | -------------------------------------------------- |
  | -a       | 递归显示指定目录中各文件和子目录中文件占用的数据块 |
  | -s       | 显示指定文件或目录占用的数据块                     |
  | -b       | 以字节为单位显示磁盘占用情况                       |
  | -h       | 以K，M，G为单位，提高信息的可读性                  |

- 命令：`df 选项`（检测文件系统的磁盘空间占用和空余情况，可以显示所有文件系统对节点和磁盘块的使用情况）

  | **选项** | **含义**                          |
  | -------- | --------------------------------- |
  | -a       | 显示所有文件系统的磁盘使用情况    |
  | -m       | 以1024字节为单位显示              |
  | -h       | 以K，M，G为单位，提高信息的可读性 |

### 挂载

## 日常管理与备份

### 查看系统相关信息

### 查看网络

### 查看内存

- `free -m`

### 查看网卡

- `iwconfig`
- `lspci | grep -i 'eth'`

### 查看CPU

- `lscpu`

  ```shell
  架构：                           x86_64
  CPU 运行模式：                   32-bit, 64-bit
  字节序：                         Little Endian
  Address sizes:                   39 bits physical, 48 bits virtual
  CPU:                             8
  在线 CPU 列表：                  0-7
  每个核的线程数：                 2
  每个座的核数：                   4
  座：                             1
  NUMA 节点：                      1
  厂商 ID：                        GenuineIntel
  CPU 系列：                       6
  型号：                           142
  型号名称：                       Intel(R) Core(TM) i5-10210U CPU @ 1.60GHz
  步进：                           12
  CPU MHz：                        2100.000
  CPU 最大 MHz：                   4200.0000
  CPU 最小 MHz：                   400.0000
  ...                             ...
  ```
  

### 查看IP

- `ifconfig`

### 时间管理

### [其他硬件查看](https://www.linuxprobe.com/linux-list-hardware-information-command.html)

| 命令        | 解释                                                         |
| ----------- | ------------------------------------------------------------ |
| lsusb       | 查看USB控制器和与USB控制器相连的设备的详细信息               |
| lspci       | 查看所有的 PCI 总线，还有与 PCI 总线相连的设备的详细信息，比如 VGA 适配器、显卡、网络适配器、usb 端口、SATA 控制器等 |
| lshw -short | 列出多种硬件单元的详细或者概要的信息，比如 CPU、内存、usb 控制器、硬盘等。lshw能够从各个“/proc”文件中提取出相关的信息 |
| lsscsi      | 列出像硬盘和光驱等 scsi/sata 设备的信息                      |
| hdparm      | 显示像硬盘这样的 sata 设备的信息                             |



## Shell及vi/vim使用

### vi/vim简单使用

- dd - 删除游标所在的那一整行
- yy - 复制游标所在的那一行
- p - 将已复制的数据粘贴在光标的下一行
- P - 将已复制的数据粘贴在游标的上一行
- n`<Enter>`- n为数字，光标向下移动n行
- n`<space>` - n为数字，光标向右移动n个字符
- G - 移动到档案的最后一行
- 0 - 移动到这一行的最前面
- $ - 移动到这一行的最后面
- h - 光标向左移动一个字符
- j - 光标向下移动一个字符
- k - 光标向上移动一个字符
- l - 光标向右移动一个字符
- :set nu - 显示行号
- :set nonu - 取消行号

### Shell变量

### 运算符

### 分支

### 循环

### 传递参数

### 函数的使用

## 网络配置/路由器及防火墙设置

### 配置网络和防火墙