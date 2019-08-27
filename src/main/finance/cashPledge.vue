<template>
    <div class="main cash">
        <div class="header">
            当前位置：<span>财务管理 > 财务金额设置</span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="押金设置" v-if="depositManagement" name="first">
                <div class="msg">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="押金类型">
                            <el-select v-model="formInline.depositType" placeholder="请选择押金类型">
                                <el-option label="个体司机运输押金" value="depositForTransport"></el-option>
                                <el-option label="小于10人车队运输押金" value="depositForLessThanTen"></el-option>
                                <el-option label="大于等于10人车队运输押金" value="depositForMoreThanTen"></el-option>
                                <el-option label="工服押金" value="depositForUniform"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="押金金额">
                            <el-input v-model.trim="formInline.depositMoney" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="元"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="titleSize">
                        <span>押 金 设 置 记 录</span>
                    </div>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="type"
                                align="center"
                                label="押金类型">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                align="center"
                                label="押金金额">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                align="center"
                                :formatter="dateFormat"
                                label="提交时间">
                        </el-table-column>
                        <el-table-column
                                prop="creatorName"
                                align="center"
                                label="提交人">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pagesize"
                            @size-change="handleSizeChange"
                            :page-sizes="[10, 20, 30, 50]"
                            layout="total,prev, pager, next,sizes"
                            :total='total'>
                    </el-pagination>
                    <el-dialog
                            title="请确认信息，是否提交"
                            :visible.sync="dialogVisible"
                            width="30%">
                        押金类型 : {{status}} <br><br>
                        押金金额 : {{formInline.depositMoney}}
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false,num = 2, confirm()">提 交</el-button>
                </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="车贴补贴" v-if="subsidiesForVehicleStickers" name="second">
                <div class="msg">
                    <el-form :inline="true" :model="formInline1" class="demo-form-inline">

                        <el-form-item label="车贴补贴金额">
                            <el-input v-model.trim="formInline1.depositMoney" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="元"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit1">提交</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="titleSize">
                        <span>车贴补贴金额设置记录</span>
                    </div>
                    <el-table
                            :data="tableData1"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                align="center"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                align="center"
                                label="金额">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                align="center"
                                :formatter="dateFormat"
                                label="提交时间">
                        </el-table-column>
                        <el-table-column
                                prop="creatorName"
                                align="center"
                                label="提交人">
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            @current-change="handleCurrentChange2"
                            :current-page.sync="currentPage2"
                            :page-size="pagesize2"
                            @size-change="handleSizeChange2"
                            :page-sizes="[10, 20, 30, 50]"
                            layout="total,prev, pager, next,sizes"
                            :total='total2'>
                    </el-pagination>
                    <el-dialog
                            title="请确认信息，是否提交"
                            :visible.sync="dialogVisible1"
                            width="30%">
                        <!--押金类型 : {{status}} <br><br>-->
                        押金金额 : {{formInline1.depositMoney}}
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible1 = false,num =1,confirm()">提 交</el-button>
                </span>
                    </el-dialog>
                </div>

            </el-tab-pane>

            <el-tab-pane label="调账设置"  name="accountSettings">
                <el-tabs v-model="cashPledge " @tab-click="handleClicks" >
                    <el-tab-pane label="司 机"  name="drivers">
                        <div class="msg">
                            <el-form :inline="true" :model="formInlines" class="demo-form-inline">
                                <el-form-item label="司机运费允许调账次数: ">
                                    <el-input v-model="formInlines.id" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入调账次数"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit2('driver_time')">保存</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="titleSize">
                                <span>操作记录</span>
                            </div>
                            <el-table
                                    :data="tableData3"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        align="center"
                                        label="序号">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        align="center"
                                        label="设置次数">
                                </el-table-column>
                                <el-table-column
                                        prop="creatorName"
                                        align="center"
                                        label="操作人">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        align="center"
                                        label="操作时间"
                                        :formatter="dateFormat"
                                >
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    @current-change="handleCurrentChange3"
                                    :current-page.sync="current3"
                                    :page-size="pagesize3"
                                    @size-change="handleSizeChange3"
                                    :page-sizes="[10, 20, 30, 50]"
                                    layout="total,prev, pager, next,sizes"
                                    :total='total3'>
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="客 户"  name="clients">
                        <div class="msg">
                            <el-form :inline="true" :model="formInlines2" class="demo-form-inline">
                                <el-form-item label="客户运费允许调账次数: ">
                                    <el-input v-model="formInlines2.id" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入调账次数"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit2('customer_time')">保存</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="titleSize">
                                <span>操作记录</span>
                            </div>
                            <el-table
                                    :data="tableData4"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        align="center"
                                        label="序号">
                                </el-table-column>
                                <el-table-column
                                        prop="money"
                                        align="center"
                                        label="设置次数">
                                </el-table-column>
                                <el-table-column
                                        prop="creatorName"
                                        align="center"
                                        label="操作人">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        align="center"
                                        label="操作时间"
                                        :formatter="dateFormat"
                                >
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @current-change="handleCurrentChange4"
                                :current-page.sync="current4"
                                :page-size="pagesize4"
                                @size-change="handleSizeChange4"
                                :page-sizes="[10, 20, 30, 50]"
                                layout="total,prev, pager, next,sizes"
                                :total='total4'>
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                cashPledge:'drivers',
                activeName: 'first',
                formInline: {
                    depositMoney: '',
                    depositType:'',
                },
                formInlines:{},
                formInlines2:{},
                tableData: [],
                total:0,
                currentPage:1,
                pagesize:10,
                total2:0,
                currentPage2:1,
                pagesize2:10,
                token:'',
                dialogVisible:false,
                dialogVisible1:false,
                status:'',
                formInline1:{
                    depositMoney: '',
                },
                tableData1:[],
                num:0,
                depositManagement:false,
                subsidiesForVehicleStickers:false,
                tableData3:[],
                total3:0,
                current3:1,
                pagesize3:10,
                tableData4:[],
                total4:0,
                current4:1,
                pagesize4:10,
            }
        },
        created(){
            //token
            let tokenLisk = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token =  tokenLisk.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            //押金管理
            this.depositManagement = jurisdictions[7].menus[24].choose;
            // 司机补贴设置
            this.subsidiesForVehicleStickers = jurisdictions[11].menus[3].choose;
            if (this.depositManagement) {
                this.activeName = 'first'
            }else{
                this.activeName = 'second'
            }
            //列表
            this.data()

        },
        methods: {
            data(){
                if (this.activeName === 'first') {
                    this.ajax1()
                }
                if (this.activeName === 'second'){
                    this.ajax2()
                }
                if(this.activeName === 'accountSettings'){
                    if(this.cashPledge==='drivers'){
                        this.ajax4('driver_time')
                    }else{
                        this.ajax4('customer_time')
                    }
                }
            },
            ajax4(type){
                let page = JSON.stringify({
                    token : this.token,
                    pageNum : type==='driver_time'?this.current3:this.current4,
                    pageSize : type==='driver_time'?this.pagesize3:this.pagesize4,
                    type:type
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/adjustment_time' , page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    //console.log(res);
                    if(res.body.errcode===0){
                        if(type==='driver_time'){
                            this.tableData3 = res.body.result.row;
                            this.total3 = res.body.result.total
                        }else{
                            this.tableData4 = res.body.result.row;
                            this.total4 = res.body.result.total
                        }
                    }else{
                        this.$message({
                            message:res.body.message,
                            type: 'success'
                        });
                    }

                })
            },
            ajax1(){
                let page = JSON.stringify({
                    token : this.token,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type:"depositForLessThanTen,depositForUniform,depositForMoreThanTen,depositForTransport"
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_money' , page,{
                    // this.$http.post('http://192.168.50.52:8080/account/getdepositrecord' , page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    // console.log(res)
                    this.tableData = res.body.result.list;
                    console.log(this.tableData);
                    this.total = res.body.result.total
                    for (let i = 0; i <this.tableData.length ; i++) {
                        if (this.tableData[i].type == "depositForUniform" ){
                            this.tableData[i].type = '工服押金'
                        }else if (this.tableData[i].type == "depositForLessThanTen" ){
                            this.tableData[i].type = '小于10人车队运输押金'
                        }else if (this.tableData[i].type == "depositForMoreThanTen" ){
                            this.tableData[i].type = '大于等于10人车队运输押金'
                        }else{
                            this.tableData[i].type = '个体司机运输押金'
                        }
                    }
                })
            },
            ajax2(){
                    let page1 = JSON.stringify({
                        token : this.token,
                        pageNum : this.currentPage2,
                        pageSize : this.pagesize2,
                        type:"vehicleSubsidy"
                    })
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_money' , page1,{
                        // this.$http.post('http://192.168.50.52:8080/account/getdepositrecord' , page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res)
                        this.tableData1 = res.body.result.list;
                        this.total2 = res.body.result.total
                    })

            },
            onSubmit() {
                // depositForUniform(工服押金)depositForLessThanTen(少于10人)
                // depositForMoreThanTen(多于10人)depositForTransport(运输押金)
                if (this.formInline.depositType == "depositForUniform" ){
                    this.status = '工服押金'
                }else if (this.formInline.depositType == "depositForLessThanTen" ){
                    this.status = '小于10人车队运输押金'
                }else if (this.formInline.depositType == "depositForMoreThanTen" ){
                    this.status = '大于等于10人车队运输押金'
                }else{
                    this.status = '个体司机运输押金'
                }
                if (this.formInline.depositType == ''){
                    this.$message.error('请选择押金类型 ！');
                }else if (this.formInline.depositMoney == ''){
                    this.$message.error('请输入押金金额 ！');
                }else if (!this.formInline.depositMoney.match(/(^[1-9]([0-9]{0,5})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) {

                    this.$message({
                        message: '请输入数字(最多六位整数)，或小数点后两位',
                        type: 'warning'
                    });
                }else {
                    this.dialogVisible = true
                }
            },
            onSubmit1(){
                if (this.formInline1.depositMoney == ''){
                    this.$message.error('请输入押金金额 ！');
                }else if (!this.formInline1.depositMoney.match(/(^[1-9]([0-9]{0,5})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/))  {
                    this.$message({
                        message: '请输入数字(最多六位整数)，或小数点后两位',
                        type: 'warning'
                    });
                }else {
                    this.dialogVisible1 = true
                }
            },
            onSubmit2(type){
                console.log(type);
                let reg=/^\d+$/g;
                if(type==='driver_time'){
                    if(this.formInlines.id===''||this.formInlines.id===undefined){
                        this.$message({
                            message: '次数不能为空！',
                            type: 'warning'
                        });
                        return;
                    }
                    if(!reg.test(this.formInlines.id)){
                        this.$message({
                            message: '请输入整数！',
                            type: 'warning'
                        });
                        return;
                    }

                    if(this.formInlines.id.length>4&&!reg.test(this.formInlines.id)){
                        this.$message({
                            message: '请联系管理员，整数长度不能超过4位！',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if(type==='customer_time'){
                    if(this.formInlines2.id===''||this.formInlines2.id===undefined){
                        this.$message({
                            message: '次数不能为空！',
                            type: 'warning'
                        });
                        return;
                    }
                    if(!reg.test(this.formInlines2.id)){
                        this.$message({
                            message: '请输入整数！',
                            type: 'warning'
                        });
                        return;
                    }

                    if(this.formInlines2.id.length>4&&!reg.test(this.formInlines2.id)){
                        this.$message({
                            message: '请联系管理员，整数长度不能超过4位！',
                            type: 'warning'
                        });
                        return;
                    }
                }

                let page = JSON.stringify({
                    token : this.token,
                    adjustmentTime:type==='driver_time'?parseInt(this.formInlines.id):parseInt(this.formInlines2.id),
                    type:type
                });
                console.log(page);

                this.$confirm('您确定要提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/adjustment_time/set' , page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        //console.log(res);
                        if(res.body.errcode===0){
                            this.$message({
                                message:res.body.message,
                                type: 'success'
                            });
                            if(type==='driver_time'){
                                this.ajax4(type);

                            }else{
                                this.ajax4(type);
                            }
                        }else{
                            this.$message({
                                message:res.body.message,
                                type: 'success'
                            });
                        }
                    }).catch( (error)=> {
                        console.log(error);
                        this.$message({
                            message:'网络连接异常！',
                            type: 'error'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            confirm(){
                if (this.num !==1){
                    let page = JSON.stringify({
                        token : this.token,
                        money : this.formInline.depositMoney,
                        type : this.formInline.depositType,
                    })
                    // this.$http.post('http://192.168.50.52:8080/account/setdeposit',page,{
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/usage_money/set' , page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        if (res.body.errcode == 0){
                            this.$message({
                                message: '提交成功 ！',
                                type: 'success'
                            });
                            this.data();
                            this.formInline.depositMoney='';
                            this.formInline.depositType = ''
                        }else{
                            this.$message.error('提交失败，请联系管理员！');
                            this.formInline.depositMoney='';
                            this.formInline.depositType = ''
                        }


                    })
                } else{
                    let page = JSON.stringify({
                        token : this.token,
                        money : this.formInline1.depositMoney,
                        type : 'vehicleSubsidy',
                    })
                    // this.$http.post('http://192.168.50.52:8080/account/setdeposit',page,{
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/usage_money/set' , page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        if (res.body.errcode == 0){
                            this.$message({
                                message: '提交成功 ！',
                                type: 'success'
                            });
                            this.data();
                            this.formInline1.depositMoney='';
                            // this.formInline1.depositType = ''
                        }else{
                            this.$message.error('提交失败，请联系管理员！');
                            this.formInline1.depositMoney='';
                            // this.formInline1.depositType = ''
                        }


                    })
                }

            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.data()
            },
            handleSizeChange(val){
                this.pagesize = val
                this.data()
            },
            handleCurrentChange2(val) {
                this.currentPage = val
                this.ajax2()
            },
            handleSizeChange2(val){

                this.pagesize = val
                this.ajax2()
            },
            handleCurrentChange3(val) {
                this.current3 = val;
                this.ajax4('driver_time')
            },
            handleSizeChange3(val){
                this.pagesize3 = val
                this.ajax4('driver_time')
            },
            handleCurrentChange4(val) {
                this.current4 = val;
                this.ajax4('customer_time')
            },
            handleSizeChange4(val){
                this.pagesize4 = val;
                this.ajax4('customer_time')
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            handleClick() {
                if (this.activeName === 'first') {
                    this.currentPage=1
                    this.ajax1()
                }
                if (this.activeName === 'second'){
                    this.currentPage2=1
                    this.ajax2()
                }
                if(this.activeName === 'accountSettings'){
                    if(this.cashPledge==='drivers'){
                        this.ajax4('driver_time')
                    }else{
                        this.ajax4('customer_time')
                    }
                }
                console.log(this.activeName)
            },
            handleClicks() {
                if (this.cashPledge === 'drivers') {
                    this.formInlines.id='';
                    this.current3=1;
                    this.ajax4('driver_time');
                }else {
                    this.formInlines2.id='';
                    this.current4=1;
                    this.ajax4('customer_time');
                }
            }
        }

    }
</script>
<style lang="scss">
    .cash{
        .header{
            line-height: 56px;
            color:#606163;
            font-size:16px;
            .header_position{
                color:#2b2c2e;
                font-weight: bold;
            }
        }
        .el-tabs__nav{
            height:55px;
            .el-tabs__item{
                height:55px;
                line-height: 55px;
                background: white;
                padding:0 20px!important;
            }
            .is-active{
                border-top-color: #337df6;
            }
        }
        .el-tabs__nav-scroll{
            margin: 20px;
        }
        .msg{
            margin-top: 20px;
            .el-message-box__content{
                font-size: 16px;
            }
            .titleSize{
                width: 100%;
                font-size: 16px;
                line-height: 40px;
                text-align: center;
                padding-bottom: 10px;
            }
        }
    }


</style>