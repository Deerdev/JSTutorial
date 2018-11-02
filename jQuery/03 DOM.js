/// 1.修改Text和HTML
// jQuery对象的text()和html()方法分别获取节点的文本和原始HTML文本，例如，如下的HTML结构：

<ul id="test-ul">
    <li class="js">JavaScript</li>
    <li name="book">Java &amp; JavaScript</li>
</ul>

// 分别获取文本和HTML：
$('#test-ul li[name=book]').text(); // 'Java & JavaScript'
$('#test-ul li[name=book]').html(); // 'Java &amp; JavaScript'

// 设置文本和HTML，直接传入参数
var j1 = $('#test-ul li.js');
var j2 = $('#test-ul li[name=book]');
j1.html('<span style="color: red">JavaScript</span>');
j2.text('JavaScript & ECMAScript');

// 一个jQuery对象可以包含0个或任意个DOM对象，它的方法实际上会作用在 对应的"每个"DOM节点上
// 0个对象时，也不会报错



/// 2.修改CSS：css()方法
$('#test-css li.dy>span').css('background-color', '#ffd351').css('color', 'red');

// **注意，jQuery对象的所有方法都返回一个jQuery对象（可能是新的也可能是自身），这样我们可以进行 "链式调用" ，非常方便。
// jQuery对象的css()方法可以这么用：
var div = $('#test-div');
div.css('color'); // '#000033', 获取CSS属性
div.css('color', '#336699'); // 设置CSS属性
div.css('color', ''); // 清除CSS属性
// 为了和JavaScript保持一致，CSS属性可以用'background-color'和'backgroundColor'两种格式。

// css()方法将作用于DOM节点的style属性，具有最高优先级。如果要修改class属性，可以用jQuery提供的下列方法：
var div = $('#test-div');
div.hasClass('highlight'); // false， class是否包含highlight
div.addClass('highlight'); // 添加highlight这个class
div.removeClass('highlight'); // 删除highlight这个class


/// 3.显示和隐藏DOM
// 要隐藏一个DOM，我们可以设置CSS的display属性为none，利用css()方法就可以实现。
// 不过，要显示这个DOM就需要恢复原有的display属性，这就得先记下来原有的display属性到底是block还是inline还是别的值。
// 考虑到显示和隐藏DOM元素使用非常普遍，jQuery直接提供show()和hide()方法，我们不用关心它是如何修改display属性的，总之它能正常工作：

var a = $('a[target=_blank]');
a.hide(); // 隐藏
a.show(); // 显示
// 注意，隐藏DOM节点并未改变DOM树的结构，它只影响DOM节点的显示。这和删除DOM节点是不同的。



/// 4.获取DOM信息
// 利用jQuery对象的若干方法，我们直接可以获取DOM的高宽等信息，而无需针对不同浏览器编写特定代码：

// 浏览器可视窗口大小:
$(window).width(); // 800
$(window).height(); // 600

// HTML文档大小:
$(document).width(); // 800
$(document).height(); // 3500

// 某个div的大小:
var div = $('#test-div');
div.width(); // 600
div.height(); // 300
div.width(400); // 设置CSS属性 width: 400px，是否生效要看CSS是否有效
div.height('200px'); // 设置CSS属性 height: 200px，是否生效要看CSS是否有效


// attr()和removeAttr()方法用于操作DOM节点的属性：

// <div id="test-div" name="Test" start="1">...</div>
var div = $('#test-div');
div.attr('data'); // undefined, 属性不存在
div.attr('name'); // 'Test'
div.attr('name', 'Hello'); // div的name属性变为'Hello'
div.removeAttr('name'); // 删除name属性
div.attr('name'); // undefined


// prop()方法和attr()类似，但是HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种，例如：

// <input id="test-radio" type="radio" name="test" checked value="1">
// 等价于：
// <input id="test-radio" type="radio" name="test" checked="checked" value="1">


// attr()和prop()对于属性checked处理有所不同：
var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true

// prop()返回值更合理一些。不过，用is()方法判断更好：
var radio = $('#test-radio');
radio.is(':checked'); // true
// 类似的属性还有selected，处理时最好用is(':selected')。


/// 5.操作表单
// 对于表单元素，jQuery对象统一提供"val()"方法获取和设置对应的value属性：

/*
    <input id="test-input" name="email" value="">
    <select id="test-select" name="city">
        <option value="BJ" selected>Beijing</option>
        <option value="SH">Shanghai</option>
        <option value="SZ">Shenzhen</option>
    </select>
    <textarea id="test-textarea">Hello</textarea>
*/
var
    input = $('#test-input'),
    select = $('#test-select'),
    textarea = $('#test-textarea');

input.val(); // 'test'
input.val('abc@example.com'); // 文本框的内容已变为abc@example.com

select.val(); // 'BJ'
select.val('SH'); // 选择框已变为Shanghai

textarea.val(); // 'Hello'
textarea.val('Hi'); // 文本区域已更新为'Hi'
// 可见，一个val()就统一了各种输入框的取值和赋值的问题。




/// 6.添加DOM
// append() prepend()  after()   before()
// 要添加新的DOM节点，除了通过jQuery的html()这种暴力方法外，还可以用append()方法，例如：

<div id="test-div">
    <ul>
        <li><span>JavaScript</span></li>
        <li><span>Python</span></li>
        <li><span>Swift</span></li>
    </ul>
</div>

var ul = $('#test-div>ul');
// 然后，调用append()传入HTML片段：
ul.append('<li><span>Haskell</span></li>');


// 除了接受字符串，append()还可以传入原始的DOM对象，jQuery对象和函数对象：
// 创建DOM对象:
var ps = document.createElement('li');
ps.innerHTML = '<span>Pascal</span>';
// 添加DOM对象:
ul.append(ps);

// 添加jQuery对象:
ul.append($('#scheme'));

// 添加函数对象:
ul.append(function (index, html) {
    return '<li><span>Language - ' + index + '</span></li>';
});
// 传入函数时，要求返回一个字符串、DOM对象或者jQuery对象。因为jQuery的append()可能作用于一组DOM节点，只有传入函数才能针对每个DOM生成不同的子节点。


// append()把DOM添加到最后， "prepend()" 则把DOM添加到最前。
// 另外注意，如果要添加的DOM节点已经存在于HTML文档中，它会首先从文档移除，然后再添加，也就是说，用 append() ，你可以移动一个DOM节点。


// 如果要把新节点插入到指定位置，例如，JavaScript和Python之间，那么，可以先定位到JavaScript，然后用 "after()" 方法：
var js = $('#test-div>ul>li:first-child');
js.after('<li><span>Lua</span></li>');
// 也就是说，同级节点可以用  "after()"  或者  "before()"  方法。

/// 8.删除节点
// 要删除DOM节点，拿到jQuery对象后直接调用  "remove()"  方法就可以了。如果jQuery对象包含若干DOM节点，实际上可以一次删除多个DOM节点：
var li = $('#test-div>ul>li');
li.remove(); // 所有<li>全被删除