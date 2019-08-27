<template>
    <div class="box">
        <!--startprint-->
        <div class="eldialogs" id="eldialogs">
            <div class="titleMessage">
                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>分公司 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.filialeName}}</span>
                        </li>
                        <!--<li>-->
                        <!--<span>所在部门 :</span>-->
                        <!--<span style="font:bold 15px 微软雅黑;">{{}}</span>-->
                        <!--</li>-->
                        <li>
                            <span>项目名称 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.customerName}}</span>
                        </li>
                        <li>
                            <span>开票时间 :</span>
                            <!--<span v-if="details.approvalAccTime != null">{{details.approvalAccTime | dateFrm}}</span>-->
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>账单时间 :</span>
                            <!--<span style="font:bold 15px 微软雅黑;">{{details.billStartTime | dateFrm}}至{{details.billEndTime | dateFrm}}</span>-->
                        </li>
                        <li>
                            <span>提交时间 :</span>
                            <!--<span style="font:bold 15px 微软雅黑;">{{details.createTime | dateFrm}}</span>-->
                        </li>
                        <li>
                            <span>预计回款日期 :</span>
                            <!--<span style="font:bold 15px 微软雅黑;">{{details.predictReturnTime | dateFrm}}</span>-->
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>开票编号 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.makeId}}</span>
                        </li>
                        <li>
                            <span>提交人 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.applyName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>发票类别 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.makeType}}</span>
                        </li>
                        <li>
                            <span>开票单位 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.makeSite}}</span>
                        </li>
                        <li>
                            <span>客户开票名称 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.companyName}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>纳税人识别号 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.taxpayerIdentifyNum}}</span>
                        </li>
                        <li>
                            <span>电话 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.phone}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>地址 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.address}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>开户银行 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.openingBank}}</span>
                        </li>
                        <li>
                            <span>银行账号 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.openingBankAccount}}</span>
                        </li>
                        <li>
                            <span>税点 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.taxRate}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>票面金额 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.invoiceMoney}}</span>
                        </li>
                        <li>
                            <span>票面备注 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.invoiceRemark}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_60">
                    <ul class="addressee">
                        <li>
                            <span>收件人姓名 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiverName}}</span>
                        </li>
                        <li>
                            <span>收件人住址 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiverAddr}}</span>
                        </li>
                        <li>
                            <span>收件人电话 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiverPhone}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <!--<span class='Remarks'>附件 :</span>-->
                            <!--<span style="float: left;width:50%;">-->
                            <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--action="javascript:;"-->
                            <!--:on-preview="handlePreview"-->
                            <!--:file-list="fileList"-->
                            <!--:auto-upload="false">-->
                            <!--</el-upload>-->
                            <!--</span>-->
                            <div class="accessory" v-if=" details.pictures !== []">
                                <div class="accessory_t">附件 ：</div>
                                <div class="accessory_box">
                                <span class="accessory_c" v-for="i in details.pictures">
                    {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads(i)" style="cursor:pointer;">下载</span></span>
                                </div>

                            </div>
                        </li>
                        <li>
                            <span class='Remarks'>其他说明 : &nbsp;</span>
                            <span style="float: left;width:50%;">
                            <el-input
                                type="textarea"
                                autosize
                                readonly
                                placeholder=""
                                v-model="textarea1">
                            </el-input>
                        </span>
                        </li>
                        <li v-if="this.info == 'off'?true:false">
                            <span class='Remarks' >审批意见 :</span>
                            <span style="float: left;width:50%;">
                            <template>
                              <el-radio v-model="Opinion" label="accepted">同意</el-radio>
                              <el-radio v-model="Opinion" label="rejected">拒绝</el-radio>
                            </template>
                        </span>
                        </li>
                        <li v-if="info == 'off'?true:false">
                            <span class='Remarks'></span>
                            <span style="float: left;width:50%;padding:0 0 0 6%">
                            <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                v-model="approvalOpinion">
                            </el-input>
                        </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div  class="titleMessage" v-if="this.info == 'off'?false:true">
                <p>审批进度</p>
                <div class="Progress">
                    <div class="Progress_content">
                        <ul class="oul">
                            <li>
                                <span>项目名称：</span>
                                <span>{{this.rows.customerName}}</span>
                            </li>
                            <li>
                                <span>姓名：</span>
                                <span>{{this.rows.applyName}}</span>
                            </li>
                            <li>
                                <span>提交时间：</span>
                                <!--<span>{{this.rows.createTime | dateFrmHm}}</span>-->
                            </li>
                        </ul>
                        <!--//城市经理-->
                        <ul class="oul" v-for="(i,index) in this.CheckApprove">
                            <li>
                                <span>审批人：</span>
                                <span>{{i.adminName}}</span>
                            </li>
                            <li>
                                <span>审批意见：</span>
                                <span>{{i.opinion}}</span>
                            </li>
                            <li >
                                <span>审批时间：</span>
                                <!--<span v-if="i.createTime == null?false:true">{{i.createTime | dateFrmHm}}</span>-->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" >
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button @click="doPrint">打 印</el-button>
            <el-button type="primary" @click="Submission" :loading="wait" v-if="this.info == 'off'?true:false">确 定</el-button>
        </span>
        </div>
        <!--endprint-->
    </div>
</template>

<script>
    export default {
        props:["details","rows","CheckApprove","info","textarea1"],
        name: "printing",
        data() {
            return{

            }
        },
        methods:{
            //打印
            doPrint() {
                // var bdhtml = document.getElementById("eldialogs").innerHTML;
                // var sprnstr = "<!--startprint-->";//开始打印表示字符串有17个字符
                // var eprnstr = "<!--endprint-->"; //结束打印表示字符串
                // var prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr)+17);//从开始打印标识之后的内容
                // var prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr));//截取开始标识和结束标识之间的内容
                // document.body.innerHTML = prnhtml;//把需要打印的内容付给body.innerHTML
                // window.print();//调用浏览器的打印功能打印指定区域
                // document.body.innerHTML = bdhtml;//最后还原页面

                // 1.设置要打印的区域 div的className
                var newstr = document.getElementById("eldialogs").innerHTML;
                // 2. 复制给body，并执行window.print打印功能
                document.body.innerHTML = newstr;
                // 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
                var oldstr = document.body.innerHTML;
                window.print();
                document.body.innerHTML = oldstr;
                return false;


            },
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        .eldialogs{
            width: 100%;
            .titleMessage{
                padding:5px 20px;
                p{
                    display: block;
                    padding-bottom:10px;
                    border-bottom:1px solid #f5f6fb;
                }
                .titleMessage_50{
                    font-size: 14px;
                    margin:10px 0 0 0;
                    background: #f5f6fb;
                    ul{
                        margin:0 0 0 10%;
                        padding:10px 0 ;
                        overflow: hidden;
                        li{
                            float: left;
                            width:33%;
                        }
                    }
                }
                .titleMessage_60{
                    font-size: 14px;
                    margin:10px 0 0 0;
                    background: #f5f6fb;

                    ul{
                        margin:0 0 0 10%;
                        padding:10px 0 ;
                        li{
                            overflow: hidden;
                            padding:8px 0 ;
                            .Remarks{
                                display: block;
                                float: left;
                            }
                        }
                    }
                    .addressee{
                        li{
                            display: inline-block;
                            width: 33%;
                        }
                    }
                }
                .Progress{
                    overflow: hidden;
                    font-size: 14px;
                    margin:10px 0 0 0;
                    background: #f5f6fb;
                    ul{
                        margin:0 0 0 10%;
                        padding:10px 0 ;
                        overflow: hidden;
                        li{
                            float: left;
                            width:33%;
                        }
                    }
                }
            }
        }
        .accessory{
            margin-top: 10px;
            background-color: #F3F7FA;
            box-sizing: border-box;
            width: 100%;
            .accessory_t{
                color: #606266;
                /*height:100% ;*/
                width: 5%;
                max-width: 90px;
                display: inline-block;
            }
            .accessory_box{
                display: inline-block;
                vertical-align:text-top;
                width: 93%;
                .accessory_c{
                    width: 100%;
                    display: inline-block;
                    color: #4874D0;
                    font-weight: bold;
                }
            }
        }
    }
</style>