<h1 align="center">GIT学习记录</h1>



## 一、基本操作

- `git init`初始化仓库

- `git status`查看仓库的状态

  - `git status -s` 或者 `git status --short` 可以得到一种更为紧凑的格式输出
  - `git status -sb` 一般地，`-s` 选项与`-b`选项同时使用，`s` 代表 summary(概要)，`b` 代表 branch(分支)

- `git add`向暂存区中添加文件

  - `git add '文件名称'`
  - `git add -A` 添加该文件夹下所有文件
  - `git add .`添加所有工作目录下的文件

- `git checkout -- xxx` 从暂存区恢复工作区

- `git commit`保存仓库的历史记录

  - 提交信息格式

    > 在编辑器中记录提交信息的格式如下：
    >
    > - 第一行： 用一行文字简述提交的更改内容
    > - 第二行： 空行
    > - 第三行以后：记述更改的原因和详细内容

  - `git commit -m '提交信息'` -m参数后跟提交说明，在一行命令中提交更新

  - `git commit --amend` 修改提交信息

  - `git commit --am '提交信息'` 可以合并 `git add '文件名称'` 和 `git commit -m '提交信息'` 两个步骤为一个步骤

    > 但是，跳过 `git add` 步骤，不等于完全不使用 `git add`。因为 `git commit -a` 是将所有跟踪过的文件暂存起来并提交，只是省略了暂存这一步。但一个未跟踪状态的文件需要使用 `git add` 命令来使其变成已跟踪状态

- `git log`查看提交日志

  - `git log --pretty=short` 只显示提交信息的第一行
  - `git log 目录名/文件名` 只显示制定目录、文件的日志
  - `git log -p 文件名` 显示文件的改动
  - `git log -p -2` 参数`-p` 展开显示每次提交的内容差异， `-2` 则仅显示最近的两次更新
  - `git log --oneline` 将每个提交放在一行显示，在提交多次后非常有用

- `git diff` 查看更改前后的区别

  - `git diff HEAD` 查看工作树和最新提交的差别

    > 这里的 HEAD 是指向当前分支中最新一次提交的指针。
    >
    > “+” 号标出的是新添加的行，被删除的行则用 “-” 号标出。

  - `git diff --cached` 查看已经暂存起来的文件和上次提交时的快照之间的差异

- `git remote` 查看当前配置有哪些远程仓库

  - `git remote -v` 查看当前的远程仓库地址

    > v为--verbose的简写，中文意思是冗长的，显示对应的克隆地址。如果没有推送权限，将看不到 push 的地址

  - `git remote add [shortname] [url]` 关联远程仓库

    > 通常情况下，一个本地 git 仓库对应一个远程仓库；然而，在一些情况下，一个本地仓库需要同时关联多个远程仓库，比如同时将一个项目发布在 github 和 coding上
    >
    > 添加一个新的远程仓库，可以指定一个名字(shortname)，以便将来引用，运行
    
  - `git remote rm origin` 删除远程仓库origin

- `git push` 将本地分支的更新，推送到远程主机

  - `git push <远程主机名> <本地分支名>:<远程分支名>`

    > ```
    > 取出本地的 branch1 分支，推送到远程仓库的 branch2 分支中去
    > git push origin branch1:branch2
    > ```
    >
    > 分支名字可以不同，但不建议这样做。因为本地和远程分支的名字相同，有下面简要写法
    >
    > ```
    > git push origin branch1
    > ```

  - `git push origin` 将当前分支推送到 origin 主机的对应分支

  - `git push` 一般地，当前分支只有一个追踪分支，那么主机名都可以省略

  - `git push -u origin master` 如果当前分支与多个主机存在追踪关系，则可以使用 `-u` 选项指定一个默认主机，这样后面就可以不加任何参数使用 `git push`

  - `git push --all origin` 不管是否存在对应的远程分支，都将本地的所有分支都推送到远程主机

- `git fetch` 从服务器抓取所有分支的数据

  - `git fetch origin master` 加上分支名，只更新该分支的数据

