# Monorepo [​](#monorepo)

> Repo 是 repository 的缩写，即 Git 仓库

Monorepo（单一代码仓库）是一种软件开发项目的版本控制管理策略，它将所有相关的代码、组件、模块和项目全部存储在一个统一的代码仓库中，而不是将它们拆分为多个独立的代码仓库

## Monorepo 和 Multi-Repo [​](#monorepo-和-multi-repo)

Monorepo 和 Multi-Repo 是两种项目管理方式，其区别如下：

- **Monorepo 是使用一个 Git 仓库管理多个项目**
- **Multi-Repo 是使用多个 Git 仓库管理多个项目，即一个项目对应一个仓库**

### Monorepo 的目录结构 [​](#monorepo-的目录结构)

```shell
.
├── .git
├── packages
│   ├── package-1                   # 子包 1
│   │   ├── src
│   │   │   └── index.js
│   │   └── package.json
│   └── package-2                   # 子包 2
│       ├── src
│       │   └── index.js
│       └── package.json
└── package.json
```

### Monorepo 的优缺点 [​](#monorepo-的优缺点)

**优点**：

- **代码和资源复用** 各个子包之间可以轻松地共享代码、工具类、组件等资源，有助于减少代码冗余，提高代码的复用性
- **一致的版本管理** 可以统一管理所有项目的版本号，确保它们之间的兼容性，而不会出现不同仓库之间的版本冲突
- **集中的构建和部署** 可以设置统一的构建和部署流程，减少了配置和管理的复杂性，这有助于确保所有项目的构建和部署方式保持一致
- **便于协作** 促进了跨项目的协作，开发团队可以更容易地查看、修改和协作各个项目
- **更好的项目管理** 通过单一代码仓库，项目管理变得更加直观。您可以使用版本控制系统的分支和标签来管理不同的项目或版本，从而简化了项目的追踪和管理
- **测试和集成更容易** 更轻松地进行整体测试和集成测试，不需要跨多个仓库协调测试

**缺点**：

- **仓库大小增长** 随着项目的增多，可能会导致仓库变得庞大且难以管理从而需要额外的存储和维护成本
- **构建时间增加** 由于存在多个项目，当构建整个项目时可能需要更长的时间，尤其是当只有部分项目发生更改时
- **依赖管理复杂性** 多个项目依赖于相同的第三方库时可能会导致依赖管理的复杂性，在确保所有项目都使用相同的依赖版本需要额外的努力
- **分支管理复杂性** 管理多个项目的分支和合并请求可能会变得复杂，需要谨慎的规划和流程

### Multi-Repo 的目录结构 [​](#multi-repo-的目录结构)

```shell
.
└─ multi-repo-1
    ├── .git
    ├── src
    │   └── index.js
    └── package.json

.
└─ multi-repo-2
    ├── .git
    ├── src
    │   └── index.js
    └── package.json
```

### Multi-Repo 的优缺点 [​](#multi-repo-的优缺点)

**优点**：

- **独立性和分离性** 每个项目的版本控制、依赖关系和构建流程上是完全独立的，这种分离可以避免项目之间的潜在干扰和冲突
- **更灵活的团队结构** 不同项目可以由不同的开发团队负责，这使得团队结构更加灵活，每个团队可以独立决策其工作流程、开发工具和版本发布策略
- **分布式开发** 如果项目需要分布式开发，每个项目都可以在不同的代码仓库中进行开发，而无需将所有代码集中在一个仓库中
- **隔离风险**：如果一个项目出现问题不会影响其他项目，这有助于隔离风险确保一个项目的问题不会波及整个代码库

**缺点**：

- **代码重复** 多个项目可能需要共享相同的代码或依赖项时，可能会导致代码重复
- **版本控制一致性**不同仓库中的项目可能使用不同的版本控制策略和工具，这可能导致版本控制一致性的问题。
- **依赖管理** 当多个项目依赖于相同的第三方库时，每个项目都需要单独管理这些依赖关系，会导致依赖管理的复杂性和不一致性
- **协作难度** 在不同的仓库中协同开发可能会变得更加复杂，需要额外的协调和工具，如跨仓库合并请求或协同开发流程

---

如何选择

- Monorepo 适用于需要代码共享、版本一致性和跨项目协作的项目
- Multi-Repo 适用于需要强调项目独立性、分离性和团队灵活性的情况

在选择时主要取决于项目需求、团队结构和偏好，没有哪种方式是绝对正确的，都要根据实际需求结合其优缺点来进行选择，下面是一些常见的考虑因素：

- 团队结构
- 团队偏好
- 项目规模
- 项目复杂性
- 项目依赖
- 项目共享
- 项目协作

