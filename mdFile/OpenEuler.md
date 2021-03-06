---
title: OpenEuler学习记录
---

<h1 align="center" id="index">OpenEuler 实验记录</h1>

## 一、操作系统安装与内核编译

### 安装OpenEuler

- 镜像版本：openEuler-21.09-x86_64-dvd.iso

<img src="./OpenEuler/1-第一章/1-%E5%88%9B%E5%BB%BAOpenEuler.jpg" alt="1-创建OpenEuler" style="zoom:67%;" />

![](OpenEuler/1-第一章/2-2%E5%AE%89%E8%A3%85OpenEuler.jpg)

- 安装中。。。

![](OpenEuler/1-第一章/2-%E5%AE%89%E8%A3%85OpenEuler%E4%B8%AD.jpg)

#### 连接网络

> *Red Hat Enterprise Linux 7 与 CentOS 7 中默认的网络服务由 NetworkManager 提供，这是动态控制及配置网络的守护进程，它用于保持当前网络设备及连接处于工作状态，同时也支持传统的 ifcfg 类型的配置文件。*
>
> *NetworkManager 可以用于以下类型的连接：Ethernet，VLANS，Bridges，Bonds，Teams，Wi-Fi，mobile boradband（如移动3G）以及 IP-over-InfiniBand。针对与这些网络类型，NetworkManager 可以配置他们的网络别名，IP 地址，静态路由，DNS，VPN连接以及很多其它的特殊参数。*
>
> *可以用命令行工具 nmcli 来控制 NetworkManager。*
>
> *device叫网络接口，是物理设备*
>
> *connection是连接，偏重于逻辑设置*
>
> *多个connection可以应用到同一个device，但同一时间只能启用其中一个connection。这样的好处是针对一个网络接口，我们可以设置多个网络连接，比如静态IP和动态IP，再根据需要up相应connection*

- 查看可用设备

  ```shell
  nmcli device status
  ```

  ![image-20211122211530722](OpenEuler/image-20211122211530722.png)

  | 参数       | 释义                                                         |
  | ---------- | ------------------------------------------------------------ |
  | DEVICE     | 表示网卡的名称（操作系统内核获取到的标识）                   |
  | TYPE       | 表示网卡的类型                                               |
  | STATE      | 表示网卡与配置文件的连接状态（unmanaged表示不使用NetworkManager管理) |
  | CONNECTION | 网卡对应的配置文件名称                                       |

- 查看已有连接

  ```shell
  nmcli connection show
  ```

  ![image-20211122211724413](OpenEuler/image-20211122211724413.png)

- 启用连接

  ```shell
  nmcli connection up ens33
  # nmcli conn up ens33
  # nmcli c up ens33
  ```

  ![image-20211122211928375](OpenEuler/image-20211122211928375.png)

- 断开连接

  ```shell
  nmcli c down ens33
  ```

#### [配置静态IP](https://www.cnblogs.com/pipci/p/12570592.html)

- 修改为手动获取IP

  ```shell
  # 需要先设置ip地址
  nmcli connection modify ens33 ipv4.method manual
  ```

- 修改ipv4地址

  ```shell
  nmcli connection modify ens33 ipv4.addresses 192.168.223.130/24
  ```

- 修改ipv4网关

  ```shell
  nmcli connection modify ens33 ipv4.gateway 192.168.223.2
  ```

- 修改ipv4 DNS

  ```shell
  nmcli connection modify ens33 ipv4.dns 192.168.223.2
  # DNS设定成网关的意思就是，凡是需要用到DNS解析的情况下，都交给路由器处理。
  # 路由器会交给下一个具有DNS功能的设备或交给DNS服务器。
  ```

- 开机自动连接网络

  ```shell
  nmcli connection modify ens33 connection.autoconnect on
  ```
  
  ![](OpenEuler/1-第一章/3-%E6%88%90%E5%8A%9F%E8%BF%9E%E6%8E%A5%E7%BD%91%E7%BB%9C.jpg)

#### [配置Xshell](https://www.cnblogs.com/shireenlee4testing/p/9469650.html)

- 保证主机和虚拟机处于同一子网
- 虚拟机静态获取IP
- 需要注意虚拟机的掩码、网关、DNS

#### 更换软件源

- 执行以下命令，获取仓库配置文件

  ```shell
  wget -O /etc/yum.repos.d/openEulerOS.repo https://repo.huaweicloud.com/repository/conf/openeuler_x86_64.repo
  ```

- 执行**yum clean all**清除原有yum缓存。

- 执行**yum makecache**生成新的缓存。

### [编译内核源码](https://blog.csdn.net/m0_56602092/article/details/118604262)

#### 下载内核源码并解压

```shell
wget https://gitee.com/openeuler/kernel/repository/archive/5.10.0-4.25.0?format=tar.gz
```

![](OpenEuler/1-第一章/4-2%E4%B8%8B%E8%BD%BD%E5%86%85%E6%A0%B8%E6%BA%90%E7%A0%81.jpg)

![](OpenEuler/1-第一章/5-%E5%AE%89%E8%A3%85tar%E5%91%BD%E4%BB%A4.jpg)

<img src="./OpenEuler/1-第一章/6-%E8%A7%A3%E5%8E%8B%E6%BA%90%E7%A0%81%E5%8E%8B%E7%BC%A9%E5%8C%85.jpg" style="zoom:67%;" />

#### 生成内核配置文件.config

```shell
cp -v /boot/config-$(uname -r) .config
```

#### 更改编译配置

```shell
make menuconfig
# 先Load载入原始.config配置
# 添加KVM支持 - http://blog.chinaunix.net/uid-31410005-id-5776786.html
```

![](OpenEuler/1-第一章/12-menuconfig.jpg)

#### [安装一些依赖](https://blog.csdn.net/qq_52688128/article/details/114905052)

```shell
yum install ncurses-devel
yum install bison
yum install openssl-devel
yum install ncurses-devel
yum install elfutils-libelf-devel
yum install bc
```

![](OpenEuler/1-第一章/8-%E5%AE%89%E8%A3%85openssl.jpg)

![](OpenEuler/1-第一章/9-%E5%AE%89%E8%A3%85ncurses-devel.jpg)

![](OpenEuler/1-第一章/10-%E5%AE%89%E8%A3%85flex%E5%91%BD%E4%BB%A4.jpg)

![](OpenEuler/1-第一章/11-%E5%AE%89%E8%A3%85bison%E5%91%BD%E4%BB%A4.jpg)

![](OpenEuler/1-第一章/15-%E5%AE%89%E8%A3%85bc%E4%BE%9D%E8%B5%96.jpg)

![](OpenEuler/1-第一章/16-%E5%AE%89%E8%A3%85elfutils-libelf-devel%E4%BE%9D%E8%B5%96.jpg)

#### 编译，安装模块，安装内核

```shell
make -j4
make modules_install
make install
```

![](OpenEuler/1-第一章/17-2%E6%89%A7%E8%A1%8Cmake.jpg)

- 执行`make modules_install`

![](OpenEuler/1-第一章/19-%E6%89%A7%E8%A1%8Cmake_modules_install.jpg)

- 执行`make install`

![](OpenEuler/1-第一章/21-%E5%BC%80%E5%A7%8Bmake_install.jpg)

#### 更新引导

```shell
grub2-mkconfig -o /boot/grub2/grub.cfg
```

