/// 浏览器对象

/// 1.window
// window对象不但充当全局作用域，而且表示浏览器窗口。
// outerWidth和outerHeight属性，可以获取浏览器窗口的整个宽高
// window对象有innerWidth和innerHeight属性，可以获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。
// ** 兼容性：IE<=8不支持。
console.log('window inner size: ' + window.innerWidth + ' x ' + window.innerHeight);


/************************************************************************************************/


/// 2.navigator
// navigator对象表示浏览器的信息，最常用的属性包括：
// - navigator.appName：浏览器名称；
// - navigator.appVersion：浏览器版本；
// - navigator.language：浏览器设置的语言；
// - navigator.platform：操作系统类型；
// - navigator.userAgent：浏览器设定的User-Agent字符串。


console.log('appName = ' + navigator.appName);
console.log('appVersion = ' + navigator.appVersion);
console.log('language = ' + navigator.language);
console.log('platform = ' + navigator.platform);
console.log('userAgent = ' + navigator.userAgent);
// appName = Netscape
// appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
// language = zh-CN
// platform = MacIntel
// userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36


// ** 请注意，navigator的信息可以很容易地被用户修改，所以JavaScript读取的值不一定是正确的。很多初学者为了针对不同浏览器编写不同的代码，喜欢用if判断浏览器版本，例如：

var width;
if (getIEVersion(navigator.userAgent) < 9) {
    width = document.body.clientWidth;
} else {
    width = window.innerWidth;
}
// 但这样既可能判断不准确，也很难维护代码。正确的方法是充分利用JavaScript对不存在属性返回undefined的特性，直接用短路运算符||计算：

var width = window.innerWidth || document.body.clientWidth;


/************************************************************************************************/


/// 3.screen
// screen对象表示屏幕的信息，常用的属性有：
// - screen.width：屏幕宽度，以像素为单位；
// - screen.height：屏幕高度，以像素为单位；
// - screen.colorDepth：返回颜色位数，如8、16、24。
console.log('Screen size = ' + screen.width + ' x ' + screen.height); // Screen size = 1920 x 1080


/************************************************************************************************/


/// 4. location
// location对象表示当前页面的URL信息。例如，一个完整的URL：
/*
http://www.example.com:8080/path/index.html?a=1&b=2#TOP
*/

// 可以用location.href获取。要获得URL各个部分的值，可以这么写：
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'
// 要加载一个新页面，可以调用location.assign()。如果要重新加载当前页面，调用location.reload()方法非常方便。

if (confirm('重新加载当前页' + location.href + '?')) {
    location.reload();
} else {
    location.assign('/'); // 设置一个新的URL地址，跳转到改url
}


/************************************************************************************************/


/// 5.document
// document对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，document对象就是整个DOM树的【根节点】。

// document的title属性是从HTML文档中的<title>xxx</title>读取的，但是可以动态改变：
document.title = '努力学习JavaScript!';

<dl id="drink-menu" style="border:solid 1px #ccc;padding:6px;">
    <dt>摩卡</dt>
    <dd>热摩卡咖啡</dd>
    <dt>酸奶</dt>
    <dd>北京老酸奶</dd>
    <dt>果汁</dt>
    <dd>鲜榨苹果汁</dd>
</dl>

// getElementById()和getElementsByTagName()可以按ID获得一个DOM节点和按Tag名称获得一组DOM节点：
var i, s, menu, drinks;

menu = document.getElementById('drink-menu');
menu.tagName; // 'DL'

drinks = document.getElementsByTagName('dt');
s = '提供的饮料有:';
for (i=0; i<drinks.length; i++) {
    s = s + drinks[i].innerHTML + ',';
}
console.log(s); // 提供的饮料有:摩卡,酸奶,果汁,


// avaScript可以通过document.cookie读取到当前页面的Cookie：
document.cookie; // 'v=123; remember=true; prefer=zh'
// ** 由于JavaScript能读取到页面的Cookie，而用户的登录信息通常也存在Cookie中，这就造成了巨大的安全隐患，这是因为在HTML页面中引入第三方的JavaScript代码是允许的
// ** 为了解决这个问题，服务器在设置Cookie时可以使用"httpOnly"，** 设定了httpOnly的Cookie将不能被JavaScript读取 ** 。这个行为由浏览器实现，主流浏览器均支持httpOnly选项，IE从IE6 SP1开始支持。
// ** 为了确保安全，服务器端在设置Cookie时，应该始终坚持使用httpOnly。


/************************************************************************************************/


/// 6.history
// history对象保存了浏览器的历史记录，JavaScript可以调用 history 对象的 back() 或 forward() ，相当于用户点击了浏览器的“后退”或“前进”按钮。
// 这个对象属于历史遗留对象，对于现代Web页面来说，由于大量使用AJAX和页面交互，简单粗暴地调用history.back()可能会让用户感到非常愤怒。
// 新手开始设计Web页面时喜欢在登录页登录成功时调用history.back()，试图回到登录前的页面。这是一种错误的方法。
// ** 任何情况，你都不应该使用history这个对象了。