## 搭建 Monorepo 项目 [​](#搭建-monorepo-项目)

常见的 Monorepo 实现

1.  使用 `pnpm/npm/yarn` 的 `workspace` 功能
2.  再搭配 Monorepo 管理工具
    1.  [`pnpm`](https://github.com/pnpm/pnpm)
    2.  [`lerna`](https://github.com/lerna/lerna)
    3.  [`nx`](https://github.com/nrwl/nx)
    4.  [`bazel`](https://github.com/bazelbuild/bazel)
    5.  [`rushstack`](https://github.com/microsoft/rushstack)

目前主流的方式是使用 `pnpm` 来做 Monorepo，其无须使用第三方工具就可以进行管理

### 安装 `pnpm` [​](#安装-pnpm)

使用 curl 使用 HomeBrew 使用 npm

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

```shell
brew install pnpm
```

```shell
npm install -g pnpm
```

---

相关资料

[安装 | pnpm](https://pnpm.io/zh/installation)

### 创建项目 [​](#创建项目)

sh

```shell
# 创建并进入 my-monorepo 文件夹
mkdir my-monorepo
cd my-monorepo

# 初始化项目和各种配置文件
pnpm create initer@latest

# 使用 npm init 来快速创建子包 shared/hooks/components
npm init -w packages/shared -y
npm init -w packages/components -y
npm init -w packages/hooks -y

# 删除 package.json 中的 workspaces 属性
npm pkg delete workspaces

# 最后再给每个子包创建一个 src/index.js
```

`npm init -w`

`npm init -w` 可以快速创建 Monorepo 子包，但是其会在根目录的 `package.json` 中添加 `workspaces` 属性，不需要时要及时删除

#### 修改 `package.json` [​](#修改-package-json)

修改主包的 `package.json`

```shell
{
  "name": "my-monorepo",
  "version": "1.0.0",

  // 设置为私有包，防止发布到 npm
  "private": true,

  "description": ""
  // ... 省略其他信息
}
```

#### 配置 `pnpm` 工作空间 [​](#配置-pnpm-工作空间)

在根目录下创建 `pnpm-workspace.yaml` 文件，并添加以下内容

```shell
packages:
  - 'packages/*'
```

最终目录结构如下

sh

```shell
├── .git
├── packages
│   ├── components                # components 子包
│   │   ├── src
│   │   │   └── index.js
│   │   └── package.json
│   ├── hooks                     # hooks 子包
│   │   ├── src
│   │   │   └── index.js
│   │   └── package.json
│   └── shared                    # shared 子包
│       ├── src
│       │   └── index.js
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

---

相关资料

[工作空间（Workspace） | pnpm](https://pnpm.io/zh/workspaces)

### 安装依赖 [​](#安装依赖)

在 Monorepo 项目中，依赖分为两种：

- **公共依赖** 在主包根目录下安装的依赖，会被所有子包继承
- **私有依赖** 在子包中安装的依赖，只会在当前子包中生效

```shell
# 安装公共依赖
pnpm add -D -w typescript eslint

# 安装私有依赖
pnpm -F "shared" add lodash
```

- [`-D`](https://pnpm.io/zh/cli/add#--save-dev--d) 表示安装开发依赖
- [`-w`](https://pnpm.io/zh/cli/add#--ignore-workspace-root-check) 表示安装到工作空间（即根目录）
- [`-F`](https://pnpm.io/zh/filtering) 表示安装到指定子包（`-F "shared"` 表示 `shared` 子包）

还可以将一个子包作为依赖安装到指定的子包中，例如：安装 `shared` 子包到 `components` 子包中

```shell
pnpm -F "components" add shared
```

执行完后，`components` 子包的 `package.json` 中会添加 `shared` 子包的依赖，如下：

```shell
{
  "name": "components",
  "version": "1.0.0",
  "dependencies": {
    "shared": "workspace:^"
  }
}
```

`workspace:^` 表示安装的是工作空间中的 `shared` 子包

### 配置 `changesets` [​](#配置-changesets)

`changesets` 是一个管理 `CHANGELOG` 的工具，可以帮助我们自动生成 `CHANGELOG`

```shell
# 安装 changesets
pnpm add -Dw @changesets/cli

# 初始化 changesets
pnpm changeset init
```

当完成一个功能时，需要使用 `pnpm changeset` 来生成一个 `changeset`，例如：

```shell
pnpm changeset
```

发布版本

```shell
# 更新版本和 CHANGELOG
pnpm changeset version

# 重新安装依赖
pnpm install

# 发布到 npm
pnpm publish -r
```

- `-r` 表示对所有子包执行某个命令
  相关资料

[在 pnpm 中使用 Changesets | pnpm](https://pnpm.io/zh/using-changesets)
