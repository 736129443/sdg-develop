<template>
    <div class="main">

        <div class="header">
            <p>
                当前位置：财务管理 > 客户财务 > <span v-if="userId.number == 0">申请出账</span><span v-if="userId.number != 0">查看</span>
            </p>
        </div>
        <div style="background-color: white;padding: 30px;box-sizing: border-box">
            <span style="float: left; display: block;height: 40px;line-height: 40px">账单周期&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; </span>
            <el-select v-model="istime" placeholder="请选择账单周期" >
                <el-option v-for=" i in times" :label="i.yearAndMonth" :value="i.yearAndMonth" ></el-option>
            </el-select>
            <!--v-if="ls_type!='临时项目'"-->
            <!--<el-date-picker-->
                    <!--v-if="ls_type=='临时项目'"-->
                    <!--v-model="ls_times"-->
                    <!--type="daterange"-->
                    <!--range-separator="至"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
            <el-button  type="primary" @click="demand" style="margin-left:20px">查询</el-button>
            <el-button type="primary" @click="Export()" v-if="customerDetailExport">导出客户对账单</el-button>
            <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            <div class="center">
                <div class="box" v-if="userId.number == 0?true:false">
                    <div class="time">
                        <span class="sizeTime">账单周期</span>
                        <span class="times" v-if="startTime">({{startTime | dateFrm }}&nbsp;至&nbsp;{{endTime | dateFrm}})</span>
                    </div>
                    <div class="line">
                        <p></p>
                    </div>
                    <div class="btn">
                        <el-button type="primary" @click="handleClick()"  v-if="userId.number == 0?true:false"  :disabled="timeswitch">申请出账单</el-button>
                        <!--<el-button  @click="onSubmit0" type="primary" v-if="userId.number == 1?false:true">审批记录</el-button>-->

                    </div>
                </div>
                <div v-if="userId.number == 0?true:false">
                    <el-row>
                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 85px">客户编号：</span>{{ userId.customerId }}</el-col>

                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 85px">销售专员：</span>{{userId.saleName}}</el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 85px">项目名称：</span>{{userId.customerName }}</el-col>
                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 85px">运营专员：</span>{{userId.projectName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 105px">所属分公司：</span>{{userId.filialeName}}</el-col>
                        <el-col :span="12"><span style="display: inline-block;width: 15%;min-width: 85px">客户状态：</span>{{userId.freezeAccount  }}</el-col>
                    </el-row>
                </div>
            </div>
            <h1 style="margin-top: 20px"><span class="wire"></span>费用明细</h1>
            <div v-if="userId.number == 0?false:true" style="margin-bottom: 20px">
                <el-row>
                    <el-col :span="8"><span style="display: inline-block;width: 20%;min-width: 85px">客户编号：</span>{{ userId.customerId }}</el-col>
                    <el-col :span="8"><span style="display: inline-block;width: 20%;min-width: 85px">项目名称：</span>{{ userId.customerName }}</el-col>
                    <el-col :span="8"><span style="display: inline-block;width: 20%;min-width: 85px">客户状态：</span>{{userId.freezeAccount  }}</el-col>
                </el-row>
            </div>
            <!--<ul>-->
                <!--<li>-->

                    <!--<el-date-picker-->
                            <!--v-model="value6"-->
                            <!--type="daterange"-->
                            <!--range-separator="至"-->
                            <!--value-format="timestamp"-->
                            <!--start-placeholder="开始日期"-->
                            <!--end-placeholder="结束日期">-->
                    <!--</el-date-picker>-->

                    <!--&lt;!&ndash;<el-button type="primary" @click="driverDerive" v-if="customerDetailExport">导出流水</el-button>&ndash;&gt;-->
                <!--</li>-->
                <!--<li>-->

                <!--</li>-->
            <!--</ul>-->
            <!--transportPrice ：司机基础运费；optAfterPrice：调账后总金额；-->
            <!--optBeforePrice：调账前总金额-->
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <!--<el-table-column-->
                <!--prop="scheduleId"-->
                <!--label="运输单编号"-->
                <!--align="center"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="trackId"
                        label="出车单编号"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="出车日期"
                        :formatter="dateFormat"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="arrivalTime"
                        align="center"
                        :formatter="dateFormatHm"
                        label="到仓签到时间">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="司机姓名">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="vehicleNum"-->
                <!--align="center"-->
                <!--label="车牌号">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--prop="vehicleType"-->
                <!--align="center"-->
                <!--label="车型">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="depotName"
                        align="center"
                        label="仓名称">
                </el-table-column>
                <el-table-column
                        prop="lineName"
                        align="center"
                        label="线路名称">
                </el-table-column>
                <el-table-column
                        prop="arrivalPointCount"
                        align="center"
                        label="配送点数">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="handle_remark"-->
                <!--align="center"-->
                <!--label="变更原因">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="redPacketMoney"
                        align="center"
                        label="红包金额（元）">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="insuranceCost"-->
                        <!--align="center"-->
                        <!--label="畅心保(元)">-->
                <!--</el-table-column>-->

                <el-table-column
                        prop="schedulePrice"
                        align="center"
                        label="合同价格(元)">
                </el-table-column>


                <!--<el-table-column-->
                <!--prop="transportPrice"-->
                <!--align="center"-->
                <!--label="司机基础运费（元）">-->
                <!--</el-table-column>-->

                <el-table-column
                        prop="customerAdjustmentBeforePrice"
                        align="center"
                        label="调账前总金额（元）">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="schedulePrice"-->
                <!--align="center"-->
                <!--label="发布价格（元）">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="customerOptPrice"
                        align="center"
                        label="调账金额（元）">
                    <template slot-scope="scope">
                        <a v-if="tableData[scope.$index].customerStatus == 'no'" type="text" size="small">-</a>
                        <a v-if="tableData[scope.$index].customerStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].customerOptPrice}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="customerAdjustmentAfterPrice"
                        align="center"
                        label="调账后总金额（元）">
                    <template slot-scope="scope">
                        <a v-if="tableData[scope.$index].customerStatus == 'no'" type="text" size="small">-</a>
                        <a v-if="tableData[scope.$index].customerStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].customerAdjustmentAfterPrice}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="adjustmentReason"
                        align="center"
                        label="调账说明">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="出车状态">
                </el-table-column>
                <el-table-column
                        prop="customerHandleStatus"
                        align="center"
                        label="处理状态">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--align="center"-->
                        <!--label="操作"-->
                        <!--v-if="userId.number == 1?false:true"-->
                <!--&gt;-->
                    <!--&lt;!&ndash;v-if="id == 1 || id == 2?true:false"&ndash;&gt;-->
                    <!--<template slot-scope="scope">-->
                        <!--&lt;!&ndash;<el-button @click="handleClick2(scope.$index)" type="text" :disabled="arr[scope.$index]" size="small" >申请调账</el-button>&ndash;&gt;-->
                        <!--<el-button @click="handleClick2(scope.$index)" type="text"  size="small" >申请调账</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    @size-change="handleSizeChange"
                    :page-sizes="[10, 20, 30, 50]"
                    layout="total,prev, pager, next,sizes"
                    :total="total">
            </el-pagination>
            <!--申请调账弹出框-->
            <el-dialog
                    title="对账差异"
                    :visible.sync="dialogFormVisible"
                    width="570px"
            >
            <span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm  elform">
                <el-form-item label="账单金额" >
                    <el-input v-model="ruleForm.lastTransportPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异金额" prop="cymoney">
                    <el-input v-model="ruleForm.cymoney" v-on:input="cymoneys"></el-input><br>
                    <span style="color: red;">说明:调账金额可为“+”和“-”，不填符号默认是正数“+”</span>
                </el-form-item>
                <el-form-item label="调账后总金额">
                    <el-input v-model="ruleForm.zhmoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="调账说明">
                    <el-input v-model="ruleForm.textarea" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            </span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
            </el-dialog>
            <!--申请出账单-->
            <el-dialog
                    title="申请出账单"
                    :visible.sync="dialogFormVisible2"
                    width="870px"
                    center
                    class="eldialog"
            >
                <div class="titleMessage">
                    <div style="float: left;width: 50%">
                        <span class="f_size">账单信息</span>
                    </div>
                    <div class="float:right;width: 50%">
                        <span class="f_size z_time" v-if="this.startTime">
                    <div style="display: inline-block;font-size: 16px"  v-if="userId.number == 1?false:true">
                        账单周期:
                        <span >{{ startTime | dateFrm }}</span>
                        至
                        <span v-if="this.endTime">{{ endTime | dateFrm }}</span>
                    </div>

                        </span>
                    </div>
                </div>
                <div class="message_b">
                    <div class="message_l">
                        <el-row>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img1" ></i><span style="display: inline-block;width: 35% ;"  >客户编号 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.customerId}}</div></el-col>
                            <el-col :span="2"></el-col>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img2" ></i><span style="display: inline-block;width: 35%" >账户状态 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.freezeAccount}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img3" ></i><span style="display: inline-block;width: 35%">项目名称 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.customerName}}</div></el-col>
                            <el-col :span="2"></el-col>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img4" ></i><span style="display: inline-block;width: 35%">销售专员 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.saleName}}</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img5" ></i><span style="display: inline-block;width: 35%">所属分公司 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.filialeName}}</div></el-col>
                            <el-col :span="2"></el-col>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img6" ></i><span style="display: inline-block;width: 35%">运营专员 : </span><div style="display: inline-block;width: 170px;text-align: right">{{userId.projectName}}</div></el-col>
                        </el-row>
                    </div>
                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">账单金额(不含税) : </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600">
                            {{ruleForm1.actualMoneyCount}}
                    </span>
                    </div>
                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">毛利额 : </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600">
                            {{ruleForm1.grossProfit}}
                    </span>
                    </div>
                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">毛利率 : </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600">
                            {{ruleForm1.grossProfitMargin}}
                    </span>
                    </div>
                </div>
                <div class="billing">
                    <div style="float: left;width: 50%">
                        <span class="f_size">开票信息</span>
                    </div>
                </div>
                <div class="message_billing">
                    <el-row>
                        <el-col :span="12"><span style="display: inline-block;width: 30%">是否开票 : </span>
                            <!--<el-radio v-model="radio" label="yes">是</el-radio>-->
                            <!--<el-radio v-model="radio" label="no">否</el-radio>-->
                            {{userId.judgeInvoice}}
                        </el-col>
                        <el-col :span="12" v-if="userId.judgeInvoice=='是'"><span style="display: inline-block;width: 30%">税率 : </span>{{ruleForm1.rate}}</el-col>
                    </el-row>
                    <!--<el-row >-->
                        <!--grossProfit 毛利额: 337.57-->
                        <!--grossProfitMargin 毛利率: 0.0237-->
                        <!--<el-col :span="8"><span style="display: inline-block;width: 29%">毛利额 : </span>{{ruleForm1.grossProfit}}</el-col>-->
                        <!--<el-col :span="8"><span style="display: inline-block;width: 29%">毛利率 : </span>{{ruleForm1.grossProfitMargin}}</el-col>-->
                    <!--</el-row>-->

                    <!--<el-row v-if="radio=='yes'">-->
                        <!--<el-col :span="24"><span style="display: inline-block;width: 13%">开票金额 : </span>{{ruleForm1.actualMoneyCount}}</el-col>-->
                    <!--</el-row>-->
                </div>

                <div class="billing">
                    <div style="float: left;width: 50%">
                        <span class="f_size">对账单信息</span>
                    </div>
                </div>
                <div class="message_billing">
                    <el-row>
                        <el-col :span="24"><span style="display: inline-block;width: 13%;float: left;">上传对账单 : </span>
                            <el-upload
                                    class="upload-demo"
                                    style="float: left;"
                                    ref="upload"
                                    :limit="5"
                                    :on-exceed="exceedlimit"
                                    action="javascript:;"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-change="Contracts"
                                    :file-list="fileList"
                                    :before-upload="onBeforeUpload"
                                    :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                                <div slot="tip" class="el-upload__tip">支持jpg、png、word、excel、zip、pdf，最多添加5份</div>
                            </el-upload>

                            <!--<el-upload-->
                                    <!--action="javascript:;"-->
                                    <!--:limit="5"-->
                                    <!--accept="image/jpeg,image/gif,image/png"-->

                            <!--&gt;-->
                                <!--<el-button size="small" type="primary">点击上传</el-button>-->
                            <!--</el-upload>-->
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1('ruleForm')" v-if="issave==0?true:false">确 定</el-button>
            <el-button type="primary" v-if="issave==0?false:true" loading>提交中</el-button>
            </span>
            </el-dialog>

        </div>

    </div>
