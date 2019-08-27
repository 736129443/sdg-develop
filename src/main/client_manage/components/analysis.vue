<template>
    <div class="main analyze">
        <div class="header">
            当前位置：<span>CRM管理>商机统计>数据分析</span>
        </div>
        <div class='gmvmap'>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="选择分公司">
                    <el-select v-model="formInline.filialeName" placeholder="请选择所属分公司">
                        <el-option label="全部" value="" v-if="wholeCountry"></el-option>
                        <el-option
                            v-for="item in filiale"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择时间">
                    <div class="block">
                        <el-date-picker
                            v-model="formInline.value2"
                            type="month"
                            value-format="yyyy-MM"
                            placeholder="选择月">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                </el-form-item>
            </el-form>
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
        </div>
    </div>
</template>

<script>
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../../../js/Fjurisdiction.js'
    var myChart0 ;
    var myChart1 ;
    var myChart2 ;
    export default {
        data(){
            return {
                branchArea:'',
                wholeCountry:'',
                filiale:[],
                formInline:{
                    filialeName:'',
                    value2:'',
                },
                currentUser:'',
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.branchArea = F_jurisdiction('branchArea', jurisdictions);
            this.wholeCountry = F_jurisdiction('wholeCountry', jurisdictions);
            console.log(this.wholeCountry);
            this.currentUser = user.result.currentUser;
            console.log(user.result);
            this.Branch();
        },
        mounted(){
            this.mapOne(this.formInline.filialeName,this.formInline.value2);

        },
        methods:{
            Branch() {
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                    'token':this.token,
                })).then(res=>{
                    if (res.body.errcode == 0) {
                        if (!this.wholeCountry) {
                            this.filiale.push({deptName:this.currentUser.filialeName,id:this.currentUser.filialeId});
                            console.log(this.filiale);
                        }else {
                            this.filiale = res.body.result;
                        }
                    }
                });
            },
            //查询接口
            query() {
                this.mapOne(this.formInline.filialeName,this.formInline.value2);
            },
            mapOne(filialeId,yearMonth){
                myChart0 = this.$echarts.init(document.getElementById('myChart'));
                myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                myChart2 = this.$echarts.init(document.getElementById('myChart2'));
                var date = new Date;
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                month = (month<10 ? "0"+month:month);
                var mydate = (year.toString()+ '-' +month.toString());
                console.log(mydate);
                // return
                let page = JSON.stringify({
                    token:this.token,
                    filialeId:filialeId,
                    yearMonth:yearMonth,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/customerManage/potential_client/turn_time',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                        var result = res.body.result ;
                    }else {
                        var result = {
                            one: 0,
                            onePercent: "0.00",
                            three: 0,
                            threePercent: "0.00",
                            total: 0,
                            two: 0,
                            twoPercent: "0.00",
                        };
                    }
                    let option = {
                        title: {
                            text: '商机转换',
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} : {c}%"
                        },
                        legend: {
                            data: ['30天内转化为客户的商机数 ' +result.one,'30天外-90天内转化为客户的商机数 '+result.two,'90天内转化为客户的商机数 ' +result.three,'所有商机数 '+result.total],
                            orient: 'vertical',
                            x: 'right',
                        },
                        calculable: true,
                        series: [
                            {
                                name:'商机转换',
                                type:'funnel',
                                left: '10%',
                                top: 60,
                                bottom: 60,
                                width: '70%',
                                minSize: '50%',
                                sort: 'ascending',
                                gap: 20,
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                itemStyle: {

                                    normal: {
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                        //以下为是否显示，显示位置和显示格式的设置了
                                        label: {
                                            show: true,
                                            position: 'top',
                                            formatter: '{b}\n{c} %'
                                        }
                                    },

                                    // normal: {
                                    //     show: true,
                                    //     position: 'top',
                                    //     color: '#CEBDFF',
                                    //     //柱形图圆角，初始化效果
                                    //     barBorderRadius:[0, 50, 50, 0],
                                    // }

                                },
                                data: [
                                    {value: result.onePercent , name: '30天内转化为客户的商机数 ' +result.one,},
                                    {value: result.threePercent, name: '30天外-90天内转化为客户的商机数 '+result.two,},
                                    {value: result.twoPercent, name: '90天内转化为客户的商机数 '+result.three,},
                                    {value:'100', name: '所有商机数'+result.total,},
                                ]
                            }
                        ]
                    };
                    myChart0.setOption(option);
                })
                let page1 = JSON.stringify({
                    token:this.token,
                    filialeId:filialeId,
                    yearMonth:yearMonth,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/customerManage/potential_client/reason_data',page1,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    let result = res.body.result
                    let option1 ={
                        title: {
                            text: '商机被放弃原因',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter:'{b}:{c}'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            data: result.reason
                        },
                        series: [
                            {
                                barMaxWidth:30,//最大宽度
                                type: 'bar',
                                data: result.count,
                                itemStyle: {

                                    normal: {
                                        //柱形图圆角，初始化效果
                                            barBorderRadius:[0, 50, 50, 0],
                                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                        //以下为是否显示，显示位置和显示格式的设置了
                                        // label: {
                                        //     show: true,
                                        //     position: 'top',
                                        //     formatter: '{b}\n{c}'
                                        // }
                                    },

                                    // normal: {
                                    //     show: true,
                                    //     position: 'top',
                                    //     color: '#CEBDFF',
                                    //     //柱形图圆角，初始化效果
                                    //     barBorderRadius:[0, 50, 50, 0],
                                    // }

                                },

                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        fontSize:12,
                                    }
                                },
                            },
                        ]
                    };
                    myChart1.setOption(option1);
                })
                let page2 = JSON.stringify({
                    token:this.token,
                    filialeId:filialeId,
                    yearMonth:yearMonth == '' ? mydate:yearMonth,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/customerManage/potential_client/turn_count',page2,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    let result = res.body.result;
                    let option2=  {
                        title: {
                            text: '新增商机转化为客户'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                            }
                        },
                        legend: {
                            data:['转化为客户','现存商机'],
                            x: 'right',
                        },
                        grid: {
                            left: '3%',
                            right: '15%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : result.time
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [

                            {
                                name:'转化为客户',
                                type:'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                itemStyle: {color: '#30A7D1'},
                                data:result.newTurn,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                            },
                            {
                                name:'现存商机',
                                type:'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {normal: {}},
                                itemStyle: {color: '#9575F4'},
                                data:result.newPotentialClient
                            }
                        ]
                    };
                    myChart2.setOption(option2);
                })
            }
        }
    }
</script>
<style lang="scss" >
    .analyze{
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
                width: 100%;
                height: 450px;
                float: left;
                display: inline-block;
            }
        }
    }
</style>