---
title: GIT学习记录
---

<h1 align="center">GIT学习记录</h1>

> HEAD指针指向当前所处的分支
>
> 分支指针指向最新的commit记录
>
> 每个commit记录都包含一份目录树
>
> 暂存区中也有一份目录树
>
> 工作区中也有一个目录树，又称为工作树

## git clone

| 命令                                                    | 含义                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| git clone git@github.com:user/project-name.git learnGit | 如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字 |
| git clone git@github.com:user/project-name.git .        | 如果最后一个字符是点，表示会在当前目录存放项目的所有文件，但当前目录一开始最好是个空目录 |

## git add

> 工作区文件分类：被修改(modify)、被新建(new)、被删除(delete)、被替换(replace)
>
> 第一种文件已经被add，即被追踪了；第二种和第三种都没有被add

|        命令        |                          含义                          |
| :----------------: | :----------------------------------------------------: |
| git add ‘fileName’ |                 将xxx文件添加到暂存区                  |
|     git add -u     |         提交所有被删除和修改的文件到数据暂存区         |
|     git add -A     | 提交所有被删除、被替换、被修改和新增的文件到数据暂存区 |
|     git add .      |           提交所有修改的和新建的到数据暂存区           |

## git commit

> 在编辑器中记录提交信息的格式如下：
>
> - 第一行： 用一行文字简述提交的更改内容
> - 第二行： 空行
> - 第三行以后：记述更改的原因和详细内容

| 命令                       | 含义                                                         |
| :------------------------- | :----------------------------------------------------------- |
| git commit -m '提交信息'   | -m参数后跟提交说明，在一行命令中提交更新                     |
| git commit --amend         | 修改提交信息                                                 |
| git commit --am '提交信息' | 合并 git add '文件名称' 和 git commit -m 提交信息'` 两个步骤为一个步骤 |
| git commit --allow-empty   | --allow-empty使得空白提交被允许                              |

## git tag

> 只要在打标签时添加-m”xxxx”，都可以添加标签说明，并在git show 显示的信息中显示打标签者、打标签日期和标签说明。而git tag -a应该只是声明要打一个含附注的标签，你可以用-m添加，又或者是使用它跳转的文本编辑软件添加，总之加上-a的标签必须要有标签说明，而git tag不会强制要求。当使用git tag -m时，效果其实和git tag -a -m是一样的
>
> - 轻量级tag：直接使用`git tag <tagname>`命令，不会记录和此次tag相关的更多信息
> - 附注tag：当使用git show查看一个附注tag时，除了显示打标签的commit信息外，还会显示tag本身的信息，包括：tag名称、打tag的人、打tag的时间
>   - -a：标注一个含附注的标签
>   - -m：直接在命令行中添加附注信息

| 命令                                   | 含义                                        |
| -------------------------------------- | ------------------------------------------- |
| git tag [-m] [\<message\>] \<tagname\> | 打标签，引用commit ID以保存当前版本库的状态 |
| git tag                                | 查看所有标签                                |
| git tag -d \<tagname\>                 |                                             |

## git stash

> 每个进度的标识都是stash@{\<n\>}，例如stash@{1}表示保存的第一个进度
>
> stash的存储数据结构是栈

| 命令                                      | 含义                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| git stash                                 | 保存当前的工作进度，会对暂存区和工作区的状态进行保存         |
| git stash save [\<message\>]              | 保存工作进度的时候使用指定的说明                             |
| git stash list                            | 显示进度列表                                                 |
| git stash pop [--index] [\<stash\>]       | 使用最新保存的进度进行恢复，并将恢复的进度从存储的进度列表中清除 |
| git stash apply [--index] [\<stash\>]     | 将保存的进度应用到暂存区和工作区，但是不删除进度             |
| git stash drop [\<stash\>]                | 删除一个存储的进度，默认删除最新的进度                       |
| git stash clear                           | 删除所有存储的进度                                           |
| git stash branch \<branchname\> \<stash\> | 基于进度创建分支                                             |

