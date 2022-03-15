<h1 align="center">GIT学习记录</h1>

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
| git commit --am '提交信息' | 合并 `git add '文件名称'` 和 <br />`git commit -m '提交信息'` 两个步骤为一个步骤 |

## git stash

| 命令            | 含义 |
| --------------- | ---- |
| git stash       |      |
| git stash list  |      |
| git stash pop   |      |
| git stash clear |      |
| git stash drop  |      |

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

| 命令                                            | 含义                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| git push <远程主机名> <本地分支名>:<远程分支名> | 推送本地分支到远程主机的远程分支上<br />（适用于两个分支名称不一样） |
| git push <远程主机名> <分支名>                  | 适用于两个分支名称一样                                       |
| git push <分支名>                               | 适用于只有一个远程仓库，且有上游分支(？或者两个分支名称一样) |
| git push                                        | 适用于只有一个远程仓库，或者有默认远程仓库，且分支名称一样   |
| git push -u <远程主机名> <分支名>               | -u参数可以在推送的同时，将远程仓库的远程分支设置为本地仓库当前分支的 upstream（上游） |
| git push --all <远程主机名>                     | 不管是否存在对应的远程分支，都将本地的所有分支都推送到远程主机 |
| git push <远程主机名> :<远程分支名>             | 删除远程仓库中的某个分支，相当于推送了一个空的分支           |
| git push  <远程主机名> - -delete <远程分支名>   | 删除远程仓库中的某个分支                                     |

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

| 命令                    | 含义               |
| ----------------------- | ------------------ |
| git reset --hard 哈希值 | 回溯到指定历史版本 |

## git config

> 配置级别
>
> - --local (默认，高优先级)：只影响本仓库，文件为 .git/config
> - --global(中优先级)：影响到所有当前用户的git仓库，文件为~/.gitconfig
> - --system(低优先级)：影响到全系统的git仓库，文件为/etc/gitconfig
>
> 如果要修改或删除配置，更简单的方法是直接打开`~/.gitconfig`文件，或者`.git/config`文件修改即可

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
- `cat ~/.ssh/id_rsa.pub`

