<template>
    <div class="main">
        <div class="header">
            当前位置：<span>CRM管理><router-link to="/business_Opportunity"> 商机管理</router-link>>商机详情</span>
        </div>
        <div class="content">
            <ul>
                <li><span>商机ID:</span><span>{{content.id}}</span></li>
                <li><span>客户名称:</span><span>{{content.clientName}}</span></li>
                <li><span>联系人:</span><span>{{content.person}}</span></li>
                <li><span>联系人职位:</span><span>{{content.personJob}}</span></li>
            </ul>
            <ul>
                <li><span>联系电话:</span><span>{{content.phone}}</span></li>
                <li><span>邮箱:</span><span>{{content.email}}</span></li>
                <li><span>来源:</span><span>{{content.from}}</span></li>
                <li><span>录入时间:</span><span>{{content.createTime | dateFrm}}</span></li>
            </ul>
            <ul>
                <li><span>负责人:</span><span>{{content.adminName}}</span></li>
                <li><span>状态:</span><span>{{content.status}}</span></li>
                <li><span>合作意向:</span><span>{{content.filialeName}}</span></li>
                <!--<li><span>微信号:</span><span>{{content.}}</span></li>-->
            </ul>
        </div>
        <div class="content">
            <ul>
                <li><span>公司地址:</span><span>{{content.address}}</span></li>
                <li><span>商机提供人:</span>
                    <span v-if="content.providerFilialeId != '编外人员'">{{content.providerNameIn}}</span>
                    <span v-if="content.providerFilialeId == '编外人员'">{{content.providerName}}(电话：{{content.providerPhone}})</span>
                </li>
                <li><span>商机概述:</span><span>{{content.remark}}</span></li>
                <li><span></span><span></span></li>
            </ul>
        </div>
        <div class="content_105">
            <span>商机跟进记录</span>
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="i in activities" timestamp="" placement="top">
                        <el-card>
                            <h4>{{i.adminName}}:{{i.createTime | dateFrm}}</h4>
                            <p>{{i.operation}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Information_opportunity",
        data() {
            return {
                activities: [],
                token:'',
                content:''
            }
        },
        mounted() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            console.log(this.$route.query.row);
            this.content = this.$route.query.row;
            this.data();
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
        methods:{
            data() {
                let page = JSON.stringify({
                    token:this.token,
                    "potentialClientId":this.content.id
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/query_record',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.activities = res.body.result
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .main{
        .content{
            padding:20px;
            margin:20px 0 ;
            background: white;
            overflow: hidden;
            ul{
                float: left;
                width:33.33%;
                padding:10px 0 0 0 ;
                li{
                    line-height: 30px;
                    span:nth-child(2){
                        padding:0 0 0 10px;
                        font-weight: bold;
                    }
                }
            }
        }
        .content_105{
            padding:50px;
            margin:20px 0 ;
            background: white;
            width:50%;
            text-align: center;
            margin:0 auto;
            span{
                font-size: 17px;
                font-weight: bold;
            }
        }
    }
</style>