- `git pull` 拉取服务器分支数据和拷贝分支内容

  - `git pull <远程主机名> <远程分支名>:<本地分支名>`

    > ```
    > 取回 origin 主机的 next 分支，与本地的 master 分支合并
    > git pull origin next:master
    > ```

  - 如果远程分支(next)要与当前分支合并，如下

    ```
    git pull origin next
    ```

  - 如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名

    ```
    git pull origin
    ```

  - 如果当前分支只有一个追踪分支，连远程主机名都可以省略

    ```
    git pull
    如果 git pull 时，提示 no tracking information，
    则说明本地分支和远程分支的追踪关系没有创建
    用命令 git branch --set-upstream branch-name origin/branch-name 来建立追踪
    ```

## 二、分支的操作

### 2.1 基本命令

- ```git branch``` 显示分支一览表，同时可以确认当前所在分支

- ``` git branch xxx``` 创建xxx分支

  > 创建分支时，在哪个分支下执行该命令，好像就是以这个分支为基础进行创建

- ``` git branch -a ``` 添加 -a 参数可以同时显示本地仓库和远程仓库的分支信息。

- `git branch -D xxx` 删除分支

- ``` git checkout -b ``` 创建并切换到分支

- `git checkout --track origin/xxx` 建立跟踪分支，不指定该追踪分支的名字，默认和远程仓库的分支名字一样

- `git checkout -b xxx origin/xxx`

  > 从一个远程跟踪分支检出一个本地分支会自动创建所谓的“跟踪分支”（它跟踪的分支叫做“上游分支”）。 跟踪分支是与远程分支有直接关系的本地分支，本地分支与远程分支之间建立了一种追踪关系(tracking)
  >
  > 当克隆一个仓库时，它通常会自动地创建一个跟踪 `origin/master` 的 master 分支
  >
  > 如果在一个跟踪分支上输入 `git pull`，git 能自动地识别去哪个服务器上抓取、合并到哪个分支。所以，实际上，`git pull` 是 `git fetch` 后跟`git merge FETCH_HEAD` 的缩写。

- ``` git checkout xxx``` 切换到xxx分支

- ``` git checkout - ``` 可以切换到上一分支

- ``` git merge ``` 分支合并

  > ``` git merge --no-ff xxx ```  将xxx分支合并到master分支
  >
  > 为了在历史记录中明确记录下本次分支合 并，我们需要创建合并提交。因此，在合并时加上 --no-ff参数。
  >
  > 随后编辑器会启动，用于录入合并提交的信息。
  >
  > 默认信息中已经包含了是从 feature-A 分支合并过来的相关内容，所 以可不必做任何更改。

- ``` git log --graph ``` 以图表形式查看分支

- **想要将xxx分支合并到master主干分支，需要先回到master分支**

### 2.2 更改提交的操作

- ``` git reset ``` 回溯历史版本

  > 要让仓库的HEAD、暂存区、当前工作树回溯到指定状态，需要用到`git rest --hard`命令
  >
  > ``` git reset --hard 哈希值``` 
  >
  > 只要提供目标时间点的哈希值，就可以完全恢复至该时间点的状态。
  >
  > **哈希值在 ``` git log --graph ``` 中查看 ** ，类似： ```fd0cbf0d4a25f747230694d95cac1be72d33441d```

- ```git log``` 命令只能查看以当前状态为终点的历史日志。所以这里要使用 ```git reflog```命令，查看当前仓库的操作日志。在日志中找出回溯历史之前的哈希值，通过 ```git reset --hard``` 命令恢复到回溯历史前的状态。例如： `git reset --hard 83b0b94`

  > 即便开发者错误执行了 Git 操作， 基本也都可以利用 ```git reflog```命令恢复到原先的状态，所以务必牢记本部分。
  >
  > 在实际的软件开发中，不同分支合并到master主支时会产生冲突，例如：README文件修改的内容不一致。
  >
  > 此时，往往需要删除其中之一（手动修改文件内容）。冲突解决后，执行`git add`命令和`git commit`命令

### 2.3 删除远程分支

> 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支

```
git push origin :x

git push origin --delete x
```

## 三、仓库的操作

### 3.1 创建本地仓库

#### 3.1.1 初始化仓库

