<template>
    <div class="main dis">
        <div class="container_border">
            <el-row :gutter="10">
                <el-col :span="1.5">
                    <span>仓库名称</span>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="value" filterable clearable @change='getId()' placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.depotName"
                                :value="item.depotName">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="1.5">
                    <span class="marLeft">配送日期</span>
                </el-col>
                <el-col :span="3">
                    <el-date-picker
                            style="width: 100%"
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-col>
                <el-button type="primary" style="margin-left:15px" @click="warehouseTableSearch"> 查询</el-button>
            </el-row>

            <div class="mlayout">
                <div id="container" class="map" tabindex="0"></div>
                <div class='information_panel2'>
                    <p><span class="circle1"> </span> 未调度</p>
                    <p><span class="circle2"> </span> 已调度</p>
                    <p><span class="circle3"> </span> 已选中</p>
                </div>
                <div class='information_panel'>
                    <p>订单数量:<span class="bigNum">{{orderTotalNums}}</span></p>
                    <p>订单件数:<span class="bigNum">{{orderTotalUnits}}</span></p>
                    <p class="weights">总重量:<span class="bigNum">{{orderTotalWeight}} </span>kg</p>
                    <p>总体积:<span class="bigNum">{{orderTotalVolume}} </span>m³</p>
                </div>
                <div class='information_panel3' v-show="isorderShow">
                    <p><span>订单编号:</span>{{orderShow.orderId}}</p>
                    <p><span>配送日期:</span>{{orderShow.orderSendDay}}</p>
                    <p><span>配送地址:</span>{{orderShow.orderAddress}}</p>
                    <p><span>联系人: </span>{{orderShow.contactName}}</p>
                    <p><span> 联系电话:</span>{{orderShow.contactMobile}}</p>
                </div>
                <ul class="addressDels">
                    <li class="poi">
                        <span>最近的POI：</span>
                        <p class="nearpoi" ref="nearpoi"></p>
                    </li>
                    <li class="address">
                        <span>拖拽地址：</span>
                        <p class="infos" ref="addressText"></p>
                    </li>
                    <li v-show='isbut'>
                        <a @click="creation()">创建当前集合</a>
                    </li>
                </ul>
                <div class="multiselect">
                    <el-radio-group style="display: flex;justify-content: center" @change="selectMode" v-model="radio">
                        <el-radio :label="1">画矩形</el-radio>
                        <el-radio :label="2">画圆</el-radio>
                        <el-radio :label="3">画多边形</el-radio>
                    </el-radio-group>
                    <div style="display: flex;justify-content: space-around;">
                        <el-button v-show="!addCollOrder.length" style="margin: 20px 0 0 0" size="small" @click="start">
                            开始多选
                        </el-button>
                        <el-button v-show="addCollOrder.length" style="margin: 20px 0 0 0" size="small" @click="start">
                            多选追加
                        </el-button>
                        <el-button v-show="addCollOrder.length" style="margin: 20px 0 0 0" size="small" @click="ends">
                            重新多选
                        </el-button>
                    </div>
                </div>
                <div class="markerList" v-show="makerArray.length">
                    <h4>相同地址订单列表</h4>
                    <el-checkbox class="firstBox" :indeterminate="isIndeterminate" v-model="checkAll"
                                 @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox class="otherBox" v-for="(item,index) in makerArray" :disabled="dis(item,index)"
                                     :label="item"
                                     :key="item.orderId"><p>订单编号:{{item.orderId}}</p>
                            <p>订单地址:{{item.orderAddress}}</p></el-checkbox>
                    </el-checkbox-group>
                </div>
                <!--<div class="markerList" v-show="makerArray.length">
                    <p v-for="(item,index) in makerArray">{{item.orderId}}</p>
                </div>-->
            </div>
            <el-table border :data="collections" tooltip-effect="dark" style="width:100%; margin:20px 0; ">
                <el-table-column prop="groupId" label="集合编号">
                    <template slot-scope="scope">
                        <el-button round @click="lookCollections(scope.$index, scope.row)" size="small">
                            {{collections[scope.$index].groupId}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="groupName" label="集合名称"></el-table-column>
                <el-table-column prop="orderNum" label="订单总数"></el-table-column>
                <el-table-column prop="goodsNum" label="总件数"></el-table-column>
                <el-table-column prop="totalVolume" label="总体积"></el-table-column>
                <el-table-column prop="totalWeight" label="总重量"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button round @click="toUserCar(scope.$index, scope.row)" size="mini">发布用车</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background
                           layout="prev, pager, next,sizes"
                           :total="total"
                           :page-size="pagesize"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[5,6 , 7, 8]"
                           class="text_right">
            </el-pagination>
            <el-dialog
                    title="创建集合"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="close"
                    center
            >
                <div style="text-align: center" class=" dis">
                    <!--<span class="demonstration">集合名称: </span>-->
                    <el-input v-model="collectionNames" @change='regCollectionNames'
                              placeholder="请输入集合名称..."></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="close()">取 消</el-button>
          <el-button type="primary" @click="succees()">创建</el-button>
       </span>
            </el-dialog>
        </div>
    </div>
</template>
<style lang="scss">
    .dis {
        .el-checkbox {
            display: block;
            height: 30px;
            margin: 0!important;
        }
        .el-checkbox + .el-checkbox {
            margin: 0;
        }
        .el-checkbox__label {
            padding-left: 8px;
            font-size: 12px;
        }
        .warehouse_name, .district {
            margin: 0 25px 0 0;
        }
        .contact {
            margin: 15px 0 0 0;
            position: relative;
            left: 6px;
        }

        .contact .linkman {
            margin: 0 25px 15px 10px;
        }

        .contact img {
            width: 18px;
            vertical-align: middle;
            color: white;
            position: relative;
            top: -1px;
        }

        .mlayout {
            position: relative;
            top: 10px;
            #container {
                height: 800px;
                width: 100%;
            }
            .information_panel {
                padding: 14px 20px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                top: 10px;
                width: 35%;
                border-bottom: 1px solid #eee;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);;
                border-radius: 10px;
                p {
                    font-size: 13px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    display: inline-block;
                    width: 24%;
                    span.bigNum {
                        font-size: 13px;
                        color: #409EFF;
                    }
                }
            }
            .information_panel3 {
                padding: 8px 14px;
                background: white;
                position: absolute;
                left: 10px;
                top: 10px;
                width: 20%;
                border-bottom: 1px solid #eee;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);;
                border-radius: 10px;
                p {
                    padding: 0 0 4px 0;
                    width: 100%;
                    font-size: 14px;
                    letter-spacing: 2px;
                    line-height: 22px;
                    span {
                        font-weight: bold;
                        letter-spacing: 2px;
                        font-size: 15px;
                    }
                }
            }

            .information_panel2 {
                padding: 14px 20px;
                background: white;
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 16%;
                border-bottom: 1px solid #eee;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);;
                border-radius: 10px;
                p {
                    font-size: 15px;
                    display: inline-block;
                    width: 32%;
                    font-weight: bold;
                    letter-spacing: 2px;
                    span.circle1 {
                        vertical-align: middle;
                        display: inline-block;
                        background: #ff7233;
                        border-radius: 50%;
                        width: 25px;
                        height: 25px;
                    }
                    span.circle2 {
                        vertical-align: middle;
                        display: inline-block;
                        border-radius: 50%;
                        background: #28c392;
                        width: 25px;
                        height: 25px;
                    }
                    span.circle3 {
                        vertical-align: middle;
                        display: inline-block;
                        border-radius: 50%;
                        background: #15b8ee;
                        width: 25px;
                        height: 25px;
                    }
                }
            }
            .multiselect {
                position: absolute;
                bottom: 75px;
                right: 10px;
                background: #fff;
                padding: 14px 20px;
                list-style: none;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                font-size: 14px;
            }

            .markerList {
                overflow: auto;
                position: absolute;
                top: 190px;
                left: 10px;
                width: 20%;
                max-height: 410px;
                background: #fff;
                padding: 15px;
                list-style: none;
                font-size: 12px;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                .otherBox {
                    p {
                        padding-right: 15px;
                        display: block;
                    }
                    padding: 5px 0 15px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                    .el-checkbox__inner {
                        width: 18px;
                        height: 18px;
                        position: relative;
                        font-size: 12px;
                        top: -10px;
                    }
                    .el-checkbox__inner::after {
                        border: 2px solid #fff;
                        border-left: 0;
                        border-top: 0;
                        height: 9px;
                        left: 6px;
                        position: absolute;
                        top: 1px;
                        width: 3px;
                    }
                }
                .firstBox {
                    padding: 10px 0 0 0;
                    .el-checkbox__inner {
                        width: 18px;
                        height: 18px;
                        position: relative;
                        top: 0;
                        font-size: 12px;
                    }
                    .el-checkbox__inner::after {
                        border: 2px solid #fff;
                        border-left: 0;
                        border-top: 0;
                        height: 9px;
                        left: 6px;
                        position: absolute;
                        top: 1px;
                        width: 3px;
                    }
                    .el-checkbox__inner::before {
                        position: absolute;
                        height: 4px;
                        top: 6px;
                    }
                }
                h4 {
                    font-size: 15px;
                    text-align: center;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                    padding: 0 0 10px;
                }
            }
            .addressDels {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20%;
                background: #fff;
                padding: 12px;
                list-style: none;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                font-size: 14px;
                li {
                    width: 100%;
                    margin: 0 0 5px 0;
                    span {
                        display: block;
                        font-size: 15px;
                        margin: 0 0 5px 0;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    p {
                        line-height: 20px;
                        letter-spacing: 2px;
                    }
                    a {
                        font-size: 14px;
                        cursor: pointer;
                        display: block;
                        width: 50%;
                        margin: 10px auto;
                        height: 40px;
                        line-height: 40px;
                        background: #409EFF;
                        color: #fff;
                        text-align: center;
                        border-radius: 40px;
                    }
                }
            }
            .orderLists {
                position: absolute;
                left: 10px;
                top: 58px;
                width: 21.5%;
                overflow: hidden;
                border-radius: 10px;
                height: 358px;
                background: #fff;
                padding: 0 10px;
                list-style: none;
                box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
                font-size: 14px;
                .orderList {
                    overflow-y: auto;
                    height: 100%;
                    padding: 0 6px 0 0;
                }
                .orderList li {
                    cursor: pointer;
                    height: 96px;
                    border-radius: 10px;
                    margin: 10px 0;
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    padding: 10px;
                    box-sizing: border-box;
                }
                .orderList li.active {
                    background: rgba(0, 0, 0, 0.05);;
                }
                .red {
                    color: #ff630e;
                }
                .green {
                    color: #28c392;
                }
            }
        }
        .containers {
            .info {
                border: solid 1px silver;
                .info-top {
                    position: relative;
                    background: none repeat scroll 0 0 #F9F9F9;
                    border-bottom: 1px solid #CCC;
                    border-radius: 5px 5px 0 0;
                    div {
                        display: inline-block;
                        color: #333333;
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 31px;
                        padding: 0 10px;
                    }
                    img {
                        position: absolute;
                        top: 5px;
                        right: 10px;
                        transition-duration: 0.25s;
                        &:hover {
                            box-shadow: 0 0 5px #000;
                        }
                    }
                }
                div.info-middle {
                    font-size: 12px;
                    padding: 6px;
                    line-height: 20px;
                    img {
                        float: left;
                        margin-right: 6px;
                    }
                }
                div.info-bottom {
                    height: 0;
                    width: 100%;
                    clear: both;
                    text-align: center;
                    img {
                        position: relative;
                        z-index: 104;
                    }
                }
                span {
                    margin-left: 5px;
                    font-size: 11px;
                }
            }
        }

        .el-row .el-col span {
            line-height: 44px;
        }
        .paMar {
            padding: 0 15px;
            margin-left: 5px
        }
        .el-row .el-col .marLeft {
            margin-left: 45px;
        }
        .el-table .el-button:focus {
            color: #606266;
            border-color: #DCDFE6;
        }
        .el-table .el-button:hover {
            color: #ffa10e;
        }
        .text_right {
            text-align: right;
        }
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 33.33%;
        }
    }


