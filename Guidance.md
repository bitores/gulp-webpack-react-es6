###es6

	npm install --save-dev gulp-babel babel-preset-es2015


	# ES2015转码规则
	$ npm install --save-dev babel-preset-es2015

	# react转码规则
	$ npm install --save-dev babel-preset-react

	# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
	$ npm install --save-dev babel-preset-stage-0
	$ npm install --save-dev babel-preset-stage-1
	$ npm install --save-dev babel-preset-stage-2
	$ npm install --save-dev babel-preset-stage-3


###[React 规范一](https://zhuanlan.zhihu.com/p/21458464?refer=leanreact)

###[React 规范Demo](https://github.com/airbnb/javascript/tree/master/react)

###[React 规范二](http://www.cnblogs.com/yongjz/p/5356914.html)

####[规范可以使用 eslint-plugin-react 插件来强制实施](https://link.zhihu.com/?target=https%3A//github.com/yannickcr/eslint-plugin-react)

###小结

+ 不支持React mixins
+ 使用箭头函数 =>，替代bind(this)
+ state初始化在constructor完成
+ super(props)必传
+ props和propTypes要在class外部定义为const,因react0.13后不变
+ es6内部不使用function关键字
+ 使用React.Component（es6）替代 React.creatClass（es5）
+ statics only works with React.creatClass.
+ static methods are ES6 and declear them inside or outside the class.


###issue

	jsx---(gulp-babel)-->js(CommonJS),这里经过babel编译后的require是什么

	Babel 所做的只是帮你把‘ES6 模块化语法’转化为‘CommonJS 模块化语法’，其中的require exports 等是 CommonJS 在具体实现中所提供的变量。

	任何实现 CommonJS 规范的环境（如 node 环境）可以直接运行这样的代码，而浏览器环境并没有实现对 CommonJS 规范的支持，所以我们需要使用打包工具（bundler）来进行打包，说的直观一点就是把所有的模块组装起来，形成一个常规的 js 文件。