</template>
<script>
    import {openPostWindow} from '../../js/report.js'
    import {getDate as ontimeNum} from '../../js/listWarehouse.js'
    import moment from 'moment'
    export default {
        data(){
            return {
                radio:'yes',
                token:'',
                value6:[],
                id:'',
                userId:[],
                currentPage:1,
                pagesize:10,
                tableData:[],
                dialogFormVisible: false,
                dialogFormVisible2:false ,
                formLabelWidth: '120px',
                ruleForm: {
                    lastTransportPrice: '',
                    cymoney:'',
                    resource: '',
                    desc: '',
                    zhmoney:'',
                    textarea:'',
                    textarea0:'',
                    trackId:'',
                    options:'',
                    id:'',
                    startTime:'',
                },
                ruleForm1:{
                    radio:'',
                    radio1:'no',
                    transportMoneyCount:'',
                    adjustMoneyCount:'',
                    zhmoney:'',
                    textarea:'',
                    textarea0:'',
                    options:'',
                },
                rules: {
                    cymoney:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^[-+]?[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message: '只能输入数字,小数点后两位' }
                    ]
                },
                total:0,
                link:[],
                options : '',
                linkname:'',
                grey:true,
                arr:[],
                customerName:'',
                startTime:'',
                endTime:'',
                status:'',
                radio1:'no',
                isApply:'',
                type:'',
                timeswitch:false,
                customerDetailExport:false,
                //导出
                queryStatus:true,
                fullscreenLoading: false,
                // trackManageListExport:false,
//进度条
                ProgressBar:0,
            //    上传
                picListContract:[],
                fileList:[],
                issave:'',
                istime:'',
                times:'',
                ls_type:'',
                ls_times:[],
            }
        },
        created(){
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
                this.customerDetailExport = jurisdictions[7].menus[13].choose;
            let user =sessionStorage.getItem('clientellimit');
            this.id = user;
            this.userId = JSON.parse(sessionStorage.getItem('clientelid')).clientelid;
            // console.log(JSON.parse(sessionStorage.getItem('clientelid')).clientelid.type);
            this.ls_type = JSON.parse(sessionStorage.getItem('clientelid')).clientelid.type
            // console.log(this.userId.number);
            this.data();
            let page = JSON.stringify({
                token:this.token,
                customerId:this.userId.customerId
            })
            console.log(page);
            this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/bill_cycle',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.times = res.body.result ;
                // console.log(this.times);
                // let a = []
                // for( var i in this.times){
                //     console.log(i);
                //
                //     a.push({time:i})
                // }
                // console.log(a);
            })


        },
        methods:{
            isonTime(fullYear,month ){
                // var day = new Date(2011, 9, 16);
                // var dayWrapper = moment(day);
                // console.log(dayWrapper);
                // var nowDate = new Date();
                var cloneNowDate = new Date(fullYear,month, 0);
                // var fullYear = nowDate.getFullYear();
                // console.log(fullYear);
                // var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
                // console.log('月'+month);
                var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天

                function getFullDate(targetDate) {
                    var D, y, m, d;
                    if (targetDate) {
                        D = new Date(targetDate);
                        y = D.getFullYear();
                        m = D.getMonth() + 1;
                        d = D.getDate();
                    } else {
                        y = fullYear;
                        m = month;
                        d = date;
                    }
                    m = m > 9 ? m : '0' + m;
                    d = d > 9 ? d : '0' + d;
                    return y + '-' + m + '-' + d +' '+ `00:00:00`;
                };
                var endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
                var starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
                let arr= [starDate,endDate]
                return arr
            },
            Export() {
                let page = JSON.stringify({
                    token : this.token,
                    customerId : this.userId.customerId,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type :  this.ls_type=='临时项目'? 'interim': this.istime == ''?this.type:'trackMonthDetail' ,
                    dateStr:this.istime,
                    startTime:this.ls_type=='临时项目'?(this.ls_times!=null?this.ls_times[0]:undefined):undefined,
                    endTime:this.ls_type=='临时项目'?(this.ls_times!=null?this.ls_times[1]+1000*60*60*24-1:undefined):undefined,
                });
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/customer_reconciliation';
                openPostWindow(exportLink , page);
            },
            // Export(){
            //     let data1
            //     let data2
            //     // alert(this.userId.number)
            //
            //     if (this.userId.number == 1){
            //         if (this.istime!=''){
            //             let y = this.istime.split('-')[0];
            //             let m = this.istime.split('-')[1] ;
            //             let time1 = this.isonTime(y, m)[0] ;
            //             let time2 = this.isonTime(y, m)[1] ;
            //             data1 = new Date(time1).getTime();
            //             data2 = new Date(time2).getTime()+1000*60*60*24-1;
            //             // console.log(data1);
            //             // console.log(data2);
            //         } else {
            //             // var day = new Date(2011, 9, 16);
            //             // var dayWrapper = moment(day);
            //             // console.log(dayWrapper);
            //             // let nowDate = new Date();
            //             // let fullYear = nowDate.getFullYear();
            //             // // console.log(fullYear);
            //             // let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
            //             // // console.log('月'+month);
            //             //
            //             // let y = this.istime.split('-')[0];
            //             // let m = this.istime.split('-')[1] ;
            //             // let time1 = this.isonTime(fullYear, month)[0] ;
            //             // let time2 = this.isonTime(fullYear, fullYear)[1] ;
            //             // data1 = new Date(time1).getTime();
            //             // data2 = new Date(time2).getTime()+1000*60*60*24-1;
            //             data1= undefined
            //             data2= undefined
            //
            //         }
            //     } else {
            //         // console.log(this.startTime);
            //         if (this.istime!=''){
            //             let y = this.istime.split('-')[0];
            //             let m = this.istime.split('-')[1] ;
            //             let time1 = this.isonTime(y, m,y,m)[0] ;
            //             let time2 = this.isonTime(y, m)[1] ;
            //             data1 = new Date(time1).getTime();
            //             data2 = new Date(time2).getTime()+1000*60*60*24-1;
            //             // console.log(data1);
            //             // console.log(data2);
            //         } else {
            //             console.log(ontimeNum(this.startTime).split('-'));
            //             let nowDate = new Date();
            //             let fullYear = nowDate.getFullYear();
            //             // console.log(fullYear);
            //             let month = ontimeNum(this.startTime).split('-')[1]; // getMonth 方法返回 0-11，代表1-12月
            //             // console.log('月'+month);
            //
            //             let y = this.istime.split('-')[0];
            //             let m = this.istime.split('-')[1] ;
            //             let time1 = this.isonTime(fullYear, month)[0] ;
            //             let time2 = this.isonTime(fullYear, month)[1] ;
            //             data1 = new Date(time1).getTime();
            //             data2 = new Date(time2).getTime()+1000*60*60*24-1;
            //         }
            //     }
            //
            //
            //     if (this.value6 == undefined || this.value6 == null){
            //         this.value6 = []
            //     }
            //     this.$message({
            //         showClose: true,
            //         message: '正在导出请耐心等待！',
            //         type: 'warning'
            //     });
            //     this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
            //         "token":this.token,
            //         "exportName":"customerFeeDetail",  //-- 导出模块名称
            //         "t.customer_id":this.userId.customerId,     //-- 商户ID
            //         "startTime":data1,       //-- 开始时间
            //         "endTime":data2            //-- 结束时间
            //     })).then(run=>{
            //         console.log(run);
            //         if(run.body.errcode == 0){
            //             this.fullscreenLoading = true;
            //             this.queryStatus = false;
            //             this.ProgressBar = 0;
            //             this.code = run.body.result;
            //             this.interval = setInterval(() => {
            //                 this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
            //                     "token":this.token,
            //                     "id":this.code,
            //                 })).then(run=>{
            //                     console.log(run);
            //                     if(run.body.errcode == 0){
            //                         this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
            //                         if (this.ProgressBar == 100){
            //                             clearInterval(this.interval);
            //                             setTimeout(()=> {
            //                                 window.location.href = run.body.result.externalRoad;
            //                                 this.$message({
            //                                     message: '导出成功',
            //                                     type: 'success'
            //                                 });
            //                                 this.fullscreenLoading = false;
            //                                 this.queryStatus = true;
            //                             },1200)
            //                         }
            //                     }
            //                 })
            //             },1000);
            //         }else {
            //             this.$message({
            //                 showClose: true,
            //                 message: run.body.message,
            //                 type: 'error'
            //             });
            //         }
            //     })
            // },
            data(){
                if (this.userId.number == 1){
                    this.type = 'query'
                } else {
                    this.type = 'detail'
                }
                let page = JSON.stringify({
                    token : this.token,
                    customerId : this.userId.customerId,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type :  this.ls_type=='临时项目'? 'interim': this.istime == ''?this.type:'trackMonthDetail' ,
                    dateStr:this.istime,
                    startTime:this.ls_type=='临时项目'?(this.ls_times!=null?this.ls_times[0]:undefined):undefined,
                    endTime:this.ls_type=='临时项目'?(this.ls_times!=null?this.ls_times[1]+1000*60*60*24-1:undefined):undefined,

                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res);
                    if (res.body.result.rows != undefined){
                        this.total = res.body.result.total;
                        this.tableData =res.body.result.rows;
                        this.customerName = res.body.result.customerName;
                        this.status = res.body.result.status;
                        this.startTime = res.body.result.billStartTime;
                        this.endTime = res.body.result.billEndTime;
                        this.isApply = res.body.result.isApply;
                        let time =Date.parse(new Date());

                        if (this.startTime<=time && time<=this.endTime ){
                            // if (this.isApply==null ||this.isApply == )
                            this.timeswitch = true
                        }else{
                            this.timeswitch = false

                        }

                        if (this.userId.number == 1){
                            this.value6=[]
                        } else {
                            this.value6 = [this.startTime,this.endTime-86399999];
                        }
                        for (let i = 0 ; i < this.tableData.length; i++ ){
                            this.arr.push(false);
                            if (this.tableData[i].vehicleType != '' && this.tableData[i].vehicleType != null && this.tableData[i].vehicleType != undefined ){
                                this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCold ;
                            } else {
                                this.tableData[i].vehicleType = ''
                            }
                            if (this.tableData[i].customerHandleStatus == 'handled') {
                                this.tableData[i].customerHandleStatus = '已处理'
                            } else if (this.tableData[i].customerHandleStatus == 'handling') {
                                this.tableData[i].customerHandleStatus = '处理中'
                            }
                            if (res.body.result.isApply == false){
                                this.arr[i] = true;
                            } else {
                                this.arr[i] = false;
                                if (this.tableData[i].customerHandleStatus == '' || this.tableData[i].customerHandleStatus == undefined) {
                                    if (this.tableData[i].status == 'finished'){
                                        this.arr[i] = true;
                                    }
                                }
                            }
                            if (this.tableData[i].status == 'finished'){
                                this.tableData[i].status = '正常'
                            }else {
                                this.tableData[i].status = '异常'
                            };
                        };
                    }
                })
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res);
                    if (res.body.result.rows != undefined){
                        this.total = res.body.result.total;
                        this.tableData =res.body.result.rows;
                        this.customerName = res.body.result.customerName;
                        this.status = res.body.result.status;
                        this.startTime = res.body.result.billStartTime;
                        this.endTime = res.body.result.billEndTime;
                        let time =Date.parse(new Date());
                        if (this.startTime<time && this.endTime>time ){
                            this.timeswitch = true
                        }
                        // if (this.userId.number == 1){
                        //     this.value6=[]
                        // } else {
                        //     this.value6 = [this.startTime,this.endTime];
                        // }
                        this.isApply = res.body.result.isApply;
                        console.log(this.startTime);
                        for (let i = 0 ; i < this.tableData.length; i++ ){
                            this.arr.push(false);
                            if (this.tableData[i].vehicleType != '' && this.tableData[i].vehicleType != null && this.tableData[i].vehicleType != undefined ){
                                this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCold ;
                            } else {
                                this.tableData[i].vehicleType = ''
                            }
                            if (this.tableData[i].customerHandleStatus == 'handled') {
                                this.tableData[i].customerHandleStatus = '已处理'
                            } else if (this.tableData[i].customerHandleStatus == 'handling') {
                                this.tableData[i].customerHandleStatus = '处理中'
                            }
                            if (res.body.result.isApply == false){
                                this.arr[i] = true;
                            } else {
                                this.arr[i] = false;
                                if (this.tableData[i].customerHandleStatus == '' || this.tableData[i].customerHandleStatus == undefined) {
                                    if (this.tableData[i].status == 'finished'){
                                        this.arr[i] = true;
                                    }
                                }
                            }
                            if (this.tableData[i].status == 'finished'){
                                this.tableData[i].status = '正常'
                            }else {
                                this.tableData[i].status = '异常'
                            };
                        };
                    }
                })
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("HH:mm");
            },
            demand(){
                console.log( this.startTime);
                this.currentPage = 1
                if ( this.userId.number == 0){
                    this.data()
                    // if(this.value6[1] > this.endTime || this.value6[0] < this.startTime){
                    //     this.$message({
                    //         message: '超出查找范围',
                    //         type: 'warning'
                    //     });
                    // }else {
                    //     if (this.userId.number == 1){
                    //         this.type = 'query'
                    //     } else {
                    //         this.type = 'detail'
                    //     }
                    //
                    //     let page =JSON.stringify({
                    //         token : this.token,
                    //         customerId : this.userId.customerId,
                    //         pageNum : this.currentPage=1,
                    //         pageSize : this.pagesize,
                    //         startTime :this.value6[0],
                    //         endTime : this.value6[1] +86400000-1 ,
                    //         type : this.type,
                    //     });
                    //     console.log(page);
                    //     this.ajax(page)
                    // }
                } else{
                    this.data()
                    // if (this.userId.number == 1){
                    //     this.type = 'query'
                    // } else {
                    //     this.type = 'detail'
                    // }
                    //
                    // let page =JSON.stringify({
                    //     token : this.token,
                    //     customerId : this.userId.customerId,
                    //     pageNum : this.currentPage=1,
                    //     pageSize : this.pagesize,
                    //     startTime :this.value6[0],
                    //     endTime : this.value6[1] +86400000-1 ,
                    //     type : this.type,
                    // });
                    // console.log(page);
                    // this.ajax(page)
                }



            },
            handleCurrentChange(val) {
                this.currentPage=val;
                // if (this.userId.number == 1){
                //     this.type = 'query'
                // } else {
                //     this.type = 'detail'
                // }
                // let  page =JSON.stringify({
                //     token : this.token,
                //     customerId : this.userId.customerId,
                //     pageNum : this.currentPage,
                //     pageSize : this.pagesize,
                //     startTime :this.value6[0],
                //     endTime : this.value6[1]+86400000-1 ,
                //     type : this.type
                // });
                // console.log(page);
                this.data()

            },
            handleSizeChange(val){
                this.pagesize=val;
                // if (this.userId.number == 1){
                //     this.type = 'query'
                // } else {
                //     this.type = 'detail'
                // }
                // let  page =JSON.stringify({
                //     token : this.token,
                //     customerId : this.userId.customerId,
                //     pageNum : this.currentPage,
                //     pageSize : this.pagesize,
                //     startTime :this.value6[0],
                //     endTime : this.value6[1]+86400000-1 ,
                //     type : this.type
                // });
                console.log(page);
                this.data()
            },
            cymoneys(){
                let a = Number(this.ruleForm.lastTransportPrice);
                let b =Number(this.ruleForm.cymoney);
                let bMath = Math.abs(Number(this.ruleForm.cymoney));
                if ( b < 0 && bMath >= a){
                    setTimeout(()=>{
                        this.ruleForm.cymoney = - this.ruleForm.lastTransportPrice;
                        this.ruleForm.zhmoney = '0.00'
                    },20)
                }else {
                    if (b === '' ) {
                        this.ruleForm.zhmoney = '';
                    } else if (b === 0) {
                        this.ruleForm.zhmoney = this.ruleForm.lastTransportPrice
                    } else if (b > 0) {
                        let c = a + b;
                        this.ruleForm.zhmoney = Number(c) * 100 / 100;
                        this.ruleForm.zhmoney = this.ruleForm.zhmoney.toFixed(2)
                    } else if (b < 0) {
                        let c = a + b
                        this.ruleForm.zhmoney = Number(c) * 100 / 100;
                        this.ruleForm.zhmoney = this.ruleForm.zhmoney.toFixed(2)
                    }else if ( b != isNaN(b) ) {
                        this.ruleForm.zhmoney = '';
                        this.ruleForm.cymoney = ''
                    }
                }

            },
            handleClick2(_index){
                this.dialogFormVisible = true;
                this.ruleForm.lastTransportPrice = this.tableData[_index].schedulePrice;
                this.ruleForm.trackId = this.tableData[_index].trackId;
                // this.ruleForm.id = this.tableData[_index].changeId;
                this.ruleForm.id = this.tableData[_index].customerAdjustmentId;
                this.ruleForm.startTime = this.tableData[_index].arrivalTime;


            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        for (let i = 0; i < this.link.length; i++) {
                            if (this.ruleForm.options == this.link[i].id) {
                                this.linkname = this.link[i].name
                            }
                        }
                        let page = JSON.stringify({
                            token: this.token,
                            id:this.ruleForm.id,
                            trackId: this.ruleForm.trackId,
                            optMoney: this.ruleForm.cymoney,
                            adjustmentReason: this.ruleForm.textarea,

                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/company/finance/custedit', page, {
                        //     this.$http.post( 'http://192.168.50.145:7031/company/account/custedit', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            if (res.body.errcode == 0) {
                                this.ruleForm.cymoney= '';
                                this.ruleForm.textarea = '';
                                this.ruleForm.zhmoney = '';
                                this.dialogFormVisible = false;
                                this.$message({
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.data();
                                // setTimeout(function () {
                                //     location.reload();
                                // }, 1000)
                            } else {
                                this.ruleForm.cymoney= '',
                                    this.ruleForm.textarea = ''
                                this.ruleForm.zhmoney = ''
                                this.$message({
                                    message: res.body.message,
                                    // type: 'success'
                                });
                                this.data();
                                // setTimeout(function () {
                                //     location.reload();
                                // }, 1000)
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            submitForm1(formName){
                this.issave = 1;
                let formdata = new FormData();
                for (let i = 0 ; i < this.link.length; i++){
                    if (this.ruleForm1.options == this.link[i].id){
                        this.linkname = this.link[i].name
                    }
                }

                formdata.append('str',JSON.stringify({
                        token :this.token,
                        customerId : this.userId.customerId,
                        // remark : this.ruleForm1.textarea0,
                        whetherInvoice : this.userId.judgeInvoice == '是'?'yes':'no',
                        startTime:this.startTime,
                        endTime:this.endTime
                    }));
                console.log(formdata.get("str"));
                for (let i = 0; i < this.picListContract.length; i++) {
                    formdata.append(this.picListContract[i].name,this.picListContract[i].raw);
                }

                this.$http.post(this.global.lightningUrl + '/companyv1/finance/customeroutbillcommit',formdata,{
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.$message({
                            message:'提交成功',
                            type: 'success'
                        });
                        this.dialogFormVisible2 = false
                        this.issave = 0 ;
                        this.data();
                    }else{
                        this.$message.error(res.body.message);
                        this.dialogFormVisible2 = false
                        this.data();
                    }
                })
            },
            onSubmit0(){
                this.$router.push({path:'/sjzd_record'})
            },
            handleClick(_index){
                // this.ruleForm.lastTransportPrice = this.tableData[_index].lastTransportPrice;
                if (this.total == 0){
                    // this.dialogFormVisible2 = true;
                    this.$confirm('该周期内没有出车单', '提示', {
                        confirmButtonText: '确定',
                        // cancelButtonText: '取消s',
                        type: 'warning'
                    }).then(() => {

                    }).catch(() => {

                    });
                }else if (this.isApply != null &&this.isApply != '' ){

                    this.$confirm('该账单已经申请提交', '提示', {
                        confirmButtonText: '确定',
                        // cancelButtonText: '取消s',
                        type: 'warning'
                    }).then(() => {

                    }).catch(() => {

                    });
                } else {
                    let page = JSON.stringify({
                        token :this.token,
                        customerId : this.userId.customerId,

                        startTime:this.startTime,
                        endTime:this.endTime
                    });
                    this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_apply',page,{
                        //     this.$http.post( 'http://192.168.50.145:7031/company/account/accoutjust',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    } ).then((res)=>{
                        console.log(res);
                        this.ruleForm1 = res.body.result ;
                        if ( res.body.errcode == 0 ) {
                            // if ()
                            this.dialogFormVisible2 = true;
                            this.ruleForm1.transportMoneyCount = res.body.result.transportMoneyCount;
                            this.ruleForm1.adjustMoneyCount = res.body.result.adjustMoneyCount;
                            this.ruleForm1.actualMoneyCount = res.body.result.actualMoneyCount;
                            this.ruleForm1.examinePerson =   res.body.result.examinePerson;
                            this.ruleForm1.options = res.body.result.examinePerson;
                            this.ruleForm1.redPacketMoney = res.body.result.redPacketMoney;
                            this.ruleForm1.insuranceCost = res.body.result.insuranceCost;
                            this.ruleForm1.rate = res.body.result.rate;
                            this.ruleForm1.actualMoneyCount = res.body.result.actualMoneyCount;

                        }else {
                            this.dialogFormVisible2 = false;
                            this.$message(res.body.message);
                        }
                    })
                }

            },
            submitUpload() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log('handlePreview');
                console.log(file);
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.mp4')){
                    window.location.href = file.url;
                    console.log(123);
                }else {
                    var a = document.createElement('a');
                    a.href = file.url;
                    a.target = '_blank';
                    a.id='exppub';
                    document.body.appendChild(a);
                    var alink = document.getElementById('exppub');
                    alink.click();
                    alink.parentNode.removeChild(a);
                }
            },
            onBeforeUpload(file){
                console.log(file);
            },
            Contracts(file, fileList){
                console.log(file.name , fileList);
                this.picListContract=[];
                this.picListContract=fileList;
                for(var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if (this.picListContract[i].name.includes(',')||this.picListContract[i].name.includes('，')) {
                        this.picListContract.splice(i, 1);
                        this.$message({
                            showClose: true,
                            message: '对不起，文件名中不能包含，或,!',
                            type: 'error'
                        });
                        return false

                    }else{
                        if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.zip')&& (fileName != '.docx')&&
                            (fileName != '.xlsx')&& (fileName != '.pdf')&& (fileName != '.rar')) {
                            this.picListContract.splice(i, 1);
                            this.$message({
                                showClose: true,
                                message: '对不起，系统不支持该格式的文件。',
                                type: 'error'
                            });
                            return false
                        }
                        var size = 0;
                        var num  = 20;
                        size = this.picListContract[i].size;//byte
                        size = size / 1024;//kb
                        size = (size / 1024).toFixed(1);//mb
                        if (size > num){
                            this.picListContract.splice(i,1);
                            this.$message({
                                showClose: true,
                                message: '对不起，您上传的文件大小为'+ size +'文件大小超出20M。上传失败！',
                                type: 'error'
                            });
                            return false
                        }
                    }

                }
            },
            exceedlimit(){
                this.$message({
                    message: '对不起，最大上传5个文件',
                    type: 'error'
                });
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },

    }
