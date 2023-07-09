<script>
    import adviseList from "./adviseList.vue";
  export default {
    data(){
        return {
            text: '',
            keywordAdvise:[
                {
                    key: 'gs',
                    explain: '匹配古诗'
                },
                
                {
                    key: '[回车]',
                    explain: '智能搜索'
                },
                {
                    key: '[双击回车]',
                    explain: '清空输入栏'
                }
            ]
            
        }
    },
    components:{
adviseList
    },
    methods: {
        focusEvent(event){
            this.textareaState = event.type
        }
    },
    watch: {

    }
    
  };</script>

<template>
    <h1 >👋 欢迎使用 Better Study</h1>
    <p>我可以实时通过你输入的内容，为你展示你学习中可能会用到的内容，下面是一些使用技巧和键入技巧：</p>
    <adviseList :hidden="true" ></adviseList>
</template>
<style scoped>

</style>