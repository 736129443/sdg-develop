 <template>
    <div class="main">
        <p>当前位置：项目管理>运输单管理>运输单详情</p>

            <h3>基本信息</h3>
            <div class="oh"><div class="fl"><span> 出车单编号：</span></div>
            <div class="fl"><strong>{{trackId.transport_trackId}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 运输单编号：</span></div>
            <div class="fl"><strong>{{list0.id }}</strong></div></div>
            <div class="oh"><div class="fl"><span> 任务状态：</span></div>
            <div class="fl"><strong>{{ list0.status}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 任务创建时间：</span></div>
            <div class="fl"><strong>{{ list0.createTime | dateFrm}}  </strong></div></div>
            <div class="fg"></div>

            <div class="oh"><div class="fl"><span> 仓名称：</span></div>
            <div class="fl"><strong>{{ list0.depotName}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 线路名称：</span></div>
            <div class="fl"><strong>{{ list0.traceName}}  </strong></div></div>
            <!--<div class="oh"><div class="fl"><span> 配送点固定：</span></div>-->
            <!--<div class="fl"><strong>{{ }}  </strong></div></div>-->
            <div class="oh"><div class="fl"><span> 配送点数量：</span></div>
            <div class="fl"><strong>{{ num }}  </strong></div>
            </div>
            <!--<div class="oh"><div class="fl"><span> 限行区域说明：</span></div>-->
            <!--<div class="fl"><strong>{{ }}  </strong></div></div>-->
            <div class="oh"><div class="fl"><span> 配送目的地：</span></div>
            <div class="fl"><strong>{{ site}}  </strong></div></div>
            <!--<div class="oh"><div class="fl"><span> 配送区域描述：</span></div>-->
            <!--<div class="fl"><strong>{{ }}  </strong></div></div>-->
            <div class="oh"><div class="fl"><span> 需要返仓：</span></div>
            <div class="fl"><strong>{{ list0.isBackDepot }}  </strong></div></div>
            <!--<div class="oh"><div class="fl"><span> 配送总里程：</span></div>-->
            <!--<div class="fl"><strong>后台获取, </strong></div></div>-->

            <div class="fg"></div>

            <div class="oh"><div class="fl"><span> 联系人：</span></div>
            <div class="fl"><strong  v-if="list0.location[0] && list0.location[0].consignee" >{{ list0.location[0].consignee}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 联系人电话：</span></div>
            <div class="fl"><strong  v-if="list0.location[0] && list0.location[0].phone">{{list0.location[0].phone}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 配送日期：</span></div>
            <div class="fl"><strong>{{list0.deliveryStartTime}} 至 {{list0.deliveryEndTime}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 到仓时间：</span></div>
            <div class="fl"><strong> {{list0.arrDepotTime}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 预计完成时间：</span></div>
            <div class="fl"><strong>{{list0.lastArrTime}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 车型：</span></div>
            <div class="fl"><strong>{{list0.vehicleTypeReq}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 用车要求：</span></div>
            <div class="fl"><strong>{{list0.vehicleAddiReq}}</strong></div></div>
            <div class="fg"></div>
            <div class="oh"><div class="fl"><span> 货物类型：</span></div>
            <div class="fl"><strong>{{ list0.goodsType}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 货物总体积：</span></div>
            <div class="fl"><strong>{{list0.totalVolume}}&nbsp; </strong></div></div>
            <div class="oh"><div class="fl"><span> 货物总重量：</span></div>
            <div class="fl"><strong>{{list0.totalWeight}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 货物件数：</span></div>
            <div class="fl"><strong>{{list0.goodsNum}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 需要回单：</span></div>
            <div class="fl"><strong v-if="list0.receipt && list0.receipt.receiptWay">{{list0.receipt.receiptWay}}</strong></div></div>


        <div class="oh"><div class="fl"><span> 单趟总价格：</span></div>
            <div class="fl"><strong>{{list0.driverPrice}}元 </strong></div></div>

        <div class="oh" v-if="hidden==true?false:true"><div class="fl"><span> 畅心保价格：</span></div>
            <div class="fl"><strong>{{list0.insuranceFullPrice}} 元</strong></div></div>
        <div class="oh"><div class="fl"><span> 司机单趟配送收入：</span></div>
            <div class="fl"><strong>{{driverIncome}} 元</strong></div></div>

            <div class="fg"></div>
            <div class="oh"><div class="fl"><span> 配送经验要求：</span></div>
            <div class="fl"><strong>{{list0.deliveryExperience}} </strong></div></div>
            <!--<div class="oh"><div class="fl"><span> 搬运说明：</span></div>-->
            <!--<div class="fl"><strong>{{list0.handlingReq}} </strong></div></div>-->
            <div class="oh"><div class="fl"><span> 需要搬运上楼：</span></div>
            <div class="fl"><strong v-if="list0.handlingReq &&list0.handlingReq.isHandling">{{list0.handlingReq.isHandling}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 需要自带小工：</span></div>
            <div class="fl"><strong v-if="list0.handlingReq &&list0.handlingReq.isEmployee">{{list0.handlingReq.isEmployee}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 有人帮忙装货：</span></div>
            <div class="fl"><strong v-if="list0.handlingReq &&list0.handlingReq.isInstall">{{list0.handlingReq.isInstall}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 有人帮忙卸货：</span></div>
            <div class="fl"><strong v-if="list0.handlingReq &&list0.handlingReq.isDischarge">{{list0.handlingReq.isDischarge}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 其他要求：</span></div>
            <div class="fl"><strong v-if="list0.handlingReq &&list0.handlingReq.remark">{{list0.handlingReq.remark}} </strong></div></div>
            <div class="fg"></div>
            <div class="oh"><div class="fl"><span> 司机姓名：</span></div>
            <div class="fl"><strong>{{list.driverName}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 司机联系电话：</span></div>
            <div class="fl"><strong >{{ list.phone }} </strong></div></div>
            <div class="oh"><div class="fl"><span> 车牌号：</span></div>
            <div class="fl"><strong>{{list.plateNum}}</strong></div></div>
            <div class="oh"><div class="fl"><span> 车型：</span></div>
            <div class="fl"><strong>{{list.vehicleType}} </strong></div></div>
            <div class="oh"><div class="fl"><span> 所在区域：</span></div>
            <div class="fl"><strong>{{list.usualRunArea}}</strong></div></div>

            <div class="oh"><div class="fl"><span> 出车状态：</span></div>
            <div class="fl"><strong>
                {{ trackId.transport_status }}
                </strong></div></div>
            <div class="oh"><div class="fl"><span> 异常原因：</span></div>
            <div class="fl"><strong>
                <textarea name="" id="" cols="50" rows="10" disabled="true" style="resize: none; background-color: white" >{{this.list0.statusChangeReason}}</textarea>
                </strong></div></div>
    </div>
</template>
<script>
    import moment from 'moment'
export default {
    data(){
        return {
            token:'',
            trackId:'',
            list:{
                phone : ''
            },
            list0:{
                location:[]
            },
            num:'',
        //    地址
            site:'',
            driverIncome:'',
            hidden:false
        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        this.data();
    },
    methods:{
        data(){

            this.trackId = JSON.parse(sessionStorage.getItem('transportid'));
            console.log(this.trackId.transport_trackId);
            let page = JSON.stringify({
                token : this.token,
                trackId : this.trackId.transport_trackId,
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/detail/get',page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{

                // this.driverIncome = list0.price -list0.insuranceFullPrice
                console.log(res);
                this.list = res.body.result.driverList;
                this.list0 = res.body.result.transportTemp;
                // alert(this.list0.location.length)
                console.log(Number(this.list0.insuranceFullPrice));
                console.log(Number(this.list0.price));
                this.driverIncome = Number(this.list0.driverPrice) - Number(this.list0.insuranceFullPrice);
                console.log(this.driverIncome);
                var arr=[]
                for (let i = 0; i <this.list0.location.length ; i++) {
                    // console.log(this.list0.location[i].type);

                    if (this.list0.location[i].type == 1 ) {
                        // console.log(this.list0.location[i].type);
                        arr.push(this.list0.location[i])
                    }
                }
                // console.log(arr.length);
                this.num =arr.length;
                if (this.list0.deliveryArea == '' ){
                    if ( this.num != 0){
                        this.site = arr[0].address
                    } else {
                        this.site = this.list0.deliveryArea
                    }
                }else {
                    this.site = this.list0.deliveryArea
                }

                if (this.list0.status == "waiting") {
                    this.list0.status='待配送'
                }else if (this.list0.status == "running") {
                    this.list0.status='配送中'
                }else if (this.list0.status == "canceled") {
                    this.list0.status='已取消'
                }else if (this.list0.status == "finished") {
                    this.list0.status='已完成'
                }
                if (this.list0.totalVolume ==null){
                    this.list0.totalVolume = '0 m³'
                }else {
                    this.list0.totalVolume =  this.list0.totalVolume +  'm³'
                }

                if (this.list0.totalWeight ==null){
                    this.list0.totalWeight = '0 Kg'
                }else {
                    this.list0.totalWeight =  this.list0.totalWeight + 'Kg'
                }

                if (this.list0.goodsNum ==null){
                    this.list0.goodsNum = '0 /件'
                }else {
                    this.list0.goodsNum =  this.list0.goodsNum + '/件'
                }
                if (this.list0.isBackDepot == '0'){
                    this.list0.isBackDepot = '否'
                }else if (this.list0.isBackDepot == '1'){
                    this.list0.isBackDepot = '是'
                }
                // 需要回单
                if ( this.list0.receipt.receiptWay == ''){
                    this.list0.receipt.receiptWay = '否'
                }

                if ( this.list0.vehicleTypeReq == undefined){
                    this.list0.vehicleTypeReq =''
                } else {
                    this.list0.vehicleTypeReq = this.list0.vehicleTypeReq.name + ' '
                        + this.list0.vehicleTypeReq.isElectric + ' '
                        + this.list0.vehicleTypeReq.isTailBoard + ' '
                        + this.list0.vehicleTypeReq.length + ' '
                        +this.list0.vehicleTypeReq.isCertificate + ' '
                        + this.list0.vehicleTypeReq.isCold ;
                }

                if (this.list.vehicleType == undefined){
                    this.list.vehicleType = ''
                } else {
                    this.list.vehicleType = JSON.parse(this.list.vehicleType).name + ''
                        + JSON.parse(this.list.vehicleType).isElectric + ''
                        + JSON.parse(this.list.vehicleType).isTailBoard + ''
                        + JSON.parse(this.list.vehicleType).length + ''
                        + JSON.parse(this.list.vehicleType).isCertificate + ''
                        + JSON.parse(this.list.vehicleType).isCold ;
                }

                if ( this.list0.vehicleAddiReq.isTrolley == '0'){
                    this.list0.vehicleAddiReq.isTrolley = '不需要小推车'
                }else if(this.list0.vehicleAddiReq.isTrolley == '1'){
                    this.list0.vehicleAddiReq.isTrolley = '需要小推车'
                }
                if (this.list0.vehicleAddiReq.isDemolition == '1') {
                    this.list0.vehicleAddiReq.isDemolition = '后座拆除'
                }else if (this.list0.vehicleAddiReq.isDemolition == '0'){
                    this.list0.vehicleAddiReq.isDemolition = '后座不拆除'
                }

                this.list0.vehicleAddiReq = this.list0.vehicleAddiReq.isTrolley + '  ' +this.list0.vehicleAddiReq.isDemolition;
                this.list0.goodsType=  this.list0.goodsType.join(',');
                //
                if (this.list0.handlingReq.isDischarge == '0'){
                    this.list0.handlingReq.isDischarge = '否'
                }else if(this.list0.handlingReq.isDischarge == '1'){
                    this.list0.handlingReq.isDischarge = '是'
                }

                if (this.list0.handlingReq.isEmployee == '0'){
                    this.list0.handlingReq.isEmployee = '否'
                }else if(this.list0.handlingReq.isEmployee == '1'){
                    this.list0.handlingReq.isEmployee = '是'
                }
                if (this.list0.handlingReq.isHandling == '0'){
                    this.list0.handlingReq.isHandling = '否'
                }else if(this.list0.handlingReq.isHandling == '1'){
                    this.list0.handlingReq.isHandling = '是'
                }
                if (this.list0.handlingReq.isInstall == '0'){
                    this.list0.handlingReq.isInstall = '否'
                }else if(this.list0.handlingReq.isInstall == '1'){
                    this.list0.handlingReq.isInstall = '是'
                }
                if (this.list0.createTime<1539619200000) {
                    this.hidden = true;
                    this.driverIncome = this.list0.driverPrice
                }else {
                    this.hidden = false;
                    this.driverIncome = Number(this.list0.driverPrice) - Number(this.list0.insuranceFullPrice);
                    this.driverIncome = Math.floor(this.driverIncome * 100)/ 100
                }

            })
        }
    },
    filters: {
        dateFrm: function (el) {
            return moment(el).format("YYYY-MM-DD");
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     console.log(to.meta.keepAlive);
    //     if (to.path == "/order_manage") {
    //         to.meta.keepAlive = true;
    //     } else {
    //         to.meta.keepAlive = false;
    //     }
    //     next();
    // }
}
</script>
<style lang="less" scoped>
.main{
    padding-bottom: 100px;
    background-color: white;
    h3{
        background-color: #F2F2F2;
        padding:5px 0;
        margin:10px 0;
    }
    p{
        display: block;
        font-size: 14px;
        span{
            display: block;
            width: 100px;
        text-align: right;

        }

    }
    .fg{
        width: 800px;
        margin:15px;
        border: 1px dashed #cccccc;
    }
    .fl{
        float: left;
    }
    .oh{
        overflow: hidden;
    }
    span{
        width: 15%;
        min-width: 190px;
        display: block;
        text-align: right;
        padding-bottom: 20px;
    }
    textarea{
        padding:10px 15px;
    }

}
</style>

