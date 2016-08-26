#webpack + gulp 构建完整前端工作流

	在前面的两个小节中已经完整的讲了 webpack 和 gulp 相关的内容，本小节中将会结合二者构建一个完整的前端工作流，内容目录为：

	前端工程结构和目标

	前端工程目录结构

	gulp clean

	gulp copy

	gulp less

	gulp autoprefixer

	gulp webpack

	gulp eslint

	gulp watch

	gulp connect 和 livereload

	gulp mock server

	gulp test

####2.4.1 前端工程结构和目标

	React 在大多数情况被当做当 SPA （单页面应用）的框架，实际上在真实业务开发过程中，非单页面应用的业务框架居多。所以我们在构建前端工程的时候，以多个页面的方式维护。下面定义前端工程的目标：

####基础技术

	react(es6 + jsx)

	less

	gulp + webpack

####应用模式

	多页面应用：以多页面应用方式，能同时构建多个页面

####样式结构

	在样式的架构上的一些基本需求:

	基于 less 或者 sass 或者其他样式语言

	基础库

	共享变量和工具类

	样式的设计上，大可归为两种方式：

	独立样式：样式的开发和其他代码尽量分离独立；

	Inline Style：样式通过 javascript 变量维护，或者通过工具将 css 转化为 javascript，再应用到 React 的 style 中；

	样式文件在工程中的位置也可以分为两种：

	逻辑样式隔离：javascript 文件和样式文件在不同的工程目录，这是传统的样式逻辑分离设计，符合大多数的业务场景；

	component pod：也就是一个组件的目录结构包括样式，逻辑和模板，在 React 中模板和逻辑是在一起的，也就是一个组件包括一个 component.js 和 component.css 。 这种模式的目的是出于组件的 独立性，所以基于 pod 的组件好处是能够更好的共享，但坏处是和不方便共享变量和工具类（共享就会产生耦合，也就违背了 pod 的目的）

	所以在样式的设计上，我们应用如下这些设计：

	* 基于 Less

	* Less 相关的基础库和公共变量独立出来，变量主要是用于主题设置

	* 样式统一放在 style 目录下面，业务组件需要共享变量，以非 pod 的方式设计样式，放置在 style 目录独立文件中，文件名称和组件名相同

	* 需要独立的组件以 npm 的方式维护，样式以 pod 和 inline style 的方式设计

####第三方库引入方式

	在第三方库的引入上，可能以 bower_components 的方式，可能是自己公司内部维护的第三方库和基础组件，也可能是 npm 组件，所以为了兼容这些第三方库的引入，确定一下规范:

	vendor 目录下面放在第三方库，包括样式和逻辑，为了优化编译速度，这些目录的文件在编译的时候只做合并，避免和业务代码的编译做过多的耦合（vendor 库文件通常比较大）

	bower_components 中的库同 vendor

	npm 中的第三方库做代码分割，统一打包到 vendor.bundle.js 中

####配置自动化

	业务代码可能在不断增加，在工程 build 的时候，尽量以 glob 的方式匹配文件，避免增加一个业务文件就需要修改配置

####高效的编译

	代码编译的时间如果太长，会极大的影响开发体验，所以在编译的时候要考虑提高编译的效率：

	* 避免全局编译

	* 增量编译：利用上一节介绍的 gulp-cached 和 gulp-remember

	* 只在 prodution 的时候才做代码压缩优化

####后端数据 mock 和代理

	能够支持数据 mock 和代理功能

####2.4.2 前端工程目录结构

	基于这些目标定义如下工程结构：

	.
	├── package.json                 
	├── README.md                    
	├── gulpfile.js                  // gulp 配置文件
	├── webpack.config.js            // webpack 配置文件
	├── doc                          // doc  目录：放置应用文档
	├── test                         // test 目录：测试文件
	├── dist                         // dist 目录：放置开发时候的临时打包文件
	├── bin                          // bin  目录：放置 prodcution 打包文件
	├── mocks                        // 数据 mock 相关  
	├── src                          // 源文件目录
	│   ├── html                     // html 目录 
	│   │   ├── index.html
	│   │   └── page2.html
	│   ├── js                       // js 目录 
	│   │   ├── common               // 所有页面的共享区域，可能包含共享组件，共享工具类
	│   │   ├── home                 // home 页面 js 目录
	│   │   │   ├── components
	│   │   │   │   ├── App.js
	│   │   │   ├── index.js         // 每个页面会有一个入口，统一为 index.js
	│   │   ├── page2                // page2 页面 js 目录
	│   │   │   ├── components
	│   │   │   │   ├── App.js
	│   │   │   └── index.js
	│   └── style                    // style 目录
	│       ├── common               // 公共样式区域
	│       │   ├── varables.less    // 公共共享变量
	│       │   ├── index.less       // 公共样式入口
	│       ├── home                 // home 页面样式目录    
	│       │   ├── components       // home 页面组件样式目录
	│       │   │   ├── App.less 
	│       │   ├── index.less       // home 页面样式入口
	│       ├── page2                // page2 页面样式目录
	│       │   ├── components       
	│       │   │   ├── App.less
	│       │   └── index.less       
	├── vendor
	│   └── bootstrap
	└── └── jquery

	https://zhuanlan.zhihu.com/p/21312474
	想体验4.0只有通过github安装，执行以下两条命令即可在本地畅爽地使用gulp 4.0了。

	npm install gulpjs/gulp#4.0 -g

	npm install gulpjs/gulp#4.0 --save-dev




代码的自动刷新用到了 gulp-connect 插件，并通过 connect-rest 模块实现 rest 接口的数据 mock。


2.4.12 webpack-dev-server vs gulp-connect

在 webpack 小节也介绍过 webpack-dev-server 可以实现自动刷新并能实现局部的热加载 ，那为什么不使用 webpack-dev-server 而是使用 gulp-connect？

我的观点是对于一般的项目来说两者都可以使用，甚至可以只使用 webpack 就能完整工程构建任务，但是引入了 gulp 过后，能够更加清晰可控的编排任务，通过使用 gulp-connect 能够很方便的通过中间件的方式实现数据 mock，并且也能和 gulp.watch 整合。

connect-rest 不仅可以做数据 mock 的 rest 接口，同时也能实现 proxy 转发。

需要注意的是 connect-rest 用到的版本为 1.9.5, 高版本不兼容。