/// 1.jQuery的扩展 给jQuery写插件

// 给jQuery对象绑定一个新方法是通过扩展  $.fn  对象实现的。让我们来编写第一个扩展——highlight1()：

$.fn.highlight1 = function () {
    // this已绑定为当前jQuery对象:
    this.css('backgroundColor', '#fffceb').css('color', '#d85030');
    return this;    // retrun this;让对象后续可以继续链式调用      
    // 函数内部的this在调用时被绑定为jQuery对象，所以函数内部代码可以正常调用所有jQuery对象的方法。
}

// 加参数的 highlight
$.fn.highlight2 = function (options) {
    // 要考虑到各种情况:
    // options为undefined
    // options只有部分key
    var bgcolor = options && options.backgroundColor || '#fffceb';
    var color = options && options.color || '#d85030';
    this.css('backgroundColor', bgcolor).css('color', color);
    return this;
}


// jQuery提供的辅助方法$.extend(target, obj1, obj2, ...)，它把多个object对象的属性合并到第一个target对象中，遇到同名属性，总是使用靠后的对象的值，也就是越往后优先级越高：

// 把默认值和用户传入的options合并到对象{}中并返回:
var opts = $.extend({}, {
    backgroundColor: '#00a8e6',
    color: '#ffffff'
}, options);    // options如果有值，会覆盖前面的值


// 提供默认值的 highlight
$.fn.highlight = function (options) {
    // 合并默认值和用户设定值:
    var opts = $.extend({}, $.fn.highlight.defaults, options);
    this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
    return this;
}
// 设定默认值:
$.fn.highlight.defaults = {
    color: '#d85030',
    backgroundColor: '#fff8de'
}
// 用户自己修改 默认值
$.fn.highlight.defaults.color = '#fff';
$.fn.highlight.defaults.backgroundColor = '#000';


// 最终，我们得出编写一个jQuery插件的原则：
// - 给$.fn绑定函数，实现插件的代码逻辑；
// - 插件函数最后要return this;以支持链式调用；
// - 插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
// - 用户在调用时可传入设定值以便覆盖默认值。



/// 2.针对特定元素的扩展
// 我们知道jQuery对象的有些方法只能作用在特定DOM元素上，比如submit()方法只能针对form。如果我们编写的扩展只能针对某些类型的DOM元素，应该怎么写？

// filter()方法来过滤

// 举个例子，现在我们要给所有指向外链的超链接加上跳转提示，怎么做？
// 先写出用户调用的代码：

$('#main a').external();

// 然后按照上面的方法编写一个external扩展：
$.fn.external = function () {
    // return返回的each()返回结果，支持链式调用:
    return this.filter('a').each(function () {
        // 注意: each()内部的回调函数的this绑定为DOM本身!
        var a = $(this);
        var url = a.attr('href');
        if (url && (url.indexOf('http://')===0 || url.indexOf('https://')===0)) {
            a.attr('href', '#0')
             .removeAttr('target')
             .append(' <i class="uk-icon-external-link"></i>')
             .click(function () {
                if(confirm('你确定要前往' + url + '？')) {
                    window.open(url);
                }
            });
        }
    });
}





