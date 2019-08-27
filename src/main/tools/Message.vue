<template>
    <div class="main message">
        <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="创建消息" name="first">
                <assist></assist>
            </el-tab-pane>
            <el-tab-pane label="消息列表" name="second">
                <messageList></messageList>
            </el-tab-pane>
        </el-tabs>
    </template>
    </div>
</template>

<script>
    import assist from './assist_instrument.vue';
    import messageList from './messageList.vue';
    export default {
        name: "Message",
        components:{
            assist,
            messageList
        },
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped lang="scss">
    .message{
        background: white;
    }
</style>