![](OpenEuler/1-第一章/23-%E4%BF%AE%E6%94%B9%E5%90%AF%E5%8A%A8%E6%96%87%E4%BB%B6.jpg)

![](OpenEuler/1-第一章/29-%E5%90%AF%E5%8A%A8%E7%95%8C%E9%9D%A2-new.jpg)

#### 查看所有可用内核

```shell
cat /boot/grub2/grub.cfg |grep "menuentry "
```

#### 查看当前默认启动内核

```shell
grub2-editenv list
```

#### 修改默认启动内核

```shell
grub2-set-default 5.10.0
```

#### /boot目录

- vmlinuz是在启动过程中最重要的一个文件，因为这个文件就是实际系统所使用的kernel。
- System.map文件是系统Kernel中的变量对应表

在2.6版本的linux内核中，都包含一个压缩过的cpio格式的打包文件。当内核启动时，会从这个打包文件中导出文件到内核的rootfs文件系统，然后内核检查rootfs中是否包含有init文件，如果有则执行它，**作为PID为1的第一个进程**。这个init进程负责启动系统后续的工作，包括定位、挂载“真正的”根文件系统设备（如果有的话）。如果内核没有在 rootfs中找到init文件，则内核会按以前版本的方式定位、挂载根分区，然后执行/sbin/init程序完成系统的后续初始化工作。

**这个压缩过的cpio格式的打包文件就是initramfs**。编译2.6版本的linux内核时，编译系统总会创建initramfs，然后把它与编译好的内核连接在一起。内核源代码树中的usr目录就是专门用于构建内核中的initramfs的，其中的initramfs_data.cpio.gz文件就是initramfs。缺省情况下，initramfs是空的，X86架构下的文件大小是134个字节。

### 系统启动流程

#### [CentOS6.x启动流程](http://c.biancheng.net/view/1013.html)：

1. 服务器加电，加载 BIOS 信息，BIOS 进行系统检测。依照 BIOS 设定，找到第一个可以启动的设备（一般是硬盘）；
2. 读取第一个启动设备的 MBR (主引导记录），加载 MBR 中的 Boot Loader（启动引导程序，最为常见的是 GRUB）。
3. 依据 Boot Loader 的设置加载内核，内核会再进行一遍系统检测。系统一般会采用内核检测硬件的信息，而不一定采用 Bios 的自检信息。内核在检测硬件的同时，还会通过加载动态模块的形式加载硬件的驱动。
4. 内核启动系统的第一个进程，也就是 /sbin/init。
5. 由 /sbin/init 进程调用 /etc/init/rcS.conf 配置文件，通过这个配置文件调用  /etc/rc.d/rc.sysinit 配置文件。而 /etc/rc.d/rc.sysinit  配置文件是用来进行系统初始化的，主要用于配置计算机的初始环境。
6. 还是通过 /etc/init/rcS.conf 配置文件调用 /etc/inittab 配置文件。通过 /etc/inittab 配置文件来确定系统的默认运行级别。
7. 确定默认运行级别后，调用 /etc/init/rc.conf 配置文件。
8. 通过 /etc/init/rc.conf 配置文件调用并执行 /etc/rc.d/rc 脚本，并传入运行级别参数。
9. /etc/rc.d/rc 确定传入的运行级别，然后运行相应的运行级别目录 /etc/rc[0-6].d/ 中的脚本。
10. /etc/rc[0-6].d/ 目录中的脚本依据设定好的优先级依次启动和关闭。
11. 最后执行 /etc/rc.d/rc.local 中的程序。
12. 如果是字符界面启动，就可以看到登录界面了。如果是图形界面启动，就会调用相应的 X Window 接口。

#### BIOS开机自检

服务器通电后，会直接进入 BIOS，BIOS 全称 Basic Input/Output System，中文可译为基本输入/输出系统。

 简单地理解 BIOS，它就是固化在主板上一个 ROM（只读存储器）芯片上的程序，主要保存计算机的基本输入/输出信息、系统设置信息、开机自检程和系统自启动程序，用来为 计算机提供最底层和最直接的硬件设置与控制。

 也就是说，BIOS 是硬件与软件之间的接口，而且是非常基本的接口，BIOS 提供了一组基本的操作系统使用的指令，系统启动的成功与否，依赖于 BIOS。

 BIOS 的初始化主要完成以下 3 项工作：

1. 第一次检查计算机硬件和外围设备（第二次自检由内核完后，后续会讲），例如 CPU、内存、风扇灯。当 BIOS 一启动，就会做一个自我检测的工作，整个自检过程也被称为 POST（Power On Self Test）自检。
2. 如果自检没有问题，BIOS 开始对硬件进行初始化，并规定当前可启动设备的先后顺序，选择由那个设备来开机。
3. 选择好开启设备后，就会从该设备的 MBR（主引导目录）中读取 Boot Loader（启动引导程序）并执行。启动引导程序用于引导操作系统启动，Linux 系统中默认使用的启动引导程序是 GRUB。


 当 MBR 被加载到 RAM 之后，BIOS 就会将控制权交给 MBR，进入系统引导的第二阶段。

#### 主引导目录（MBR）结构及作用详解

- MBR 也就是主引导记录，位于硬盘的 0 磁道、0 柱面、1 扇区中，主要记录了启动引导程序和磁盘的分区表。MBR 共占用了一个扇区，也就是 512 Byte。其中 446 Byte 安装了启动引导程序，其后 64 Byte 描述分区表，最后的 2  Byte 是结束标记。

  ![img](OpenEuler/2-1Q0221G321149.jpg)

- 我们已经知道，每块硬盘只能划分 4 个主分区，原因就是在 MBR 中描述分区表的空间只有 64  Byte。其中每个分区必须占用 16 Byte，那么 64 Byte 就只能划分 4 个主分区。每个分区的 16 字节的规划如下表所示。

  |   存储字节    |           数据内容及含义           |
  | :-----------: | :--------------------------------: |
  |   第 1 字节   |              引导标志              |
  |   第 2 字节   |         本分区的起始磁道号         |
  |   第 3 字节   |         本分区的起始扇区号         |
  |   第 4 字节   |         本分区的起始柱面号         |
  |   第 5 字节   | 分区类型，可以识别主分区和扩展分区 |
  |   第 6 字节   |         本分区的结束磁道号         |
  |   第 7 字节   |         本分区的结束扇区号         |
  |   第 8 字节   |         本分区的结束柱面号         |
  | 第 9~12 字节  |     本分区之前已经占用的扇区数     |
  | 第 13~16 字节 |          本分区的总扇区数          |

#### 启动引导程序的作用

**BIOS 的作用就是自检，然后从 MBR 中读取出启动引导程序**。那么，**启动引导程序最主要的作用就是加载操作系统的内核**。当然，每种操作系统的启动引导程序都是不同的。

每种操作系统的文件格式不同，因此，每种操作系统的启动引导程序也不一样。不同的操作系统只有使用自己的启动引导程序才能加载自己的内核。**如果我的服务器上只安装了一个操作系统，那么这个操作系统的启动引导程序就会安装在 MBR 中。BIOS 调用 MBR 时读取出启动引导程序,就可以加载内核了。**

但是在有些时候，我的服务器中安装了多个操作系统，而 MBR 只有一 个，那么在 MBR 中到底安装哪个操作系统的启动引导程序呢？

很明显，一个 MBR 是不够用的。**每块硬盘只能有一个 MBR 是不能更改的**，所以不可能増加 MBR  的数量。**系统只能在每个文件系统（可以看成分区）中单独划分出一个扇区，称作引导扇区（Boot  Sector)。每个分区的引导扇区中也能安装启动引导程序，也就是说，在 MBR  和每个单独分区的引导扇区中都可以安装启动引导程序。**这样多个操作系统才能安装在同一台服务器中（每个操作系统要安装在不同的分区中），而且每个操作系统都是可以启动的。