</script>
<style lang="scss" scoped>
    .main{
        padding: 30px;
        .header{
            margin-bottom: 20px;
        }
        .el-dialog{
            min-width: 570px;
        }
        >p{
            display: block;
            padding-bottom:20px;
        }
        .center {
            /*margin-top: 20px;*/
            /*padding: 20px;*/
            width:100%;
            line-height: 40px;
            /*min-width: 710px;*/
            /*!*border:1px solid #000;*!*/
            /*margin-bottom: 10px;*/
            /*border-radius: 10px;*/
            >h1{
                display: inline-block;
                padding-bottom:0;
                font-size: 22px;
                font-weight: 500;
                line-height: 25px;
                paddin-top: 3px;
            }
            .isdashed{
                width: 84%;
                display: inline-block;
                border: 1px dashed rgb(232,232,232);
                text-align:center;
            }
        }
        .show_top {
            font-size:25px;

        }
        .message{
            overflow: hidden;
            font-size: 16px;
            .aaa{
                display: block;
                font-size: 16px;
                margin-top: 10px;
            }
        }
        h1{
            padding-bottom: 20px;
            font-size: 22px;
            font-weight: 500;
            line-height: 25px;
            .wire::before {
                display: inline-block;
                margin-right: 8px;
                content: '';
                width: 4px;
                height: 30px;
                vertical-align: -6px;
                background-color: #277bf5;
            }
        }
        ul{
            li{
                padding-bottom: 20px;
                overflow: hidden;

                div{
                    float: left;
                }
            }
        }
        .el-pagination{
            text-align: center;
            padding-top: 20px;
        }
        .el-message-box__message{
            text-align: center
        }
        .el-row {
            /*margin-bottom: 20px;*/
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #d3dce6;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
        .eldialog{
            width: 100%;

            .f_size{
                font-size: 20px;
                font-weight: 500;
            }
            .titleMessage{
                width: 100%;
                overflow: hidden;
                border-bottom: 1px solid rgb(232,232,232);
                .z_time{
                    color: #277bf5;
                    float: right;
                }
            }
            .message_b{
                .message_l{
                    width: 90%;
                    float: left;
                    margin-top: 25px;
                    margin-left: 35px;
                    .el-col{
                        margin-bottom: 10px;
                    }
                    .imgsize{
                        box-sizing: border-box;
                        padding-left:7px;
                    }
                    .img1{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        margin-right: 10px;
                        background-color: red;
                        vertical-align:middle;
                        background: url('../../images/png/ic_number.png') no-repeat center;
                    }
                    .img2{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        margin-right: 10px;
                        background-color: red;
                        vertical-align:middle;
                        background: url('../../images/png/ic_state.png') no-repeat center;
                    }
                    .img3{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        background-color: red;
                        vertical-align:middle;
                        margin-right: 10px;
                        background: url('../../images/png/ic_normal.png') no-repeat center;
                    }
                    .img4{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        display: inline-block;
                        background-color: red;
                        vertical-align:middle;
                        background: url('../../images/png/ic_adviser.png') no-repeat center;
                    }
                    .img5{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        margin-right: 10px;

                        background-color: red;
                        vertical-align:middle;
                        background: url('../../images/png/ic_company.png') no-repeat center;
                    }
                    .img6{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;

                        display: inline-block;
                        background-color: red;
                        vertical-align:middle;
                        background: url('../../images/png/ic_case.png') no-repeat center;
                    }
                }
                .message_r{
                    width: 30%;
                    float: left;
                    text-align: left;
                    padding-top:20px;
                    padding-left: 22px;
                }
                margin-top: 15px;
                overflow: hidden;
                background-color: #f9fafc;

            }
            .billing{
                margin-top: 20px;
                overflow: hidden;
                border-bottom: 1px solid rgb(232,232,232);
            }
            .message_billing{
                margin-top: 20px;
                padding:  25px 35px;
                background-color: #f9fafc;
                .el-col{
                    margin-bottom: 10px;
                }
            }

        }
        .period{
            line-height: 25px;
            font-size: 22px;
            border-left: 4px solid #277bf5;
            padding-left: 10px;
            overflow: hidden;
            float: left;
            width: 100%;
            min-width: 415px;
            margin-top: 5px
            /*>span{*/
                /*display: block;*/
                /*width: 75%;*/
                /*border-top: 1px dashed red;*/
                /*height: 1px;*/
                /*float: left;*/
            /*}*/
        }
        .period_boeder{
            overflow: hidden;
            box-sizing: border-box;
            display: block;
            padding: 0 10px;
            float: left;
            width: 100%;
            border: 1px dashed rgb(232,232,232);
            margin-top: 20px;
        }
        .period_button{
            min-width: 234.446px;
            margin-left: 15px;
        }
        .box{
            width: 100%;
            line-height: 50px;
            display: flex;
        }
        .time{
            height: 50px;
            padding-right: 10px;
            min-width:375px;
        }
        .time >.sizeTime{
            font-size: 22px;
            padding: 16px 16px 0 0;
            /* font-size: 14px; */
            color: #333;
        }
        .time > .sizeTime::before {
            display: inline-block;
            margin-right: 8px;
            content: '';
            width: 4px;
            height: 30px;
            vertical-align: -6px;
            background-color: #277bf5;
        }
        .time > .times {
            font-size: 18px;
        }
        .line{
            height: 50px;
            flex: 1;
            text-align: center;
        }
        .line > p {
            width: 100%;
            border-bottom: 1px dashed rgb(232,232,232);
            margin:auto;
            display:inline-block;
            vertical-align: middle;
            height: 1px;
        }
        .btn{
            height: 50px;
            width: 15%;
            padding-left: 10px;
        }
    }


</style>