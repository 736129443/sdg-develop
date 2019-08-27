<template>
    <div class="main">
        <div class="header">
            <p> 当前位置：辅助工具 > 消息列表</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="推送内容">
                <el-input v-model="formInline.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 96%">
            <el-table-column
                    prop="pushTitle"
                    width="150"
                    label="标题"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="pushContent"
                    :formatter="content"
                    label="内容"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="createName"
                    align="center"
                    label="创建人"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="taskCreateTime"
                    align="center"
                    :formatter="dateFormat"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                width="200"
                prop=""
                label="操作" align="center">
                <template  slot-scope="scope">
                    <el-button  type="text" size="small" @click="open(scope.row , info = 1)">编辑</el-button>
                    <el-button  type="text" size="small" @click="open(scope.row , info = 2)">发送</el-button>
                    <el-button  type="text" size="small"  @click="record(scope.row)" >发送记录</el-button>
                    <!--<el-button  type="text" size="small" disabled v-if="tableData[scope.$index].status == 0?true:false">发送记录</el-button>-->
                    <el-button  type="text" size="small" @click="finish(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       layout="total,prev, pager, next,sizes"
                       :total="total"
                       :page-size="pagesize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30,50]"
                       :current-page="currentPage"
                       class="text_right">
        </el-pagination>
        <el-dialog
            title="查看发送记录"
            :visible.sync="dialogs"
            width="50%"
            center>
            <el-table
                :data="table"
                border
                style="width: 100%">
                <el-table-column prop="taskCreateTime" label="操作时间"  align="center"  :formatter="dateFormatHm"> </el-table-column>
                <el-table-column prop="createName" label="操作人"  align="center"> </el-table-column>
                <el-table-column prop="backEndPoint" :formatter="conversion" label="发放对象"  align="center"></el-table-column>
                <el-table-column
                    width="200"
                    prop=""
                    label="操作" align="center">
                    <template  slot-scope="scope">
                        <el-button type="primary" @click="onSubmit1(scope.row)" :disabled="Prohibit">下 载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background
                           layout="total,prev, pager, next,sizes"
                           :total="total1"
                           :page-size="pagesize1"
                           @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :page-sizes="[10,20,30,50]"
                           :current-page="currentPage1"
                           class="text_right">
            </el-pagination>
        </el-dialog>
        <!--发送 编辑弹窗-->
        <el-dialog
            :title=newTitle
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <!--<span>需要注意的是内容是默认不居中的</span>-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"  label-width="100px">
                <el-form-item label="推送对象:" v-if="off?false:true" prop="type">

                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所有司机</el-checkbox>
                    <el-checkbox-group v-model="ruleForm.type"  @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city.id" :value="city.value"> {{city.name}} </el-checkbox>
                        <el-select v-model="value1" multiple placeholder="请选择" style="width:600px;" v-if="shows?true:false">
                            <el-option
                                v-for="i in company"
                                :label='i.filialeName'
                                :value="i.filialeId"
                                :key="i.filialeId">
                            </el-option>
                        </el-select>
                    <br>
                        <el-checkbox v-for="i in arr" :label="i" :key="i.id" :value="i.value">{{i.name}}</el-checkbox> <br>

                </el-checkbox-group>

            </el-form-item>

                <el-form-item label="消息标题" prop="name" v-if="off?true:false">
                    <el-input v-model="ruleForm.name" style="width: 60%;"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="desc" v-if="off?true:false">
                    <el-input type="textarea" v-model="ruleForm.desc" style="width:60%;" height="400px"  resize="none" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Submission('ruleForm')" :loading="lodg" v-if="off?false:true" >提 交</el-button>
                <el-button type="primary" @click="Sub('ruleForm')" :loading="lodg" v-if="off?true:false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    import moment from 'moment'
    const cityOptions = [
        // { id:'1',name:'司机',value:'ALL_DRIVER'},
        { id:'2',name:'司机未认证',value:'UN_CERTIFIED_DRIVER'},
        { id:'3',name:'提现审批中司机',value:'WITHDRAWAL_APPROVAL_DRIVER'},
        { id:'4',name:'未交押金司机',value:'UNPAID_DEPOSIT_DRIVER'},
        { id:'5',name:'分公司司机',value:'BRANCH_DRIVER'},
        { id:'6',name:'大于十天未登录司机',value:'TEN_NOT_LOGIN_IN_DRIVER'}
    ];
    // { id:'1',name:'客户',value:'ALL_CUSTOMER'}
    const Option = [];
