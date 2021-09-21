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

#### 解压文件

#### 更改文件权限

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

### 解压文件

### 软链接

### 硬链接