还有一个问题，BIOS 只能找到 MBR 中的启动引导程序，而找不到在分区的引导扇区中的启动引导程序。那么，**要想完成多系统启动，我们的方法是増加启动引导程序的功能，让安装到 MBR 中的启动引导程序（GRUB）可以调用在分区的引导扇区中的其他启动引导程序。**

因此，**启动引导程序拥有以下功能**：

1. 加载操作系统的内核。这是启动引导程序最主要的功能。
2. 拥有一个可以让用户选择的菜单，来选择到底启动哪个系统。大家如果在服务器上安装过双 Windows 系统，就应该见过类似的选择菜单，不过这个选择菜单是由 Windows 的启动引导程序提供的，而不是 GRUB。
3. 可以调用其他的启动引导程序，这是多系统启动的关键。不过需要注意的是，**Windows 的启动引导程序不能调用 Linux  的启动引导程序，所以我们一般建议先安装 Windows，后安装 Linux，是为了将 Linux 的启动引导程序安装到 MBR 中，覆盖  Windows 的启动引导程序。**


 当然，这个安装顺序不是绝对的，就算最后安装了 Windows，我们也可以通过手工再安装 GRUB 的方法，来保证 MBR 中安装的还是 Linux 的启动引导程序。

#### 加载内核模块

GRUB 加载了内核之后，内核首先会再进行二次系统的自检，而不一定使用 BIOS 检测的硬件信息。

内核完成再次系统自检之后，开始采用动态的方式加载每个硬件的模块，这个动态模块大家可以想象成硬件的驱动（默认 Linux  硬件的驱动是不需要手工安装的，如果是重要的功能，则会直接编译到内核当中；如果是非重要的功能，比如硬件驱动会编译为模块，则在需要时由内核调用。

在多数 Linux 中，都会把硬件的驱动程序编译为模块， 这些模块保存在 /lib/modules 目录中。常见的 USB、SATA 和 SCSI 等硬盘设备的驱动，还有一些特殊的文件系统（如 LVM、RAID 等）的驱动，都是以模块的方式来保存的。

如果 Linux 安装在 IDE 硬盘之上，并且采用的是默认的 ext3/4  文件系统，那么内核启动后加载根分区和模块的加载都没有什么问题，系统会顺利启动。但是，如果 Linux 安装在 SCSI 硬盘之上，或者采用的是  LVM 文件系统，那么内核（内核载入内存是启动引导程序 GRUB 调用的，并不存在硬盘驱动不识别的问题）在加载根目录之前是需要加载 SCSI  硬盘或 LVM 文件系统的驱动的。

 SCSI 硬盘和 LVM 文件系统的驱动都放在硬盘的 /lib/modules 目录中，**既然内核没有办法识别 SCSI 硬盘或 LVM  文件系统，那怎么可能读取 /lib/modules 目录中的驱动呢？Linux 给出的解决办法是使用 initramfs  这个虚拟文件系统来处理这个问题。**

#### initramfs文件系统

CentOS 6.x 中使用 initramfs 虚拟文件系统取代了 CentOS 5.x 中的 initrd RAM  Disk。它们的作用类似，可以通过启动引导程序加载到内存中，然后会解压缩并在内存中仿真成一个根目录，并且这个仿真的文件系统能够提供一个可执行程序，通过该程序来加载启动过程中所需的内核模块，比如 USB、SATA. SCSI 硬盘的驱动和 LVM、RAID 文件系统的驱动。

 **也就是说，通过 initramfs 虚拟文件系统在内存中模拟出一个根目录，然后在这个模拟根目录中加载 SCSI 等硬件的驱动，就可以加载真正的根目录了，之后才能调用 Linux 的第一个进程 /sbin/init。**

 Initramfs 虚拟文件系统主要有以下优点：

- initramfs 随着其中数据的増减自动増减容量。
- 在 initramfs 和页面缓存之间没有重复数据。
- initramfs 重复利用了 Linux caching 的代码，因此几乎没有増加内核尺寸，而 caching 的代码已经经过良好测试，所以 initramfs 的代码质量也有保证。
- 不需要额外的文件系统驱动。

### 内核模块编程

#### 编写helloworld模块

![](OpenEuler/1-第一章/31-%E7%BC%96%E5%86%99%E6%A8%A1%E5%9D%97helloworld.jpg)

#### 编写Makefile文件

![](OpenEuler/1-第一章/32-%E7%BC%96%E5%86%99Makefile.jpg)

#### 编译模块

<img src="./OpenEuler/1-第一章/33-make%E7%BC%96%E8%AF%91%E6%A8%A1%E5%9D%97.png" style="zoom:80%;" />

#### 加载与卸载模块

![](OpenEuler/1-第一章/33-%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9D%97%E4%B8%8E%E5%8D%B8%E8%BD%BD%E6%A8%A1%E5%9D%97.jpg)

## 二、内存管理

### kmalloc

> kmalloc用于内核的内存分配，需要注意的是：**kmalloc一般用于小内存的分配**，kmalloc最大只能开辟128k-16，16个字节是被页描述符结构占用了。另外，很多硬件需要一块比较大的连续内存用作DMA传送。这块内存需要一直驻留在内存，不能被交换到文件中去。但是kmalloc最多只能开辟大小为32*PAGE_SIZE的内存，一般的PAGE_SIZE=4KB，也就是128KB的大小的内存。

#### 编写源文件

<img src="./OpenEuler/2-第二章/1-kmalloc%E6%BA%90%E7%A0%81.jpg" style="zoom:80%;" />

#### 编写Makefile文件

![](OpenEuler/2-第二章/2-kmalloc-Makefile.jpg)

#### 加载模块与卸载模块

![](OpenEuler/2-第二章/3-kmalloc%E7%9A%84%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8D%B8%E8%BD%BD.jpg)

### vmalloc

> vmalloc函数的工作方式类似于kmalloc，只不过前者分配的内存虚拟地址是连续的，而物理地址则无需连续。它通过分配非连续的物理内存块，再修改页表，把内存映射到逻辑地址空间的连续区域中。通过vmalloc获得的页必须一个一个地进行映射，效率不高，因此，只在不得已（一般是为了获得大块内存）时使用。vmalloc函数返回一个指针，指向逻辑上连续的一块内存区，其大小至少为size。在发生错误时，函数返回NULL。vmalloc可能睡眠，因此，不能从中断上下文中进行调用，也不能从其它不允许阻塞的情况下调用。
>
> **kmalloc能分配的大小有限，vmalloc能分配的大小相对较大，但是vmalloc比kmalloc速度要慢。**

#### 编写源文件

<img src="./OpenEuler/2-第二章/4-vmalloc%E6%BA%90%E7%A0%81.png" style="zoom:80%;" />

#### 编写Makefile文件

![](OpenEuler/2-第二章/5-vmalloc-Makefile.jpg)

#### 加载模块与卸载模块

<img src="./OpenEuler/2-第二章/6-vmalloc%E7%9A%84%E5%8A%A0%E8%BD%BD%E4%B8%8E%E5%8D%B8%E8%BD%BD.jpg" style="zoom:80%;" />

