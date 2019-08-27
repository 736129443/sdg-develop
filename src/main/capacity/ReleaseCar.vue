<template>
    <div class="main">
        <!--　　　　<nav>-->
        <!--　　　　　　<a href="javascript:;" @click="toggleTabs(Warehouse)">仓库管理</a>-->
            <!--　 　　<a href="javascript:;" @click="toggleTabs(transport)">运输需求管理</a>-->
            <!--　　　 <a href="javascript:;" @click="toggleTabs(Intelligence)">智能调度</a>-->
            <!--　　　 <a href="javascript:;" @click="toggleTabs(Release)">发布用车</a>-->
        <!--　　　　</nav>-->
        <!--　　　　&lt;!&ndash;动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数&ndash;&gt;-->
        <!--　　　　<div  :is="currentView"></div >-->



        <nav class="list_menu">
            <router-link class="aclass" to="/ReleaseCar/Warehouse">仓库管理</router-link>
            <router-link class="aclass" to="/ReleaseCar/transport">运输需求管理</router-link>
            <router-link class="aclass" to="/ReleaseCar/dispatch">智能调度</router-link>
            <router-link class="aclass" to="/ReleaseCar/use-car">发布用车</router-link>
            <router-link class="aclass" to="/ReleaseCar/residentInformation">驻场信息</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    //导入子组件
    import Warehouse from './components/NewWarehouse/Warehouse.vue';
    import transport from './components/TransportDemand/TransportDemand.vue';
    import Intelligence from './components/Intelligence/dispatch.vue';
    import Release from './components/use-car/use-car.vue';
    import residentInformation from './components/use-car/residentInformation.vue';

    export default {
        data(){
            return {
                Warehouse: "Warehouse", //导航栏文本2
                transport: "transport", //导航栏文本3
                Intelligence: "Intelligence", //导航栏文本4
                Release: "Release", //导航栏文本4
                currentView: 'Warehouse', //默认选中first子组件
                residentInformation:'residentInformation'
            };
        },
        methods: {
            toggleTabs (tabText) {
                this.currentView = tabText;
            }
        },
        components: {
            Warehouse,
            transport,
            Intelligence,
            Release,
            residentInformation
        },
    }
</script>

<style scoped lang="scss">
    nav{
        padding:0 30px;
        & .aclass{
            text-decoration: none;
            display: inline-block;
            width:150px;
            text-align:center;
            padding:10px;
            background:#409EFF;
            color: white;
            border: 1px solid white;
        }
    }
</style>