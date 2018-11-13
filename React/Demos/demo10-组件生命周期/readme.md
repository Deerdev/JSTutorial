# 组件的生命周期

组件的生命周期分成三个状态：

```js
Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM
```

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

```js
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
```

此外，React 还提供两种特殊状态的处理函数。

```js
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```

这些方法的详细说明，可以参考[官方文档](https://reactjs.org/docs/react-component.html#lifecycle-methods)。

demo10在hello组件加载以后，通过 `componentDidMount` 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。

另外，组件的style属性的设置方式也值得注意，不能写成

```js
style="opacity:{this.state.opacity};"
```

而要写成

```js
style={{opacity: this.state.opacity}}
```

这是因为 [React组件样式](https://reactjs.org/docs/dom-elements.html)是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。
