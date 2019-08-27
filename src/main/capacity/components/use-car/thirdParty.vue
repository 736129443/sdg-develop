<template>
    <div class="thirdParty">
        <div class=" container_border" v-loading="loading">
            <div class="to-storehouse">
                <span><span class="required">*</span>配送日期：</span>
                <div class="block">
                    <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="arriveDate"
                            type="daterange"
                            :picker-options="pickerOptions"
                            @change="testDate"
                            range-separator="至"
                            start-placeholder="请选择配送日期"
                            end-placeholder="">
                    </el-date-picker>
                </div>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>到仓时间：</span>
                <div class="times">
                    <el-time-picker
                            v-model="arriveTime"
                            format="HH:mm"
                            value-format="HH:mm"
                            @change="testingTime"
                            placeholder="请选择到仓时间">
                    </el-time-picker>
                </div>
                <!--<div class="timeInput" style="position: relative">
                    <span  class="spanTime"><span class="required">*</span>单趟预计总耗时：</span>
                    <el-input
                            placeholder="请输入预计总耗时"
                            v-model="lastTime"
                            clearable>
                    </el-input> <span style="margin-left: 5px">小时</span>
                    <span class="required" style="font-size:14px;position: absolute;top:45px;left:170px ">(预计总耗时将作为生成轨迹参考数据)</span>
                </div>-->
            </div>
            <div class="to-select" style="margin:30px 0">
                <span><span class="required">*</span>配送周期：</span>
                <el-checkbox :indeterminate="isWeek" :disabled="isCheckAll" v-model="checkAll1" @change="weeksCheckAllChange">全选</el-checkbox>
                <el-checkbox-group :disabled="isArriveDate" v-model="checkedWeeks" @change="handleCheckedWeeksChange">
                    <el-checkbox v-for="(week,index) in weeks" :label="week" :key="week" :disabled="isArr[index]">{{week}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>配送区域：</span>
                <div class="text">
                    <el-cascader
                            style="width:100%"
                            placeholder="请选择区域..."
                            :options="areaOptions"
                            clearable
                            v-model="china"
                            @change="handleChange"
                            @focus="isDisabledFun"
                    ></el-cascader>
                </div>

                <span><span class="required" style="margin-left: 28px">*</span>线路名称：</span>
                <div style="width:360px">
                    <el-input
                            placeholder="暂无线路名称"
                            v-model="lineName"
                            :disabled="true"
                            clearable>
                    </el-input>
                </div>
                <span style="padding:0 5px">+</span>
                <el-input
                        class="lineNameRemarks"
                        placeholder="备注"
                        v-model="lineNameRemarks"
                        clearable>
                </el-input>
            </div>
            <div class="to-storehouse ">
                <el-radio-group v-model="radio1" @change="choose">
                    <el-radio label="1" :disabled="disableType" border>输入地址</el-radio>
                    <el-radio label="2" :disabled="disableType2" border>选择仓库</el-radio>
                </el-radio-group>
            </div>
            <!--thirdPartyOrder-->
            <div class="to-storehouse " v-show="radio1==='1'&&thirdPartyOrder">
                <el-button round type="primary" style="padding:13px 26px" :disabled="addressIsShow" @click="toListOrder">
                    选择订单
                </el-button>
            </div>

            <!--发货方-->
            <div class="to-storehouse ">
                <h4><span class="required">*</span>发货方:</h4>
                <el-button style="margin-left:35px" v-show="radio1==='1'" round @click="addConsignorArr(index)">添加
                </el-button>
                <el-select style="margin-left:35px" @change="changeWarehouseName" v-show="radio1==='2'"
                           v-model="warehouseName"
                           placeholder="请选择仓库名称">
                    <el-option
                            v-for="item in warehouseNames"
                            :key="item.id"
                            :label="item.depotName"
                            :value="item.depotName">
                    </el-option>
                </el-select>
            </div>
            <div v-for="(item,index) in consignorArr" v-show="radio1==='1'">
                <div class="to-storehouse ">
                    <span><span class="required">*</span>发货地址{{index+1}}：</span>
                    <div class="shippingAddress">
                        <el-input
                                :disabled="true"
                                placeholder="当前地址为空,请修正发货地址!"
                                v-model="item.consignorAddress"
                                clearable>
                        </el-input>
                    </div>
                    <el-button style="margin-left:28px"  round type="primary" @click="editor(item,index,'发货方')">修正地址</el-button>
                </div>
                <div class="to-storehouse ">
                    <span><span class="required">*</span>发货人名 ：</span>
                    <div class="shippingAddress">
                        <el-input
                                placeholder="请填写发货人姓名"
                                v-model="item.consignor"
                                clearable>
                        </el-input>
                    </div>
                    <span style="margin-left:28px"><span class="required">*</span>发货人电话：</span>
                    <div class="shippingAddress">
                        <el-input
                                placeholder="请填写发货人电话"
                                v-model="item.consignorPhone"
                                clearable>
                        </el-input>
                    </div>
                    <el-button style="margin-left:28px" round @click="delConsignorArr(item,index)">删除</el-button>
                </div>
            </div>

            <!--收货方-->
            <div class="to-storehouse ">
                <h4><span class="required">*</span>收货方:</h4>
                <el-button style="margin-left:35px" round @click="addConsigneeArr(index)">添加</el-button>
            </div>
            <div v-for="(item,index) in consigneeArr">
                <div class="to-storehouse ">
                    <span><span class="required">*</span>收货地址{{index+1}}：</span>
                    <div class="shippingAddress">
                        <el-input
                                :disabled="true"
                                placeholder="当前地址为空,请修正收货地址!"
                                v-model="item.consigneeAddress"
                                clearable>
                        </el-input>
                    </div>
                    <el-button style="margin-left:28px"  round type="primary" @click="editor(item,index,'收货方')">修正地址</el-button>
                </div>

                <div class="to-storehouse ">
                    <span><span class="required">*</span>收货人名 ：</span>
                    <div class="shippingAddress">
                        <el-input
                                placeholder="请填写收货人姓名"
                                v-model="item.consignee"
                                clearable>
                        </el-input>
                    </div>
                    <span style="margin-left:28px"><span class="required">*</span>收货人电话：</span>
                    <div class="shippingAddress">
                        <el-input
                                placeholder="请填写收货人电话"
                                v-model="item.consigneePhone"
                                clearable>
                        </el-input>
                    </div>
                    <el-button style="margin-left:28px" v-show="index>=0"  round @click="delConsigneeArr(item,index)">删除</el-button>
                </div>
            </div>
            <div class="to-storehouse" style="margin-top:50px">
                <span><span class="required">*</span>线路里程：</span>
                <div class="shippingAddress">
                    <el-input
                            placeholder="暂无线路里程"
                            v-model="kilometre"
                            :disabled="true"
                            clearable>
                    </el-input>
                </div>
                <span class="unit">km</span>
                <el-button style="margin-left:15px" @click="mapCalculat" type="primary">计算线路里程</el-button>
                <el-popover
                        placement="right"
                        trigger="click">
                    <div id="container" class="map" tabindex="0">
                    </div>
                    <div id="panel"></div>
                    <el-button style="margin-left:10px" v-show="isLookLine" slot="reference" @click="mapCalculat">查看线路规划
                    </el-button>
                </el-popover>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>货物体积：</span>
                <div class="times">
                    <el-input
                            placeholder="请填写货物体积"
                            v-model="orderTotalVolume"
                            @change="regInt('volume',$event)"
                    >
                    </el-input>
                </div>
                <span class="unit">m3</span>
                <div class="floatLeft">
                    <span style="margin-left:10px"><span class="required">*</span>货物重量：</span>
                    <el-input
                            placeholder="请填写货物重量"
                            v-model="orderTotalWeight"
                            @change="regInt('weight',$event)"
                    >
                    </el-input>
                    <span class="unit">kg</span>
                </div>
            </div>
            <div class="to-storehouse">
                <span style="margin-left: 7px">配送件数：</span>
                <div class="times times-pos">
                    <el-input
                            placeholder="请填写货物件数"
                            v-model="orderTotalNum"
                            @change="regInt('num',$event)"
                    >
                    </el-input>
                    <span class="units">件/箱/捆</span>
                </div>

                <span style="margin-left: 35px">配送票数：</span>
                <div class="times times-pos">
                    <el-input
                            placeholder="请填写配送票数"
                            v-model="ticketsNums"
                            @blur="checkTicketsNums"
                    >
                    </el-input>
                    <span class="units">票</span>
                </div>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>货物类型：</span>
                <div class="times">
                    <el-input
                            placeholder="请填写货物类型"
                            v-model="goodsTypes"
                            @focus="goodsTypesFocus"
                            clearable
                            :disabled="isDisabled">
                    </el-input>
                </div>
                <div class="floatLeft">
                    <span style="margin-left:28px">货物名称：</span>
                    <el-input
                            placeholder="请填写货物名称"
                            v-model="goodsName"
                            clearable>
                    </el-input>
                </div>
            </div>
            <div class="to-goodsType" v-show="goodsTypeShow">
                <div style="width: 545px;">
                    <el-checkbox-group class="group" v-model="goodsType" size="small" @change="goodsTypeChange">
                        <el-checkbox v-for="goodsTypeArr in goodsTypeArrs" :label="goodsTypeArr" :key="goodsTypeArr">{{goodsTypeArr}}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox label="其他" @change="add" v-model="isChecked">其他</el-checkbox>
                </div>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>计价方式：</span>
                <el-radio-group v-model="valuationMethod" @change="clearARR">
                    <el-radio label="BK">起步价+超出部分</el-radio>
                    <el-radio label="BV">整车</el-radio>
                    <el-radio label="BP">件</el-radio>
                    <el-radio label="BT">票</el-radio>
                    <el-radio label="BH">小时</el-radio>
                </el-radio-group>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>选择车型：</span>
                <div class="text">
                    <el-input
                            placeholder="请选择车辆类型"
                            @focus="carsTypesFocus"
                            clearable
                            readonly
                    >
                    </el-input>
                </div>
            </div>
            <price-table :isShows="isShowTable" :orderTotalNum="orderTotalNum" :ticketNumber="ticketsNums" :kilsNum="kilometre" :deliveryPoints="deliveryPoints" :orderTotalVolume="orderTotalVolume" :orderTotalWeight="orderTotalWeight" :valuationMethods="valuationMethod"></price-table>
            <div class="to-storehouse" >
                <span>客户报价：</span>
                <el-radio v-model="selectContact" label="0">按合同报价</el-radio>
                <el-radio v-model="selectContact" label="1">录入客户报价</el-radio>
                <div class="times times-pos" style="margin-left: 10px;" v-if="selectContact == '1'">
                    <el-input
                            placeholder="请输入客户报价"
                            v-model="contactPrice"
                            @blur="checkContactPrice"
                    >
                    </el-input>
                    <span class="units">元</span>
                </div>
            </div>
            <div class="to-storehouse">
                <span><span class="required">*</span>配送经验：</span>
                <el-select class="text" v-model="distributionExperience" clearable placeholder="请选择配送经验">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="to-storehouse">
                <span style="margin-right:5px">需要返仓：</span>
                <el-checkbox v-model="returnToWarehouse" true-label="1" false-label="0"></el-checkbox>
            </div>
            <div class="to-storehouse">
                <span style="margin-right:5px">需要回单：</span>
                <el-checkbox @change="showReceipt" v-model="checked" true-label="1" false-label="0"></el-checkbox>
            </div>
            <div v-show="isShow" class="to-storehouse">
                <span><span class="required">*</span>回单方式：</span>
                <el-select class="text" v-model="receipt" clearable @change="changeReceipt" placeholder="请选择回单方式">
                    <el-option
                            v-for="item in receiptType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="to-storehouse" v-show="contactInformation">
                <span><span class="required">*</span>联系人：</span>
                <div class="text">
                    <el-input
                            placeholder="请填写联系人"
                            v-model="contacts"
                            clearable>
                    </el-input>
                </div>
                <span><span class="required">*</span>联系电话：</span>
                <div class="text">
                    <el-input
                            placeholder="请填写联系电话"
                            v-model="contactsPhone"
                            clearable>
                    </el-input>
                </div>
            </div>
            <div  v-show="expressInformation">
                <div class="to-storehouse">
                    <span><span class="required">*</span>收件人：</span>
                    <div class="text t-text">
                        <el-input
                                placeholder="请填写收件人"
                                v-model="contacts"
                                clearable>
                        </el-input>
                    </div>
                    <span ><span class="required">*</span>收件人电话：</span>
                    <div class="text t-text">
                        <el-input
                                placeholder="请填写收件人电话"
                                v-model="contactsPhone"
                                clearable>
                        </el-input>
                    </div>
                    <span ><span class="required">*</span>收件地址：</span>
                    <div class="text t-text">
                        <el-input
                                placeholder="请填写收件地址"
                                v-model="receivingAddress"
                                clearable>
                        </el-input>
                    </div>
                </div>
                <div class="to-storehouse">
                    <span><span class="required">*</span>快递费：</span>
                    <!--<el-radio v-model="radio" label="到付">到付</el-radio>-->
                    <!--<el-radio v-model="radio" label="司机支付">司机支付</el-radio>-->
                    <el-radio-group v-model="radio">
                        <el-radio label="到付">到付</el-radio>
                        <el-radio label="司机支付">司机支付</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="to-select"  style="margin:30px 0">
                <span>用车需求：</span>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange ">
                    <el-checkbox v-for="(city,index) in cities" :label="index" :key="index">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="to-storehouse">
                <span>其他搬运说明：</span>
                <el-input
                        class="handlingInstructions"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入其他搬运说明..."
                        v-model="text">
                </el-input>
            </div>
            <div class="to-storehouse" >
                <div v-show="driverReview">
                    <span><span class="required">*</span>选司机：</span>
                    <el-radio v-model="selectDriver" label="1">是</el-radio>
                    <el-radio v-model="selectDriver" label="0">否</el-radio>
                </div>
            </div>
            <div style="line-height: 40px;margin-top: 10px">
                <el-checkbox label="批量发送" name="type" v-model="batch"></el-checkbox>
                <span style="position:relative;" v-show="batch" >
                    <span class="required">*</span>
                    <el-input v-model="conts" placeholder="输入不超过30单" style="width:10%;border-radius:10%; "></el-input>
                    <span style="position:absolute;top:-7px;right:3px;color:#409EFF;font-size: 15px">单</span>
                </span>
            </div>
            <!--<div class="to-service">
                <p>闪电狗畅心保</p>
                <el-checkbox :indeterminate="isInsurances" v-model="insurancesAll" :disabled="dis" @change="insurancesAllChange" v-show="false">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedInsurances" @change="handleCheckedInsurancesChange">
                    <el-checkbox v-for="(insurance,index) in insurances" :disabled="arr[index]" :label="insurance" :key="insurance">购买高价值货物险，最高赔付50万，保费仅需单趟出车费用的2.5%，<a href="javascript:void(0);" @click="showServiceAgreement">点击查看详情</a></el-checkbox>
                </el-checkbox-group>
            </div>-->
            <el-button class="release"   round @click="send">发布用车</el-button>
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
            <el-dialog
                    title="其他货物类型"
                    :visible.sync="dialogVisible"
                    width="35%"
                    :before-close="handleClose"
                    center>
                <el-input
                        class="inputStyle"
                        placeholder="请输入其他货物类型"
                        v-model="otherTypes"
                        clearable>
                </el-input>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
               </span>
            </el-dialog>
            <select-cars-type @getCarType="getCarTypes" :isShowCarType="showCarType" @isShowCar="showCar"
                              :orderTotalNum="orderTotalNum" :ticketNumber="ticketsNums" :kilsNum="kilometre" :deliveryPoints="deliveryPoints" :orderTotalVolume="orderTotalVolume" :orderTotalWeight="orderTotalWeight"></select-cars-type>
        </div>
    </div>
</template>

<script>
    let orderTotalWeight;
    let orderTotalNum;
    let orderTotalVolume;
    let map;
    let truckDriving;
    let kilometre = "";
    import {
        provinceAndCityData,
        regionData,
        provinceAndCityDataPlus,
        regionDataPlus,
        CodeToText,
        TextToCode
    } from 'element-china-area-data';

    let regionDatas=regionData;
    
    import {regCarTime,regLineName,goodsNames,contactsNames,regPhones,consigneePhone,consigneeName,regMoney,regAddress,regGoodType,regReason,contactsPeople,regTelePhone,regInts,regIntt,checkContactsName,
        checkcontactsPhone} from "../../../../js/newWarehouse";
    import priceTable from './priceTable.vue';
    import selectCarsType from './selectCarsType.vue';
    const cityOptions = ['需要车辆拆后座','需要司机搬运', '需要司机自带小工', '需要自带小推车', '需要有人帮忙装货','需要有人帮忙卸货'];
    const week = ['星期一', '星期二', '星期三', '星期四','星期五','星期六','星期天'];
    const goodsTypeArr = ['食材','水果','方便食品','团餐外卖','酒水饮料','建材','汽配','家电','日化','家具','鲜花蛋糕','3C数码','洗涤','印刷品','服饰鞋帽','医药保健','包装','母婴','五金','自行车','大包裹/仪器'];
    export default {
        inject:['reload'],
        name: "thirdParty",
        data() {
            return {
                selectContact:'0',
                contactPrice:'',
                lineNameRemarks:'',
                isShowTable: false,
                china: [],
                areaOptions: regionData,
                loading:false,
                disableType: false,
                disableType2: false,
                val:0,
                outerVisible: false,
                consigneeArr:[
                    // {
                    //   orderId:0,
                    //   consigneeLatitude:"",
                    //   consigneeLongitude:"",
                    //   consignee:"",
                    //   consigneePhone:"",
                    //   consigneeProvince:'',
                    //   consigneeCity:'',
                    //   consigneeCountry:'',
                    //   consigneeAddress:''
                    // }
                ],
                consignorArr:[
                    // {
                    //   orderId:0,
                    //   consignorLatitude:"",
                    //   consignorLongitude:"",
                    //   consignor:"",
                    //   consignorPhone:"",
                    //   consignorProvince:'',
                    //   consignorCity:'',
                    //   consignorCountry:'',
                    //   consignorAddress:''
                    // }
                ],
                goodsTypeArrs:goodsTypeArr,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 3600 * 1000 * 24 || time.getTime() > Date.now() + 3600 * 1000 * 24*30;
                    }
                },
                arriveTime: '',
                arriveDate: '',
                lastTime: '',
                warehouseNames:[],
                setNames:[],
                setName:'',
                groupName:'',
                goodsTypes:'',
                options: [{
                    value: '无要求',
                    label: '无要求'
                },{
                    value: '生鲜农产品',
                    label: '生鲜农产品'
                }, {
                    value: '食品行业',
                    label: '食品行业'
                }, {
                    value: '快消品',
                    label: '快消品'
                }, {
                    value: '电子产品',
                    label: '电子产品'
                }, {
                    value: '图书',
                    label: '图书'
                },{
                    value: '服装',
                    label: '服装'
                },{
                    value: '建材',
                    label: '建材'
                },{
                    value: '家具',
                    label: '家具'
                },{
                    value: '汽车配件',
                    label: '汽车配件'
                },{
                    value: '医药',
                    label: '医药'
                },{
                    value: '物流行业',
                    label: '物流行业'
                },{
                    value: '快运行业',
                    label: '快运行业'
                },{
                    value: '快递行业',
                    label: '快递行业'
                },{
                    value: '专车直送',
                    label: '专车直送'
                },{
                    value: '落地配',
                    label: '落地配'
                },{
                    value: '商超',
                    label: '商超'
                },{
                    value: '餐饮店',
                    label: '餐饮店'
                },{
                    value: '学校食堂',
                    label: '学校食堂'
                },{
                    value: '机关单位',
                    label: '机关单位'
                },{
                    value: '部队',
                    label: '部队'
                },{
                    value: '智能柜',
                    label: '智能柜'
                }],
                warehouseName: '',
                setNumber:'',
                selectCar:'',
                receipt:'',
                lineName:'',
                shippingAddress:'',
                goodsName:'',
                goodsType:[],
                contacts:'',
                contactsPhone:'',
                checked: 0,
                checkAll: false,
                checkAll1: false,
                checkedCities:[],
                changeCheckedCitie:[],
                checkedWeeks:[],
                cities: cityOptions,
                weeks:week,
                isIndeterminate:false,
                isWeek: false,
                isShow:false,
                isShow2: true,
                addressIsShow: false,
                returnToWarehouse:0,
                text:'',
                copyListShow:false,
                copyLists:[],
                goodsTypeShow:false,
                receiptType:[{
                    value: '返仓',
                    label: '返仓'
                }, {
                    value: '拍照发送回单照片',
                    label: '拍照发送回单照片'
                }, {
                    value: '下次配送提交',
                    label: '下次配送提交'
                }, {
                    value: '快递',
                    label: '快递'
                }],
                contactInformation:false,
                expressInformation:false,
                receivingAddress:'',
                radio:'',
                radio1: '1',
                selectDriver:'1',
                isDisabled:false,
                dialogVisible: false,
                distributionExperience:'',
                index:-1,
                otherTypes:'',
                isChecked:false,
                depotId: '',
                users:{},
                successCarTime:false,
                // successLineName:false,
                successGoodsNames:false,
                successContactsNames:false,
                successContactsPhone:false,
                successConsigneeName:false,
                successConsigneePhone:false,
                showCarType:false,
                carsType: [],
                isArriveDate:true,
                isCheckAll:true,
                driverReview:true,
                consignorSendArr:[],
                consigneeSendArr:[],
                thirdPartyOrder:false,
                thirdPartyOrders: true,
                orderTotalWeight:0,
                orderTotalNum:0,
                orderTotalVolume:0,
                flag:false,
                sendData:[],
                serviceAgreement:false,
                insurances:[],
                checkedInsurances:[],
                isInsurances:false,
                insurancesAll:false,
                isArr:[true,true,true,true,true,true,true],
                arr:[],
                dis: false,
                isAddressCopy: false,
                useCarData: '',
                kilometre: '',
                isLookLine: false,
                areaArr: [],
                sendAreaData: "",
                ticketsNums: '',
                valuationMethod: 'BK',
                deliveryPoints:'',
                batch:false,
                conts:''
            };
        },
        created(){
            //
        },
        // watch:{
        //     batch(curVal, oldVal){
        //         console.log(curVal);
        //         this.cont = curVal;
        //     }
        // },
        methods:{
            clearARR(){
                this.carsType = [];
            },
            checkTicketsNums(){
                if (!(/^\d+$/g.test(this.ticketsNums))) {
                    this.$message({
                        message: '配送票数只能填整数',
                        type: 'warning'
                    });
                    this.ticketsNums = '';
                }
            },
            checkContactPrice(){
                if (!(/^\d+\.?\d{0,2}$/.test(this.contactPrice))) {
                    this.$message({
                        message: '客户报价为数字且保留2位小数',
                        type: 'warning'
                    });
                    this.contactPrice = '';
                    return;
                }
                if(this.contactPrice < 1 || this.contactPrice > 50000){
                    this.$message({
                        message: '客户报价区间为1~50000.00元之间',
                        type: 'warning'
                    });
                    this.contactPrice = '';
                    return;
                }
                if(this.contactPrice >= 10000){
                    this.$alert('录入金额较大,请核实后提交!', '提示', {
                        confirmButtonText: '知道了',
                        type: 'warning',
                        center: true,
                        callback: action => {

                        }
                    });
                }
            },
            isDisabledFun(){
                console.log(regionData);
                console.log(regionDatas);
                if (this.areaArr.length == 0) {
                    return;
                }

                if (!this.areaArr[0].area == null) {
                    return;
                }

                if (this.areaArr[0].province.length==0) {
                    for (let i = 0; i < regionDatas.length; i++) {
                        regionDatas[i].disabled = undefined;
                        if(regionDatas[i].children===undefined){
                            continue
                        }
                        for (let j = 0; j < regionDatas[i].children.length; j++) {
                            regionDatas[i].children[j].disabled = undefined;
                            if(regionDatas[i].children[j].children===undefined){
                                continue
                            }
                            for (let l = 0; l < regionDatas[i].children[j].children.length; l++) {
                                regionDatas[i].children[j].children[l].disabled = undefined;
                            }
                        }
                    }
                    return;
                }

                for (let i = 0; i < regionDatas.length; i++) {//本地区域数据数组
                    for (let z = 0; z < this.areaArr[0].province.length; z++) {
                        if (regionDatas[i].label === this.areaArr[0].province[z]) {
                            regionDatas[i].disabled = false;
                            for (let j = 0; j < regionDatas[i].children.length; j++) {
                                if (regionDatas[i].children[j].label === "市辖区") {
                                    regionDatas[i].children[j].label = regionDatas[i].label;
                                }

                                for (let k = 0; k < this.areaArr[0].city.length; k++) {
                                    if (regionDatas[i].children[j].label !== this.areaArr[0].city[k]) {

                                        if (regionDatas[i].children[j].disabled === undefined) {
                                            regionDatas[i].children[j].disabled = true;
                                        }
                                    } else {
                                        regionDatas[i].children[j].disabled = false;
                                        for (let l = 0; l < regionDatas[i].children[j].children.length; l++) {
                                            for (let m = 0; m < this.areaArr[0].region.length; m++) {
                                                if (regionDatas[i].children[j].children[l].label !== this.areaArr[0].region[m]) {
                                                    if (regionDatas[i].children[j].children[l].disabled === undefined) {
                                                        regionDatas[i].children[j].children[l].disabled = true;
                                                    }
                                                } else {
                                                    regionDatas[i].children[j].children[l].disabled = false;
                                                }
                                            }
                                        }
                                        //二次过滤区
                                        if (regionDatas[i].children[j].children !== undefined) {
                                            if (test(regionDatas[i].children[j].children)) {
                                                for (let l = 0; l < regionDatas[i].children[j].children.length; l++) {
                                                    regionDatas[i].children[j].children[l].disabled = false;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        } else if (regionDatas[i].disabled === undefined) {
                            regionDatas[i].disabled = true;
                        }
                    }
                    //二次过滤市
                    if (regionDatas[i].children !== undefined) {
                        if (test(regionDatas[i].children)) {
                            for (let a = 0; a < regionDatas[i].children.length; a++) {
                                regionDatas[i].children[a].disabled = false;
                            }
                        }
                    }
                    //console.log(regionDatas[i]);
                }

                //判断所有值是否相同
                function test(arr) {
                    for (let i = 0; i < arr.length; i++) {
                        if (!arr[i].disabled) {
                            return false;
                        }
                    }
                    return true;
                }

            },
            handleChange(value) {
                this.getArea();
                if (!this.areaArr.length) {
                    this.$message.warning('没有获取到合同数据，无法生成线路里程...');
                    return
                }
                if (CodeToText[value[1]] === "市辖区") {
                    CodeToText[value[1]] = CodeToText[value[0]]
                }
                //方式一
                if (CodeToText[value[1]] === CodeToText[value[0]]) {
                    // this.lineName = this.areaArr[0].customerName + CodeToText[value[0]] + CodeToText[value[2]];
                    this.lineName = CodeToText[value[0]] + CodeToText[value[2]];
                } else {
                    if (CodeToText[value[2]] === undefined) {
                        // this.lineName = this.areaArr[0].customerName + CodeToText[value[0]] + CodeToText[value[1]];
                        this.lineName = CodeToText[value[0]] + CodeToText[value[1]];
                    } else {
                        // this.lineName = this.areaArr[0].customerName + CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
                        this.lineName = CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
                    }
                }
                this.sendAreaData = CodeToText[value[0]] + ',' + CodeToText[value[1]] + ',' + CodeToText[value[2]]
                //方式二
                // for (let i = 0; i <this.areaArr.length; i++) {
                //   if(this.areaArr[i].province==null){
                //     return;
                //   }
                //   if(this.areaArr[i].province===CodeToText[value[0]]){
                //     if(this.areaArr[i].city!==null){
                //       if(this.areaArr[i].city===CodeToText[value[1]]){
                //
                //         if(CodeToText[value[0]]===CodeToText[value[1]]){
                //           this.lineName=this.areaArr[i].customerName+this.areaArr[i].province+CodeToText[value[2]]+this.areaArr[i].serialNumber;
                //           console.log(this.lineName);
                //           break;
                //         }
                //
                //         this.lineName=this.areaArr[i].customerName+this.areaArr[i].province+this.areaArr[i].city+CodeToText[value[2]]+this.areaArr[i].serialNumber;
                //         break;
                //       }
                //     }else{
                //
                //         if(CodeToText[value[0]]===CodeToText[value[1]]){
                //           this.lineName=this.areaArr[i].customerName+CodeToText[value[1]]+CodeToText[value[2]]+this.areaArr[i].serialNumber;
                //           console.log(this.lineName);
                //           break;
                //         }
                //         this.lineName=this.areaArr[i].customerName+this.areaArr[i].province+CodeToText[value[1]]+CodeToText[value[2]]+this.areaArr[i].serialNumber;
                //         break;
                //     }
                //   }
                // }
            },
            mapCalculat() {
                if (this.radio1 === "1") {
                    if (!this.consignorArr.length || !this.consigneeArr.length) {
                        this.$message.warning('请添加收货发或发货方地址...');
                        return;
                    }
                }
                if (this.radio1 === "2") {
                    if (this.warehouseName === "") {
                        this.$message.warning('请添加仓库起点...');
                        return;
                    }
                    if (!this.warehouseNames.length) {
                        this.$message.warning('请等待，暂无仓库数据...');
                        return;
                    }
                    if (!this.consigneeArr.length) {
                        this.$message.warning('请添加收货发地址...');
                        return;
                    }
                }
                //过滤发货方地址坐标数据并判断是否为空
                if (this.radio1 === "1") {
                    for (let index of this.consignorArr.keys()) {
                        if (this.consignorArr[index].consignorAddress === '') {
                            this.$message.warning('第' + (index + 1) + '行,发货方地址资料不完整,无法计算!');
                            return;
                        }
                    }
                }
                //过滤收货方地址坐标并判断是否为空
                for (let index of this.consigneeArr.keys()) {
                    if (this.consigneeArr[index].consigneeAddress === '') {
                        this.$message.warning('第' + (index + 1) + '行,收货方地址资料是不完整,无法计算!');
                        return;
                    }
                }

                //判断两种方式是否显示路线规划按钮
                if (this.radio1 === "1") {
                    if (this.consignorArr.length && this.consigneeArr.length) {
                        this.isLookLine = true
                    }
                }
                //判断两种方式是否显示路线规划按钮
                if (this.radio1 === "2") {
                    if (this.consigneeArr.length) {
                        this.isLookLine = true
                    }
                }
                //过滤线路规划数据
                let _this = this;
                if (!this.flag) {//标记异常
                    this.sendDatas();
                }
                let consignorSendArr = this.consignorSendArr;

                //过滤线路规划数据
                if (this.radio1 === "2") {
                    for (let i = 0; i < this.warehouseNames.length; i++) {
                        if (this.warehouseNames[i].depotName === this.warehouseName) {
                            consignorSendArr.unshift({
                                longitude: this.warehouseNames[i].longitude,
                                latitude: this.warehouseNames[i].latitude
                            });
                            break;
                        }
                    }
                }



                AMap.plugin('AMap.TruckDriving', ()=> {
                    if (truckDriving !== undefined) {
                        //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                        truckDriving.clear();
                    }
                    truckDriving = new AMap.TruckDriving({
                        map: map,
                        policy: 0, // 规划策略
                        size: 3, // 车型大小
                        isOutline: true,
                        autoFitView: true,
                        panel: 'panel',
                    });
                    let path = [];
                    for (let i = 0; i < consignorSendArr.length; i++) {
                        path.push({lnglat: [consignorSendArr[i].longitude, consignorSendArr[i].latitude]});//起点  吉祥村
                    }
                    truckDriving.search(path, function (status, result) {
                        // searchResult即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                        if (status === 'complete') {
                            console.log(result);
                            let json = result.routes;
                            let routesResult = [];
                            for (let i = 0; i < json.length; i++) {
                                let dis = json[i].distance;
                                dis = dis / 1000;
                                dis = dis.toFixed(2);
                                routesResult.push(dis);
                            }
                            routesResult.sort();
                            _this.kilometre = routesResult[0];
                            kilometre = routesResult[0];
                            console.log('获取货车规划数据成功')
                        } else {
                            console.log('获取货车规划数据失败：' + result)
                        }
                    });
                })
            },
            changeWarehouseName() {
                for (let i = 0; i < this.warehouseNames.length; i++) {
                    if (this.warehouseNames[i].depotName === this.warehouseName) {
                        this.depotId = this.warehouseNames[i].id;
                    }
                }
                this.kilometre = '';
                this.isLookLine = false;
                //console.log(this.depotId);
                //console.log(this.warehouseName);
            },
            choose(val) {
                this.consignorArr = [];
                this.consigneeArr = [];
                //console.log(this.thirdPartyOrder)
                if (this.radio1 === "1") {
                    this.isShow2 = true;
                }
                if (this.radio1 === "2") {
                    this.isShow2 = false;
                }
                this.warehouseName = '';
                this.kilometre = '';
                this.isLookLine = false;
                sessionStorage.removeItem("consignorArr");
                sessionStorage.removeItem("consigneeArr");
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
            // isBuyInsurance(){
            //     let token = JSON.stringify({
            //         token: this.users.result.token,
            //         customerId:Number(sessionStorage.getItem('webCustomerId')) ,
            //     })
            //     this.$http.post(this.global.lightningUrl +'/company/insurance/insuranceList',token,{
            //         headers: {
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         }
            //     }).then((res) => {
            //         console.log(res.data);
            //         // this.insurances = res.data.result;
            //         for(let i=0;i<res.data.result.length;i++){
            //             this.arr.push(false);
            //             if(res.data.result[i].status === true){
            //                 this.checkedInsurances.push(res.data.result[i].insurance);
            //             }
            //         }
            //         for(let i=0;i<this.checkedInsurances.length;i++){
            //             if(this.checkedInsurances[i] === '畅心保高价值货物险'){
            //                 this.arr[0] = true;
            //                 this.dis = true;
            //             }
            //         }
            //         console.log(this.arr)
            //
            //         for(let i=0;i<res.data.result.length;i++){
            //             this.insurances.push(res.data.result[i].insurance)
            //         }
            //         console.log(this.insurances)
            //     }).catch( (error) => {
            //         console.log(error);
            //     });
            // },
            // 服务协议
            // showServiceAgreement(){
            //     this.serviceAgreement = !this.serviceAgreement;
            // },
            //初始化本地数据
            setItemStorage(){
                sessionStorage.setItem('useCarData',
                    Base64.encode(JSON.stringify({
                        arriveTime: this.arriveTime,//到仓时间
                        // lastTime: this.lastTime,//单趟预计总耗时
                        arriveDate: this.arriveDate,//配送日期
                        checkedWeeks: this.checkedWeeks,//配送周期
                        lineName: this.lineName,//线路名称
                        goodsName: this.goodsName,//货物名称
                        goodsType: this.goodsType,//货物类型
                        goodsTypes:this.goodsTypes,//货物类型数据
                        // carsType: this.carsType,//货车类型数据
                        selectCar:this.selectCar,//货车类型显示
                        selectDriver: this.selectDriver,//是否选司机
                        returnToWarehouse: this.returnToWarehouse,//需要返仓
                        distributionExperience: this.distributionExperience,//配送经验
                        other: this.text,//其他
                        checked:this.checked,//是否回单
                        receipt:this.receipt,//回单方式
                        contacts:this.contacts,//回单联系人
                        contactsPhone:this.contactsPhone,//回单联系电话
                        receivingAddress:this.receivingAddress,//回单联系地址
                        radio:this.radio,//回单是否快递
                        radio1: this.radio1,//起点方式
                        warehouseName: this.warehouseName,//起点方式
                        checkedCities:this.checkedCities,//用车需求显示
                        changeCheckedCitie:this.changeCheckedCitie,//用车需求数据
                        orderTotalNum: this.orderTotalNum,//货物件数
                        orderTotalWeight: this.orderTotalWeight,//货物重量
                        orderTotalVolume: this.orderTotalVolume,//货物体积
                        addressIsShow: this.addressIsShow,//导入订单禁用按钮值
                        disableType: this.disableType,//存入tab禁用值
                        disableType2: this.disableType2,//存入tab禁用值
                        isAddressCopy: this.isAddressCopy,//存入是否从运输单复制标记
                        china: this.china,//配送区域
                        lineNameRemarks: this.lineNameRemarks,//线路名称备注
                    }))
                );
            },
            //校验重量、体积、件数
            regInt(val){
                if(val==='volume') {
                    if(!regInts(this,this.orderTotalVolume)){
                        this.$message({
                            message: '请您输入数字或小数点后两位...',
                            type: 'warning'
                        });
                        this.orderTotalVolume=orderTotalVolume;
                        return;
                    }
                }
                if(val==='weight') {
                    if(!regInts(this,this.orderTotalWeight)){
                        this.$message({
                            message: '请您输入数字或小数点后两位...',
                            type: 'warning'
                        });
                        this.orderTotalWeight=orderTotalWeight;
                    }
                }
                if(val==='num') {
                    if(!regIntt(this,this.orderTotalNum)){
                        this.$message({
                            message: '请您输入整数...',
                            type: 'warning'
                        });
                        this.orderTotalNum=orderTotalNum;
                    }
                }
            },
            //计算重量、体积、件数
            calculateInit(){
                this.orderTotalNum=0;
                this.orderTotalWeight=0;
                this.orderTotalVolume=0;
            },
            //计算重量、体积、件数
            calculate(){
                this.calculateInit();
                if(this.consigneeArr.length<=0){
                    return;
                }
                for (let i=0;i<this.consigneeArr.length;i++){
                    if(this.consigneeArr[i].goodsWeight!==undefined&&this.consigneeArr[i].goodsVolume!==undefined&&this.consigneeArr[i].goodsAmount!==undefined){
                        this.orderTotalNum+=this.consigneeArr[i].goodsAmount;
                        this.orderTotalWeight+=this.consigneeArr[i].goodsWeight;
                        this.orderTotalVolume+=this.consigneeArr[i].goodsVolume;
                    }
                }
            },
            //跳转第三方订单列表
            toListOrder(){
                if (this.radio1 === "2") {
                    this.$message({
                        message: '抱歉，仓库起点方式不能选择订单！',
                        type: 'warning'
                    });
                    return;
                }
                for(let i=0;i<this.consigneeArr.length;i++){
                    if(this.consigneeArr[i].consignee!==''||this.consigneeArr[i].consigneePhone!==''||this.consigneeArr[i].consigneeAddress!==''){
                        this.consigneeArr[i].checked=true;
                        sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)))
                    }
                }

                for(let i=0;i<this.consignorArr.length;i++){
                    if(this.consignorArr[i].consignor!==''||this.consignorArr[i].consignorPhone!==''||this.consignorArr[i].consignorAddress!==''){
                        this.consignorArr[i].checked=true;
                        sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
                    }
                }
                //本地存储发布用车资料
                this.setItemStorage();
                this.$router.push({
                    path: '/index/special_revised_order',
                });
            },
            //跳转地图
            editor(item,i,type){
                console.log(item, i);
                let arr=[];
                arr.push(item);
                //本地存储联系地址资料
                sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
                sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)));
                //本地存储发布用车资料
                this.setItemStorage();
                this.$router.push({
                    path: '/ReleaseCar/use-car/special_revised_position',
                    query: {
                        selectedArray: encodeURIComponent(JSON.stringify(arr)),
                        type: encodeURIComponent(type),
                        index: encodeURIComponent(i)
                    }
                })

            },
            //校验第三方数组数据
            filterData(){//过滤发货方数据并判断是否为空
                if (this.radio1 === "1") {
                    for (let index of this.consignorArr.keys()) {
                        if (this.consignorArr[index].consignorAddress === '' || this.consignorArr[index].consignor === '' || this.consignorArr[index].consignorPhone === '') {
                            return ['发货方', index];
                        }
                        if (!contactsPeople(this, this.consignorArr[index].consignor)) {
                            return ['非发货方联系人', index];
                        }
                        if (!regTelePhone(this, this.consignorArr[index].consignorPhone)) {
                            return ['非发货方电话格式', index]
                        }
                    }
                }
                //过滤收货方数据并判断是否为空
                for (let index of this.consigneeArr.keys()){
                    if (this.consigneeArr[index].consigneeAddress === '' || this.consigneeArr[index].consignee === '' || this.consigneeArr[index].consigneePhone === '')
                    {
                        return ['收货方',index];
                    }
                    if(!contactsPeople(this,this.consigneeArr[index].consignee)){
                        return ['非收货方联系人',index];
                    }
                    if(!regTelePhone(this,this.consigneeArr[index].consigneePhone)){
                        return ['非收货方电话格式',index]
                    }
                }
                return ['',''];
            },
            //过滤第三方数组数据
            sendDatas(){
                this.consignorSendArr = [];
                this.consigneeSendArr = [];
                for (let index of this.consignorArr.keys()){
                    if(String(this.consignorArr[index].orderId).length>=11){
                        this.consignorSendArr.push(
                            {
                                orderId:this.consignorArr[index].orderId,
                                address: this.consignorArr[index].consignorAddress,
                                //配合后台修改,发货方key值与收货人key一致
                                consignee :this.consignorArr[index].consignor,
                                province :this.consignorArr[index].consignorProvince,
                                city: this.consignorArr[index].consignorCity,
                                phone: this.consignorArr[index].consignorPhone,
                                latitude: this.consignorArr[index].consignorLatitude,
                                county:this.consignorArr[index].consignorCountry,
                                longitude:this.consignorArr[index].consignorLongitude,
                                type:'0'
                            })
                    }else{
                        this.consignorSendArr.push(
                            {
                                address: this.consignorArr[index].consignorAddress,
                                consignee :this.consignorArr[index].consignor,
                                province :this.consignorArr[index].consignorProvince,
                                city: this.consignorArr[index].consignorCity,
                                phone: this.consignorArr[index].consignorPhone,
                                latitude: this.consignorArr[index].consignorLatitude,
                                county:this.consignorArr[index].consignorCountry,
                                longitude:this.consignorArr[index].consignorLongitude,
                                type:'0'
                            });
                    }
                }
                for (let index of this.consigneeArr.keys()){
                    if (String(this.consigneeArr[index].orderId).length >= 11) {
                        this.consigneeSendArr.push(
                            {
                                orderId: this.consigneeArr[index].orderId,
                                address: this.consigneeArr[index].consigneeAddress,
                                consignee: this.consigneeArr[index].consignee,
                                province: this.consigneeArr[index].consigneeProvince,
                                city: this.consigneeArr[index].consigneeCity,
                                phone: this.consigneeArr[index].consigneePhone,
                                latitude: this.consigneeArr[index].consigneeLatitude,
                                county: this.consigneeArr[index].consigneeCountry,
                                longitude: this.consigneeArr[index].consigneeLongitude,
                                type: '1'
                            });
                    } else {
                        this.consigneeSendArr.push(
                            {
                                address: this.consigneeArr[index].consigneeAddress,
                                consignee: this.consigneeArr[index].consignee,
                                province: this.consigneeArr[index].consigneeProvince,
                                city: this.consigneeArr[index].consigneeCity,
                                phone: this.consigneeArr[index].consigneePhone,
                                latitude: this.consigneeArr[index].consigneeLatitude,
                                county: this.consigneeArr[index].consigneeCountry,
                                longitude: this.consigneeArr[index].consigneeLongitude,
                                type: '1'
                            });
                    }
                }
                //console.log(this.consigneeSendArr);
                this.deliveryPoints = this.consigneeSendArr;
                //最终传出的数据
                for (let index of this.consigneeSendArr.keys()) {
                    this.consignorSendArr.push(this.consigneeSendArr[index]);
                }
                //console.log(this.consignorSendArr);
            },
            //添加收货方
            addConsigneeArr(i){
                if(this.consigneeArr.length===20){
                    this.$message({
                        message: '抱歉,最大限制20组',
                        type: 'warning'
                    });
                    return;
                }
                console.log(i);
                this.consigneeArr.push(
                    { orderId:this.consigneeArr.length,
                        consigneeLatitude:"",
                        consigneeLongitude:"",
                        consignee:"",
                        consigneePhone:"",
                        consigneeProvince:'',
                        consigneeCity:'',
                        consigneeCountry:'',
                        consigneeAddress:''
                    });
                this.kilometre = '';
                this.isLookLine = false;
                sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)));
                console.log(this.consigneeArr);
            },
            //删除收货方
            delConsigneeArr(item,i){
                console.log(String(item.orderId).length);
                if(String(item.orderId).length>=11){
                    for (let index of this.consignorArr.keys()){
                        if(item.orderId===this.consignorArr[index].orderId&&String(item.orderId).length>=11){
                            this.consignorArr.splice(index,1);
                            break;
                        }
                    }
                    this.consigneeArr.splice(i,1);
                    sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)));
                    sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
                    this.kilometre = '';
                    this.isLookLine = false;
                    this.calculate();
                    return;
                }
                this.consigneeArr.splice(i,1);
                sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)))
                this.isLookLine = false;
                this.kilometre = '';
            },
            //添加发货方
            addConsignorArr(i){
                if(this.consignorArr.length===20){
                    this.$message({
                        message: '抱歉,最大限制20组',
                        type: 'warning'
                    });
                    return;
                }
                this.consignorArr.push(
                    {
                        orderId:this.consignorArr.length,
                        consignorLatitude:"",
                        consignorLongitude:"",
                        consignor:"",
                        consignorPhone:"",
                        consignorProvince:'',
                        consignorCity:'',
                        consignorCountry:'',
                        consignorAddress:''
                    }
                );
                sessionStorage.setItem('consignorArr', Base64.encode(JSON.stringify(this.consignorArr)));
                this.kilometre = '';
                this.isLookLine = false;
            },
            //删除发货方
            delConsignorArr(item,i){
                if(String(item.orderId).length>=11){
                    for (let index of this.consigneeArr.keys()){
                        if(item.orderId===this.consigneeArr[index].orderId&&String(item.orderId).length>=11){
                            this.consigneeArr.splice(index,1);
                            break;
                        }
                    }
                    this.consignorArr.splice(i,1);
                    sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)));
                    sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
                    this.calculate();
                    this.kilometre = '';
                    this.isLookLine = false;
                    return;
                }
                this.consignorArr.splice(i,1);
                sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
                this.kilometre = '';
                this.isLookLine = false;

            },
            //计算星期
            getDate (datestr) {
                let temp = datestr.split("-");
                // if (temp[1] === '01') {
                //   temp[0] = parseInt(temp[0],10) - 1;
                //   temp[1] = '12';
                // } else {
                //   temp[1] = parseInt(temp[1],10) - 1;
                // }
                let date = new Date(temp[0],temp[1]-1,temp[2]);
                //new Date()的月份入参实际都是当前值-1
                // let date = new Date(temp[0], temp[1], temp[2]);
                return date;
            },
            //计算星期
            getDiffDate (start, end) {
                let startTime = this.getDate(start);
                let endTime = this.getDate(end);
                let dateArr = [];
                while ((endTime.getTime() - startTime.getTime()) > 0) {
                    let year = startTime.getFullYear();
                    let month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
                    let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
                    dateArr.push(year + "-" + month + "-" + day);
                    startTime.setDate(startTime.getDate() + 1);
                }
                dateArr.push(end);
                console.log(dateArr);
                let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                for(let i =0;i<dateArr.length;i++){
                    this.checkedWeeks.push(weekDay[new Date(dateArr[i]).getDay()]);
                }
            },
            testDate(){
                this.checkedWeeks = [];
                this.checkAll1 = false;
                this.isArriveDate = true;
                this.isCheckAll =true;
                if(this.arriveDate !== null){
                    let data1 = Date.parse(new Date(this.arriveDate[0]))-3600*1000*8;
                    let data2 = Date.parse(new Date(this.arriveDate[1]))-3600*1000*8;
                    if(data1 === data2){
                        let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                        console.log(weekDay[new Date(this.arriveDate[0]).getDay()]);
                        this.checkedWeeks.push(weekDay[new Date(this.arriveDate[0]).getDay()]);
                        // this.isArriveDate = true;
                    }
                    if(data2 - data1 >= 3600*1000*24*6){
                        let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                        console.log(weekDay[new Date(this.arriveDate[0]).getDay()]);
                        this.isArriveDate = false;
                        this.isCheckAll =false;
                        this.checkAll1 = true;
                        this.checkedWeeks = week;
                        console.log(this.checkedWeeks)
                        for(let i=0;i<this.checkedWeeks.length;i++){
                            this.isArr[i] = false;
                        }
                    }
                    if( data2 - data1 >= 3600*1000*24 && data2 - data1 < 3600*1000*24*6){
                        this.isArr=[true,true,true,true,true,true,true];
                        this.getDiffDate(this.arriveDate[0],this.arriveDate[1]);
                        this.isArriveDate = false;
                        let weekDay = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"];
                        console.log(this.checkedWeeks)
                        for(let i=0;i<this.checkedWeeks.length;i++){
                            for(let j=0;j<weekDay.length;j++){
                                if(this.checkedWeeks[i] === weekDay[j]){
                                    this.isArr[j] = false;
                                }
                            }
                        }
                    }
                }
                // console.log(this.arriveDate)

            },
            getCarTypes(arr) {
                this.showCarType = arr[0];
            },
            showCar(arr) {
                console.log(arr)
                this.showCarType = arr[0];
            },
            //检测时间
            testingTime(){
                if(this.arriveDate == "" || this.arriveDate == null){
                    this.$message({
                        message: '请先选择日期',
                        type: 'warning'
                    });
                    this.arriveTime = '';
                }else{
                    let str = this.arriveDate[0] + ' ' + this.arriveTime;
                    let date = new Date(str);
                    let time = date.getTime();
                    // console.log(time1)
                    const  nowTime = new Date().getTime()  + 3600*1000*2;
                    if(time < nowTime){
                        this.$message({
                            message: '到仓时间不能小于当前时间2小时,请重新选择',
                            type: 'warning'
                        });
                        console.log(this.formatDateTime(nowTime));
                        this.arriveTime = '';
                    }
                }
            },
            //时间戳转换小时
            formatDateTime(inputTime) {
                let date = new Date(inputTime);
                let h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return h+':'+minute+':'+second;
            },
            //货物类型选其他
            add(){
                if(this.isChecked === true){
                    this.dialogVisible = true;
                    this.otherTypes = '';
                } else {
                    this.goodsType.splice(this.index,1);
                    console.log(this.goodsType);
                    this.goodsTypes = '';
                    for(let i=0;i<this.goodsType.length;i++){
                        this.goodsTypes = this.goodsTypes + this.goodsType[i] + ',';
                    }
                    this.goodsTypes = this.goodsTypes.substring(0,this.goodsTypes.length-1);
                }
            },
            //取消货物类型
            cancel(){
                this.dialogVisible = false;
                this.isChecked =false;
            },
            //确定货物类型选其他
            confirm(){
                console.log(this.otherTypes);
                if(this.otherTypes !== ''){
                    if(!regGoodType(this,this.otherTypes)){
                        this.$message({
                            message: '货物类型要求长度2-20位,或不能包含特殊字符',
                            type: 'warning'
                        });
                        return;
                    }
                    this.goodsType.push(this.otherTypes);
                    this.index = this.goodsType.length -1;
                    if(this.goodsType.length > 1){
                        this.goodsTypes = this.goodsTypes + ',' + this.otherTypes;
                    }else {
                        this.goodsTypes = this.goodsTypes + this.otherTypes;
                    }
                    this.dialogVisible = false;
                }
                console.log(this.goodsTypes);
                console.log(this.goodsType)
                // this.goodsType.splice(this.index,1);
                // this.goodsTypes = this.goodsTypes.slice(0,-3);
                // if(this.otherTypes !== ''){
                //   this.goodsType.push(this.otherTypes);
                //   this.goodsTypes = this.goodsTypes + ',' + this.otherTypes;
                // }
                // console.log(this.goodsType);
            },
            handleClose(done) {
                // let _this = this;
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.isChecked =false;
                        // _this.goodsType.splice(_this.index,1);
                        // _this.goodsTypes = _this.goodsTypes.slice(0,-3);
                    })
                    .catch(_ => {});
            },
            //选择回单方式
            changeReceipt(){
                this.contacts = '';
                this.contactsPhone = '';
                if(this.receipt === ''){
                    this.contactInformation = false;
                    this.expressInformation = false;
                }else if(this.receipt === '快递'){
                    this.contactInformation = false;
                    this.expressInformation = true;
                    this.radio = '到付';
                }else{
                    this.expressInformation = false;
                    this.contactInformation = true;
                    this.radio = '';
                    this.receivingAddress='';
                }
            },
            //清除车辆类型
            clearCarsTypes(){
                this.selectCar = '';
            },
            //货物类型获得焦点
            goodsTypesFocus(){
                this.goodsTypeShow = true;
                this.isDisabled = true;
                // this.goodsTypes = this.goodsType[0];
            },
            //车辆类型获得焦点
            carsTypesFocus(){
                if (this.valuationMethod === 'BK') {
                    if (this.kilometre === "" || this.orderTotalVolume === "" || this.orderTotalWeight === "") {
                        this.$message({
                            message: '计价方式按起步价+超出部分计价,线路长度、货物体积、货物重量必填',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if (this.valuationMethod === 'BP') {
                    if (this.orderTotalNum === "") {
                        this.$message({
                            message: '计价方式按件计价,配送件数必填',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if (this.valuationMethod === 'BT') {
                    if (this.ticketsNums === "") {
                        this.$message({
                            message: '计价方式票数计价,配送票数必填',
                            type: 'warning'
                        });
                        return;
                    } else {
                        if (!(/^\d+$/g.test(this.ticketsNums))) {
                            this.$message({
                                message: '计价方式票数计价,配送票数必填',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                }
                for (let index of this.consigneeArr.keys()) {
                    if (this.consigneeArr[index].consigneeAddress === '') {
                        this.$message.warning('第' + (index + 1) + '行,收货方地址资料是不完整!');
                        return;
                    }
                }
                this.showCarType = true;
                console.log(this.showCarType);
                this.deliveryPoints = this.consigneeArr.length;
                this.$store.commit('selectValuationMethod', this.valuationMethod)
            },
            //其他货物类型展示
            goodsTypeChange(){
                this.goodsTypes = '';
                for(let i=0;i<this.goodsType.length;i++){
                    this.goodsTypes = this.goodsTypes + this.goodsType[i] + ',';
                }
                this.goodsTypes = this.goodsTypes.substring(0,this.goodsTypes.length-1);
            },
            // 发送数据
            send(){
                // this.kilometre = 147;
                //数据判断方式一
                if (!this.china.length || this.arriveTime === "" || this.arriveTime === null || this.arriveDate === "" || this.kilometre === "" || this.arriveDate === null || this.checkedWeeks.length ==0 || this.lineName ==="" || this.lineName === null  || this.goodsTypes === "" ||
                    this.orderTotalWeight === "" || this.orderTotalVolume === "" || this.distributionExperience === '' || this.distributionExperience === null
                ){
                    this.$message({
                        message: '带*号的选项必填，您有未填选项',
                        type: 'warning'
                    });
                    return;
                }
                if(this.selectContact == '1' && this.contactPrice == ''){
                    this.$message({
                        message: '请填写客户报价的价格',
                        type: 'warning'
                    });
                    return;
                }

                if(this.batch == true && this.conts == '') {
                    this.$message({
                        message: '请填写批量发送的单数',
                        type: 'warning'
                    });
                    return;
                }

                if(this.batch == true && this.conts != '') {
                    let reg = /^([0-9]|[12][0-9]|30)$/ig;
                    let boolean = !reg.test(this.conts);
                    if(boolean){
                        this.$message({
                            message: '批量发送单数只能填写整数,并且最多一次发30单',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(this.selectDriver != '1'){
                            this.$message({
                                message: "批量发送选司机必须选择'是'",
                                type: 'warning'
                            });
                            return;
                        }
                    }
                }

                if (this.valuationMethod === 'BP') {
                    if (this.orderTotalNum === "") {
                        this.$message({
                            message: '计价方式按件计价,配送件数必填',
                            type: 'warning'
                        });
                        return;
                    }
                }

                if (this.valuationMethod === 'BT') {
                    if (this.ticketsNums === "") {
                        this.$message({
                            message: '计价方式票数计价,配送票数必填',
                            type: 'warning'
                        });
                        return;
                    }
                }

                if (this.consignorArr.length <= 0 && this.radio1 === "1") {
                    this.$message.warning('发货方地址资料限制最少为一组');
                    return;
                }
                if(this.consigneeArr.length<=0){
                    this.$message.warning('收货方地址资料限制最少为一组');
                    return;
                }

                let str = this.arriveDate[0] + ' ' + this.arriveTime;
                let date = new Date(str);
                let time = date.getTime();
                // console.log(time1)
                const  nowTime = new Date().getTime()  + 3600*1000*2;
                if(time < nowTime){
                    this.$message({
                        message: '到仓时间不能小于当前时间2小时,请重新选择',
                        type: 'warning'
                    });
                    console.log(this.formatDateTime(nowTime));
                    return;
                }

                //原因
                if(this.text != ''){
                    if(!regReason(this,this.text)){
                        this.$message({
                            message: '搬运说明要求长度5-225位,或不能包含特殊字符!',
                            type: 'warning'
                        });
                        return;
                    }
                }

                //收件人电话
                // consigneePhone(this,this.contactsPhone);
                // //收件人
                // consigneeName(this,this.contacts);
                // //联系人电话
                // regPhones(this,this.contactsPhone);
                // //联系人
                // contactsNames(this,this.contacts);
                //货物名称
                if(this.goodsName !== ''){
                    goodsNames(this,this.goodsName);
                    if(!this.successGoodsNames){
                        return;
                    }
                }
                //总耗时
                // if(this.lastTime != ''){
                //     regCarTime(this,this.lastTime);
                // }
                //线路名称
                // regLineName(this,this.lineName);

                // if(!this.successCarTime){
                //     return;
                // }

                if(this.checked === '1'){
                    if(this.receipt === ""){
                        this.$message({
                            message: '请选择回单方式',
                            type: 'warning'
                        });
                        return;
                    }else if(this.receipt === "快递"){
                        if(this.receivingAddress === "" || this.contacts === "" ||  this.contactsPhone === ""){
                            this.$message({
                                message: '请填写信息',
                                type: 'warning'
                            });
                            return;
                        }
                        if(this.radio===""){
                            this.$message({
                                message: '快递选项至少选一项',
                                type: 'warning'
                            });
                            return;
                        }
                        if(!checkContactsName(this.contacts)){
                            this.$message.error('联系人要求长度2-10位且不能包含特殊字符!');
                            return;
                        }
                        if(!checkcontactsPhone(this.contactsPhone)){
                            this.$message.error('手机格式不正确!');
                            return;
                        }

                        if(!regAddress(this,this.receivingAddress)){
                            this.$message({
                                message: '收件人地址要求长度2-50位,或不能包含特殊字符!',
                                type: 'warning'
                            });
                            return;
                        }
                        this.creatUseCar();

                    }else{
                        if (this.contacts === "" ||  this.contactsPhone === "") {
                            this.$message({
                                message: '请填写信息',
                                type: 'warning'
                            });
                            return;
                        }
                        if(!checkContactsName(this.contacts)){
                            this.$message.error('联系人要求长度2-10位且不能包含特殊字符!');
                            return;
                        }
                        if(!checkcontactsPhone(this.contactsPhone)){
                            this.$message.error('手机格式不正确!');
                            return;
                        }
                        this.creatUseCar();
                    }
                }else {
                    // console.log(this.lastTime,this.lineName);
                    this.creatUseCar();
                }


            },
            // 发布用书请求
            creatUseCar(){
                // if(this.users.currentUser.permission!==undefined){
                //     if(JSON.parse(this.users.currentUser.permission).chooseDriver == false){
                //         this.selectDriver= 0 ;
                //     }
                // }
                let lineName = '';
                if(this.lineNameRemarks != ''){
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/;
                    let boolean = reg.test(this.lineNameRemarks);
                    if(!boolean){
                        this.$message.error('线路名称备注要求长度2-10位且不能包含特殊字符!');
                        return;
                    }
                    lineName = this.lineName + this.lineNameRemarks;
                }else{
                    lineName = this.lineName;
                }

                if(this.changeCheckedCitie.length === 0){
                    for(let i=0;i < this.cities.length;i++){
                        this.changeCheckedCitie.push(0)
                    }
                }
                //第三方数组判断实例化
                this.sendfilterData=this.filterData();
                console.log(this.sendfilterData);
                if (this.sendfilterData[0] === '发货方' && this.radio1 === "1") {
                    this.$message.warning('请检查,第'+(this.sendfilterData[1]+1)+'行'+this.sendfilterData[0]+'资料是否完整!');
                    return;
                }
                if(this.sendfilterData[0]==='收货方'){
                    this.$message.warning('请检查,第'+(this.sendfilterData[1]+1)+'行'+this.sendfilterData[0]+'资料是否完整!');
                    return;
                }
                if (this.sendfilterData[0] === '非发货方电话格式' && this.radio1 === "1") {
                    this.$message.warning('发货方第'+(this.sendfilterData[1]+1)+'行,电话格式不正确');
                    return;
                }
                if(this.sendfilterData[0]==='非收货方电话格式'){
                    this.$message.warning('收货方第'+(this.sendfilterData[1]+1)+'行,电话格式不正确');
                    return;
                }
                if (this.sendfilterData[0] === '非发货方联系人' && this.radio1 === "1") {
                    this.$message.warning('发货方第'+(this.sendfilterData[1]+1)+'行,姓名要求长度2-10位,或不能包含特殊字符!');
                    return;
                }
                if(this.sendfilterData[0]==='非收货方联系人'){
                    this.$message.warning('收货方第'+(this.sendfilterData[1]+1)+'行,姓名要求长度2-10位,或不能包含特殊字符!');
                    return;
                }

                if (this.warehouseName === "" && this.radio1 === "2") {
                    this.$message.warning('仓库起点不能为空');
                    return;
                }

                //仓库
                if (this.warehouseName !== "" && this.radio1 === "2") {
                    this.changeWarehouseName();
                }
                //如果是地址起点方式，就清空仓库
                if (this.radio1 === "1") {
                    this.warehouseName = "";
                    this.depotId = "";
                }
                //如果是仓库起点方式，就清空初始化data起点数据
                if (this.radio1 === "2") {
                    this.consignorArr = [];
                }
                //过滤第三方最终传出的数据
                if(!this.flag){//标记异常
                    this.sendDatas();
                }

                //console.log(this.changeCheckedCitie)
                //this.loading = true;
                let useCarInfos = {
                    "token":this.users.result.token,
                    "customerId":Number(sessionStorage.getItem('webCustomerId')),
                    "arrDepotTime":this.arriveTime,
                    // "totalTime":this.lastTime,
                    "totalVolume":parseFloat(this.orderTotalVolume).toFixed(2),
                    "totalWeight":parseFloat(this.orderTotalWeight).toFixed(2),
                    "goodsNum": Math.round(this.orderTotalNum),
                    "requestType":"1",
                    "deliveryStartTime": this.arriveDate[0],
                    "deliveryEndTime": this.arriveDate[1],
                    "deliveryCycle": this.checkedWeeks,
                    "depotName": this.warehouseName,
                    "depotId": this.depotId !== '' ? this.depotId : 0,
                    "traceName": lineName,
                    "groupId": this.setNumber,
                    "groupName": this.groupName,
                    "deliveryArea": CodeToText[this.china[0]] + ',' + CodeToText[this.china[1]] + ',' + CodeToText[this.china[2]],
                    "goodsName": this.goodsName,
                    "goodsType": this.goodsType,
                    "vehicleAddiReq": {
                        "isTrolley": this.changeCheckedCitie[3],
                        "isDemolition": this.changeCheckedCitie[0]
                    },
                    "handlingReq":{
                        "isHandling": this.changeCheckedCitie[1],
                        "isEmployee": this.changeCheckedCitie[2],
                        "isInstall": this.changeCheckedCitie[4],
                        "isDischarge": this.changeCheckedCitie[5],
                        "remark":this.text
                    },
                    "vehicleTypeReq": this.carsType,
                    "isAssign":this.selectDriver,
                    "addRunNo":"",
                    "addRunReason":"",
                    "cancelReason":"",
                    "isBackDepot":this.returnToWarehouse,
                    "oldScheduleId":"",
                    "deliveryExperience":this.distributionExperience,
                    "receipt":{
                        "receiptWay":this.receipt,
                        "receiptContact":this.contacts,
                        "receiptNum":this.contactsPhone,
                        "address":this.receivingAddress,
                        "express":this.radio
                    },
                    "location":this.consignorSendArr,
                    // "isInsurance": this.checkedInsurances.length > 0 ? this.checkedInsurances : null,
                    "valuationType": this.valuationMethod, // 计价方式
                    "valuationParam": null,//计价模板
                    "contractId": this.areaArr[0].contractorId, //合同编号
                    "contractVehicle": [], //  合同车型
                    "contractArea": CodeToText[this.china[0]] + ',' + CodeToText[this.china[1]] + ',' + CodeToText[this.china[2]],//合同区域
                    "kilometers": kilometre,//公里数(保留两位小数)
                    "votes": this.ticketsNums,// 票数
                    "points": this.consigneeSendArr.length, //配送点数
                    "eachSchedule":this.conts,
                    "contactPrice":this.selectContact == '1' && this.contactPrice != ''?this.contactPrice:this.selectContact
                };
                if(this.batch == false){
                    delete useCarInfos.eachSchedule;
                }
                if (this.valuationMethod === 'BK') {
                    useCarInfos.valuationParam = this.$store.state.arr;
                    console.log(this.$store.state.arr)
                    if (this.$store.state.arr.length > 0) {
                        for (let i = 0; i < this.$store.state.arr.length; i++) {
                            this.carsType.push(this.$store.state.arr[i].VT);
                        }
                    }else{
                        this.$message({
                            message: '按起步价+超出部分发布没选计价模板',
                            type: 'warning'
                        });
                        this.loading = false;
                        return;
                    }
                    console.log(useCarInfos.valuationParam)
                } else if (this.valuationMethod === 'BV') {
                    useCarInfos.valuationParam = this.$store.state.arr1;
                    if (this.$store.state.arr1.length > 0) {
                        for (let i = 0; i < this.$store.state.arr1.length; i++) {
                            this.carsType.push(this.$store.state.arr1[i].VT);
                        }
                    }else{
                        this.$message({
                            message: '按整车发布没选计价模板',
                            type: 'warning'
                        });
                        this.loading = false;
                        return;
                    }
                } else if (this.valuationMethod === 'BP') {
                    useCarInfos.valuationParam = this.$store.state.arr2;
                    if (this.$store.state.arr2.length > 0) {
                        for (let i = 0; i < this.$store.state.arr2.length; i++) {
                            this.carsType.push(this.$store.state.arr2[i].VT);
                        }
                    }else{
                        this.$message({
                            message: '按件数发布没选计价模板',
                            type: 'warning'
                        });
                        this.loading = false;
                        return;
                    }
                } else if (this.valuationMethod === 'BT') {
                    useCarInfos.valuationParam = this.$store.state.arr3;
                    if (this.$store.state.arr3.length > 0) {
                        for (let i = 0; i < this.$store.state.arr3.length; i++) {
                            this.carsType.push(this.$store.state.arr3[i].VT);
                        }
                    }else{
                        this.$message({
                            message: '按票数发布没选计价模板',
                            type: 'warning'
                        });
                        this.loading = false;
                        return;
                    }
                } else {
                    useCarInfos.valuationParam = this.$store.state.arr4;
                    if (this.$store.state.arr4.length > 0) {
                        for (let i = 0; i < this.$store.state.arr4.length; i++) {
                            this.carsType.push(this.$store.state.arr4[i].VT);
                        }
                    }else{
                        this.$message({
                            message: '按小时发布没选计价模板',
                            type: 'warning'
                        });
                        this.loading = false;
                        return;
                    }
                }
                console.log(useCarInfos);
                // console.log(JSON.stringify(useCarInfos));
                this.$http.post(this.global.lightningUrl +'/cmsv1/trunkCenter/schedule/create', JSON.stringify(useCarInfos), {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.data.errcode === 0){
                        this.loading = false;
                        this.$message({
                            message: '创建发布用车单成功',
                            type: 'success'
                        });
                        //清除本地---
                        sessionStorage.removeItem('consigneeArr');
                        sessionStorage.removeItem('consignorArr');
                        sessionStorage.removeItem('useCarData');

                        this.$store.state.arr = [];
                        this.$store.state.arr1 = [];
                        this.$store.state.arr2 = [];
                        this.$store.state.arr3 = [];
                        this.$store.state.arr4 = [];

                        this.$route.params.addressCopy = undefined;
                        this.flag=false;//标记
                        this.reload();
                    }else{
                        this.$message.error(
                            res.data.message
                        );
                        this.flag=true;
                    }
                }).catch((error) => {
                    console.log(error);
                    this.flag=true;
                });
            },
            // 判断一个数组里在另一个数组里有没有
            isInArray(arr,value){
                for(let i = 0; i < arr.length; i++){
                    if(value === arr[i]){
                        return true;
                    }
                }
                return false;
            },
            // 用车需求传0或1
            changeCheckedCities(){
                let arr1 = [];
                for(let i=0;i < this.cities.length;i++){
                    arr1.push(0)
                }
                if(this.isInArray(this.checkedCities,0)){
                    arr1.splice(0,1,1)
                }
                if(this.isInArray(this.checkedCities,1)){
                    arr1.splice(1,1,1)
                }
                if(this.isInArray(this.checkedCities,2)){
                    arr1.splice(2,1,1)
                }
                if(this.isInArray(this.checkedCities,3)){
                    arr1.splice(3,1,1)
                }
                if(this.isInArray(this.checkedCities,4)){
                    arr1.splice(4,1,1)
                }
                if(this.isInArray(this.checkedCities,5)){
                    arr1.splice(5,1,1)
                }
                this.changeCheckedCitie = arr1;
                console.log(this.changeCheckedCitie);
            },
            // 显示回单方式
            showReceipt(){
                console.log(this.checked);
                if(this.checked === "1"){
                    this.isShow = !this.isShow;
                }else{
                    this.contactInformation= false;
                    this.expressInformation = false;
                    this.isShow = false;
                    this.receipt = '';
                    this.contactsPhone = '';
                    this.contacts = '';
                    this.radio = '';
                    this.receivingAddress = '';
                }
            },
            handleCheckAllChange(val) {
                let arr = [];
                for (let i = 0;i < this.cities.length;i++){
                    arr.push(i);
                }
                this.checkedCities = val  ? arr: [];
                this.isIndeterminate = false;
                this.changeCheckedCities();
            },
            handleCheckedCitiesChange(value) {
                console.log(value);
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                this.changeCheckedCities();
            },
            weeksCheckAllChange(val) {
                this.checkedWeeks = val ? week : [];
                this.isWeek = false;
            },
            handleCheckedWeeksChange(value) {
                let checkedCount1 = value.length;
                this.checkAll1 = checkedCount1 === this.weeks.length;
                this.isWeek = checkedCount1 > 0 && checkedCount1 < this.weeks.length;
            },
            //转换时间戳
            formatDateTime(inputTime) {
                let date = new Date(inputTime);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            init() {
                map = new AMap.Map('container', {
                    zoom: 11,
                    scrollWheel: true,
                })
            },
            handleChange1(value) {
                this.china=[TextToCode[value[0]].code,TextToCode[value[0]][value[1]].code,TextToCode[value[0]][value[1]][value[2]].code];
            },
            getArea() {
                let datas = JSON.stringify({
                    token: this.users.result.token,
                    customerId:Number(sessionStorage.getItem('webCustomerId'))
                });
                console.log(datas);
                this.$http.post(this.global.lightningUrl + '/cmsv1/customerManage/getallarea', datas, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.errcode === 0){
                        this.areaArr=[];
                        this.areaArr = res.data.result;
                        this.valuationMethod = res.data.result[0].billWay;
                    }
                }).catch((error) => {
                    console.log(error);
                });

            }
        },
        //页面初始化请求仓库名称
        mounted(){
            let _this = this;
            // _this.reload();
            //是否选司机权限获取
            this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key')));

            //获取区域
            this.getArea();
            //this.china=[TextToCode[this.disProvince].code,TextToCode[this.disProvince][this.disCity].code,""];
            //保险
            // this.isBuyInsurance();
            //导入订单列表路由传参
            // console.log(decodeURIComponent(_this.$route.query.selectedArray));
            // this.consigneeArr=_this.$route.query.selectedArray===undefined?this.consigneeArr:JSON.parse(decodeURIComponent(_this.$route.query.selectedArray));
            // this.consignorArr=_this.$route.query.selectedArray===undefined?this.consignorArr:JSON.parse(decodeURIComponent(_this.$route.query.selectedArray));
            //计算并获取本地存储数据
            this.consigneeArr = sessionStorage.getItem('consigneeArr')===null?this.consigneeArr:JSON.parse(Base64.decode(sessionStorage.getItem('consigneeArr')));
            this.consignorArr = sessionStorage.getItem('consignorArr')===null?this.consignorArr:JSON.parse(Base64.decode(sessionStorage.getItem('consignorArr')));
            //计算订单体积重量件数
            this.calculate();

            //只触发一次运输单跳转到本页面的传的数据 如果跳转到地图的话存储useCarData本地
            let addressCopy = this.$route.params.addressCopy;
            if (typeof(addressCopy) !== 'undefined' && sessionStorage.getItem('useCarData') === null) {
                this.addressIsShow = true;
                this.isAddressCopy = true;
                let addressCopyData = JSON.parse(Base64.decode(addressCopy));
                //判断地址发布用车显示方式
                if (addressCopyData.transportTemp.depotId !== 0 && addressCopyData.transportTemp.depotId) {
                    this.radio1 = "2";
                    this.disableType = true
                } else {
                    this.radio1 = "1";
                    this.disableType2 = true
                }
                // this.lastTime = addressCopyData.transportTemp.totalTime;//单趟预计总耗时
                // this.lineName = addressCopyData.transportTemp.traceName;//线路名称
                this.warehouseName = addressCopyData.transportTemp.depotName;//仓库名称
                this.depotId = addressCopyData.transportTemp.depotId;//仓库ID
                this.orderTotalVolume = addressCopyData.transportTemp.totalVolume;//货物体积
                this.orderTotalWeight = addressCopyData.transportTemp.totalWeight;//货物重量
                this.orderTotalNum = addressCopyData.transportTemp.goodsNum;//货物件数
                this.goodsName = addressCopyData.transportTemp.goodsName;//货物名称
                this.returnToWarehouse = String(addressCopyData.transportTemp.isBackDepot);//是否返仓
                this.selectDriver = addressCopyData.transportTemp.isAssign;//是否选司机
                console.log(addressCopyData.transportTemp.deliveryArea.split(','))
                this.handleChange1(addressCopyData.transportTemp.deliveryArea.split(','));

                this.distributionExperience = addressCopyData.transportTemp.deliveryExperience;//配送经验
                this.text = addressCopyData.transportTemp.handlingReq.remark;//其他

                for (let i = 0; i < addressCopyData.transportTemp.location.length; i++) {
                    if (addressCopyData.transportTemp.location[i].type === "0") {
                        if (String(addressCopyData.transportTemp.location[i].orderId).length >= 11 && addressCopyData.transportTemp.location[i].orderId !== undefined) {
                            this.consignorArr.push(
                                {
                                    orderId: addressCopyData.transportTemp.location[i].orderId,
                                    consignorAddress: addressCopyData.transportTemp.location[i].address,
                                    //配合后台修改,发货方key值与收货人key一致
                                    consignor: addressCopyData.transportTemp.location[i].consignee,
                                    consignorProvince: addressCopyData.transportTemp.location[i].province,
                                    consignorCity: addressCopyData.transportTemp.location[i].city,
                                    consignorPhone: addressCopyData.transportTemp.location[i].phone,
                                    consignorLatitude: addressCopyData.transportTemp.location[i].latitude,
                                    consignorCountry: addressCopyData.transportTemp.location[i].county,
                                    consignorLongitude: addressCopyData.transportTemp.location[i].longitude,
                                    type: '0'
                                })
                        } else {
                            this.consignorArr.push(
                                {
                                    consignorAddress: addressCopyData.transportTemp.location[i].address,
                                    //配合后台修改,发货方key值与收货人key一致
                                    consignor: addressCopyData.transportTemp.location[i].consignee,
                                    consignorProvince: addressCopyData.transportTemp.location[i].province,
                                    consignorCity: addressCopyData.transportTemp.location[i].city,
                                    consignorPhone: addressCopyData.transportTemp.location[i].phone,
                                    consignorLatitude: addressCopyData.transportTemp.location[i].latitude,
                                    consignorCountry: addressCopyData.transportTemp.location[i].county,
                                    consignorLongitude: addressCopyData.transportTemp.location[i].longitude,
                                    type: '0'
                                });
                        }

                    } else {
                        if (String(addressCopyData.transportTemp.location[i].orderId).length >= 11 && addressCopyData.transportTemp.location[i].orderId !== undefined) {
                            this.consigneeArr.push(
                                {
                                    orderId: addressCopyData.transportTemp.location[i].orderId,
                                    consigneeAddress: addressCopyData.transportTemp.location[i].address,
                                    //配合后台修改,发货方key值与收货人key一致
                                    consignee: addressCopyData.transportTemp.location[i].consignee,
                                    consigneeProvince: addressCopyData.transportTemp.location[i].province,
                                    consigneeCity: addressCopyData.transportTemp.location[i].city,
                                    consigneePhone: addressCopyData.transportTemp.location[i].phone,
                                    consigneeLatitude: addressCopyData.transportTemp.location[i].latitude,
                                    consigneeCountry: addressCopyData.transportTemp.location[i].county,
                                    consigneeLongitude: addressCopyData.transportTemp.location[i].longitude,
                                    type: '1'
                                })
                        } else {
                            this.consigneeArr.push(
                                {
                                    consigneeAddress: addressCopyData.transportTemp.location[i].address,
                                    //配合后台修改,发货方key值与收货人key一致
                                    consignee: addressCopyData.transportTemp.location[i].consignee,
                                    consigneeProvince: addressCopyData.transportTemp.location[i].province,
                                    consigneeCity: addressCopyData.transportTemp.location[i].city,
                                    consigneePhone: addressCopyData.transportTemp.location[i].phone,
                                    consigneeLatitude: addressCopyData.transportTemp.location[i].latitude,
                                    consigneeCountry: addressCopyData.transportTemp.location[i].county,
                                    consigneeLongitude: addressCopyData.transportTemp.location[i].longitude,
                                    type: '1'
                                });
                        }
                    }
                }
                orderTotalNum = this.orderTotalNum = this.orderTotalNum === 0 ? '' : this.orderTotalNum;
                orderTotalWeight = this.orderTotalWeight = this.orderTotalWeight === 0 ? '' : this.orderTotalWeight;
                orderTotalVolume = this.orderTotalVolume = this.orderTotalVolume === 0 ? '' : this.orderTotalVolume;
                //console.log(this.consigneeArr, this.consignorArr);
                //console.log(addressCopyData);
            }
            //获取发布用车本地存储数据

            this.useCarData = sessionStorage.getItem('useCarData') === null ? sessionStorage.getItem('useCarData') : JSON.parse(Base64.decode(sessionStorage.getItem('useCarData')));
            if(this.useCarData!==null){
                this.arriveDate=this.useCarData.arriveDate;
                this.arriveTime=this.useCarData.arriveTime;
                this.selectCar=this.useCarData.selectCar;
                // this.carsType=this.useCarData.carsType;

                this.goodsName=this.useCarData.goodsName;
                this.selectDriver=this.useCarData.selectDriver;
                this.returnToWarehouse = String(this.useCarData.returnToWarehouse);
                this.text=this.useCarData.other;
                // this.lastTime=this.useCarData.lastTime;
                this.lineName=this.useCarData.lineName;
                this.distributionExperience=this.useCarData.distributionExperience;
                this.checkedCities=this.useCarData.checkedCities;
                this.changeCheckedCitie=this.useCarData.changeCheckedCitie;
                this.goodsTypes=this.useCarData.goodsTypes;
                this.goodsType=this.useCarData.goodsType;
                this.checked=this.useCarData.checked;
                this.receipt=this.useCarData.receipt;
                this.contacts=this.useCarData.contacts;
                this.contactsPhone=this.useCarData.contactsPhone;
                this.receivingAddress=this.useCarData.receivingAddress;
                this.radio=this.useCarData.radio;
                this.radio1 = this.useCarData.radio1;
                this.disableType = this.useCarData.disableType;
                this.disableType2 = this.useCarData.disableType2;
                this.addressIsShow = this.useCarData.addressIsShow;
                this.warehouseName = this.useCarData.warehouseName;
                this.orderTotalNum = this.useCarData.orderTotalNum;
                this.orderTotalWeight = this.useCarData.orderTotalWeight;
                this.orderTotalVolume = this.useCarData.orderTotalVolume;
                this.lineNameRemarks = this.useCarData.lineNameRemarks;
                this.china = this.useCarData.china;
                this.isAddressCopy = this.useCarData.isAddressCopy;
                orderTotalNum = this.orderTotalNum = this.orderTotalNum === 0 ? '' : this.orderTotalNum;
                orderTotalWeight = this.orderTotalWeight = this.orderTotalWeight === 0 ? '' : this.orderTotalWeight;
                orderTotalVolume = this.orderTotalVolume = this.orderTotalVolume === 0 ? '' : this.orderTotalVolume;
                sessionStorageData();
            } else {
                sessionStorage.setItem('consigneeArr', Base64.encode(JSON.stringify(this.consigneeArr)));
                sessionStorage.setItem('consignorArr', Base64.encode(JSON.stringify(this.consignorArr)));
                //本地存储发布用车资料
                this.setItemStorage();
            }

            //触发函数
            function sessionStorageData() {
                //通过自动选星期
                _this.testDate();
                //货物类型
                if (_this.goodsTypes !== '') {
                    _this.goodsTypeShow = true;
                    _this.isDisabled = true;
                }
                //是否回单
                _this.showReceipt();
                if (_this.receipt === '') {
                    _this.contactInformation = false;
                    _this.expressInformation = false;
                } else if (_this.receipt === '快递') {
                    _this.contactInformation = false;
                    _this.expressInformation = true;
                    //this.radio = '到付';
                }else{
                    _this.expressInformation = false;
                    _this.contactInformation = true;
                    _this.radio = '';
                    _this.receivingAddress = '';
                }
                //用车需求
                if (_this.checkedCities.length) {
                    _this.isIndeterminate = _this.checkedCities.length > 0 && _this.checkedCities.length < _this.cities.length;
                }
                // _this.handleCheckedCitiesChange(_this.checkedCities)
            }
            let userinfos = {
                token: this.users.result.token,
                userId:Number(sessionStorage.getItem('webCustomerId')),
            };
            // console.log(userinfos)
            this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/depot/all_depot_name', userinfos, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(function (res) {
                console.log(res);
                _this.warehouseNames = res.data.result;
                console.log(_this.warehouseNames)
            }).catch(function (error) {
                console.log(error);
            });
            //选司机权限
            // this.driverReview = this.users.currentUser.permission === undefined ? true : JSON.parse(this.users.currentUser.permission).chooseDriver;
            //第三方权限
            // this.thirdPartyOrder = this.users.currentUser.permission === undefined ? true : JSON.parse(this.users.currentUser.permission).thirdPartyOrder === undefined ? true : JSON.parse(this.users.currentUser.permission).thirdPartyOrder;
            if (!this.driverReview) {
                this.selectDriver = '0'
            }
            this.init();
        },
        filters: {
            val: function (value) {
                console.log(value);
                return value+"kg";
            }
        },
        components: {
            priceTable, selectCarsType
        }
    }
</script>

<style lang="scss" scoped>
    #container {
        width: 750px;
        height: 550px;
        position: relative;
    }

    #panel {
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 10px;
        right: 10px;
        width: 24%;
    }

    #panel .amap-lib-driving {
        border-radius: 4px;
        overflow: hidden;
    }

</style>

