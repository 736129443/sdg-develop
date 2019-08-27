<template>
  <div class="priceTable" v-if="isShow">
    <div :class="!isShows?'aa':''">
      <el-table
        :data="arr"
        border
        style="width: 100%">
        <template v-for="(date,key,index) in tableTitle">
          <el-table-column :label="date.titles" :prop="date.attr">
          </el-table-column>
        </template>
        <el-table-column label="操作" width="250px" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,scope.$index)" type="text">编辑</el-button>
            <el-button @click="deleteRow(scope.$index)" type="text">删除</el-button>
            <el-button v-if="valuationMethods == 'BK' || valuationMethods == 'BP' || valuationMethods == 'BT'" @click="calculation(scope.$index)" type="text">重新计算</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        class="priceTable-dialog-box"
        title="编辑"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        append-to-body>
        <div v-if="this.$store.state.index == 'BK'">
          <div class="dia-div" v-if="obj.UP != ''">
            <label>修改起步价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="startPrice"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.UK) != 'undefined' ">
            <label>修改起步价内公里数：</label>
            <el-input
              placeholder="请输入内容"
              v-model="kilometresNum"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.OKP) != 'undefined' ">
            <label>修改超公里单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="exceedKilometresPrice"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.UIT) != 'undefined' ">
            <label>修改起步价内点位数：</label>
            <el-input
              placeholder="请输入内容"
              v-model="pointsNum"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.OPP) != 'undefined'">
            <label>修改超点位单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="exceedPointsPrice"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.UW) != 'undefined' ">
            <label>修改起步价内重量：</label>
            <el-input
              placeholder="请输入内容"
              v-model="weightsNum"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.OWP) != 'undefined'">
            <label>修改超重量单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="exceedWeightsPrice"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.UV) != 'undefined' ">
            <label>修改起步价内体积：</label>
            <el-input
              placeholder="请输入内容"
              v-model="volumesNum"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.OVP) != 'undefined'">
            <label>修改超体积单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="exceedVolumesPrice"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.UT) != 'undefined' ">
            <label>修改起步价内票数：</label>
            <el-input
              placeholder="请输入内容"
              v-model="ticketsNum"
              clearable>
            </el-input>
          </div>
          <div class="dia-div" v-if="typeof(obj.OTP) != 'undefined'">
            <label>修改超票数单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="exceedTicketsPrice"
              clearable>
            </el-input>
          </div>
        </div>
        <div v-if="this.$store.state.index == 'BV'">
          <div class="dia-div">
            <label>修改整车价格：</label>
            <el-input
              placeholder="请输入内容"
              v-model="wholeVehicle"
              clearable>
            </el-input>
          </div>
        </div>
        <div v-if="this.$store.state.index == 'BP'">
          <div class="dia-div">
            <label>修改计件单价：</label>
            <el-input
              placeholder="请输入内容"
              v-model="packagesPrice"
              clearable>
            </el-input>
          </div>
        </div>
        <div v-if="this.$store.state.index == 'BT'">
          <div class="dia-div">
            <label>修改单票价格：</label>
            <el-input
              placeholder="请输入内容"
              v-model="ticketsPrice"
              clearable>
            </el-input>
          </div>
        </div>
        <div v-if="this.$store.state.index == 'BH'">
          <div class="dia-div">
            <label>修改计费价格：</label>
            <el-input
              placeholder="请输入内容"
              v-model="timesPrice"
              clearable>
            </el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "priceTable",
    props: ['isShows','orderTotalNum','kilsNum','ticketNumber','deliveryPoints','orderTotalVolume','orderTotalWeight','valuationMethods'],
    data() {
      return {
        centerDialogVisible: false,
        startPrice: '',
        kilometresNum:'',
        exceedKilometresPrice: '',
        pointsNum:'',
        exceedPointsPrice: '',
        weightsNum:'',
        exceedWeightsPrice: '',
        volumesNum:'',
        exceedVolumesPrice: '',
        ticketsNum:'',
        exceedTicketsPrice: '',
        obj: {},
        index: null,
        arr: [],
        arr1: [],
        tableTitle: [],
        tableTitle1: [
          {
            attr: 'VT',
            titles: '车型'
          },{
            attr: 'UP',
            titles: '起步价'
          },{
            attr: 'UK',
            titles: '起步价内公里数'
          },{
            attr: 'OKP',
            titles: '超公里单价'
          },{
            attr: 'UIT',
            titles: '起步价内点位数'
          }, {
            attr: 'OPP',
            titles: '超点位单价'
          }, {
            attr: 'UW',
            titles: '起步价内重量'
          },{
            attr: 'OWP',
            titles: '超重量单价'
          }, {
            attr: 'UV',
            titles: '起步价内点体积'
          },{
            attr: 'OVP',
            titles: '超体积单价'
          }, {
            attr: 'UT',
            titles: '起步价内票数'
          },{
            attr: 'OTP',
            titles: '超票数单价'
          }, {
            attr: 'estimatedPrice',
            titles: '预估价格'
          }],
        tableTitle2: [
          {
            attr: 'VT',
            titles: '车型'
          }, {
            attr: 'VP',
            titles: '整车价格'
          }, {
            attr: 'estimatedPrice',
            titles: '预估价格'
          }],
        tableTitle3: [
          {
            attr: 'VT',
            titles: '车型'
          }, {
            attr: 'PP',
            titles: '计件单价'
          }, {
            attr: 'estimatedPrice',
            titles: '预估价格'
          }],
        tableTitle4: [
          {
            attr: 'VT',
            titles: '车型'
          }, {
            attr: 'TP',
            titles: '单票价格'
          }, {
            attr: 'estimatedPrice',
            titles: '预估价格'
          }],
        tableTitle5: [
          {
            attr: 'VT',
            titles: '车型'
          }, {
            attr: 'FHP',
            titles: '4小时价格'
          }, {
            attr: 'NHP',
            titles: '9小时价格'
          }, {
            attr: 'THP',
            titles: '13小时价格'
          }, {
            attr: 'estimatedPrice',
            titles: '预估价格'
          }],
        wholeVehicle: '',
        packagesPrice: '',
        ticketsPrice: '',
        timesPrice: '',
        isShow: false
      }
    },
    computed: {
      myValue() {
        console.log(this.$store.state.index)
        if(this.$store.state.arr.length !== 0 || this.$store.state.arr1.length !== 0 || this.$store.state.arr2.length !== 0 || this.$store.state.arr3.length !== 0 || this.$store.state.arr4.length !== 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
        if (this.$store.state.index == 'BK') {
          this.tableTitle = this.tableTitle1;
          this.arr = JSON.parse(JSON.stringify(this.$store.state.arr));
          this.carsType(this.arr);
        }
        if (this.$store.state.index == 'BV') {
          this.tableTitle = this.tableTitle2;
          this.arr = JSON.parse(JSON.stringify(this.$store.state.arr1));
          this.carsType(this.arr);
        }
        if (this.$store.state.index == 'BP') {
          this.tableTitle = this.tableTitle3;
          this.arr = JSON.parse(JSON.stringify(this.$store.state.arr2));
          this.carsType(this.arr);
        }
        if (this.$store.state.index == 'BT') {
          this.tableTitle = this.tableTitle4;
          this.arr = JSON.parse(JSON.stringify(this.$store.state.arr3));
          this.carsType(this.arr);
        }
        if (this.$store.state.index == 'BH') {
          this.tableTitle = this.tableTitle5;
          this.arr = JSON.parse(JSON.stringify(this.$store.state.arr4));
          this.carsType(this.arr);
        }
      }
    },
    methods: {
      calculation(index){
        console.log('件数'+this.orderTotalNum)
        console.log('公里数'+this.kilsNum)
        console.log('票数'+this.ticketNumber)
        console.log('点数'+this.deliveryPoints)
        console.log('体积'+this.orderTotalVolume)
        console.log('重量'+this.orderTotalWeight)
        console.log(this.arr[index]);

        if (this.$store.state.index == 'BK') {
          if(this.kilsNum == ''){
            this.$message({
              message: '线路长度不能为空',
              type: 'warning'
            });
            return;
          }
          if(this.orderTotalWeight == ''){
            this.$message({
              message: '配送重量不能为空',
              type: 'warning'
            });
            return;
          }
          if(this.orderTotalVolume == ''){
            this.$message({
              message: '配送体积不能为空',
              type: 'warning'
            });
            return;
          }
          if(this.deliveryPoints == ''){
            this.$message({
              message: '配送点数不能为空',
              type: 'warning'
            });
            return;
          }

          this.arr[index].KC = this.kilsNum;
          this.$store.state.arr[index].KC = this.kilsNum;
          this.arr[index].PIC = this.deliveryPoints;
          this.$store.state.arr[index].PIC = this.deliveryPoints;
          this.arr[index].WTC = this.orderTotalWeight;
          this.$store.state.arr[index].WTC = this.orderTotalWeight;
          this.arr[index].VC = this.orderTotalVolume;
          this.$store.state.arr[index].VC = this.orderTotalVolume;


          let kilometresPrice = Number(this.arr[index].UP);
          let kilometresPrice2 = Number(this.arr[index].UP);
          // 实际公里数变化
          if (typeof(this.arr[index].OKP) != 'undefined') {
              kilometresPrice += this.calculationMethod(this.arr[index].KC, this.arr[index].UK, this.arr[index].OKP);

              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[index].KC, this.$store.state.arr[index].UK, this.$store.state.arr[index].OKP);
            }

          // 点位变化
          if (typeof(this.arr[index].OPP) != 'undefined') {
              kilometresPrice += this.calculationMethod(this.arr[index].PIC, this.arr[index].UIT, this.arr[index].OPP);

              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[index].PIC, this.$store.state.arr[index].UIT, this.$store.state.arr[index].OPP);

          }

          // 重量变化
          if (typeof(this.arr[index].OWP) != 'undefined') {
              kilometresPrice += this.calculationMethod(this.arr[index].WTC, this.arr[index].UW, this.arr[index].OWP);

              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[index].WTC, this.$store.state.arr[index].UW, this.$store.state.arr[index].OWP);
          }

          // 体积变化
          if (typeof(this.arr[index].OVP) != 'undefined') {
              kilometresPrice += this.calculationMethod(this.arr[index].VC, this.arr[index].UV, this.arr[index].OVP);

              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[index].VC, this.$store.state.arr[index].UV, this.$store.state.arr[index].OVP);
          }

          // 票数变化
          if (typeof(this.arr[index].OTP) != 'undefined') {
              if(this.ticketNumber == ''){
                this.$message({
                  message: '配送票数不能为空',
                  type: 'warning'
                });
                return;
              }
              this.arr[index].TC = this.ticketNumber == ''?0:this.ticketNumber;
              this.$store.state.arr[index].TC = this.ticketNumber == ''?0:this.ticketNumber;
              kilometresPrice += this.calculationMethod(this.arr[index].TC, this.arr[index].UT, this.arr[index].OTP);

              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[index].TC, this.$store.state.arr[index].UT, this.$store.state.arr[index].OTP);
          }

          this.arr[index].estimatedPrice = kilometresPrice.toFixed(2);
          this.$store.state.arr[index].estimatedPrice = kilometresPrice2.toFixed(2);
        }
        if (this.$store.state.index == 'BP') {
          if (typeof(this.arr[index].PP) != 'undefined') {
            if(this.orderTotalNum == ''){
              this.$message({
                message: '配送件数不能为空',
                type: 'warning'
              });
              return;
            }
            this.arr[index].PC = this.orderTotalNum;
            this.arr[index].estimatedPrice = (Number(this.arr[index].PC) * 100 * Number(this.arr[index].PP) * 100) / 10000;
            this.$store.state.arr2[index].orderTotalNum = this.arr[index].PC;
            this.$store.state.arr2[index].estimatedPrice = (Number(this.$store.state.arr2[index].PC) * 100 * Number(this.$store.state.arr2[index].PP) * 100) / 10000;
          }
        }
        if (this.$store.state.index == 'BT') {
          if (typeof(this.arr[index].TP) != 'undefined') {
              if(this.orderTotalNum == ''){
                this.$message({
                  message: '配送票数不能为空',
                  type: 'warning'
                });
                return;
              }
              this.arr[index].TC = this.ticketNumber;
              this.arr[index].estimatedPrice = (Number(this.arr[index].TC) * 100 * Number(this.arr[index].TP) * 100) / 10000;
              this.$store.state.arr3[index].TC = this.ticketNumber;
              this.$store.state.arr3[index].estimatedPrice = (Number(this.$store.state.arr3[index].TC) * 100 * Number(this.$store.state.arr3[index].TP) * 100) / 10000;

          }
        }
      },
      carsType(arr) {
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            arr[i].VT = arr[i].VT.name + ' ' + arr[i].VT.isElectric + ' ' + arr[i].VT.length + ' ' + arr[i].VT.isCertificate + ' ' + arr[i].VT.isTailBoard + ' ' + arr[i].VT.isCold;
          }
        }
      },
      handleClick(row, index) {
        this.index = index;
        console.log(this.arr[this.index]);
        this.centerDialogVisible = true;
        if (this.$store.state.index == 'BK') {
          console.log(row)
          this.obj = row;
          this.startPrice = row.UP;
          this.kilometresNum = row.UK;
          this.exceedKilometresPrice = row.OKP;
          this.pointsNum = row.UIT;
          this.exceedPointsPrice = row.OPP;
          this.weightsNum = row.UW;
          this.exceedWeightsPrice = row.OWP;
          this.volumesNum = row.UV;
          this.exceedVolumesPrice = row.OVP;
          this.ticketsNum = row.UT;
          this.exceedTicketsPrice = row.OTP;
        }
        if (this.$store.state.index == 'BV') {
          this.wholeVehicle = row.VP;
        }
        if (this.$store.state.index == 'BP') {
          this.packagesPrice = row.PP;
        }
        if (this.$store.state.index == 'BT') {
          this.ticketsPrice = row.TP;
        }
        if (this.$store.state.index == 'BH') {
          console.log(row)
          if (typeof (row.FHP) != 'undefined') {
            this.timesPrice = row.FHP;
          } else if (typeof (row.NHP) != 'undefined') {
            this.timesPrice = row.NHP;
          } else {
            this.timesPrice = row.THP;
          }
        }
      },
      deleteRow(index) {
        if (this.$store.state.index == 'BK') {
          this.$store.commit('delectRow', {
            data: this.$store.state.arr,
            index: index
          })
        }
        if (this.$store.state.index == 'BV') {
          this.$store.commit('delectRow', {
            data: this.$store.state.arr1,
            index: index
          })
        }
        if (this.$store.state.index == 'BP') {
          this.$store.commit('delectRow', {
            data: this.$store.state.arr2,
            index: index
          })
        }
        if (this.$store.state.index == 'BT') {
          this.$store.commit('delectRow', {
            data: this.$store.state.arr3,
            index: index
          })
        }
        if (this.$store.state.index == 'BH') {
          this.$store.commit('delectRow', {
            data: this.$store.state.arr4,
            index: index
          })
        }
      },
      confirm() {
        if (this.$store.state.index == 'BK') {
          // 编辑起步价
          if (this.arr[this.index].startPrice !== '' && this.startPrice != 0 && this.startPrice !== '' && this.startPrice != null && (/^\d+\.?\d{0,2}$/.test(this.startPrice))) {
            this.arr[this.index].UP = this.startPrice;
            this.$store.state.arr[this.index].UP = this.startPrice;
          } else {
            this.$message({
              message: '起步价为数字最多两位小数且大于0',
              type: 'warning'
            });
            return;
          }

          let kilometresPrice = Number(this.arr[this.index].UP);
          let kilometresPrice2 = Number(this.arr[this.index].UP);
          // 编辑起步价内公里数
          if (typeof(this.arr[this.index].UK) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].UK, this.kilometresNum, this.arr, this.index, 'UK', '起步价内公里数为数字最多两位小数且大于0')) {
              return;
            }
            console.log('----------------------------------------------------')
            console.log(this.arr[this.index].UK)
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].UK, this.kilometresNum, this.$store.state.arr, this.index, 'UK', '起步价内公里数为数字最多两位小数且大于0')) {
              return;
            }
          }
          // 编辑超公里
          if (typeof(this.arr[this.index].OKP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].OKP, this.exceedKilometresPrice, this.arr, this.index, 'OKP', '超公里单价为数字最多两位小数且大于0')) {
              return;
            } else {
              console.log('----------------------------------------------------')
              console.log(this.arr[this.index].KC,this.arr[this.index].UK,this.arr[this.index].OKP)
              kilometresPrice += this.calculationMethod(this.arr[this.index].KC, this.arr[this.index].UK, this.arr[this.index].OKP);
              console.log('----------------------------------------------------')
              console.log(kilometresPrice)
            }

            if (!this.checkEditorInfos(this.$store.state.arr[this.index].OKP, this.exceedKilometresPrice, this.$store.state.arr, this.index, 'OKP', '超公里单价为数字最多两位小数且大于0')) {
              return;
            } else {
              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[this.index].KC, this.$store.state.arr[this.index].UK, this.$store.state.arr[this.index].OKP);
            }
          }

          // 编辑起步价内点数
          if (typeof(this.arr[this.index].UIT) != 'undefined') {
            if (!this.checkEditorInfos1(this.arr[this.index].UIT, this.pointsNum, this.arr, this.index, 'UIT', '起步价内点数为整数')) {
              return;
            }
            if (!this.checkEditorInfos1(this.$store.state.arr[this.index].UIT, this.pointsNum, this.$store.state.arr, this.index, 'UIT', '起步价内点数为整数且大于0')) {
              return;
            }
          }
          // 编辑超点位
          if (typeof(this.arr[this.index].OPP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].OPP, this.exceedPointsPrice, this.arr, this.index, 'OPP', '超点位单价为数字最多两位小数且大于0')) {
              return;
            } else {
              console.log(this.arr[this.index].PIC,this.arr[this.index].UIT,this.arr[this.index].OPP)
              kilometresPrice += this.calculationMethod(this.arr[this.index].PIC, this.arr[this.index].UIT, this.arr[this.index].OPP);
              console.log('----------------------------------------------------')
              console.log(kilometresPrice)
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].OPP, this.exceedPointsPrice, this.$store.state.arr, this.index, 'OPP', '超点位单价为数字最多两位小数且大于0')) {
              return;
            } else {
              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[this.index].PIC, this.$store.state.arr[this.index].UIT, this.$store.state.arr[this.index].OPP);
            }
          }
          // 编辑起步价内重量
          if (typeof(this.arr[this.index].UW) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].UW, this.weightsNum, this.arr, this.index, 'UW', '起步价内重量为数字最多两位小数且大于0')) {
              return;
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].UW, this.weightsNum, this.$store.state.arr, this.index, 'UW', '起步价内重量为数字最多两位小数且大于0')) {
              return;
            }
          }
          // 编辑超重量
          if (typeof(this.arr[this.index].OWP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].OWP, this.exceedWeightsPrice, this.arr, this.index, 'OWP', '超重量单价为数字最多两位小数且大于0')) {
              return;
            } else {
              console.log(this.arr[this.index].WTC, this.arr[this.index].UW, this.arr[this.index].OWP)
              kilometresPrice += this.calculationMethod(this.arr[this.index].WTC, this.arr[this.index].UW, this.arr[this.index].OWP);
              console.log('----------------------------------------------------')
              console.log(kilometresPrice)
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].OWP, this.exceedWeightsPrice, this.$store.state.arr, this.index, 'OWP', '超重量单价为数字最多两位小数且大于0')) {
              return;
            } else {
              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[this.index].WTC, this.$store.state.arr[this.index].UW, this.$store.state.arr[this.index].OWP);
            }
          }
          // 编辑起步价内体积
          if (typeof(this.arr[this.index].UV) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].UV, this.volumesNum, this.arr, this.index, 'UV', '起步价内体积为数字最多两位小数且大于0')) {
              return;
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].UV, this.volumesNum, this.$store.state.arr, this.index, 'UV', '起步价内体积为数字最多两位小数且大于0')) {
              return;
            }
          }
          // 编辑超体积
          if (typeof(this.arr[this.index].OVP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].OVP, this.exceedVolumesPrice, this.arr, this.index, 'OVP', '超体积单价为数字最多两位小数且大于0')) {
              return;
            } else {
              console.log(this.arr[this.index].VC, this.arr[this.index].UV, this.arr[this.index].OVP)
              kilometresPrice += this.calculationMethod(this.arr[this.index].VC, this.arr[this.index].UV, this.arr[this.index].OVP);
              console.log('----------------------------------------------------')
              console.log(kilometresPrice)
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].OVP, this.exceedVolumesPrice, this.$store.state.arr, this.index, 'OVP', '超体积单价为数字最多两位小数且大于0')) {
              return;
            } else {
               kilometresPrice2 += this.calculationMethod(this.$store.state.arr[this.index].VC, this.$store.state.arr[this.index].UV, this.$store.state.arr[this.index].OVP);
            }
          }
          // 编辑起步价内票数
          if (typeof(this.arr[this.index].UT) != 'undefined') {
            if (!this.checkEditorInfos1(this.arr[this.index].UT, this.ticketsNum, this.arr, this.index, 'UT', '起步价内票数为整数且大于0')) {
              return;
            }
            if (!this.checkEditorInfos1(this.$store.state.arr[this.index].UT, this.ticketsNum, this.$store.state.arr, this.index, 'UT', '起步价内票数为整数且大于0')) {
              return;
            }
          }
          // 编辑超票数
          if (typeof(this.arr[this.index].OTP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].OTP, this.exceedTicketsPrice, this.arr, this.index, 'OTP', '超票数单价为数字最多两位小数且大于0')) {
              return;
            } else {
              console.log(this.arr[this.index].TC, this.arr[this.index].UT, this.arr[this.index].OTP)
              kilometresPrice += this.calculationMethod(this.arr[this.index].TC, this.arr[this.index].UT, this.arr[this.index].OTP);
              console.log('----------------------------------------------------')
              console.log(kilometresPrice)
            }
            if (!this.checkEditorInfos(this.$store.state.arr[this.index].OTP, this.exceedTicketsPrice, this.$store.state.arr, this.index, 'OTP', '超票数单价为数字最多两位小数且大于0')) {
              return;
            } else {
              kilometresPrice2 += this.calculationMethod(this.$store.state.arr[this.index].TC, this.$store.state.arr[this.index].UT, this.$store.state.arr[this.index].OTP);
            }
          }
          console.log(kilometresPrice)
          console.log(kilometresPrice.toFixed(2))
          this.arr[this.index].estimatedPrice = kilometresPrice.toFixed(2);
          this.$store.state.arr[this.index].estimatedPrice = kilometresPrice2.toFixed(2);
        }
        if (this.$store.state.index == 'BV') {
          // 编辑整车价格
          if (typeof(this.arr[this.index].VP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].VP, this.wholeVehicle, this.arr, this.index, 'VP', '整车价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = this.arr[this.index].VP;
            }
            if (!this.checkEditorInfos(this.$store.state.arr1[this.index].VP, this.wholeVehicle, this.$store.state.arr1, this.index, 'VP', '整车价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr1[this.index].estimatedPrice = this.$store.state.arr1[this.index].VP;
            }
          }
        }
        if (this.$store.state.index == 'BP') {
          // 编辑计件价格
          if (typeof(this.arr[this.index].PP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].PP, this.packagesPrice, this.arr, this.index, 'PP', '计件价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = (Number(this.arr[this.index].PC) * 100 * Number(this.arr[this.index].PP) * 100) / 10000;
            }
            if (!this.checkEditorInfos(this.$store.state.arr2[this.index].PP, this.packagesPrice, this.$store.state.arr2, this.index, 'PP', '计件价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr2[this.index].estimatedPrice = (Number(this.$store.state.arr2[this.index].PC) * 100 * Number(this.$store.state.arr2[this.index].PP) * 100) / 10000;
            }
          }
        }
        if (this.$store.state.index == 'BT') {
          // 编辑单票价格
          if (typeof(this.arr[this.index].TP) != 'undefined') {
            if (!this.checkEditorInfos(this.arr[this.index].TP, this.ticketsPrice, this.arr, this.index, 'TP', '单票价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = (Number(this.arr[this.index].TC) * 100 * Number(this.arr[this.index].TP) * 100) / 10000;
            }
            if (!this.checkEditorInfos(this.$store.state.arr3[this.index].TP, this.ticketsPrice, this.$store.state.arr3, this.index, 'TP', '单票价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr3[this.index].estimatedPrice = (Number(this.$store.state.arr3[this.index].TC) * 100 * Number(this.$store.state.arr3[this.index].TP) * 100) / 10000;
            }
          }
        }
        if (this.$store.state.index == 'BH') {
          if (typeof (this.arr[this.index].FHP) != 'undefined') {
            // 编辑4小时价格
            if (!this.checkEditorInfos(this.arr[this.index].FHP, this.timesPrice, this.arr, this.index, 'FHP', '4小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = this.arr[this.index].FHP;
            }

            if (!this.checkEditorInfos(this.$store.state.arr4[this.index].FHP, this.timesPrice, this.$store.state.arr4, this.index, 'FHP', '4小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr4[this.index].estimatedPrice = this.$store.state.arr4[this.index].FHP;
            }

          } else if (typeof (this.arr[this.index].NHP) != 'undefined') {
            // 编辑9小时价格
            if (!this.checkEditorInfos(this.arr[this.index].NHP, this.timesPrice, this.arr, this.index, 'NHP', '9小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = this.arr[this.index].NHP;
            }

            if (!this.checkEditorInfos(this.$store.state.arr4[this.index].NHP, this.timesPrice, this.$store.state.arr4, this.index, 'NHP', '9小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr4[this.index].estimatedPrice = this.$store.state.arr4[this.index].NHP;
            }

          } else {
            // 编辑13小时价格
            if (!this.checkEditorInfos(this.arr[this.index].THP, this.timesPrice, this.arr, this.index, 'THP', '13小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.arr[this.index].estimatedPrice = this.arr[this.index].THP;
            }
            if (!this.checkEditorInfos(this.$store.state.arr4[this.index].THP, this.timesPrice, this.$store.state.arr4, this.index, 'THP', '13小时价格为数字最多两位小数且大于0')) {
              return;
            } else {
              this.$store.state.arr4[this.index].estimatedPrice = this.$store.state.arr4[this.index].THP;
            }
          }
        }
        this.centerDialogVisible = false;
      },
      calculationMethod(variable1, variable2, variable4) {
        // console.log(number1, number2, number4)
        let number1 = Number(variable1) * 100;
        let number2 = Number(variable2) * 100;
        let number4 = Number(variable4) * 100;
        // console.log(number1, number2, number4)
        if (number1 > number2) {
          let price = (number1 - number2) * number4 / 100;
          price = price / 100;
          return price;
        } else {
          let price = 0;
          return price;
        }
      },
      checkEditorInfos(objAttr1, objAttr2, data, index, attr, title) {
        // console.log((/^\d+\.?\d{0,2}$/.test(objAttr2)))
        if (typeof(objAttr1) != 'undefined' && objAttr2 !== '' && objAttr2 !=0 && (/^\d+\.?\d{0,2}$/.test(objAttr2))) {
          data[index][attr] = objAttr2;
          return true;
        } else {
          this.$message({
            message: title,
            type: 'warning'
          });
          return false;
        }
      },
      checkEditorInfos1(objAttr1, objAttr2, data, index, attr, title) {
        console.log((/^\d+$/g.test(objAttr2)))
        if (typeof(objAttr1) != 'undefined' && objAttr2 !== '' && objAttr2 !=0 && (/^\d+$/g.test(objAttr2))) {
          data[index][attr] = objAttr2;
          return true;
        } else {
          this.$message({
            message: title,
            type: 'warning'
          });
          return false;
        }
      }
    },
    mounted() {
    },
    watch: {
      myValue() {

      }
    },

  }
</script>

<style lang="scss">
  .priceTable {
    margin-top: 20px;
    .aa {
      width: 52%;
    }
    .el-button {
      padding: 9px 15px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }

  }

  .priceTable-dialog-box {
    label {
      display: inline-block;
      width: 150px;
      text-align: right;
    }
    .dia-div {
      margin: 0 auto 15px;
      width: 80%;
    }
    .el-input {
      width: 60%;
    }
  }
</style>
