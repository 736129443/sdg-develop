<template>
    <div class="main o_manage">
        <div class="header">
            当前位置：<span>组织管理 > 用户管理</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="管理区域">
                    <el-select v-model="formInline.regionId" placeholder="请选择区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="link in arr" :label='link.name' :value="link.id" :key="link.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分公司">
                    <el-select v-model="formInline.filialeId" placeholder="请选择分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="link in list" :label='link.deptName' :value="link.id"
                                   :key="link.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model.trim="formInline.user"
                              placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model.trim="formInline.userName"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="demand" class="btn">查询</el-button>
                    <el-button type="success" @click="$router.push({path: '/user'})" class="btn">新增</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading"
                               element-loading-spinner="none" class="btn"
                               v-if="administratorListExport==true?true:false">导出
                    </el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7"
                                 v-if="queryStatus == true? false:true"
                                 style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
            <!-- 表格区域 -->
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="用户ID"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="regionName"
                        label="管理区域"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="filialeName"
                        label="分公司"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        align="center"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        align="center"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        align="center"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="statusName"
                        align="center"
                        label="状态">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                                @click=compile(scope.$index)
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click=turnOver(scope.$index)
                                type="text"
                                size="small">
                            工作移交
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页插件的引入 -->
        </div>
        <!-- 编辑按钮的弹出框 -->
        <el-dialog title="用户编辑" :visible.sync="dialogFormVisible" width="30%" :before-close="handleClose" class="dl">
            <el-form :label-position="labelPosition" label-width="120px" :rules="rules" :model="formLabelAlign" ref="formLabelAlign">
                <el-form-item label="用户ID">
                    <el-input v-model="formLabelAlign.id" class='inp_w' :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属分公司" prop="filialeName">
                    <el-select clearable placeholder="请选择" v-model="formLabelAlign.filialeName" @change="onfiliale()">
                        <el-option
                                v-for="link in list"
                                :label='link.deptName' :value="link.deptName"
                                :key="link.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属部门" prop="departmentName">
                    <!--<el-input class='inp_w'></el-input>-->
                    <el-select clearable placeholder="请选择" v-model="formLabelAlign.departmentName">
                        <el-option
                                v-for="item in options9"
                                :key="item.id"
                                :label="item.deptName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="roleName">
                    <!--<el-input v-model="formLabelAlign.departmentName"  class='inp_w'></el-input>-->
                    <el-select clearable placeholder="请选择" v-model="formLabelAlign.roleName">
                        <el-option
                                v-for="item in options3"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formLabelAlign.name" class='inp_w'></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="formLabelAlign.userName" class='inp_w'></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formLabelAlign.password" class='inp_w' :type="type" @input="passInput">
                        <el-button v-if="passbtnClass" slot="append"
                                   :class="{'iconfont': passClass ,'tac': t_center ,'icon-close-eyes': onoff,'icon-eye': onon }"
                                   @click="sun" style="text-align: center
