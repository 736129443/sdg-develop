<template>
  <div class="containers editors main">
    <div class="container_border">
    <!--<div class="clear"> <a v-show="types===''||types===undefined" class="contentBtn " @click="createOrder()" style="margin: 0 0 20px 0;">确认修正并提交</a ></div>-->
    <div class="mlayout">
      <div id="container" class="map" tabindex="0"></div>
      <div class='tip-third-party'>
        <input type="text" ref="searchs" @change="changed" name="search" id="search" value=""
               placeholder="输入关键字搜索地址或拖动地图选择位置"/>
        <el-button v-show="types==='收货方'"  @click="next('收货')">保存收货地址</el-button>
        <el-button v-show="types==='发货方'"  @click="next('发货')">保存发货地址</el-button>
        <!--<div v-show="types===''||types===undefined" class="contentBtn" style="width:16%;text-align: center;  float: right;margin: 5px 5px 0 0; padding: 0" @click="next('收货')">保存收货地址并下一个</div>-->
        <!--<div v-show="types===''||types===undefined" class="contentBtn" style="width:16%;text-align: center;  float: right;margin: 5px 5px 0 0; padding: 0" @click="next('发货')">保存发货地址并下一个</div>-->
        <el-button   @click="search()">搜索</el-button>
      </div>
      <ul class="addressDels" v-show="false">
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
        <li>
          <a  @click="next()">下一个</a >
        </li>
      </ul>
      <p class="prompt">提示：可通过搜索框或拖动地图选择订单位置</p>

      <div class="orderLists" ref="orderList">
        <ul class="orderList" ref="orderUl" >
          <li ref="order" :class="{'active':selected===key}"  v-for="(item,key) in selectOrderArray" @click="selecteds(key)" >
            <p >订单ID：<span :class="item.orderId===undefined?'red':'green'" >{{item.orderId===undefined?'无订单编号'+(key+1):item.orderId}}</span></p>
            <p v-show="types==='收货方'">收货地址:<span :class="item.consigneeAddress===''?'red':'green'">{{item.consigneeAddress===''?'暂无地址,请在地图选择...':item.consigneeAddress}}</span></p>
            <p v-show="types==='发货方'">发货地址:<span :class="item.consignorAddress===''?'red':'green'">{{item.consignorAddress===''?'暂无地址,请在地图选择...':item.consignorAddress}}</span></p>
            <!--<p v-show="types===''||types===undefined">收货地址:<span :class="item.consigneeAddress===''?'red':'green'">{{item.consigneeAddress===''?'暂无地址,请在地图选择...':item.consigneeAddress}}</span></p>-->
            <!--<p v-show="types===''||types===undefined">发货地址:<span :class="item.consignorAddress===''?'red':'green'">{{item.consignorAddress===''?'暂无地址,请在地图选择...':item.consignorAddress}}</span></p>-->
          </li>
        </ul>
      </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped >

  .editors{
    .mlayout {
      position: relative;
      #container {
        height:600px;
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
        height: 40px;
        width:18%;
        line-height: 40px;
        background: #fff;
        border-radius:10px;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
      }
      .tip-third-party {
        padding:2px;
        position: absolute;
        left: 0;
        right: 0;
        top: 10px;
        margin: 0 auto;
        width:55%;
        border: none;
        height: 55px;
        border-bottom: 1px solid #eee;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);;
        border-radius:10px;
        background: white;
        input {
          letter-spacing:1px;
          border-radius: 10px;
          width:55%;
          line-height:40px;
          margin: 7px 0 0 7px;
          height:40px;
          border: 0;
          background: rgba(0,0,0,0.03);
          text-indent: 20px;
        }
      }
      .addressDels {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20%;
        background: #fff;
        padding:12px;
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
          }
          p {
            line-height: 20px;
          }
          a {
            font-size:14px ;
            cursor: pointer;
            display: inline-block;
            width:49%;
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
      .orderLists{
        position: absolute;
        left: 10px;
        top:58px;
        width:20%;
        overflow: hidden;
        border-radius:10px;
        height:520px;
        background: #fff;
        padding: 0 4px 0 8px;
        list-style: none;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        .orderList{
          overflow-y:auto;
          height: 100%;
          padding:0 6px 0 0;
        }
        .orderList li{
          overflow-y: auto;
          cursor: pointer;
          height:96px;
          border-radius: 10px;
          margin:10px 0;
          border: 1px solid rgba(0,0,0,0.04);
          padding:10px;
          box-sizing: border-box;
        }
        .orderList li.active{
          background:rgba(0,0,0,0.05);;
        }
        .red{
          color:#ff630e;
          font-size:12px;
        }
        .green{
          color: #28c392;
          font-size:12px;
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

</style>
<script>
  let map;
  let marker;
  let placeSearch;
  let orderHeight;
  let loading;
  // import top from './header'
  export default {
    data() {
      return {
        lat: '',
        lng: '',
        selectOrderArray: [],
        selected: 0,
        cententAddress: '',
        choose: false,
        users: {},
        types: '',
        routeIndex: null,
        province: '',
        city: '',
        area: '',
        isAddress: ''
      };
    },
    components: {
      top
    },
    methods: {
      search() {
        let _this = this;
        AMap.service(["AMap.PlaceSearch"], function () {
          placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 1,
            map: map,
          });
          //清除覆盖物
          map.clearMap();
          // //清除搜索结果
          // placeSearch.clear();
          //关键字查询
          placeSearch.search(_this.$refs.searchs.value);
        });
        _this.choose = true;
      },
      changed() {
        //清除覆盖物
        map.clearMap();
        //清除搜索结果
        // placeSearch.clear();
      },
      // 修改当前订单位置
      createOrder() {
        let _this = this;
        // console.log(_this.selectOrderArray);

        let adressIndos = [];
        for (let i = 0; i < _this.selectOrderArray.length; i++) {
          adressIndos.push({
            orderId: _this.selectOrderArray[i].orderId,
            consigneeAddress: _this.selectOrderArray[i].consigneeAddress,  //收货人地址
            consigneeLatitude: _this.selectOrderArray[i].consigneeLatitude,//收货方纬度
            consigneeLongitude: _this.selectOrderArray[i].consigneeLongitude,//收货方经度
            consignorAddress: _this.selectOrderArray[i].consignorAddress,//发货人地址
            consignorLatitude: _this.selectOrderArray[i].consignorLatitude,//发货方纬度
            consignorLongitude: _this.selectOrderArray[i].consignorLongitude//发货方经度
          });
        }
        let orederAdress = JSON.stringify({
          token: this.users.token,
          addresses: adressIndos
        });
        console.log(orederAdress);
        _this.$http.post('https://' + process.env.API_HOST + "/cms/thirdparty/thirdparty/updateaddress", orederAdress, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then((response) => {
            console.log(response);
            if (response.data.result === "success") {
              this.$message({
                message: '批量修改地址成功',
                type: 'success'
              });
              this.$router.go(-1)
            }
            sessionStorage.removeItem('orderArr');
          })
          .catch((error) => {
            console.log(error);
          });
      },
      next(text) {
        //清除覆盖物
        map.clearMap();
        let _this = this;
        _this.choose = true;
        //定义窗体信息
        let infoWindow;
        let content = [];
        let title = "订单";
        content.push("地址：" + _this.cententAddress);

        //禁止input值为空------
        if (_this.$refs.searchs.value === '') {
          this.$message('空的地址不能保存,请拖动地图或输入地址!');
          return;
        }
        //校验input地址内容
        if (_this.lat === '' && _this.lng === '') {
          _this.$message.warning('当前地址没有经纬度，无法创建仓库！');
          return;
        }
        if (_this.$refs.searchs.value !== _this.isAddress) {
          _this.$message.warning('当前输入地址位置与地图地址位置不匹配！');
          _this.$refs.searchs.value = _this.isAddress;
          return;
        }

        //发布用车本地存储地址修改------
        if (_this.types === '发货方' || _this.types === '收货方') {
          _this.consigneeArr = sessionStorage.getItem('consigneeArr')===null?sessionStorage.getItem('consigneeArr'):JSON.parse(Base64.decode(sessionStorage.getItem('consigneeArr')));
          _this.consignorArr = sessionStorage.getItem('consignorArr')===null?sessionStorage.getItem('consignorArr'):JSON.parse(Base64.decode(sessionStorage.getItem('consignorArr')));
        }

        if (_this.types === '发货方') {
            console.log(_this.routeIndex);
            _this.consignorArr[_this.routeIndex].consignorLongitude = _this.lng;
          _this.consignorArr[_this.routeIndex].consignorLatitude = _this.lat;
          _this.consignorArr[_this.routeIndex].consignorAddress = _this.$refs.searchs.value;
          _this.consignorArr[_this.routeIndex].consignorProvince = _this.province;
          _this.consignorArr[_this.routeIndex].consignorCountry = _this.area;
          _this.consignorArr[_this.routeIndex].consignorCity = _this.city === '' ? _this.city = _this.province : _this.city;
          sessionStorage.setItem('consignorArr',Base64.encode(JSON.stringify(this.consignorArr)));
          location();
          return;
        }
        if (_this.types === '收货方') {
          _this.consigneeArr[_this.routeIndex].consigneeLongitude = _this.lng;
          _this.consigneeArr[_this.routeIndex].consigneeLatitude = _this.lat;
          _this.consigneeArr[_this.routeIndex].consigneeAddress = _this.$refs.searchs.value;
          _this.consigneeArr[_this.routeIndex].consigneeProvince = _this.province;
          _this.consigneeArr[_this.routeIndex].consigneeCountry = _this.area;
          _this.consigneeArr[_this.routeIndex].consigneeCity = _this.city === '' ? _this.city = _this.province : _this.city;
          sessionStorage.setItem('consigneeArr',Base64.encode(JSON.stringify(this.consigneeArr)));
          location();
          return;
        }

        function location() {
          _this.$router.push({
            path: '/ReleaseCar/use-car',
            // query: {
            //   selectedArray: encodeURIComponent(JSON.stringify(this.multipleSelection))
            // }
          });
        }



        //订单列表地址修改-----------
        if (_this.city === '') {
          _this.city = _this.province;
        }
        if (_this.selectOrderArray[_this.selected].consigneeCity !== _this.city && text === "收货") {
          this.$message.warning('当前所选地址超出订单区域!');
          return;
        }
        if (_this.selectOrderArray[_this.selected].consignorCity !== _this.city && text === "发货") {
          this.$message.warning('当前所选地址超出订单区域!');
          return;
        }
        if (text === "收货") {
          _this.selectOrderArray[_this.selected].consigneeLongitude = _this.lng;
          _this.selectOrderArray[_this.selected].consigneeLatitude = _this.lat;
          _this.selectOrderArray[_this.selected].consigneeAddress = _this.$refs.searchs.value;
        }
        if (text === "发货") {
          _this.selectOrderArray[_this.selected].consignorLongitude = _this.lng;
          _this.selectOrderArray[_this.selected].consignorLatitude = _this.lat;
          _this.selectOrderArray[_this.selected].consignorAddress = _this.$refs.searchs.value;
        }

        if (marker != null) {
          map.remove(marker)
        }
        marker = new AMap.Marker({
          map: map,
          position: [_this.lng, _this.lat],
          icon: new AMap.Icon({
            size: new AMap.Size(100, 150),  //图标大小
            image: 'data:image/png;base64,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',
          }),
          animation: "AMAP_ANIMATION_DROP",
          offset: new AMap.Pixel(-22, -32)
        });

        //鼠标点击marker弹出自定义的信息窗体
        AMap.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker.getPosition());
        });

        infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: _this.createInfoWindow(title, content.join("<br/>")),
          offset: new AMap.Pixel(16, -45)
        });

        // 跳转 next
        _this.selected++;
        if (_this.selected >= _this.selectOrderArray.length) {
          _this.selected = _this.selectOrderArray.length - 1;
          // _this.$refs.orderUl.scrollTop=0;
          _this.$message.warning('已经到底了');
        }
        if (_this.types === '收货方') {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
        }
        if (_this.types === '发货方') {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consignorAddress;
        }
        if (_this.types === '' || _this.types === undefined) {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
        }

        let orderListHeight = _this.$refs.orderList.clientHeight;
        let orderTop = _this.$refs.order[_this.selected].offsetTop;
        orderHeight = _this.$refs.order[_this.selected].scrollHeight;

        // console.log(orderHeight);
        if ((orderTop + (orderHeight + 2)) > orderListHeight) {
          this.$refs.orderUl.scrollTop += orderHeight + 2 + 10
        }

      },
      selecteds(index) {
        let _this = this;
        _this.selected = index;
        if (_this.types === '收货方') {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
        }
        if (_this.types === '发货方') {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consignorAddress;
        }
        if (_this.types === '' || _this.types === undefined) {
          _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
        }
      },

      init: function () {
        let _this = this;
        _this.loading();
        _this.selectOrderArray = _this.$route.query.selectedArray === undefined ? _this.selectOrderArray : JSON.parse(decodeURIComponent(_this.$route.query.selectedArray));
        _this.types = _this.$route.query.type === undefined ? '' : decodeURIComponent(_this.$route.query.type);
        _this.routeIndex = _this.$route.query.index === undefined ? null : parseInt(decodeURIComponent(_this.$route.query.index));
        // _this.routeIndex=_this.routeIndex);
        // if(_this.types==='发货方'){
        //   _this.selectOrderArray=JSON.parse(sessionStorage.getItem('consignorArr'))
        // }
        // if(_this.types==='收货方'){
        //   _this.selectOrderArray=JSON.parse(sessionStorage.getItem('consigneeArr'))
        // }
        if (_this.types === '') {
          _this.selectOrderArray =  sessionStorage.getItem('orderArr')===null?_this.selectOrderArray :JSON.parse(Base64.decode(sessionStorage.getItem('orderArr')));
        }
        console.log(_this.types + "----------" + _this.routeIndex);
        let onModeChange;
        let geolocation;
        AMapUI.loadUI(['misc/PositionPicker', 'misc/PoiPicker'], function (PositionPicker, PoiPicker) {
          map = new AMap.Map('container', {
            zoom: 16,
            scrollWheel: true,
            resizeEnable: true,
          });

          // 加载定位插件，实现定位功能
          map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：无穷大
              maximumAge: 0,           //定位结果缓存0毫秒，默认：0
              convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true,        //显示定位按钮，默认：true
              buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角  cent
              buttonOffset: new AMap.Pixel(14, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
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

          //解析定位错误信息
          function onError(data) {
            _this.$refs.addressText.innerHTML = '定位失败!';
          }

          //搜索
          let poiPicker = new PoiPicker({
            input: 'search',
            placeSearchOptions: {
              map: map,
              pageSize: 6 //关联搜索分页
            }
          });

          // 搜索选址
          poiPicker.on('poiPicked', function (poiResult) {
            _this.choose = true;
            poiPicker.hideSearchResults();
            _this.lat = poiResult.item.location.lat;
            _this.lng = poiResult.item.location.lng;
            _this.$refs.nearpoi.innerHTML = poiResult.item.name;
            _this.$refs.addressText.innerHTML = poiResult.item.address;
            map.panTo([_this.lng, _this.lat]);
            if (_this.choose) {
              _this.$refs.searchs.value = poiResult.item.address;
            }
          });
          // 拖拽选址
          let positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map,
            iconStyle: {//自定义外观
                url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAyCAYAAADSprJaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAO1SURBVHja7JhfaFNXHMc/994mrTXVRWzmmrbD2qkYFRGMMAp7EkGkUlSQ7WHDFx/mk6JF4h8EQ6How0AQH5SNYUEWhYkPDn0R1NKgguAgc47MDm0ma+Nq+seYm/hyUm/uPWnvTW8mjHwhDzl/fueT3/n9zjm/KJtCIWzKC2wBuoEvgFWSMb8Bt4FrwE0ga8ewYgNiAbAfiACLsa9/gShwFpiabaA6h6EeIAH0OwRAjO8X83scQcQjaeKRNMBx4CrQzvzULuwcN9guUZ1sVjjqvwR8Wc5qc1OezctzNHoLrAjoJEY0JrMK8aSH9KRSbtrJcNS/Jh5J77ETEyeFFyzaGsry1eZpVn+il/3ZD4fr+OFeA4N/eMoNiQJHZ4PYBfxknrVsUZ6+nROEWnK29+D+n3Uc+3khoxlp2O0BLssgfCKIgsbRG9pynN6dYdGCguNgSI2rHI75SIxoli7gMyBjDswDZoA2f75igKIHz+zO0NyUt3SJ9UqyYwlwqCRtFOjbWTmAMYj7d03Iug6JdWcgesR2zGjHhjes/FjHDYVacmwNWQ5Pn4jBEogSL3z9+TRuam+X1F63EaLL2LO+NUfLR3lXIZYv1ekMWDzbVYQImo/kNQ5S0Yk2tudkR3tQBZrNPW3+fFUgWv3SGFummgMSwNdQqApEo1d+S6uya3Yyq1QFYlq+y1MqMGZuffFKrQpEGbtjKpAsHp9FDSU9VYF4OGyxmwGSRbRBY09iRCM1rrruBckdMmg8J26YeweGGlyFuHhXau+GEWLA/Ci98qCev9LueOPJ3xrXH9Wbm3Wx7gxEqthQ1FsdemO+eWdKelLhyBUfeWvW/yjWLbnKT5gD9OlLjd7YwopBxqcUemM+mUczYj0AtGAgYHyivwa2GUc/f6Vx56mHcMdbFju41hMjGt8ONPH7S03WfVDUJRYIgDjQBmwsSeQJldj9BkYnVDoDOr768jDJfzS+u9VI/y+NvJ6WevDCXG/MYqV1XVRbUnUGdNYFc6wI6Hg0mMoqPBtVGUp65jrobgLbzUlggYhH0oSjfi9wHvjGxSz9HtgXj6Sz4ajfURm4H+iTXXIOlAGOiHKwojLwLNABnBN57US6mNcxG4Ddgtj4Qu4Wny0idszKin2/Jj4pt6rycloC/CrgUkBIdiPb0XzO5TFDlGcrBQBQCoXKXlHhtWsBnomqexj4NP74Mf+1J1xTDaIGUYOoQdQg/v8Q4vKy3V5tT2hu2JnP5Ku8/9+zFTj1ISC8c3y3rXcDAMK9Doy6LPOAAAAAAElFTkSuQmCC',
              // url: 'src/images/asd.png',//图片地址
              size: [33, 50],  //要显示的点大小，将缩放图片
              ancher: [17, 45],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
            },
          });
          positionPicker.on('success', function (positionResult) {
            _this.lat = (positionResult.position.lat);
            _this.lng = (positionResult.position.lng);
            _this.province = positionResult.regeocode.addressComponent.province;
            _this.city = positionResult.regeocode.addressComponent.city;
            _this.area = positionResult.regeocode.addressComponent.district;
            _this.$refs.nearpoi.innerHTML = positionResult.nearestPOI;
            _this.$refs.addressText.innerHTML = positionResult.address;
            _this.isAddress = positionResult.address;
            if (_this.choose === true) {
              _this.$refs.searchs.value = positionResult.address;
            } else {
              if (_this.types === '收货方' && _this.selectOrderArray.length > 0) {
                _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
              }
              if (_this.types === '发货方' && _this.selectOrderArray.length > 0) {
                _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consignorAddress;
              }
              if (_this.types === ''&&_this.selectOrderArray.length >0 || _this.types === undefined&&_this.selectOrderArray.length >0) {
                _this.$refs.searchs.value = _this.selectOrderArray[_this.selected].consigneeAddress;
              }
            }
          });
          map.on('dragstart', function () {
            _this.choose = true;
          });
          map.on('mousemove', function () {
            _this.choose = true;
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
                  liteStyle: true,
                  position: 'RB',
                  offset: new AMap.Pixel(10, 170)
              }));
          });
          setTimeout(() => {
            loading.close();
          }, 500);
        });

      },
      createInfoWindow: function (title, content) {
        let _this = this;
        let info = document.createElement("div");
        info.className = "info";
        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        let top = document.createElement("div");
        let titleD = document.createElement("div");
        let closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        closeX.onclick = _this.closeInfoWindow;
        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);
        // 定义中部内容
        let middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        let bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';

        let sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
      },
      closeInfoWindow: function () {
        map.clearInfoWindow();
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
        this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key'))).result;
      this.init();
      if (sessionStorage.getItem('orderArr')==null&&this.types===undefined) {
        this.$router.go(-1)
      }
    }
  }

</script>

