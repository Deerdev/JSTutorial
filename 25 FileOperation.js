/// 1.表单上传文件
// 在HTML表单中，可以上传文件的唯一控件就是<input type="file">。
// 注意：当一个表单包含<input type="file">时，表单的enctype必须指定为multipart/form-data，method必须指定为post，浏览器才能正确编码并以multipart/form-data格式发送表单的数据。
// 出于安全考虑，浏览器只允许用户点击<input type="file">来选择本地文件，用JavaScript对<input type="file">的value赋值是没有任何效果的。
// 当用户选择了上传某个文件后，JavaScript也"无法获得该文件的真实路径："

/*
<form method="post" action="http://localhost/test" enctype="multipart/form-data">
    <p>
        <input type="file" id="test-file-upload" name="test">
    </p>
    <p>待上传文件: <span id="test-get-filename" style="color:red"></span></p>
</form>
*/

// 检查上传文件后缀
var f = document.getElementById('test-file-upload');
var filename = f.value; // 'C:\fakepath\test.png'
if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
    alert('Can only upload image file.');
    return false;
}




/// 2.HTML5 File API
// HTML5的File API提供了File和FileReader两个主要对象，可以获得文件信息并读取文件

// 图片预览
/*
<form method="post" action="http://localhost/test" enctype="multipart/form-data">
    <p>图片预览：</p>
    <p><div id="test-image-preview" style="border: 1px solid #ccc; width: 100%; height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center center;"></div></p>
    <p>
        <input type="file" id="test-image-file" name="test">
    </p>
    <p id="test-file-info"></p>
</form>
*/

var
    fileInput = document.getElementById('test-image-file'),
    info = document.getElementById('test-file-info'),
    preview = document.getElementById('test-image-preview');
// 监听change事件:
fileInput.addEventListener('change', function () {
    // 清除背景图片:
    preview.style.backgroundImage = '';
    // 检查文件是否选择:
    if (!fileInput.value) {
        info.innerHTML = '没有选择文件';
        return;
    }
    // 获取File引用:
    var file = fileInput.files[0];
    // 获取File信息:
    info.innerHTML = '文件: ' + file.name + '<br>' +
                     '大小: ' + file.size + '<br>' +
                     '修改: ' + file.lastModifiedDate;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
    }
    // 读取文件:
    var reader = new FileReader();

    // ** 异步回调
    reader.onload = function(e) {
        var
            data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'            
        preview.style.backgroundImage = 'url(' + data + ')';
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
});
// 以DataURL的形式读取到的文件是一个字符串，类似于data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...，常用于设置图像。
// 如果需要服务器端处理，把字符串base64,后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。


