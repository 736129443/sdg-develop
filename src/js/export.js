/*
* 导出的公用方法
* code 二次调用后台传的id
* ProgressBar 进度条百分比
* fullscreenLoading 导出遮罩层
* queryStatus 进度条状态显示隐层
*
* */
export function Export(_this,queryStatus,ProgressBar,fullscreenLoading,code,dept){
    _this.$message({
        showClose: true,
        message: '正在导出请耐心等待！',
        type: 'warning'
    });
    _this.$http.post(_this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',dept).then(run=>{
        console.log(run);
        if(run.body.errcode == 0){
            _this.fullscreenLoading = true;
            _this.queryStatus = false;
            _this.ProgressBar = 0;
            _this.code = run.body.result;
            _this.interval = setInterval(() => {
                _this.$http.post(_this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                    "token":_this.token,
                    "id":_this.code,
                })).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        _this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
                        if (_this.ProgressBar == 100){
                            clearInterval(_this.interval);
                            setTimeout(()=> {
                                window.location.href = run.body.result.externalRoad;
                                _this.$message({
                                    message: '导出成功',
                                    type: 'success'
                                });
                                _this.fullscreenLoading = false;
                                _this.queryStatus = true;
                            },2000)
                        }
                    }
                })
            },100);
        }else {
            _this.$message({
                showClose: true,
                message: run.body.message,
                type: 'error'
            });
        }
    })
}