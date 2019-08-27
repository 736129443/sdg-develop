<template>
    <div class="main">
        <div class="header">
            当前位置： 财务管理> 保险账单
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="配送日期">
                    <el-date-picker
                            width="110"
                            v-model="formInline.Registration"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="所在分公司">
                    <el-select v-model="formInline.areaId" placeholder="请选择">
                        <!--<el-option v-for="i in link" :label='i.areaName' :value="i.allId" :key="i.allId"></el-option>-->
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="常跑城市">-->
                    <!--<el-input v-model.trim="formInline.single" placeholder="常跑城市"></el-input>-->
                <!--</el-form-item>-->

                    <el-form-item label="出车单号">
                        <el-input v-model.trim="formInline.trackId" placeholder="出车单号"></el-input>
                    </el-form-item>


                    <el-form-item label="状态">
                        <el-select v-model="formInline.state" placeholder="用户类别">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已支付" value="1"></el-option>
                            <el-option label="已取消" value="0"></el-option>
                        </el-select>
                    </el-form-item>

                    <!--<el-form-item label="用户类别">-->
                    <!--<el-select v-model="formInline.category" placeholder="用户类别">-->
                        <!--<el-option label="全部" value=""></el-option>-->
                        <!--<el-option label="客户" value="customer"></el-option>-->
                        <!--<el-option label="司机" value="driver"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="险种">-->
                    <!--<el-select v-model="formInline.type" placeholder="险种">-->
                        <!--<el-option label="全部" value=""></el-option>-->
                        <!--<el-option label="畅心保高价值货物险" value="畅心保高价值货物险"></el-option>-->
                        <!--<el-option label="畅心保车载险" value="畅心保车载险"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" @click="Export()" v-if="insuranceBillExport==true?true:false">导出</el-button>

                </el-form-item>
            </el-form>
            <el-table
                    :data="arr"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        align="center"
                        :formatter="dateFormatHm"
                        prop="beginVehicleTime"
                        label="配送日期"
                >
                </el-table-column>
                <el-table-column
                        prop="regionName"
                        label="管理区"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="filialeName"
                        label="所在分公司"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="insurancePrice"
                        label="保费金额(元)"
                >
                </el-table-column>
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="releaseCarTime"-->
                        <!--:formatter="dateFormatHm"-->
                        <!--label="出车时间"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        prop="trackId"
                        label="出车单号"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="customerName"
                        label="项目名称"
                >
                </el-table-column>
                <el-table-column
                align="center"
                prop="insuranceName"
                label="险种"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="userType"
                    label="用户类别"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="isEffective"
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="insuranceOut"
                        label="是否出险"
                >
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页插件 -->
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    export default {
        data() {
            return{
                link:'',
                time:'',
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                token:'',
                arr:[],
                formInline:{
                    Registration:'',
                    // category:'',
                    // type:'',
                    trackId:'',//出车单
                    state:''//支付状态
                },
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数

                insuranceBillExport:false,
                startTime:'',
                endTime:''
            }
        },
        created() {
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
                // this.insuranceList = jurisdictions[7].menus[16].choose
                this.insuranceBillExport = jurisdictions[7].menus[23].choose
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                console.log(res);
                this.link = res.body.result;
            })
            this.data();
        },
        methods:{
            //时间的格式转换
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //查询
            query(){
                if(this.formInline.Registration == null){
                    this.formInline.Registration = []
                }
                this.currentPage = 1
                // this.formInline.state = 1
                this.data();
            },
            //导出
            Export(){
                let page = JSON.stringify({
                    "token":this.token,
                    "id1":this.formInline.Registration!=null?this.formInline.Registration[0]:undefined,
                    "id2":this.formInline.Registration!=null?this.formInline.Registration[1]+86400000-1:undefined,
                    // "userType":this.formInline.category,
                    // "insuranceName":this.formInline.type,
                    'id3': this.formInline.state ,//状态
                    'id4':this.formInline.trackId,//id
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    id5:this.formInline.areaId
                })
                console.log(page);
                var exportLink = this.global.lightningUrl + '/companyv1/insurance/report/export/back_round_ins_list';
                openPostWindow(exportLink,page);

            },
            //页面首次刷新
            data() {
                if (this.formInline.trackId.match(/^[0-9]*$/)) {
                    this.$http.post(this.global.lightningUrl + '/companyv1/insurance/customerDriverList', JSON.stringify({
                        "token":this.token,
                        "id1":this.formInline.Registration!=null?this.formInline.Registration[0]:undefined,
                        "id2":this.formInline.Registration!=null?this.formInline.Registration[1]+86400000-1:undefined,
                        // "userType":this.formInline.category,
                        // "insuranceName":this.formInline.type,
                        'id3':this.formInline.state,//状态
                        'id4':this.formInline.trackId,//id
                        'pageNum':this.currentPage,
                        'pageSize':this.pagesize,
                        id5:this.formInline.areaId
                        // id1 id2 时间
                        // id3 状态 已支付 已取消
                        // id4 出车单编号
                    }),{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        console.log(res);
                        if (res.body.errcode == 0) {
                            this.arr = res.body.result.rows;
                            for (var i in this.arr) {
                                if (this.arr[i].userType == 'driver'){
                                    this.arr[i].userType = "司机"
                                }else if(this.arr[i].userType == 'customer'){
                                    this.arr[i].userType = "客户"
                                }
                                if(this.arr[i].isEffective == 0 ){
                                    this.arr[i].isEffective = '已取消'
                                }else{
                                    this.arr[i].isEffective = '已支付'
                                }
                            }
                            this.total = res.body.result.total;
                            console.log(this.arr)
                        }
                    });
                }else{
                    this.$message({
                        message: '编号只能输入数字',
                        type: 'error'
                    });
                }

            },
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage);
                this.data();
            },
            //分页结束
        }
    }
</script>
<style scoped lang="scss">
    .main{
        width:100%;
        .dv {
            margin-top: 20px;
        }
    }

</style>