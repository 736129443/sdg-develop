/*
* 上传的公用方法
* 上传
*succeedfileList  上传成功后后台返回的成功后的name 和 rul （name 是字符串 +‘ ~ ’+name）
*ServerData  把succeedfileList的name切割后生成2维数组 [0]后台生成的字符串 [1]文件name
*picListContract 将文件的 fileList 的值 通过变量的形式 传递 （列表内已有的所有文件）
*fileLists 文件上传成功后显示在列表的文件后绿色成功打钩
* */
export function upload (_this,picListContract,succeedfileList,ServerData,fileLists){
    if (_this.picListContract.length == 0) {
        console.log(123);

        return
    }
    let formdata = new FormData();

    for (let i = 0; i < _this.picListContract.length; i++) {
        formdata.append('file', _this.picListContract[i].raw);
    }
    formdata.append('filePath', "invoice_relation");

    _this.$http.post(_this.global.lightningUrl + '/companyv1/companyCenter/file/upload', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
        }
    }).then((res) => {
        console.log(res);
        if (res.body.errcode == 0) {
            _this.succeedfileList = res.body.result;
            for (var i in _this.succeedfileList) {
                var arr = _this.succeedfileList[i].name.split('~');
                ServerData.push(arr);
                fileLists.push({'name': arr[1], 'url': _this.succeedfileList[i].url})
            }
            _this.$message({
                showClose: true,
                message: res.body.message,
                type: 'success'
            });
            _this.picListContract = [];
        }
    })
}
export function upload1 (_this,picListContract,succeedfileList,ServerData,fileLists){
    if (_this.picListContract1.length == 0) {
        console.log(123);

        return
    }
    let formdata = new FormData();

    for (let i = 0; i < _this.picListContract1.length; i++) {
        formdata.append('file', _this.picListContract1[i].raw);
    }
    formdata.append('filePath', "invoice_relation");

    _this.$http.post(_this.global.lightningUrl + '/companyv1/companyCenter/file/upload', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
        }
    }).then((res) => {
        console.log(res);
        if (res.body.errcode == 0) {
            _this.succeedfileList1 = res.body.result;
            for (var i in _this.succeedfileList1) {
                var arr = _this.succeedfileList1[i].name.split('~');
                ServerData.push(arr);
                fileLists.push({'name': arr[1], 'url': _this.succeedfileList1[i].url})
            }
            _this.$message({
                showClose: true,
                message: res.body.message,
                type: 'success'
            });
            _this.picListContract1 = [];
        }
    })
}