### 研讨

#### 内存泄漏

>  程序中己动态分配的内存未释放或无法释放，就产生了内存泄露

- 危害
  -  可用的内存越来越少，堆积后的后果就导致内存溢出
  - 导致其他应用程序无法使用内存
  - 应用程序访问内存时，不停地产生缺页错误
  - 使得CPU不停地从磁盘上的swap空间读取页面数据，导致应用程序性能下降，cpu无法进行其他工作。
- 检查和预防
  - 使用带有自动垃圾回收机制的程序语言编写程序
  - 使用内存泄露检测器，在编写代码过程中对代码进行检测

#### 内存溢出

> 程序在申请内存时，没有足够的内存空间供其使用

- 危害
  - 程序无法运行，有时候会自动关闭软件
  - 易遭受缓冲区溢出攻击/黑客攻击
- 检查和预防
  - 防止内存泄露

#### 内存越界

> 程序向系统申请一块内存后，使用时超出申请范围

- 危害
  - 导致内存越界错误，程序向内存块中写入数据，超过内存块的边界，写到了其他内存对象中，导致覆盖了其他内存对象中的数据
- 检查和预防
  - 使用安全的语言
  - 使用安全的函数库
  - 边界检测，防止越界的发生

## 三、进程管理

### 内核线程

#### 运行结果

![](OpenEuler/3-第三章/1-%E5%86%85%E6%A0%B8%E7%BA%BF%E7%A8%8B.jpg)

### 打印输出CPU负载情况

#### /proc目录

**Linux系统上的/proc目录是一种文件系统，即proc文件系统。**与其它常见的文件系统不同的是，/proc是一种伪文件系统（也即虚拟文件系统），**存储的是当前内核运行状态的一系列特殊文件**，用户可以通过这些文件查看有关系统硬件及当前正在运行进程的信息，甚至可以通过更改其中某些文件来改变内核的运行状态。

基于 /proc文件系统如上所述的特殊性，其内的文件也常被称作虚拟文件，并具有一些独特的特点。例如，其中有些文件虽然使用查看命令查看时会返回大量信息，但文件本身的大小却会显示为0字节。此外，这些特殊文件中大多数文件的时间及日期属性通常为当前系统时间和日期，这跟它们随时会被刷新（存储于RAM中）有关。

为了查看及使用上的方便，这些文件通常会按照相关性进行分类存储于不同的目录甚至子目录中，**如/proc/scsi目录中存储的就是当前系统上所有SCSI设备的相关信息，/proc/N中存储的则是系统当前正在运行的进程的相关信息，其中N为正在运行的进程PID（在某进程结束后其相关目录则会消失）。**

大多数虚拟文件可以使用文件查看命令如cat、more或者less进行查看，有些文件信息表述的内容可以一目了然，但也有文件的信息却不怎么具有可读性。不过，这些可读性较差的文件在使用一些命令如apm、free、lspci或top查看时却可以有着不错的表现。

| 目录名            | 说明                                       |
| ----------------- | ------------------------------------------ |
| /proc/cpuinfo     | CPU 的信息 (型号, 家族, 缓存大小等)        |
| /proc/meminfo     | 物理内存、交换空间等的信息                 |
| /proc/loadavg     | 查看系统1分钟、5分钟、15分钟的平均负载情况 |
| /proc/mounts      | 已加载的文件系统的列表                     |
| /proc/devices     | 可用设备的列表                             |
| /proc/filesystems | 被支持的文件系统                           |
| /proc/modules     | 已加载的模块                               |
| /proc/version     | 内核版本                                   |
| /proc/cmdline     | 系统启动时输入的内核命令行参数             |

#### 运行结果

![](OpenEuler/3-第三章/2-%E8%8E%B7%E5%BE%97CPU%E8%B4%9F%E8%BD%BD.jpg)

### 打印输出运行进程的PID和名字

#### 运行结果

![](OpenEuler/3-第三章/3-%E8%8E%B7%E5%8F%96%E8%BF%90%E8%A1%8C%E8%BF%9B%E7%A8%8B%E7%9A%84PID%E5%92%8Cname.jpg)

### cgroups

#### cgroups介绍

cgroups是control groups的缩写，是Linux内核提供的一种可以限制，记录，隔离进程组(process groups)所使用物理资源的机制cgroups是Linux内核提供的一种机制，这种机制可以根据特定的行为，把一系列系统任务及其子任务整合（或分隔）到按资源划分等级的不同组内，从而为系统资源管理提供一个统一的框架。通俗点说，cgroups可以限制、记录、隔离进程组所使用的物理资源（包括：CPU、memory、IO等）。

从本质上来说，cgroups是内核附加在程序上的一系列钩子，通过程序运行时对资源的调度触发相应的钩子以达到资源追踪和限制的目的

#### cgroups相关概念

>  cgroups主要由task,cgroup,subsystem及hierarchy构成

- task：在Cgroups中，task就是系统的一个进程

- cgroup
  - cgroups中的资源控制都以cgroup为单位实现的。
  - cgroup表示按照某种资源控制标准划分而成的任务组，包含一个或多个子系统。
  - 一个任务可以加入某个cgroup，也可以从某个cgroup迁移到另外一个cgroup

- subsystem
  - cgroups中的subsystem就是一个资源调度控制器(Resource Controller)。
  - 比如CPU子系统可以控制CPU时间分配，内存子系统可以限制cgroup内存使用量

- hierarchy
  - hierarchy由一系列cgroup以一个树状结构排列而成，每个hierarchy通过绑定对应的subsystem进行资源调度。
  - hierarchy中的cgroup节点可以包含零或多个子节点，子节点继承父节点的属性。整个系统可以有多个hierarchy

#### 组件之间的关系

- 同一个hierarchy能够附加一个或多个subsystem。例如cpu和memory subsystems(或者任意多个subsystems)附加到同一个hierarchy

  <img src="./OpenEuler/1070925-20201124165227961-1151966146.png" alt="img" style="zoom: 25%;" />

- cpu subsystem已经附加到了hierarchy A，并且memory subsystem已经附加到了hierarchy B，此时cpu subsystem不能在附加到hierarchy B

  <img src="./OpenEuler/1070925-20201124165350137-215436245.png" alt="img" style="zoom:25%;" />

- 一个task不能存在于同一个hierarchy的不同cgroup，但可以存在在不同hierarchy中的多个cgroup

  系统每次新建一个hierarchy时，该系统上的所有task默认构成了这个新建的hierarchy的初始化cgroup，这个cgroup也称为root cgroup。

- 系统中的任何一个task(Linux中的进程)fork自己创建一个子task(子进程)时，子task会自动的继承父task cgroup的关系，在同一个cgroup中，但是子task可以根据需要移到其它不同的cgroup中。父子task之间是相互独立不依赖的。

#### tmpfs文件系统

**tmpfs即临时文件系统，是一种基于内存的文件系统，也称之为虚拟内存文档系统。**它不同于传统的用块设备形式来实现的ramdisk，也不同于针对物理内存的ramfs。tmpfs能够使用物理内存，也能够使用交换分区。

在Linux内核中，虚拟内存资源由物理内存（RAM）和交换分区swap组成，这些资源是由内核中的虚拟内存子系统来负责分配和管理。tmpfs就是和虚拟内存子系统来"打交道"的，他向虚拟内存子系统请求页来存储文档，他同Linux的其他请求页的部分相同，不知道分配给自己的页是在内存中还是在交换分区中。tmpfs同ramfs相同，其大小也不是固定的，而是随着所需要的空间而动态的增减。

