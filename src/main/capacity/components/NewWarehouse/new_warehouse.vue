<template>
  <div class="containers con main">
    <div class="container_border" style="padding-bottom:30px">
      <el-row :gutter="10" >
        <el-col :span="1.5" >
          <span>仓库名称</span>
        </el-col>
        <el-col :span="3"><input type="text"  v-model="warehouseName"   placeholder="请输入仓库名称..." @change="regWare" ></el-col>
        <el-col :span="1.5" >
          <span class="marLeft">所在区域</span>
        </el-col>
        <el-col :span="5">
          <el-cascader
            style="width:90%"
            placeholder="请选择区域..."
            :options="options"
            clearable
            v-model="china"
            @change="handleChange"
          ></el-cascader>
        </el-col>
        <el-col :span="1.5" >
          <span  style="margin-left:-20px;" >详细地址</span>
        </el-col>
        <el-col :span="5">
          <input type="text" ref="addresss"  name="search"  @change="chan"  id="search"  placeholder="请输入详细地址..."  v-model="address">
        </el-col>

          <el-button class="contentBtn btn" type="primary" @click="warehouseSubmit"  >创建仓库</el-button>

      </el-row>
      <el-row :gutter="10" style="margin-left:10px">
        <el-col :span="1.5">
          <span v-text="name">联系人</span>
        </el-col>
        <el-col :span="3" >
          <input type="text" v-model="name1" placeholder="请输入联系人名称..."  :class="mar">
        </el-col>
        <el-col :span="1.5">
          <span  class="marLeft" v-text="phone">联系人</span>
        </el-col>
        <el-col :span="3" >
          <input type="text" v-model="phone1" placeholder="请输入联系人手机..."  :class="mar" >
        </el-col>
        <el-col :span="2" >
          <i @click="addShow=true; add()"  v-show="!addShow" class="iconfont icon-tianjia1" ></i>
        </el-col>
        <el-col :span="2" >
          <i @click="addShow2=true; add()" v-show="addShow" class="iconfont icon-tianjia1" ></i>
        </el-col>
      </el-row>

      <el-row  :gutter="10" v-show="addShow" style="margin-left:10px">
        <el-col :span="1.5">
          <span  v-text="name"></span>
        </el-col>
        <el-col :span="3" >
          <input type="text" v-model="name2"   :class="mar">
        </el-col>
        <el-col :span="1.5">
          <span  class="marLeft" v-text="phone"></span>
        </el-col>
        <el-col :span="3" >
          <input type="text" v-model="phone2"  :class="mar" >
        </el-col>
        <el-col :span="3" >
          <i @click="addShow=!addShow; subtra()" class="iconfont icon-delete" ></i>
        </el-col>
      </el-row>

      <el-row  :gutter="10" v-show="addShow2" style="margin-left:10px">
        <el-col :span="1.5">
          <span  v-text="name"></span>
        </el-col>
        <el-col :span="3" >
          <input  type="text" v-model="name3"  :class="mar" >
        </el-col>
        <el-col :span="1.5">
          <span class="marLeft" v-text="phone"></span>
        </el-col>
        <el-col :span="3" >
          <input type="text" v-model="phone3" :class="mar">
        </el-col>
        <el-col :span="3" >
          <i @click="addShow2=!addShow2; subtra()" class="iconfont icon-delete" ></i>
        </el-col>
      </el-row>
      <div class="mlayout">
        <div id="container" class="map" tabindex="0"></div>
        <!--<div class='tips'>-->
          <!--<input type="text" name="search"    placeholder="输入关键字搜索地址"/>-->
        <!--</div>-->
        <ul class="addressDels">
          <li class="poi">
            <div>
              <span>最近的POI：</span>
              <p class="nearpoi" ref="nearpoi"></p>
            </div>
          </li>
          <li class="address">
            <div>
              <span>地址：</span>
              <p class="infos" ref="addressText"></p>
            </div>
          </li>
        </ul>
        <p class="prompt">提示：可通过搜索框或拖动地图选择仓库位置!</p>
      </div>
    </div>
  </div>

