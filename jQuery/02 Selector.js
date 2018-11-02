/// 1.选择器
// 一个选择器写出来类似$('#dom-id')。


/// 2.按ID查找

// 查找<div id="abc">:
var div = $('#abc');
// 注意，#abc以#开头。返回的对象是 "jQuery对象"。
// jQuery对象类似数组: 它的每个元素都是一个引用了DOM节点的对象。

// 以上面的查找为例，如果id为abc的<div>存在，返回的jQuery对象如下：
[<div id="abc">...</div>]

// 如果id为abc的<div>不存在，返回的jQuery对象：(空数组) []

// 总之jQuery的选择器不会返回undefined或者null，这样的好处是你不必在下一行判断if (div === undefined)。

// jQuery对象和DOM对象之间可以互相转化：

var div = $('#abc'); // jQuery对象
var divDom = div.get(0); // 假设存在div，获取第1个DOM元素
var another = $(divDom); // 重新把DOM包装为jQuery对象


/// 3.按Tag查找
var ps = $('p'); // 返回所有<p>节点
ps.length; // 数一数页面有多少个<p>节点


/// 4.按class查找
var a = $('.red'); // 所有节点包含`class="red"`都将返回
// 例如:
// <div class="red">...</div>
// <p class="green red">...</p>


// 查找同时包含red和green的节点：
var a = $('.red.green'); // 注意没有空格！
// 符合条件的节点：
// <div class="red green">...</div>
// <div class="blue green red">...</div>



/// 5.按属性查找
// 在一个表单中按属性来查找：
var email = $('[name=email]'); // 找出<??? name="email">
var passwordInput = $('[type=password]'); // 找出<??? type="password">
var a = $('[items="A B"]'); // 找出<??? items="A B">     // 当属性的值包含空格等特殊字符时，需要用双引号括起来

// 使用前缀查找或者后缀查找：
var icons = $('[name^=icon]'); // 找出所有name属性值以icon开头的DOM
// 例如: name="icon-1", name="icon-2"
var names = $('[name$=with]'); // 找出所有name属性值以with结尾的DOM
// 例如: name="startswith", name="endswith"

// 这个方法尤其适合通过class属性查找，且不受class包含多个名称的影响：
var icons = $('[class^="icon-"]'); // 找出所有class包含至少一个以`icon-`开头的DOM
// 例如: class="icon-clock", class="abc icon-home"



/// 6.组合查找
// 组合查找就是把上述简单选择器组合起来使用。如果我们查找$('[name=email]')，很可能把表单外的<div name="email">也找出来，但我们只希望查找<input>，就可以这么写：
var emailInput = $('input[name=email]'); // 不会找出<div name="email">

// 同样的，根据tag和class来组合查找也很常见：
var tr = $('tr.red'); // 找出<tr class="red ...">...</tr>



/// 7.多项选择器
// 多项选择器就是把多个选择器用,组合起来一块选：
$('p,div'); // 把<p>和<div>都选出来
$('p.red,p.green'); // 把<p class="red">和<p class="green">都选出来

// 要注意的是，选出来的元素是按照它们在HTML中出现的顺序排列的，而且不会有重复元素。例如，<p class="red green">不会被上面的$('p.red,p.green')选择两次。



/// 8.层级选择器（Descendant Selector）
// 如果两个DOM元素具有层级关系，就可以用$('ancestor descendant')来选择，层级之间用空格隔开。例如：

<div class="testing">
    <ul class="lang">
        <li class="lang-javascript">JavaScript</li>
        <li class="lang-python">Python</li>
        <li class="lang-lua">Lua</li>
    </ul>
</div>

$('ul.lang li.lang-javascript'); // [<li class="lang-javascript">JavaScript</li>]
$('div.testing li.lang-javascript'); // [<li class="lang-javascript">JavaScript</li>]

// 因为<div>和<ul>都是<li>的祖先节点，所以上面两种方式都可以选出相应的<li>节点。
// 要选择所有的<li>节点，用：
$('ul.lang li');

// 这种层级选择器相比单个的选择器好处在于，它缩小了选择范围，因为首先要定位父节点，才能选择相应的子节点，这样避免了页面其他不相关的元素。
// 例如：
$('form[name=upload] input');
// 就把选择范围限定在name属性为upload的表单里。如果页面有很多表单，其他表单的<input>不会被选择。

// 多层选择也是允许的：
$('form.test p input'); // 在form表单选择被<p>包含的<input>




/// 8.子选择器（Child Selector）
// 选择器  $('parent>child')  类似层级选择器，但是限定了层级关系必须是父子关系，就是<child>节点必须是<parent>节点的直属子节点。还是以上面的例子：

$('ul.lang>li.lang-javascript');      // 可以选出[<li class="lang-javascript">JavaScript</li>]
$('div.testing>li.lang-javascript');  // [], 无法选出，因为<div>和<li>不构成父子关系



/// 9.过滤器（Filter）
// 过滤器一般不单独使用，它通常附加在选择器上，帮助我们更精确地定位元素。观察过滤器的效果：

$('ul.lang li'); // 选出JavaScript、Python和Lua 3个节点