**所有在 tmpfs 上储存的资料在理论上都是临时存放的，也就是说，档案不会建立在硬盘上面。一旦重新开机，所有在 tmpfs 里面的资料都会消失不见。**理论上，内存使用量会随着 tmpfs 的使用而时有增长或消减。tmpfs将所有内容放入内核内部高速缓存中，并进行扩展和收缩以容纳其中包含的文件，并且能够将不需要的页面交换出来以交换空间。它具有最大大小限制，可以通过“ mount -o remount ...”即时调整。

**由于tmpfs完全存在于页面缓存和交换中，因此所有tmpfs页面将在 /proc/meminfo中显示为 “Shmem”**，在free命令后中显示为“Shared”。

```shell
              total        used        free      shared  buff/cache   available
Mem:          433Mi       228Mi        23Mi       3.0Mi       181Mi       194Mi
Swap:         1.6Gi        44Mi       1.6Gi
```

### cgroup限制cpu核数

#### 安装libcgroup

![](OpenEuler/3-第三章/4-%E6%8C%89%E7%85%A7libcgroup.jpg)

#### 挂载tmpfs格式的cgroup文件夹

![](OpenEuler/3-第三章/5-%E5%88%9B%E5%BB%BAmycpuset.jpg)

#### 挂载cpuset管理子系统

- 如上图

#### 限制使用cpu的核数

<img src="./OpenEuler/3-第三章/6-%E9%99%90%E5%88%B6%E4%BD%BF%E7%94%A8cpu%E6%A0%B8%E6%95%B0.jpg" style="zoom: 80%;" />

#### 编译运行while_long

<img src="./OpenEuler/3-第三章/7-%E7%BC%96%E8%AF%91%E8%BF%90%E8%A1%8Cwhile_long.jpg" style="zoom:67%;" />

#### 查看while_long的运行情况

<img src="./OpenEuler/3-第三章/9-%E6%9F%A5%E7%9C%8Bwhile_long%E7%9A%84%E8%BF%90%E8%A1%8C%E6%83%85%E5%86%B5.jpg" style="zoom: 67%;" />

### cgroup禁止访问U盘

#### 查看U盘盘符

<img src="./OpenEuler/3-第三章/10-%E8%8E%B7%E5%8F%96U%E7%9B%98%E7%9B%98%E7%AC%A6.jpg" style="zoom: 67%;" />

#### 获取设备号

![](OpenEuler/3-第三章/11-%E8%8E%B7%E5%8F%96U%E7%9B%98%E8%AE%BE%E5%A4%87%E5%8F%B7.jpg)

#### 挂载U盘到当前系统

![](OpenEuler/3-第三章/12-%E6%8C%82%E8%BD%BDU%E7%9B%98%E5%88%B0%E5%BD%93%E5%89%8D%E7%B3%BB%E7%BB%9F.jpg)

#### 挂载设备管理devices子系统

![](OpenEuler/3-第三章/13-%E6%8C%82%E8%BD%BDdevices%E5%AD%90%E7%B3%BB%E7%BB%9F.jpg)

#### 创建cgroup前后对比

<img src="./OpenEuler/3-第三章/14-%E5%88%9B%E5%BB%BAcgroup%E5%89%8D%E5%90%8E%E5%AF%B9%E6%AF%94.jpg" style="zoom:80%;" />

#### 测试访问U盘

![](OpenEuler/3-第三章/15-%E6%B5%8B%E8%AF%95%E8%AE%BF%E9%97%AEU%E7%9B%98.jpg)

![](OpenEuler/3-第三章/16-%E6%8B%92%E7%BB%9D%E5%92%8C%E5%85%81%E8%AE%B8%E8%AE%BF%E9%97%AEU%E7%9B%98.jpg)

## 四、终端和异常管理

### [软中断、tasklet、工作队列和进程上下文](https://blog.csdn.net/godleading/article/details/52971179)

![执行绪关系](OpenEuler/20161030104807713.bmp)

#### 上半部和下半部

- 上半部指的是中断处理程序，下半部则指的是一些虽然与中断有相关性但是可以延后执行的任务。
- 举个例子：在网络传输中，网卡接收到数据包这个事件不一定需要马上被处理，适合用下半部去实现；但是用户敲击键盘这样的事件就必须马上被响应，应该用中断实现。
- 两者的主要区别在于：中断不能被相同类型的中断打断，而下半部依然可以被中断打断；中断对于时间非常敏感，而下半部基本上都是一些可以延迟的工作。

#### 软中断

- 软中断作为下半部机制的代表，是随着SMP（share memory processor）的出现应运而生的，**它也是tasklet实现的基础（tasklet实际上只是在软中断的基础上添加了一定的机制）**。

- 软中断一般是“可延迟函数”的总称，有时候也包括了tasklet（请读者在遇到的时候根据上下文推断是否包含tasklet）。

- **它的出现就是因为要满足上面所提出的上半部和下半部的区别**，使得对时间不敏感的任务延后执行，而且可以在多个CPU上并行执行，使得总的系统效率可以更高。

#### tasklet

由于软中断必须使用可重入函数，这就导致设计上的复杂度变高，作为设备驱动程序的开发者来说，增加了负担。而如果某种应用并不需要在多个CPU上并行执行，那么软中断其实是没有必要的。因此诞生了弥补以上两个要求的tasklet。它具有以下特性：

- 一种特定类型的tasklet只能运行在一个CPU上，不能并行，只能串行执行。
- 多个不同类型的tasklet可以并行在多个CPU上。
- 软中断是静态分配的，在内核编译好之后，就不能改变。但tasklet就灵活许多，可以在运行时改变（比如添加模块时）。

tasklet是在两种软中断类型的基础上实现的，**因此如果不需要软中断的并行特性，tasklet就是最好的选择。**也就是说tasklet是软中断的一种特殊用法，即延迟情况下的串行执行。

#### 工作队列

工作队列(work queue)是另外一种将工作推后执行的形式。

工作队列可以把工作推后，交由一个内核线程去执行—这个下半部分总是会在进程上下文执行，但由于是内核线程，其不能访问用户空间。最重要特点的就是**工作队列允许重新调度甚至是睡眠**。

### tasklet输出helloworld

![](OpenEuler/4-第四章/1-tasklet%E8%BE%93%E5%87%BAhelloworld.jpg)

### 周期性打印helloworld

![](OpenEuler/4-第四章/2-%E5%91%A8%E6%9C%9F%E6%80%A7%E6%89%93%E5%8D%B0helloworld.jpg)

#### 捕获信号

<img src="./OpenEuler/4-第四章/3-%E6%8D%95%E8%8E%B7%E4%BF%A1%E5%8F%B7.jpg" style="zoom:80%;" />

## 五、内核时间管理

> **注意：**
>
> 5.x版本的内核已经将do_gettimeofday()函数移除，可以通过如下方法解决。4.x版本的内核不需要更改。
>
> 将do_gettimeofday()更换为ktime_get_ts64()
> 将rtc_time_to_tm()更换为rtc_time64_to_tm()
>
> ```c
>  struct timespec64 {
>     time64_t    tv_sec;         // seconds 
>     long        tv_nsec;        // nanoseconds
>  }; 
> ```

### 打印当前时间