</template>
<style lang="scss">
  .con{
    .el-row{
      margin:0 0 15px 0;
      font-size: 16px;
    }
    .el-row .el-col .marLeft{
      margin-left: 60px;
    }
   .el-row .el-col span{
      line-height: 44px;
    }
     input {
      width: 100%;
      height: 42px;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 50px;
      line-height: 42px;
      text-align: left;
      padding-left:20px;
    }
    .btn{
      /*position: relative;*/
      /*left: 50px;*/
      /*padding: 0 40px;*/
      margin-left: 40px;
    }
    .iconfont{
      cursor: pointer;
    }
    .icon-tianjia1{
      font-size:30px;
      position: relative;
      top:6px;
      left:20px;
      opacity: 0.6;
    }
    .icon-delete{
      font-size:28px;
      position: relative;
      top:6px;
      left:20px;
      opacity: 0.75;
    }
    input::placeholder{
      color:#c0c4cc
    }
    .el-input {
      position: relative;
      font-size: 16px;
      display: inline-block;
      width: 100%;
      /*height: 42px;*/
      /*border: 1px solid rgba(0,0,0,0.1);*/
      /*border-radius: 50px;*/
      /*line-height: 42px;*/
      /*text-align: left;*/
      /*padding-left:20px;*/
    }
    .el-input .el-input__inner {
      padding-left:30px;
    }
    .contact {
      margin:15px 0 0 0;
      position: relative;
      left: 6px;
    }

    .contact .linkman {
      margin: 0 25px 15px 10px;
    }

    .mlayout {
      position: relative;
      #container {
        height:550px;
        width: 100%;
      }
      .prompt {
        font-weight: bold;
        letter-spacing:1px;
        font-size: 14px;
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 0 20px;
        height:44px;
        line-height:44px;
        background: #fff;
        border-radius:10px;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
      }
      .tips {
        padding-left: 3%;
        padding-right: 3%;
        position: absolute;
        left: 0;
        right: 0;
        top: 10px;
        margin: 0 auto;
        width: 30%;
        border: none;
        border-bottom: 1px solid #eee;
        input {
          width: 100%;
          line-height: 40px;
          height: 40px;
          border: none;
          outline: none;
          text-indent: 20px;
          border-radius: 20px;
          box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);;
        }
        span {
          width: 15%;
          text-align: center;
          height: 2.5rem;
          line-height: 2.5rem;
          color: #757575;
        }
      }
      .addressDels {
        letter-spacing:2px;
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20%;
        background: #fff;
        padding:12px;
        list-style: none;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        li {
          width: 100%;
          margin: 0 0 5px 0;
          span {
            display: block;
            font-size: 15px;
            margin: 0 0 5px 0;
            font-weight: bold;
            letter-spacing:2px;
          }
          p {
            line-height: 20px;
          }
          a {
            cursor: pointer;
            display: block;
            width:50%;
            margin: 10px auto;
            height: 40px;
            line-height:40px;
            background: #ffa10e;
            color: #fff;
            text-align: center;
            border-radius: 40px;
          }
        }
      }
    }
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
      }
    }
  }

