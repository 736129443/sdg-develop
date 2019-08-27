<template>
    <div class="main">
        <div class="header">
            当前位置：<span>CRM管理>商机统计>数据统计</span>
        </div>
        <div class="count">
            <div class="top">
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
            </div>

            <div class="count_content">
                <div class="Modular" v-if="branchArea?false:true">
                    <div>
                        <div id="myChart0" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
                <div class="Modular" v-if="wholeCountry?false:true">
                    <div>
                        <div id="myChart1" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
                <div class="Modular" v-if="branchArea?false:true">
                    <div>
                        <div id="myChart2" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
                <div class="Modular" v-if="wholeCountry?false:true">
                    <div>
                        <div id="myChart3" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
                <div class="Modular" v-if="branchArea?false:true">
                    <div>
                        <div id="myChart4" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
                <div class="Modular" v-if="wholeCountry?false:true">
                    <div>
                        <div id="myChart5" :style="{width:'95%',height:'400px'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../../../js/Fjurisdiction.js'
    var myChart0;
    var myChart1;
    var myChart2;
    var myChart3;
    var myChart4;
    var myChart5;
    export default {

        //商机统计
        name: "count",
        data() {
            return{
                filialeId:'',
                branchArea: '',
                wholeCountry: '',
                managementArea: '',
                token:'',
                filiale:[],
                formInline:{
                    filialeName:'',
                    value2:'',
                },
                currentUser:''
            }
        },
        mounted() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.branchArea = F_jurisdiction('branchArea', jurisdictions);
            this.wholeCountry = F_jurisdiction('wholeCountry', jurisdictions);
            this.managementArea = F_jurisdiction('managementArea', jurisdictions);
            console.log(this.branchArea, this.wholeCountry);

            // console.log(user.result.currentUser);
            // if (user.result.permission.wholeCountry)
            console.log(user.result);

            // console.log(user.result.currentUser.permission);
            // for (var i in user.result.currentUser.permission){
            //     console.log(JSON.parse(user.result.currentUser.permission[i]));
            //     if (user.result.currentUser.permission[i].name == 'wholeCountry') {
            //         // console.log(user.result.currentUser.permission[i].choose);
            //         console.log("123");
            //     }
            // }
            this.currentUser = user.result.currentUser;
            this.filialeId = user.result.currentUser.filialeId;
            console.log(user.result.currentUser.filialeId);

            //分公司
            this.Branch();
            if (this.branchArea) {
                this.Division_statistics(); //分公司商机数量统计
                this.Branch_customer();//新增客户数量分公司
                this.Division_Source();//按来源统计（分部）
            }
            if (this.wholeCountry) {
                this.Headquarters_statistics();//总公司商机数量统计
                this.Headquarters_customers();//新增客户数量总部
                this.Headquarters_sources();//按来源统计（总部）
            }

        },
        methods:{
            //总公司商机数量统计
            Headquarters_statistics() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/count_center',JSON.stringify({
                    'yearMonth': this.formInline.value2,
                    'token':this.token,

                })).then(res=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        var filialeNames = [];
                        var counts = [];
                        for (var i in res.body.result){
                            filialeNames.push(res.body.result[i].filialeName);
                            counts.push(res.body.result[i].count);
                        }
                        myChart0 = this.$echarts.init(document.getElementById('myChart0'));
                        let option = {
                                color: ['#3398DB'],
                                title: {
                                    text: '新增商机数量（总部)',
                                    subtext: ''
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
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
                                        data : filialeNames,
                                        axisLabel: {
                                            interval:0,
                                            rotate:40
                                        }
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value'
                                    }
                                ],
                                series : [
                                    {
                                        name:'',
                                        type:'bar',
                                        barMaxWidth:30,//最大宽度
                                        //设置柱状图渐变颜色
                                        itemStyle: {//柱形图圆角，初始化效果
                                            normal: {
                                                barBorderRadius:[ 50,50,0,0],
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
                                        },
                                        data:counts
                                    }
                                ]
                            };
                        myChart0.setOption(option);
                    }
                })
            },
            //分公司商机数量统计
            Division_statistics() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/count_branch',JSON.stringify({
                    "token":this.token,
                    "filialeId":this.formInline.filialeName == '' ? this.filialeId:this.formInline.filialeName,
                    'yearMonth':this.formInline.value2,
                })).then(res=>{
                    console.log(res);

                    if (res.body.errcode == 0) {
                        var citys = [];
                        var counts = [];
                        for (var i in res.body.result) {
                            // console.log(res.body.result[i].count);
                            citys.push(res.body.result[i].city);
                            counts.push(res.body.result[i].count);
                        }
                        myChart1 = this.$echarts.init(document.getElementById('myChart1'));
                        let option = {
                            color: ['#3398DB'],
                            title: {
                                text: '新增商机数量（分公司）',
                                subtext: ''
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
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
                                    data : citys,
                                    axisLabel: {
                                        interval:0,
                                        rotate:40
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'',
                                    type:'bar',
                                    barMaxWidth:30,//最大宽度
                                    data:counts,
                                    itemStyle: {
                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[ 50,50,0,0],
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
//                                             label: {
//                                                 show: true,
//                                                 position: 'top',
// //                             formatter: '{c}'
//                                                 formatter: '{b}\n{c}'
//                                             }
                                        }
                                    }
                                }
                            ]
                        };
                        myChart1.setOption(option);
                    }
                })
            },
            //新增客户数量（总部）
            Headquarters_customers() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/count_center',JSON.stringify({
                    "status":"finish",
                    'yearMonth': this.formInline.value2,
                    "token":this.token,
                })).then(res=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        var filialeNames = [];
                        var counts = [];
                        for (var i in res.body.result){
                            filialeNames.push(res.body.result[i].filialeName);
                            counts.push(res.body.result[i].count);
                        }
                        myChart2 = this.$echarts.init(document.getElementById('myChart2'));
                        let option = {
                            color: ['#3398DB'],
                            title: {
                                text: '新增客户数量（总部)',
                                subtext: ''
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
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
                                    data : filialeNames,
                                    axisLabel: {
                                        interval:0,
                                        rotate:40
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'',
                                    type:'bar',
                                    barMaxWidth:30,//最大宽度
                                    data:counts,
                                    itemStyle: {
                                        normal: {
                                            barBorderRadius:[ 50,50,0,0],
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
                                    }
                                }
                            ]
                        };
                        myChart2.setOption(option);
                    }
                })
            },
            //新增客户数量（分公司）
            Branch_customer() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/count_branch',JSON.stringify({
                    "status":"finish",
                    'yearMonth': this.formInline.value2,
                    "token":this.token,
                    "filialeId":this.formInline.filialeName == '' ? this.filialeId:this.formInline.filialeName,
                })).then(res=>{
                    console.log(res);

                    if (res.body.errcode == 0) {
                        var citys = [];
                        var counts = [];
                        for (var i in res.body.result) {
                            citys.push(res.body.result[i].city);
                            counts.push(res.body.result[i].count);
                        }
                        myChart3 = this.$echarts.init(document.getElementById('myChart3'));
                        let option = {
                            color: ['#3398DB'],
                            title: {
                                text: '新增客户数量（分公司）',
                                subtext: ''
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
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
                                    data : citys,
                                    axisLabel: {
                                        interval:0,
                                        rotate:40
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'',
                                    type:'bar',
                                    barMaxWidth:30,//最大宽度
                                    data:counts,
                                    itemStyle: {
                                        normal: {
                                            barBorderRadius:[ 50,50,0,0],
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
                                    }
                                }
                            ]
                        };
                        myChart3.setOption(option);
                    }
                })
            },
            //按来源统计（总部）
            Headquarters_sources() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/from_data',JSON.stringify({
                    'yearMonth': this.formInline.value2,
                    "token":this.token,
                })).then(res=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                       var result = [];
                       var name = [];
                        for (var i in res.body.result) {
                            result.push({value:res.body.result[i].count,name:res.body.result[i].from});
                            name.push(res.body.result[i].from);
                        }

                        console.log(result);
                        myChart4 = this.$echarts.init(document.getElementById('myChart4'));
                        let option = {
                            title: {
                                text: '按来源统计（总部）',
                                subtext: ''
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'right',
                                data:name
                            },
                            series: [
                                {
                                    name:'',
                                    type:'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            barBorderRadius:[ 50,50,0,0],
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
                                                formatter: '{b}\n{c}'
                                            }
                                        },
                                    },
                                    data:result
                                }
                            ]
                        };
                        myChart4.setOption(option);
                    }
                })
            },
            //按来源统计（分部）
            Division_Source() {
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/from_data',JSON.stringify({
                    'yearMonth':this.formInline.value2,
                    "token":this.token,
                    "filialeId":this.formInline.filialeName == '' ? this.filialeId:this.formInline.filialeName,
                })).then(res=>{
                    console.log(res);

                    if (res.body.errcode == 0) {
                        var result = [];
                        var name = [];
                        for (var i in res.body.result) {
                            result.push({value:res.body.result[i].count,name:res.body.result[i].from});
                            name.push(res.body.result[i].from);
                        }

                        console.log(result);
                        myChart5 = this.$echarts.init(document.getElementById('myChart5'));
                        let option = {
                            title: {
                                text: '按来源统计（分公司）',
                                subtext: ''
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'right',
                                data:name
                            },
                            series: [
                                {
                                    name:'',
                                    type:'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            barBorderRadius:[ 50,50,0,0],
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
                                                formatter: '{b}\n{c}'
                                            }
                                        },
                                    },
                                    data:result
                                }
                            ]
                        };
                        myChart5.setOption(option);
                    }
                })
            },
            //查询接口
            query() {
                console.log(this.formInline);
                if (this.branchArea) {
                    this.Division_statistics(); //分公司商机数量统计
                    this.Branch_customer();//新增客户数量分公司
                    this.Division_Source();//按来源统计（分部）
                }
                if (this.wholeCountry) {
                    this.Headquarters_statistics();//总公司商机数量统计
                    this.Headquarters_customers();//新增客户数量总部
                    this.Headquarters_sources();//按来源统计（总部）
                }
            },
            Branch() {
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                    'token':this.token,
                })).then(res=>{
                    if (res.body.errcode == 0) {
                        if (!this.wholeCountry) {
                            this.filiale.push({deptName:this.currentUser.filialeName,id:this.filialeId});
                        }else {
                            this.filiale = res.body.result;
                        }
                    }
                });
            },

        }

    }
</script>

<style scoped lang="scss">
    .main{
        /*background: white;*/
        .count{
            .top{
                padding:20px 0 10px 0 ;
            }
            .count_content{
                overflow: hidden;
                .Modular{
                    float: left;
                    background: white;
                    padding:20px;
                    width:45%;
                    overflow: hidden;
                    margin:5px;
                }
            }

        }
    }
</style>