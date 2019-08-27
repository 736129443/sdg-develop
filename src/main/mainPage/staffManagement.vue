<template>
    <div class="staffManagement main">
        <div class="header">
            当前位置 : <span>组织管理 > 员工管理</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="员工编号">
                <el-input v-model.trim="formInline.employeeNo" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入员工编号"></el-input>
            </el-form-item>
            <el-form-item label="所属区域">
                <el-select v-model="formInline.regionId" placeholder="请选择所属区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="link in arr" :label='link.name' :value="link.name" :key="link.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分公司" v-if="!partition">
                <el-select v-model="formInline.filialeId" placeholder="请选择分公司" >
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="link in list" :label='link.deptName' :value="link.deptName"
                               :key="link.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门">
                <el-select v-model="formInline.deptNameid" placeholder="请选择部门">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="link in deptName" :label='link.deptName' :value="link.deptName"
                               :key="link.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职务">
                <el-select v-model="formInline.duty">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="项目驻场" value="项目驻场"></el-option>
                    <el-option label="顾问" value="顾问"></el-option>
                    <el-option label="司机" value="司机"></el-option>
                    <el-option label="专员" value="专员"></el-option>
                    <el-option label="主管" value="主管"></el-option>
                    <el-option label="经理" value="经理"></el-option>
                    <el-option label="负责人" value="负责人"></el-option>
                    <el-option label="需求分析工程师" value="需求分析工程师"></el-option>

                    <el-option label="研发总监" value="研发总监"></el-option>
                    <el-option label="架构师" value="架构师"></el-option>
                    <el-option label="开发工程师" value="开发工程师"></el-option>
                    <el-option label="测试工程师" value="测试工程师"></el-option>
                    <el-option label="产品经理" value="产品经理"></el-option>
                    <el-option label="UI设计工程师" value="UI设计工程师"></el-option>

                    <el-option label="法务专员" value="法务专员"></el-option>
                    <el-option label="项目支持" value="项目支持"></el-option>
                    <el-option label="副总裁" value="副总裁"></el-option>
                    <el-option label="董事长" value="董事长"></el-option>
                    <el-option label="城市经理" value="城市经理"></el-option>
                    <el-option label="总监" value="总监"></el-option>
                    <!--<el-option v-for="link in list" :label='link.deptName' :value="link.id" :key="link.id"></el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model.trim="formInline.name" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="formInline.employType" placeholder="请选择类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="全日制" value="全日制"></el-option>
                    <el-option label="第三方驻派" value="第三方驻派"></el-option>
                    <el-option label="兼职" value="兼职"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任职状态">
                <el-select v-model="formInline.status" placeholder="请选择类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="在职" value="在职"></el-option>
                    <el-option label="离职" value="离职"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="btn">查询</el-button>
                <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading"
                           element-loading-spinner="none" v-if="stafExport">导出
                </el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7"
                             v-if="queryStatus == true? false:true"
                             style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                <el-button type="success" @click="$router.push({path: '/AddedstaffManagement',query:{'type':'add'}})"
                           class="btn" v-if="staffAdded">新增
                </el-button>
            </el-form-item>
            <el-form-item class="flr">
                <el-button plain @click="onSubmit1" class="btn">下载导入模板</el-button>
            </el-form-item>
            <el-form-item class="flr">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="javascript:;"
                        :on-change="handleChange"
                        :auto-upload="false"
                        :multiple="false"
                        :on-success="uploadSuccess"
                        :on-error="uploadErrorr"
                        :before-upload="beforeUpload"
                        :before-remove='remove'
                        :headers="{ 'Content-Type':'multipart/form-data'}"
                >
                    <el-button slot="trigger" plain style=" " v-if="stafImport">批量导入<i
                            class="el-icon-view el-icon--right"></i></el-button>
                    <el-button plain type="success" plain @click="submitUpload" v-if="!show0">
                        上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="employeeNo" align="center" label="员工编号"></el-table-column>
            <el-table-column prop="regionName" align="center" label="所属区域"></el-table-column>
            <el-table-column prop="filialeName" align="center" label="分公司/部门"></el-table-column>
            <el-table-column prop="deptName" align="center" label="所属部门"></el-table-column>
            <!-- <el-table-column prop="processingResult" label="业务类型（预留）"></el-table-column> -->
            <el-table-column prop="duty" align="center" label="职务"></el-table-column>
            <el-table-column prop="name" align="center" label="姓名"></el-table-column>
            <el-table-column prop="phone" align="center" label="电话"></el-table-column>
            <el-table-column prop="sex" align="center" label="性别"></el-table-column>
            <el-table-column prop="entryDate" align="center" label="入职日期"
                             :formatter="dateFormatHM"></el-table-column>
            <el-table-column prop="birthday" align="center" label="出生日期"
                             :formatter="dateFormatHM"></el-table-column>
            <el-table-column prop="employType" align="center" label="用工类型"></el-table-column>
            <el-table-column prop="status" align="center" label="状态"></el-table-column>
            <el-table-column prop="discountMoney" align="center" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            v-if="stafEdit"
                            @click="upLine(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            plain
                            v-if="stafDetailInfo"
                            @click="offLine(scope.$index, scope.row)">详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <el-pagination
                background
                layout="total,prev, pager, next,sizes"
                :total="total"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10,20,30,50]"
                :current-page="currentPage"
                class="text_right"
        ></el-pagination>
    </div>
