<template>
  <div class="useCar">
    <div class="list_menu" v-show="isShow">
      <div @click="toggleTabs('thirdParty')" :class="sign=='thirdParty'?'active':''">输入地址</div>
      <div @click="toggleTabs('ordinaryUser')" :class="sign=='ordinaryUser'?'actives':''">输入集合</div>
    </div>
   <div class="containers ">
     <component :is="currentView"></component>
   </div>
  </div>
</template>

<script>
  import thirdParty from './thirdParty.vue';
  import ordinaryUser from './ordinaryUser.vue';
  export default {
    name: "useCar",
    data() {
      return {
        sign:'thirdParty',
        currentView: 'thirdParty',
        collection: '',
        isShow: false
      };
    },
    methods: {
      toggleTabs: function (tabText) {
        this.currentView = tabText;
        this.sign = tabText;
      }
    },
    components:{
      thirdParty,ordinaryUser
    },
    mounted(){
      let transportCopy = this.$route.params.transportCopy;
      console.log('---------------------------');
        console.log(this.$route.params.transportCopy)
      let addressCopy = this.$route.params.addressCopy;
      if(typeof(transportCopy) !== 'undefined'){
          this.isShow = false;
          console.log(JSON.parse(Base64.decode(transportCopy)));
          this.sign = 'ordinaryUser';
          this.currentView = 'ordinaryUser';
      }else if(typeof(addressCopy) !== 'undefined'){
          this.isShow = false;
          console.log(JSON.parse(Base64.decode(addressCopy)));
          this.sign = 'thirdParty';
          this.currentView = 'thirdParty';
      }else{
        //通过集合跳转是否显示TAB按钮
        // sessionStorage.getItem('collection') === null ? this.isShow = true : this.isShow = false;
        this.collection = sessionStorage.getItem('collection') === null ? this.collection : JSON.parse(Base64.decode(sessionStorage.getItem('collection')));
        if (this.collection !== '') {
          console.log(this.collection);
          this.sign = 'ordinaryUser';
          this.currentView = 'ordinaryUser';
        }
        //通过运输单copy标记是否显示TAB按钮
        if (sessionStorage.getItem('useCarData') !== null) {
          if (JSON.parse(Base64.decode(sessionStorage.getItem('useCarData'))).isAddressCopy) {
            this.isShow = false
          }
        }
      }
    }
  }
</script>

<style lang="scss">

  .useCar{
    position: relative;
    overflow: hidden;
      .lineNameRemarks{
          width: 200px;
      }
    .list_menu {
      cursor: pointer;
      margin: 20px 0 0 35px;
      width: 280px;
      height: 50px;
      border-radius: 100px;
      background: white;
      border: 1px solid rgba(0,0,0,0.06);
      line-height: 45px;
      -webkit-box-shadow: 0 3px 8px 2px rgba(0,0,0,0.06);
      box-shadow: 0 3px 8px 2px rgba(0,0,0,0.06);
    }
    .list_menu div{
      float: left;
      width: 50%;
      height:50px;
      text-align: center;
    }
    .list_menu .actives{
      border-radius:50px 50px 50px 0px/ 0px 50px 50px 50px;
      background:rgb(255,161,14);
      color: white;
      box-shadow:0 5px 15px 2px rgba(255,161,14,0.4);
    }
    .list_menu .active{
      border-radius:50px 50px 50px 50px/ 50px 0px 0px 50px;
      background:rgb(255,161,14);
      color: white;
      box-shadow:0 5px 15px 2px rgba(255,161,14,0.4);
    }
    .el-button:hover {
      color: #409EFF;
      background: #fff;
    }
    .el-button.is-disabled:hover{
      border-color:#ffb74691;
      color:white;
      background-color:#ffb74691;
    }
    .el-button--primary.is-disabled{
      border-color:#ffb74691;
      background-color:#ffb74691
    }
    .el-checkbox-group {
      font-size: 0;
      display: inline-block;
      margin-left: 39px;
    }
    .el-checkbox+.el-checkbox{
      margin-left:19px;
    };
    .group{
      margin-left: 0;
    }
    .cars{
      .el-radio{
        width:33%;
        padding: 16px 0;
      }
      .el-radio+.el-radio {
         margin-left: 0;
      }
    }

    .required{
      color:red;
    }

    .to-storehouse{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20px;
      h4{
        font-size: 15px;
        letter-spacing:4px;
      }
      .times{
        width:20%;
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width:100%!important;
        }
      }
        .times-pos{
            position: relative;
            .units{
                font-weight: bold;font-size:12px;letter-spacing:1px;color:#409EFF;position: absolute;top:10px;right:20px;
            }
        }
      .total-left{
        margin-left:50px;
      }
      /*span{*/
        /*width:200px;*/
      /*}*/
      .setNumber{
        width: 20%;
      }
      .timeInput{
        .spanTime{
          width:136px;
          margin-left:28px
        };
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width:50%;
        .el-input{
          width:30.5%;
        }
      }
      .unit{
        font-weight: bold;font-size:12px;letter-spacing:1px;color:#409EFF;position: relative;left:-35px;top:-1px;
      }


      .floatLeft{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width:50%;
        .el-input{
          width:40%;
        }
      }
      .el-input__inner{
        border-radius: 20px;
      }
      .text{
        width:20%;
      }
      .t-text{
        margin-right: 15px;
      }
      .shippingAddress{
        width: 20%;
      }
      .order-price{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 10px;
        border: 1px solid #dcdfe6;
        height:40px;
        border-radius: 20px;
        color:#dcdfe6;
      }
      .handlingInstructions{
        width: 42%;
      }
    }
    .to-goodsType{
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      .el-checkbox{
        width: 25%;
      }
      .el-checkbox+.el-checkbox {
        margin-left: 0;
      }
    }

    .block{
      width: 20%;
    }
    .copy{
      color:#fff;
      background: #ffa10e;
      border-color: #ffa10e;
      box-shadow:0 3px 15px 2px rgba(255,161,14,0.3);
    }
    .to-select{
      margin-top: 25px;
    }
    .inputStyle{
      width: 75%;
    }
    .dig{
      .el-dialog--center .el-dialog__body{
        text-align: center;
      }
    }
    .to-service{
      margin-top: 20px;
      .el-checkbox-group{
        margin-left: 0;
      }
      p{
        font-weight: 700;
        font-size: 17px;
        margin-bottom: 10px;
      }
      a{
        color:#409EFF;
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
    .copy-list{
      position: absolute;
      top:0;
      right:0;
      width:15%;
      height: 96%;
      padding: 20px 15px;
      overflow-y:auto ;
      .order-list{
        border: 1px solid #e5e5e5;
        border-radius:15px ;
        padding: 20px;
        margin-bottom:10px ;
        box-shadow: 5px 5px 5px #e9e9e9;
        z-index: 100;
        background: #fff;
        p{
          line-height: 30px;
        }
        .copy{
          display: block;
          margin: 10px auto 0;
        }
      }
    }
    .total{
      width:11%;
      .el-input--suffix .el-input__inner, .el-range-editor.el-input__inner{
        width: 100%;
      }
    }
    .release{
      box-shadow:0 3px 15px 2px #409EFF;
      background: #409EFF;
      border-color:#409EFF ;
      color:#fff;
      width:202px;
      padding:13px 0;
      margin:20px 37%;
    }
  }

</style>

