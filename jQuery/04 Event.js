/// 1.绑定点击事件on
/* HTML:
 *
 * <a id="test-link" href="#0">点我试试</a>
 *
 */

// 获取超链接的jQuery对象:
var a = $('#test-link');
a.on('click', function () {
    alert('Hello!');
});

// 另一种更简化的写法是直接调用click()方法：
a.click(function () {
    alert('Hello!');
});


/// 2.jQuery能够绑定的事件主要包括：

// >鼠标事件
// - click: 鼠标单击时触发；
// - dblclick：鼠标双击时触发；
// - mouseenter：鼠标进入时触发；
// - mouseleave：鼠标移出时触发；
// - mousemove：鼠标在DOM内部移动时触发；
// - hover：鼠标进入和退出时触发两个函数，相当于mouseenter加上mouseleave。

// >键盘事件
// 键盘事件仅作用在当前焦点的DOM上，通常是<input>和<textarea>。
// - keydown：键盘按下时触发；
// - keyup：键盘松开时触发；
// - keypress：按一次键后触发。

// >其他事件
// - focus：当DOM获得焦点时触发；
// - blur：当DOM失去焦点时触发；
// - change：当<input>、<select>或<textarea>的内容改变时触发；
// - submit：当<form>提交时触发；
// - ready：当页面被载入并且DOM树完成初始化后触发。ready仅作用于document对象

// ready事件写法一：
$(document).on('ready', function () {
    $('#testForm').on('submit', function () {
        alert('submit!');
    });
});

// ready事件写法二：
$(document).ready(function () {
    // on('submit', function)也可以简化:
    $('#testForm').submit(function () {
        alert('submit!');
    });
});

// ready事件写法三【常用】：
$(function () {
    // init...
});

// 可以反复绑定事件处理函数，它们会依次执行：
$(function () {
    console.log('init A...');
});
$(function () {
    console.log('init B...');
});
$(function () {
    console.log('init C...');
});



/// 3.事件参数
// 有些事件，如mousemove和keypress，我们需要获取鼠标位置和按键的值。所有事件都会传入"Event对象"作为参数，可以从Event对象上获取到更多的信息：

$(function () {
    $('#testMouseMoveDiv').mousemove(function (e) {
        $('#testMouseMoveSpan').text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
    });
});



/// 4.取消绑定
// 一个已被绑定的事件可以解除绑定，通过off('click', function)实现： on和off必须操作的是同一个函数

function hello() {
    alert('hello!');
}

a.click(hello); // 绑定事件

// 10秒钟后解除绑定:
setTimeout(function () {
    a.off('click', hello);
}, 10000);


// ❌ 需要特别注意的是，下面这种写法是无效的：
// 绑定事件:
a.click(function () {
    alert('hello!');
});
// 解除绑定:
a.off('click', function () {
    alert('hello!');
});
// 这是因为两个匿名函数虽然长得一模一样，但是它们是"两个不同的函数对象"，off('click', function () {...})无法移除已绑定的第一个匿名函数。

// 移除点击事件：  为了实现移除效果，可以使用off('click')一次性移除已绑定的click事件的所有处理函数。
// 移除所有事件：  同理，无参数调用off()一次性移除已绑定的所有类型的事件处理函数。



/// 5.事件触发条件
// 一个需要注意的问题是，事件的触发总是由用户操作引发的。例如，我们监控文本框的内容改动：

var input = $('#test-input');
input.change(function () {
    console.log('changed...');
});

// 当用户在文本框中输入时，就会触发change事件。但是，如果用JavaScript代码去改动文本框的值，将 "不会触发change事件"：
var input = $('#test-input');
input.val('change it!'); // 无法触发change事件

// 有些时候，我们希望用代码触发change事件，可以直接调用无参数的change()方法来触发该事件：
var input = $('#test-input');
input.val('change it!');
input.change(); // 触发change事件: trigger

// input.change()相当于input.trigger('change')，它是trigger()方法的简写。


/// 6.浏览器安全限制
// 在浏览器中，有些JavaScript代码只有在用户触发下才能执行，例如，window.open()函数：

// 无法弹出新窗口，将被浏览器屏蔽:
$(function () {
    window.open('/');
});


// 这些“敏感代码”只能由用户操作来触发：
var button1 = $('#testPopupButton1');
var button2 = $('#testPopupButton2');

function popupTestWindow() {
    window.open('/');
}

button1.click(function () {
    popupTestWindow();
});

button2.click(function () {
    // 不立刻执行popupTestWindow()，100毫秒后执行:
    setTimeout(popupTestWindow, 100);
});
// 当用户点击button1时，click事件被触发，由于popupTestWindow()在click事件处理函数内执行，这是浏览器允许的，
// 而button2的click事件并未立刻执行popupTestWindow()，延迟执行的popupTestWindow()将被浏览器拦截。