"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formLabelAlign.statusName" placeholder="请选择活动区域">
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="formLabelAlign.sex" label="1">男</el-radio>
                    <el-radio v-model="formLabelAlign.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="formLabelAlign.phone" class='inp_w'></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formLabelAlign.email" class='inp_w'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save('formLabelAlign')" class="btn fl">保 存</el-button>
                    <el-button @click="cancel" class="btn fl">取 消</el-button>
                </el-form-item>

            </el-form>
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="cancel" class="btn fl">取 消</el-button>-->
                <!--<el-button type="primary" @click='save' class="btn fl"> 保 存</el-button>-->
            <!--</div>-->
        </el-dialog>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage4"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
        <!--移交-->
        <el-dialog
                title="工作移交"
                center
                :visible.sync="isturnOver"
                width="650px"
                :before-close="isturnOverhandleClose">
            <div class="isturnOver">
                <el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
                    <el-form-item label="名称">
                        <el-input v-model="isturnOverlist.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-input v-model="isturnOverlist.roleName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在分公司">
                        <el-input v-model="isturnOverlist.filialeName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="移交项">
                        <el-select v-model="isturnOverlist.state" placeholder="请选择移交工作" @change="$forceUpdate()">
                            <el-option label="全部" value="allexchange"></el-option>
                            <el-option label="审批流" value="workflowexchange"></el-option>
                            <el-option label="司机运营" value="driverexchange"></el-option>
                            <el-option label="项目关联" value="customerexchange"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="移交人">
                        <el-select v-model="isturnOverlist.turnOverhuman" placeholder="请选择移交人">
                            <el-option v-for="i in isturnlist" :label="i.name" :value="i.id" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="移交原因">
                        <el-select v-model="isturnOverlist.userType" placeholder="请选择移交原因">
                            <el-option label="离职" value="driver"></el-option>
                            <el-option label="职务变更" value="customer"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                        @click="isturnOver = false , isturnOverlist.turnOverhuman = '', isturnOverlist.userType = '',isturnOverlist.state = 'allexchange'"
                        class="btn">取 消</el-button>
                <el-button type="primary" @click="isturnOver = false,turnOverSubmit()" class="btn">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    const sha256 = require("js-sha256").sha256;
    export default {
        data() {
            return {
                rules: {
                    filialeName: [
                        {required: true, message: '请选择所属分公司', trigger: 'change'}
                    ],
                    departmentName: [
                        {required: true, message: '请选择所属部门', trigger: 'change'}
                    ],
                    roleName: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    name:[
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,10}$/, message: '姓名不规范', trigger: 'blur'},
                    ],
                    userName:[{required: true, message: '请输入姓名', trigger: 'blur'},
                        {pattern: /^([A-Za-z]|[0-9]){2,20}$/, message: ' 请输入2 到 20 个字母，数字或组合', trigger: 'blur' }],
                    password:[{required: false, message: '请输入密码', trigger: 'blur'},],
                    phone:[
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^[\d-]{1,14}$/, message: '请输入正确电话号', trigger: 'blur'},
                    ]
                },
                time: '',
                //遮罩层
                fullscreenLoading: false,
                code: '',
                //导出
                queryStatus: true,
                //进度条
                ProgressBar: 0,

                token: '',
                input: '',
                input1: '',
                arr: [],
                currentPage4: 1,
                pagesize: 10,
                size: 10000,
                total: 0,
                unm: 1,
                formInline: {
                    region: '',
                    user: '',
                    status: '',
                    filialeId:'',
                    userName: '',
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                labelPosition: 'right',
                formLabelAlign: {
                    id: '',
                    areaName: '',
                    roleName: '',
                    name: '',
                    departmentId: '',
                    departmentName: '',
                    password: '',
                    status: '',
                    statusName: '',
                    userName: '',
                    areaId: '',
                    filialeId: '',
                    roleId: '',
                    sex: '1',
                    phone: '',
                    email: '',
                },
                tableData: [],
                options9: [],
                options8: [],
                options3: [],
                aa: '',
                bb: '',
                status: '',
                // 密码样式
                passbtnClass: false,
                passClass: false,
                // 闭眼
                onoff: false,
                //开眼
                onon: false,
                show: false,
                type: "password",
                // 居中
                t_center: false,
                region: [],
                list: [],
                administratorListExport: '',
                isturnOver: false,
                isturnlist: '',
                isturnOverlist: {
                    turnOverhuman: '',
                    state:'',
                },
            }
        },
        created() {
            console.log(this.isturnOverlist.state);
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            // console.log(user.result.currentUser.permission);
            console.log(user.result);
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // if (jurisdictions[2].menus.length == 4) {
                // alert(3)
            this.administratorListExport = jurisdictions[2].menus[3].choose
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region', JSON.stringify({
                token: this.token,
            })).then(run => {
                this.arr = run.body.result
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', JSON.stringify({
                token: this.token,
                pid: 0,
            }),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(run => {
                console.log(run);
                if (run.body.errcode == 0) {
                    this.list = run.body.result.deptList
                }
            })

            this.organization();
        },
        methods: {
            onfiliale() {
                // this.tableData[_index].filialeId
                let filialeId;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].deptName == this.formLabelAlign.filialeName) {
                        filialeId = this.list[i].id
                    }
                }
                this.formLabelAlign.departmentName = '';
                this.formLabelAlign.departmentId = '';

                let page1 = JSON.stringify({
                    token: this.token,
                    id: filialeId,
                });
                // /companyv1/security/admin/update

                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId', page1, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    this.options9 = res.body.result.deptList;
                });

            },
            //导出
            Export() {
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord', JSON.stringify({
                    "token": this.token,
                    "exportName": "user", /*导出模块名称*/
                    "a.name": this.formInline.user, /*-- 姓名*/
                    "a.user_name": this.formInline.userName, /*-- 用户名*/
                    "a.status": this.formInline.status, /*-- 启用禁用状态(1:启用，0禁用)*/
                    "r.region_id": this.formInline.regionId, /*-- 大区ID*/
                    "r.department_id": this.formInline.filialeId   /*-- 部门ID*/
                })).then(run => {
                    console.log(run);
                    if (run.body.errcode == 0) {
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar = 0;
                        this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess', JSON.stringify({
                                "token": this.token,
                                "id": this.code,
                            })).then(run => {
                                console.log(run);
                                if (run.body.errcode == 0) {
                                    this.ProgressBar = parseInt(run.body.result.exportProcess);
                                    if (this.ProgressBar == 100) {
                                        clearInterval(this.interval);
                                        setTimeout(() => {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = true;
                                        }, 1200)
                                    }
                                }
                            })
                        }, 1000);
                    } else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            // 组织管理列表请求
            organization() {
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage4,
                    pageSize: this.pagesize,
                    filialeId: this.formInline.filialeId,
                    regionId: this.formInline.regionId,
                    name: this.formInline.user,
                    userName: this.formInline.userName,
                    status: this.formInline.status,
                });
                console.log(page);
                // this.$http.post(this.global.lightningUrl + '/company/usermanage/administratorgetuserlistbyname',page,{
                this.$http.post(this.global.lightningUrl + '/companyv1/security/admin/list', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res);
                    this.total = res.data.result.total;
                    this.tableData = res.data.result.rows;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            //查询
            demand() {
                this.currentPage4 = 1
                this.organization()
            },
            // 编辑请求
            compile(_index) {
                this.aa = this.tableData[_index].departmentName;
                this.bb = this.tableData[_index].roleName;
                this.formLabelAlign = this.tableData[_index];
                this.dialogFormVisible = true;
                let filialeId;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].deptName == this.formLabelAlign.filialeName) {
                        filialeId = this.list[i].id
                    }
                }
                let page1 = JSON.stringify({
                    token: this.token,
                    id: filialeId,
                });
                // /companyv1/security/admin/update

                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId', page1, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    this.options9 = res.body.result.deptList;
                });
                let page2 = JSON.stringify({
                    token: this.token,
                    pageNum: 1,
                    pageSize: 1000,
                    roleStatus: 1
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/security/role/list', page2, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res)
                    this.options3 = res.body.result.rows
                });
                if (this.formLabelAlign.password == '') {
                    this.passbtnClass = false
                }
            },
            // 保存
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(typeof(this.formLabelAlign.roleName));

                        for (let i = 0; i < this.options9.length; i++) {
                            if (this.formLabelAlign.departmentName == this.options9[i].id) {
                                this.formLabelAlign.departmentName = this.options9[i].deptName;
                                this.formLabelAlign.departmentId = this.options9[i].id;
                            }
                        }
                        let roleId;
                        let roleName;
                        if (typeof(this.formLabelAlign.roleName) == "string"){
                            for (let i = 0; i < this.options3.length; i++) {
                                if (this.formLabelAlign.roleName == this.options3[i].roleName){
                                    roleId = this.options3[i].id
                                    roleName = this.options3[i].roleName
                                }
                            }
                        }else {
                            for (let i = 0; i < this.options3.length; i++) {
                                if (this.formLabelAlign.roleName == this.options3[i].id){
                                    roleId = this.options3[i].id
                                    roleName = this.options3[i].roleName
                                }
                            }
                        }
                        let filialeId;
                        for (let i = 0; i < this.list.length; i++) {
                            if (this.list[i].deptName == this.formLabelAlign.filialeName) {
                                filialeId = this.list[i].id
                            }
                        }
                        if (this.formLabelAlign.statusName == '启用') {
                            this.status = 1
                        } else {
                            this.status = 0
                        }
                        let page = JSON.stringify({
                            token: this.token,
                            id: this.formLabelAlign.id,
                            areaId: this.formLabelAlign.areaId,
                            areaName: this.formLabelAlign.areaName,
                            departmentId: this.formLabelAlign.departmentId,
                            departmentName: this.formLabelAlign.departmentName,
                            roleId: roleId,
                            roleName: roleName,
                            name: this.formLabelAlign.name,
                            userName: this.formLabelAlign.userName,
                            status: this.status,
                            password: this.formLabelAlign.password == null ? "" : sha256(this.formLabelAlign.password),
                            sex: this.formLabelAlign.sex,
                            email: this.formLabelAlign.email,
                            phone: this.formLabelAlign.phone,
                            filialeId: filialeId,
                            filialeName: this.formLabelAlign.filialeName,
                        });
                        console.log(page);
                        // this.$http.post(this.global.lightningUrl + '/company/usermanage/administratorupdatebyid',page,{
                        this.$http.post(this.global.lightningUrl + '/companyv1/security/admin/update', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.demand()
                            } else {
                                this.$message.error('保存失败，请重试');
                                this.dialogFormVisible = false;
                                this.demand()
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            //分页
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.organization()
            },
            cancel() {
                this.dialogFormVisible = false;
                // this.tableData= this.tableData
                // setTimeout(function () {
                //     location.reload()
                // },200)
                this.demand()
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.demand()
                    })
                    .catch(_ => {
                    });
            },
            // 移交关闭弹出
            isturnOverhandleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.isturnOver = false , this.isturnOverlist.turnOverhuman = '', this.isturnOverlist.userType = ''
                        this.demand()
                    })
                    .catch(_ => {
                    });
            },
            passInput() {
                console.log(this.formLabelAlign.password.length);
                if (this.formLabelAlign.password.length == 64) {
                    this.passbtnClass = false
                } else if (this.formLabelAlign.password.length != 64) {
                    this.passbtnClass = true,
                        setTimeout(() => {
                            this.passClass = true;
                            this.onoff = true;
                        }, 20)
                }
            },
            sun() {
                this.show = !this.show;
                if (this.show) {
                    this.show == !false;
                    this.type = "text"
                    this.onoff = false;
                    this.onon = true
                } else {
                    this.onoff = true;
                    this.onon = false
                    this.type = "password"
                }
            },
            //移交
            turnOver(_index) {
                this.isturnOver = true;
                this.isturnOverlist = this.tableData[_index] ;
                this.isturnOverlist.state='allexchange';
                console.log(this.isturnOverlist.filialeId);
                let page = JSON.stringify({
                    token: this.token,
                    id: this.isturnOverlist.id,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/findAdminInformation', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res);
                    console.log(res.body.result.rows);
                    this.isturnlist = res.body.result
                    this.isturnlist.ids = this.isturnOverlist.id

                }).catch(function (error) {
                    console.log(error);
                });

            },
            sleep(delay) {
                var start = (new Date()).getTime();
                while ((new Date()).getTime() - start < delay) {
                    continue;
                }
            },
            turnOverSubmit() {
                let page = JSON.stringify({
                    token: this.token,
                    oldId: this.isturnlist.ids,
                    newId: this.isturnOverlist.turnOverhuman,
                    state: this.isturnOverlist.state,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/dataManageChange', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    var result = res.body.result;
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].errcode == 0) {
                            setTimeout((res) => {
                                this.$notify({
                                    showClose: true,
                                    message: result[i].message,
                                    type: 'success'
                                });
                            }, 1500);

                        } else {
                            this.$notify.error({
                                showClose: true,
                                message: result[i].message,
                            });
                        }
                    }
                    this.isturnOverlist.turnOverhuman = '';
                    this.isturnOverlist.userType = '';
                    this.isturnOverlist.state = '';
                    return;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;
        .isturnOver {
            .el-input {
                width: 65%;
            }
            .el-select {
                width: 65%;

            }
        }
        .header {
            margin-bottom: 20px;
        }

        .tac {
            text-align: center;
        }
        .nave {
            margin: 20px 0;
        }
        .top {
            margin-top: 20px;
        }
        .el-form-item {
            margin-bottom: -4px;
        }
        .inp {
            width: 150px;
            height: 30px;
            margin-right: 30px;
            border: 1px solid #ccc;
            padding-left: 10px;
        }
        .dv {
            position: relative;
        }
        .dc {
            position: absolute;
            top: 0px;
            right: 32%;
        }
        .dr {
            position: absolute;
            top: 0px;
            right: 22%;
            width: 100px;
            height: 40px;
        }
        .search {
            margin: 0 30px;
        }
        td {
            border: 1px solid #ccc;
        }
        .el-pagination {
            text-align: center;
            margin-top: 20px;
        }
        .el-button {
            padding: 0px;
        }
        .cc {
            display: block;
            width: 70px;
            line-height: 40px;
            color: white;
        }

        .dialog-footer {
            overflow: hidden;
        }
        .btn {
            width: 70px;
            height: 40px;
        }
        .bj {
            font-size: 16px;
            border: 0;
            color: blue
        }
        .fl {
            float: right;
            margin-right: 20px;
        }
        .el-form-item {
            margin-bottom: 10px;

        }
        .inp_w{
            width: 65%!important;

        }
        /*.el-select{*/
            /*width: 70%;*/
        /*}*/
        .o_manage{
            .dl{


            }
        }

    }

</style>
