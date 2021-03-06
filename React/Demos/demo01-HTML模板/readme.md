# HTML模板

上面代码有两个地方需要注意。首先，最后一个 `<script>` 标签的 type 属性为 `text/babel` 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 `type="text/babel"` 。

其次，上面代码一共用了三个库： react.js 、react-dom.js 和 Browser.js ，它们必须首先加载。其中，react.js 是 React 的核心库，react-dom.js 是提供与 DOM 相关的功能，Browser.js 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

```shell
$ babel src --out-dir build
```

上面命令可以将 src 子目录的 js 文件进行语法转换，转码后的文件全部放在 build 子目录。

# ReactDOM.render()

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

```html
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

上面代码将一个 h1 标题，插入 example 节点