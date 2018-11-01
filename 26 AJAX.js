/// 1.Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求
// 通过XMLHttpRequest发起异步请求

function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');



// 低版本的IE：使用ActiveXObject对象

function success(text) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = text;
}

function fail(code) {
    var textarea = document.getElementById('test-ie-response-text');
    textarea.value = 'Error code: ' + code;
}

var request = new ActiveXObject('Microsoft.XMLHTTP'); // 新建Microsoft.XMLHTTP对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return success(request.responseText);
        } else {
            // 失败，根据响应码判断失败原因:
            return fail(request.status);
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();

alert('请求已发送，请等待响应...');



// 合并：通过检测window对象是否有XMLHttpRequest属性来确定浏览器是否支持标准的XMLHttpRequest
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}




/// 2.XMLHttpRequest 发起请求的过程

// XMLHttpRequest对象的open()方法有3个参数，第一个参数指定是GET还是POST，第二个参数指定URL地址，第三个参数指定是否使用异步，默认是true，所以不用写。
// **注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。

// 最后调用send()方法才真正发送请求。GET请求不需要参数，POST请求需要把"body部分"以字符串或者FormData对象传进去（作为send的参数）。
// 返回数据：request.responseText / responseXML




/// 3.安全限制(跨域问题)
// 上面代码的URL使用的是相对路径。如果你把它改为'http://www.sina.com.cn/'，再运行，肯定报错。在Chrome的控制台里，还可以看到错误信息。
// 这是因为浏览器的同源策略导致的。默认情况下，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致。
// 【完全一致】：域名要相同（www.example.com和example.com不同），协议要相同（http和https不同），端口号要相同（默认是:80端口，它和:8080就不同）。
//             有的浏览器口子松一点，允许端口不同，大多数浏览器都会严格遵守这个限制。


// 常规跨域方法：
// - flash插件发起http请求
// - 架设代理服务（需要服务器端额外做开发），转发：'/proxy?url=http://www.sina.com.cn'
// - JSONP: 只能用GET请求，并且要求返回JavaScript。这种方式跨域实际上是利用了浏览器允许跨域引用JavaScript资源，加载外域名的js脚本
//          在请求js脚本时，实际是一个get请求，返回js脚本，然后执行js脚本

// 添加script脚本
function getPrice() {
    var
        js = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    js.src = 'http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice';
    head.appendChild(js);
}

// 返回：refreshPrice({"0000001":{"code": "0000001", ... });
// 在页面中准备好 返回的 函数，处理并展示数据
function refreshPrice(data) {
    var p = document.getElementById('test-jsonp');
    p.innerHTML = '当前价格：' +
        data['0000001'].name +': ' + 
        data['0000001'].price + '；' +
        data['1399001'].name + ': ' +
        data['1399001'].price;
}




/// 4.HTML5跨域CORS（Cross-Origin Resource Sharing）
// Origin表示本域，也就是浏览器当前页面的域。
// 当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，
//                                         如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

// ** 依赖外域服务 响应头Access-Control-Allow-Origin, 取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-Origin，决定权始终在对方手中。

// 假设本域是my.com，外域是sina.com，只要响应头Access-Control-Allow-Origin为http://my.com，或者是*，本次请求就可以成功。

// “简单跨域请求”: 简单请求包括GET、HEAD和POST（POST的Content-Type类型仅限application/x-www-form-urlencoded、multipart/form-data和text/plain），
//                并且不能出现任何自定义头（例如，X-Custom: 12345），通常能满足90%的需求。

// 除了js和css，加载的外网 【字体】，也要验证CORS，如果服务商未正确设置Access-Control-Allow-Origin，那么浏览器无法加载字体资源。


// 对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，浏览器会先发送一个"OPTIONS"请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受这些响应方式(PUT DELETE)
// 浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。

/*
发送OPTIONS：
OPTIONS /path/to/resource HTTP/1.1
Host: bar.com
Origin: http://my.com
Access-Control-Request-Method: POST

响应OPTIONS：
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS           // 支持的请求方法
Access-Control-Max-Age: 86400

*/