![](OpenEuler/5-第五章/1-%E6%9F%A5%E7%9C%8B%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4.jpg)

### 定时打印helloworld

![](OpenEuler/5-第五章/2-%E5%AE%9A%E6%97%B6%E5%99%A8.jpg)

### 累加计算代码的运行时间

![](OpenEuler/5-第五章/3-计算运行时间.jpg)

## 六、设备管理

### 编写USB设备驱动程序

#### 安装usbutils

![](OpenEuler/6-第六章/1-%E5%AE%89%E8%A3%85usbutils.jpg)

#### 查看usb的设备号和厂商号

![](OpenEuler/6-第六章/2-%E6%9F%A5%E7%9C%8Busb%E7%9A%84%E8%AE%BE%E5%A4%87%E5%8F%B7%E5%92%8C%E5%8E%82%E5%95%86%E5%8F%B7.jpg)

#### 安装usb检测模块

![](OpenEuler/6-第六章/3-%E5%AE%89%E8%A3%85usb%E6%A3%80%E6%B5%8B%E6%A8%A1%E5%9D%97.jpg)

#### 插入U盘查看模块输出

![](OpenEuler/6-第六章/4-%E6%8F%92%E5%85%A5u%E7%9B%98%E6%9F%A5%E7%9C%8B%E6%A8%A1%E5%9D%97%E8%BE%93%E5%87%BA.jpg)

#### 拔出U盘查看模块输出

![](OpenEuler/6-第六章/5-%E6%8B%94%E5%87%BAu%E7%9B%98%E6%9F%A5%E7%9C%8B%E6%A8%A1%E5%9D%97%E8%BE%93%E5%87%BA.jpg)

#### 卸载模块

![](OpenEuler/6-第六章/6-%E5%8D%B8%E8%BD%BD%E6%A8%A1%E5%9D%97.jpg)

### 测试硬盘读写速率

#### 测试硬盘写速率

![](OpenEuler/6-第六章/7-%E6%B5%8B%E8%AF%95%E7%A1%AC%E7%9B%98%E5%86%99%E9%80%9F%E7%8E%87.jpg)

#### 测试硬盘读速率

![](OpenEuler/6-第六章/8-%E6%B5%8B%E8%AF%95%E7%A1%AC%E7%9B%98%E8%AF%BB%E9%80%9F%E7%8E%87.jpg)

#### iozone测试读写速率

- 编译iozone

  ```shell
  wget http://www.iozone.org/src/current/iozone3_489.tar
  tar -xvf iozone3_489.tar 
  cd iozone3_489
  cd src/
  cd current/
  make linux-AMD64
  # 查看具体用法
  # ./fileop -h
  # ./pit_server -h
  # ./iozone -h
  ```

  ![](OpenEuler/6-第六章/9-编译iozone.jpg)

- 测试读写速率

  ```shell
  ./iozone -Raz -n 512m -g 8g -r 1k -i 0 -i 1 -b /home/iozone.xls
  ```
  
  ![](OpenEuler/6-第六章/10-iozone测试中.jpg)
  
  ![](OpenEuler/6-第六章/11-测试结果.jpg)

## 七、文件系统

> **文件扩展属性介绍**
>
> 扩展属性名称的格式是namespace.attribute，名称空间namespace是用来定义不同的扩展属性的类。目前有security，system，trusted，user四种扩展属性类。
>
> 扩展的用户属性被分配给文件和目录用来存储任意的附加信息，比如mime type、字符集或是文件的编码。用户属性的权限由文件权限位来定义。对于普通文件和目录，文件权限位定义文件内容的访问，对于设备文件来说，它们定义对设备的访问。扩展的用户属性只被用于普通的文件和目录，对用户属性的访问被限定于属主和那些对目录有sticky位设置的用户。

### 为Ext4文件系统添加扩展属性

#### 查看是否支持扩展属性

<img src="./OpenEuler/7-第七章/1-%E6%9F%A5%E7%9C%8B%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E6%89%A9%E5%B1%95%E5%B1%9E%E6%80%A7.jpg" style="zoom:67%;" />

#### 设置文本属性值

<img src="./OpenEuler/7-第七章/2-%E8%AE%BE%E7%BD%AE%E6%96%87%E6%9C%AC%E5%B1%9E%E6%80%A7%E5%80%BC.jpg" style="zoom:80%;" />

#### 设置十六进制属性值和base64编码

<img src="./OpenEuler/7-第七章/3-%E8%AE%BE%E7%BD%AE%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E5%B1%9E%E6%80%A7%E5%80%BC%E5%92%8Cbase64%E7%BC%96%E7%A0%81.jpg" style="zoom:67%;" />

#### text编码设置

<img src="./OpenEuler/7-第七章/4-text%E7%BC%96%E7%A0%81%E8%AE%BE%E7%BD%AE.jpg" style="zoom:67%;" />

#### hex编码和base64编码

<img src="./OpenEuler/7-第七章/5-hex%E7%BC%96%E7%A0%81%E5%92%8Cbase64%E7%BC%96%E7%A0%81.jpg" style="zoom:80%;" />

### 注册自定义文件系统类型

![](OpenEuler/7-第七章/6-%E6%B3%A8%E5%86%8C%E6%96%B0%E7%9A%84%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%B1%BB%E5%9E%8B.jpg)

### 在/proc下创建目录

![](OpenEuler/7-第七章/7-proc%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E4%B8%8B%E5%88%9B%E5%BB%BA%E7%9B%AE%E5%BD%95.jpg)

### 使用sysfs文件系统传递内核模块参数

#### /sys - sysfs文件系统

##### 基本概念

内核子系统或设备驱动可以直接编译到内核，也可以编译成模块。如果编译到内核，可以通过内核启动参数来向它们传递参数；如果编译成模块，则可以通过命令行在插入模块时传递参数，或者在运行时，**通过sysfs来设置或读取模块数据。**

**sysfs是一个基于内存的虚拟文件系统**，可以看成与proc、devfs和devpty同类别的文件系统；**它的作用是将内核信息以文件的方式提供给用户程序使用。**sysfs 文件系统要求总是被挂载在 /sys 挂载点上，这个文件系统不仅可以把设备（devices）和驱动程序（drivers）的信息从内核输出到用户空间，也可以用来对设备和驱动程序做设置。

sysfs提供一种机制，使得可以显式地描述内核对象、对象属性及对象间关系。sysfs有两组接口，一组针对内核，用于将设备映射到文件系统中；另一组针对用户程序，用于读取或操作这些设备。下表述了内核中的sysfs要素及其在用户空间的表现：

| sysfs在内核中的组成要素  |   在用户空间的显示    |
| :----------------------: | :-------------------: |
|   内核对象（kobject）    |         目录          |
|  对象属性（attribute）   |         文件          |
| 对象关系（relationship） | 链接（Symbolic Link） |

##### sysfs 与 sysctl区别

- sysctl：是内核的一些控制参数，其目的是方便用户对内核的行为进行控制；
- sysfs：仅仅是把内核的 kobject 对象的层次关系与属性开放给用户查看，因此 sysfs 的绝大部分是只读的，模块作为一个 kobject 也被出口到 sysfs，模块参数则是作为模块属性出口的，内核实现者为模块的使用提供了更灵活的方式，允许用户设置模块参数在 sysfs 的可见性并允许用户在编写模块时设置这些参数在 sysfs 下的访问权限，然后用户就可以通过sysfs 来查看和设置模块参数，从而使得用户能在模块运行时控制模块行为。