## git branch

| 命令                                                   | 含义                                                 |
| :----------------------------------------------------- | :--------------------------------------------------- |
| git branch branchName                                  | 创建xxx分支                                          |
| git branch -a                                          | 同时显示本地仓库和远程仓库的分支信息                 |
| git branch -D xxx                                      | 删除xxx分支                                          |
| git branch --set-upstream branchName origin/branchName | 将本地分支和远程分支建立追踪关系                     |
| git branch -vv                                         | 查看所有分支最后一次提交信息，以及每个分支的上游分支 |

## git checkout

| 含义                                         | 命令                                                         |
| :------------------------------------------- | :----------------------------------------------------------- |
| git checkout -b branchName                   | 创建并切换到xxx分支                                          |
| git checkout --track origin/xxx              | 建立跟踪分支，不指定该追踪分支的名字，默认和远程仓库的分支名字一样 |
| git checkout -b xxx origin/xxx               | 根据远程仓库xxx分支创建本地分支xxx，并建立跟踪关系           |
| git checkout xxx                             | 切换到xxx分支                                                |
| git checkout -                               | 切换到上一次使用的分支                                       |
| git checkout -b branchName origin/branchName | 获取远程仓库的某个分支到本地的某个分支                       |
| git checkout -- xxx                          | 将xxx文件从暂存区恢复到工作区                                |
| git checkout .                               | 取消所有文件的修改                                           |

## git remote

| 命令                                  | 含义                                               |
| ------------------------------------- | -------------------------------------------------- |
| git remote -v                         | 查看远程仓库的地址，没有推送权限时，看不到push地址 |
| git remote add [shortname] [url]      | 添加名为shortname，地址为url的远程仓库             |
| git remote rm [shortname]             | 删除名为shortname的远程仓库地址                    |
| git remote rename 原来的名称 新的名称 | 重命名远程仓库名称                                 |
| git remote rm [shortname]             | 删除远程仓库地址                                   |

## git push

> Git中`push.default`可以指定在没有明确指定远程分支的情况下，默认push的远程分支，其取值可以是：
>
> - **nothing** - push操作无效，除非显式指定远程分支（想让push变得简单的就不要用这个）
> - **current** - push当前分支到远程同名分支，如果远程同名分支不存在则自动创建同名分支（central 和 non-central workflows都适用）
> - **upstream** - push当前分支到它的upstream分支上（通常用于central workflow）
> - **simple** - simple和upstream是相似的（通常用于central workflow），只有一点不同，simple必须保证本地分支和它的远程 upstream分支同名，否则会拒绝push操作
> - **matching** - push所有本地和远程两端都存在的同名分支
>
> central / non-central workflows 是Git的两种常见工作流场景：
>
> - central workflows - 集中式工作流，一个分支的push和pull都是同一个远程仓库
> - non-central workflows - 非集中式工作流，一个分支的push和pull可能分别都有不同的远程仓库

| 命令                                            | 含义                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| git push <远程主机名> <本地分支名>:<远程分支名> | 推送本地分支到远程主机的远程分支上<br />（适用于两个分支名称不一样） |
| git push <远程主机名> <分支名>                  | 适用于两个分支名称一样                                       |
| git push <分支名>                               | 适用于`(`只有一个远程仓库`&&`两个分支名称一样`)`             |
| git push                                        | 适用于`(`只有一个远程仓库`||`有默认远程仓库`)&&`分支名称一样 |
| git push -u <远程主机名> <分支名>               | -u参数可以在推送的同时，将远程仓库的远程分支设置为本地仓库当前分支的 upstream（上游） |
| git push --all <远程主机名>                     | 不管是否存在对应的远程分支，都将本地的所有分支都推送到远程主机 |
| git push <远程主机名> :<远程分支名>             | 删除远程仓库中的某个分支，相当于推送了一个空的分支           |
| git push  <远程主机名> - -delete <远程分支名>   | 删除远程仓库中的某个分支                                     |
| git push <远程主机名> --tags                    | 推送所有标签到远程仓库                                       |

