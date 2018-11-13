# AJAX

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI。

上面代码使用 `jQuery` 完成 `Ajax` 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。