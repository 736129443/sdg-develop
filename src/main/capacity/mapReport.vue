<template>
    <div class="main map">
        <div class="header">
            当前位置: <span>项目管理 > 项目财务 > 项目明细</span>
        </div>
        <div class="financeCard">
            <div class="maptitle">
                <span style="font-weight: bold;">{{financtR.customerName}} </span><span style="font-size: 16px">({{financtR.filialeName}})</span>
                &nbsp;&nbsp;<span style="color: rgb(56,129,254);font-size: 16px">{{financtR.freezeStatus}}</span>
            </div>
            <hr>
            <div class="PersonalInformation">
                <div class="PI_l">
                    <span>账期 ：N+ {{financtR.billCycle}} 天</span>
                    <span class="phone">开票税率 ：{{financtR.taxRate}}</span>
                </div>
                <span class="vertical"> </span>
                <div class="PI_r">
                    <div class="son">
                        <span> 销售专员 ： {{financtR.saleName}} </span>
                        <br>
                        <span class="phone">运营专员 ： {{financtR.projectName}}</span>
                    </div>
                </div>
            </div>
        </div>
        <span class="data_submit">日期 ： </span>
        <!--:picker-options="pickerOptions0"-->
        <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                value-format="timestamp"
                :formatter="dateFormat"

                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" @click="submit">查 询</el-button>
        <el-button @click="centerDialogVisible=true" v-if="checkReportDetail">查看明细</el-button>
        <el-button plain @click="ontime(7)">7 天</el-button>
        <el-button plain @click="ontime(15)">15 天</el-button>
        <el-button plain @click="ontime(30)">30 天</el-button>
        <el-button plain @click="Report()" v-if="checkReportExport">导 出</el-button>
        <div class="gmv">
            <div class="gmvLeft">
                <div class="gmvmoney">
                    <div class="sizrStyle"><span v-if="datas.gmv>0">+</span>{{datas.gmv}}</div>
                    <div>GMV</div>
                </div>
                <div class="car">
                    <div class="sizrStyle">+{{datas.trackCount}}</div>
                    <div>出车数量</div>
                </div>
                <div class="car">
                    <div class="sizrStyle">+{{datas.driverCount}}</div>
                    <div>司机数量</div>
                </div>
                <div class="grossprofit" style="width: 34%;">
                    <div class="grossprofit1">
                        <span style="font-size: 16px">毛利额</span>
                        <span
                            style="display: block;float: right;font-weight: bold;">{{datas.grossProfit}}</span>
                    </div>
                    <div class="grossprofit1"><span style="font-size: 16px">毛利率</span> <span
                            style="display: block;float: right;font-weight: bold;">{{datas.grossProfitMargin}}%</span>
                    </div>
                </div>
            </div>
            <div class="gmvRight">
                <div class="gmvmoney">
                    <div class="sizrStyle"><span v-if=" datas.totalCost>0 ">+</span>{{datas.totalCost}}</div>
                    <div>总成本</div>
                </div>
                <div class="grossprofit">
                    <div class="grossprofit1"><span style="font-size: 16px">司机运费</span> <span
                            style="display: block;float: right;font-weight: bold;"><span v-if="datas.driverCost>0">+</span>{{datas.driverCost}}</span></div>
                    <div class="grossprofit1"><span style="font-size: 16px">项目人员成本</span> <span
                            style="display: block;float: right;font-weight: bold;">+{{datas.manpowerCost}}</span></div>
                </div>
                <div class="grossprofit">
                    <div class="grossprofit1"><span style="font-size: 16px">开票税额</span> <span
                            style="display: block;float: right;font-weight: bold;"><span v-if="datas.taxCost>0">+</span>{{datas.taxCost}}</span></div>
                    <div class="grossprofit1"><span style="font-size: 16px">其他成本</span> <span
                            style="display: block;float: right;font-weight: bold;">{{datas.otherCost}}</span></div>
                </div>
            </div>
        </div>
        <div class='gmvmap'>
            <div class="gmvmap1">
                <div>
                    <div id="myChart" :style="{width:'90%',height:'380px'}"></div>
                </div>
            </div>
            <div class="gmvmap2">
                <div>
                    <div id="myChart1" :style="{width:'90%',height:'380px'}"></div>
                </div>
            </div>
        </div>
        <div class="toptop">
            <div class="gmvmap3">
                <div>
                    <div id="myChart2" :style="{width:'90%',height:'380px'}"></div>

                </div>
            </div>
            <div class="gmvmap4">
                <div>
                    <div id="myChart3" :style="{width:'630px',height:'380px'}"></div>

                </div>
            </div>
        </div>
        <el-dialog
                :title= name
                :visible.sync="centerDialogVisible"
                center>
            <el-table :data="tableData" style="width: 100%;" height="568">
                <el-table-column prop="dateTime" label="日期" align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="gmv" label="GMV" align="center" ></el-table-column>
                <el-table-column prop="trackCount" label="出车数量" align="center" ></el-table-column>
                <el-table-column prop="driverCount" label="司机数量" align="center" ></el-table-column>
                <el-table-column prop="driverCost" label="司机运费" align="center" ></el-table-column>
                <el-table-column prop="manpowerCost" label="项目人员成本" align="center" ></el-table-column>
                <el-table-column prop="taxCost" label="开票税额" align="center" ></el-table-column>
                <el-table-column prop="otherCost" label="其他成本" align="center" >
                </el-table-column>
                <el-table-column prop="grossProfit" label="毛利额" align="center" >
                </el-table-column>
                <el-table-column prop="grossProfitMargin" label="毛利率" align="center" >
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {openPostWindow} from "../../js/report.js";

    var myChart0;
    var myChart1;
    var myChart2;
    var myChart3;
    import {getDate_s as times} from "../../js/listWarehouse.js";
    import moment from 'moment'
    export default {
        name: "mapReport",
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // this.id = Base64.decode(this.$route.query.userId)
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // if (jurisdictions[6].menus.length == 37) {
//                31 checkReportDetail  查看报表明细
                this.checkReportDetail = jurisdictions[6].menus[31].choose;
                // 'checkReportExport':'查看报表导出'

                this.checkReportExport = jurisdictions[6].menus[32].choose;

// 'checkReport':'查看报表','checkReportDetail':'查看报表明细','checkReportExport':'查看报表导出'
//             }
            this.financtR = JSON.parse(sessionStorage.getItem('financtReport'))
            this.name = this.financtR.customerName+' '+"财务明细" ;
            // console.log(new Date.prototype.setUTCDate());
            // let myDate = new Date()
            // var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay();
            // console.log('lllllllllllll');
            // console.log(monthFirst);
            // console.log('lllllllllllll');

            var date=new Date();
                date.setDate(1);
                date.setHours(0);
                date.setSeconds(0);
                date.setMinutes(0);
            var dateStart = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            // console.log(dateStart.getTime());
            console.log(date.getTime());
            let moment = new Date();
                moment.setHours(0);
                moment.setSeconds(0);
                moment.setMinutes(0);
            console.log(moment.getTime()-1000);
            this.time = [ date.getTime() , moment.getTime()-1000]
            this.map(date.getTime() , moment.getTime()-1000)
            // this.ontime(7)
        },
        data() {
            return {
                // pickerOptions0: {
                //     disabledDate(time) {
                //         let _now = Date.now()-1000*60*60*24-1,
                //             seven = 30 * 24 * 60 * 60 * 1000,
                //             sevenDays = _now - seven;
                //         console.log(time.getTime());
                //         return time.getTime() > _now || time.getTime() < sevenDays;
                //     }
                // },
                time: [],
                id: '',
                financtR: {},
                datas: {},
                centerDialogVisible:false,
                tableData:[],
                name : '',
                checkReportExport:false,
                checkReportDetail:false,
            }
        },
        methods: {
            //导出
            Report(){
                let page;
                if (this.time != null){
                    if (this.time[1].toString()[12] == 9) {
                        page = JSON.stringify({
                            token: this.token,
                            userId: this.financtR.userId,
                            projectName:this.financtR.customerName,
                            startTime: this.time[0],
                            endTime: this.time[1],
                        })
                    }else{
                        page = JSON.stringify({
                            token: this.token,
                            userId: this.financtR.userId,
                            projectName:this.financtR.customerName,
                            startTime: this.time[0],
                            endTime: this.time[1]+1000*60*60*24-1,
                        })
                    }

                }else{
                    page = JSON.stringify({
                        token: this.token,
                        userId: this.financtR.userId,
                        startTime: '',
                        endTime: '',
                    })
                }
                console.log(page);
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/project_report';
                openPostWindow(exportLink,page)
            },
            //数据请求
            map(start,end) {

                    let page = JSON.stringify({
                        token: this.token,
                        userId: this.financtR.userId,
                        startTime: start,
                        endTime: end,
                        projectName:this.financtR.customerName
                    })
                    console.log(page);
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/project_report', page, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        if (res.body.errcode == 0) {
                            this.tableData = res.body.result.detail
                            let dateTime = [];
                            let gmv = [];
                            let grossProfit = [];
                            let totalCost = [];
                            let driverCost = '';
                            let taxCost = '';
                            let manpowerCost = '';
                            let otherCost='';
                            let totalCosts = res.body.result.summary.totalCost;
                            let link = []
                            link.push(res.body.result.summary.driverCost)
                            driverCost = Number(res.body.result.summary.driverCost);
                            link.push(res.body.result.summary.manpowerCost)
                            link.push(res.body.result.summary.taxCost)
                            taxCost = res.body.result.summary.taxCost;
                            otherCost = res.body.result.summary.otherCost;
                            manpowerCost = res.body.result.summary.manpowerCost;

                            myChart0 = this.$echarts.init(document.getElementById('myChart'));
                            myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                            myChart2 = this.$echarts.init(document.getElementById('myChart2'));
                            myChart3 = this.$echarts.init(document.getElementById('myChart3'));
                            for (let i = 0; i < res.body.result.detail.length; i++) {
                                res.body.result.detail.dateTime = times(res.body.result.detail[i].dateTime);
                                dateTime.push(res.body.result.detail.dateTime);
                                gmv.push(res.body.result.detail[i].gmv);
                                grossProfit.push(res.body.result.detail[i].grossProfit);
                                totalCost.push(res.body.result.detail[i].totalCost);
                            }
                            let echa = {
                                title: {
                                    text: 'GMV'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: dateTime
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    data: gmv,
                                    type: 'line',
                                    areaStyle: {},
                                    color: 'rgb(180,211,239)',
                                }]
                            };
                            myChart0.setOption(echa);
                            let echa1 = {
                                title: {
                                    text: '毛利额'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: dateTime
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    data: grossProfit,
                                    type: 'line',
                                    areaStyle: {},
                                    color: 'rgb(154,225,219)',
                                }]
                            };
                            myChart1.setOption(echa1);
                            let echa2 = {
                                title: {
                                    text: '总成本'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                },
                                xAxis: {
                                    type: 'category',
                                    data: dateTime
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    data: totalCost,
                                    type: 'line',
                                    color: 'rgb(253,218,12)'
                                }]
                            };
                            myChart2.setOption(echa2);
                            let echa3 = {
                                title: {
                                    text: '成本结构分布',
                                    fontWeight:'normal',
                                    subtext: '成本占比',
                                },
                                legend: {
                                    orient: 'vertical',
                                    x: 'right',
                                    y:'bottom',
                                    data:['司机运费','项目人员成本','开票税额','其他成本']
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{b}: {c} ({d}%)"
                                },
                                series: [
                                    {
                                        type: 'pie',
                                        radius: '50%',

                                        label: {},
                                        labelLine: {
                                            normal: {}
                                        },
                                        data: [
                                            {value: driverCost,name:'司机运费',itemStyle: {color: '#fedb0d'}},
                                            {value: manpowerCost,name:'项目人员成本' ,itemStyle: {color: '#ff981f'}},
                                            {value: taxCost,name:'开票税额',itemStyle: {color: '#da1a03'} },
                                            {value: otherCost,name:'其他成本',itemStyle: {color: '#f05f35'} }
                                        ],
                                    },
                                ]
                            };
                            myChart3.setOption(echa3);
                            this.datas = res.body.result.summary
                            this.datas.grossProfitMargin = (this.datas.grossProfitMargin*100).toFixed(2)

                        }
                    })


            },
            // 按钮请求
            ontime(time){
                let dayTime = new Date(new Date().toLocaleDateString()).getTime()-1 ;
                let seven
                if (time == 7){
                    this.time = []
                    seven = dayTime-1000*60*60*24*7+1 ;
                    this.time[0] = seven
                    this.time[1] = dayTime
                    this.map(this.time[0],this.time[1])
                }else if (time == 15) {
                    this.time = []
                    seven = dayTime-1000*60*60*24*15+1 ;
                    this.time[0] = seven
                    this.time[1] = dayTime
                    this.map(this.time[0],this.time[1])
                }else if (time == 30) {
                    this.time = []
                    seven = dayTime-1000*60*60*24*30+1 ;
                    this.time[0] = seven
                    this.time[1] = dayTime
                    this.map(this.time[0],this.time[1])
                }
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            // 查询按钮
            submit(){
                if (this.time != null){
                    if (this.time[1]+1000*60*60*24-1 - this.time[0] > 1000*60*60*24*90) {
                        this.$message({
                            message: '查询区间不能超过90天',
                            type: 'warning'
                        });
                    }else{
                        if (this.time[1].toString()[9] == 0&&this.time[1].toString()[10] == 0&&this.time[1].toString()[11] == 0) {
                            this.time[1] = this.time[1]+1000*60*60*24-1
                            this.map(this.time[0],this.time[1])
                        }else{
                            this.map(this.time[0],this.time[1])
                        }


                    }
                }
            }

        },
        mounted() {
            // this.map()

            window.addEventListener('resize', () => {
                myChart0.resize();  // 多个图表，第一个图表
                myChart1.resize();  // 多个图表，第一个图表
                myChart2.resize();  // 多个图表，第二个图表
                myChart3.resize();  // 多个图表，第二个图表
            });

        },

    }
