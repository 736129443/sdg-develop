<template>
    <div class="main driverbill">
        <div class="header">
            当前位置：<span>财务管理 > 司机财务</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="forminline" class="demo-form-inline">
                <el-form-item label="司机编号">
                    <el-input v-model.trim="forminline.driverId" placeholder="请输入司机编号" class="list_driver" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="所在分公司">
                    <el-select v-model="forminline.areaId" placeholder="请选择所管理区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理区">
                    <el-select v-model="forminline.regionId" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in lists" :label='i.name' :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model.trim="forminline.driverName" placeholder="请输入司机姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="司机手机号">
                    <el-input v-model.trim="forminline.phone" placeholder="请输入司机手机号" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="运营专员">
                    <el-input v-model.trim="forminline.currentDeveAdminName" placeholder="请输入运营专员" class="list_driver" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="所属车队">
                    <el-input v-model.trim="forminline.teamName" placeholder="请输入所属车队" class="list_driver" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="司机类型">
                        <el-select v-model="forminline.driverType" placeholder="请选择账户状态" >
                            <el-option label="全部" value=""></el-option>
                            <el-option label="车队司机" value="team"></el-option>
                            <el-option label="运输公司" value="company" ></el-option>
                            <el-option label="个体司机" value="personal"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="账户状态">
                    <el-select v-model="forminline.accountStatus" placeholder="请选择账户状态" >
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常" value="normal" ></el-option>
                        <el-option label="冻结" value="all"></el-option>
                        <el-option label="资金冻结" value="capital"></el-option>
                        <el-option label="账号冻结" value="account"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出车日期">
                    <el-date-picker
                            v-model="forminline.time"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>

                    <el-button type="primary" @click="Export()" v-if="driverFinancialExport">导出</el-button>
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                    <!--<el-button  @click="onSubmit0" type="primary" v-if="limit==1 || limit==2?true:false">调账记录</el-button>-->
                    <!--<el-button  @click="onSubmit0" type="primary" >调账记录</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="driverId"
                    label="司机编号"
                    align="center"
                    >
                <!--<template slot-scope="scope">-->
                    <!--<div @click="examine(scope.$index)">-->
                        <!--&lt;!&ndash;<router-link to="sjmessage" style="color:#409EFF;">{{ arr[scope.$index].driverId }} </router-link>&ndash;&gt;-->
                        <!--<a style="color: rgb(102,177,255);cursor: pointer;"  >{{ tableData[scope.$index].driverId }}</a>-->
                    <!--</div>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                    prop="regionName"
                    label="管理区"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="filialeName"
                    label="所属分公司"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="司机姓名"
                    align="center"
                   >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    align="center"
                    label="司机手机号"
                    >
            </el-table-column>
            <el-table-column
                    prop="vehicleType"
                    label="车型"
                    align="center"
                >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="vehicleNum"-->
                    <!--align="center"-->
                    <!--label="车牌号"-->
                    <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="driverType"
                    label="司机类型"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="teamName"
                    label="所属车队"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="currentDeveAdminName"
                    label="运营专员"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="lastDate"
                    label="最后出车日期"
                    :formatter="dateFormat"
                    align="center"
            >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="cashBalance"-->
                    <!--label="可提现金额(元)"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="preBalance"-->
                    <!--label="预出账金额(元)"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="isPayDeposit"
                    label="押金"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="accountStatus"
                    label="账户状态"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="accountStatus"
                    label="财务明细"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button  type="text" size="small"  @click="examine(scope.$index)" v-if="driverAccountDetail == true?true:false">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    style="display: none"

            >
                <template slot-scope="scope">

                    <span  v-if="driverFreeze == true?true:false">
                    <el-button type="text" size="small" @click="onfreeze(scope.$index)" v-if="like[scope.$index] == true ? false:true " >冻结</el-button>
                    <el-button type="text" size="small" @click="onfreeze_cancle(scope.$index)"  v-if="like[scope.$index] == true ? true:false ">取消冻结</el-button>
                        </span>
                    <!--<el-button  type="text" size="small" v-if="driverReconciliation" @click="AdjustmentCodes(scope.$index)" >调账</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-form ref="form" :model="ruleForm" label-width="80px">
            <el-form-item label="冻结" class="is-required">
                <el-radio v-model="ruleForm.resource" label="capital">冻结资金</el-radio>
                <el-radio v-model="ruleForm.resource" label="account">冻结账号</el-radio>
            </el-form-item>
            <el-form-item label="冻结时间" class="is-required">
            <el-select v-model="ruleForm.region" placeholder="请选择" >
                <el-option label="一个月" value='0'></el-option>
                <el-option label="二个月" value='1'></el-option>
                <el-option label="三个月" value='2'></el-option>
                <el-option label="永久" value='-1'></el-option>
            </el-select>
            </el-form-item >
                <el-form-item label="冻结原因" class="is-required">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
        <!--取消冻结弹出-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible_cancle"
                width="30%"
        >
            <el-form ref="ruleForm2" :model="ruleForm2" label-width="100px" :rules="rules">
                <el-form-item label="取消">
                    <el-radio v-model="ruleForm2.resource" label="capital">资金</el-radio>
                    <el-radio v-model="ruleForm2.resource" label="account">账号</el-radio>
                </el-form-item>

                <el-form-item label="冻结原因"  prop="desc" class="is-required">
                    <el-input type="textarea" v-model="ruleForm2.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel_cancal">取 消</el-button>
                <el-button type="primary" @click="save_cancal('ruleForm2')">确 定</el-button>
            </span>
        </el-dialog>
        <!--调账-->
        <el-dialog
                title="司机调账"
                :visible.sync="adjustment"
                width="30%"
                center>
            <el-form :model="adjustmentruleForm" :rules="adjustmentrules" ref="adjustmentruleForm" label-width="150px" class="demo-ruleForm adjustment">
                <el-form-item label="司机姓名" >
                    <el-input v-model="adjustmentruleForm.drivername" readonly></el-input>
                </el-form-item>
                <el-form-item label="运营专员" >
                    <el-input v-model="adjustmentruleForm.capacity" readonly></el-input>
                </el-form-item>
                <el-form-item label="预出账总金额" >
                    <el-input v-model="adjustmentruleForm.resultMoney" readonly></el-input>
                </el-form-item>
                <el-form-item label="调账金额" prop="money">
                    <el-input v-model="adjustmentruleForm.money" @input="onadjustment"></el-input>
                </el-form-item>
                <el-form-item label="调账后预出账金额" >
                    <el-input v-model="adjustmentruleForm.money_a" readonly></el-input>
                </el-form-item>
                <el-form-item label="调账原因" prop="opinion">
                    <el-input
                            type="textarea"
                            resize="none"
                            placeholder="请输入内容"
                            v-model="adjustmentruleForm.opinion">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="adjustment = false,resetForm('adjustmentruleForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('adjustmentruleForm')">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
