<template>
  <div class="main">
    <div class="containers">
      <div class="container_border addRun ">
        <div class="block">
          <span class="mar"><span class="required">*</span>任务开跑日期：</span>
          <el-date-picker
                  v-model="addRunTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  @change="checkData"
                  :picker-options="pickerOptions"
                  placeholder="加跑日期">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="mar"><span class="required">*</span>到仓时间：</span>
          <el-time-picker
                  v-model="arriveTime"
                  format="HH:mm"
                  @change="selectTime"
                  value-format="HH:mm"
                  placeholder="到仓时间">
          </el-time-picker>
        </div>
        <div class="block float">
          <span class="mar"><span class="required">*</span>预计总耗时：</span>
          <el-input
                  class="totalTime"
                  placeholder="请输入预计总耗时"
                  v-model="lastTime"
                  clearable>
          </el-input>
        </div>
        <div class="block float">
          <span class="mar"><span class="required">*</span>货物体积：</span>
          <div class="times">
            <el-input
                    class="totalTime"
                    placeholder="请填写货物体积"
                    v-model="orderTotalVolume"
                    clearable
            >
            </el-input>
            <span class="unit">m³</span>
          </div>
        </div>
        <div class="block float">
          <span class="mar"><span class="required">*</span>货物重量：</span>
          <div class="times">
            <el-input
                    class="totalTime"
                    placeholder="请填写货物重量"
                    v-model="orderTotalWeight"
                    clearable
            >
            </el-input>
            <span class="unit">kg</span>
          </div>
        </div>
        <div class="block float">
          <span class="mar"><span class="required">*</span>配送件数：</span>
          <div class="times">
            <el-input
                    class="totalTime"
                    placeholder="请填写配送件数"
                    v-model="orderTotalNum"
                    clearable
            >
            </el-input>
            <span class="unit">件</span>
          </div>
        </div>
        <div class="block float">
          <span class="mar"><span class="required">*</span>配送票数：</span>
          <div class="times">
            <el-input
                    class="totalTime"
                    placeholder="请填写配送票数"
                    v-model="ticketsNums"
                    clearable
            >
            </el-input>
            <span class="unit">票</span>
          </div>
        </div>
        <div class="block float">
          <span class="mar1">给他加任务：{{driverinfos.driverName}}({{driverinfos.driverPhone}})</span>
        </div>
        <div class="left clear">
          <span style="margin-left: 32px"><span class="required">*</span>加任务原因：</span>
          <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea">
          </el-input>
        </div>
        <!--<div class="to-service">-->
          <!--<p>闪电狗畅心保</p>-->
          <!--<el-checkbox :indeterminate="isInsurances" v-model="insurancesAll" :disabled="dis" @change="insurancesAllChange" v-show="false">全选</el-checkbox>-->
          <!--<div style="margin: 15px 0;"></div>-->
          <!--<el-checkbox-group v-model="checkedInsurances" @change="handleCheckedInsurancesChange">-->
            <!--<el-checkbox v-for="(insurance,index) in insurances" :disabled="arr[index]" :label="insurance" :key="insurance">购买高价值货物险，最高赔付50万，保费仅需单趟出车费用的2.5%，<a href="javascript:void(0);" @click="showServiceAgreement">点击查看详情</a></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</div>-->
        <div class="to-storehouse" style="margin:20px 4px 20px 120px">
          <el-button round @click="confirm">确定</el-button>
          <el-button round @click="signOut">取消</el-button>
        </div>
        <!--<el-dialog
                class="serviceAgreement-box"
                title="闪电狗司机畅心保服务协议—高价值货物保障"
                :visible.sync="serviceAgreement"
                width="60%"
                center>
          <div class="serviceAgreement">
            <p class="service-title">本产品适用于闪电狗平台承担配送任务的司机（以下简称：“您”）。一旦您购买了“闪电狗司机畅心保高价值货物保障”服务，即视为认同本协议所有内容，本服务协议即生效。</p>
            <p class="service-title">本产品旨在减轻您在运输过程中因货损、货差带来的赔付责任。</p>
            <h3>一、保障责任范围</h3>
            <p class="service-title">您在执行闪电狗平台配送任务期间，因下列原因造成所承运的货物损毁、灭失且需要由您进行赔付的，本产品在赔偿限额内代替您给予赔偿。</p>
            <p>（一） 因雷电、冰雹、暴风、暴雨、海啸、洪水、地陷、崖崩、突发性滑坡、泥石流所造成的损失；<br/>
              （二） 由于运输工具发生碰撞、倾覆、火灾、爆炸、码头和隧道坍塌所造成的损失；<br/>
              （三） 在装货、卸货或转载时，因遭受不属于包装质量不善或装卸人员违反操作规程所造成的损失；<br/>
              （四） 液体货物因受碰撞、挤压致使所用容器(包括封口)损坏而渗漏的损失，或用液体保藏的货物因液体渗漏而造成保藏货物腐烂变质的损失；<br/>
              （五） 符合安全运输规定而遭受雨淋所致的损失；<br/>
              （六） 在发生上述灾害、事故时，因施救或保护货物所支付的直接合理费用；</p>
            <h3>二、保障额度</h3>
            <p class="service-title">经闪电狗平台认定为事故后，最高赔付限额为人民币50万元。</p>
            <h3>三、保障费用</h3>
            <p class="service-title">如果您选择购买本产品，则需要您向闪电狗平台支付以下费用：</p>
            <h4>（一）基础保障费用</h4>
            <p class="service-title">本趟公路运输任务结算费用的2.5%收取。</p>
            <p class="service-title">对具体一个任务勾选畅心保&#45;&#45;高价值货物服务后，则该任务编号下后续所有出车都会扣除基础保障费用，并享受保障。保障自点击“签到”开始生效，直至“配送完成”。</p>
            <h4>（二）案件处理服务费用</h4>
            <p class="service-title">如果您确实发生了保障范围中事故，则在闪电狗平台代为赔付后，您需要承担最终代为赔付金额的10%作为案件处理责任费用。该费用只有在代为赔付确实发生后才会产生。</p>
            <h3>四、免赔约定</h3>
            <p class="service-title">如为普通货物:无免赔，在保障额度内，闪电狗平台全部代替您向托运人或者收货人赔偿。</p>
            <p class="service-title">如您承运的货物为易碎品(易碎品包括卫浴.大理石、玻璃制品、石膏、陶瓷制品、地砖、镜子、酒、马桶、电视机、皮制沙发等，以及局部碰损又无法进行修复,或者修复成本高于原价值的的货物，单价超过1000元的货物)，免赔1000元;即在保障额度内，实际损失金额在1000元以下的，闪电狗平台不予代为赔付;实际货物损失金额超过1000元，闪电狗平台代替您向托运人或者收货人赔偿超出1000元的部分金额。</p>
            <h3>四、除外责任</h3>
            <p class="service-title">因以下原因导致的货物损失，本产品不承担赔偿责任:</p>
            <p>（一）核辐射、战争、恐怖袭击、政府行为等不可抗力因素;<br/>
              （二）物流货物设计错误、工艺不善、本质缺陷或特性、自然渗漏、自然损耗、自然磨损、自燃或由于自身原因造成腐烂、变质、伤病、死亡等自身变化以及物流货物的合理损耗;<br/>
              （三）托运人、收货人的故意、过错行为;<br/>
              （四）物流货物包装不当，或物流货物包装完好而内容损坏或不符，或物流货物标记错制、漏制、不清;<br/>
              （五）发货人或收货人确定的物流货物数量、规格或内容不准确;<br/>
              （六）盘点时发现的损失，或其他不明原因的短量;<br/>
              （七）其他不属于本服务协议约定的保障责任范围内的原因和损失。</p>
            <h3>六、不予保障的货物</h3>
            <p class="service-title">以下货物的损失，不在本产品保障范围内。发生损失事故的，按照平台相关约定予以赔偿:</p>
            <p>（一）依据《道路危险货物运输管理规定》等相关法规认定的危险货物;易燃易爆及危险品（参照GB12268-2005《危险货物品名表》）；<br/>
              （二）现金、支票、票据、单证、有价证券、信用证、护照、文件、档案、账册、图纸、技术资料、电脑资料、武器弹药及其他无法鉴定价值的财产;<br/>
              （三）古玩、古币、古书、古画、艺术作品、雕塑、邮票、金银、珠宝、钻石、玉器、文物等贵重物品。</p>
            <h3>七、损失赔偿、资料收集与时效</h3>
            <p>（一）发生货物损失事故后，不论货物损失多少，您应在30分钟内通知闪电狗平台，并立即对事故现场进行拍照，以便闪电狗平台及时确定货物损失和对责任进行认定。闪电狗司机畅心保赔偿服务专线为: 4008087888。<br/>
              （二）您有义务配合平台处理事故，请您于事故发生后十日内，将事故现场照片，您的身份证、行驶证复印件、事故书面说明、货物价值证明等资料提交指定的闪电狗平台程序。因资料延迟提交所导致责任无法认定的情形，本产品不承担任何赔偿责任，并不退还该次的服务费用。</p>
            <p class="service-title">以上货损、货差等保障内容，本公司保留对本产品服务协议在法律范围内的最终解释权，以及根据情况随时调整服务协议的权利。在每次调整后，闪电狗平台将及时通知您，通知的方式包括但不限于书面通知、平台通知、补充协议、邮件等方式。</p>
          </div>
        </el-dialog>-->
      </div>
    </div>
  </div>

