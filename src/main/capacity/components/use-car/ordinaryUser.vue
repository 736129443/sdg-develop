<template>
  <div class="ordinaryUser">
    <div class=" container_border" v-loading="loading" element-loading-text="发布用车单成功,请稍等...">
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
          <span  class="spanTime">单趟预计总耗时：</span>
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
      <div class="to-storehouse">
        <span ><span class="required">*</span>仓库名称：</span>
        <el-select class="text" :disabled="isToUseCar" v-model="warehouseName"
                   placeholder="请选择仓库名称">
          <!--<el-option-->
                  <!--v-for="item in warehouseNames"-->
                  <!--:key="item.id"-->
                  <!--:label="item.depotName"-->
                  <!--:value="item.depotName">-->
          <!--</el-option>-->
        </el-select>
        <span style="margin-left:28px"><span class="required">*</span>集合名称：</span>
        <el-select class="text" v-model="setName" value-key="groupId" :disabled="isToUseCar"
                   placeholder="请选择集合编号">
          <!--<el-option-->
                  <!--v-for="item in setNames"-->
                  <!--:key="item.groupId"-->
                  <!--:label="item.groupName"-->
                  <!--:value="item">-->
          <!--</el-option>-->
        </el-select>
        <div style="margin-left: 28px" v-show="!isToUseCar">
          <el-button class="copy" round @click="copyLines">复制已有的线路信息</el-button>
        </div>
      </div>
      <div class="to-storehouse">
        <span ><span class="required">*</span>集合编号：</span>
        <el-input
                class="setNumber"
                placeholder="集合编号"
                v-model="setNumber"
                :disabled="true">
        </el-input>
        <!--<span style="margin-left:28px"><span class="required">*</span>配送地址：</span>
        <div class="shippingAddress">
          <el-input
            placeholder="请填写配送地址"
            v-model="shippingAddress"
            clearable>
          </el-input>
        </div>-->
      </div>
      <div class="to-storehouse">
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
        <el-button style="margin-left:15px" @click="mapCalculat" type="primary" v-if="mapCalculatShow">计算线路里程</el-button>
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
        <span class="unit">m³</span>
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
      <div class="to-storehouse" >
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
        <!-- <span :class="driverReview?'total-left':''"><span class="required">*</span>司机价格：</span>
         <div class="total">
           <div class="el-input">
             <input type="text" v-model="price" @keydown="checkKeydown(price)" @input="checkPrice(price)" placeholder="请输入价格" class="el-input__inner">
           </div>
         </div>
         <span style="margin-left:8px;">元</span>
         <span class="total-left">合同价格：</span>
         <div class="total">
           <div class="el-input">
             <input type="text" v-model="contactPrice" @keydown="checkKeydown1(contactPrice)" @input="checkPrice1(contactPrice)" placeholder="请输入价格" class="el-input__inner">
           </div>
         </div>
         <span style="margin-left:8px;">元</span>-->
      </div>
      <div style="line-height: 40px">
        <el-checkbox label="批量发送" name="type" v-model="batch"></el-checkbox>
        <span style="position:relative;" v-show="batch" >
          <span class="required">*</span>
          <el-input v-model="conts" placeholder="输不超过30单" style="width:10%;border-radius:10%; "></el-input>
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
      <el-button class="release" round @click="send">发布用车</el-button>
      <div class="copy-list" v-show="copyListShow">
        <div class="order-list" v-for="(copyList,index) in copyLists" >
          <p><span>{{copyList.traceName}}</span></p>
          <p><i class="iconfont icon-kuaidiyunshu"></i><span>{{copyList.vehicleTypeReq.name}}{{copyList.vehicleTypeReq.length}}</span></p>
          <p><i class="iconfont icon-fangzi"></i><span>{{copyList.depotName}}</span></p>
          <p>发布于<span>{{copyList.createTime}}</span></p>
          <el-button class="copy" round @click="copyLine(index)">复制线路</el-button>
        </div>
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
      <el-dialog
              class="dig"
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
      <!--<el-dialog
        class="cars"
        title="车辆选择"
        :visible.sync="showCarType"
        width="80%"
        center>
        <el-radio-group v-model="carRadio">
          <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelCarType">取 消</el-button>
          <el-button type="primary" @click="confirmCarType">确 定</el-button>
        </span>
      </el-dialog>-->
      <select-cars-type @getCarType="getCarTypes" :isShowCarType="showCarType" @isShowCar="showCar"
                        :orderTotalNum="orderTotalNum" :ticketNumber="ticketsNums" :kilsNum="kilometre"
                        :deliveryPoints="deliveryPoints" :orderTotalVolume="orderTotalVolume"
                        :orderTotalWeight="orderTotalWeight"></select-cars-type>
    </div>
  </div>
