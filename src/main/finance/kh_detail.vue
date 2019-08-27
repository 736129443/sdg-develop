<template>
    <div class="main">
        <p>
            当前位置：待办事项 > 客户账单审批 > 账单详情
        </p>
        <div class="center">
            <div class="show_top" v-if="userId.billStartTime    ">
                账单周期:
                <span >{{this.userId.billStartTime |dateFrm }}</span>
                至
                <span>{{ this.userId.billEndTime |dateFrm }}</span>
                <!--<el-button type="info" style="margin:10px 0 20px 90px"  @click="handleClick()" >申请出账单</el-button>-->
                <!--<el-button type="info" style="margin:10px 0 20px 90px" @click="account_detail_b" >申请记录</el-button>-->
            </div>
            <div class="message">
                <div class="aaa">
                    <strong>客户编号：</strong><span>{{ this.userId.customerId }}</span>
                </div>
                <div class="aaa">
                    <strong>客户姓名：</strong><span>{{ this.userId.customerName }} </span>
                </div>
                <div class="aaa">
                    <strong>客户状态：</strong><span>{{this.userId.freezeAccount  }}</span>
                </div>
            </div>
        </div>
        <h1>出车明细</h1>
        <ul>
            <li>
                <span style="float: left; display: block;height: 40px;line-height: 40px">出车日期&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button  type="primary" @click="demand" style="margin-left:20px">查询</el-button>
            </li>
        </ul>
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
                    :formatter="dateFormat"
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
            <el-table-column
                    prop="customerAdjustmentBeforePrice"
                    align="center"
                    label="调账前总金额（元）">
            </el-table-column>
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
                    <!--prop="schedulePrice"-->
                    <!--align="center"-->
                    <!--label="合同价格(元)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="schedulePrice"-->
                    <!--align="center"-->
                    <!--label="发布价格（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="status"-->
                    <!--align="center"-->
                    <!--label="出车状态">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="customerHandleStatus"-->
                    <!--align="center"-->
                    <!--label="处理状态">-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
                    <!--&lt;!&ndash;prop="handle_remark"&ndash;&gt;-->
                    <!--&lt;!&ndash;align="center"&ndash;&gt;-->
                    <!--&lt;!&ndash;label="处理原因">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
            <!--<el-table-column-->
                    <!--prop="optMoney"-->
                    <!--align="center"-->
                    <!--label="差异金额（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="optAfterPrice"-->
                    <!--align="center"-->
                    <!--label="调整后金额（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="adjustmentReason"-->
                    <!--align="center"-->
                    <!--label="差异金额说明">-->
            <!--</el-table-column>-->

        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <!--弹出框-->
        <el-dialog
                title="对账差异"
                :visible.sync="dialogFormVisible"
                width="30%"
        >
            <span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm  elform">
                <el-form-item label="账单金额" >
                    <el-input v-model="ruleForm.lastTransportPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异金额">
                    <el-input v-model="ruleForm.cymoney" v-on:input="cymoneys"></el-input><br>
                    <span style="color: red;">说明:调账金额可为“+”和“-”，不填符号默认是正数“+”</span>
                </el-form-item>
                <el-form-item label="调账后总金额">
                    <el-input v-model="ruleForm.zhmoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异原因">
                    <el-input v-model="ruleForm.textarea" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!--tankuang-->
        <el-dialog
                title="对账差异"
                :visible.sync="dialogFormVisible2"
                width="30%"
        >
            <span>
            <el-form :model="ruleForm1" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm  elform">

                <el-form-item label="是否调账" v-model="ruleForm1.radio">
                    <el-radio v-model="radio" label="1" value="1">是</el-radio>
                    <el-radio v-model="radio" label="0" value="0" >否</el-radio>
                </el-form-item>
                <el-form-item label="是否开票" v-model="ruleForm1.radio1">
                    <el-radio v-model="radio1" label="是" value="是">是</el-radio>
                    <el-radio v-model="radio1" label="否" value="否" >否</el-radio>
                </el-form-item>
                <el-form-item label="账单金额" >
                    <el-input v-model="ruleForm1.lastTransportPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异金额" v-if="radio==1?true:false">
                    <el-input v-model="ruleForm1.cymoney" v-on:input="cymoneys" disabled></el-input><br>
                    <span style="color: red;">说明:调账金额可为“+”和“-”，不填符号默认是正数“+”</span>
                </el-form-item>
                <el-form-item label="调账后总金额" v-if="radio==1?true:false">
                    <el-input v-model="ruleForm1.zhmoney" disabled ></el-input>
                </el-form-item>

                <el-form-item label="调账明细" >
                    <router-link to="/kh_detail" style="color: #007aff">调账明细</router-link>
                </el-form-item>
                <el-form-item label="差异原因" v-if="radio==1?true:false">
                    <el-input v-model="ruleForm1.textarea" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="附加说明">
                    <el-input v-model="ruleForm1.textarea0" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-select v-model="ruleForm1.options" placeholder="请选择">
                        <el-option
                                v-for="item in link"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data(){
            return {
                token:'',
                value6:'',
                id:'',
                userId:[],
                currentPage:1,
                pagesize:10,
                tableData:[],
                dialogFormVisible: false,
                dialogFormVisible2:false,
                formLabelWidth: '120px',
                ruleForm: {
                    lastTransportPrice: '',
                    cymoney:'0',
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
                    radio1:'',
                    lastTransportPrice:'',
                    cymoney:'',
                    zhmoney:'',
                    textarea:'',
                    textarea0:'',
                    options:'',
                },
                rules: {
                    cymoney:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^-?[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message: '只能输入数字,小数点后两位' }
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
                radio:'1',
                radio1:'',
            }
        },
        created(){
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;

            this.userId = JSON.parse(sessionStorage.getItem('list'));
            console.log(this.userId.freezeAccount);
            // if (this.userId.freezeAccount == 'unFreezeAccount'){
            //     this.userId.freezeAccount = '正常'
            // }else{
            //     this.userId.freezeAccount = '冻结'
            // }
            this.value6 = [this.userId.billStartTime,this.userId.billEndTime-86399999];
            console.log(this.userId);
            this.time();
        },
        methods:{
            time(){
                let page = JSON.stringify({
                    // token : this.token,
                    // customerId : this.userId.customerId,
                    // pageNum : this.currentPage,
                    // pageSize : this.pagesize,
                    // type : 'adjustDetail',
                    // // billEndTime:this.userId.billEndTime,
                    // // billStartTime:this.userId.billStartTime,

                    token : this.token,
                    customerId : this.userId.customerId,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    startTime :this.value6!=null?this.value6[0]:undefined,
                    endTime : this.value6!=null?this.value6[1]+1000*60*60*24-1:undefined,
                    type : 'adjustDetail',
                    // billEndTime:this.userId.billEndTime,
                    // billStartTime:this.userId.billStartTime,

                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total;
                    this.tableData =res.body.result.rows;
                    this.customerName = res.body.result.customerName;
                    this.status = res.body.result.status;
                    this.startTime = res.body.result.billStartTime;
                    this.endTime = res.body.result.billEndTime;
                    for (let i = 0 ; i < this.tableData.length; i++ ){
                        this.arr.push(false);
                        if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                            this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCold ;
                        }else {
                            this.tableData[i].vehicleType = ''
                        }

                        // if (this.tableData[i].driverAdjustStatus == 0){
                        //     this.arr[i] = true;
                        //     this.tableData[i].driverAdjustStatus = '审批中';
                        // }else if(this.tableData[i].driverAdjustStatus == 1){
                        //     this.arr[i] = true;
                        //     this.tableData[i].driverAdjustStatus = '审批通过';
                        //
                        // }else if(this.tableData[i].driverAdjustStatus == 2){
                        //     this.arr[i] = false;
                        //     this.tableData[i].driverAdjustStatus = '审批未通过';
                        // }else  {
                        //     this.grey = false;
                        // };
                        if (this.tableData[i].status == 'finished'){
                            this.tableData[i].status = '正常'
                        }else {
                            this.tableData[i].status = '异常'
                        };
                        if (this.tableData[i].customerHandleStatus == 'handled') {
                            this.tableData[i].customerHandleStatus = '已处理'
                        }else if (this.tableData[i].customerHandleStatus == ' handling') {
                            this.tableData[i].customerHandleStatus = '正在处理'
                        }
                    };
                })
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            demand(){
                if (this.userId.billStartTime > this.value6[0] || this.userId.billEndTime < this.value6[1]){
                    this.$message({
                        message: '超出查找范围',
                        type: 'warning'
                    });
                } else{
                    this.time()
                    // let  page =JSON.stringify({
                    //             token : this.token,
                    //             customerId : this.userId.customerId,
                    //             pageNum : this.currentPage,
                    //             pageSize : this.pagesize,
                    //             startTime :this.value6!=null?this.value6[0]:undefined,
                    //             endTime : this.value6!=null?this.value6[1]+1000*60*60*24-1:undefined,
                    //             type : 'adjustDetail',
                    //             // billEndTime:this.userId.billEndTime,
                    //             // billStartTime:this.userId.billStartTime,
                    //         });
                    //         console.log(page);
                    //         this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    //             headers: {
                    //                 'Content-Type': 'application/json;charset=UTF-8'
                    //             }
                    //         } ).then((res)=>{
                    //             console.log(res);
                    //             this.total = res.body.result.total;
                    //             this.tableData = res.body.result.rows;
                    //             for (let i = 0 ; i < this.tableData.length; i++ ){
                    //                 this.arr.push(false);
                    //                 if (this.tableData[i].vehicleType != ''||this.tableData[i].vehicleType != null ||this.tableData[i].vehicleType != undefined ){
                    //                     this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                    //                         + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                    //                         + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                    //                         + JSON.parse(this.tableData[i].vehicleType).length + ' '
                    //                         + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                    //                         + JSON.parse(this.tableData[i].vehicleType).isCold ;
                    //                 }else {
                    //                     this.tableData[i].vehicleType = ''
                    //                 }
                    //                 // if (this.tableData[i].driverAdjustStatus == 0){
                    //                 //     this.arr[i] = true;
                    //                 //     this.tableData[i].driverAdjustStatus = '审批中';
                    //                 // }else if(this.tableData[i].driverAdjustStatus == 1){
                    //                 //     this.arr[i] = true;
                    //                 //     this.tableData[i].driverAdjustStatus = '审批通过';
                    //                 //
                    //                 // }else if(this.tableData[i].driverAdjustStatus == 2){
                    //                 //     this.arr[i] = false;
                    //                 //     this.tableData[i].driverAdjustStatus = '审批未通过';
                    //                 // }else  {
                    //                 //     this.grey = false;
                    //                 // };
                    //                 if (this.tableData[i].status == 'finished'){
                    //             this.tableData[i].status = '正常'
                    //         }else {
                    //             this.tableData[i].status = '异常'
                    //         };
                    //         if (this.tableData[i].customerHandleStatus == 'handled') {
                    //             this.tableData[i].customerHandleStatus = '已处理'
                    //         }else if (this.tableData[i].customerHandleStatus == ' handling') {
                    //             this.tableData[i].customerHandleStatus = '正在处理'
                    //         }
                    //     };
                    // })
                }

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let page = JSON.stringify({
                    token : this.token,
                    customerId : this.userId.customerId  ,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    startTime :this.value6!=null?this.value6[0]:undefined,
                    endTime : this.value6!=null?this.value6[1]+1000*60*60*24-1:undefined,
                    type : 'adjustDetail'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    this.total = res.body.result.total;
                    this.tableData =res.body.result.rows;
                    this.customerName = res.body.result.customerName;
                    this.status = res.body.result.status;
                    this.startTime = res.body.result.startTime;
                    this.endTime = res.body.result.endTime;
                    for (let i = 0 ; i < this.tableData.length; i++ ){
                        this.arr.push(false);
                        if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                            this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCold ;
                        }else {
                            this.tableData[i].vehicleType = ''
                        }
                        // if (this.tableData[i].driverAdjustStatus == 0){
                        //     this.arr[i] = true;
                        //     this.tableData[i].driverAdjustStatus = '审批中';
                        // }else if(this.tableData[i].driverAdjustStatus == 1){
                        //     this.arr[i] = true;
                        //     this.tableData[i].driverAdjustStatus = '审批通过';
                        //
                        // }else if(this.tableData[i].driverAdjustStatus == 2){
                        //     this.arr[i] = false;
                        //     this.tableData[i].driverAdjustStatus = '审批未通过';
                        // }else  {
                        //     this.grey = false;
                        // };
                        if (this.tableData[i].status == 'finished'){
                            this.tableData[i].status = '正常'
                        }else {
                            this.tableData[i].status = '异常'
                        };
                        if (this.tableData[i].customerHandleStatus == 'handled') {
                            this.tableData[i].customerHandleStatus = '已处理'
                        }else if (this.tableData[i].customerHandleStatus == ' handling') {
                            this.tableData[i].customerHandleStatus = '正在处理'
                        }
                    };
                })
            },
            handleSizeChange(val){
                this.pagesize =val;
                let page = JSON.stringify({
                    token : this.token,
                    customerId : this.userId.customerId  ,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    startTime :this.value6!=null?this.value6[0]:undefined,
                    endTime : this.value6!=null?this.value6[1]+1000*60*60*24-1:undefined,
                    type : 'adjustDetail'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    this.total = res.body.result.total;
                    this.tableData =res.body.result.rows;
                    this.customerName = res.body.result.customerName;
                    this.status = res.body.result.status;
                    this.startTime = res.body.result.startTime;
                    this.endTime = res.body.result.endTime;
                    for (let i = 0 ; i < this.tableData.length; i++ ){
                        this.arr.push(false);
                        if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                            this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCold ;
                        }else {
                            this.tableData[i].vehicleType = ''
                        }
                        if (this.tableData[i].status == 'finished'){
                            this.tableData[i].status = '正常'
                        }else {
                            this.tableData[i].status = '异常'
                        };
                        if (this.tableData[i].customerHandleStatus == 'handled') {
                            this.tableData[i].customerHandleStatus = '已处理'
                        }else if (this.tableData[i].customerHandleStatus == ' handling') {
                            this.tableData[i].customerHandleStatus = '正在处理'
                        }
                    };
                })
            },
            handleClick(_index){
                this.dialogFormVisible = true;
                this.ruleForm.lastTransportPrice = this.tableData[_index].schedulePrice;
                this.ruleForm.trackId = this.tableData[_index].trackId;
                this.ruleForm.id = this.tableData[_index].changeId;
                this.ruleForm.startTime = this.tableData[_index].arrivalTime;
                let page = JSON.stringify({
                    token: this.token,
                    customerId : this.userId.customerId  ,
                    startTime : this.startTime,
                    endTime:this.endTime
                })
                this.$http.post( this.global.lightningUrl + '/company/finance/accoutjust',page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    // this.link = res.body.result
                })
            },
            cymoneys(){
                let a = parseInt(this.ruleForm.lastTransportPrice);
                let b = parseInt(this.ruleForm.cymoney);
                if( b == '' || b == 0  ){
                    this.ruleForm.zhmoney = this.ruleForm.lastTransportPrice;
                }else if (b > 0){
                    this.ruleForm.zhmoney = (a + b)
                }else if (b < 0){
                    this.ruleForm.zhmoney = (a + b)
                };

                let c = parseInt(this.ruleForm1.lastTransportPrice);
                let d = parseInt(this.ruleForm1.cymoney);
                if( d == '' || d == 0  ){
                    this.ruleForm1.zhmoney = this.ruleForm1.lastTransportPrice;
                }else if (d > 0){
                    this.ruleForm1.zhmoney = (c + d)
                }else if (d < 0){
                    this.ruleForm1.zhmoney = (c + d)
                }
            },
            submitForm(formName) {
                for (let i = 0 ; i < this.link.length; i++){
                    if (this.ruleForm.options == this.link[i].id){
                        this.linkname = this.link[i].name
                    }
                }
                let page = JSON.stringify({
                    token : this.token,
                    id : this.ruleForm.trackId,
                    adjustAccount : this.ruleForm.cymoney,
                    reason : this.ruleForm.textarea,
                });
                this.$http.post(this.global.lightningUrl + '/company/finance/custedit',page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if(res.body.errcode == 0){
                        this.$message({
                            message: res.body.message,
                            type: 'success'
                        });
                        setTimeout(function(){
                            location.reload();
                        },1000)
                    }else {
                        this.$message({
                            message: res.body.message,
                            // type: 'success'
                        });
                        setTimeout(function(){
                            location.reload();
                        },1000)
                    }

                })
            },
            submitForm1(formName){
                for (let i = 0 ; i < this.link.length; i++){
                    if (this.ruleForm1.options == this.link[i].id){
                        this.linkname = this.link[i].name
                    }
                }
                let page = JSON.stringify({
                    token :this.token,
                    driCusId : this.userId.customerId,
                    driCusName: this.customerName,
                    startDate : this.startTime,
                    endDate:this.endTime,
                    isAdjust : this.radio,
                    account: this.ruleForm1.lastTransportPrice,
                    adjustAccount :this.ruleForm1.cymoney,
                    adjustReason : this.ruleForm1.textarea,
                    otherItem :this.radio1,
                    commitReason : this.ruleForm1.textarea0,
                    auditorId :this.ruleForm1.options,
                    auditorName :this.linkname,
                });
                this.$http.post(this.global.lightningUrl + '/company/finance/custsubit',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                })



            },
            account_detail_b(){
                this.$router.push('/sjzd_record');
            },
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
        >p{
            display: block;
            padding-bottom:20px;
        }
        .center {
            margin-top: 20px;
            padding: 20px;
            width:55%;
            border:1px solid #000;
            margin-bottom: 10px;
            border-radius: 10px;
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
        }
        ul{
            li{
                padding-bottom: 20px;
                overflow: hidden;

                div{
                    float: left;
                    padding-right: 30px;
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
    }
</style>