export default {
    data(){
        return {
            lodg:false,
            newTitle:'',
            table:[],
            dialogs:false,
            token:'',
            total:0,
            currentPage:1,
            pagesize:10,
            total1:0,
            currentPage1:1,
            pagesize1:10,
            shows:false,
            company:'',//分公司
            options:[],
            value1:'',
            off:false,
            Prohibit:false,
            ruleForm:{
                type:[],
                name:'',
                desc:'',
            },
            arr : Option,
            checkAll: false,
            cities: cityOptions,//司机
            isIndeterminate: true,
            centerDialogVisible:false,
            formInline:{
                content:'',
            },
            tableData: [],

            rules: {
                type: [
                    { type: 'array', required: true, message: '请至少选择一个推送对象', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入消息标题', trigger: 'blur' },
                    {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,20}$/,  message: '字数以达到20个上线', trigger: 'blur' }
                    ],
                desc: [
                    { required: true, message: '请填写消息内容', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,300}$/,message: '长度在 1 到 300 个字符'},
                ]
            }
        }
    },
    watch:{
        "ruleForm.type"(curVal,oldVal){
            console.log(curVal, oldVal);
            if (curVal.length == 0) {
                this.shows = false;
            }else {
                for (var i in curVal) {
                    if (curVal[i].name == "分公司司机"){
                        this.shows = true;
                        return
                    }else {
                        this.shows = false;

                    }
                }
            }
        },
        checkAll(curVal,oldVal) {
            console.log(curVal,);
            if (curVal == true){
                this.shows = false
            }
        }
    },
    created(){
        let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let page1 = JSON.stringify({
            token: this.token
        });
        this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        } ).then((res)=>{
            this.company = res.body.result;
        });
        this.data();
    },
    methods:{
        //下载
        onSubmit1(row) {
            // console.log(row);
            for (var key in JSON.parse(row.backEndPoint)) {
                if (key == "ALL_DRIVER") {
                    this.$message({
                        showClose: true,
                        message: '已选择所有司机不可下载！',
                        type: 'warning'
                    });
                    return
                }
            }
            window.location.href = this.global.lightningUrl + '/companyv1/messagerCenter/message/downLoad/excel?id=' + row.id;
        },
        //发放对象解析
        conversion(row) {
            if (row.backEndPoint == undefined) {
                return ''
            }else {
                console.log(JSON.parse(row.backEndPoint));
                var arr = [];
                for (var key in JSON.parse(row.backEndPoint)) {
                    console.log(key);
                    if (key == "ALL") {
                        arr.push('所有司机 ,客户 ,')
                    }
                    if (key == "ALL_DRIVER") {
                        arr.push('所有司机 ,')
                    }
                    if (key == "ALL_CUSTOMER") {
                        arr.push('客户 ,')
                    }
                    if (key == "UN_CERTIFIED_DRIVER"){
                        arr.push('司机未认证 ,')
                    }
                    if (key == "UNPAID_DEPOSIT_DRIVER") {
                        arr.push('未交押金司机 ,')
                    }
                    if (key == "TEN_NOT_LOGIN_IN_DRIVER") {
                        arr.push('大于十天未登录司机 ,')
                    }
                    if (key == "WITHDRAWAL_APPROVAL_DRIVER"){
                        arr.push('提现审批司机 ,')
                    }
                    if (key == "BRANCH_DRIVER"){
                        var array = JSON.parse(row.backEndPoint).BRANCH_DRIVER.split(',');
                        for (var j in this.company) {
                            for (var x in array){
                                if (this.company[j].filialeId == array[x]){
                                    console.log(this.company[j].filialeName);
                                    arr.push(this.company[j].filialeName)
                                }
                            }
                        }
                    }
                }
                console.log(arr);
                // for (var i in arr){
                //     console.log(arr[i]);
                //     if ()
                // }
                return arr
            }

        },
        dateFormatHm: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
        //内容解析
        content(row) {
            return JSON.parse(row.pushContent).content;
        },
        page() {
            let page ={
                pageNum:this.currentPage1,
                pageSize:this.pagesize1,
                token:this.token,
                id:this.ids,
            };
            this.$http.post(this.global.lightningUrl + '/companyv1/messagerCenter/message/messageInfo',page).then(res =>{
                console.log(res);
                if (res.body.errcode==0) {
                    this.table = res.body.result.list;
                    this.total1 = res.body.result.total;
                    this.$message({
                        showClose: true,
                        message: res.body.message,
                        type: 'success',
                    });
                }else {
                    this.table = [];
                    this.total1 = 0;
                }
            })
        },
        //消息记录
        record(row) {
            this.ids = row.id;
            this.table = [];
            this.dialogs = true;
            this.page();
        },
        //列表删除查看发送记录
        finish(row){
            console.log(row);
            this.$http.post( this.global.lightningUrl + '/companyv1/messagerCenter/message/saveBackMessage',JSON.stringify({
                token: this.token,
                id:row.id,
                conditionType:"delete"
            })).then(run=>{
                console.log(run);
                if (run.body.errcode==0){
                    this.$message({
                        showClose: true,
                        message: '删除成功！',
                        type:'success',
                    });
                    //刷新列表
                    this.data();
                }else {
                    this.$message({
                        showClose:true,
                        message:run.body.message,
                        type:'error',
                    })
                }
            });
        },
        //编辑
        Sub(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.lodg = true;
                    let page = JSON.stringify({
                        id:this.id,
                        token:this.token,
                        pushTitle:this.ruleForm.name,
                        pushContent:{ content:this.ruleForm.desc},
                        messageType:"backSystemMessage",
                        conditionType:"edit"
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/messagerCenter/message/saveBackMessage',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        if (res.body.errcode == 0){
                            this.lodg = false;
                            this.$message({
                                showClose: true,
                                message: '修改推送消息成功！',
                                type: 'success'
                            });
                        }
                        // this.resetForm(formName);
                        this.centerDialogVisible = false;
                        this.data();
                    })
                }
            })
        },
        //提交
        Submission(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.lodg = true;
                    console.log(this.ruleForm.type);
                    console.log(this.value1);
                    console.log(this.checkAll);
                    var backEndPoint ={};
                    for (var i in this.ruleForm.type) {
                        var key1 = this.ruleForm.type[i].value;
                        if (key1 == 'BRANCH_DRIVER' && !this.checkAll) {
                            var str = this.value1.join(',');
                            backEndPoint[key1] = str;
                        }else{
                            backEndPoint[key1] = this.ruleForm.type[i].value;
                        }
                        if (this.checkAll == true && key1 == 'ALL_CUSTOMER'){
                            backEndPoint = {};
                            backEndPoint['ALL'] = 'ALL';
                            console.log(backEndPoint);
                        }else if (this.checkAll == true && key1 != 'ALL_CUSTOMER') {
                            backEndPoint = {};
                            backEndPoint['ALL_DRIVER'] = 'ALL_DRIVER';
                        }
                        if (key1 == 'BRANCH_DRIVER' && this.value1 == '' && !this.checkAll) {
                            this.$message({
                                message: '请选择至少一个分公司',
                                type: 'warning'
                            });
                            return
                        }
                    }
                    console.log(backEndPoint);
                    let page = JSON.stringify({
                        token:this.token,
                        id:this.id,
                        pushTitle:this.ruleForm.name,
                        pushContent:{ content:this.ruleForm.desc},
                        messageType:"systemMessage",
                        backEndPoint:backEndPoint,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/messagerCenter/message/saveToPush',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        this.$message({
                            showClose: true,
                            message: '发放中请等待！',
                            type: 'warning'
                        });
                        if (res.body.errcode == 0){
                            this.lodg = false;
                            this.resetForm(formName);
                            this.$message({
                                showClose: true,
                                message: '发放成功！',
                                type:'success',
                            });
                            this.centerDialogVisible = false;
                        }
                    })
                }
            });
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length+this.arr.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //重新选择
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //全选
        handleCheckAllChange(val) {
            this.ruleForm.type = val ? cityOptions : [];
            this.isIndeterminate = false;
            this.box = val;
        },
        //点击发送和编辑按钮
        open(row,info) {
            console.log(row);
            this.id = row.id;
            console.log(info);
            if (info == 1) {
                this.off = true;
                this.newTitle = '编辑发送内容'
            }else{
                this.off = false;
                this.newTitle = '选择发送对象'
            }
            this.centerDialogVisible = true;
            this.ruleForm.desc = JSON.parse(row.pushContent).content;
            this.ruleForm.name = row.pushTitle;
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
        //页面初始化
        data(){
            let page = JSON.stringify({
                'token':this.token,
                'pageNum':this.currentPage,
                'pageSize':this.pagesize,
                "pushContent":this.formInline.content,
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/messagerCenter/message/backMessageList',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if (res.body.errcode == 0){
                    this.tableData = res.body.result.list;
                    this.total = res.body.result.total;
                }else {
                    this.tableData = [];
                }
            })
        },
        //查询
        onSubmit(){
            console.log(this.formInline);
            this.data();
        },
        //分页
        handleSizeChange(pagesize) {
            this.pagesize = pagesize;
            this.data();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.data();
        },
        handleSizeChange1(pagesize1) {
            this.pagesize1 = pagesize1;
            this.page();
        },
        handleCurrentChange1(currentPage1) {
            this.currentPage1 = currentPage1;
            this.page();
        },

    }
}
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>