</script>

<style scoped lang="scss">
    .map {
        padding-bottom: 50px !important;
        .header {
            padding-bottom: 20px;
        }
        .financeCard {
            padding: 30px 50px;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: 2px 2px 2px #C2C5C9;
            margin-bottom: 20px;
            min-width: 1284.800px;
            .PersonalInformation {
                box-sizing: border-box;
                overflow: hidden;
                padding-top: 15px;
                .PI_l {
                    width: 49%;
                    text-align: right;
                    padding-right: 3px;
                    font-size: 16px;
                    /*font-weight: bold;*/

                    display: inline-block;
                    float: left;
                    .phone {
                        color: black;
                    }
                    span {
                        display: block;
                        width: 100%;
                    }
                }
                .PI_r {
                    width: 49%;
                    float: left;
                    font-size: 16px;
                    /*color: #A3A3A3;*/
                    .son {
                        font-size: 16px;
                    }
                }
                .vertical {
                    float: left;
                }
                .vertical::after {
                    display: inline-block;
                    transform: translateX(100%) translateY(30%);
                    text-align: center;
                    content: '';
                    margin: 0 10px 12px 7px;
                    width: 2px;
                    height: 30px;
                    vertical-align: -6px;
                    background-color: #CBCBCB;

                }
            }
            .money {
                padding: 30px 100px;
                font-size: 16px;
                img {
                    vertical-align: bottom;
                    padding-right: 7px;
                }
            }
            .maptitle {
                font-size: 20px;
                text-align: center;
            }
        }
        .data_submit {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
        }
        .gmv {
            width: 100%;
            min-width: 1200px;
            overflow: hidden;
            padding: 20px 5px 5px 0;
            .gmvLeft {
                width: 49%;
                padding: 30px 20px;
                float: left;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 2px 2px 2px #C2C5C9;
                .gmvmoney {
                    width: 20%;
                    display: inline-block;
                    background-color: rgb(245, 245, 245);
                    padding: 30px 20px;
                    box-sizing: border-box;
                    margin-right: 10px;
                    text-align: center;
                }
                .car {
                    width: 20%;
                    text-align: center;

                    display: inline-block;
                    background-color: rgb(245, 245, 245);
                    padding: 30px 20px;
                    box-sizing: border-box;
                }
                .grossprofit {
                    width: 50%;
                    display: inline-block;
                    vertical-align: top;

                    .grossprofit1 {
                        padding: 13px 20px;
                        background-color: rgb(245, 245, 245);

                    }
                    .grossprofit1:nth-child(1) {
                        margin-bottom: 11px;
                    }
                }
            }
            .gmvRight {
                width: 49%;
                padding: 30px 20px;
                float: right;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 2px 2px 2px #C2C5C9;
                .gmvmoney {
                    width: 20%;
                    display: inline-block;
                    background-color: rgb(245, 245, 245);
                    padding: 30px 20px;
                    box-sizing: border-box;
                    margin-right: 25px;
                    text-align: center;
                }
                .grossprofit {
                    width: 35%;
                    display: inline-block;
                    vertical-align: top;

                    .grossprofit1 {
                        padding: 13px 20px;
                        background-color: rgb(245, 245, 245);

                    }
                    .grossprofit1:nth-child(1) {
                        margin-bottom: 11px;
                    }
                }

            }
            .sizrStyle {
                font-size: 18px;
                font-weight: bold;
            }
        }
        .gmvmap {
            width: 100%;
            min-width: 1200px;

            overflow: hidden;
            padding: 20px 5px 5px 0;
            .gmvmap1 {
                height: 450px;
                width: 49%;
                float: left;
                background-color: #fff;
                box-sizing: border-box;
                box-shadow: 2px 2px 2px #C2C5C9;
                padding-top: 35px;
                padding-left: 50px;
            }
            .gmvmap2 {
                height: 450px;
                width: 49%;
                float: right;
                background-color: #fff;
                box-sizing: border-box;
                box-shadow: 2px 2px 2px #C2C5C9;
                padding-top: 35px;
                padding-left: 50px;

            }

        }
        .toptop {
            height: 450px;
            width: 100%;
            min-width: 1200px;
            padding-top: 35px;
            padding-left: 50px;
            margin-top: 20px;
            background-color: #fff;
            box-sizing: border-box;
            box-shadow: 2px 2px 2px #C2C5C9;
            .gmvmap3 {
                width: 55%;
                height: 450px;
                float: left;
                display: inline-block;
            }
            .gmvmap4 {
                width: 30%;
                float: left;
                height: 450px;
                padding-left: 50px;
                padding-top: 20px;
                padding-right: 50px;
            }
        }
        .mapS {
            width: 780px;
            height: 430px;
        }
    }
</style>