> 初始化后，在当前目录下会出现一个名为 `.git` 的目录，所有 git 需要的数据和资源都存放在这个目录中。不过目前，仅仅是按照既有的结构框架初始化好了里边所有的文件和目录，但还没有开始跟踪管理项目中的任何一个文件

```
git init
```

#### 3.1.2 .gitignore文件的书写

- 常用规则

  - 以斜杠`/`开头表示目录
  - 以星号`*`通配多个字符
  - 以问号`?`通配单个字符
  - 以方括号`[]`包含单个字符的匹配列表
  - 以叹号`!`表示不忽略匹配到的文件或目录
  - 所有空行或者以注释符号`#`开头的行都会被git忽略
  - 匹配模式最后跟反斜杠`/`说明要忽略的是目录

- git 对于 .gitignore配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效

- 示例说明

  - `fd1/*` ——忽略目录fd1下的全部内容；**注意**，不管是根目录下的`/fd1/` 目录，还是某个子目录`/child/fd1`目录，都会被忽略；
  - `/fd1/*`——忽略根目录下的`/fd1/`目录的全部内容
  - `/*`、`!.gitignore`、`!/fw/bin/`、`!/fw/sf/`——忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；

- 创建.gitignore文件

  - 常规Windows操作
    - 根目录下创建gitignore.txt
    - 编辑gitignore.txt，写入规则
    - 打开终端，切换到根目录
    - 执行命令`ren gitignore.txt .gitignore`
  - Git Bash操作
    - 根目录下右键进入bash命令窗口
    - 输入`vim .gitignore`或`touch .gitignore`命令，打开文件(没有文件会自动创建)
    - 输入规则，保存并退出

- 注意事项

  > 如果你不慎在创建.gitignore文件之前就push了项目，那么即使你在.gitignore文件中写入新的过滤规则，这些规则也不会起作用，Git仍然会对所有文件进行版本管理。
  >
  > 出现这种问题的原因就是Git已经开始管理这些文件了，所以你无法再通过过滤规则过滤它们。
  >
  > 因此一定要养成在项目开始就创建.gitignore文件的习惯，否则一旦push，处理起来会非常麻烦。

### 3.2 创建远程仓库

> 创建时请不要勾选 ```Initialize this repository with a README``` 选项。
>
> 因为一旦勾选该选项，GitHub 一侧的仓库就会自动生成 README 文件，**从创建之初便与本地仓库失去了整合性**。
>
> 虽然到时也可以强制覆盖，但为防止这一情况发生还是建议不要勾选该选项，**直接点击 ```Create repository``` 创建仓库**。

### 3.3 设置本地仓库的远程仓库

- ``` git remote add origin git@github.com:DFNJKD-98/strong-tears.git``` 

  > 执行该命令后，GIT会自动将该远程仓库的名称设置为origin（标识符）

- `git remote add upstream https://github.com/flutter/flutter.git`

  > 添加一个别名为 upstream (上游) 的地址，指向之前fork的原仓库地址

### 3.4 推送至远程仓库

#### 3.4.1 推送至master分支

``` git push -u origin master:master``` 

> 像这样执行 git push命令，当前分支的内容就会被推送给远程仓库 origin 的 master 分支。
>
> **-u参数可以在推送的同时，将 origin 仓库的 master 分支设置为本地仓库当前分支的 upstream（上游）。**
>
> 简单来说 upstream 就是于你本地分支对应的远端分支，push pull 或 fetch 时如果不指定远端分支，就会使用 upstream 分支。意思就是好像可以直接使用`git push`或者`git pull`而不用加远程分支。
>
> 添加了这个参数，将来运行 git pull命令从远程仓库获取内容时，本地仓库的这个分支就可以直接从 origin 的 master 分支获取内容，省去了另外添加参数的麻烦。

#### 3.4.2 推送至master以外的分支

``` git push -u origin xxx分支``` 

#### 3.4.3 将本地新建分支推送到远程仓库

`git push --set-upstream origin xxx分支`

#### 3.4.4 推送失败解决方法

- 错误内容

  ````
  Updates were rejected because the tip of your current branch is behind
  ````

  ```
  fatal: refusing to merge unrelated histories
  （拒绝合并不相关的历史）
  ```