$('ul.lang li:first-child'); // 仅选出JavaScript
$('ul.lang li:last-child'); // 仅选出Lua
$('ul.lang li:nth-child(2)'); // 选出第N个元素，N从1开始
$('ul.lang li:nth-child(even)'); // 选出序号为偶数的元素
$('ul.lang li:nth-child(odd)'); // 选出序号为奇数的元素



/// 10.表单相关
// 针对表单元素，jQuery还有一组特殊的选择器：

// - :input：可以选择<input>，<textarea>，<select>和<button>；
// - :file：可以选择<input type="file">，和input[type=file]一样；
// - :checkbox：可以选择复选框，和input[type=checkbox]一样；
// - :radio：可以选择单选框，和input[type=radio]一样；
// - :focus：可以选择当前输入焦点的元素，例如把光标放到一个<input>上，用$('input:focus')就可以选出；
// - :checked：选择当前勾上的单选框和复选框，用这个选择器可以立刻获得用户选择的项目，如$('input[type=radio]:checked')；
// - :enabled：可以选择可以正常输入的<input>、<select> 等，也就是没有灰掉的输入；
// - :disabled：和:enabled正好相反，选择那些不能输入的。

// 此外，jQuery还有很多有用的选择器，例如，选出可见的或隐藏的元素：

$('div:visible'); // 所有可见的div
$('div:hidden'); // 所有隐藏的div




/// 11.查找
// 对查找的jQuery对象继续 操作
<ul class="lang">
    <li class="js dy">JavaScript</li>
    <li class="dy">Python</li>
    <li id="swift">Swift</li>
    <li class="dy">Scheme</li>
    <li name="haskell">Haskell</li>
</ul>

// 用find()查找：
var ul = $('ul.lang'); // 获得<ul>
var dy = ul.find('.dy'); // 获得JavaScript, Python, Scheme
var swf = ul.find('#swift'); // 获得Swift
var hsk = ul.find('[name=haskell]'); // 获得Haskell

// 如果要从当前节点开始向上查找，使用parent()方法：
var swf = $('#swift'); // 获得Swift
var parent = swf.parent(); // 获得Swift的上层节点<ul>
var a = swf.parent('.red'); // 获得Swift的上层节点<ul>，同时传入过滤条件。如果ul不符合条件，返回空jQuery对象

// 对于位于同一层级的节点，可以通过next()和prev()方法，例如：
var swift = $('#swift');

swift.next(); // Scheme
swift.next('[name=haskell]'); // 空的jQuery对象，因为Swift的下一个元素Scheme不符合条件[name=haskell]

swift.prev(); // Python
swift.prev('.dy'); // Python，因为Python同时符合过滤器条件.dy



/// 12.过滤
// filter()方法可以过滤掉不符合选择器条件的节点，取出符合条件的节点：
var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
var a = langs.filter('.dy'); // 拿到JavaScript, Python, Scheme

// 或者传入一个函数，要特别注意函数内部的this被绑定为DOM对象，不是jQuery对象：
var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
langs.filter(function () {
    return this.innerHTML.indexOf('S') === 0; // 返回S开头的节点
}); // 拿到Swift, Scheme


// map()方法把一个jQuery对象包含的若干DOM节点转化为其他对象：
var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
var arr = langs.map(function () {
    return this.innerHTML;
}).get(); // 用get()拿到包含string的Array：['JavaScript', 'Python', 'Swift', 'Scheme', 'Haskell']


// 此外，一个jQuery对象如果包含了不止一个DOM节点，first()、last()和slice()方法可以返回一个新的jQuery对象，把不需要的DOM节点去掉：
var langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell
var js = langs.first(); // JavaScript，相当于$('ul.lang li:first-child')
var haskell = langs.last(); // Haskell, 相当于$('ul.lang li:last-child')
var sub = langs.slice(2, 4); // Swift, Scheme, 参数和数组的slice()方法一致



// 获取表单数据 转成JSON
/*
<form id="test-form" action="#0" onsubmit="return false;">
    <p><label>Name: <input name="name"></label></p>
    <p><label>Email: <input name="email"></label></p>
    <p><label>Password: <input name="password" type="password"></label></p>
    <p>Gender: <label><input name="gender" type="radio" value="m" checked> Male</label> <label><input name="gender" type="radio" value="f"> Female</label></p>
    <p><label>City: <select name="city">
        <option value="BJ" selected>Beijing</option>
        <option value="SH">Shanghai</option>
        <option value="CD">Chengdu</option>
        <option value="XM">Xiamen</option>
    </select></label></p>
    <p><button type="submit">Submit</button></p>
</form>
*/

var json = null;
var obj={};
//获取所有表单输入元素
var input = $('#test-form :input');
//过滤没有选中的单选框和按钮
input = input.filter(function () {
    if((this.type === "radio" && !this.checked) || this.tagName === 'BUTTON'){
       return false;
    }
    return true;
})
//遍历将name作为对象的key，value作为value;
input.map(function () {
    obj[this.name] = this.value;
});
// 转换成json
json = JSON.stringify(obj); // {"name":"666","email":"888","password":"kkkkkk","gender":"m","city":"BJ"}

