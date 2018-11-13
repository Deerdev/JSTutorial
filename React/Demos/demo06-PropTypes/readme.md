# PropTypes

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求。

demo06的Mytitle组件有一个title属性。`PropTypes` 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。

demo06中的`data`是数字，这样一来，title属性就通不过验证了。控制台会显示一行错误信息:

```text
Warning: Failed propType: Invalid prop `title` of type `number` supplied to `MyTitle`, expected `string`.
```

更多的PropTypes设置，可以查看[官方文档](https://reactjs.org/docs/components-and-props.html)。

## getDefaultProps

此外，getDefaultProps 方法可以用来设置组件属性的默认值。

```js
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

ReactDOM.render(
  <MyTitle />,
  document.body
);
```

上面代码会输出"Hello World"。