- 解决方法

  - 使用强制push的方法：
    `git push -u origin master -f`
    这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

  - push前先将远程repository修改pull下来
    `git pull origin master`
    `git push -u origin master`

  - 若不想merge远程和本地修改，可以先创建新的分支：
    `git branch [name]`
    然后`push`
    `git push -u origin [name]`
    
  - **拉取远程仓库**(这个方法比较管用)
    
    ```shell
    git pull origin master --allow-unrelated-histories
    # --allow-unrelated-histories 允许合并不相关历史
    git add .
    git commit
    git push -u origin master
    ```
  
- 错误内容

  ```shell
  error: failed to push some refs to 'gitee.com:xxx/test-responsity.git'
  # 这个问题是因为远程库与本地库不一致造成的，那么我们把远程库同步到本地库就可以了
  ```

- 解决办法

  - `git pull --rebase origin master`

    –rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中

  - 合并过程中有冲突时，解决冲突文件，然后提交冲突文件，再执行`git rebase --continue`

  - 现在就可以推送至远程仓库了`git push origin master`

### 3.5 从远程仓库获取

#### 3.5.1 克隆远程仓库

- ``` git clone git@github.com:DFNJKD-98/strong-tears.git```

  > 执行 git clone命令后我们会默认处于 master 分支下，同时系统会自动将 origin 设置成该远程仓库的标识符。
  >
  > 也就是说，当前本地仓库的 master 分支与 GitHub 端远程仓库（origin）的 master 分支在内容上是完全相同的。

- `git clone git@github.com:DFNJKD-98/strong-tears.git learnGit`

  > 如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字

- `git clone git@github.com:DFNJKD-98/strong-tears.git .`

  > 如果最后一个字符是点，表示会在当前目录存放项目的所有文件，但当前目录一开始最好是个空目录

#### 3.5.2 获取远程的xxx分支

```  git checkout -b feature-D origin/feature-D```

将远程仓库的feature-D分支克隆到本地，并也命名为feature-D

#### 3.5.3 获取最新的远程仓库分支

``` git pull origin feature-D```

将远程仓库的feature-D分支拉取到本地仓库，更新本地仓库的分支

### 3.6 同步上游仓库

- `git fetch upstream`
- `git checkout master`
- `git merge upstream/master`

### 3.7 远程仓库删除和重命名

- `git remote rename coding cd` 重命名远程仓库coding为cd
- `git remote rm coding` 删除远程仓库coding

## 四、基础配置

### 4.1 配置级别

- --local (默认，高优先级)：只影响本仓库，文件为 .git/config
- --global(中优先级)：影响到所有当前用户的git仓库，文件为~/.gitconfig
- --system(低优先级)：影响到全系统的git仓库，文件为/etc/gitconfig

### 4.2 配置命令

#### 4.2.1 用户名

```
git config --global user.name "xxx"
```

#### 4.2.2 邮箱

```
git config --global user.email "xxxxxxxx@qq.com"
```

#### 4.2.3 文本编辑器

```
git config --global core.editor "code --wait"
```

#### 4.2.4 更改git处理行结束条符的方式

> Windows 使用回车（CR）和换行（LF）两个字符来结束一行，而 Mac 和 Linux 只使用换行（LF）一个字符。
>
> 下面的代码告诉 git 在提交时把回车和换行转换成换行，检出时不转换。这样在 Windows 上的检出文件中会保留回车和换行，而在 Mac 和 Linux 上，以及版本库中会保留换行

```
git config --global core.autocrlf input
```

#### 4.2.5 取消对中文的转义

> 使用 git 时，经常会碰到有一些中文文件名或者路径被转义成\xx\xx\xx的情况，通过下面的配置可以改变默认转义

```
git config --global core.quotepath false
```

#### 4.2.6 只允许push 当前分支到远程同名分支上

```
git config --global push.default simple
```

### 4.3 查看配置

- 查看所有配置

  ```
  git config --list
  ```

- 查看全局配置

  ```
  git config --list --global
  ```

- 查看某个配置项

  ```
  git config user.name
  ```

- 如果要修改或删除配置，更简单的方法是直接打开`~/.gitconfig`文件，或者`.git/config`文件修改即可