#### 编译与装载sysfs_exam模块

![](OpenEuler/7-第七章/8-%E7%BC%96%E8%AF%91%E4%B8%8E%E8%A3%85%E8%BD%BDsysfs_exam%E6%A8%A1%E5%9D%97.jpg)

#### 修改模块参数和卸载模块

![](OpenEuler/7-第七章/9-%E4%BF%AE%E6%94%B9%E6%A8%A1%E5%9D%97%E5%8F%82%E6%95%B0%E5%92%8C%E5%8D%B8%E8%BD%BD%E6%A8%A1%E5%9D%97.jpg)

## 八、网络管理

### 基于socket的udp发送接收程序

#### 编译udp_socket并发送数据

![](OpenEuler/8-第八章/1-%E7%BC%96%E8%AF%91udp_socket%E5%B9%B6%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE.jpg)

#### 启动服务端并接收数据

![](OpenEuler/8-第八章/2-%E5%90%AF%E5%8A%A8%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%B9%B6%E6%8E%A5%E6%94%B6%E6%95%B0%E6%8D%AE.jpg)

### tshark抓包

#### 安装WireShark

![](OpenEuler/8-第八章/3-%E5%AE%89%E8%A3%85wireshark.jpg)

#### client发送数据

![](OpenEuler/8-第八章/4-client%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE.jpg)

#### server接收数据

![](OpenEuler/8-第八章/5-server%E6%8E%A5%E6%94%B6%E6%95%B0%E6%8D%AE.jpg)

#### tshark抓取数据

![](OpenEuler/8-第八章/6-tshark%E6%8A%93%E5%8F%96%E6%95%B0%E6%8D%AE.jpg)

### 使用 setsockopt 发送记录路由选项

#### 发送三次数据

![](OpenEuler/8-第八章/7-%E5%8F%91%E9%80%81%E4%B8%89%E6%AC%A1%E6%95%B0%E6%8D%AE.jpg)

#### 接收到三次数据

![](OpenEuler/8-第八章/8-%E6%8E%A5%E6%94%B6%E5%88%B0%E4%B8%89%E6%AC%A1%E6%95%B0%E6%8D%AE.jpg)

#### 输出记录到xml文件

![](OpenEuler/8-第八章/9-%E8%BE%93%E5%87%BA%E8%AE%B0%E5%BD%95%E5%88%B0xml%E6%96%87%E4%BB%B6.jpg)

#### 查看记录

![](OpenEuler/8-第八章/10-setsockopt-xml%E6%96%87%E4%BB%B6.jpg)

## 九、内核虚拟化

### 搭建OpenEuler系统的虚拟机

> 经过亲自实验，在本地VMware安装的OpenEuler操作系统内可以完成本实验，主要需要注意以下几点：
>
> - OpenEuler版本最好选择20.03(LTS)，即内核版本要为4.x
> - 编译内核时，需要勾选虚拟化的支持，具体操作见：一、操作系统安装与内核编译
> - 配置虚拟机的xml文件，需要结合官方文档和实验指导书两方面的示例
> - 生成虚拟机的镜像时，经过实验发现不能按照官方文档里面只分配4G，至少分个6G比较合适

#### 安装qemu

![](OpenEuler/9-第九章/1-%E5%AE%89%E8%A3%85qemu.jpg)

#### 安装libvirt

![](OpenEuler/9-第九章/2-%E5%AE%89%E8%A3%85libvirt.jpg)

#### 查看内核是否支持虚拟化

![](OpenEuler/9-第九章/3-%E6%9F%A5%E7%9C%8B%E5%86%85%E6%A0%B8%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E8%99%9A%E6%8B%9F%E5%8C%96.jpg)

#### 查看qemu是否安装成功

![](OpenEuler/9-第九章/4-%E6%9F%A5%E7%9C%8Bqemu%E6%98%AF%E5%90%A6%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F.jpg)

#### 查看libvirt是否安装成功

![](OpenEuler/9-第九章/5-%E6%9F%A5%E7%9C%8Blibvirt%E6%98%AF%E5%90%A6%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F.jpg)

#### 启动libvirtd服务

![](OpenEuler/9-第九章/6-%E5%90%AF%E5%8A%A8libvirtd%E6%9C%8D%E5%8A%A1.jpg)

#### 查看网络配置

<img src="./OpenEuler/9-第九章/7-%E6%9F%A5%E7%9C%8B%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE.jpg" style="zoom:80%;" />

#### 安装引导固件

> 因为实验指导书中只给了aarch64架构的安装方法，而VMware中的cpu是x86_64架构的
>
> 查看官方文档可以找到解决办法，运行下面的命令即可

```shell
yum install -y edk2-ovmf
```

![](OpenEuler/9-第九章/8-%E5%AE%89%E8%A3%85%E5%BC%95%E5%AF%BC%E5%9B%BA%E4%BB%B6.jpg)

#### 准备虚拟机镜像

> 之前按照官方文档创建的镜像，直接给了4G
>
> 后续安装操作系统进行分区时，要求不少于5.xxG(具体记不得了)，所以这里**最少得6G**

![](OpenEuler/9-第九章/10%E5%88%9B%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%95%9C%E5%83%8F.jpg)

#### 创建虚拟机

<img src="./OpenEuler/9-第九章/14-%E6%88%90%E5%8A%9F%E5%AE%9A%E4%B9%89%E8%99%9A%E6%8B%9F%E6%9C%BA.jpg" style="zoom:80%;" />

#### 运行虚拟机

<img src="./OpenEuler/9-第九章/15-%E8%BF%90%E8%A1%8C%E8%99%9A%E6%8B%9F%E6%9C%BA.jpg" style="zoom: 67%;" />

#### 安装tigervnc

![](OpenEuler/9-第九章/16-%E5%AE%89%E8%A3%85tigervnc.jpg)

#### 查看网络信息

<img src="./OpenEuler/9-第九章/17-%E6%9F%A5%E7%9C%8B%E7%BD%91%E7%BB%9C%E4%BF%A1%E6%81%AF.jpg" style="zoom:80%;" />

#### 填写VNC-Server地址

<img src="./OpenEuler/9-第九章/18-%E5%A1%AB%E5%86%99VNCServer%E5%9C%B0%E5%9D%80.jpg" style="zoom:80%;" />

#### 输入密码

> 官方文档给的配置中没有配置密码，需要添加下面的passwd属性

```xml
<graphics type='vnc' port='-1' autoport='yes' listen='0.0.0.0' passwd='123456'>
    <listen type='address' address='0.0.0.0'/>
</graphics>
```

![](OpenEuler/9-第九章/19-%E8%BE%93%E5%85%A5%E5%AF%86%E7%A0%81.jpg)

#### 连接报错

> 这里报错是因为，前面的虚拟机配置文件是直接复制的官方文档的配置，而官方文档给的配置中没有可以引导的disk
>
> 所以还需要添加下面的配置

```xml
<disk type='file' device='cdrom'>
    <driver name='qemu' type='raw'/>
    <source file='/root/vm_openEuler/openEuler-20.03-LTS-aarch64-dvd.iso'/>
    <readonly/>
    <target dev='sdb' bus='scsi'/>
    <boot order='2'/>
</disk>
```

<img src="./OpenEuler/9-第九章/20-%E8%BF%9E%E6%8E%A5%E6%8A%A5%E9%94%99.jpg" style="zoom:50%;" />