</template>

<script>
    let map;
    let truckDriving;
    import {
        provinceAndCityData,
        regionData,
        provinceAndCityDataPlus,
        regionDataPlus,
        CodeToText,
        TextToCode
    } from 'element-china-area-data';
    import {
        regCarTime,
        regLineName,
        goodsNames,
        contactsNames,
        regPhones,
        consigneePhone,
        consigneeName,
        regAddress,
        regGoodType,
        regReason,
        regInts,
        regIntt,
        checkContactsName,
        checkcontactsPhone
    }
        from "../../../../js/newWarehouse.js";
    import priceTable from './priceTable.vue';
    import selectCarsType from './selectCarsType.vue';

    const cityOptions = ['需要车辆拆后座','需要司机搬运', '需要司机自带小工', '需要自带小推车', '需要有人帮忙装货','需要有人帮忙卸货'];
    const week = ['星期一', '星期二', '星期三', '星期四','星期五','星期六','星期天'];
    const goodsTypeArr = ['食材','水果','方便食品','团餐外卖','酒水饮料','建材','汽配','家电','日化','家具','鲜花蛋糕','3C数码','洗涤','印刷品','服饰鞋帽','医药保健','包装','母婴','五金','自行车','大包裹/仪器'];
    let transportCopys;
    export default {
        inject:['reload'],
        name: "ordinaryUser",
        data() {
            return {
                selectContact:'0',
                contactPrice:'',
                lineNameRemarks:'',
                isShowTable: false,
                consigneeArrs: [],
                orderTotalWeight: '',
                orderTotalNum: '',
                orderTotalVolume: '',
                postWeight: '',
                postTotalNum: '',
                postTotalVolume: '',
                china: [],
                sendAreaData: '',
                areaOptions: regionData,
                kilometre: '',
                isLookLine: false,
                loading:false,
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
                // selectCar:[],
                receipt:'',
                lineName:'',
                // shippingAddress:'',
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
                returnToWarehouse:0,
                text:'',
                // price:'',
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
                selectDriver:'1',
                isDisabled:false,
                dialogVisible: false,
                distributionExperience:'',
                index:-1,
                otherTypes:'',
                isChecked:false,
                depotId:'',
                users:{},
                successCarTime:false,
                // successLineName:false,
                successGoodsNames:false,
                // successContactsNames:false,
                // successContactsPhone:false,
                // successConsigneeName:false,
                // successConsigneePhone:false,
                showCarType:false,
                // carRadio:0,
                // cars:[],
                carsType: [],
                // contactPrice:'',
                isArriveDate:true,
                isCheckAll:true,
                driverReview:true,
                serviceAgreement:false,
                // consignorSendArr:[],
                insurances:[],
                checkedInsurances:[],
                isInsurances:false,
                insurancesAll:false,
                isArr:[true,true,true,true,true,true,true],
                arr:[],
                dis: false,
                isToUseCar: false,
                valuationMethod: 'BK',
                ticketsNums: '',
                deliveryPoints: '',
                mapCalculatShow:true,
                batch:false,
                conts:''
            };
        },
        methods: {
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
            handleChange1(value) {
                this.china=[TextToCode[value[0]].code,TextToCode[value[0]][value[1]].code,TextToCode[value[0]][value[1]][value[2]].code];
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
            clearARR() {
                this.carsType = [];
            },
            init() {
                map = new AMap.Map('container', {
                    zoom: 11,
                    scrollWheel: true,
                })
            },
            regInt(val) {
                if (val === 'volume') {
                    if (!regInts(this, this.orderTotalVolume)) {
                        this.$message({
                            message: '请您输入数字...',
                            type: 'warning'
                        });
                        this.orderTotalVolume = this.postTotalVolume;
                        return;
                    }
                }
                if (val === 'weight') {
                    if (!regInts(this, this.orderTotalWeight)) {
                        this.$message({
                            message: '请您输入数字...',
                            type: 'warning'
                        });
                        this.orderTotalWeight = this.postWeight;
                    }
                }
                if (val === 'num') {
                    if (!regIntt(this, this.orderTotalNum)) {
                        this.$message({
                            message: '请您输入整数...',
                            type: 'warning'
                        });
                        this.orderTotalNum = this.postTotalNum;
                    }
                }
            },
            mapCalculat() {
                console.log(this.consigneeArrs);
                console.log("======================================");
                let _this = this;
                if (this.warehouseName === "") {
                    this.$message.warning('请选择仓库起点...');
                    return;
                }
                if (!this.warehouseNames.length) {
                    this.$message.warning('请等待，暂无仓库数据...');
                    return;
                }
                if (this.setName === "") {
                    this.$message.warning('请选择集合名称...');
                    return;
                }
                this.isLookLine = true;
                AMap.plugin('AMap.TruckDriving',()=> {
                    //过滤线路规划数据
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
                    for (let i = 0; i < this.consigneeArrs.length; i++) {
                        path.push({lnglat: [this.consigneeArrs[i].longitude, this.consigneeArrs[i].latitude]});//起点  吉祥村
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
                            console.log('获取货车规划数据成功');
                        } else {
                            console.log('获取货车规划数据失败：' + result)
                        }
                    })
                })

                //console.log(this.consigneeArrs);
            },
            getArea() {
                let datas = JSON.stringify({
                    token: this.token,
                    customerId:Number(sessionStorage.getItem('webCustomerId'))
                });
                console.log(datas);
                this.$http.post(this.global.lightningUrl +'/cmsv1/customerManage/getallarea', datas, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.errcode === 0) {
                        this.areaArr = res.data.result;
                        this.valuationMethod = res.data.result[0].billWay;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            isDisabledFun() {
                if (!this.areaArr.length) {
                    return;
                }
                if (this.areaArr[0].area === null) {
                    return;
                }
                if (!this.areaArr[0].province.length) {
                    return;
                }
                for (let i = 0; i < this.areaOptions.length; i++) {//本地区域数据数组

                    for (let z = 0; z < this.areaArr[0].province.length; z++) {
                        if (this.areaOptions[i].label === this.areaArr[0].province[z]) {

                            this.areaOptions[i].disabled = false;
                            for (let j = 0; j < this.areaOptions[i].children.length; j++) {
                                if (this.areaOptions[i].children[j].label === "市辖区") {
                                    this.areaOptions[i].children[j].label = this.areaOptions[i].label;
                                }

                                for (let k = 0; k < this.areaArr[0].city.length; k++) {
                                    if (this.areaOptions[i].children[j].label !== this.areaArr[0].city[k]) {

                                        if (this.areaOptions[i].children[j].disabled === undefined) {
                                            this.areaOptions[i].children[j].disabled = true;
                                        }
                                    } else {
                                        this.areaOptions[i].children[j].disabled = false;
                                        for (let l = 0; l < this.areaOptions[i].children[j].children.length; l++) {
                                            for (let m = 0; m < this.areaArr[0].region.length; m++) {
                                                if (this.areaOptions[i].children[j].children[l].label !== this.areaArr[0].region[m]) {
                                                    if (this.areaOptions[i].children[j].children[l].disabled === undefined) {
                                                        this.areaOptions[i].children[j].children[l].disabled = true;
                                                    }
                                                } else {
                                                    this.areaOptions[i].children[j].children[l].disabled = false;
                                                }
                                            }
                                        }
                                        //二次过滤区
                                        if (this.areaOptions[i].children[j].children !== undefined) {
                                            if (test(this.areaOptions[i].children[j].children)) {
                                                for (let l = 0; l < this.areaOptions[i].children[j].children.length; l++) {
                                                    this.areaOptions[i].children[j].children[l].disabled = false;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        } else if (this.areaOptions[i].disabled === undefined) {
                            this.areaOptions[i].disabled = true;
                        }
                    }
                    //二次过滤市
                    if (this.areaOptions[i].children !== undefined) {
                        if (test(this.areaOptions[i].children)) {
                            for (let a = 0; a < this.areaOptions[i].children.length; a++) {
                                this.areaOptions[i].children[a].disabled = false;
                            }
                        }
                    }
                    //console.log(this.areaOptions[i]);
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
                    return
                }
                if (CodeToText[value[1]] === "市辖区") {
                    CodeToText[value[1]] = CodeToText[value[0]]
                }
                //方式一
                if (CodeToText[value[1]] === CodeToText[value[0]]) {
                    // this.lineName = this.areaArr[0].customerName + CodeToText[value[0]] + CodeToText[value[2]] + this.areaArr[0].serialNumber;
                    // this.lineName = CodeToText[value[0]] + CodeToText[value[2]] + this.areaArr[0].serialNumber;
                    this.lineName = CodeToText[value[0]] + CodeToText[value[2]];
                } else {
                    // this.lineName = this.areaArr[0].customerName + CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]] + this.areaArr[0].serialNumber;
                    // this.lineName = CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]] + this.areaArr[0].serialNumber;
                    this.lineName = CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
                }
                this.sendAreaData = CodeToText[value[0]] + ',' + CodeToText[value[1]] + ',' + CodeToText[value[2]]
            },
            getCarTypes(arr) {
                this.showCarType = arr[0];
            },
            showCar(arr) {
                console.log(arr)
                this.showCarType = arr[0];
            },
            /*insurancesAllChange(val) {
                this.checkedInsurances = val ? this.insurances : [];
                this.isInsurances = false;
            },
            handleCheckedInsurancesChange(value) {
                let checkedCount = value.length;
                this.insurancesAll = checkedCount === this.insurances.length;
                this.isInsurances = checkedCount > 0 && checkedCount < this.insurances.length;
            },*/
            // 是否购买保险
            /*isBuyInsurance(){
                let token = JSON.stringify({
                    token: this.token,
                    customerId:Number(sessionStorage.getItem('webCustomerId'))
                })
                this.$http.post(this.global.lightningUrl + '/company/insurance/insuranceList',token,{
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
                        if(this.checkedInsurances[i] === '畅心保高价值货物险'){
                            this.arr[0] = true;
                            this.dis = true;
                        }
                    }
                    console.log(this.arr)

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
            // 司机价格校验
            /*checkPrice(price){
              this.price = /^\d+\.?\d{0,2}$/.test(price)||price == '' ? price : price=this.checkValue;
              this.contactPrice = this.price;
            },*/
            // 司机价格校验
            /* checkKeydown(value){
               this.checkValue = value;
             },*/
            // 合同价格校验
            /* checkPrice1(price){
               this.contactPrice = /^\d+\.?\d{0,2}$/.test(price)||price == '' ? price : price=this.checkValue1;
             },*/
            // 合同价格校验
            /* checkKeydown1(value){
               this.checkValue1 = value;
             },*/
            // 计算星期
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
            // 计算星期
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
            // 配送日期
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
                        for(let i=0;i<this.checkedWeeks.length;i++){
                            this.isArr[i] = false;
                        }
                        console.log(this.isArr)
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
                        console.log(this.isArr)
                    }
                }
                // console.log(this.arriveDate)

            },
            // 运输单复制
            transportCopy(val){
                console.log(val);
                // this.lastTime = val.lastTime;
                // this.checkedWeeks = JSON.parse(val.checkedWeeks);
                // this.warehouseName = val.warehouseName;
                // this.depotName = val.depotName;

                this.warehouseName = val.depotName;
                this.depotId = val.warehouseName;

                this.lineName = val.lineName;
                this.setNumber = val.setNumber;
                this.setName = val.setName;
                this.groupName = val.setName;
                this.handleChange1(val.deliveryArea.split(','));
                this.kilometre = val.kilometers;
                this.mapCalculatShow = false;
                // this.shippingAddress = val.shippingAddress;
                this.goodsName = val.goodsName;
                this.returnToWarehouse = val.returnToWarehouse;
                this.distributionExperience = val.distributionExperience;
                // this.price = val.price;
                this.text = val.text;
                this.selectDriver = val.selectDriver;
                // this.contactPrice = val.contactPrice;
            },
            // 取消车辆选择
            // cancelCarType(){
            //   this.showCarType = false;
            // },
            // 确定车辆选择
            /* confirmCarType(){
               this.selectCar = '';
               this.carsType = {};
               this.showCarType = false;
               let str = '';
               for(let i=0;i < this.cars.length;i++){
                 this.carsType = this.cars[this.carRadio];
                 str = this.cars[this.carRadio].name +' '+ this.cars[this.carRadio].isElectric +' '+ this.cars[this.carRadio].length +' '+ this.cars[this.carRadio].isCertificate +' '+ this.cars[this.carRadio].isTailBoard +' '+ this.cars[this.carRadio].isCold;
               }
               this.selectCar = str;
               console.log(this.carsType);
             },*/
            // 请求车型
            /* requestCarType(){
               let car = {
                  type : ''
               }
               console.log(car)
               // 'https://'+process.env.API_HOST+'/cms/drivermanage/vehicle_type/list'
               this.$http.post('https://'+process.env.API_HOST+'/cms/drivermanage/vehicle_type/list',car,{
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
                 }
               }).then((res) => {
                 console.log(res.data);
                 this.cars = res.data.result;

               })
                 .catch( (error) => {
                   console.log(error);
                 });
             },*/
            // 检测时间
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
            // 时间戳转换小时
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
            // 选择仓库名,请求集合名称
            // changeWarehouseName(){
            //     console.log(this.warehouseName);
            //     this.setName = '';
            //     this.setNumber = '';
            //     for(let i=0;i<this.warehouseNames.length;i++){
            //         if(this.warehouseNames[i].id === this.warehouseName){
            //             this.depotName = this.warehouseNames[i].depotName;
            //         }
            //     };
            //     let _this = this;
            //     let warehouseinfos = JSON.stringify({
            //         token: this.token,
            //         depotId:this.warehouseName
            //     });
            //     this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/groupOrder/get',warehouseinfos,{
            //         headers: {
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         }
            //     }).then(function (res) {
            //         console.log(res)
            //         _this.setNames = res.data.result;
            //     })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            //     this.kilometre = '';
            //     this.isLookLine = false;
            // },
            // 选择集合名称,获取仓库表编号
            selectSetName(){
                this.consigneeArrs = [];
                console.log(this.setName);
                this.groupName = this.setName.groupName;
                this.setNumber = this.setName.groupId;
                this.deliveryPoints = this.orderIds.length;
                //请求赋值
                this.orderTotalWeight = this.setName.totalWeight;
                this.orderTotalNum = this.setName.goodsNum;
                this.orderTotalVolume = this.setName.totalVolume;

                //存储老值
                this.postWeight = this.setName.totalWeight;
                this.postTotalNum = this.setName.goodsNum;
                this.postTotalVolume = this.setName.totalVolume;
                //零转空
                this.postTotalNum = this.orderTotalNum = this.orderTotalNum === 0 ? '' : this.orderTotalNum;
                this.postWeight = this.orderTotalWeight = this.orderTotalWeight === 0 ? '' : this.orderTotalWeight;
                this.postTotalVolume = this.orderTotalVolume = this.orderTotalVolume === 0 ? '' : this.orderTotalVolume;

                this.consigneeArrs = this.setName.orderLocations;
                //过滤线路规划数据
                for (let i = 0; i < this.warehouseNames.length; i++) {
                    if (this.warehouseNames[i].id === this.depotId) {
                        this.consigneeArrs.unshift({
                            longitude: this.warehouseNames[i].longitude,
                            latitude: this.warehouseNames[i].latitude
                        });
                        break;
                    }
                }
                this.kilometre = '';
                this.isLookLine = false;
            },
            // 货物类型选其他
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
            // 取消货物类型
            cancel(){
                this.dialogVisible = false;
                this.isChecked =false;
            },
            // 确定货物类型选其他
            confirm(){
                console.log(this.otherTypes)
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
            // 选择回单方式
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
            // 清除车辆类型
            /* clearCarsTypes(){
               // this.selectCar = '';
             },*/
            // 货物类型获得焦点
            goodsTypesFocus(){
                this.goodsTypeShow = true;
                this.isDisabled = true;
                // this.goodsTypes = this.goodsType[0];
            },
            // 车辆类型获得焦点
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

                this.showCarType = true;
                console.log(this.showCarType);
                this.deliveryPoints = this.consigneeArrs.length;
                this.$store.commit('selectValuationMethod', this.valuationMethod)
            },
            // 其他货物类型展示
            goodsTypeChange(){
                this.goodsTypes = '';
                for(let i=0;i<this.goodsType.length;i++){
                    this.goodsTypes = this.goodsTypes + this.goodsType[i] + ',';
                }
                this.goodsTypes = this.goodsTypes.substring(0,this.goodsTypes.length-1);
            },
            // 发送数据
            send(){
                console.log(this.$store.state.arr);
                console.log(this.$store.state.arr1);
                console.log(this.$store.state.arr2);
                console.log(this.$store.state.arr3);
                console.log(this.$store.state.arr4);
                if (!this.china.length || this.orderTotalWeight === "" || this.orderTotalVolume === "" || this.kilometre === "" || this.arriveTime === "" || this.arriveTime === null || this.arriveDate === "" || this.arriveDate === null || this.depotId === "" || this.checkedWeeks.length == 0 || this.lineName === "" || this.lineName === null || this.setNumber === "" || this.setName.groupName === "" ||  this.goodsTypes === "" || this.distributionExperience === '' || this.distributionExperience === null) {
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

                if (this.batch == true && this.conts == '') {
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
                    } else {
                        if (!(/^\d+$/g.test(this.ticketsNums))) {
                            this.$message({
                                message: '配送票数只能填整数',
                                type: 'warning'
                            });
                            return;
                        }
                    }
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

                //配送地址
                // if(!regAddress(this,this.shippingAddress)){
                //   this.$message({
                //     message: '配送地址要求长度2-50位,或不能包含特殊字符!',
                //     type: 'warning'
                //   });
                //   return;
                // }
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
                /*if(this.price <= 0 || this.contactPrice <= 0){
                  this.$message.error('价格不能小于等于零');
                  return;
                }*/
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
                        this.loading = true;
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
                        this.loading = true;
                        this.creatUseCar();
                    }
                }else {
                    this.loading = true;
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

                //合同区域数据过滤
                let useCarInfos = {
                    "token":this.token,
                    "customerId":Number(sessionStorage.getItem('webCustomerId')),
                    "arrDepotTime":this.arriveTime,
                    // "totalTime":this.lastTime != ''?this.lastTime:0,
                    "requestType":"1",
                    "deliveryStartTime": this.arriveDate[0],
                    "deliveryEndTime": this.arriveDate[1],
                    "deliveryCycle": this.checkedWeeks,
                    "depotName": this.warehouseName,
                    "depotId":this.depotId,
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
                    // "transportPrice": this.price,
                    "addRunNo":"",
                    "addRunReason":"",
                    "cancelReason":"",
                    "location":null,
                    "isBackDepot":this.returnToWarehouse,
                    "oldScheduleId":"",
                    "deliveryExperience":this.distributionExperience,
                    // "contactPrice":this.contactPrice,
                    "receipt":{
                        "receiptWay":this.receipt,
                        "receiptContact":this.contacts,
                        "receiptNum":this.contactsPhone,
                        "address":this.receivingAddress,
                        "express":this.radio
                    },
                    // "isInsurance": this.checkedInsurances.length > 0 ? this.checkedInsurances : null,
                    "valuationType": this.valuationMethod, // 计价方式
                    "valuationParam": null,//计价模板
                    "contractId": this.areaArr[0].contractorId, //合同编号
                    // "contractVehicle": [], //  合同车型
                    "contractArea": CodeToText[this.china[0]] + ',' + CodeToText[this.china[1]] + ',' + CodeToText[this.china[2]],//合同区域
                    "kilometers": this.kilometre,//公里数(保留两位小数)
                    "votes": this.ticketsNums,// 票数
                    "points": this.deliveryPoints, //配送点数
                    "totalVolume": parseFloat(this.orderTotalVolume).toFixed(2),//体积
                    "totalWeight": parseFloat(this.orderTotalWeight).toFixed(2),//重量
                    "goodsNum": Math.round(this.orderTotalNum),//件数
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
                console.log(JSON.stringify(useCarInfos));
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/schedule/create', JSON.stringify(useCarInfos), {
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
                    if(sessionStorage.getItem('collection') != null){
                      sessionStorage.removeItem('collection');
                    }
                    this.$store.state.arr = [];
                    this.$store.state.arr1 = [];
                    this.$store.state.arr2 = [];
                    this.$store.state.arr3 = [];
                    this.$store.state.arr4 = [];
                    if(typeof(transportCopys) !== 'undefined'){
                      this.loading = true;
                      setTimeout(()=>{
                        this.$router.push('/shippingDocument');
                        this.loading = false;
                      },2000)
                    }else{
                      this.reload();
                    }
                  }else{
                    this.$message.error(
                      res.data.message
                    );
                  }
                }).catch((error) => {
                  console.log(error);
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
            //  转换时间戳
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
            //  请求复制线路信息
            copyLines(){
                console.log(this.warehouseName)
                if(this.warehouseName === null || this.warehouseName === ''){
                    this.$message({
                        message: '请先选择仓库',
                        type: 'warning'
                    });
                }else{
                    this.copyListShow = true;
                    let _this = this;
                    let lineNameinfos = JSON.stringify({
                        token: this.token,
                        depotId:this.depotId
                    });
                    this.$http.post('https://'+process.env.API_HOST+'/companyv1/trunkCenter/schedule/get',lineNameinfos,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(function (res) {
                        console.log(res);
                        if(res.data.message === "暂无符合条件的数据"){
                            _this.$message({
                                message: '该仓库没有发布过运输单,请先创建运输单',
                                type: 'warning'
                            });
                        }else{
                            for(let i=0;i<res.data.result.length;i++){
                                res.data.result[i].createTime = _this.formatDateTime(res.data.result[i].createTime);
                                // res.data.result[i].express = JSON.parse(res.data.result[i].express);
                                res.data.result[i].deliveryCycle = JSON.parse(res.data.result[i].deliveryCycle);
                                res.data.result[i].goodsType = JSON.parse(res.data.result[i].goodsType);
                                res.data.result[i].handlingReq = JSON.parse(res.data.result[i].handlingReq);
                                res.data.result[i].vehicleAddiReq = JSON.parse(res.data.result[i].vehicleAddiReq);
                                res.data.result[i].vehicleTypeReq = JSON.parse(res.data.result[i].vehicleTypeReq);
                            }
                            _this.copyLists = JSON.parse(JSON.stringify(res.data.result));
                            console.log(_this.copyLists)
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            //  复制线路到页面
            copyLine(index){
                // console.log(index);
                // console.log(this.copyLists[index]);

                // this.lastTime = this.copyLists[index].totalTime;
                // this.arriveTime = this.copyLists[index].arrDepotTime;
                // this.arriveDate = [this.copyLists[index].deliveryStartTime,this.copyLists[index].deliveryEndTime];
                // this.checkedWeeks = this.copyLists[index].deliveryCycle;
                // this.warehouseName = this.copyLists[index].depotId;

                // this.lineName = this.copyLists[index].traceName;
                this.setNumber = this.copyLists[index].groupId;
                this.setName = this.copyLists[index].groupName;
                this.groupName = this.copyLists[index].groupName;
                // this.setName.groupName = this.setName;
                // this.shippingAddress = this.copyLists[index].deliveryArea;
                this.goodsName = this.copyLists[index].goodsName;
                // this.goodsType = this.copyLists[index].goodsType;
                this.returnToWarehouse = this.copyLists[index].isBackDepot;
                // this.checked = this.copyLists[index].isReceipt;
                this.distributionExperience = this.copyLists[index].deliveryExperience;
                // this.selectCar = this.copyLists[index].vehicleTypeReq;
                // this.price = this.copyLists[index].transportPrice;
                this.text = this.copyLists[index].handlingReq.remark;
                this.selectDriver = this.copyLists[index].isAssign;
                this.copyListShow = false;
            }
        },
        //页面初始化请求仓库名称
        mounted(){
            let _this = this;
            //是否选司机权限获取
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            console.log(this.users);
            //地图初始化
            this.init();
            //获取区域
            this.getArea();
            //选司机权限
            // this.driverReview=this.users.currentUser.permission===undefined?true:JSON.parse(this.users.currentUser.permission).chooseDriver;
            function getDepot() {
                //过滤线路规划数据
                for (let i = 0; i <_this.warehouseNames.length; i++) {
                    if (_this.warehouseNames[i].id === _this.depotId) {
                        _this.consigneeArrs.unshift({
                            longitude: _this.warehouseNames[i].longitude,
                            latitude: _this.warehouseNames[i].latitude
                        });
                        break;
                    }
                }
            }
            let userinfos = {
                token: this.token,
                userId:Number(sessionStorage.getItem('webCustomerId'))
            };
            // console.log(userinfos)
            this.$http.post(this.global.lightningUrl + '/cmsv1/depotManage/depot/all_depot_name', userinfos, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(function (res) {
                console.log(res);
                _this.warehouseNames = res.data.result;
                getDepot();
                console.log(_this.warehouseNames)
            }).catch(function (error) {
                console.log(error);
            });

            // this.isBuyInsurance();

            // this.requestCarType();
            transportCopys = this.$route.params.transportCopy;
            if(typeof(transportCopys) !== 'undefined'){
                console.log(JSON.parse(Base64.decode(transportCopys)))
                this.transportCopy(JSON.parse(Base64.decode(transportCopys)));
                this.isToUseCar = true;
            }
            console.log(sessionStorage.getItem('collection'));
            if(sessionStorage.getItem('collection') != null){
                let obj = JSON.parse(Base64.decode(sessionStorage.getItem('collection')));
                console.log(obj);
                console.log("-------------------------------------------");
                this.warehouseName = obj.depotName;
                this.depotId = obj.depotId;

                this.setNumber = obj.groupId;
                this.setName = obj.groupName;
                this.groupName = obj.groupName;
                this.isToUseCar = true;
                this.consigneeArrs = obj.orderLocations;
                this.deliveryPoints = obj.orderIds.length;
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
