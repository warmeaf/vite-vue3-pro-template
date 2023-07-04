# vite-vue3 项目模板

## 目录

- [模板技术栈](#模板技术栈)
- [项目配置](#项目配置)
  - [配置 eslint](#配置eslint)
  - [配置 prettier](#配置prettier)
  - [配置 stylelint](#配置stylelint)
  - [配置 husky](#配置husky)
  - [配置 commitlint](#配置commitlint)
  - [强制使用 pnpm 包管理器工具](#强制使用pnpm包管理器工具)
- [项目集成](#项目集成)
  - [element-plus 按需引入](#element-plus按需引入)
  - [src 别名的配置](#src别名的配置)
  - [环境变量的配置](#环境变量的配置)
  - [集成 normalsize](#集成normalsize)
  - [集成 sass 全局变量](#集成sass全局变量)
  - [mock 数据](#mock数据)
  - [axios 二次封装和 API 接口统一管理](#axios二次封装和API接口统一管理)
  - [配置代理](#配置代理)
- [项目优化](#项目优化)
  - [打包体积视图分析](#打包体积视图分析)
  - [打包去除 console 和 debugger](#打包去除console和debugger)
- [参考](#参考)

### 模板技术栈

1.  vite
2.  vue3
3.  JavaScript
4.  scss
5.  axios

### 项目配置

#### 配置 eslint

`ESLint`最初是由[Nicholas C. Zakas](http://nczonline.net/ 'Nicholas C. Zakas') 于 2013 年 6 月创建的开源项目。它的目标是提供一个插件化的`javascript`代码检测工具

首先安装`eslint`

```javascript
pnpm i eslint -D
```

生成配置文件`.eslint.cjs`

```javascript
npx eslint --init
```

`.eslint.cjs` 配置文件

```javascript
module.exports = {
  //运行环境
  env: {
    browser: true, //浏览器端
    es2021: true, //es2021
  },
  //规则继承
  extends: [
    //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
    //比如:函数不能重名、对象不能出现重复key
    'eslint:recommended',
    //vue3语法规则
    'plugin:vue/vue3-essential',
    //ts语法规则
    'plugin:@typescript-eslint/recommended',
  ],
  //要为特定类型的文件指定处理器
  overrides: [],
  //指定解析器:解析器
  //Esprima 默认解析器
  //Babel-ESLint babel解析器
  //@typescript-eslint/parser ts解析器
  parser: '@typescript-eslint/parser',
  //指定解析器选项
  parserOptions: {
    ecmaVersion: 'latest', //校验ECMA最新版本
    sourceType: 'module', //设置为"script"（默认），或者"module"代码在ECMAScript模块中
  },
  //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
  //该eslint-plugin-前缀可以从插件名称被省略
  plugins: ['vue', '@typescript-eslint'],
  //eslint规则
  rules: {},
}
```

`vue3`环境代码校验插件

```javascript
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^4.2.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
"eslint-plugin-vue": "^9.9.0",
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.19.1",
```

安装指令

```javascript
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier @babel/eslint-parser
```

修改`.eslintrc.cjs`配置文件

```javascript
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```

`.eslintignore`忽略文件

```javascript
dist
node_modules
```

运行脚本

```javascript
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```

可配合`eslint`的`vscode`插件使用

#### 配置**prettier**

`prettier` 用于统一代码风格，支持包含`js`在内的多种语言。

安装指令

```javascript
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

`.prettierrc.json`添加规则

```javascript
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

`.prettierignore`忽略文件

```javascript
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

运行脚本

```javascript
  "scripts": {
    "format": "prettier --write \"./**/*.{html,vue,js,json,md}\"",
  }
```

#### 配置 stylelint

`stylelint`为`css`的`lint`工具。可格式化`css`代码，检查`css`语法错误与不合理的写法，指定`css`书写顺序等。

使用`scss`作为预处理器，安装以下依赖：

```javascript
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

`.stylelintrc.cjs`**配置文件**

```javascript
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

`.stylelintignore`忽略文件

```javascript
/node_modules/*
/dist/*
/html/*
/public/*
```

运行脚本

```javascript
"scripts": {
  "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

#### 配置 husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用`husky`在代码提交之前触发`git hook`(`git`在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

安装`husky`

```javascript
pnpm install -D husky
```

执行

```javascript
npx husky-init
```

会在根目录下生成个一个`.husky`目录，在这个目录下面会有一个`pre-commit`文件，这个文件里面的命令在我们执行`commit`的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

当我们对代码进行`commit`操作的时候，就会执行命令，对代码进行格式化，然后再提交。

#### 配置 commitlint

对于我们的`commit`信息，也是有统一规范的，不能随便写,要让每个人都按照统一的标准来执行，我们可以利用\*\*`commitlint`\*\*来实现。

安装

```javascript
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

添加配置文件，新建`commitlint.config.cjs`(注意是`cjs`)，然后添加下面的代码：

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

在`package.json`中配置`scripts`命令

```javascript
{
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
}
```

现在当我们填写`commit`信息的时候，前面就需要带着下面的前缀

```javascript
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

配置 husky

```javascript
npx husky add .husky/commit-msg
```

在生成的 commit-msg 文件中添加下面的命令

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```

当我们 `commit `提交信息时，就不能再随意写了，必须是 `git commit -m 'fix: xxx'` 符合类型的才可以，需要注意的是类型的后面需要用英文的 `:`，并且冒号后面是需要空一格的，这个是不能省略的。

#### 强制使用 pnpm 包管理器工具

团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,

导致项目出现`bug`问题,因此包管理器工具需要统一管理

安装

```javascript
pnpm install -D only-allow
```

运行指令

```javascript
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
```

当我们使用`npm`或者`yarn`来安装包的时候，就会报错了。原理就是在`install`的时候会触发`preinstall`（`npm`提供的生命周期钩子）这个文件里面的代码

### 项目集成

#### element-plus 按需引入

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```javascript
pnpm install -D unplugin-vue-components unplugin-auto-import
```

然后配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

#### src 别名的配置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给 src 文件夹配置一个别名

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      // 设置别名
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})
```

#### 环境变量的配置

项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。

项目根目录分别添加 开发、生产和测试环境的文件

```javascript
.env.development
.env.production
.env.test
```

文件内容

```javascript
// .env.development
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = 'vite-vue3项目模板'
VITE_APP_BASE_API = '/dev-api'
VITE_SERVE="http://sph-api.atguigu.cn"

```

```javascript
// .env.production
NODE_ENV = 'production'
VITE_APP_TITLE = 'vite-vue3项目模板'
VITE_APP_BASE_API = '/prod-api'
VITE_SERVE = 'http://sph-api.atguigu.cn'
```

```javascript
// .env.test
NODE_ENV = 'test'
VITE_APP_TITLE = 'vite-vue3项目模板'
VITE_APP_BASE_API = '/test-api'
VITE_SERVE = 'http://sph-api.atguigu.cn'
```

访问环境变量，通过 import.meta.env 获取环境变量

```javascript
const en = import.meta.env.VITE_APP_BASE_API
console.log(import.meta)
```

#### 集成 normalsize

安装

```javascript
pnpm install normalize.css
```

在`main.js`中引入

```javascript
import 'normalize.css'
```

#### 集成 sass 全局变量

在`src/style/variable.scss`创建一个`variable.scss`文件

```sass (scss)
// scss全局变量
$red: rgb(255, 0, 0);
```

在`vite.config.js`文件配置如下:

```javascript
export default defineConfig((config) => {
  css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
}
```

这样一来就可以在需要用到的地方使用`$red` 全局变量了，不然会报错。

#### mock 数据

安装

```javascript
pnpm install -D vite-plugin-mock mockjs
```

在`vite.config.js` 中配置

```javascript
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
})
```

在根目录创建`mock`文件夹，去创建我们需要`mock`数据与接口

在`mock`文件夹内部创建一个`user.js`文件

```javascript
//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },
]
```

安装 axios

```javascript
pnpm install axios

```

最后通过 axios 测试接口

```javascript
<script setup>
import axios from 'axios'
axios
  .post('/api/user/login', {
    username: 'admin',
    password: '111111',
  })
  .then((res) => {
    console.log(res)
  })
</script>
```

#### axios 二次封装和 API 接口统一管理

把 axios 进行二次封装

在根目录下创建 utils/request.js

```javascript
import axios from 'axios'
import { ElMessage } from 'element-plus'
//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
```

在 src 目录下去创建 api 文件夹去统一管理项目的接口

```javascript
import request from '@/utils/request'

//登录接口
export const reqLogin = (data) => request.post('/admin/acl/index/login', data)

//获取用户信息
export const reqUserInfo = () => request.get('/admin/acl/index/info')

//退出登录
export const reqLogout = () => request.post('/admin/acl/index/logout')
```

#### 配置代理

```javascript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  return {
    // node服务
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  }
})
```

发起请求

```javascript
<script setup>
import { reqLogin } from '@/api/user'
async function userLogin(data) {
  data = {
    username: 'admin',
    password: '111111',
  }
  const res = await reqLogin(data)
  console.log(res)
}
</script>
```

### 项目优化

#### 打包体积视图分析

安装

```javascript
pnpm install rollup-plugin-visualizer -D
```

在`vite.config.js`中配置

```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // 打包体积视图分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'test.html', //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
})
```

#### 打包去除 console 和 debugger

在`vite.config.js`中配置

```javascript
export default defineConfig({
  esbuild: {
    // 打包去除console和debugger
    drop: ['console', 'debugger'],
  }
)
```

### 参考

1.  [📖 Linter 的故事 | Linter 上手完全指南 (yanhaixiang.com)](https://github.yanhaixiang.com/linter-tutorial/theory/history.html#stylelint '📖 Linter的故事 | Linter上手完全指南 (yanhaixiang.com)')
2.  [vue3_admin_template: 此仓库即为贾成豪老师源码仓库 (gitee.com)](https://gitee.com/jch1011/vue3_admin_template-bj1 'vue3_admin_template: 此仓库即为贾成豪老师源码仓库 (gitee.com)')