</template>

<script>
    import {regCarTime,regReason1} from "../../js/newWarehouse.js";
    export default {
        inject:['reload'],
        name: "addRun",
        data() {
            return {
                textarea: '',
                addRunTime:'',
                arriveTime:'',
                lastTime:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 3600 * 1000 * 24 || time.getTime() > Date.now() + 3600 * 1000 * 24;
                    }
                },
                runningTimes: [
                    {
                        value: '1',
                        label: '1'
                    }, {
                        value: '2',
                        label: '2'
                    }, {
                        value: '3',
                        label: '3'
                    }],
                runningTime: '',
                driverinfos:{},
                addRunTimes:'',
                checkValue:'',
                checkValue1:'',
                successCarTime:false,
                serviceAgreement:false,
                insurances:[],
                checkedInsurances:[],
                isInsurances:false,
                insurancesAll:false,
                arr:[],
                dis: false,
                orderTotalVolume: '',
                orderTotalWeight: '',
                orderTotalNum: '',
                ticketsNums: ''
            }
        },
        methods:{
            checkData(){
                this.selectTime();
            },
            selectTime(){
                console.log(this.addRunTime)
                let str = this.addRunTime + ' ' + this.arriveTime;
                let date = new Date(str);
                let time = date.getTime();
                const  nowTime = new Date().getTime()  + 3600*1000;
                if(time < nowTime){
                    this.$message({
                        message: '到仓时间不能小于当前时间1小时,请重新选择',
                        type: 'warning'
                    });
                    this.arriveTime = '';
                }
            },
            formatDateTime() {
                let date = new Date();
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                this.addRunTime = y + '-' + m + '-' + d;
                // this.addRunTimes = y + '-' + m + '-' + d;
            },
            signOut(){
                this.$router.push('/turnout_manage');
            },
            confirm(){
                if (this.addRunTime === "" || this.addRunTime === null || this.arriveTime === "" || this.arriveTime === null || this.lastTime === "" || this.textarea === "" || this.orderTotalVolume === "" || this.orderTotalVolume === null || this.orderTotalNum === "" || this.orderTotalNum === null || this.orderTotalWeight === "" || this.orderTotalWeight === null || this.ticketsNums === "" || this.ticketsNums === null) {
                    this.$message({
                        message: '带*号的选项必填，您有未填选项',
                        type: 'warning'
                    });
                    return;
                }else{
                    if (!(/^\d+\.?\d{0,2}$/.test(this.orderTotalVolume))) {
                        this.$message({
                            message: '货物体积只能填数字最多带两位小数',
                            type: 'warning'
                        });
                        return;
                    }

                    if (!(/^\d+\.?\d{0,2}$/.test(this.orderTotalWeight))) {
                        this.$message({
                            message: '货物重量只能填数字最多带两位小数',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!(/^\d+$/g.test(this.orderTotalNum))) {
                        this.$message({
                            message: '配送件数只能填整数',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!(/^\d+$/g.test(this.ticketsNums))) {
                        this.$message({
                            message: '配送票数只能填整数',
                            type: 'warning'
                        });
                        return;
                    }
                    if(!regReason1(this,this.textarea)){
                        this.$message({
                            message: '搬运说明要求长度5-128位,或不能包含特殊字符!',
                            type: 'warning'
                        });
                        return;
                    }
                    regCarTime(this,this.lastTime);
                    if(this.successCarTime === true){
                        let arrRunInfos = JSON.stringify({
                            token:this.token,
                            customerId:this.driverinfos.customerId,
                            relationTrackId:this.driverinfos.relationTrackId,
                            addRunNo:this.driverinfos.transportNum,
                            driverName:this.driverinfos.driverName,
                            driverId:this.driverinfos.driverId,
                            deliveryDate:this.addRunTime,
                            arrDepotTime:this.arriveTime,
                            totalTime:this.lastTime,
                            addReason:this.textarea,
                            // isInsurance: this.checkedInsurances.length > 0 ? this.checkedInsurances : null,
                            votes: this.ticketsNums,// 票数
                            totalVolume: this.orderTotalVolume,//体积
                            totalWeight: this.orderTotalWeight,//重量
                            goodsNum: this.orderTotalNum//件数
                        });
                        console.log(arrRunInfos);
                        this.$http.post(this.global.lightningUrl+'/companyv1/trunkCenter/schedule/create',arrRunInfos,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if(res.data.message === '加跑成功'){
                                this.$message({
                                    message: '加跑成功',
                                    type: 'success'
                                });
                                this.reload();
                                this.$router.push('/turnout_manage');
                            }
                            if(res.data.message === '此单已加跑一次,无法继续加跑'){
                                this.$message({
                                    message: '此单已加跑一次,无法继续加跑',
                                    type: 'warning'
                                });
                                this.reload();
                                return false
                            }
                            if(res.data.message === '该司机尚未缴纳押金,缴纳押金后可立即加跑'){
                                this.$message({
                                    message: '该司机尚未缴纳押金,缴纳押金后可立即加跑',
                                    type: 'warning'
                                });
                                this.reload();
                                return false
                            }
                            if(res.data.message === '该司机没有进行培训,无法加跑'){
                                this.$message({
                                    message: '该司机没有进行培训,无法加跑',
                                    type: 'warning'
                                });
                                this.reload();
                                return false
                            }
                        })
                    }
                }
            },
            // insurancesAllChange(val) {
            //     this.checkedInsurances = val ? this.insurances : [];
            //     this.isInsurances = false;
            // },
            // handleCheckedInsurancesChange(value) {
            //     let checkedCount = value.length;
            //     this.insurancesAll = checkedCount === this.insurances.length;
            //     this.isInsurances = checkedCount > 0 && checkedCount < this.insurances.length;
            // },
            // 是否购买保险
            /*isBuyInsurance(){
                let token = JSON.stringify({
                    token: this.token,
                })
                this.$http.post(this.global.lightningUrl + '/customer/insurance/insuranceList',token,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res.data);
                    // this.insurances = res.data.result;
                    for(let i=0;i<res.data.result.length;i++){
                        this.arr.push(false);
                        if(res.data.result[i].status === true){
                            this.checkedInsurances.push(res.data.result[i].insurance);
                        }
                    }
                    for(let i=0;i<this.checkedInsurances.length;i++){
                        if (this.checkedInsurances[i] === '畅心保高价值货物险') {
                            this.arr[0] = true;
                            this.dis = true;
                        }
                    }

                    for(let i=0;i<res.data.result.length;i++){
                        this.insurances.push(res.data.result[i].insurance)
                    }
                    console.log(this.insurances)
                }).catch( (error) => {
                    console.log(error);
                });
            },*/
            // 服务协议
            // showServiceAgreement(){
            //     this.serviceAgreement = !this.serviceAgreement;
            // },
        },
        mounted(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.formatDateTime();
            // this.isBuyInsurance();
            this.driverinfos = JSON.parse(decodeURIComponent(this.$route.query.addRunInfos));
            console.log(this.driverinfos);
            // this.confirm();
        }
    }
</script>

<style lang="scss">
  .addRun{
    padding:30px 30px 80px 30px ;
    .times {
      position: relative;
    }
    .unit {
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 1px;
      color: #409EFF;
      position: relative;
      left: -47px;
      top: -1px;
    }
    .mar {
      width: 150px;
      display: inline-block;
      text-align: right;
    }
    .mar1 {
      margin-left: 55px;
    }
    .el-input__inner{
      border-radius: 20px;
      margin: 15px 0;
      width:252px;
    }
    .required{
      color:red;
    }
    .float{
      display: flex;
      align-items: center;
    }
    .totalTime{
      width:252px;
    }
    .left{
      margin: 20px 0 20px 15px;
      span{
        float: left;
      }
      .el-textarea{
        width:38%;
      }
      .el-textarea__inner{
        height: 200px;
        border-radius: 10px;
      }
    }
    .serviceAgreement-box{
      .el-dialog__title{
        font-weight: 700;
      }
      .el-dialog__body{
        font-size: 15px;
      }
      .service-title{
        text-indent: 10px;
      }
      .serviceAgreement{
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        padding: 20px;
        height: 500px;
        overflow-y: auto;
        p{
          margin-top: 10px;
        }
        h3,h4{
          margin-top: 10px;
        }
      }
    }
    .to-storehouse{
      input{
        text-align: right;
        color:#409EFF;
      }
      .totalTimes{
        width:252px;
      }
    }
    .el-button{
      width:10%;
    }
    .to-service{
      margin-top: 20px;
      p{
        font-weight: 700;
        font-size: 17px;
        margin-bottom: 10px;
      }
      a{
        color:#409EFF;
      }
    }
  }


</style>