## git pull

| 命令                                            | 含义                                           |
| ----------------------------------------------- | ---------------------------------------------- |
| git pull <远程主机名> <远程分支名>:<本地分支名> | 拉取远程仓库的某个远程分支与本地的某个分支合并 |
| git pull <远程主机名> <远程分支名>              | 拉取远程仓库的某个远程分支与当前分支合并       |
| git pull <远程主机名>                           | 拉取远程仓库中与当前分支存在追踪关系的分支合并 |

## git merge

> 为了在历史记录中明确记录下本次分支合并，我们需要创建合并提交。因此，在合并时加上 --no-ff参数。
>
> 随后编辑器会启动，用于录入合并提交的信息。
>
> 默认信息中已经包含了是从 xxx 分支合并过来的相关内容，所 以可不必做任何更改。
>
> 在实际的软件开发中，不同分支合并到master主支时会产生冲突，例如：README文件修改的内容不一致。
>
> 此时，往往需要删除其中之一（手动修改文件内容）。冲突解决后，执行`git add`命令和`git commit`命令

| 命令                  | 含义                    |
| --------------------- | ----------------------- |
| git merge --no-ff xxx | 将xxx分支合并到当前分支 |

## git log

| 命令                   | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| git log --pretty=short | 只显示提交信息的第一行                                       |
| git log 目录名/文件名  | 只显示制定目录、文件的日志                                   |
| git log -p 文件名      | 显示文件的改动                                               |
| git log -p -2          | 参数`-p` 展开显示每次提交的内容差异， `-2` 则仅显示最近的两次更新 |
| git log --oneline      | 将每个提交放在一行显示，在提交多次后非常有用                 |
| git log --graph        | 以图表形式查看分支                                           |

## git diff

> 这里的 HEAD 是指向当前分支中最新一次提交的指针。
>
> “+” 号标出的是新添加的行，被删除的行则用 “-” 号标出。

| 命令              | 含义                                               |
| ----------------- | -------------------------------------------------- |
| git diff HEAD     | 查看工作树和最新提交的差别                         |
| git diff --cached | 查看已经暂存起来的文件和上次提交时的快照之间的差异 |

## git reset

> `git reset`之后，需要使用`git push -f origin master`强制推送到远程仓库
>
> --soft - 暂存区和工作区都不会发生改变
>
> --mixed - 暂存区发生改变，以便和HEAD相匹配，工作区不发生变化
>
> --hard - 暂存区和工作区都会发生改变（会丢弃工作区中未提交的修改）

| 命令                        | 含义                               |
| --------------------------- | ---------------------------------- |
| git reset --hard 哈希值     | 回溯到指定历史版本                 |
| git reset --hard master@{2} | 重置master分支为两次改变之前的状态 |
| git reset                   | 将所有文件从暂存区撤出，不做提交   |

## git reflog

| 命令                              | 含义                         |
| --------------------------------- | ---------------------------- |
| git reflog show master \| head -5 | 查看master分支指向变迁的记录 |

## git config

> 配置级别
>
> - --local (默认，高优先级)：只影响本仓库，文件为 .git/config
> - --global(中优先级)：影响到所有当前用户的git仓库，文件为~/.gitconfig
> - --system(低优先级)：影响到全系统的git仓库，文件为/etc/gitconfig
>
> 如果要修改或删除配置，更简单的方法是直接打开`~/.gitconfig`文件，或者`.git/config`文件修改即可
>
> `git config <section>.<key> <value>`

| 命令                                    | 含义                                |
| --------------------------------------- | ----------------------------------- |
| git config --global --list              | 查看全局所有配置                    |
| git config --global key value           | 在全局设置key的值为value            |
| git config --global --unset key         | 取消全局范围内对key的设置           |
| git config --global push.default simple | 只允许push 当前分支到远程同名分支上 |
| git config user.name                    | 查看某个配置项                      |
| git config --global core.autocrlf input | 更改git处理行结束条符的方式         |

