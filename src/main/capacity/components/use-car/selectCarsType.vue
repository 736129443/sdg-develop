<template>
  <div class="seleceCarTypes">
    <el-dialog
            class="cars"
            title="车辆选择"
            :visible.sync="showCarType"
            width="80%"
            :close-on-press-escape="false"
            :close-on-click-modal="clickModal"
            :show-close="showClose"
            center>
      <div class="carsTypeBox">
        <span class="c-span c-align">车型</span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="常用车型" name="usual">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="厢式货车" name="厢式货车">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="冷藏" name="冷藏">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="高栏" name="高栏">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="平板" name="平板">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="栏板" name="栏板">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="金杯" name="金杯">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="敞车" name="敞车">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="全顺" name="全顺">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="电动" name="电动">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="其他" name="other">
            <el-radio-group v-model="carRadio">
              <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
            </el-radio-group>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BK'">
        <span class="c-span">起步价格</span>
        <div class="startPrice">
          <el-input
                  placeholder="请输入起步价格"
                  v-model="startPrice"
                  clearable>
          </el-input>
          <b class="units">元</b>
        </div>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BK'">
        <span class="c-span c-align">超出部分</span>
        <div class="c-flex">
          <div class="carsTypeBox carsTypeBox-height">
            <el-checkbox v-model="kilometres" @change="kReadonly(kilometres)" true-label="1" false-label="0">公里</el-checkbox>
            <div class="c-div" v-if="kilometresReadonly">
              <label>起步价内公里数：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入公里数"
                        v-model="kilometresNum"
                        clearable>
                </el-input>
                <span class="units">公里</span>
              </div>
            </div>
            <div class="c-div" v-if="kilometresReadonly">
              <label>超里程数单价：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入超公里数单价"
                        v-model="exceedKilometresPrice"
                        clearable>
                </el-input>
                <span class="units">元/公里</span>
              </div>
            </div>
          </div>
          <div class="carsTypeBox carsTypeBox-height">
            <el-checkbox v-model="points" @change="pReadonly(points)" true-label="1" false-label="0">点位</el-checkbox>
            <div class="c-div" v-if="pointsReadonly">
              <label>起步价内点位数：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入点位数"
                        v-model="pointsNum"
                        clearable>
                </el-input>
                <span class="units">个</span>
              </div>
            </div>
            <div class="c-div" v-if="pointsReadonly">
              <label>超点位单价：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入超点位单价"
                        v-model="exceedPointsPrice"
                        clearable>
                </el-input>
                <span class="units">元/点位</span>
              </div>
            </div>
          </div>
          <div class="carsTypeBox carsTypeBox-height">
            <el-checkbox v-model="weights" @change="wReadonly(weights)" true-label="1" false-label="0">重量</el-checkbox>
            <div class="c-div" v-if="weightsReadonly">
              <label>起步价内重量：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入重量"
                        v-model="weightsNum"
                        clearable>
                </el-input>
                <span class="units">千克</span>
              </div>
            </div>
            <div class="c-div" v-if="weightsReadonly">
              <label>超重量单价：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入超重量单价"
                        v-model="exceedWeightsPrice"
                        clearable>
                </el-input>
                <span class="units">元/千克</span>
              </div>
            </div>
          </div>
          <div class="carsTypeBox carsTypeBox-height">
            <el-checkbox v-model="volumes" @change="vReadonly(volumes)" true-label="1" false-label="0">体积</el-checkbox>
            <div class="c-div" v-if="volumesReadonly">
              <label>起步价内体积：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入体积"
                        v-model="volumesNum"
                        clearable>
                </el-input>
                <span class="units">m³</span>
              </div>
            </div>
            <div class="c-div" v-if="volumesReadonly">
              <label>超体积单价：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入超体积单价"
                        v-model="exceedVolumesPrice"
                        clearable>
                </el-input>
                <span class="units">元/m³</span>
              </div>
            </div>
          </div>
          <div class="carsTypeBox carsTypeBox-height">
            <el-checkbox v-model="tickets" @change="vtickets(tickets)" true-label="1" false-label="0" >票</el-checkbox>
            <div class="c-div" v-if="ticketsReadonly">
              <label>起步价内票数：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入票数"
                        v-model="ticketsNum"
                        clearable>
                </el-input>
                <span class="units">票</span>
              </div>
            </div>
            <div class="c-div" v-if="ticketsReadonly">
              <label>超票单价：</label>
              <div class="c-input">
                <el-input
                        placeholder="请输入超票单价"
                        v-model="exceedTicketsPrice"
                        clearable>
                </el-input>
                <span class="units">元/票</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BV'">
        <span class="c-span">整车价格</span>
        <div class="startPrice">
          <el-input
                  placeholder="请输入整车价格"
                  v-model="wholeVehicle"
                  clearable>
          </el-input>
          <b class="units">元</b>
        </div>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BP'">
        <span class="c-span">配送件数</span>
        <div class="startPrice">
          <el-input
                  disabled
                  v-model="orderTotalNum"
                  clearable>
          </el-input>
          <b class="units">件</b>
        </div>
        <span class="c-span">计件单价</span>
        <div class="startPrice">
          <el-input
                  placeholder="请输入计件价格"
                  v-model="packagesPrice"
                  clearable>
          </el-input>
          <b class="units">元</b>
        </div>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BT'">
        <span class="c-span">配送票数</span>
        <div class="startPrice">
          <el-input
                  v-model="ticketNumber"
                  disabled
                  clearable>
          </el-input>
          <b class="units">票</b>
        </div>
        <span class="c-span">单票价格</span>
        <div class="startPrice">
          <el-input
                  placeholder="请输入单票价格"
                  v-model="ticketsPrice"
                  clearable>
          </el-input>
          <b class="units">元</b>
        </div>
      </div>
      <div class="carsTypeBox" v-if="this.$store.state.index == 'BH'">
        <span class="c-span c-align">小时计费</span>
        <div class="c-flex">
          <el-radio-group v-model="radio" @change="hoursReadonly(radio)">
            <el-radio label="HRF">
              <span>4小时</span>
              <el-input
                      placeholder="请输入4小时价格"
                      v-model="fourHours"
                      :readonly="fourReadonly"
              >
              </el-input>
            </el-radio>
            <el-radio label="HRN">
              <span>9小时</span>
              <el-input
                      placeholder="请输入9小时价格"
                      v-model="nineHours"
                      :readonly="nineReadonly"
              >
              </el-input>
            </el-radio>
            <el-radio label="HRT">
              <span>13小时</span>
              <el-input
                      placeholder="请输入13小时价格"
                      v-model="thirteenHours"
                      :readonly="thirteenReadonly"
              >
              </el-input>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <price-table :isShows="isShowTable"></price-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelCarType">取 消</el-button>
        <el-button type="primary" @click="addCarType(false)">保存并添加下个车型</el-button>
        <el-button type="primary" @click="confirmCarType">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
    import priceTable from './priceTable.vue';

    let carType;
    export default {
        name: "seleceCarTypes",
        props: ['isShowCarType', 'orderTotalNum', 'ticketNumber', 'kilsNum', 'deliveryPoints', 'orderTotalVolume', 'orderTotalWeight'],
        data() {
            return {
                isShowTable: true,
                clickModal: false,
                showClose: false,
                cars: [],
                showCarType: this.isShowCarType,
                carRadio: 0,
                activeName: 'usual',
                startPrice: '',
                startPrice1: '',
                kilometres: '0',
                kilometresNum: '',
                exceedKilometresPrice: '',
                points: '0',
                pointsNum: '',
                exceedPointsPrice: '',
                weights: '0',
                weightsNum: '',
                exceedWeightsPrice: '',
                volumes: '0',
                volumesNum: '',
                exceedVolumesPrice: '',
                tickets: '0',
                ticketsNum: '',
                exceedTicketsPrice: '',
                wholeVehicle: '',
                // packagesNum:'',
                packagesPrice: '',
                // ticketsNums:'',
                ticketsPrice: '',
                radio: 'HRF',
                fourHours: '',
                nineHours: '',
                thirteenHours: '',
                kilometresReadonly:false,
                pointsReadonly:false,
                weightsReadonly:false,
                volumesReadonly:false,
                ticketsReadonly:false,
                fourReadonly:false,
                nineReadonly:true,
                thirteenReadonly:true
            }
        },
        watch: {
            isShowCarType() {
                this.showCarType = this.isShowCarType;
            }
        },
        methods: {
            hoursReadonly(val){
                console.log(val)
                if(val == 'HRF'){
                    this.fourReadonly = false;
                    this.nineReadonly = true;
                    this.nineHours = '';
                    this.thirteenReadonly = true;
                    this.thirteenHours = '';
                }else if(val == 'HRN'){
                    this.fourReadonly = true;
                    this.fourHours = '';
                    this.nineReadonly = false;
                    this.thirteenReadonly = true;
                    this.thirteenHours = '';
                }else{
                    this.fourReadonly = true;
                    this.fourHours = '';
                    this.nineReadonly = true;
                    this.nineHours = '';
                    this.thirteenReadonly = false;
                }
            },
            kReadonly(val){
                console.log(val)
                if(val === '1'){
                    this.kilometresReadonly = true;
                }else{
                    this.kilometresReadonly = false;
                    this.kilometresNum= '';
                    this.exceedKilometresPrice = '';
                }
            },
            pReadonly(val){
                console.log(val)
                if(val === '1'){
                    this.pointsReadonly = true;
                }else{
                    this.pointsReadonly = false;
                    this.pointsNum = '';
                    this.exceedPointsPrice = '';
                }
            },
            wReadonly(val){
                console.log(val)
                if(val === '1'){
                    this.weightsReadonly = true;
                }else{
                    this.weightsReadonly = false;
                    this.weightsNum = '';
                    this.exceedWeightsPrice = '';
                }
            },
            vReadonly(val){
                console.log(val)
                if(val === '1'){
                    this.volumesReadonly = true;
                }else{
                    this.volumesReadonly = false;
                    this.volumesNum = '';
                    this.exceedVolumesPrice = '';
                }
            },
            vtickets(val){
                console.log(val)
                if(val === '1'){
                    this.ticketsReadonly = true;
                    if (this.ticketNumber == '') {
                        this.$message({
                            message: '请先在发布用车页面选择配送票数',
                            type: 'warning'
                        });
                        this.tickets = '0'
                    }
                }else{
                    this.ticketsReadonly = false;
                    this.ticketsNum = '';
                    this.exceedTicketsPrice = '';
                }
            },
            addCarType(sure) {

                if (this.$store.state.index == 'BK') {
                    if (sure) {
                        if (this.$store.state.arr.length === 0) {
                            this.addData();
                        }
                    } else {
                        if (this.$store.state.arr.length > 4) {
                            this.$message({
                                message: '最多添加五个车型',
                                type: 'warning'
                            });
                        } else {
                            this.addData();
                        }
                    }
                }
                if (this.$store.state.index == 'BV') {
                    if (sure) {
                        if (this.$store.state.arr1.length === 0) {
                            this.addData();
                        }
                    } else {
                        if (this.$store.state.arr1.length > 4) {
                            this.$message({
                                message: '最多添加五个车型',
                                type: 'warning'
                            });
                        } else {
                            this.addData();
                        }
                    }
                }
                if (this.$store.state.index == 'BP') {
                    if (sure) {
                        if (this.$store.state.arr2.length === 0) {
                            this.addData();
                        }
                    } else {
                        if (this.$store.state.arr2.length > 4) {
                            this.$message({
                                message: '最多添加五个车型',
                                type: 'warning'
                            });
                        } else {
                            this.addData();
                        }
                    }
                }
                if (this.$store.state.index == 'BT') {
                    if (sure) {
                        if (this.$store.state.arr3.length === 0) {
                            this.addData();
                        }
                    } else {
                        if (this.$store.state.arr3.length > 4) {
                            this.$message({
                                message: '最多添加五个车型',
                                type: 'warning'
                            });
                        } else {
                            this.addData();
                        }
                    }
                }
                if (this.$store.state.index == 'BH') {
                    if (sure) {
                        if (this.$store.state.arr4.length === 0) {
                            this.addData();
                        }
                    } else {
                        if (this.$store.state.arr4.length > 4) {
                            this.$message({
                                message: '最多添加五个车型',
                                type: 'warning'
                            });
                        } else {
                            this.addData();
                        }
                    }
                }
            },
            isObjectValueEqual(obj1, obj2) {
                console.log(obj1, obj2);

                var o1 = obj1 instanceof Object;
                var o2 = obj2 instanceof Object;
                if (!o1 || !o2) {/*  判断不是对象  */
                    return obj1 === obj2;
                }

                if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                    return false;
                    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
                }

                for (var attr in obj1) {
                    var t1 = obj1[attr] instanceof Object;
                    var t2 = obj2[attr] instanceof Object;
                    if (t1 && t2) {
                        return diff(obj1[attr], obj2[attr]);
                    } else if (obj1[attr] !== obj2[attr]) {
                        return false;
                    }
                }
                return true;
            },
            // 添加字段
            addData() {
                let obj = new Object();
                obj.VT = this.cars[this.carRadio];
                if (this.$store.state.index == 'BK') {
                    if (this.kilometres == 0 && this.points == 0 && this.weights == 0 && this.volumes == 0 && this.tickets == 0) {
                        this.$message({
                            message: '超出部分必选一种方式',
                            type: 'warning'
                        });
                        return;
                    }
                    if (this.$store.state.arr.length > 0) {
                        for (let i = 0; i < this.$store.state.arr.length; i++) {
                            if (this.isObjectValueEqual(obj.VT, this.$store.state.arr[i].VT)) {
                                this.$message({
                                    message: '同种车型只能选择一次',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }

                    if (this.startPrice === '' || this.startPrice === null || this.startPrice == 0) {
                        this.$message({
                            message: '起步价格必填且大于0',
                            type: 'warning'
                        });
                        return;
                    } else if (/^\d+\.?\d{0,2}$/.test(this.startPrice)) {
                        obj.UP = this.startPrice;
                    } else {
                        this.$message({
                            message: '起步价格为数字最多两位小数',
                            type: 'warning'
                        });
                        return;
                    }

                    obj.KC = this.kilsNum;
                    obj.PIC = this.deliveryPoints;
                    obj.WTC = this.orderTotalWeight;
                    obj.VC = this.orderTotalVolume;
                    obj.TC = this.ticketNumber == ''?0:this.ticketNumber;

                    let kilometresPrice = Number(this.startPrice);
                    console.log(kilometresPrice)
                    // 公里校验
                    if (!this.objAddProperties(this.kilometres, this.kilometresNum, this.exceedKilometresPrice, '公里数或超里程数单价没填写完整', obj, 'UK', 'OKP', '公里数或超里程数单价为数字最多两位小数且大于0')) {
                        return;
                    }

                    if (this.kilometres === '1') {
                        kilometresPrice += this.calculationMethod(this.kilsNum, this.kilometresNum, this.exceedKilometresPrice);
                    }
                    console.log('超公里：' + kilometresPrice.toFixed(2));

                    // 点位校验
                    if (!this.objAddProperties1(this.points, this.pointsNum, this.exceedPointsPrice, '点位数或超点位单价没填写完整', obj, 'UIT', 'OPP', '点位数为整数或超点位单价为数字最多两位小数且大于0')) {
                        return;
                    }
                    if (this.points === '1') {
                        kilometresPrice += this.calculationMethod(this.deliveryPoints, this.pointsNum, this.exceedPointsPrice);
                        obj.UIT = this.pointsNum;
                    }
                    console.log('超点位校验：' + kilometresPrice.toFixed(2))
                    // 重量校验
                    if (!this.objAddProperties(this.weights, this.weightsNum, this.exceedWeightsPrice, '重量或超重量单价没填写完整', obj, 'UW', 'OWP', '重量或超重量单价为数字最多两位小数且大于0')) {
                        return;
                    }
                    if (this.weights === '1') {
                        kilometresPrice += this.calculationMethod(this.orderTotalWeight, this.weightsNum, this.exceedWeightsPrice);
                    }
                    console.log('超重量校验：' + kilometresPrice.toFixed(2))
                    // 体积校验
                    if (!this.objAddProperties(this.volumes, this.volumesNum, this.exceedVolumesPrice, '体积或超体积单价没填写完整', obj, 'UV', 'OVP', '体积或超体积单价为数字最多两位小数且大于0')) {
                        return;
                    }
                    if (this.volumes === '1') {
                        kilometresPrice += this.calculationMethod(this.orderTotalVolume, this.volumesNum, this.exceedVolumesPrice);
                    }
                    console.log('超体积校验：' + kilometresPrice.toFixed(2))
                    // 票数校验
                    if (!this.objAddProperties1(this.tickets, this.ticketsNum, this.exceedTicketsPrice, '票数或超票数单价没填写完整', obj, 'UT', 'OTP', '票数为整数或超票数单价为数字最多两位小数且大于0')) {
                        return;
                    }
                    if (this.tickets === '1') {
                        kilometresPrice += this.calculationMethod(this.ticketNumber, this.ticketsNum, this.exceedTicketsPrice);
                        obj.UT = this.ticketsNum;
                    }
                    console.log('超票数校验：' + kilometresPrice.toFixed(2))
                    obj.estimatedPrice = kilometresPrice.toFixed(2);
                    console.log(obj.estimatedPrice)
                    this.$store.commit('add', {
                        data: this.$store.state.arr,
                        obj: obj
                    })

                }
                if (this.$store.state.index == 'BV') {
                    if (this.$store.state.arr1.length > 0) {
                        for (let i = 0; i < this.$store.state.arr1.length; i++) {
                            if (this.isObjectValueEqual(obj.VT, this.$store.state.arr1[i].VT)) {
                                this.$message({
                                    message: '同种车型只能选择一次',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }
                    if (this.wholeVehicle == 0 || this.wholeVehicle === '' || this.wholeVehicle === null) {
                        this.$message({
                            message: '整车价格必填且大于0',
                            type: 'warning'
                        });
                        return;
                    } else if (/^\d+\.?\d{0,2}$/.test(this.wholeVehicle)) {
                        obj.VP = this.wholeVehicle;
                    } else {
                        this.$message({
                            message: '整车价格为数字最多两位小数',
                            type: 'warning'
                        });
                        return;
                    }
                    obj.estimatedPrice = this.wholeVehicle;
                    this.$store.commit('add', {
                        data: this.$store.state.arr1,
                        obj: obj
                    })
                }
                if (this.$store.state.index == 'BP') {
                    if (this.$store.state.arr2.length > 0) {
                        for (let i = 0; i < this.$store.state.arr2.length; i++) {
                            if (this.isObjectValueEqual(obj.VT, this.$store.state.arr2[i].VT)) {
                                this.$message({
                                    message: '同种车型只能选择一次',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }
                    obj.PC = this.orderTotalNum;
                    if (this.packagesPrice == 0 || this.packagesPrice === '' || this.packagesPrice === null) {
                        this.$message({
                            message: '计件单价必填且大于0',
                            type: 'warning'
                        });
                        return;
                    } else if (/^\d+\.?\d{0,2}$/.test(this.packagesPrice)) {
                        obj.PP = this.packagesPrice;
                    } else {
                        this.$message({
                            message: '计件单价为数字最多两位小数',
                            type: 'warning'
                        });
                        return;
                    }
                    console.log(this.orderTotalNum, this.packagesPrice)
                    obj.estimatedPrice = (Number(this.orderTotalNum) * 100 * Number(this.packagesPrice) * 100) / 10000;
                    this.$store.commit('add', {
                        data: this.$store.state.arr2,
                        obj: obj
                    })
                }
                if (this.$store.state.index == 'BT') {
                    if (this.$store.state.arr3.length > 0) {
                        for (let i = 0; i < this.$store.state.arr3.length; i++) {
                            if (this.isObjectValueEqual(obj.VT, this.$store.state.arr3[i].VT)) {
                                this.$message({
                                    message: '同种车型只能选择一次',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }
                    obj.TC = this.ticketNumber;
                    if (this.ticketsPrice == 0 || this.ticketsPrice === '' || this.ticketsPrice === null) {
                        this.$message({
                            message: '单票价格必填且大于0',
                            type: 'warning'
                        });
                        return;
                    } else if (/^\d+\.?\d{0,2}$/.test(this.ticketsPrice)) {
                        obj.TP = this.ticketsPrice;
                    } else {
                        this.$message({
                            message: '单票价格为数字最多两位小数',
                            type: 'warning'
                        });
                        return;
                    }
                    obj.estimatedPrice = (Number(this.ticketNumber) * 100 * Number(this.ticketsPrice) * 100) / 10000;
                    this.$store.commit('add', {
                        data: this.$store.state.arr3,
                        obj: obj
                    })
                }
                if (this.$store.state.index == 'BH') {
                    if (this.$store.state.arr4.length > 0) {
                        for (let i = 0; i < this.$store.state.arr4.length; i++) {
                            if (this.isObjectValueEqual(obj.VT, this.$store.state.arr4[i].VT)) {
                                this.$message({
                                    message: '同种车型只能选择一次',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                    }

                    if (this.radio == 'HRF') {
                        console.log(this.fourHours != 0 && !(/^\d+\.?\d{0,2}$/.test(this.fourHours)))
                        if (this.fourHours == 0 || (!(/^\d+\.?\d{0,2}$/.test(this.fourHours)))) {
                            this.$message({
                                message: '4小时价格为数字最多两位小数且大于0',
                                type: 'warning'
                            });
                            return;
                        }
                        obj.FHP = this.fourHours;
                        obj.HRF = '1';
                        obj.estimatedPrice = this.fourHours;
                        this.$store.commit('add', {
                            data: this.$store.state.arr4,
                            obj: obj
                        })
                    } else if (this.radio == 'HRN') {
                        if (this.nineHours == 0 || !(/^\d+\.?\d{0,2}$/.test(this.nineHours))) {
                            this.$message({
                                message: '9小时价格为数字最多两位小数且大于0',
                                type: 'warning'
                            });
                            return;
                        }
                        obj.NHP = this.nineHours;
                        obj.HRN = '1';
                        obj.estimatedPrice = this.nineHours;
                        this.$store.commit('add', {
                            data: this.$store.state.arr4,
                            obj: obj
                        })
                    } else {
                        if (this.thirteenHours == 0 || !(/^\d+\.?\d{0,2}$/.test(this.thirteenHours))) {
                            this.$message({
                                message: '13小时价格为数字最多两位小数且大于0',
                                type: 'warning'
                            });
                            return;
                        }
                        obj.THP = this.thirteenHours;
                        obj.HRT = '1';
                        obj.estimatedPrice = this.thirteenHours;
                        this.$store.commit('add', {
                            data: this.$store.state.arr4,
                            obj: obj
                        })
                    }

                }
            },
            calculationMethod(variable1, variable2, variable4) {
                let number1 = Number(variable1) * 100;
                let number2 = Number(variable2) * 100;
                let number4 = Number(variable4) * 100;
                console.log(number1, number2, number4);
                if (number1 > number2) {
                    let price = (number1 - number2) * number4 / 100;
                    price = price / 100;
                    console.log(price);
                    return price;
                } else {
                    let price = 0;
                    return price;
                }
            },
            confirmCarType() {
                this.$emit('getCarType', [!this.showCarType]);
                this.addCarType(true);
            },
            cancelCarType() {
                console.log(this.$store.state.arr)
                this.$emit('isShowCar', [!this.showCarType])
            },
            objAddProperties(choice, num, price, tips, obj, attr, attr1, text) {
                if (choice === '1') {
                    if (num === '' || price === '') {
                        this.$message({
                            message: tips,
                            type: 'warning'
                        });
                        return false;
                    } else if (num != 0 && price != 0 && /^\d+\.?\d{0,2}$/.test(num) && /^\d+\.?\d{0,2}$/.test(price)) {
                        obj[attr] = num;
                        obj[attr1] = price;
                        return true;
                    } else {
                        this.$message({
                            message: text,
                            type: 'warning'
                        });
                        return false;
                    }
                } else {
                    return true;
                }
            },
            objAddProperties1(choice, num, price, tips, obj, attr, attr1, text) {
                if (choice === '1') {
                    if (num === '' || price === '') {
                        this.$message({
                            message: tips,
                            type: 'warning'
                        });
                        return false;
                    } else if (num != 0 && price != 0 && /^\d+$/g.test(num) && /^\d+\.?\d{0,2}$/.test(price)) {
                        obj[attr] = num;
                        obj[attr1] = price;
                        return true;
                    } else {
                        this.$message({
                            message: text,
                            type: 'warning'
                        });
                        return false;
                    }
                } else {
                    return true;
                }
            },
            // 请求不同车型
            handleClick(tab) {
                console.log(tab.name);
                this.requestCarType(tab.name);
            },
            // 请求车型
            requestCarType(types) {
                let car = JSON.stringify({
                    type: types
                })
                console.log(car)

                this.$http.post(this.global.lightningUrl + '/cmsv1/driverManage/driver/vehicle_type', car, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res.data);
                    this.cars = res.data.result;
                    //carType=this.cars[this.carRadio];
                    console.log(this.cars)
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
        mounted() {
            this.requestCarType('usual');
        },
        components: {
            priceTable
        }
    }
</script>

<style lang="scss">
  .seleceCarTypes {
    .cars {
      .el-dialog .el-dialog__body {
        overflow-y: auto;
        height: 600px;
      }
    }
    .el-radio-group {
      width: 100%;
      .el-input__inner {
        border-radius: 20px;
      }
    }
    .carsTypeBox-height{
      height: 61px;
    }
    .carsTypeBox {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20px;

      .el-tabs.el-tabs--top {
        width: 50%;
      }
      .c-align {
        align-self: flex-start;
        margin-top: 10px;
      }
      .el-checkbox {
        width: 60px;
      }
      .c-span {
        display: block;
        width: 100px;
        text-align: right;
        margin-right: 50px;
      }
      .startPrice {
        width: 20%;
        position: relative;
      }
      .units {
        font-size: 14px;
        color: #409EFF;
        position: absolute;
        right: 25px;
        top: 9px;
      }
      .c-flex {
        flex: 1;
        .el-radio {
          width: 430px;
          display: block;
          .el-radio__label {
            .el-input {
              width: 300px;
            }
            span {
              display: inline-block;
              width: 100px;
            }
          }
        }
      }
      .c-div {
        margin-left: 7%;
        label {
          width: 62%;
          text-align: right;
        }
        .c-input {
          width: 119%;
          position: relative;
        }
      }
    }
  }
</style>
