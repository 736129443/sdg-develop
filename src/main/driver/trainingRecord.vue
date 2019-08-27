<template>
    <div class="trainingRecord main">
        <div class="header">
            当前位置：司机线下培训 > <span>{{this.$route.query.type == 'before'?'岗前培训记录':'上岗培训记录'}}</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="管理区">
                <el-select v-model="formInline.managementArea" placeholder="选择管理区">
                    <el-option
                            v-for="item in areas"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属分公司">
                <el-select v-model="formInline.branchOffice" placeholder="选择分公司">
                    <el-option
                            v-for="item in branchOffices"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="培训讲师">
                <el-input v-model="formInline.lecturerName" placeholder="输入培训讲师姓名"></el-input>
            </el-form-item>

            <el-form-item label="司机姓名">
                <el-input v-model="formInline.driverName" placeholder="输入司机姓名"></el-input>
            </el-form-item>

            <el-form-item label="司机电话">
                <el-input v-model="formInline.driverPhone" placeholder="输入司机电话"></el-input>
            </el-form-item>

            <el-form-item label="培训方式">
                <el-select v-model="formInline.trainingMode" placeholder="选择培训方式">
                    <el-option
                        v-for="item in modes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="培训时间">
                <el-date-picker
                        v-model="formInline.dateTime"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onExport" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverTrainExport">导出</el-button>
                <el-progress type="circle" :percentage="ProgressBar" color="#8e71c7" v-if="fullscreenLoading" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="id"
                    label="编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="regionName"
                    label="管理区"
                    >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="filialeName"
                    label="分公司">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="teacher"
                    label="培训讲师">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="trainWay"
                    :formatter="filterWay"
                    label="培训方式">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="trainTime"
                    :formatter="filterTime"
                    label="培训时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="driver"
                    :formatter="filterDriver"
                    label="司机(电话)">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="creatorName"
                    label="录入人">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="createTime"
                    :formatter="filterTime1"
                    label="录入时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import {getTime} from '../../js/listWarehouse';
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    export default {
        name: "trainingRecord",
        data() {
            return {
                driverTrainExport:'',
                modes:[{
                    value: 'scene',
                    label: '现场'
                }, {
                    value: 'wechat',
                    label: '微信'
                }, {
                    value: 'phone',
                    label: '电话'
                }, {
                    value: 'video',
                    label: '视频'
                }, {
                    value: 'other',
                    label: '其他'
                }],
                tableData: [],
                areas:[],
                branchOffices:[],
                formInline: {
                    managementArea: '',
                    branchOffice:'',
                    lecturerName:'',
                    driverName:'',
                    driverPhone:'',
                    trainingMode:'',
                    dateTime: ''
                },
                currentPage: 1,
                total:4,
                pageSize:10,
                clearSetInterval:null,
                fullscreenLoading: false,
                ProgressBar:0,
            }
        },
        methods: {
            deleteRow(id){
                let obj = JSON.stringify({
                    token:this.token,
                    id:id
                });

                this.$confirm('删除后司机培训记录将同步删除', '确认是否删除?', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.post(this.global.lightningUrl + "/companyv1/driverManage/driver/train/delete", obj, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        }
                    )
                        .then((res) => {
                            console.log(res)
                            if (res.data.errcode === 0) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                this.init();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            progressResults(data) {
                this.$http.post(this.global.lightningUrl + "/companyv1/exportCenter/export/exportProcess", data, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        }
                    )
                    .then((res) => {
                        console.log(res)
                        data = null;
                        this.ProgressBar = parseInt(res.data.result.exportProcess);
                        if (res.data.result.exportProcess == 100) {
                            clearInterval(this.clearSetInterval);
                            setTimeout(()=> {
                                window.location.href = res.data.result.externalRoad;
                                this.fullscreenLoading = false;
                                this.$message({
                                    message: '导出成功',
                                    type: 'success'
                                });
                                this.fullscreenLoading = false;
                            },2000)

                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            onExport(){
                let time = null;
                if (this.formInline.dateTime == '' || this.formInline.dateTime == null){
                    time = '';
                }else {
                    let startTime =  this.formInline.dateTime[0];
                    let endTime = this.formInline.dateTime[1]+86400000-1;
                    time = 'between '+ startTime +' and '+ endTime;
                }
                let exportInfo = JSON.stringify({
                    "token":this.token,
                    "exportName":"driverTrain",
                    "r.id":this.formInline.managementArea,
                    "a.filiale_id":this.formInline.branchOffice,
                    "t.teacher":this.formInline.lecturerName,
                    "d.name":this.formInline.driverName,
                    "d.phone":this.formInline.driverPhone,
                    "t.train_way":this.formInline.trainingMode,
                    "t.train_time":time,
                    "t.type":this.$route.query.type
                });
                this.$http.post(this.global.lightningUrl+'/companyv1/exportCenter/export/exportRecord', exportInfo, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.fullscreenLoading = true;
                    let infos = JSON.stringify({
                        token: this.token,
                        id: res.data.result
                    });
                    this.clearSetInterval = setInterval(() => {
                        this.progressResults(infos);
                    }, 1000);
                }).catch((error)  => {
                    console.log(error);
                });
            },
            filterWay(row){
                switch(row.trainWay) {
                    case 'scene':
                        return '现场';
                    case 'wechat':
                        return '微信';
                    case 'phone':
                        return '电话';
                    case 'video':
                        return '视频';
                    case 'other':
                        return '其他';
                    default:
                        return '';
                }
            },
            filterDriver(row){
                return `${row.driverName}(${row.phone})`;
            },
            filterTime(row) {
                return getTime(row.trainTime);
            },
            filterTime1(row){
                return getTime(row.createTime);
            },
            // 大区接口
            initArea() {
                let parame = JSON.stringify({
                    token: this.token
                });
                this.$http.post(this.global.lightningUrl +
                        "/companyv1/userManage/region/all_region", parame, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        }
                    )
                    .then(res => {
                        console.log(res);
                        this.areas = res.data.result;
                        this.areas.unshift({
                            name: "全国",
                            id: ''
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 分公司接口
            initBranchOffice() {
                let parame = JSON.stringify({
                    token: this.token
                });
                this.$http.post(this.global.lightningUrl +
                        "/companyv1/driverManage/driver/get_filiale_list", parame, {
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        }
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data.errcode === 0) {
                            this.branchOffices = res.data.result;
                            this.branchOffices.unshift({
                                deptName: "全部",
                                id: ''
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            onSubmit() {
                if(this.formInline.lecturerName != ''){
                    if(!(/^[\u4e00-\u9fa5]{2,10}$/.test(this.formInline.lecturerName))){
                        this.$message({
                            message: '培训讲师为中文2-10个字符',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if(this.formInline.driverName != ''){
                    if(!(/^[\u4e00-\u9fa5]{2,10}$/.test(this.formInline.driverName))){
                        this.$message({
                            message: '司机姓名为中文2-10个字符',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if(this.formInline.driverPhone != ''){
                    if(!(/^\d{1,11}$/.test(this.formInline.driverPhone))){
                        this.$message({
                            message: '司机电话为电话号为1-11位有效数字',
                            type: 'warning'
                        });
                        return;
                    }
                }
                console.log(0)
                this.init();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.init();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.init();
            },

            init(){
                let info = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    regionId:this.formInline.managementArea,
                    filialeId:this.formInline.branchOffice,
                    teacher:this.formInline.lecturerName,
                    driverName:this.formInline.driverName,
                    phone:this.formInline.driverPhone,
                    trainWay:this.formInline.trainingMode,
                    trainTimeStart:this.formInline.dateTime == null || this.formInline.dateTime == "" ? "" : this.formInline.dateTime[0],
                    trainTimeEnd:this.formInline.dateTime == null || this.formInline.dateTime == ""? "" : this.formInline.dateTime[1] + 86400000 - 1,
                    type:this.$route.query.type
                });
                this.$http.post(this.global.lightningUrl+'/companyv1/driverManage/driver/train/list', info, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.data.errcode === 0 && res.data.result.total !== 0){
                        this.tableData = res.data.result.list;
                        this.total = res.data.result.total;
                    }else{
                        this.tableData = res.data.result.list;
                        this.total = res.data.result.total;
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }
                }).catch((error)  => {
                    console.log(error);
                });
            }
        },
        mounted(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // 'driverTrainImport':'司机培训导入','driverTrainExport':'司机培训导出'?
            this.driverTrainExport = F_jurisdiction('driverTrainExport',jd)
            this.initArea();
            this.initBranchOffice();
            this.modes.unshift({
                label: "全部",
                value: ''
            });
            this.init();

        }
    }
</script>

<style scoped lang="scss">
  .trainingRecord{
      width: 100%;
      padding: 30px;
      .header {
          margin-bottom: 20px;
          font-size: 16px;
      }
  }
</style>