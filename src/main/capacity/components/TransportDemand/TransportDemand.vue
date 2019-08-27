<template>
    <div class="center" >
        <!--<div class="list_menu">-->
            <!--<a href="javascript:;" @click="toggleTabs(order_import)"><div ref="menuList" :class="{active:selected===1}" @click="select(1)">导入订单</div></a>-->

            <!--<a href="javascript:;" @click="toggleTabs(revised_order)"><div ref="menuList"  :class="{actives:selected===2}" @click="select(2)">订单管理</div></a>-->
        <!--</div>-->

        <!--<div  :is="currentView"></div >-->





        <div class="list_menu">
            <router-link to="/ReleaseCar/transport/order_import"><div ref="menuList" :class="{active:selected===1}" @click="select(1)">导入订单</div></router-link>
            <router-link to="/ReleaseCar/transport/revised_order"> <div ref="menuList"  :class="{actives:selected===2}" @click="select(2)">订单管理</div></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import order_import from './order_import.vue';
    import revised_order from './revised_order.vue';
    export default {
        data() {
            return {
                selected:1,
                order_import: "order_import", //导航栏文本4
                revised_order: "revised_order", //导航栏文本4
                currentView: 'order_import', //默认选中first子组件

            };
        },
        methods:{
            select:function (index) {
                this.selected=index;
            },
            toggleTabs (tabText) {
                this.currentView = tabText;
            }
        },

        components: {
            order_import,
            revised_order,
        },
        watch:{
            $route(to,from){
                if(to.path==='/ReleaseCar/transport/order_import'|| to.path==='/ReleaseCar/transport' ){
                    this.selected=1
                }
                if(to.path==='/ReleaseCar/transport/revised_order'){
                    this.selected=2
                }
            }
        },
        mounted(){
            if(this.$route.path==='/order_import'){
                this.selected=1
            }
            if(this.$route.path==='/revised_order'){
                this.selected=2
            }
        }

    }
</script>

<style scoped lang="scss">
    .center{
        width:99%;
        height:100%;
    }
    .el-breadcrumb{
        background:rgba(0,0,0,0.05);
        padding: 15px 21px;
    }

    .list_menu{
        cursor: pointer;
        margin: 30px;
        width: 280px;
        height: 40px;
        border-radius: 100px;
        background: white;
        border: 1px solid rgba(0,0,0,0.06);
        line-height: 40px;
        -webkit-box-shadow: 0 3px 8px 2px rgba(0,0,0,0.06);
        box-shadow: 0 3px 8px 2px rgba(0,0,0,0.06);
    }
    .list_menu div{
        float: left;
        width: 50%;
        height:40px;
        text-align: center;
    }

    .list_menu .actives{
        border-radius:50px 50px 50px 0px/ 0px 50px 50px 50px;
        background-color: #409EFF;
        color: white;
        /*box-shadow:0 3px 15px 2px #409EFF;*/
    }
    .list_menu .active{
        border-radius:50px 50px 50px 50px/ 50px 0px 0px 50px;
        background-color: #409EFF;
        color: white;
        /*box-shadow:0 3px 15px 2px #409EFF;*/
    }

</style>