</style>
<script>
  let map;
  let placeSearch;
  let city;
  let poiPicker;
  let loading;
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,TextToCode} from 'element-china-area-data';
  import {regWarehouse,contactsNewName,regNewPhone,regAddress} from '../../../../js/newWarehouse';
  export default {
    data() {
      return {
          userId:'',
        users:'',
        china:[],
        options:regionData,
        tabShow:false,
        warehouseName: '',
        province: '',
        city: '',
        area: '',
        address: '',
        lat:'',
        lng:'',
        z:1,
        mar:'linkman',
        successWarehouse:false,
        successContactsNames:false,
        successContactsPhone:false,
        successWarehouses:false,
        successAddress:false,
        addShow:false,
        addShow2:false,
        name:'联系人',
        phone:'联系电话',
        name1:'',
        phone1:'',
        name2:'',
        phone2:'',
        name3:'',
        phone3:'',
        value:[],
        choose:false,
        isAddress:''
      };
    },

    methods: {
      chan(){
        this.choose= true
      },
      handleChange (value) {
        let _this=this;
        _this.choose= false;
        _this.province=CodeToText[value[0]];
        _this.city=CodeToText[value[1]];
        _this.citys=CodeToText[value[1]];
        _this.area=CodeToText[value[2]];
        _this.address=this.province+this.city+this.area;
        console.log(_this.china);
        if(_this.province===undefined){
          _this.address=''
        }
        console.log(this.province,this.city,this.area);
        AMap.service(["AMap.PlaceSearch"], function() {
          placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize:1,
            map: map,
            input:searchs,
            city: _this.city,
          });
          //清除覆盖物
          map.clearMap();
          //清除搜索结果
          placeSearch.clear();
          //关键字查询
          placeSearch.search(_this.province+_this.city+_this.area);
        });
      },
      regWare:function(){
          this.userId = sessionStorage.getItem('webCustomerId');
         regWarehouse(this,this.warehouseName,this.userId);
      },
      subtra(){
        this.z--;
        console.log(this.z);
        if(this.z<=1){
          this.name2='';
          this. phone2=''
        }
        if(this.z<=2){
          this.name3='';
          this. phone3=''
        }
      },
      add: function () {
        this.z++;
        if(this.z>3){
          this.$message.error('联系资料不能超过3组');
          this.z=3
        }
      },
      init: function (){
        let _this = this;
        let onModeChange;
        let geolocation;
        _this.loading();
        map = new AMap.Map('container', {
          zoom:16,
          scrollWheel: true
        });
        AMapUI.loadUI(['misc/PositionPicker', 'misc/PoiPicker'], function (PositionPicker, PoiPicker) {
          // 加载定位插件，实现定位功能
          // AMap.plugin('AMap.Geolocation', function () {
          //   geolocation= new AMap.Geolocation({
          //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
          //     timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          //     maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          //     convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          //     showButton: true,        //显示定位按钮，默认：true
          //     buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          //     showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          //     showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          //     panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          //     zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          //   });
          //   map.addControl(geolocation);
          //   geolocation.getCurrentPosition();
          //   AMap.event.addListener(geolocation, 'complete', function (data) {//返回定位信息
          //     map.setCenter(data.position);
          //     // console.log(data.formattedAddress);
          //     data.position.getLng(); //定位成功返回的经度
          //     data.position.getLat() //定位成功返回的纬度
          //     // console.log(data)
          //     // console.log(data.position.getLng(),data.position.getLat())
          //   }); //返回定位信息
          //   AMap.event.addListener(geolocation, 'error', function (data) { //返回定位出错信息
          //     console.log(data);
          //     _this.$refs.addressText.innerHTML = '定位失败!';
          //   });
          // });

          // 搜索选址

          poiPicker = new PoiPicker({
            input: 'search',
            placeSearchOptions: {
              map: map,
              pageSize: 6 ,//关联搜索分页
              city:''
            }
          });
          poiPicker.on('poiPicked', function (poiResult) {
            poiPicker.hideSearchResults();
            _this.lat = poiResult.item.location.lat;
            _this.lng = poiResult.item.location.lng;

            _this.$refs.nearpoi.innerHTML = poiResult.item.name;

            _this.address=poiResult.item.address;

            _this.$refs.addresss.value = poiResult.item.address;
            map.panTo([_this.lng, _this.lat]);
          });

          // 拖拽选址
          let positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map,
            iconStyle:{//自定义外观
                url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAyCAYAAADSprJaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAO1SURBVHja7JhfaFNXHMc/994mrTXVRWzmmrbD2qkYFRGMMAp7EkGkUlSQ7WHDFx/mk6JF4h8EQ6How0AQH5SNYUEWhYkPDn0R1NKgguAgc47MDm0ma+Nq+seYm/hyUm/uPWnvTW8mjHwhDzl/fueT3/n9zjm/KJtCIWzKC2wBuoEvgFWSMb8Bt4FrwE0ga8ewYgNiAbAfiACLsa9/gShwFpiabaA6h6EeIAH0OwRAjO8X83scQcQjaeKRNMBx4CrQzvzULuwcN9guUZ1sVjjqvwR8Wc5qc1OezctzNHoLrAjoJEY0JrMK8aSH9KRSbtrJcNS/Jh5J77ETEyeFFyzaGsry1eZpVn+il/3ZD4fr+OFeA4N/eMoNiQJHZ4PYBfxknrVsUZ6+nROEWnK29+D+n3Uc+3khoxlp2O0BLssgfCKIgsbRG9pynN6dYdGCguNgSI2rHI75SIxoli7gMyBjDswDZoA2f75igKIHz+zO0NyUt3SJ9UqyYwlwqCRtFOjbWTmAMYj7d03Iug6JdWcgesR2zGjHhjes/FjHDYVacmwNWQ5Pn4jBEogSL3z9+TRuam+X1F63EaLL2LO+NUfLR3lXIZYv1ekMWDzbVYQImo/kNQ5S0Yk2tudkR3tQBZrNPW3+fFUgWv3SGFummgMSwNdQqApEo1d+S6uya3Yyq1QFYlq+y1MqMGZuffFKrQpEGbtjKpAsHp9FDSU9VYF4OGyxmwGSRbRBY09iRCM1rrruBckdMmg8J26YeweGGlyFuHhXau+GEWLA/Ci98qCev9LueOPJ3xrXH9Wbm3Wx7gxEqthQ1FsdemO+eWdKelLhyBUfeWvW/yjWLbnKT5gD9OlLjd7YwopBxqcUemM+mUczYj0AtGAgYHyivwa2GUc/f6Vx56mHcMdbFju41hMjGt8ONPH7S03WfVDUJRYIgDjQBmwsSeQJldj9BkYnVDoDOr768jDJfzS+u9VI/y+NvJ6WevDCXG/MYqV1XVRbUnUGdNYFc6wI6Hg0mMoqPBtVGUp65jrobgLbzUlggYhH0oSjfi9wHvjGxSz9HtgXj6Sz4ajfURm4H+iTXXIOlAGOiHKwojLwLNABnBN57US6mNcxG4Ddgtj4Qu4Wny0idszKin2/Jj4pt6rycloC/CrgUkBIdiPb0XzO5TFDlGcrBQBQCoXKXlHhtWsBnomqexj4NP74Mf+1J1xTDaIGUYOoQdQg/v8Q4vKy3V5tT2hu2JnP5Ku8/9+zFTj1ISC8c3y3rXcDAMK9Doy6LPOAAAAAAElFTkSuQmCC',
              // url:'./src/images/asd.png',//图片地址
              size:[33,50],  //要显示的点大小，将缩放图片
              ancher:[17,45],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
            },
          });
          positionPicker.on('success', function (positionResult) {
            console.log(positionResult);
            _this.lat= (positionResult.position.lat);
            _this.lng = (positionResult.position.lng);
            _this.province = positionResult.regeocode.addressComponent.province;
            _this.city = positionResult.regeocode.addressComponent.city;
            _this.area = positionResult.regeocode.addressComponent.district;
            console.log( _this.city,_this.area);
            if(_this.city===''){
              _this.citys='市辖区';
              _this.china=[TextToCode[_this.province].code,TextToCode[_this.province][_this.citys].code,TextToCode[_this.province][_this.citys][ _this.area].code];
            }else{
              _this.china=[TextToCode[_this.province].code,TextToCode[_this.province][_this.city].code,TextToCode[_this.province][_this.city][ _this.area].code];
            }

            if(_this.choose===true){
              _this.address=positionResult.address;
            }else{
              _this.address=_this.province+_this.city+_this.area;
            }
            _this.isAddress = positionResult.address;

            _this.$refs.nearpoi.innerHTML = positionResult.nearestPOI;
            _this.$refs.addressText.innerHTML = positionResult.address;
            _this.$refs.addresss.value = positionResult.address;
          });
          map.on('dragstart',function () {
            _this.choose= true;
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
          AMap.plugin('AMap.ToolBar',function(){//异步加载插件
              map.addControl(new AMap.ToolBar({
                  liteStyle: true
              }));
          });
        });
        setTimeout(() => {
          loading.close();
        }, 500);
      },
      warehouseSubmit: function () {
        let _this=this;
        //联系人数组
        // let contactList=[];
        // contactList.push(
        //   {name:_this.name1,phone:_this.phone1},
        // );
        //sessionStorage解密

        this.users=JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        if(_this.city === ''||_this.city ==='市辖区'){
          _this.city = _this.province;
        }
        let params={
          token:_this.users.result.token,
          depotName:_this.warehouseName,
          province:_this.province,
          city:_this.city,
          area:_this.area,
          address:_this.address,
          longitude:_this.lng,
          latitude:_this.lat,
          userId:Number(sessionStorage.getItem('webCustomerId')),
        };
        if(_this.name1!==''&&_this.phone1!==''){
          params.firstContact=_this.name1;
          params. firstTel=_this.phone1;
        }
        if(_this.name1!==''&&_this.phone1!==''&&_this.name2!==''&&_this.phone2!==''){
          params.firstContact=_this.name1;
          params.firstTel=_this.phone1;
          params.secondContact=_this.name2;
          params.secondTel=_this.phone2;
        }

        if(_this.name1!==''&&_this.phone1!==''&&_this.name2!==''&&_this.phone2!==''&&_this.name3!==''&&_this.phone3!==''){
          params.firstContact=_this.name1;
          params.firstTel=_this.phone1;
          params.secondContact=_this.name2;
          params.secondTel=_this.phone2;
          params.thirdContact=_this.name3;
          params.thirdTel=_this.phone3;
        }
        console.log(_this.users.result.token);
        console.log(JSON.stringify(params));
        let isAddress=JSON.stringify({
          address:_this.address,
          token:_this.users.result.token,
              userId:Number(sessionStorage.getItem('webCustomerId')),
        });
          console.log(isAddress);
          _this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/check_address" ,isAddress,{
            headers:{
              'Content-Type': 'application/json;charset=UTF-8',
            }
          }
        ).then(function (response) {
          console.log(response);
          if(response.data.errcode===0){
            createWarehouse()
          }else{
            _this.$message.error(response.data.message);
          }
         }).catch(function (error) {
            console.log(error);
         });

            function createWarehouse(){
              //判断所有资料是否为空，排除联系资料
              if(_this.warehouseName==='') {
                _this.$message.error('仓库名不能为空');
                return
              }
              if(_this.address==='') {
                _this.$message.error('详细地址不能为空');
                return
              }
              if(_this.province===undefined||_this.province===''){
                _this.$message.error('区域资料不能为空');
                return
              }
              if (!regAddress(_this,_this.address)) {
                _this.$message.error('配送地址要求长度2-50位,或不能包含特殊字符!');
                return;
              }
                //判断第一行联系资料是否为空
              if (_this.name1 === '' || _this.phone1 === '') {
                _this.$message.error('联系资料不能为空');
                return;
              }
              if (!_this.successWarehouse) {
                _this.$message.error('仓库名重复，请检查');
                return;
              }
              if (!_this.successWarehouses) {
                _this.$message.error('仓库名要求长度2-10位,或不含特殊字符!');
                return;
              }

              if (!contactsNewName(_this,_this.name1)) {
                _this.$message.error('第一组联系人不含特殊字符，要求长度2-10位');
                return;
              }
              if (!regNewPhone(_this,_this.phone1)){
                _this.$message.error('第一组联系人电话格式不正确，请检查');
                return;
              }

              if(_this.addShow) {
                if (_this.name2===''||_this.phone2==='') {
                  _this.$message.error('第二组联系人资料不能为空!');
                  return;
                }
                if (!contactsNewName(_this, _this.name2)) {
                  _this.$message.error('第二组联系人不含特殊字符，要求长度2-10位');
                  return;
                }
                if (!regNewPhone(_this, _this.phone2)) {
                  _this.$message.error('第二组联系人电话格式不正确，请检查');
                  return;
                }
              }

              if(_this.addShow2){
                if (_this.name3===''||_this.phone3==='') {
                  _this.$message.error('第三组联系人资料不能为空!');
                  return;
                }
                if (!contactsNewName(_this, _this.name3)) {
                  _this.$message.error('第三组联系人不含特殊字符，要求长度2-10位');
                  return;
                }
                if (!regNewPhone(_this, _this.phone3)) {
                  _this.$message.error('第三组联系人电话格式不正确，请检查');
                  return;
                }
              }
                if (_this.lat === '' && _this.lng === '') {
                    _this.$message.warning('当前地址没有经纬度，无法创建仓库！');
                    return;
                }
                if (_this.address !== _this.isAddress) {
                    _this.$message.warning('当前输入地址位置与地图地址位置不匹配！');
                    _this.address = _this.isAddress;
                    return;
                }

                _this.$confirm('您是否要创建仓库?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    // center: true
                }).then(() => {
                    _this.$http.post(_this.global.lightningUrl + "/companyv1/depotManage/depot/create", params, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(function (response){
                        console.log(response);
                        _this.$message({
                            type: 'success',
                            message: _this.warehouseName + response.data.message
                        });
                    }).catch(function (error) {
                              console.log(error);
                            });

                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

              // _this.$confirm('您是否要创建仓库?', '提示', {
              //     confirmButtonText: '确定',
              //     cancelButtonText: '取消',
              //   type: 'warning',
              //   center: true
              // }).then(() => {
              //   _this.$http.post(this.global.lightningUrl + "/companyv1/depotManage/depot/create", params, {
              //     headers: {
              //       'Content-Type': 'application/json;charset=UTF-8'
              //     }
              //   }).then(function (response){
              //     console.log(response);
              //     _this.$message({
              //       type: 'success',
              //       message: _this.warehouseName + response.data.message
              //     });
              //   }).catch(function (error) {
              //       console.log(error);
              //     });
              // }).catch(() => {
              //   _this.$message({
              //     type: 'info',
              //     message: '已取消'
              //   });
              // });
          }
      },loading(){
        loading=this.$loading({
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
      // this.$http.get("/first").then(function (response) {
      //   console.log(response);
      //    _this.options=response.data.arr;
      // }).catch(function (error){
      //   console.log(error);
      // });
      let sss=document.getElementsByClassName('el-input__inner');
          sss[0].setAttribute('id','searchs');
    }
  };

</script>