## 中文乱码问题

### git status乱码

```bash
git config --global core.quotepath false 
```

### git log乱码

```bash
git config --global i18n.commit.encoding utf-8 
git config --global i18n.logoutputencoding utf-8 
# Linux下设置环境变量LESSCHARSET为utf-8
export LESSCHARSET=utf-8
# Windows下直接设置环境变量LESSCHARSET为utf-8
```

### git bash乱码

```bash
git config --global gui.encoding utf-8
```

## 拒绝合并不相关历史

> fatal: refusing to merge unrelated histories
> （拒绝合并不相关的历史）

- `git pull origin master --allow-unrelated-histories` 

  --allow-unrelated-histories 允许合并不相关历史

- `git add .`

- `git commit`

- `git push -u origin master`

## 远程仓库与本地仓库不一致

> error: failed to push some refs to 'gitee.com:xxx/test-responsity.git'
>
> 这个问题是因为远程库与本地库不一致造成的，那么我们把远程库同步到本地库就可以了

- `git pull --rebase origin master`

  –rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中

- 合并过程中有冲突时，解决冲突文件，然后提交冲突文件，再执行`git rebase --continue`

- 现在就可以推送至远程仓库了`git push origin master`

##  .gitignore文件

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

## SSH Key

- `ssh-keygen -t rsa -C “your_email@example.com”`
  - `-t` - 指定要创建的密钥类型
  - `-C` - 添加注释
- `cat ~/.ssh/id_rsa.pub`

## 代码托管平台账户、Git配置账户、SSH邮箱

- 产生ssh密钥对时里面输入的email，与Git设定的账户和GitHub等代码托管平台的账户毫无关联，仅仅是为了方便辨别每个密钥的作用。即`-C ‘xxx’`的作用是添加注释

- **这里需要注意的是代码托管平台对本地设定的账户是如何处理的**。代码托管网站，主要看email，用email地址来匹配自己的账户名的邮件地址，如果相同，代码托管网站就认为此操作是账户所有者的操作。比如：

  - 为了具有`push`权限，我们会将`ssh key`添加到代码托管平台的账户的SSH公钥中。**此时`ssh key`和我们的平台账户建立了关联**
  - 为了能够使用Git，我们需要在全局或者本地设置Git账户
  - 代码托管平台会将`ssh key`关联的用户作为**推送者**来显示和记录，会将配置的Git账户作为**提交者**来显示和记录
  
  > 比如：
  >
  > 代码托管平台账户为：`A@123.com`；Git账户邮箱为：`B@123.com`；SSH key关联的用户为：`C@123.com`；本地仓库有6个commmit需要push到远程仓库的master分支
  >
  > 此时进行`push`推送，代码托管平台会显示**用户C**推送到master分支，此次推送包含的6次commit记录都是**用户B**完成的
  >
  > 注意：
  >
  > 本地仓库如果以**ssh地址**设置的remote地址，那么push推送时会用到ssh key，此时上述推论适用这种情况。如果以**https地址**设置的remote地址，那么push推送时会要求输入代码托管平台的账号和密码，此时就相当于SSH key关联的用户为输入的平台用户。
  >
  > 理解：
  >
  > ssh加密生成私钥和公钥，仅是为了保证文件传输的安全性。因为我们将公钥添加到了代码托管平台账户的SSH公钥记录中，所以我们每次push时，平台会知道哪个用户上传了文件(推送)
  >
  > 换句话说，**每次push会留下ssh key的“痕迹”**，平台根据ssh key可以确定是哪个平台账户
  >
  > 而推送的文件内容是多次commit的结果，每次commit使用的是Git工具，因此**每次commit会留下Git账户的“痕迹”**

