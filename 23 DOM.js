/// 1.DOM简介
// 始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作：
// - 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；
// - 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；
// - 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；
// - 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

// 在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。
// - document.getElementById()
// - document.getElementsByTagName()
// - CSS选择器document.getElementsByClassName()

// 由于ID在HTML文档中是唯一的，所以document.getElementById()可以直接定位唯一的一个DOM节点。
// document.getElementsByTagName()和document.getElementsByClassName()总是返回一组DOM节点。要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

// 返回ID为'test'的节点：
var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:
var cs = test.children;

// 获取节点test下第一个、最后一个子节点：
var first = test.firstElementChild;
var last = test.lastElementChild;



// 第二种方法是使用querySelector()和querySelectorAll()，需要了解selector语法，然后使用条件来获取节点，更加方便：

// 通过querySelector获取ID为q1的节点：
var q1 = document.querySelector('#q1');
// 通过querySelectorAll获取q1节点内的符合条件的所有节点：
var ps = q1.querySelectorAll('div.highlighted > p');

// ** 注意：低版本的IE<8不支持querySelector和querySelectorAll。IE8仅有限支持。

// ** 严格地讲，我们这里的DOM节点是指Element，但是DOM节点实际上是Node，在HTML中，Node包括Element、Comment、CDATA_SECTION等很多种，以及根节点Document类型，
// ** 但是，绝大多数时候我们只关心Element，也就是实际控制页面结构的Node，其他类型的Node忽略即可。根节点Document已经自动绑定为全局变量document。



/// 2.更新DOM
// 可以直接修改DOM节点的文本，方法有两种：

// $ 一种是修改innerHTML属性，这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：

// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p-id">ABC</p>
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p>的内部结构已修改
// ** 用innerHTML时要注意，是否需要写入HTML。如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击。


// $ 第二种是修改innerText或textContent属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签：

// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>

// ** 两者的区别在于读取属性时，innerText不返回隐藏元素的文本，而textContent返回所有文本。另外注意IE<9不支持textContent。

// 修改CSS也是经常需要的操作。DOM节点的style属性对应所有的CSS，可以直接获取或设置。因为CSS允许font-size这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名fontSize：
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';


// 获取<p>javascript</p>节点:
var js = document.getElementById("test-js");
// 修改文本为JavaScript:
 js.innerHTML='JavaScript'

// 直接修改CSS的style: color: #ff0000, font-weight: bold
js.style = "color: #ff0000 ;font-weight: bold "


// ** innerHTML就是该节点后面的全部代码（包括标签）；innerText指该节点后面的全部文本内容（忽略标签）
var text = document.getElementById("test-div")
text.innerHTML
//   <p id="test-js">javascript</p>
//   <p>Java</p>
text.innerText
// javascript
// Java


/// 3.插入DOM
// 直接修改innerHTML：innerHTML = '<span>child</span>'，但是这是替换

/* HTML
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
*/
var
js = document.getElementById('js'),
list = document.getElementById('list');
list.appendChild(js);   // js节点首先会从原先的位置删除，再插入到新的位置
/* HTML
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="js">JavaScript</p>
</div>
*/

// 创建新节点 "createElement()"
var
    list = document.getElementById('list'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);

// 动态添加新节点，例如css <style>
var d = document.createElement('style');
d.setAttribute('type', 'text/css');
d.innerHTML = 'p { color: red }';
document.getElementsByTagName('head')[0].appendChild(d);    // 在head末尾添加


// $ 插入到制定位置
// 可以使用parentElement.insertBefore(newElement, referenceElement);，子节点会插入到referenceElement之前。

// 在父节点list中插入 haskell，在 python 前面
var
    list = document.getElementById('list'),
    ref = document.getElementById('python'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.insertBefore(haskell, ref);

// 拿到指定的子节点，遍历父节点的子节点
var
    i, c,
    list = document.getElementById('list');
for (i = 0; i < list.children.length; i++) {
    c = list.children[i]; // 拿到第i个子节点
}



/// 4.删除DOM：removeChild()

// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
removed === self; // true

/*
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>
*/
var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]); // <-- 浏览器报错: 因为[0]被删了，数组已经从2->1

