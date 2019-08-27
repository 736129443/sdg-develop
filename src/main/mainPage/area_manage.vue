

<template>
    <div class="main" >
        <div class="header">
            当前位置 : <span>区域管理</span>
        </div>
        <div class="nav">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="区域名称">
                    <!--<el-input v-model.trim="input" placeholder="区域名称"></el-input>-->

                    <el-select v-model="formInline.input" placeholder="请选择所管理区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.name' :value="i.name" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="inquire">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible = true,add()">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="dv">

            <div class="center">
                <template>
                    <el-table :data="arr" style="width: 100%">
                        <el-table-column prop="regionId"  label="区域ID" width="" align="center"></el-table-column>
                        <el-table-column prop="regionName" label="区域名称" width="" align="center"></el-table-column>
                        <el-table-column prop="status" label="启用状态" width="" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button width="100" size="medium"  @click="dialogFormVisible1 = true, edit(scope.row)" >编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>

        </div>
        <!-- 新增模态框显示 -->
        <el-dialog title="区域管理>区域新增" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="区域编号:" :label-width="formLabelWidth">
                    <el-input  v-model="form.input1" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="区域名称:" :label-width="formLabelWidth" prop="name1">
                    <el-input v-model="form.name1"  auto-complete="off" placeholder="请确定区域名称的唯一性"></el-input>
                </el-form-item>
                <el-form-item  label="区域状态:" :label-width="formLabelWidth" prop="value">
                    <el-select v-model="form.value"   placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="管理区域:" :label-width="formLabelWidth">
                    <el-button type="primary"  @click="dialogVisible = true,department()" >添加</el-button>
                    <br>
                        <div class="eltab">
                            <el-tag
                                    v-for="tag in tags"
                                    :key="tag.deptName"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose1(tag)"
                                    >
                                {{tag.deptName}}
                            </el-tag>
                        </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="dialogFormVisible = true,submitForms('ruleForm')" >保存</el-button>
                <el-button  @click="dialogFormVisible=false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 新增模态框结束 -->
        <!-- 编辑模态框显示 -->
        <el-dialog  class="modal" title="区域管理>区域编辑" :visible.sync="dialogFormVisible1">
            <el-form :model="forms" :rules="rule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="区域编号:" :label-width="formLabelWidth">
                    <el-input
                            placeholder="" v-model="forms.input2" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item  label="区域名称:" :label-width="formLabelWidth" prop="name4">
                    <el-input v-model="forms.name4" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  label="区域状态:" :label-width="formLabelWidth" prop="value">
                    <el-select v-model="forms.value"   placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="管理区域:" :label-width="formLabelWidth">
                    <el-button type="primary"  @click="dialogVisible = true,department()" >添加</el-button>
                    <br>
                    <div class="eltab">
                        <el-tag
                                v-for="tag in list"
                                :key="tag.id"
                                closable
                                :disable-transitions="false"
                                @close="handleClose2(tag)"
                        >
                            {{tag.deptName}}
                        </el-tag>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editPreservation('ruleForm')">保存</el-button>
                <el-button  @click="dialogFormVisible1=false,data()">取消</el-button>
            </div>
        </el-dialog>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
        <!--添加管理区域-->
        <el-dialog
                title="添加管理区分公司"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">

            <el-checkbox-group v-model="checkList">
                <!--<el-checkbox v-for="item in checkLists" :label="item.deptName" :value="item.id" :key="item.id" :disabled="item.slectedRegion" >{{checkLists.deptName}}</el-checkbox>-->
                <el-checkbox v-for="item in checkLists" :label="item.id" :disabled="item.selectedRegion" @change="tagchange()" >{{item.deptName}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false,checkList = []">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false,departmentdetermine()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value5:'',
                forms:{
                    input2:'',
                    name4:'',
                    value:'',
                },
                state:'',
                button:'',
                token:'',
                // 新增下拉内容的定义
                status:1,
                options:[
                    {value: '启用',id:0},
                    {value: '禁用',id:1}
                ],
                value: '',
                // 输入框
                input:'',
                input1:'',
                // 请求数据存储的数组
                arr:[],
                currentPage:1,
                pagesize:10,//每页的数据条数
                total:0,
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                formInline:{
                    area:'',
                    input:''
                },
                form: {
                    name: '',
                    name1: '',
                    name2: '',
                    name3:"",
                    name4:"",
                    name5:"",
                    input1:'',
                    input2:'',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                rules: {
                    name1: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,10}$/ , message: '格式不正确', trigger: 'blur' }
                    ],
                    value: [
                        { required: true, message: '请选择区域状态', trigger: 'change' }
                    ],
                },
                rule:{
                    name4: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,10}$/ , message: '格式不正确', trigger: 'blur' }
                    ],
                    value: [
                        { required: true, message: '请选择区域状态', trigger: 'change' }
                    ],
                },

                checkList:[],
                checkLists:[],
                dialogVisible:false,
                tags: [],
                list:[],
                repetition:[],
                arrs:[],
                lina:[],
                link:[],
            };

        },
        created(){
            // 拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // console.log(this.token);
            //页面首刷
            this.data();
        },
        methods: {
            data(){
                // this.$http.post(this.global.lightningUrl + '/company/usermanage/arealist',JSON.stringify({
                this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/list',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize
                })).then(run=>{
                    console.log(run)
                    this.total = run.body.result.total;
                    this.arr = run.body.result.rows;
                    console.log(this.arr);
                    for(var i in this.arr){
                        if(this.arr[i].status == 0){
                            this.arr[i].status ='启用'
                        }else {
                            this.arr[i].status ='禁用'
                        }
                    }
                })

                this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                    'token':this.token,
                })).then(run=>{
                    // console.log(run)
                    // this.total = run.body.result.total;
                    // this.arr = run.body.result.rows;
                    // console.log(this.arr);
                    // for(var i in this.arr){
                    //     if(this.arr[i].status == 0){
                    //         this.arr[i].status ='启用'
                    //     }else {
                    //         this.arr[i].status ='禁用'
                    //     }
                    // }
                    this.link = run.body.result
                })
            },
            //新增
            submitForms(formName) {
                console.log(this.tags);
                let areaList = []
                if (this.tags.length != 0 ){
                    for (let i = 0; i < this.tags.length; i++) {
                        areaList.push(this.tags[i].id)
                    }
                    console.log(areaList);
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if(this.form.value == '启用') {
                                this.state = 1
                            }else if(this.form.value == '禁用'){
                                this.state = 0
                            }
                            // this.$http.post(this.global.lightningUrl + '/company/usermanage/areasavearea',JSON.stringify({
                                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/create',JSON.stringify({
                                'token':this.token,
                                'regionId':this.form.input1,
                                'regionName':this.form.name1,
                                'status': this.form.value,
                                'areaList':areaList,
                            })).then(run=>{
                                console.log(run);
                                console.log(123);
                                if(run.body.errcode == 0){
                                    this.dialogFormVisible=false;
                                    this.$message({
                                        showClose: true,
                                        message:'保存成功！',
                                        type: 'success'
                                    });
                                    this.data()
                                    this.form =[]
                                    this.tags = []

                                }else if (run.body.errcode == 1902) {
                                    this.$message({
                                        showClose: true,
                                        message:'命名重复！',
                                        type: 'error'
                                    });
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message:'保存失败！',
                                        type: 'error'
                                    });
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.$message({
                        message: '请选择管理区域',
                        type: 'warning'
                    });
                }
                this.department()
            },
            //编辑
            edit(row){

                this.a = 1 ;
                this.forms.input2 = row.regionId;
                this.forms.name4 = row.regionName;
                this.forms.value =row.status;
                this.list=[];
                this.arrs = [];
                this.lina = []
                for (let i = 0; i < row.departmentList.length; i++) {
                    this.list.push(row.departmentList[i]);
                    // this.arrs.push(row.departmentList[i])
                }
                this.lina = row.departmentList;
                this.list=this.lina
                console.log(this.arrs);
                if(row.status == 1){
                    this.forms.value = '启用'
                }else if(row.status == 0){
                    this.forms.value = '禁用'
                }
            },
            //编辑保存
            editPreservation(formName){
                let areaList = [] ;
                // this.tags.push(this.list);
                // console.log(this.list);
                // for (let i = 0; i < this.list.length; i++) {
                //     // this.repetition =
                // }
                if (this.list.length != 0 ){
                    for (let i = 0; i < this.list.length; i++) {
                        areaList.push(this.list[i].id)
                        this.repetition.push(Number(this.list[i].id))
                    }
                    console.log(areaList);
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.dialogFormVisible1 = false
                            if(this.forms.value == '启用'){
                                this.forms.value = 0
                            }else if(this.forms.value == '禁用') {
                                this.forms.value = 1
                            }
                            // this.$http.post(this.global.lightningUrl + '/company/usermanage/areaupdatearea',JSON.stringify({
                                this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/edit',JSON.stringify({

                                'token':this.token,
                                'regionId':this.forms.input2,
                                'regionName':this.forms.name4,
                                'status':this.forms.value,
                                'areaList':areaList,
                            })).then(run=> {
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.$message({
                                        showClose: true,
                                        message:'保存成功' ,
                                        type: 'success',
                                    });
                                    this.data();
                                    this.department();
                                }else if (run.body.errcode == 1902) {
                                    this.$message({
                                        showClose: true,
                                        message:'命名重复！',
                                        type: 'error'
                                    });
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message:'保存失败！',
                                        type: 'error'
                                    });
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    })
                } else {
                    this.$message({
                        message: '请选择管理区域',
                        type: 'warning'
                    });
                }
                this.department()

            },
                //新增区域名称
            Must(){

            },
            //增加区域
            add(){
                // this.$http.post(this.global.lightningUrl + '/company/usermanage/areagenerateareanum',JSON.stringify({
                    this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/region_id',JSON.stringify({
                    'token':this.token,
                })).then(run=>{
                    this.form.input1 = run.body.result
                })
            },
            //区域名称唯一性校验
            check(){
                console.log(this.form.name1)
                this.$http.post(this.global.lightningUrl + '/company/usermanage/areanamecheck',JSON.stringify({
                    'token':this.token,
                    'areaName':this.form.name1,
                })).then(run=>{
                    // console.log(run)
                    this.button = run.body.result
                })
            },
            //新增模态窗口的保存
            Preservation(){
                console.log(this.form.name1)
            },
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage)
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/list',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                })).then(run=>{
                    this.arr = run.body.result.rows;
                    for(var i in this.arr){
                        if(this.arr[i].status == 0){
                            this.arr[i].status ='启用'
                        }else {
                            this.arr[i].status ='禁用'
                        }
                    }
                })
            },
            //按钮查询
            inquire() {
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/list',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage = 1,
                    'pageSize':this.pagesize,
                    'name':this.formInline.input
                })).then(run=>{
                    // console.log(run)
                    this.arr = run.body.result.rows;
                    this.total = run.body.result.total;

                    for(var i in this.arr){
                        if(this.arr[i].status == 0){
                            this.arr[i].status ='启用'
                        }else {
                            this.arr[i].status ='禁用'
                        }
                    }
                })
            },
            // 获取大区
            department(){
                // this.list =
                // this.list = this.arrs ;
                // console.log(this.arrs);
                this.checkLists=[]
                // console.log(this.list);
                let page = JSON.stringify({
                    token : this.token
                })
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/department_list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    this.checkLists = res.body.result
                    // console.log(this.checkLists);
                })
            },
            departmentdetermine(){
                if (this.a!=1){
                    let e = []
                    if (this.checkList.length!= 0){
                        this.arrs=[];
                        for (let i = 0; i < this.checkList.length; i++) {
                            e.push(this.checkList[i])
                        }
                        for (let i = 0; i < this.checkList.length; i++) {
                            if (e.indexOf(this.checkList[i])==-1){
                                e.push(this.checkList[i])
                            }
                        }
                        this.tags=[];
                        for (let i = 0; i < this.checkLists.length ; i++) {
                            for (let j = 0; j < e.length; j++) {
                                if (e[j] == this.checkLists[i].id ) {
                                    this.tags.push(this.checkLists[i]);
                                }
                            }
                        }
                    }else {
                        this.tags=[]
                        for (let i = 0; i < this.lina.length; i++) {
                            e.push(this.lina[i].id)
                        }
                        for (let i = 0; i < this.checkLists.length; i++) {
                            for (let j = 0; j < e.length; j++) {
                                if (e[j] == this.checkLists[i].id ) {
                                    this.tags.push(this.checkLists[i]);
                                }
                            }
                        }
                    }
                } else {
                    let e = []
                    if (this.checkList.length!= 0){
                        this.arrs=[];
                        for (let i = 0; i < this.list.length; i++) {
                            e.push(Number(this.list[i].id))
                        }
                        for (let i = 0; i < this.checkList.length; i++) {
                            this.arrs.push(this.checkList[i])
                        }
                        for (let i = 0; i < this.checkList.length; i++) {
                            if (e.indexOf(this.checkList[i])==-1){
                                e.push(this.checkList[i])
                            }
                        }
                        this.list=[];
                        for (let i = 0; i < this.checkLists.length ; i++) {
                            for (let j = 0; j < e.length; j++) {
                                if (e[j] == this.checkLists[i].id ) {
                                    this.list.push(this.checkLists[i]);
                                }
                            }
                        }
                    }else {
                        this.list=[]
                        for (let i = 0; i < this.lina.length; i++) {
                            e.push(this.lina[i].id)
                        }
                        for (let i = 0; i < this.checkLists.length; i++) {
                            for (let j = 0; j < e.length; j++) {
                                if (e[j] == this.checkLists[i].id ) {
                                    console.log(e[j]);
                                    this.list.push(this.checkLists[i]);
                                    console.log(this.list);
                                }
                            }
                        }
                    }
                }
                this.checkList = []
            },
            tagchange(){
                // console.log(val);
                this.repetition = this.checkList;
            },
            handleClose1(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            handleClose2(tag) {
                this.list.splice(this.list.indexOf(tag), 1);
            },
            //大区确定
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.checkList = []
                    })
                    .catch(_ => {});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        padding: 30px;

        font-size: 16px;
        .nav{
            margin-top:20px;
            background: #eaedf2;
        }
        .el-checkbox+.el-checkbox{
            /*margin-right: 30px!important;*/
            margin-left: 0!important;
        }
        .el-checkbox{
            margin-right: 30px;
            margin-top: 10px;
        }
        .eltab{
            margin-top: 15px;
            border: 1px solid #dcdfe6;
            width: 100%;
            padding: 5px 15px;
            display: inline-block;
            box-sizing: border-box;
            border-radius: 4px;
            background-color: #fff;
            -webkit-appearance: none;
            background-image: none;
            height: 100px;
            overflow: auto;
        }
        .el-tag{
            margin-right: 15px;
        }
    }

</style>

