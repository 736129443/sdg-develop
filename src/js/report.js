export function openPostWindow(url, page) {
    var newWin = window.open('toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no'),
        formStr = '';
    //设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
    formStr = '<form style="visibility:hidden;" method="POST" accept-charset="UTF-8" onsubmit="document.charset=\'UTF-8\';" action="' + url + '">' +
        '<input type="text" name="param" value=' + page + ' :about="" />' +
        '</form>';
    console.log(formStr);
    newWin.document.body.innerHTML = formStr;
    newWin.document.forms[0].submit();
    return newWin;
}