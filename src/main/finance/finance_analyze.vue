<template>
    <div class="main">
        <p style="display: block;padding-bottom: 20px">
        当前位置/<span>财务管理 <span style="font-size: 18px;font-weight: 600">/财务分析</span></span>
        </p>
        <span style="font-size: 20px">物流成本</span> &nbsp;&nbsp;&nbsp;
        <el-button type="primary" autofocus @click="seventian" plain >7天</el-button>
        <el-button type="primary" @click="fifteen" plain >15天</el-button>
        <el-button type="primary" @click="onemptied" plain>30天</el-button>
        <div class="gb clearfix">
            <div class="gb1_l">
                <div class='echa' >
                    <div>
                        <div id="myChart0" :style="{width:'100%',height:'350px',}"></div>
                    </div>
                </div>
            </div>
            <div class="gb1_r">
                <div class='echa' >
                    <div id="myChart1" :style="{width:'100%',height:'320px'}"></div>
                </div>
            </div>
        </div>
        <!--<h3 style="font-size: 20px"></h3>-->
        <span style="font-size: 20px">月度销售报表</span>
        <div class="gb clearfix" style="height: 450px;">
            <div class="gb1_l" id="list">
                <!--<div style="margin-bottom: 10px">-->
                时间 :  <el-select v-model="selected2"  placeholder="请选择年份" style="width: 11%">
                            <el-option v-for="add in time_y" :label="add" :value="add"></el-option>
                        </el-select>
                        <el-select v-model="selected3"  style="width: 11%"   placeholder="请选择月份">
                            <el-option
                                    v-for="item in month"
                                    :key="item.value"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                管理区 :
                <el-select v-model="regionId" placeholder="请选择管理区" style="width: 20%">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in options" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
                分公司 :
                <el-select v-model="filialeId" placeholder="请选择分公司" style="width: 20%">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in links" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                </el-select>
                <!--管理区 : <el-select v-model="value"   placeholder="地区" class="sel" >-->
                <!--<el-option label="全部" value=""></el-option>-->
                <!--<el-option v-for="i in options" :label='i.name' :value="i.id" :key="i.id"></el-option>-->
            <!--</el-select>-->
                        <el-button @click="finance0" type="primary">查询</el-button>
                <div class="sales_lb">
                    <el-table
                            :data="tableData"
                            height="249"
                            style="width: 100%">
                        <el-table-column
                                prop="queryDate"
                                label="月份"
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
                                prop="regionName"
                                label="管理区"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="totalIncome"
                                label="收入"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="totalCost"
                                label="支出"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="grossMargins"
                                label="毛利"
                                align="center"
                        >
                        </el-table-column>
                        <!--<el-table-column-->
                        <!--fixed-->
                        <!--prop="customerId"-->
                        <!--label="盈利"-->
                        <!--align="center"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->
                    </el-table>

                </div>
            </div>
            <div class="gb1_r">
                <div>
                    <div id="myChart" :style="{width:'100%',height:'380px'}"></div>
                </div>
            </div>
        </div>
        <span style="font-size: 20px">财务走势</span>
        <div class="clearfix bgc">
            <div style="padding-bottom: 20px;">
                时间 :  <el-select v-model="selected1" placeholder="请选择年份"  @change="aa">
                            <el-option v-for="add in time_y" :label="add" :value="add"></el-option>
                        </el-select>&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="selected" placeholder="请选择月份"  @change="aa">
                    <el-option
                            v-for="item in month"
                            :key="item.value"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>&nbsp;&nbsp;月&nbsp;&nbsp;
                至&nbsp;&nbsp;
                <el-select v-model="endyear" disabled>
                    <el-option v-for="add in time_y" :label="add" :value="add"></el-option>
                </el-select>&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="endmonth" disabled >
                    <el-option
                            v-for="item in month"
                            :key="item.value"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;
                管理区 ：
                <el-select v-model="zs_regionId" placeholder="地区" class="sel" @change="onzs_regionId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in options" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
                分公司 ：

                <el-select v-model="zs_filialeId" placeholder="请选择分公司" style="width: 20%" @change="onzs_filialeId">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in links" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option></el-select>



                <el-button @click="finance">查询</el-button>
            </div>
            <div class="box">
                <div>
                    <div id="myChart3" :style="{width:'780px',height:'370px'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "../../../mock/sales.js"
