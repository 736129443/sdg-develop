<template>
    <div class="main">
        <p>
            当前位置： 项目管理 > 订单管理
        </p>
        <div style="margin: 0 auto;">
            <div class="content">
                <ul class="oul">
                    <li v-for="i in arr" >
                        <div class="dd_name">{{i}}</div>
                    </li>
                </ul>
                <ul class="oul">
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.id }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ time | formatDate }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.depotName }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.consignee }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.phone }}</div>
                    </li>
                </ul>
            </div>
            <div class="content_l">
                <ul class="oul">
                    <li v-for="i in arr2" >
                        <div class="dd_name">{{i}}</div>
                    </li>
                </ul>
                <ul class="oul">
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.deliveryAddr }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.isCod }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.totalWeight }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.totalVolume }}</div>
                    </li>
                    <li class="oli" >
                        <div class="dd_ctn" >{{ list.goodsAmount }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { formatDate } from '../../js/date.js';
    export default {
        data () {
            return {
                token:'',
                list:[],
                id:'',
                arr:[
                    '订单编号 : ',
                    '配送日期 : ',
                    '仓库名称 : ' ,
                    '收货人名称 : ',
                    '收货人电话 : ',
                ],
                arr2:[
                    '收货地址 : ',
                    '是否代收 : ',
                    '货物重量 : ',
                    '货物体积 : ',
                    '货物金额 : ',
                ],
                time: '',
            }
        },
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let id = JSON.parse( sessionStorage.getItem('orderId'));
            this.id = id;
            this.data()
        },
        methods:{
            data(){
                let page = JSON.stringify({
                    token:this.token,
                    id : this.id
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/orderCenter/order/order_detail' , page ,{

                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);

                    this.list = res.body.result;
                    this.time = this.list.deliveryDate;
                    if(this.list.totalWeight !== 0){
                        this.list.totalWeight = this.list.totalWeight + '  '+' kg '
                    }
                    if(this.list.totalVolume !== 0){
                        this.list.totalVolume = this.list.totalVolume + '  '+ ' m³ '
                    }
                    if(this.list.goodsAmount !== 0){
                        this.list.goodsAmount = this.list.goodsAmount + '  '+ ' 元 '
                    }
                    console.log(this.list.isCod);
                    if (this.list.isCod == undefined){
                        this.list.isCod =  ' '
                    }
                    console.log(this.list.isCod);
                });
            },

        },

        activated: function() {
            if(this.$route.meta.reset) {//需要重设
                this.reset();
                this.fetchData();
            }
        },

        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main{
        padding: 30px;
        .content_l{
            overflow: hidden;
            display: inline-block;
            .oul{
                float: left;

                li{
                    /*border-bottom: 1px solid #cccccc;*/
                    line-height: 40px;
                    margin:5px 0;
                }
                .dd_name{
                    text-align: right;
                }
                .oli{
                    width:auto;

                    .dd_ctn{
                        padding:0 15px 0 15px;
                        border-radius: 3px;
                    }
                }
            }
        }
        .content{
            padding-top: 20px;
            overflow: hidden;
            display: inline-block;
            margin-right: 20%;
            .oul{
                float: left;


                li{
                    line-height: 40px;
                    margin:5px 0;
                    /*border-bottom: 1px solid #cccccc;*/

                }
                .dd_name{
                    text-align: right;
                }
                .oli{
                    width:auto;

                    .dd_ctn{
                        padding:0 15px 0 15px;
                        /*width: 50%;*/
                    }
                }
            }
        }
    }
</style>