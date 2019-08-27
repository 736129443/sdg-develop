<template>
    <div class="center">
        <!--<div class="list_menu">-->
             <!--<a href="javascript:;" :class="{'active':selected===1}" @click="select(new_warehouse,1)"><div  :class="{active:selected===1}" @click="select(1)">新建仓库</div></a>-->
             <!--<a href="javascript:;" :class="{'actives':selected===2}" @click="select(list_warehouse,2)"><div   :class="{actives:selected===2}" @click="select(2)">仓库列表</div></a>-->
        <!--</div>-->
        <!--<div  :is="currentView"></div >-->

        <div class="list_menu">
            <router-link to="/ReleaseCar/warehouse/new_warehouse"><div :class="{'active':selected===1}" @click="select(1)">新建仓库</div></router-link>
            <router-link to="/ReleaseCar/warehouse/list_warehouse"> <div :class="{'actives':selected===2}" @click="select(2)">仓库列表</div></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    //导入子组件
    import new_warehouse from  './new_warehouse.vue';
    import list_warehouse from './list_warehouse.vue'
    export default {
        data() {
            return {
                //默认新建仓库 仓库列表 的高亮为第一个
                selected:1,
                new_warehouse:'new_warehouse',
                list_warehouse:'list_warehouse',
                currentView: 'new_warehouse', //默认选中div子组件
            };
        },
        methods:{
            select:function (tabText,index) {
                this.currentView = tabText;
                if (index == 1){
                    this.selected=1
                } else {
                    this.selected=2
                }
            },
        },
        watch:{
            $route(to,from){
                if(to.path==='/ReleaseCar/warehouse/new_warehouse' ||to.path==='/ReleaseCar/Warehouse'){
                    this.selected=1
                }
                if(to.path==='/ReleaseCar/warehouse/list_warehouse'){
                    this.selected=2
                }
            }
        },
        components: {
            new_warehouse,
            list_warehouse
        },
    }
</script>

<style scoped lang="scss">
    .center{
        width:99%;
        height:100%;
        .list_menu {
            margin:30px;
        }
    }
    .list_menu {
        cursor: pointer;
        margin: 30px 0 0 0;
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
        background:#409EFF;
        color: white;
        /*box-shadow:0 5px 15px 2px #409EFF;*/
    }
    .list_menu .active{
        border-radius:50px 50px 50px 50px/ 50px 0px 0px 50px;
        background:#409EFF;
        color: white;
        /*box-shadow:0 5px 15px 2px #409EFF;*/
    }




</style>