/*
* 限制文件上传的个数
* num 需要限制的个数
* */
export function exceedlimit(_this,num){
    _this.$message({
       message: '对不起，最大上传'+ num +'个文件',
        type: 'error'
    });
}
/*
*删除文件
*
* */
export function handleRemove(file, fileList,_this,picListContract,ServerData,fileLists) {
    picListContract = fileList;
    var str = '';
    for (var i in _this.ServerData) {
        if (file.name == _this.ServerData[i][1]) {
            console.log("文件已经上传过");
            str = _this.ServerData[i][0] + '~' + file.name;
            _this.$http.post(_this.global.lightningUrl + '/companyv1/companyCenter/file/reset', JSON.stringify({
                "filePath": "invoice_relation",
                "name": str
            })).then((res) => {
                console.log(res);
                if (res.body.errcode == 0) {
                    _this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    _this.ServerData.splice(i, 1);
                    fileLists.splice(i, 1);
                    picListContract.splice(i, 1);
                } else {
                    _this.$message.error('删除失败！');
                }
            });
            return;
        }
    }
}
/*
* 查看文件
* */
export function handlePreview(file,_this,succeedfileList,ServerData) {
    console.log(file);
    if (_this.succeedfileList.length == 0) {
        var fileName = file.name.substring(file.name.lastIndexOf("."));
        if ((fileName != '.jpg') && (fileName != '.png')) {
            window.location.href = file.url;
        } else {
            let url = file.url;
            window.open(url, '_blank')
        }
    } else {
        let fileUrl = '';
        for (var j in _this.succeedfileList) {
            _this.ServerData.push(_this.succeedfileList[j].name.split('~'));
            if (file.name == _this.ServerData[j][1]) {
                fileUrl = _this.succeedfileList[j].url;
                console.log(fileUrl);
            }
        }
        var fileName = file.name.substring(file.name.lastIndexOf("."));
        if ((fileName != '.jpg') && (fileName != '.png')) {
            window.location.href = fileUrl;
        } else {
            window.open(fileUrl, '_blank');
        }
    }
}
export function handlePreview1(file,_this,succeedfileList,ServerData) {
    console.log(file);
    if (_this.succeedfileList1.length == 0) {
        var fileName = file.name.substring(file.name.lastIndexOf("."));
        if ((fileName != '.jpg') && (fileName != '.png')) {
            window.location.href = file.url;
        } else {
            let url = file.url;
            window.open(url, '_blank')
        }
    } else {
        let fileUrl = '';
        for (var j in _this.succeedfileList1) {
            _this.ServerData1.push(_this.succeedfileList1[j].name.split('~'));
            if (file.name == _this.ServerData1[j][1]) {
                fileUrl = _this.succeedfileList1[j].url;
                console.log(fileUrl);
            }
        }
        var fileName = file.name.substring(file.name.lastIndexOf("."));
        if ((fileName != '.jpg') && (fileName != '.png')) {
            window.location.href = fileUrl;
        } else {
            window.open(fileUrl, '_blank');
        }
    }
}
/*
* 限制文件格式
* */
export function Contracts(file, fileList,_this,picListContract) {
    console.log(file.name, fileList);
    var result = [];
    var obj = {};
    for(var i =0; i<fileList.length; i++) {
        if (!obj[fileList[i].name]) {
            result.push(fileList[i]);
            obj[fileList[i].name] = true;
        }
    }
    console.log(result);
    _this.picListContract = [];
    _this.picListContract = fileList;
    if (_this.picListContract.length == 0) {
        return
    }
    // for (var i in this.picListContract) {
    //     for (var j in  this.ServerData) {
    //         if (this.picListContract[i].name == this.ServerData[j][1]) {
    //             this.ServerData.splice(i, 1);
    //             this.picListContract.splice(i, 1);
    //             fileList.splice(i, 1);
    //             this.fileLists.splice(i, 1);
    //             console.log(this.picListContract);
    //             this.$message({
    //                 showClose: true,
    //                 message: '警告文件上传有重复文件，请删除后重新上传！',
    //                 type: 'warning'
    //             });
    //             return
    //         }
    //     }
    // }
    // console.log(this.picListContract.name);
    // console.log(this.ServerData);

    for (var i in _this.picListContract) {
        var fileName = _this.picListContract[i].name.substring(_this.picListContract[i].name.lastIndexOf("."));
        if (_this.picListContract[i].name.includes('~')) {
            _this.picListContract.splice(i, 1);
            fileList.splice(i, 1);
            _this.$message({
                showClose: true,
                message: '对不起文件名不能带特殊字符！',
                type: 'error'
            });
            return false
        } else {
            if ((fileName != '.jpg') && (fileName != '.png') && (fileName != '.zip') && (fileName != '.docx') &&
                (fileName != '.xlsx') && (fileName != '.pdf') && (fileName != '.rar')) {
                _this.picListContract.splice(i, 1);
                fileList.splice(i, 1);
                _this.$message({
                    showClose: true,
                    message: '对不起，系统不支持该格式的文件。',
                    type: 'error'
                });
                return false
            }
            var size = 0;
            var num = 10;
            size = _this.picListContract[i].size;//byte
            size = size / 1024;//kb
            size = (size / 1024).toFixed(1);//mb
            if (size > num) {
                _this.picListContract.splice(i, 1);
                fileList.splice(i, 1);
                _this.$message({
                    showClose: true,
                    message: '对不起，您上传的文件大小为' + size + '文件大小超出10M。上传失败！',
                    type: 'error'
                });
                return false
            }
        }
    }
}
export function Contracts1(file, fileList,_this,picListContract) {
    console.log(file.name, fileList);
    var result = [];
    var obj = {};
    for(var i =0; i<fileList.length; i++) {
        if (!obj[fileList[i].name]) {
            result.push(fileList[i]);
            obj[fileList[i].name] = true;
        }
    }
    console.log(result);
    _this.picListContract1 = [];
    _this.picListContract1 = fileList;
    if (_this.picListContract1.length == 0) {
        return
    }
    // for (var i in this.picListContract) {
    //     for (var j in  this.ServerData) {
    //         if (this.picListContract[i].name == this.ServerData[j][1]) {
    //             this.ServerData.splice(i, 1);
    //             this.picListContract.splice(i, 1);
    //             fileList.splice(i, 1);
    //             this.fileLists.splice(i, 1);
    //             console.log(this.picListContract);
    //             this.$message({
    //                 showClose: true,
    //                 message: '警告文件上传有重复文件，请删除后重新上传！',
    //                 type: 'warning'
    //             });
    //             return
    //         }
    //     }
    // }
    // console.log(this.picListContract.name);
    // console.log(this.ServerData);

    for (var i in _this.picListContract1) {
        var fileName = _this.picListContract1[i].name.substring(_this.picListContract1[i].name.lastIndexOf("."));
        if (_this.picListContract1[i].name.includes('~')) {
            _this.picListContract1.splice(i, 1);
            fileList.splice(i, 1);
            _this.$message({
                showClose: true,
                message: '对不起文件名不能带特殊字符！',
                type: 'error'
            });
            return false
        } else {
            if ((fileName != '.jpg') && (fileName != '.png') && (fileName != '.zip') && (fileName != '.docx') &&
                (fileName != '.xlsx') && (fileName != '.pdf') && (fileName != '.rar')) {
                _this.picListContract1.splice(i, 1);
                fileList.splice(i, 1);
                _this.$message({
                    showClose: true,
                    message: '对不起，系统不支持该格式的文件。',
                    type: 'error'
                });
                return false
            }
            var size = 0;
            var num = 10;
            size = _this.picListContract1[i].size;//byte
            size = size / 1024;//kb
            size = (size / 1024).toFixed(1);//mb
            if (size > num) {
                _this.picListContract1.splice(i, 1);
                fileList.splice(i, 1);
                _this.$message({
                    showClose: true,
                    message: '对不起，您上传的文件大小为' + size + '文件大小超出10M。上传失败！',
                    type: 'error'
                });
                return false
            }
        }
    }
}