#### 安装虚拟机

<img src="./OpenEuler/9-第九章/21-%E5%AE%89%E8%A3%85%E8%99%9A%E6%8B%9F%E6%9C%BA.jpg" style="zoom:50%;" />

<img src="./OpenEuler/9-第九章/22-2安装界面.jpg" style="zoom: 50%;" />

![](OpenEuler/9-第九章/22-3%E5%AE%89%E8%A3%85%E4%B8%AD.jpg)

![](OpenEuler/9-第九章/22-4%E5%AE%89%E8%A3%85%E5%AE%8C%E6%88%90.jpg)

#### 登录虚拟机

![](OpenEuler/9-第九章/23-%E7%99%BB%E5%BD%95%E6%88%90%E5%8A%9F.jpg)

#### 关闭虚拟机

![](OpenEuler/9-第九章/24-%E5%85%B3%E9%97%AD%E8%99%9A%E6%8B%9F%E6%9C%BA.jpg)

### Docker

#### docker架构图

![](./OpenEuler/docker架构图.jpg)

#### 容器的生命周期

![](./OpenEuler/容器生命周期图.jpg)

#### 安装docker

![](OpenEuler/docker/1-%E5%AE%89%E8%A3%85docker.jpg)

#### 拉取镜像

![](OpenEuler/docker/2-%E6%8B%89%E5%8F%96%E9%95%9C%E5%83%8F.jpg)

#### 新建容器并启动

![](OpenEuler/docker/3-%E6%96%B0%E5%BB%BA%E5%AE%B9%E5%99%A8%E5%B9%B6%E5%90%AF%E5%8A%A8.jpg)

#### 创建容器并后台运行

![](OpenEuler/docker/4-%E5%88%9B%E5%BB%BA%E5%AE%B9%E5%99%A8%E5%B9%B6%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C.jpg)

#### 容器的终止与删除

![](OpenEuler/docker/5-%E5%AE%B9%E5%99%A8%E7%9A%84%E7%BB%88%E6%AD%A2%E4%B8%8E%E5%88%A0%E9%99%A4.jpg)

#### 创建镜像并验证可用性

![](OpenEuler/docker/6-%E5%88%9B%E5%BB%BA%E9%95%9C%E5%83%8F%E5%B9%B6%E9%AA%8C%E8%AF%81%E5%8F%AF%E7%94%A8%E6%80%A7.jpg)

## iSula容器引擎

> iSula通用容器引擎相比Docker，是一种新的容器解决方案，提供统一的架构设计来满足CT和IT领域的不同需求。相比Golang编写的Docker，轻量级容器使用C/C++实现，具有轻、灵、巧、快的特点，不受硬件规格和架构的限制，底噪开销更小，可应用领域更为广泛。
>
> ![img](OpenEuler/zh-cn_image_0183048952.png)

### [安装与配置](https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Container/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE.html)

#### 安装

```shell
sudo yum install -y iSulad
```

![](OpenEuler/iSula/2-%E5%AE%89%E8%A3%85iSulad.jpg)

#### 配置

- 配置镜像仓库地址

  ```shel
  isulad --registry-mirrors "https://nwxzkbs8.mirror.aliyuncs.com"
  isulad --insecure-registry "https://nwxzkbs8.mirror.aliyuncs.com"
  ```

#### 升级

- 若为相同大版本之间的升级，例如从2.x.x版本升级到2.x.x版本，请执行如下命令：

  ```shell
  sudo yum update -y iSulad
  ```

- 若为不同大版本之间的升级，例如从1.x.x版本升级到2.x.x版本，请先保存当前的配置文件`/etc/isulad/daemon.json`，并卸载已安装的iSulad软件包，然后安装待升级的iSulad软件包，随后恢复配置文件。

#### 卸载

- 卸载iSulad及其依赖软件包

  ```shell
  sudo yum remove iSulad
  ```

- 镜像、容器、volumes以及相关配置文件不会自动删除，需要手动删除。

  ```shell
  rm -rf /var/lib/iSulad
  ```

### [镜像管理](https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Container/%E9%95%9C%E5%83%8F%E7%AE%A1%E7%90%86.html)

#### 拉取镜像

```shell
isula pull ubuntu:14.04
```

![](OpenEuler/iSula/4-拉取镜像.jpg)

#### 查看镜像

```shell
isula images
```

### [容器管理](https://docs.openeuler.org/zh/docs/20.03_LTS/docs/Container/%E5%AE%B9%E5%99%A8%E7%AE%A1%E7%90%86.html)

#### 创建容器

```shell
isula create ubuntu:14.04
```

#### 查询所有容器

```shell
isula ps -a
```

#### 启动容器

```shell
isula start container_name
```

#### 运行容器

```shell
isula run -d ubuntu:14.04 /bin/sh -c "while true;do echo hello world; sleep 1; done"
```

#### 删除容器

```shell
isula rm container_ID
```

#### 接入容器

```shell
isula attach container_ID
```

#### 综合实验结果

![](OpenEuler/iSula/5-创建-查看-删除-接入容器.jpg)

### CNI网络

> 参考链接：
>
> [【kubernetes/k8s概念】CNI详解](https://blog.csdn.net/zhonglinzhang/article/details/82697524)
> [kubernetes cni网络详解](https://blog.csdn.net/liukuan73/article/details/78883847)

#### CNI的由来
CNI是Container Network Interface的是一个标准的，通用的接口。现在容器平台：docker，kubernetes，mesos，容器网络解决方案：flannel，calico，weave。**只要提供一个标准的接口，就能为同样满足该协议的所有容器平台提供网络功能，而CNI正是这样的一个标准接口协议。**

一直以来，kubernetes 并没有专门的网络模块负责网络配置，它需要用户在主机上已经配置好网络。
kubernetes 对网络的要求是：

- 容器之间（包括同一台主机上的容器，和不同主机的容器）可以互相通信
- 容器和集群中所有的节点也能直接通信

**kubernetes 网络的发展方向是希望通过插件的方式来集成不同的网络方案， CNI 就是这一努力的结果。**CNI只专注解决容器网络连接和容器销毁时的资源释放，提供一套框架，所以CNI可以支持大量不同的网络模式，并且容易实现。

#### 什么是CNI
   **CNI用于连接容器管理系统和网络插件**。提供一个容器所在的network namespace，将network interface插入该network namespace中（比如veth的一端），并且在宿主机做一些必要的配置（例如将veth的另一端加入bridge中），最后对namespace中的interface进行IP和路由的配置。

  CNI的工作是从容器管理系统处获取运行时信息，包括**network namespace的路径，容器ID以及network interface** name，再从容器网络的配置文件中加载网络配置信息，再将这些信息传递给对应的插件，由插件进行具体的网络配置工作，并将配置的结果再返回到容器管理系统中。

## A-Tune

### 安装与配置

#### 安装

![](./OpenEuler/Atune/1-安装atune.jpg)

![](./OpenEuler/Atune/2-查看安装是否成功.jpg)

### 启动Atune

![](./OpenEuler/Atune/3-启动atune.jpg)

### 查看负载类型

![](./OpenEuler/Atune/4-查询负载类型.jpg)

---

因为当时服务器买的是**按需付费**的，然后买的配置还挺好的，结果现在200块钱的优惠卷用完了，还**欠费**了3块钱:grimacing:。又因为A-Tune依赖于鲲鹏处理器，本地也做不了了。所以只能做到这里了:sob:
