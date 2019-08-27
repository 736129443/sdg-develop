<template>
    <div class="containers" ref="login_bg">
        <!-- 头部 -->
            <div class="headers">
            <div class="logo">
                <img  src="../images/header_logo.png" alt="">
            </div>
            <p class="headerTitle">后台运营管理系统</p>
            </div>
        <div class="content">
            <img src="../images/main.png" alt="">
            <div class="loginBox">
                <div class="top" >
                    <span class="title">账号登录</span>
                </div>
                <div class="LoginMain">
                    <div class="t-text">
                        <div class="user">
                            <i class="iconfont icon-people "></i>
                        </div>
                        <input autofocus="autofocus" v-model.trim="uname" class="text" type= "text" placeholder="请输入用户名..." @keyup.enter="login">
                    </div>
                    <div class="t-pass">
                        <div class="pass">
                        <i class="iconfont  icon-lock "></i>
                        </div>
                        <span v-show="!show"  @click="sun" >
                        <i class="iconfont icon-close-eyes i-eyes" ></i>
                        </span>
                        <span v-show="show"  @click="sun">
                        <i class="iconfont icon-eye i-eyes1"></i>
                        </span>
                        <input v-model.trim="upass"  :type= "type"  placeholder="请输入密码..." class="passworld" @keyup.enter="login">
                    </div>
                    <el-button type="primary" class="submmit" @click="login" >登录</el-button>
                    <span class="num" >忘记密码请与管理员联系！</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookie from '../js/cookie.js'
    const sha256 = require("js-sha256").sha256;
    export default {
        data() {
            return{
                uname:'',
                upass:'',
                show:false,
                type:"password",
                admin:"admin",
                arr:[],
                bodyText:'',
                list:[],
            }
        },
        created(){

        },
        methods: {
            login () {
                let config = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                this.$http.post(this.global.lightningUrl+'/companyv1/security/user/login',JSON.stringify({
                    "userName":this.uname,
                    "userType":this.admin,
                    "password":sha256(this.upass)
                }),config).then(run=>{
                    if(run.body.errcode === 0){
                        this.arr = run;
                        this.bodyText = this.arr.bodyText;
                        if(!window.sessionStorage){
                            return false;
                        }else{
                            sessionStorage.setItem('key',Base64.encode(this.bodyText));
                            // localStorage.setItem('key',Base64.encode(this.bodyText));
                            console.log(Base64.encode(JSON.parse(this.bodyText).result.token));
                            if (this.global.lightningUrl == "https://www.sdgwl.com:43535") {
                                Cookie.setCookie({
                                    name:'token',
                                    value:Base64.encode(JSON.parse(this.bodyText).result.token),
                                    expires: 1,
                                    domain:'.sdgwl.com'
                                });
                            }else{
                                Cookie.setCookie({
                                    name:'token',
                                    value:Base64.encode(JSON.parse(this.bodyText).result.token),
                                    expires: 1,
                                    domain:'.shandiangou-app.com'
                                });
                            }

                            // Cookie.removeCookie('key','/')
                            // Cookie.removeCookie('111','/')
                            sessionStorage.setItem('jurisdictions',run.body.result.currentUser.permission);
                        };
                        if(this.upass == 123456){
                            this.$router.push({path:'/passworld'});
                        }else {
                            // alert(1)
                            // window.location.reload();
                            sessionStorage.setItem( 'jurisdictions' , run.body.result.currentUser.permission );
                            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
                            if ( jurisdictions[0].menus[0].choose ){
                                this.$router.push({ path : '/area_manage' });
                            }else if ( jurisdictions[1].menus[0].choose ){
                                this.$router.push({ path : '/organization_manage' });
                            }else if (jurisdictions[3].menus[0].choose){
                                this.$router.push({ path : '/client_manage' });
                            } else if (jurisdictions[3].menus[6].choose) {
                                this.$router.push({ path : '/warehouse_manage' });
                            } else if (jurisdictions[3].menus[7].choose) {
                                this.$router.push({ path : '/ApprovalList' });
                            }else if ( jurisdictions[5].menus[7].choose ){
                                this.$router.push({ path : '/transportCompany' });
                            }else if ( jurisdictions[5].menus[0].choose ){
                                this.$router.push({ path : '/driver_manage' });
                            }else if ( jurisdictions[5].menus[3].choose ){
                                this.$router.push({ path : '/driverAttestation' });
                            }else if ( jurisdictions[5].menus[12].choose ){
                                this.$router.push({ path : '/driverInvitationList' });
                            }else if ( jurisdictions[5].menus[10].choose ){
                                this.$router.push({ path : '/driver_StickerAudit' });
                            }else if ( jurisdictions[5].menus[18].choose ){
                                this.$router.push({ path : '/driver_CarAudit' });
                            }else
                            if ( jurisdictions[6].menus[0].choose ){
                                this.$router.push({ path : '/order_manage' });
                            }else if ( jurisdictions[6].menus[2].choose ) {
                                this.$router.push({ path : '/transport_manage' });
                            }
                            else if ( jurisdictions[7].menus[0].choose ){
                                this.$router.push({ path : '/driver_bill' });
                            }else if (  jurisdictions[7].menus[5].choose ){
                                this.$router.push({ path : '/driverwithdraw'});
                            } else if (  jurisdictions[7].menus[7].choose ){
                                this.$router.push({ path : '/driverRedEnvelope' });
                            } else if (jurisdictions[7].menus[9].choose){
                                this.$router.push({ path : '/clientele'});
                            }else if (jurisdictions[7].menus[14].choose){
                                this.$router.push({ path : '/sjzd_record'});
                            }else if (jurisdictions[8].choose){
                                this.$router.push({ path : '/finance_analyze'});
                            }else if (jurisdictions[7].menus[15].choose){
                                this.$router.push({ path : '/clientReconciliationeq'});
                            }else if (jurisdictions[7].menus[19].choose){
                                this.$router.push({ path : '/client_bill'});
                            }else if (jurisdictions[7].menus[22].choose){
                                this.$router.push({ path : '/Insurance_bill'});
                            }else if (jurisdictions[7].menus[24].choose){
                                this.$router.push({ path : '/cashpledge'});
                            }else if (jurisdictions[15].menus[0].choose){
                                this.$router.push({ path : '/accidentcentre'});
                            }else if (jurisdictions[11].menus[3].choose){
                                this.$router.push({ path : '/driverStickerAuditSettings'});
                            }else if (jurisdictions[11].menus[4].choose){
                                this.$router.push({ path : '/TrainingMaterials'});
                            }else if(jurisdictions[10].menus[0].choose){
                                this.$router.push({ path : '/client'});
                            }else if(jurisdictions[1].menus[4].choose){
                                this.$router.push({ path : '/staffManagement'});
                            }
                        }
                    }else{
                        if (this.uname==''||this.upass == ''){
                            this.$message({
                                message: '请输入用户名或密码',
                                type: 'error'
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: run.body.message,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            sun() {
                this.show=!this.show;
                if(this.show) {
                    this.show==!false;
                    this.type="text"
                } else {
                    this.type="password"
                }
            }
        },

    }
</script>
<style lang="scss" scoped>
   body{
       height:100%;
   }
  .containers{
      background-image: url("../images/bg.png");
      width: 100%;
      height:100%;
      position: relative;
      background-repeat:no-repeat;
      background-size:100% 100%;-moz-background-size:100% 100%;
      input:focus{border:1px solid #409EFF!important; }
    .headers{
        overflow: hidden;
        .logo{
            float: left;
            img{
                width: 143px;
                height: 51px;
                margin: 42px 0 0 120px;
            }
        }
        .headerTitle {
            float: left;
            margin: 42px 0 0 20px;
            font-size:20px;
            font-weight: bold;
            letter-spacing:3px;
            color: #fff;
            line-height:60px;
        }
    }
    .content {
        overflow: hidden;
        img{
             position:absolute;
             top:24%;
             left:80px;
             width:800px;
           }
        .loginBox {
            background: white;
            position: absolute;
            right: 200px;
            top:24%;
            padding:30px 22px 70px  22px;
            box-shadow:0 2px 50px 5px rgba(0,0,0,0.08);
            .top {
                width:100%;
                height:63px;
                .title {
                    height:63px;
                    font-size: 20px;
                    letter-spacing:1px;
                    opacity: 0.85;
                }
            }
            .LoginMain {
                width:345px;
                .t-pass,.t-text{
                    position: relative;
                    i{
                        font-size:26px;
                        opacity: 0.45;
                    }
                    .user,.pass{
                        position: absolute;
                        left:10px;
                        top: 0;
                        line-height:45px;
                    }
                    input{
                        border: 1px solid rgba(0,0,0,0.15);
                        height: 45px;
                        width:100%;
                        padding: 0 40px;
                        box-sizing: border-box;
                        margin: 0 0 20px 0;
                    }
                }
                .t-pass .i-eyes ,.t-pass .i-eyes1 {
                    font-size:18px;
                    position: absolute;
                    top:10px;
                    right:18px;
                }

                .submmit {
                    margin-top:40px;
                    border-radius:0;
                    width:100%;
                    height:45px;
                    overflow: hidden;
                    color: #fff;
                    font-size: 18px;
                }
                .num {
                    font-size:12px;
                    color:rgba(0,0,0,0.5);
                    position: relative;
                    top:30px;
                    left: 30%;
                }
            }
        }
    }
  }
</style>