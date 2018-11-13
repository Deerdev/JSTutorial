# 变量使用

JSX 允许直接在模板插入 JavaScript 变量（{}包裹）。如果这个变量是一个数组，则会展开这个数组的所有成员。

demo03是一个 arr 数组，实际展开效果：

```html
<div><h1 key="1">Hello world!</h1></div>
<div><h2 key="2">React is awesome</h2></div>
```