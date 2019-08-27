<template>
    <div id="app">
        <!--<keep-alive>-->
            <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
        <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
        <!--<router-view ></router-view>     -->
        <router-view v-if="isRouterAlive"/>
        <!--<keep-alive>-->
            <!--<router-view v-if="$route.meta.keepAlive">-->
                <!--&lt;!&ndash; 这里是会被缓存的视图组件，比如 Home！ &ndash;&gt;-->
            <!--</router-view>-->
        <!--</keep-alive>-->

        <!--<router-view v-if="!$route.meta.keepAlive">-->
            <!--&lt;!&ndash; 这里是不被缓存的视图组件，比如 Edit！ &ndash;&gt;-->
        <!--</router-view>-->
    </div>
</template>

<script>
export default {
    provide(){
        return {
            reload: this.reload
        }
    },
    data(){
        return {
            isRouterAlive: true
        }
    },
    methods:{
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            })
        }
    }
};
</script>
<style lang="scss" scoped>
    #app{
        width:100%;
        height:100%;
    }
</style>