</style>

<script>
    let marker;
    let map;
    let loading;
    let mouseTool;
    let overlays = [];
    let markers = [];
    let repeatmarkers = [];
    let markerList;
    let datas = [];
    // import top from './header'
    import {regCollectionName, getNowTime, getDate} from '../../../../js/dispatch'

    export default {
        data() {
            return {
                checkAll: false,
                isIndeterminate: true,
                checkedCities: [],
                makerArray: [],
                radio: 1,
                value: '',
                value1: '',
                options: [],
                total: 0,
                pagesize: 5,
                currentPage: 1,
                contactNames: '',
                endTime: '',
                textBar: [],
                orderTotalNums: 0,
                orderTotalUnits: 0,
                orderTotalWeight: 0,
                orderTotalVolume: 0,
                addCollOrder: [],
                collection: [],
                collections: [],
                dialogVisible: false,
                collectionNames: '',
                isbut: false,
                orderShow: {},
                isorderShow: false,
                wareId: '',
                toUseCarWareId: '',
                toUseCarValue: '',
                wareAddres: '',
                successCollectionName: false,
                isStart: false,
                aa: [],
                token: '',
                users: '',
            };
        },
        components: {
            top
        },
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            console.log(user);
            this.token = user.result.token;
            //     this.revisedTable();
        },
        methods: {
            dis(item, i) {
                //console.log(item, i);
                if (item.status === "已调度") {
                    return true;
                }
                return false;
            },
            repeatMarkerCulate(_this) {
                for (let i = 0; i < _this.checkedCities.length; i++) {
                    _this.orderTotalUnits += _this.checkedCities[i].goodsTotalNum;
                    _this.orderTotalWeight += _this.checkedCities[i].totalWeight;
                    _this.orderTotalVolume += _this.checkedCities[i].totalVolume;
                }
                _this.orderTotalNums += _this.checkedCities.length;
            },
            handleCheckAllChange(val) {
                let _this = this;
                this.checkedCities = val ? this.makerArray : [];
                this.isIndeterminate = false;
                this.calculate();
                this.repeatMarkerCulate(_this)
            },
            handleCheckedCitiesChange(value) {
                let _this = this;
                this.calculate();
                this.repeatMarkerCulate(_this);
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.makerArray.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.makerArray.length;
            },
            toUserCar(index, row) {
                console.log(index, row);
                if(this.toUseCarWareId=='' || this.toUseCarValue==''){
                    this.$message({
                        showClose: true,
                        message: '仓库id或仓库名没有获取到，请检查...',
                        type: 'warning'
                    });
                    return;
                }

                // console.log(this.toUseCarWareId, this.toUseCarValue);
                row.depotId = this.toUseCarWareId;
                row.depotName = this.toUseCarValue;

                if (sessionStorage.getItem('collection') != null) {
                    //删除本地
                    sessionStorage.removeItem('collection');
                    //存储本地
                    sessionStorage.setItem('collection', Base64.encode(JSON.stringify(row)));
                } else {
                    //存储本地
                    sessionStorage.setItem('collection', Base64.encode(JSON.stringify(row)));
                }
                this.$router.push(
                    {
                        path: '/ReleaseCar/use-car'
                    }
                );
            },
            lookCollections(index, row) {
                this.orderTotalNums = row.orderNum;
                this.orderTotalUnits = row.goodsNum;
                this.orderTotalWeight = row.totalWeight;
                this.orderTotalVolume = row.totalVolume;
            },
            regCollectionNames() {
                regCollectionName(this, this.collectionNames)
            },
            getId() {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].depotName == this.value) {
                        this.wareId = this.options[i].id;
                        // this.wareAddres=this.options[i].location.address
                    }
                }
                console.log(this.wareId, this.wareAddres)
            },
            calculateInit() {
                this.orderTotalNums = 0;
                this.orderTotalUnits = 0;
                this.orderTotalWeight = 0;
                this.orderTotalVolume = 0;
            },
            calculate() {
                this.calculateInit();
                if (this.addCollOrder.length) {
                    for (let i = 0; i < this.addCollOrder.length; i++) {
                        this.orderTotalUnits += this.addCollOrder[i].goodsTotalNum;
                        this.orderTotalWeight += this.addCollOrder[i].totalWeight;
                        this.orderTotalVolume += this.addCollOrder[i].totalVolume;
                    }
                    this.orderTotalNums = this.addCollOrder.length;
                }
            },
            succees() {
                let _this = this;
                console.log(_this.addCollOrder);
                if (_this.collectionNames == '') {
                    _this.$message({
                        showClose: true,
                        message: '集合名不能为空',
                        type: 'warning'
                    });
                    return;
                }

                if (_this.collections !== null && _this.collections !== undefined) {
                    for (let i = 0; i < _this.collections.length; i++) {
                        if (_this.collectionNames === _this.collections[i].groupName) {
                            _this.$message('集合名重复!');
                            return;
                        }
                    }
                }
                if (!_this.successCollectionName) {
                    return
                }
                this.$confirm('您是否要创建集合?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(_ => {
                    let arr = [];
                    for (let i = 0; i < _this.addCollOrder.length; i++) {

                        arr.push(_this.addCollOrder[i].id)
                    }
                    if (this.checkedCities.length) {
                        for (let i = 0; i < this.checkedCities.length; i++) {
                            arr.push(this.checkedCities[i].orderId)
                        }
                    }
                    let collName = JSON.stringify({
                        token: _this.token,
                        depotId: _this.wareId,
                        depotName: _this.value,
                        customerId: Number(sessionStorage.getItem('webCustomerId')),
                        group: {
                            groupName: _this.collectionNames,
                            deliveryDate: _this.value1,
                            orderIds: arr
                        }
                    });
                    console.log(collName);
                    _this.$http.post(this.global.lightningUrl + "/companyv1/trunkCenter/groupOrder/create", collName, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.errcode === 0) {
                            _this.$message({
                                type: 'success',
                                message: response.data.message
                            });
                            _this.warehouseTableSearch();
                            _this.dialogVisible = false;
                            _this.calculateInit();
                            _this.initData();
                        } else {
                            _this.$message.error(response.data.message);
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });

                }).catch(_ => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
                if ((_this.value !== "" || _this.value !== null) || (_this.value1 !== "" || _this.value1 !== null)) {
                    this.isbut = true;
                } else {
                    this.isbut = false;
                }

            },
            close() {
                this.dialogVisible = false
            },
            creation() {
                let _this = this;
                if (_this.value === "" || _this.value === null || _this.value1 === "" || _this.value1 === null) {
                    _this.$message.warning("仓库名与配送日期不能为空!");
                    return;
                }
                if (!_this.addCollOrder.length && !_this.checkedCities.length) {
                    _this.$message({
                        showClose: true,
                        message: '至少选中一个订单地址!',
                        type: 'warning'
                    });
                    return;
                }
                //console.log(this.addCollOrder);
                _this.dialogVisible = true;
                _this.isbut = true;
            },
            handleDelete(index, rows) {
                console.log(index, rows);
                let _this = this;
                let deleteColle = JSON.stringify({
                    token: _this.token,
                    groupId: _this.collections[index].groupId
                });
                console.log(deleteColle);
                this.$confirm('确认取消？')
                    .then(() => {
                        _this.$http.post(this.global.lightningUrl + "/cmsv1/trunkCenter/groupOrder/edit", deleteColle, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(function (response) {
                            console.log(response);
                            if (response.data.errcode === 0) {
                                _this.$message.success(response.data.message);
                                _this.collections.splice(index, 1);
                                _this.warehouseTableSearch();
                            } else {
                                _this.$message(response.data.message);
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }).catch(() => {
                });
            },
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
            },
            handleCurrentChange(currentPage) {
                console.log(currentPage);
                this.currentPage = currentPage;
            },
            warehouseTableSearch() {
                map.clearMap();
                let _this = this;
                this.calculateInit();
                this.makerArray = [];
                this.checkedCities = [];
                this.addCollOrder = [];
                markers = [];
                repeatmarkers = [];
                if (this.value === '') {
                    _this.$message({
                        showClose: true,
                        message: '请选择仓库!',
                        type: 'warning'
                    });
                    this.isbut = false;
                    return;
                }
                if (this.value1 === '' || this.value1 === null) {
                    this.value1 = getNowTime()
                }
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].depotName == this.value) {
                        this.toUseCarWareId = this.options[i].id;
                        this.toUseCarValue = this.value;
                        break;
                        // this.wareAddres=this.options[i].location.address
                    }
                }

                let orders = JSON.stringify({
                    token: this.token,
                    deliveryDate: this.value1,
                    depotId: this.wareId,
                    customerId: Number(sessionStorage.getItem('webCustomerId'))
                });
                //
                console.log(orders);
                this.$http.post(this.global.lightningUrl + "/cmsv1/trunkCenter/groupOrder/get", orders, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    console.log(res);
                    _this.collections = res.data.result.formgroupOrder;
                    if (res.data.result.chartgroupOrder.length) {
                        this.isbut = true;
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '暂无订单！',
                            type: 'warning'
                        });
                        this.isbut = false;
                        return;
                    }
                    _this.textBar = res.data.result.chartgroupOrder;
                    collectionMarker();
                    _this.drawInit();
                }).catch(res => {
                });

                function collectionMarker() {
                    datas = [];
                    AMapUI.loadUI(['misc/MarkerList'],
                        function (MarkerList) {
                            markerList = new MarkerList({
                                //关联的map对象
                                map: map,
                                //置空默认的选中行为，后续监听selectedChanged中处理
                                onSelected: null,
                                //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                                getPosition: function (dataItem) {
                                    return dataItem.position;
                                },
                                markerEvents: ['click', 'mouseover', 'mouseout'],
                                //返回数据项对应的Marker
                                getMarker: function (dataItem, context, recycledMarker) {
                                    //返回一个新的Marker
                                    //console.log(_this.isRepeatMarker2(context, data));
                                    if (_this.isRepeatMarker2(context, datas) === 0) {
                                        return new AMap.Marker({
                                            icon: 'data:image/png;base64,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',
                                            animation: "AMAP_ANIMATION_DROP",
                                        });
                                    }
                                    if (_this.isRepeatMarker2(context, datas)) {
                                        return new AMap.Marker({
                                            icon: 'data:image/png;base64,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',
                                            animation: "AMAP_ANIMATION_DROP",
                                        });
                                    }
                                    if (!_this.isRepeatMarker2(context, datas)) {
                                        return new AMap.Marker({
                                            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAuCAYAAABeUotNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yOVQwOToyMTo0MSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTItMTNUMTQ6MTg6NTkrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTItMTNUMTQ6MTg6NTkrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwNjYyNjgtYzQ3NS03YjQ2LTgyOTItNWM2NmFkYjYwNDlmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGJlZTMyOTEtYjdlNy1jMDQzLWE4NTgtZTRjMDg0MWM4MTQxIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTZhNTE5YWUtODc2MS03YzRlLWI3MjItMWJmNmVmNzVjYTVkIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLlpJrngrkiIHBob3Rvc2hvcDpMYXllclRleHQ9IuWkmueCuSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTZhNTE5YWUtODc2MS03YzRlLWI3MjItMWJmNmVmNzVjYTVkIiBzdEV2dDp3aGVuPSIyMDE4LTA2LTI5VDA5OjIxOjQxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjA2NjI2OC1jNDc1LTdiNDYtODI5Mi01YzY2YWRiNjA0OWYiIHN0RXZ0OndoZW49IjIwMTgtMTItMTNUMTQ6MTg6NTkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5BXcKQAACH1JREFUWIW1mX1sFMcVwH+3vsPmzhcMPhsT83VAHEOMUigkQJraIKskxiptIX8kJgJFBSSIRGlR1YqiSm1FKzVEAkrBpVTBtWokUqHGQHBS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',
                                            animation: "AMAP_ANIMATION_DROP",
                                        });
                                    }
                                    if (_this.isRepeatMarker2(context, datas) === 1) {
                                        return new AMap.Marker({
                                            icon: 'data:image/png;base64,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',
                                            animation: "AMAP_ANIMATION_DROP",
                                        });
                                    }
                                }
                            });
                            markerList.on('markerMouseover markerMouseout ', function (event, changedInfo) {
                                if (event.type == 'markerMouseover') {
                                    _this.orderShow = changedInfo.data;
                                    _this.isorderShow = true;
                                    if (changedInfo.data.status === '已调度') {
                                        calculateDispatch(changedInfo.index)
                                    }
                                }
                                if (event.type == 'markerMouseout') {
                                    _this.isorderShow = false;
                                    if (changedInfo.data.status === '已调度') {
                                        _this.calculate()
                                    }
                                }
                            });
                            markerList.on('markerClick', function (event, changedInfo) {
                                // console.log(_this.textBar[changedInfo.index])
                                console.log(changedInfo);
                                if (_this.isRepeatMarker2(changedInfo, datas)) {
                                    _this.$message({
                                        showClose: true,
                                        message: '此订单已被调度,请重新选择!',
                                        type: 'warning'
                                    });
                                    calculateDispatch(changedInfo.index);
                                    return;
                                }
                                if (_this.isRepeatMarker2(changedInfo, datas) === 1) {
                                    _this.$message({
                                        showClose: true,
                                        message: '此订单已被调度,请重新选择!',
                                        type: 'warning'
                                    });
                                    calculateDispatch(changedInfo.index);
                                    return;
                                }
                                if (_this.isRepeatMarker([changedInfo.position.lng, changedInfo.position.lat], datas) > 1) {
                                    marker = new AMap.Marker({
                                        position: [changedInfo.position.lng, changedInfo.position.lat],
                                        map: map,
                                        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAuCAYAAABeUotNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yOVQwOToyMTo0MSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjMyZDBlNDctZTdlZi1jNjQyLTg5N2EtOGY1ZTgxMTQ3YmNhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MWFjOTVjNjMtNjk2ZS01ODRjLWI5OWEtMzNlNzEyM2NkY2MwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjliNmZhODYtZjIyYi0yMDRjLThlMGMtNzU1NzkzYzc5ZjExIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLlpJrngrkiIHBob3Rvc2hvcDpMYXllclRleHQ9IuWkmueCuSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjliNmZhODYtZjIyYi0yMDRjLThlMGMtNzU1NzkzYzc5ZjExIiBzdEV2dDp3aGVuPSIyMDE4LTA2LTI5VDA5OjIxOjQxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MzJkMGU0Ny1lN2VmLWM2NDItODk3YS04ZjVlODExNDdiY2EiIHN0RXZ0OndoZW49IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+smQ5fgAACIBJREFUWIW1mX1sU9cVwH9+sXGwYwhghxQCIZCywMJYBrRAyxJN0SgfKttg0lqYmKoBEq3E2NC0iaFJ28T2R6kEjEHKmNYsUpgoQmuAktJN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',
                                    });
                                    _this.pushRepeatMarker([changedInfo.position.lng, changedInfo.position.lat], datas);
                                    repeatmarkers.push(marker)
                                } else {
                                    marker = new AMap.Marker({
                                        position: [changedInfo.position.lng, changedInfo.position.lat],
                                        map: map,
                                        icon: 'data:image/png;base64,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',
                                    });
                                    _this.addCollOrder.push(
                                        _this.textBar[changedInfo.index],
                                    );
                                    markers.push(marker);
                                }
                                map.setCenter([changedInfo.position.lng, changedInfo.position.lat]);
                                _this.calculate();
                                _this.repeatMarkerCulate(_this);
                                marker.on('click', function (changedInfo) {
                                    console.log(changedInfo.target.Je.position);
                                    // console.log(markers[i].Je.position);
                                    if (_this.isRepeatMarker([changedInfo.target.Ke.position.lng, changedInfo.target.Ke.position.lat], datas) > 1) {
                                        for (let i = 0; i < repeatmarkers.length; i++) {
                                            if (repeatmarkers[i].Ke.position === changedInfo.target.Ke.position) {
                                                map.remove(repeatmarkers[i]);
                                                repeatmarkers.splice(i, 1);
                                                _this.deleteRepeatMarker([changedInfo.target.Ke.position.lng, changedInfo.target.Ke.position.lat], _this.makerArray);
                                            }
                                        }
                                    } else {
                                        for (let i = 0; i < markers.length; i++) {
                                            if (markers[i].Ke.position === changedInfo.target.Ke.position) {
                                                map.remove(markers[i]);
                                                markers.splice(i, 1);
                                                _this.addCollOrder.splice(i, 1);
                                            }
                                        }
                                    }
                                    _this.calculate();
                                    _this.repeatMarkerCulate(_this);
                                });
                            });

                            function calculateDispatch(index) {
                                _this.orderTotalUnits = _this.textBar[index].goodsTotalNum;
                                _this.orderTotalWeight = _this.textBar[index].totalWeight;
                                _this.orderTotalVolume = _this.textBar[index].totalVolume;
                                _this.orderTotalNums = 1;
                                // _this.addCollOrder=[];
                                // map.remove(markers);
                            }

                            //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPoisition
                            //console.log(_this.textBar);
                            for (let i = 0; i < _this.textBar.length; i++) {
                                if (_this.textBar[i].longitude !== 0 && _this.textBar[i].longitude !== 0) {
                                    datas.push({
                                        position: [_this.textBar[i].longitude, _this.textBar[i].latitude],
                                        orderId: _this.textBar[i].id,
                                        orderAddress: _this.textBar[i].deliveryAddr,
                                        orderSendDay: _this.value1,
                                        contactName: _this.textBar[i].consignee,
                                        contactMobile: _this.textBar[i].phone,
                                        status: _this.textBar[i].status,
                                        goodsTotalNum: _this.textBar[i].goodsTotalNum,
                                        totalVolume: _this.textBar[i].totalVolume,
                                        totalWeight: _this.textBar[i].totalWeight
                                    })
                                }
                            }
                            //展示该数据
                            console.log(datas);
                            markerList.render(datas);
                            map.setFitView();
                        });
                }

                //清除
                // map.clearMap();
            },
            //判断有重复坐标marker
            isRepeatMarker(str, arr) {
                let content = 0;
                for (let i = 0; i < arr.length; i++) {
                    if (str[0] === arr[i].position[0] && str[1] === arr[i].position[1]) {
                        content++;
                    }
                }
                return content;
            },
            isRepeatMarker2(str, arr) {
                let content = 0;
                let arrs = [];
                for (let i = 0; i < arr.length; i++) {
                    if (str.data.position[0] === arr[i].position[0] && str.data.position[1] === arr[i].position[1] && arr[i].status === "已调度") {
                        arrs.push(true);
                        content++;
                    }
                    if (str.data.position[0] === arr[i].position[0] && str.data.position[1] === arr[i].position[1] && arr[i].status === "未调度") {
                        arrs.push(false);
                        content++;
                    }
                }
                if (content > 1) {
                    return test(arrs)
                }

                function test(arr) {
                    for (let i = 0; i < arr.length; i++) {
                        if (!arr[i]) {
                            return false;
                        }
                    }
                    return true;
                }

                if (content == 1) {
                    for (let i = 0; i < arr.length; i++) {
                        if (str.data.position[0] === arr[i].position[0] && str.data.position[1] === arr[i].position[1] && arr[i].status === "未调度") {
                            content = 0;
                            break;
                        }
                        if (str.data.position[0] === arr[i].position[0] && str.data.position[1] === arr[i].position[1] && arr[i].status === "已调度") {
                            content = 1;
                            break;
                        }
                    }
                }
                return content;
            },
            pushRepeatMarker(str, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (str[0] === arr[i].position[0] && str[1] === arr[i].position[1]) {
                        this.makerArray.push(arr[i])
                    }
                }
            },
            deleteRepeatMarker(str, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (str[0] === arr[i].position[0] && str[1] === arr[i].position[1]) {
                        this.makerArray.splice(i--, 1);
                    }
                }
            },
            drawInit() {
                let _this = this;
                mouseTool.on('draw', function (e) {
                    //_this.addCollOrder=[];
                    //map.remove(overlays);
                    overlays.push(e.obj);
                    let arr = e.obj.getPath();
                    for (let i = 0; i < _this.textBar.length; i++) {
                        if (AMap.GeometryUtil.isPointInRing([_this.textBar[i].longitude, _this.textBar[i].latitude], arr) && _this.textBar[i].status !== '已调度') {
                            for (let j = 0; j < markers.length; j++) {
                                if (_this.textBar[i].longitude === markers[j].Ke.position.lng && _this.textBar[i].latitude === markers[j].Ke.position.lat) {
                                    map.remove(markers[j]);
                                    markers.splice(j, 1)
                                }
                            }
                            for (let z = 0; z < repeatmarkers.length; z++) {
                                if (_this.textBar[i].longitude === repeatmarkers[z].Ke.position.lng && _this.textBar[i].latitude === repeatmarkers[z].Ke.position.lat) {
                                    map.remove(repeatmarkers[z]);
                                    repeatmarkers.splice(z, 1)
                                }
                            }
                            if (_this.isRepeatMarker([_this.textBar[i].longitude, _this.textBar[i].latitude], datas) > 1) {
                                marker = new AMap.Marker({
                                    position: [_this.textBar[i].longitude, _this.textBar[i].latitude],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAuCAYAAABeUotNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGc2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNi0yOVQwOToyMTo0MSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjMyZDBlNDctZTdlZi1jNjQyLTg5N2EtOGY1ZTgxMTQ3YmNhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MWFjOTVjNjMtNjk2ZS01ODRjLWI5OWEtMzNlNzEyM2NkY2MwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjliNmZhODYtZjIyYi0yMDRjLThlMGMtNzU1NzkzYzc5ZjExIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLlpJrngrkiIHBob3Rvc2hvcDpMYXllclRleHQ9IuWkmueCuSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjliNmZhODYtZjIyYi0yMDRjLThlMGMtNzU1NzkzYzc5ZjExIiBzdEV2dDp3aGVuPSIyMDE4LTA2LTI5VDA5OjIxOjQxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MzJkMGU0Ny1lN2VmLWM2NDItODk3YS04ZjVlODExNDdiY2EiIHN0RXZ0OndoZW49IjIwMTgtMTItMTNUMTQ6MjA6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+smQ5fgAACIBJREFUWIW1mX1sU9cVwH9+sXGwYwhghxQCIZCywMJYBrRAyxJN0SgfKttg0lqYmKoBEq3E2NC0iaFJ28T2R6kEjEHKmNYsUpgoQmuAktJN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',
                                    zoom: 13
                                });
                                repeatmarkers.push(marker);
                                map.add(marker);
                                _this.pushRepeatMarker([_this.textBar[i].longitude, _this.textBar[i].latitude], datas);
                            }
                            if (_this.isRepeatMarker([_this.textBar[i].longitude, _this.textBar[i].latitude], datas) <= 1) {
                                marker = new AMap.Marker({
                                    position: [_this.textBar[i].longitude, _this.textBar[i].latitude],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                    icon: 'data:image/png;base64,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',
                                    zoom: 13
                                });
                                markers.push(marker);
                                map.add(marker);
                                _this.addCollOrder.push(_this.textBar[i]);
                            }
                            console.log(repeatmarkers);
                            marker.on('click', function (changedInfo) {
                                if (_this.isRepeatMarker([changedInfo.target.Ke.position.lng, changedInfo.target.Ke.position.lat], datas) > 1) {
                                    for (let i = 0; i < repeatmarkers.length; i++) {
                                        if (repeatmarkers[i].Ke.position === changedInfo.target.Ke.position) {
                                            map.remove(repeatmarkers[i]);
                                            repeatmarkers.splice(i, 1);
                                            _this.deleteRepeatMarker([changedInfo.target.Ke.position.lng, changedInfo.target.Ke.position.lat], _this.makerArray);
                                        }
                                    }
                                } else {
                                    for (let i = 0; i < markers.length; i++) {
                                        if (markers[i].Ke.position === changedInfo.target.Ke.position) {
                                            map.remove(markers[i]);
                                            markers.splice(i, 1);
                                            _this.addCollOrder.splice(i, 1);
                                        }
                                    }
                                }
                                _this.calculate();
                                _this.repeatMarkerCulate(_this);
                            })
                        }
                    }
                    map.setFitView();
                    mouseTool.close(true);

                    function dedupe(array) {
                        //数组去重
                        return Array.from(new Set(array));
                    }

                    _this.addCollOrder = dedupe(_this.addCollOrder);
                    _this.makerArray = dedupe(_this.makerArray);
                    _this.calculate();
                    _this.repeatMarkerCulate(_this);
                    //console.log(_this.addCollOrder, _this.makerArray);
                    // console.log(markers);
                });

                // if(e.obj.contains(zb[i])){
                //  arrs.push(zb[i]);//判断方式二 Marker是否在图形范围内
                //}
            },
            selectMode(type) {
                if (type === 1 && this.isStart) {
                    mouseTool.rectangle({
                        fillColor: '#00b0ff',
                        strokeColor: '#80d8ff'
                        //同Polygon的Option设置
                    });
                    return;
                }
                if (type === 2 && this.isStart) {
                    mouseTool.circle({
                        fillColor: '#00b0ff',
                        strokeColor: '#80d8ff'
                        //同Circle的Option设置
                    });
                    return;
                }
                if (type === 3 && this.isStart) {
                    mouseTool.polygon({
                        fillColor: '#00b0ff',
                        strokeColor: '#80d8ff'
                        //同Polygon的Option设置
                    });
                }
            },
            start() {
                if (!this.textBar.length) {
                    this.$message({
                        message: '请先查询订单!',
                        type: 'warning'
                    });
                    return;
                }
                this.isStart = true;
                this.selectMode(this.radio);
            },
            ends() {
                this.isStart = false;
                this.addCollOrder = [];
                map.remove(markers);
                markers = [];
                /* console.log(markers);
                 console.log(this.addCollOrder);*/
            },
            initData() {
                let _this = this;

                let orders = JSON.stringify({
                    token: _this.token,
                    deliveryDate: _this.value1,
                    depotId: _this.wareId,
                    customerId: Number(sessionStorage.getItem('webCustomerId'))
                });
                console.log(orders);
                _this.$http.post(_this.global.lightningUrl + "/cmsv1/trunkCenter/groupOrder/create", orders, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    console.log(res);
                    _this.collections = res.data.result.formgroupOrder;

                }).catch(res => {
                });
            },
            revisedTable() {
                let _this = this;
                this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
                let name = JSON.stringify({
                    token: _this.token,
                    userId: Number(sessionStorage.getItem('webCustomerId'))
                });
                this.$http.post(this.global.lightningUrl + "/companyv1/depotManage/depot/all_depot_name", name, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    console.log(res);
                    _this.options = res.data.result;
                }).catch(res => {
                });

            },
            init: function () {
                let _this = this;
                let onModeChange;
                let geolocation;
                _this.loading();
                AMapUI.loadUI(['misc/PositionPicker', 'misc/PoiPicker'], function (PositionPicker, PoiPicker) {
                    map = new AMap.Map('container', {
                        zoom: 16,
                        scrollWheel: true
                    });
                    // 加载定位插件，实现定位功能
                    map.plugin('AMap.Geolocation', function () {
                        geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true,//是否使用高精度定位，默认:true
                            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                            showButton: true,        //显示定位按钮，默认：true
                            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角  cent
                            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                            zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        });
                        map.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', function (data) {
                            map.setCenter(data.position);
                            data.position.getLng(); //定位成功返回的经度
                            data.position.getLat() //定位成功返回的纬度
                        }); //返回定位信息
                        AMap.event.addListener(geolocation, 'error', function (data) {
                            console.log(data)
                        });
                    });

                    // 拖拽选址
                    let positionPicker = new PositionPicker({
                        mode: 'dragMap',
                        map: map,
                        iconStyle: {//自定义外观
                            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAyCAYAAADSprJaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAO1SURBVHja7JhfaFNXHMc/994mrTXVRWzmmrbD2qkYFRGMMAp7EkGkUlSQ7WHDFx/mk6JF4h8EQ6How0AQH5SNYUEWhYkPDn0R1NKgguAgc47MDm0ma+Nq+seYm/hyUm/uPWnvTW8mjHwhDzl/fueT3/n9zjm/KJtCIWzKC2wBuoEvgFWSMb8Bt4FrwE0ga8ewYgNiAbAfiACLsa9/gShwFpiabaA6h6EeIAH0OwRAjO8X83scQcQjaeKRNMBx4CrQzvzULuwcN9guUZ1sVjjqvwR8Wc5qc1OezctzNHoLrAjoJEY0JrMK8aSH9KRSbtrJcNS/Jh5J77ETEyeFFyzaGsry1eZpVn+il/3ZD4fr+OFeA4N/eMoNiQJHZ4PYBfxknrVsUZ6+nROEWnK29+D+n3Uc+3khoxlp2O0BLssgfCKIgsbRG9pynN6dYdGCguNgSI2rHI75SIxoli7gMyBjDswDZoA2f75igKIHz+zO0NyUt3SJ9UqyYwlwqCRtFOjbWTmAMYj7d03Iug6JdWcgesR2zGjHhjes/FjHDYVacmwNWQ5Pn4jBEogSL3z9+TRuam+X1F63EaLL2LO+NUfLR3lXIZYv1ekMWDzbVYQImo/kNQ5S0Yk2tudkR3tQBZrNPW3+fFUgWv3SGFummgMSwNdQqApEo1d+S6uya3Yyq1QFYlq+y1MqMGZuffFKrQpEGbtjKpAsHp9FDSU9VYF4OGyxmwGSRbRBY09iRCM1rrruBckdMmg8J26YeweGGlyFuHhXau+GEWLA/Ci98qCev9LueOPJ3xrXH9Wbm3Wx7gxEqthQ1FsdemO+eWdKelLhyBUfeWvW/yjWLbnKT5gD9OlLjd7YwopBxqcUemM+mUczYj0AtGAgYHyivwa2GUc/f6Vx56mHcMdbFju41hMjGt8ONPH7S03WfVDUJRYIgDjQBmwsSeQJldj9BkYnVDoDOr768jDJfzS+u9VI/y+NvJ6WevDCXG/MYqV1XVRbUnUGdNYFc6wI6Hg0mMoqPBtVGUp65jrobgLbzUlggYhH0oSjfi9wHvjGxSz9HtgXj6Sz4ajfURm4H+iTXXIOlAGOiHKwojLwLNABnBN57US6mNcxG4Ddgtj4Qu4Wny0idszKin2/Jj4pt6rycloC/CrgUkBIdiPb0XzO5TFDlGcrBQBQCoXKXlHhtWsBnomqexj4NP74Mf+1J1xTDaIGUYOoQdQg/v8Q4vKy3V5tT2hu2JnP5Ku8/9+zFTj1ISC8c3y3rXcDAMK9Doy6LPOAAAAAAElFTkSuQmCC',
                            // url:'src/images/asd.png',//图片地址
                            size: [33, 50],  //要显示的点大小，将缩放图片
                            ancher: [17, 45],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                        }
                    });
                    positionPicker.on('success', function (positionResult) {
                        _this.lat = (positionResult.position.lat);
                        _this.lng = (positionResult.position.lng);
                        _this.province = positionResult.regeocode.addressComponent.province;
                        _this.city = positionResult.regeocode.addressComponent.city;
                        _this.area = positionResult.regeocode.addressComponent.district;
                        _this.$refs.nearpoi.innerHTML = positionResult.nearestPOI;
                        _this.$refs.addressText.innerHTML = positionResult.address;
                        _this.cententAddress = positionResult.address;
                    });
                    positionPicker.on('fail', function (positionResult) {
                        _this.$refs.nearpoi.innerHTML = '当前定位失败';
                        _this.$refs.addressText.innerHTML = '当前定位失败';
                    });
                    onModeChange = function (e) {
                        positionPicker.setMode(e.target.value);
                    };

                    positionPicker.start();
                    map.panBy(0, 1);

                    map.plugin(["AMap.MouseTool","AMap.ToolBar"], function () {
                        mouseTool = new AMap.MouseTool(map);
                        map.addControl(new AMap.ToolBar({
                            liteStyle: true,
                            position: 'LB',
                            offset: new AMap.Pixel(0, 150)
                        }));
                    });
                    // console.log(mouseTool);
                });
                setTimeout(() => {
                    loading.close();
                }, 500);
            }, loading() {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.7)',
                    target: document.querySelector('.container_border')
                });
            }
        },
        mounted() {
            this.init();
            this.revisedTable();
        }
    };

</script>