export default {
    data() {
        let validatePass4 = ( rule, value, callback ) => {
            if (value === '') {
                callback(new Error('请输入原因'));
            }else {
                callback()
            }
        };

        return {
            token:'',
            arr:'',
            total:0,
            //数据
            tableData:[],
            currentPage:1,
            pagesize:10,//每页的数据条数
            forminline:{
                driverId:'',
                driverName:'',
                phone:'',
                areaId:'',
                accountStatus : '',
                currentDeveAdminName:'',
                driverType:'',
                teamName:'',
                type:'',
                time:[],
            },
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogVisible_cancle : false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            // formLabelWidth: '120px',
            ruleForm:{
                resource:'capital',
                region:'0',
                desc:'',
            },
            dialogVisible: false,
            limit:'',
            link:[],
            freeze:{
                driverId:'',
            },
            ruleForm2:{
                resource:'capital',
                desc:'',
            },
            rules: {
                desc: [
                    // { required: true, message: '请输入原因', trigger: 'blur'},
                    { pattern: /(^\S{1,225}$)/,message: '原因不能为空' , trigger: 'blur'},
                    { validator: validatePass4, trigger: 'blur' },
                ],
            },
            driverAccountDetail:false,
            driverFreeze:'',
            like:[],
            currentPages:'',
            condition:'',
            totals:'',
            lists:'',
            // 导出  =====S--------
            fullscreenLoading: false,
            trackManageListExport:false,
            ProgressBar:0,
            queryStatus:true,
            // --------------E----------
            driverFinancialExport:false,
            adjustment:false,
            adjustmentruleForm:{},
            adjustmentrules:{
                money:[
                    { required: true, message: '请输入金额', trigger: 'blur' },
                    { pattern: /(^-[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^-[0-9]\.[0-9]([0-9])?$)/,message: '只能输入负数,或小数点后两位' },
                ],
                opinion:[
                    { required: true, message: '请输入原因', trigger: 'blur' },
                    {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，.、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' },
                ]
            },
            driverReconciliation:false

        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.driverAccountDetail = jurisdictions[7].menus[2].choose;
            this.driverFreeze = jurisdictions[7].menus[4].choose;
            this.driverFinancialExport = jurisdictions[7].menus[1].choose;
        // if (jurisdictions[7].menus.length == 30 ){
            this.driverReconciliation = jurisdictions[7].menus[27].choose;

        // }
        this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            this.link = run.body.result;
            console.log(this.ids);
        })
        this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            this.lists = run.body.result
        })

        if(sessionStorage.getItem('driverbillCurrentPage')!=null){
            this.currentPages = Number(sessionStorage.getItem('driverbillCurrentPage'));
            this.totals = Number(sessionStorage.getItem('driverbilltotal'));
            this.condition = sessionStorage.getItem('driverbillcondition');
            this.forminline = JSON.parse(this.condition)
            this.currentPage = this.currentPages;
            this.total = this.totals;
            //查询接口
            this.requestTurnout()
        }else {
            this.data();
        }
    },
    methods:{
        Export(){
            let page = JSON.stringify({
                token:this.token,
                driverId : this.forminline.driverId,
                filialeId : this.forminline.areaId,
                driverName : this.forminline.driverName,
                phone : this.forminline.phone,
                currentDeveAdminName : this.forminline.currentDeveAdminName,
                accountStatus : this.forminline.accountStatus,
                teamName : this.forminline.teamName,
                driverType : this.forminline.driverType,
                regionId :this.forminline.regionId,
                trackStartTime :this.forminline.time != null?this.forminline.time[0]:undefined,
                trackEndTime : this.forminline.time != null?this.forminline.time[1]+1000*60*60*24-1:undefined
            })
            var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/driver_info';
            openPostWindow(exportLink,page)
            // let filialeName;
            // let regionName;
            // for (let i = 0; i < this.link.length; i++) {
            //     if (this.forminline.areaId == this.link[i].filialeId) {
            //         filialeName = this.link[i].filialeName
            //     }
            // }
            // for (let i = 0; i < this.lists.length; i++) {
            //     if (this.forminline.regionId == this.lists[i].id) {
            //         regionName = this.lists[i].name
            //     }
            // }
            // this.$message({
            //     showClose: true,
            //     message: '正在导出请耐心等待！',
            //     type: 'warning'
            // });
            // this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
            //     "token":this.token,
            //     "exportName":"driverFinance",        //-- 导出模块名称
            //     "tt.driver_id":this.forminline.driverId,          // -- 司机编号
            //     "tt.filiale_name":filialeName,         //-- 所在分公司
            //     "tt.region_name":regionName,            //-- 管理区
            //     "tt.name":this.forminline.driverName,   //-- 司机姓名
            //     "tt.phone":this.forminline.phone,              // -- 司机手机号
            //     "tt.current_deve_admin_name":this.forminline.currentDeveAdminName,  //-- 运营专员
            //     "tt.team_name":this.forminline.teamName,                 //-- 所属车队
            //     "tt.driver_type":this.forminline.driverType,//-- 司机类型   'team':'车队司机'  'company':'运输公司'  'personal':'个体司机'
            //     "tt.account_status":this.forminline.accountStatus             //-- 账户状态   'normal':'正常'  'account':'账户冻结'  'capital':'资金冻结'
            //
            // })).then(run=>{
            //     console.log(run);
            //     if(run.body.errcode == 0){
            //         this.fullscreenLoading = true;
            //         this.queryStatus = false;
            //         this.ProgressBar = 0;
            //         this.code = run.body.result;
            //         this.interval = setInterval(() => {
            //             this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
            //                 "token":this.token,
            //                 "id":this.code,
            //             })).then(run=>{
            //                 console.log(run);
            //                 if(run.body.errcode == 0){
            //                     this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
            //                     if (this.ProgressBar == 100){
            //                         clearInterval(this.interval);
            //                         setTimeout(()=> {
            //                             window.location.href = run.body.result.externalRoad;
            //                             this.$message({
            //                                 message: '导出成功',
            //                                 type: 'success'
            //                             });
            //                             this.fullscreenLoading = false;
            //                             this.queryStatus = true;
            //                         },1200)
            //                     }
            //                 }
            //             })
            //         },1000);
            //     }else {
            //         this.$message({
            //             showClose: true,
            //             message: run.body.message,
            //             type: 'error'
            //         });
            //     }
            // })
        },
        //请求
        ajax(){
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                driverId : this.forminline.driverId,
                filialeId : this.forminline.areaId,
                driverName : this.forminline.driverName,
                phone : this.forminline.phone,
                currentDeveAdminName : this.forminline.currentDeveAdminName,
                accountStatus : this.forminline.accountStatus,
                teamName : this.forminline.teamName,
                driverType : this.forminline.driverType,
                regionId :this.forminline.regionId,
                trackStartTime :this.forminline.time != null?this.forminline.time[0]:undefined,
                trackEndTime : this.forminline.time != null?this.forminline.time[1]+1000*60*60*24-1:undefined
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/driver_info' , page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                if( res.body.result!== null) {
                    this.total =res.body.result.total;
                    this.tableData = res.body.result.rows;
                    for (let i = 0 ; i < this.tableData.length; i++) {
                        this.like.push(false);

                        if (this.tableData[i].isPayDeposit == 0){
                            this.tableData[i].isPayDeposit = '未缴纳'
                        } else if (this.tableData[i].isPayDeposit == 1){
                            this.tableData[i].isPayDeposit = '已缴纳'
                        }else if (this.tableData[i].isPayDeposit == 2) {
                            this.tableData[i].isPayDeposit = '押金退款中'
                        }
                        if (this.tableData[i].driverType == 'team'){
                            this.tableData[i].driverType = '车队司机'
                        }else if (this.tableData[i].driverType == 'company'){
                            this.tableData[i].driverType = '运输公司'
                        }else if (this.tableData[i].driverType == 'personal'){
                            this.tableData[i].driverType = '个体司机'
                        }
                            if ( this.tableData[i].accountStatus == 'capital' ) {
                                    this.like[i] = true
                                this.tableData[i].accountStatus = '资金冻结'
                            }else if (this.tableData[i].accountStatus == 'account' ) {
                                    this.like[i] = true
                                this.tableData[i].accountStatus = '账号冻结'
                            }else if (this.tableData[i].accountStatus == 'normal' ){
                                    this.like[i] = false
                                this.tableData[i].accountStatus = '正常'
                            }

                        //更新本地存储
                        if(sessionStorage.getItem('driverbillCurrentPage')!=null){
                            //删除本地
                            sessionStorage.removeItem('driverbillCurrentPage');
                            sessionStorage.removeItem('driverbillcondition');
                            sessionStorage.removeItem('driverbilltotal');
                            //存储本地
                            sessionStorage.setItem('driverbillCurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('driverbilltotal', JSON.stringify(this.total));
                            sessionStorage.setItem('driverbillcondition', JSON.stringify(this.forminline));
                        }else {
                            //存储本地
                            sessionStorage.setItem('driverbillCurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('driverbilltotal', JSON.stringify(this.total));
                            sessionStorage.setItem('driverbillcondition', JSON.stringify(this.forminline));
                        }
                    }

                }else {

                }

            })
        },

        data() {
            this.ajax()
            let page1 = JSON.stringify({
               token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                this.link = res.body.result;
            })
        },
        requestTurnout(){
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                driverId : this.forminline.driverId,
                filialeId : this.forminline.areaId,
                driverName : this.forminline.driverName,
                phone : this.forminline.phone,
                currentDeveAdminName : this.forminline.currentDeveAdminName,
                accountStatus : this.forminline.accountStatus,
                teamName : this.forminline.teamName,
                driverType : this.forminline.driverType,
                regionId :this.forminline.regionId,
            });
            this.ajax(page)
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.ajax()
        },
        handleSizeChange(val){
            this.pagesize = val;
            this.ajax()
        },
        onSubmit(){
            this.currentPage = 1
          this.ajax()
        },
        onfreeze(_index){
            this.freeze.driverId = this.tableData[_index].driverId;
            this.dialogVisible = true;
        },
        save(){
            if(this.ruleForm.desc !== ''){
                this.dialogVisible=false;
                let page = JSON.stringify({
                    token : this.token,
                    id : this.freeze.driverId,
                    freezeStatus :this.ruleForm.resource,
                    freezeTime : this.ruleForm.region,
                    freezeReason : this.ruleForm.desc,
                });
                this.$http.post( this.global.lightningUrl + '/companyv1/security/user/freeze',page,{
                    //     this.$http.post(  this.global.lightningUrl + '/company/account/frozen',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.$message({
                            message: '冻结成功',
                            type: 'success'
                        });
                        this.ajax()
                    }else {
                        this.$message({
                            message: '冻结失败，请稍后重试',
                            type: 'warning'
                        });
                    }
                })
            }else{
                this.$message({
                    message: '请填写冻结原因！',
                    type: 'warning'
                });
            }


        },
        cancel(){
            this.dialogVisible=false;
            this.ruleForm.resource='capital';
            this.ruleForm.region='0';
            this.ruleForm.desc='';
        },
        cancel_cancal(){
            this.dialogVisible_cancle=false;
            this.ruleForm2.resource = '';
            this.ruleForm2.desc = '';
        },
        save_cancal( form ){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.dialogVisible_cancle=false;
                        let page = JSON.stringify({
                            token : this.token,
                            id : this.freeze.driverId,
                            freezeStatus :'normal',
                            freezeType:this.ruleForm2.resource,
                            freezeReason : this.ruleForm2.desc,  //原因
                        });
                        this.$http.post( this.global.lightningUrl + '/companyv1/security/user/freeze',page,{
                        //     this.$http.post(  this.global.lightningUrl + '/company/account/companyunfrozenaccount',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        } ).then((res)=>{
                            if ( res.body.errcode == 0 ){
                                this.$message({
                                    message:res.body.message,
                                    type: 'success'
                                });
                                this.ajax()
                                // setTimeout(function(){
                                //     location.reload()
                                // },1000)
                            }else {
                                this.$message({
                                    message:res.body.message,
                                });
                            }

                        })
                    } else {
                        this.$message('请填写完整信息');
                        return false;
                    }
                });
        },
        examine(_index){
            if (this.driverAccountDetail) {
                let examinenamedriverType=this.tableData[_index];
                examinenamedriverType.examineid = '1'
                // let examinename = this.tableData[_index].name;
                //
                // let examineid = '1';
                // let examinephone = this.tableData[_index].phone;
                // let examinephonecurrentDeveAdminName = this.tableData[_index].currentDeveAdminName;
                // let examinephoneteamName = this.tableData[_index].teamName;
                sessionStorage.setItem('examinenameid',JSON.stringify({examinenamedriverType}));
                this.$router.push({path:'/driverFinanceExamine'});
            }

        },
        tz(_index){
            this.$router.push({path:'/driverFinanceExamine'});
            let examinenameid=this.tableData[_index].driverId;
            let examinename = this.tableData[_index].name;
            let examinephone = this.tableData[_index].phone;
            let examineid = '2';

            sessionStorage.setItem('examineid',JSON.stringify( this.limit));
            sessionStorage.setItem('examinenameid',JSON.stringify({ examinenameid , examinename,examinephone,examineid }));
        },
        onfreeze_cancle(_index){
            this.freeze.driverId = this.tableData[_index].driverId;
            this.dialogVisible_cancle = true;
        },
    //    调账
        AdjustmentCodes(_index){
            this.adjustmentruleForm.drivername = `${this.tableData[_index].name}(${this.tableData[_index].phone})`;
            this.adjustmentruleForm.capacity = `${this.tableData[_index].currentDeveAdminName}`;
            this.adjustmentruleForm.driverId = this.tableData[_index].driverId ;
            this.adjustmentruleForm.driverType = this.tableData[_index].driverType ;
            if (this.adjustmentruleForm.driverType== '车队司机'){
                this.adjustmentruleForm.driverType = 'Team'
            } else if (this.adjustmentruleForm.driverType== '运输公司'){
                this.adjustmentruleForm.driverType = 'Company'
            }else if (this.adjustmentruleForm.driverType== '个体司机'){
                this.adjustmentruleForm.driverType = 'Personal'
            }
            let page = JSON.stringify({
                token:this.token,
                driverId : this.tableData[_index].driverId ,
                driverType:this.adjustmentruleForm.driverType
            })
            this.$http.post(this.global.lightningUrl +'/companyv1/finance/queryPreutBanlanceWithAdjust',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                if (res.body.errcode == 0){
                    this.adjustmentruleForm.resultMoney = res.body.result ;
                    this.adjustment = true
                }
            })

        },
        onadjustment(){
            if ( Math.abs(this.adjustmentruleForm.money) >this.adjustmentruleForm.resultMoney) {
                this.$message({
                    message: '调账金额不能大于预出账总金额！',
                    type: 'warning'
                });
                this.adjustmentruleForm.money=''
                this.adjustmentruleForm.money_a = ''
            }else{
                if (this.adjustmentruleForm.money!='-'){
                    this.adjustmentruleForm.money_a = (this.adjustmentruleForm.resultMoney - Math.abs(this.adjustmentruleForm.money)).toFixed(2);
                }


            }
        },
    //    调账确定按钮
        submitForm(adjustmentruleForm) {
            this.$refs[adjustmentruleForm].validate((valid) => {
                if (valid) {
                    if (this.adjustmentruleForm.driverType== '车队司机'){
                        this.adjustmentruleForm.driverType = 'Team'
                    } else if (this.adjustmentruleForm.driverType== '运输公司'){
                        this.adjustmentruleForm.driverType = 'Company'
                    }else if (this.adjustmentruleForm.driverType== '个体司机'){
                        this.adjustmentruleForm.driverType = 'Personal'
                    }
                    let page = JSON.stringify({
                        token:this.token,
                        accountRegulation :this.adjustmentruleForm.money,
                        driverId:this.adjustmentruleForm.driverId,
                        reason : this.adjustmentruleForm.opinion,
                        driverType:this.adjustmentruleForm.driverType
                    }) ;
                    console.log(page);
                    this.$http.post(this.global.lightningUrl +'/companyv1/finance/driverbillwithoutTrackcommit',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        if (res.body.errcode== 0){
                            this.$message({
                                message: res.body.message,
                                type: 'success'
                            });
                            this.adjustmentruleForm.opinion = '';
                            this.adjustmentruleForm.money_a = ''
                            this.adjustmentruleForm.money = '';
                            this.adjustment = false ;
                        }else{
                            this.$message.error(res.body.message);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(adjustmentruleForm) {
            this.$refs[adjustmentruleForm].resetFields();
            this.adjustmentruleForm.money_a = ''
        }
    }
}
</script>
<style lang="scss" scoped >
.main{
    /*.el-input{*/
        /*width: 158px!important;*/
    /*}*/
    .dv {
        margin-top: 20px;
    }
    .el-pagination {
        padding-top: 20px ;
        text-align: center;
    }
    .required:before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
        vertical-align:top;
    }
    .db_d{
        display:inline-block;
        width: 70px;
        padding-bottom: 20px;
        text-align: left;
        vertical-align:top;
    }
    .el-form{
        text-align: left;
    }
    .el-button+.el-button{
        margin: 0;
    }
    .el-form--inline .el-form-item{
        margin-right: 8px;
    }

}
    .driverbill{
        .adjustment{
            .el-input{
                width: 200px;

            }
        }
    }
</style>
