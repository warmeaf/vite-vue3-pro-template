# README

## 目录

-   [模板技术栈](#模板技术栈)
-   [项目配置](#项目配置)
    -   [配置eslint](#配置eslint)
    -   [配置prettier](#配置prettier)
    -   [配置stylelint](#配置stylelint)
    -   [配置husky](#配置husky)
    -   [配置commitlint](#配置commitlint)
    -   [强制使用pnpm包管理器工具](#强制使用pnpm包管理器工具)
-   [参考](#参考)

### 模板技术栈

1.  vite
2.  vue3
3.  JavaScript
4.  scss

### 项目配置

#### 配置eslint

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/ "Nicholas C. Zakas") 于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

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
    "env": { 
        "browser": true,//浏览器端
        "es2021": true,//es2021
    },
    //规则继承
    "extends": [ 
       //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
       //比如:函数不能重名、对象不能出现重复key
        "eslint:recommended",
        //vue3语法规则
        "plugin:vue/vue3-essential",
        //ts语法规则
        "plugin:@typescript-eslint/recommended"
    ],
    //要为特定类型的文件指定处理器
    "overrides": [
    ],
    //指定解析器:解析器
    //Esprima 默认解析器
    //Babel-ESLint babel解析器
    //@typescript-eslint/parser ts解析器
    "parser": "@typescript-eslint/parser",
    //指定解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",//校验ECMA最新版本
        "sourceType": "module"//设置为"script"（默认），或者"module"代码在ECMAScript模块中
    },
    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
    //该eslint-plugin-前缀可以从插件名称被省略
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    //eslint规则
    "rules": {
    }
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

#### 配置stylelint

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

#### 配置husky

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

#### 配置commitlint

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

配置husky

```javascript
npx husky add .husky/commit-msg
```

在生成的commit-msg文件中添加下面的命令

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```

当我们 `commit `提交信息时，就不能再随意写了，必须是 `git commit -m 'fix: xxx'` 符合类型的才可以，需要注意的是类型的后面需要用英文的 `:`，并且冒号后面是需要空一格的，这个是不能省略的。

#### 强制使用pnpm包管理器工具

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

### 参考

1.  [📖 Linter的故事 | Linter上手完全指南 (yanhaixiang.com)](https://github.yanhaixiang.com/linter-tutorial/theory/history.html#stylelint "📖 Linter的故事 | Linter上手完全指南 (yanhaixiang.com)")
2.  [vue3\_admin\_template: 此仓库即为贾成豪老师源码仓库 (gitee.com)](https://gitee.com/jch1011/vue3_admin_template-bj1 "vue3_admin_template: 此仓库即为贾成豪老师源码仓库 (gitee.com)")
