/// 1.表单分类
// HTML表单的输入控件主要有以下几种：

// - 文本框，对应的<input type="text">，用于输入文本；
// - 口令框，对应的<input type="password">，用于输入口令；
// - 单选框，对应的<input type="radio">，用于选择一项；
// - 复选框，对应的<input type="checkbox">，用于选择多项；
// - 下拉框，对应的<select>，用于选择一项；
// - 隐藏文本，对应的<input type="hidden">，用户不可见，但表单提交时会把隐藏文本发送到服务器。

/// 2.获取值
// 通过value获取用户输入

// <input type="text" id="email">
var input = document.getElementById('email');
input.value; // '用户输入的值'


// 这种方式可以应用于text、password、hidden以及select。
// ** 但是，对于"单选框和复选框"，【value属性返回的永远是HTML预设的值】，而我们需要获得的实际是用户是否“勾上了”选项，所以应该用checked判断：

// <label><input type="radio" name="weekday" id="monday" value="1"> Monday</label>
// <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>
var mon = document.getElementById('monday');
var tue = document.getElementById('tuesday');
mon.value; // '1'，被预设
tue.value; // '2'，被预设
mon.checked; // true或者false
tue.checked; // true或者false

/// 3.设置值
// 设置值和获取值类似，对于text、password、hidden以及select，直接设置value就可以：

// <input type="text" id="email">
var input = document.getElementById('email');
input.value = 'test@example.com'; // 文本框的内容已更新
// 对于"单选框和复选框"，设置checked为true或false即可。


/// 5.HTML5控件
// HTML5新增了大量标准控件，常用的包括date、datetime、datetime-local、color等，它们都使用<input>标签：

// 2014/07/01: 点击选择日历
// <input type="date" value="2015-07-01">

// 2015/07/01 上午02:03:04: 点击选择日历
// <input type="datetime-local" value="2015-07-01T02:03:04">

// 点击选择颜色
// <input type="color" value="#ff0000">

 // 不支持HTML5的浏览器无法识别新的控件，会把它们当做type="text"来显示。支持HTML5的浏览器将获得格式化的字符串。例如，type="date"类型的input的value将保证是一个有效的YYYY-MM-DD格式的日期，或者空字符串。



 /// 6.提交表单
 // 方法1：通过<form>元素的submit()提交，响应点击事件
 /*
 <!-- HTML -->
 <form id="test-form">
     <input type="text" name="test">
     <button type="button" onclick="doSubmitForm()">Submit</button>
 </form>
 <script>***</script>

*/

function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}

// 方法2：响应<form>本身的onsubmit事件，提交form是做修改, onsubmit="return checkForm()"
// 浏览器默认点击<button type="submit">时提交表单，或者用户在最后一个输入框按回车键
/*
<!-- HTML -->
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>

<script>

</script>
*/

function checkForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 继续下一步: return true来告诉浏览器继续提交，否则不提交
    return true;
}

// 常规密码的表单提交（密码+md5提交）
/*
<!-- HTML -->
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="input-password">
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>

<script>

</script>
*/
function checkForm() {
    var input_pwd = document.getElementById('input-password');
    var md5_pwd = document.getElementById('md5-password');
    // 把用户输入的明文变为MD5:
    md5_pwd.value = toMD5(input_pwd.value);
    // 继续下一步:
    return true;
}

// 取出密码框input，改md5，赋值到md5的input；
// md5的input是隐藏的，因为直接修改password的inoput的value，密码的*会变成32个*
// 注意到id为md5-password的<input>标记了name="password"，而用户输入的id为input-password的<input>没有name属性。没有name属性的<input>的数据不会被提交。