export default {
    data(){
        return {
            list:[],
            add:[],
            ok:[],
            bike:[],
            single:[],
            list0:[],
            add0:[],
            ok0:[],
            bike0:[],
            single0:[],
            myChartlist:[],
            myChartadd:[],
            myChartareaName:[],
            myChartbike:[],
            myChartsingle:[],
            myCharttotalIncome:[],
            myChartareaName1:[],
            value4:'',
            value5:'',
            monthn:{},
            time_y:{
                time0:'',
                time1:'',
                time2:'',
            },
            selected:[],
            selected1:[],
            selected2:'',
            selected3:'',
            month:['1','2','3','4','5','6','7','8','9','10','11','12'],
            bb:0,
            cc:0,
            tableData:[],
            token:'',
            time3 :'',
            time4 :'',
            time5:'',
            value :'',
            value1:'',
            options:[],
            bbmonth:'',
            bbmonth0:'',
            endyear:[],
            endmonth:[],
            monthTime:'',
            pickerOptions0: {
                disabledDate(time) {
                    let curDate = (new Date()).getTime();
                    let three = 3 * 365 * 24 * 3600 * 1000;
                    let threeMonths = curDate - three;
                    return time.getTime() > Date.now() || time.getTime() < threeMonths;;
                }
            },
            filialeId:'',
            regionId:'',
            links:[],
            zs_filialeId:'',
            zs_regionId:'',
        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let page1 = JSON.stringify({
            token: this.token
        });
        this.$http.post(
            + '/companyv1/finance/query/admin_management/area',page1 , {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        } ).then((res)=>{
            this.links = res.body.result;
        })

        // this.monthTime = new Date().getTime()
        this.data();
        this.time();
    },
    mounted(){
        this.list = [];
        let page =JSON.stringify({
            token : this.token,
            queryDays : 7 ,
        });
        this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_total_cost',page, {
        //     this.$http.post( 'http://192.168.50.32:8099/finance/reportformscost',page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.add=[ ];
                this.ok=[ ];
                this.bike = [ ],
                this.single=[ ] ,
                this.list = res.body.result;
                for( let val in this.list ) {
                    this.add.push(val);
                    this.ok.push(this.list[val].costByCar);
                    this.bike.push(this.list[val].costByPoint);
                    this.single.push(this.list[val].totalCost);
                };
            console.log(this.add.reverse( ));
            let myChart0 = this.$echarts.init(document.getElementById('myChart0'));
            var cha_a = {
                title: {
                    text: '总成本趋势分析'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['收入'],
                    x:'right'
                },
                xAxis: {
                    data : this.add,
                    boundaryGap: false,
                    splitLine:{show: false}
                },
                yAxis: {
                    type: 'value',
                    splitLine:{show: false},
                },
                series: [
                    {
                        name:'收入',
                        type:'line',
                        // stack: '总量',
                        color:'#95C1E8',
                        areaStyle: {},
                        data:this.single.reverse( )
                    }
                ],
                // alert(1)
            }
                    myChart0.setOption(cha_a);
                    // 图二
                    let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                    var cha_b = {

                        title: {
                            text: '订单/车辆维度成本分析'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data:['单车配送成本（元）','单票妥投成本（元）'],
                            x:'right'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : this.add,
                                splitLine:{show: false},
                            },

                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitLine:{show: false},
                            }
                        ],
                        series : [
                            {
                                name:'单车配送成本（元）',
                                type:'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                color:'#c5e7f3',
                                data:this.ok.reverse()
                                // data:this.ok,
                            },
                            {
                                name:'单票妥投成本（元）',
                                type:'line',
                                // stack: '总量',
                                color:'#8ad8dc',
                                areaStyle: {normal: {}},
                                data:this.bike.reverse( ),
                            },
                        ]
                    }
                    myChart1.setOption(cha_b);
        });
        // 图1
        // this.$http.get('/sales').then(res=>{
            // if(res.body.status == 0){
            //     this.list = res.body.data;
            //     for (var i = 0;i<this.list.length;i++){
            //         this.add.push(this.list[i].time);
            //         this.ok.push(this.list[i].obj);
            //         this.bike.push(this.list[i].bike);
            //         this.single.push(this.list[i].single);
            //     }
            //     let myChart0 = this.$echarts.init(document.getElementById('myChart0'));
            //     // console.log(this.add)
            //     var cha_a = {
            //         tooltip: {
            //         },
            //         legend: {
            //             data:['收入']
            //         },
            //         xAxis: {
            //             data : this.add
            //         },
            //         yAxis: {
            //             type: 'value'
            //         },
            //         series: [
            //             {
            //                 name:'收入',
            //                 type:'line',
            //                 stack: '总量',
            //                 data:this.ok
            //             }
            //         ],
            //         // alert(1)
            //     }
            //     myChart0.setOption(cha_a);
            //     // 图二
            //     let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
            //     var cha_b = {
            //         tooltip : {
            //             trigger: 'axis',
            //             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            //                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            //             }
            //         },
            //         legend: {
            //             data:['单车配送成本（元）','单票妥投成本（元）']
            //         },
            //         grid: {
            //             left: '3%',
            //             right: '4%',
            //             bottom: '3%',
            //             containLabel: true
            //         },
            //         xAxis : [
            //             {
            //                 type : 'category',
            //                 data : this.add
            //             }
            //         ],
            //         yAxis : [
            //             {
            //                 type : 'value'
            //             }
            //         ],
            //         series : [
            //             {
            //                 name:'单车配送成本（元）',
            //                 type:'bar',
            //                 data:this.bike
            //             },
            //             {
            //                 name:'单票妥投成本（元）',
            //                 type:'bar',
            //                 stack: '广告',
            //                 data:this.single
            //             }
            //         ]
            //     }
            //     myChart1.setOption(cha_b);
            // }
        // });
        // 图二  1
        // 月度销售报表
        this.selected3 = this.selected3-1;
        if (  this.selected3 == 0 ){
            this.selected3 = 12;
            this.selected2 =  this.selected2 -1;
        }
        let threetime0 = this.selected2;
        let threetime1 = this.selected3;
        if ( threetime1 <10 ){
            threetime1 = '0' + threetime1;
        }
        let threetime2 = threetime0 + '' + threetime1;
        // let name = this.value.join(',');
        let page3 = JSON.stringify({
            token : this.token,
            queryDate: threetime2,
            filialeId :this.filialeId,
            regionId :this.regionId,
        });
        console.log(page3);
        this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_sale_report',page3,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res)=>{
            console.log(res);
            let  myChart_d= document.getElementById('myChart');

            if (res.body.result == 'failed') {
                myChart_d.style.display='none';
            } else {
                myChart_d.style.display='block';
                this.tableData = res.body.result;
                this.myChartlist = res.body.result;
                for( let val in this.myChartlist ){
                    this.myChartadd.push(val);
                    this.myChartareaName.push(this.myChartlist[val].filialeName);
                    // this.myChartareaName = JSON.stringify(this.myChartareaName)
                    this.myChartbike.push(this.myChartlist[val].grossMargins); //毛利
                    this.myChartsingle.push(this.myChartlist[val].totalCost); //支出
                    this.myCharttotalIncome.push(this.myChartlist[val].totalIncome); //支出

                };
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                var option = {
                    title: {
                        text: this.selected3 + '月份区域财务分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['收入','支出','毛利'],
                        x:'right'
                    },

                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.myChartareaName,
                            splitLine:{show: false},
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{show: false},
                        }
                    ],
                    series : [
                        {
                            name:'收入',
                            type:'line',
                            // stack: '总量',
                            color: '#33a8d3',
                            data:this.myCharttotalIncome,
                        },
                        {
                            name:'支出',
                            type:'line',
                            color: '#8ad8dc',
                            // stack: '总量',
                            data:this.myChartsingle,
                        },
                        {
                            name:'毛利',
                            type:'line',
                            color: '#f1b33a',
                            // stack: '总量',
                            data:this.myChartbike,
                        }
                    ]
                };
                myChart.setOption(option);
            }

        });

        // 二期预留
        // let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        // var Cha2={
        //     title : {
        //         trigger: 'item',
        //         x:'center'
        //     },
        //     tooltip : {
        //         trigger: 'item',
        //         formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     legend: {
        //         left: 'center',
        //         data: ['北京','上海','保定']
        //     },
        //     series : [
        //         {
        //             name: '',
        //             type: 'pie',
        //             radius : '55%',
        //             data:[
        //                 {value:335, name:'北京'},
        //                 {value:310, name:'上海'},
        //                 {value:234, name:'保定'}
        //             ],
        //             itemStyle: {
        //                 emphasis: {
        //                     shadowBlur: 10,
        //                     shadowOffsetX: 0,
        //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
        //                 }
        //             }
        //         }
        //     ]
        // }
        // myChart2.setOption(Cha2);

        // 图三
        // this.selected = 1;
        this.selected = this.selected - 6 ;
        if (this.selected == 0){
            this.selected = 12;
            this.selected1 = this.selected1 - 1
        }else if(this.selected < 0){
            this.selected = 12 + this.selected;
            this.selected1 = this.selected1 - 1
        }
        let time0 = this.selected1;
        let time1 = this.selected;

        time1  = time1 < 10 ? ('0' + time1) : time1;
        let time2 = time0 +time1;
        this.aa();
        // console.log(this.cc );
        // console.log(this.bb);
        // this.endyear = this.cc;
        // this.endmonth = this.bb

        let page1 = JSON.stringify({
            token : this.token,
            startDate : time2,
            endDate : this.time3,
            filialeId: this.zs_filialeId,
            regionId: this.zs_regionId,
        }) ;
        console.log(page1);
        this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_tendency' , page1 , {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then( (res)=>{
            console.log(res);
            this.add0=[];
            this.ok0=[];
            this.bike0 = [];
            this.single0=[];
            this.list0 = res.body.result;
            for( let val in this.list0 ){
                this.add0.push(val);
                this.ok0.push(this.list0[val].totalIncome);
                this.bike0.push(this.list0[val].totalCost);
                this.single0.push(this.list0[val].grossMargins);
            };
            let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
            // var Cha3={
            //     tooltip: {
            //         trigger: 'axis'
            //     },
            //     legend: {
            //         data:['收入','支出','毛利']
            //     },
            //     xAxis: {
            //         data: this.add0
            //     },
            //     yAxis: {
            //         type: 'value'
            //     },
            //     series: [
            //         {
            //             name:'收入',
            //             type:'line',
            //             stack: '总量',
            //             data:this.ok0
            //         },
            //         {
            //             name:'支出',
            //             type:'line',
            //             stack: '总量',
            //             data:this.bike0
            //         },
            //         {
            //             name:'毛利',
            //             type:'line',
            //             stack: '总量',
            //             data:this.single0
            //         },
            //         // {
            //         //     name:'盈利',
            //         //     type:'line',
            //         //     stack: '总量',
            //         //     data:[320, 332, 301, 334, 390, 330, 320]
            //         // }
            //     ]
            // };
            var Cha3 = {
                title: {
                    text: '盈利走势'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['收入','支出','毛利'],
                    x:'right'
                },

                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.add0,
                        splitLine:{show: false},
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine:{show: false},
                    }
                ],
                series : [
                    {
                        name:'收入',
                        type:'line',
                        color: '#33a8d3',
                        areaStyle: {normal: {}},
                        data:this.ok0
                    },
                    {
                        name:'支出',
                        type:'line',
                        color: '#8ad8dc',
                        areaStyle: {normal: {}},
                        data:this.bike0
                    },
                    {
                        name:'毛利',
                        type:'line',
                        color: '#f1b33a',
                        areaStyle: {normal: {}},
                        data:this.single0
                    }
                ]
            }
            myChart3.setOption(Cha3);
        })
    },
    methods:{
        data(){
            var myDate = new Date();
             let time1 =  myDate.getFullYear();
            let time2 =  myDate.getMonth()+1;
            this.selected2 =  time1;
            this.selected3 =  time2 ;
            this.selected1 =  time1;
            this.selected =  time2 ;
            this.bbmonth = this.selected3;
            let page = JSON.stringify({
                token : this.token,
            });
            // this.$http.post( this.global.lightningUrl + '/company/account/companyareaName' , page , {
            //     headers: {
            //         'Content-Type': 'application/json;charset=UTF-8'
            //     }
            // }).then( (res)=>{
            //     this.options = res.body.result;
            // });

            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{

                this.options = run.body.result
            })
        },
        time(){
            var time=new Date();
            var year = time.getFullYear();
            this.time_y.time0 = year;
            this.time_y.time1 = year -= 1;
            this.time_y.time2 = year -= 1;
        },
        aa(){
            this.cc = Number(this.selected1);
            if(this.selected > 6){
                this.bb = Number(this.selected) -6;
                this.cc = Number(this.selected1) + 1;
            }else{
                this.bb = Number(this.selected) + 6;
            }
            if (this.bb < '10'){
                this.bb = '0'+ this.bb;
            }
            this.time3 = this.cc + '' + this.bb;
            this.endyear = this.cc;
            this.endmonth = this.bb
        },
        finance(){
            let date = this.selected;
            if ( date < 10 ){
                date = '0' + date;
            }
            this.bbmonth0 = date;
            this.time5 = this.selected1 + this.bbmonth0;
            let page = JSON.stringify({
                token : this.token,
                filialeId: this.zs_filialeId,
                regionId: this.zs_regionId,
                startDate :this.time5,
                endDate : this.time3,
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_tendency' , page , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then( (res)=>{
                console.log(res);
                this.add0=[];
                this.ok0=[];
                this.bike0 = [],
                this.single0=[],
                this.list0 = res.body.result;
                for( let val in this.list0 ){
                    this.add0.push(val);
                    this.ok0.push(this.list0[val].totalIncome);
                    this.bike0.push(this.list0[val].totalCost);
                    this.single0.push(this.list0[val].grossMargins);
                };
                let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
                var Cha3 = {
                    title: {
                        text: '盈利走势'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['收入','支出','毛利'],
                        x:'right'
                    },

                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.add0,
                            splitLine:{show: false},
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{show: false},
                        }
                    ],
                    series : [
                        {
                            name:'收入',
                            type:'line',
                            color: '#33a8d3',
                            areaStyle: {normal: {}},
                            data:this.ok0
                        },
                        {
                            name:'支出',
                            type:'line',
                            color: '#8ad8dc',
                            areaStyle: {normal: {}},
                            data:this.bike0
                        },
                        {
                            name:'毛利',
                            type:'line',
                            color: '#f1b33a',
                            areaStyle: {normal: {}},
                            data:this.single0
                        }
                    ]
                }
                myChart3.setOption(Cha3);
            })
        },
        finance0(){
            let date = this.selected3;
            this.bbmonth = date;
            if ( date < 10 ){
                date = '0' + date;
            }
            this.time4 = this.selected2 + date;
           // let region =  this.value.join(',');
            let threetime0 = this.selected2;
            let threetime1 = this.selected3;
            if ( threetime1 <10 ){
                threetime1 = '0' + threetime1;
            }
            let threetime2 = threetime0 + '' + threetime1;
            let page =JSON.stringify({
                token : this.token,
                queryDate :threetime2,
                filialeId :this.filialeId,
                regionId : this.regionId,
            });
            console.log(page);
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_sale_report' , page , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.myChartadd=[];
                this.myChartareaName=[];
                this.myChartbike = [];
                this.myChartsingle=[];
                this.myCharttotalIncome=[];
                let  myChart_d= document.getElementById('myChart');
                if ( res.body.result == 'failed' ){
                    myChart_d.style.display='none';
                    this.tableData = ''
                } else {
                    myChart_d.style.display='block';
                    this.tableData = res.body.result;
                    this.myChartlist = res.body.result;
                    for( let val in this.myChartlist ){
                        this.myChartadd.push(val);
                        this.myChartareaName.push(this.myChartlist[val].filialeName);
                        this.myChartbike.push(this.myChartlist[val].grossMargins); //毛利
                        this.myChartsingle.push(this.myChartlist[val].totalCost); //支出
                        this.myCharttotalIncome.push(this.myChartlist[val].totalIncome); //支出

                    };
                    let myChart9 = this.$echarts.init(document.getElementById('myChart'));
                    var option = {
                        title: {
                            text: this.bbmonth + '月份区域财务分析'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data:['收入','支出','毛利'],
                            x:'right'
                        },

                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : this.myChartareaName,
                                splitLine:{show: false},
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitLine:{show: false},
                            }
                        ],
                        series : [
                            {
                                name:'收入',
                                type:'line',
                                // stack: '总量',
                                data:this.myCharttotalIncome,
                            },
                            {
                                name:'支出',
                                type:'line',
                                // stack: '总量',
                                data:this.myChartsingle,
                            },
                            {
                                name:'毛利',
                                type:'line',
                                // stack: '总量',
                                data:this.myChartbike,
                            }
                        ]
                    };
                    myChart9.setOption(option);
                }
            })
        },
        seventian(){
            let page =JSON.stringify({
                token : this.token,
                queryDays : 7
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_total_cost',page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.add=[];
                this.ok=[];
                this.bike = [],
                this.single=[],
                this.list = res.body.result;
                console.log(this.list);
                for( let val in this.list ){
                    this.add.push(val);
                    this.ok.push(this.list[val].costByCar);//单车配送成本
                    this.bike.push(this.list[val].costByPoint);//单票妥投成本
                    this.single.push(this.list[val].totalCost);//费用汇总
                };
                let myChart0 = this.$echarts.init(document.getElementById('myChart0'));
                var cha_a = {
                    title: {
                        text: '总成本趋势分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['收入'],
                        x:'right'
                    },
                    xAxis: {
                        data : this.add.reverse(),
                        boundaryGap: false,
                        splitLine:{show: false}
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: false},
                    },
                    series: [
                        {
                            name:'收入',
                            type:'line',
                            // stack: '总量',
                            color:'#95C1E8',
                            areaStyle: {},
                            data:this.single.reverse()
                        }
                    ],
                    // alert(1)
                }
                myChart0.setOption(cha_a);
                // 图二
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                var cha_b = {

                    title: {
                        text: '订单/车辆维度成本分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['单车配送成本（元）','单票妥投成本（元）'],
                        x:'right'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.add,
                            splitLine:{show: false},
                        },

                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{show: false},
                        }
                    ],
                    series : [
                        {
                            name:'单车配送成本（元）',
                            type:'line',
                            // stack: '总量',
                            areaStyle: {normal: {}},
                            color:'#c5e7f3',
                            // data:this.ok.reverse()
                            data:this.ok.reverse( ),
                        },
                        {
                            name:'单票妥投成本（元）',
                            type:'line',
                            // stack: '总量',
                            color:'#8ad8dc',
                            areaStyle: {normal: {}},
                            data:this.bike.reverse( ),
                        },
                    ]
                }
                myChart1.setOption(cha_b);
            })
        },
        fifteen(){
            let page =JSON.stringify({
                token : this.token,
                queryDays : 15
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_total_cost',page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.add=[];
                this.ok=[];
                this.bike = [],
                this.single=[],
                this.list = res.body.result;
                for( let val in this.list ){
                    this.add.push(val);
                    this.ok.push(this.list[val].costByCar);
                    this.bike.push(this.list[val].costByPoint);
                    this.single.push(this.list[val].totalCost);
                };
                let myChart0 = this.$echarts.init(document.getElementById('myChart0'));
                var cha_a = {
                    title: {
                        text: '总成本趋势分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['收入'],
                        x:'right'
                    },
                    xAxis: {
                        data : this.add.reverse(),
                        boundaryGap: false,
                        splitLine:{show: false}
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: false},
                    },
                    series: [
                        {
                            name:'收入',
                            type:'line',
                            // stack: '总量',
                            color:'#95C1E8',
                            areaStyle: {},
                            data:this.single.reverse()
                        }
                    ],
                    // alert(1)
                }
                myChart0.setOption(cha_a);
                // 图二
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                var cha_b = {

                    title: {
                        text: '订单/车辆维度成本分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['单车配送成本（元）','单票妥投成本（元）'],
                        x:'right'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.add,
                            splitLine:{show: false},
                        },

                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{show: false},
                        }
                    ],
                    series : [
                        {
                            name:'单车配送成本（元）',
                            type:'line',
                            // stack: '总量',
                            areaStyle: {normal: {}},
                            color:'#c5e7f3',
                            // data:this.ok.reverse()
                            data:this.ok.reverse( ),
                        },
                        {
                            name:'单票妥投成本（元）',
                            type:'line',
                            // stack: '总量',
                            color:'#8ad8dc',
                            areaStyle: {normal: {}},
                            data:this.bike.reverse( ),
                        },
                    ]
                }
                myChart1.setOption(cha_b);

            })
        },
        onemptied(){
            let page =JSON.stringify({
                token : this.token,
                queryDays : 30
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/query_total_cost',page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.add=[];
                this.ok=[];
                this.bike = [],
                this.single=[],
                this.list = res.body.result;
                for( let val in this.list ){
                    this.add.push(val);
                    this.ok.push(this.list[val].costByCar);
                    this.bike.push(this.list[val].costByPoint);
                    this.single.push(this.list[val].totalCost);
                };
                let myChart0 = this.$echarts.init(document.getElementById('myChart0'));
                var cha_a = {
                    title: {
                        text: '总成本趋势分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['收入'],
                        x:'right'
                    },
                    xAxis: {
                        data : this.add.reverse(),
                        boundaryGap: false,
                        splitLine:{show: false}
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: false},
                    },
                    series: [
                        {
                            name:'收入',
                            type:'line',
                            // stack: '总量',
                            color:'#95C1E8',
                            areaStyle: {},
                            data:this.single.reverse(),
                        }
                    ],
                    // alert(1)
                }
                myChart0.setOption(cha_a);
                // 图二
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                var cha_b = {

                    title: {
                        text: '订单/车辆维度成本分析'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['单车配送成本（元）','单票妥投成本（元）'],
                        x:'right'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.add,
                            splitLine:{show: false},
                        },

                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitLine:{show: false},
                        }
                    ],
                    series : [
                        {
                            name:'单车配送成本（元）',
                            type:'line',
                            // stack: '总量',
                            areaStyle: {normal: {}},
                            color:'#c5e7f3',
                            // data:this.ok.reverse()
                            data:this.ok.reverse( ),
                        },
                        {
                            name:'单票妥投成本（元）',
                            type:'line',
                            // stack: '总量',
                            color:'#8ad8dc',
                            areaStyle: {normal: {}},
                            data:this.bike.reverse( ),
                        },
                    ]
                }
                myChart1.setOption(cha_b);
            })
        },
        onzs_regionId(){
            this.zs_filialeId = ''
        },
        onzs_filialeId(){
            this.zs_regionId = ''
        },
    },
}
</script>
<style lang="less" scoped>
.main {
    font-size: 16px;
    padding-top: 30px;
    padding-left: 30px;
    padding-bottom: 40px;
    .bgc{
        margin-top: 15px;
        height: 500px!important;
        background-color: #fff;
        box-shadow:2px 2px 3px #aaaaaa;
        padding: 43px 30px;
        box-sizing: border-box;
        .box{
            width: 50%;
            height: 80%;
            margin: 0 auto;
        }
        .el-select{
            width: 11%!important;
        }

    }
    .gb{
        width: 100%;
        height: 400px;
        /*background-color: pink;*/
        margin-bottom: 30px;
        margin-top: 15px;
        #list{
            .el-select{
                width: 25%;
            }
        }
        .size{
            font-size:  14px   ;
        }

        .gb1_l , .gb1_r{
            width: 49%;
            height: 100%;
            padding: 43px 30px;
            box-sizing: border-box;
            background-color: white;
            border-radius: 3px;
            box-shadow:2px 2px 3px #aaaaaa;
        }
        .gb1_l{
            float: left;
        }
        .gb1_r{
            float: right;
        }
    }
    p{
        font-size: 14px;
    }
    #myChart0,#myChart1{
    }
    >h1{
        margin: 20px 0 20px 0;
        font-size: 26px;
        font-weight: 100;
    }
    .map{
        margin-top: 15px;
        overflow: hidden;
        .map_l{
            padding: 5px 5px;
            margin-right: 100px;
            justify-content: flex-start;
            float: left;
            
            >h3{
                border-bottom:  1px solid #cccccc;
                font-weight: normal;
                padding-left: 10px;
            }
            .echa{
                width: 100%;
                background-color: #f2f2f2;

            }
        }
    }
    .sales_s{
        .el-select{
            min-width: 125px;
            width: 8%;
        }
        >h3{
            border: 1px solid #cccccc;
            border-left: 0px;
            border-right: 0px;
            font-weight: normal;
            padding-left: 10px;
            padding: 10px;
            margin-bottom: 10px;
        }
        .sales_lb{
            padding-bottom: 30px;
        }
        .slt{
            width: 170px;
            height: 40px;
            padding: 0px 10px;
            font-size:16px;
            margin-right: 10px;
        }
    }
    .sales_map{
        width: 100%;
        overflow: hidden;
        .cha_s{
            display: block;
            text-align: center
        }

    }
    .fl{
        float: left;
        padding-right: 24%
    }
    .tar{
        text-align: center;
        display: block;
    }
    .sales_lb{
        margin-top: 20px;
    }
    .el-select+.sel{
        width: 200px;
    }
    canvas{
        background-color: white;
    }
    .clearfix:after {
        content:"";
        display: block;
        clear:both;
    }
    .el-date-editor.el-input{
        width: 125px;
        margin-bottom: 10px;
    }
    /*.el-select{*/
        /*width: 23%!important;*/
    /*}*/
    .sel{
        width: 23%!important;
    }

}
</style>