</template>

<script>
    import moment from 'moment'
    // import {login} from "../../js";

    export default {
        name: "staffManagement",
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            // if (jurisdictions[1].menus.length == 13) {
                // alert(1)
                // console.log(jurisdictions[1].menus[5].choose);
                this.staffAdded = jurisdictions[1].menus[5].choose; //新增
                this.stafEdit = jurisdictions[1].menus[6].choose;  //编辑
                this.stafDetailInfo = jurisdictions[1].menus[7].choose;  //详情
                this.stafImport = jurisdictions[1].menus[8].choose; //导入
                this.stafExport = jurisdictions[1].menus[9].choose; //导出

            // }
            this.partition = jurisdictions[13].menus[0].choose;
            this.token = user.result.token;
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region', JSON.stringify({
                token: this.token,
            })).then(run => {
                this.arr = run.body.result
            })

            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', JSON.stringify({
                token: this.token,
                pid: 0,
            })).then(run => {
                console.log(run);
                if (run.body.errcode == 0) {

                    this.list = run.body.result.deptList
                }
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getUniqueDeptList', JSON.stringify({
                token: this.token,
            }), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.deptName = res.body.result;
            })


            if (sessionStorage.getItem('staffManagementCurrentPage') != null) {
                let currentPages = Number(sessionStorage.getItem('staffManagementCurrentPage'));
                let totals = Number(sessionStorage.getItem('staffManagementtotal'));
                let condition = sessionStorage.getItem('staffManagementCondition');

                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
            }
            this.ajax()
        },
        data() {
            return {
                formInline: {
                    deptNameid: ''
                },
                tableData: [],
                list: '',
                arr: '',
                deptName: '',
                total: 0,
                currentPage: 1,
                pagesize: 10,
                show0: true,
                //导出
                queryStatus: true,
                //进度条
                ProgressBar: 0,
                fullscreenLoading: false,
                staffAdded: false,
                stafEdit: false,
                stafDetailInfo: false,
                stafImport: false,
                stafExport: false,
                partition: false,
            }
        },
        methods: {
            Export() {

                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord', JSON.stringify({
                    "token": this.token,
                    "exportName": "employee",
                    "t.region_name": this.formInline.regionId,
                    "t.filiale_name": this.formInline.filialeId,
                    "t.employee_no": this.formInline.employeeNo,
                    "t.dept_name": this.formInline.deptNameid,
                    "t.name": this.formInline.name,
                    "t.employ_type": this.formInline.employType,
                    "t.duty": this.formInline.duty,
                    "t.status": this.formInline.status,
                })).then(run => {
                    console.log(run);
                    if (run.body.errcode == 0) {
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar = 0,
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
            ajax() {
                let page = JSON.stringify({
                    token: this.token,
                    pageSize: this.pagesize,
                    pageNum: this.currentPage,
                    employeeNo: this.formInline.employeeNo,
                    regionName: this.formInline.regionId,
                    filialeName: this.formInline.filialeId,
                    deptName: this.formInline.deptNameid,
                    duty: this.formInline.duty,
                    name: this.formInline.name,
                    employType: this.formInline.employType,
                    status: this.formInline.status
                })
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/employee/list', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.data.errcode == 0) {
                        this.total = res.data.result.total
                        this.tableData = res.data.result.list
                    } else {
                        this.$message({
                            message: res.body.message,
                            type: 'warning'
                        });
                    }
                })
                if (sessionStorage.getItem('staffManagementCurrentPage') != null && sessionStorage.getItem('staffManagementCurrentPage') != null) {
                    //删除本地
                    sessionStorage.removeItem('staffManagementCurrentPage');
                    sessionStorage.removeItem('staffManagementCondition');
                    sessionStorage.removeItem('staffManagementtotal');
                    //存储本地
                    sessionStorage.setItem('staffManagementCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('staffManagementtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('staffManagementCondition', JSON.stringify(this.formInline));
                } else {
                    //存储本地
                    sessionStorage.setItem('staffManagementCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('staffManagementtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('staffManagementCondition', JSON.stringify(this.formInline));
                }
            },
            onSubmit() {
                this.currentPage = 1
                this.ajax()
            },
            upLine(index, row) {
                // console.log(row);
                // compile
                this.$router.push({path: '/AddedstaffManagement', query: {'type': 'compile', 'no': row.id}})
                // this.$router.push({path: '/AddedstaffManagement'})
            },
            offLine(index, row) {
                this.$router.push({path: '/AddedstaffManagement', query: {'type': 'Details', 'no': row.id}})
            },
            // 分页
            handleSizeChange(val) {
                this.pagesize = val;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax();
            },
            onfilialeId() {
                this.formInline.deptNameid = '';
                let id;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].deptName == this.formInline.filialeId) {
                        id = this.list[i].id
                    }
                }
                let page = JSON.stringify({
                    token: this.token,
                    // id: id,
                });
                console.log(page);
                if (this.formInline.filialeId != '') {
                    this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId', page, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        this.deptName = res.body.result.deptList;
                    })
                } else {
                    this.deptName = []
                }
            },
            dateFormatHM: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            onSubmit1() {
                window.location.href = this.global.lightningUrl + '/companyv1/userManage/employee/download/template'
            },
            handleChange(file, fileList) {
                console.log(file);
                console.log(fileList);
                if (fileList.length != []) {
                    this.show0 = false;
                    if (fileList.length > 1) {
                        fileList.splice(0, 1);
                    }
                }
            },
            remove(file, fileList) {
                console.log(3);
                console.log(file);
                console.log(fileList);
                if (fileList.length == 1) {
                    this.show0 = true;
                }
            },
            uploadSuccess(response, file, fileList) {
                console.log('上传文件', response)
            },
            uploadErrorr(response, file, fileList) {
                console.log('上传失败，请重试！', response)
            },
            beforeUpload(file) {
                let _this = this;
                const extension = file.name.split('.')[1] === 'xls';
                const extension2 = file.name.split('.')[1] === 'xlsx';
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!extension && !extension2) {
                    console.log('上传模板只能是 xls、xlsx 格式!');
                    _this.$message.error('上传模板只能是 xls、xlsx 格式');
                    return extension || extension2
                }
                if (!isLt2M) {
                    console.log('上传模板大小不能超过 10MB!');
                    _this.$message.error('上传模板大小不能超过 10MB!');
                    return isLt2M
                }
                let formdata = new window.FormData();
                // formdata.append('token',this.users.result.token);
                formdata.append('file', file);
                // formdata.append('customerId',Number(sessionStorage.getItem('webCustomerId')));
                //此处必须设置为  multipart/form-data
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=UTF-8'  //之前说的以表单传数据的格式来传递fromdata
                    }
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/employee/import', formdata, config).then(res => {
                    //做处理
                    console.log(res);
                    // setTimeout((res) => {
                    if (res.data.errcode === 0) {
                        // setTimeout((res)=>{
                        this.ajax();

                        _this.$message.success(res.body.message);
                        // },2000)
                        _this.contents();
                        timess = setInterval(function () {
                            _this.contents();
                        }, 8000);
                        _this.istrue = true
                    } else {
                        _this.$message.error(res.data.message);
                    }
                    // }, 2000)
                    console.log(res)
                }).catch(error => {
                });
                _this.istrue = false;
                return false;
            },
            submitUpload() {
                let files = document.getElementsByClassName('el-upload__input')[0].files;
                if (!files.length) {
                    this.$message.warning('请先选择上传的文件!');
                }
                if (this.isImport) {
                    this.$message.warning('文件解析中,请稍等...');
                    return;
                }
                this.$refs.upload.submit();
            },

        },
    }
</script>

<style lang="scss" scoped>
    .staffManagement {
        .header {
            margin-bottom: 20px;
        }
        .flr {
            float: right;
        }
    }
</style>