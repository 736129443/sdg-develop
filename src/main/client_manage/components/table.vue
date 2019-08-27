<template>
    <div class="boxShadow">
        <div style="width:100%;">
            <el-table
                    :data="judgingModel"
                    ref="multipleTable"
                    tooltip-effect="dark">
                <template v-for='(col) in tableData'>
                    <el-table-column
                            align="center"
                            :show-overflow-tooltip="true"
                            :prop="col.dataItem"
                            :label="col.dataName"
                            :key="col.dataItem"
                            >
                    </el-table-column>
                </template>
                <el-table-column label="操作计价" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" class="del-com" @click="delTabColOne(scope.row,scope.$index)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        props:["dataInfos","judgingModel","areaPrice"],
        data(){
            return{
                selectArr:'',
                Original:'',//父組件传的值
                tableData:[],//动态表头
                tableData1: [{
                    dataItem: 'AA',
                    dataName: '区域',
                }, {
                    dataItem: 'VT',
                    dataName: '车型'
                },{
                    dataItem: 'UP',
                    dataName: '起步价'
                },  {
                    dataItem: 'UK',
                    dataName: '起价公里数'
                },{
                    dataItem: 'OKP',
                    dataName: '超公里(单价)'
                },  {
                    dataItem: 'UIT',
                    dataName: '起价点位数'
                },{
                    dataItem: 'OPP',
                    dataName: '超点位(单价)'
                }, {
                    dataItem: 'UW',
                    dataName: '起价重量'
                }, {
                    dataItem: 'OWP',
                    dataName: '超重量(单价)'
                },  {
                    dataItem: 'UV',
                    dataName: '起价体积'
                },{
                    dataItem: 'OVP',
                    dataName: '超体积(单价)'
                }, {
                    dataItem: 'UT',
                    dataName: '起价票'
                }, {
                    dataItem: 'OTP',
                    dataName: '超票数(单价)'
                }],
                tableData2:[
                    {
                        dataItem: 'AA',
                        dataName: '区域'
                    },
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'VP',
                        dataName: '整车价格'
                    }
                ],
                tableData3:[
                    {
                        dataItem: 'AA',
                        dataName: '区域'
                    },
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'PP',
                        dataName: '计件单价'
                    }
                ],
                tableData4:[
                    {
                        dataItem: 'AA',
                        dataName: '区域'
                    },
                    {
                        dataItem: 'VT',
                        dataName: '车型   '
                    },
                    {
                        dataItem: 'TP',
                        dataName: '单票价格'
                    },
                ],
                tableData5:[
                    {
                        dataItem: 'AA',
                        dataName: '区域'
                    },
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'FHP',
                        dataName: '4小时'
                    },
                    {
                        dataItem: 'NHP',
                        dataName: '9小时'
                    },
                    {
                        dataItem: 'THP',
                        dataName: '13小时'
                    }
                ],
                tableData6: [ {
                    dataItem: 'VT',
                    dataName: '车型'
                },{
                    dataItem: 'UP',
                    dataName: '起步价'
                },  {
                    dataItem: 'UK',
                    dataName: '起价公里数'
                },{
                    dataItem: 'OKP',
                    dataName: '超公里(单价)'
                },  {
                    dataItem: 'UIT',
                    dataName: '起价点位数'
                },{
                    dataItem: 'OPP',
                    dataName: '超点位(单价)'
                }, {
                    dataItem: 'UW',
                    dataName: '起价重量'
                }, {
                    dataItem: 'OWP',
                    dataName: '超重量(单价)'
                },  {
                    dataItem: 'UV',
                    dataName: '起价体积'
                },{
                    dataItem: 'OVP',
                    dataName: '超体积(单价)'
                }, {
                    dataItem: 'UT',
                    dataName: '起价票'
                }, {
                    dataItem: 'OTP',
                    dataName: '超票数(单价)'
                }],
                tableData7:[
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'VP',
                        dataName: '整车价格'
                    }
                ],
                tableData8:[
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'PP',
                        dataName: '计件单价'
                    }
                ],
                tableData9:[
                    {
                        dataItem: 'VT',
                        dataName: '车型   '
                    },
                    {
                        dataItem: 'TP',
                        dataName: '单票价格'
                    },
                ],
                tableData10:[
                    {
                        dataItem: 'VT',
                        dataName: '车型'
                    },
                    {
                        dataItem: 'FHP',
                        dataName: '4小时'
                    },
                    {
                        dataItem: 'NHP',
                        dataName: '9小时'
                    },
                    {
                        dataItem: 'THP',
                        dataName: '13小时'
                    }
                ]
            }
        },
        watch:{
            dataInfos: {
                handler(newName, oldName) {
                    this.Original = this.dataInfos;
                    console.log(this.Original);
                    if (this.Original == 11){
                        this.tableData = this.tableData1;
                    }else if (this.Original == 12){
                        this.tableData = this.tableData2;
                    } else if(this.Original == 13){
                        this.tableData = this.tableData3;
                    }else if (this.Original == 14){
                        this.tableData = this.tableData4;
                    } else if (this.Original == 15){
                        this.tableData = this.tableData5;
                    } else if (this.Original == 21){
                        this.tableData = this.tableData6;
                    } else if (this.Original == 22){
                        this.tableData = this.tableData7;
                    } else if (this.Original == 23){
                        this.tableData = this.tableData8;
                    } else if (this.Original == 24){
                        this.tableData = this.tableData9;
                    } else if (this.Original == 25){
                        this.tableData = this.tableData10;
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            },
            judgingModel:{
                handler(newName, oldName) {

                },
                deep:true
            },
            areaPrice:{
                handler(newName, oldName) {
                },
                deep:true
            }
        },
        methods:{
            // 获取表格选中的数据
            delTabColOne(row,index){
                console.log(row,index);
                this.judgingModel.splice(index,1);
                this.$emit('aa',this.judgingModel);
                console.log(this.judgingModel);
                console.log('-------------------------');
                console.log(this.areaPrice)
                if  (this.areaPrice != undefined){
                    this.areaPrice.splice(index,1);
                }
                this.$emit('aa',this.judgingModel);
            }
        }
    }
</script>

<style scoped lang="scss">
    .boxShadow{
        width:100%;
    }
</style>