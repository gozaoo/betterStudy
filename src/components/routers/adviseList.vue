<script>
  export default {
    // name: 'search-bar',
    props: {
        hidden: Boolean
    },
    data(){
        return {
            keywordAdvise:[
                {
                    key: '[回车]',
                    explain: '智能搜索'
                },
                {
                    key: '[双击回车]',
                    explain: '清空输入栏'
                },
                {
                    key: '中文字/词典',
                    explain: '键入中文'
                }
            ]
            
        }
    },
    methods: {
        // focusEvent(event){
        //     this.textareaState = event.type
        // }
    },
    watch: {

    }
    
  };</script>

<template>
    <h1 v-if="hidden != true">使用技巧和提示词：</h1>
    <div class="flex">
        <div class="adviseBox" v-for="(item,index) in keywordAdvise">
            <div class="advise">{{item.key}}</div>
            <div class="explain">{{ item.explain }}</div>
        </div>
    </div>
</template>
<style scoped>
    div.flex{
        display: flex;
        gap: 15px;
        margin-top: 30px;
    }
    .adviseBox{
        min-width: fit-content;
        min-height: fit-content;
    }
    .advise {
        background-color: rgb(0,138,211);
        color: white;
        width: fit-content;
        padding: 6px 10px;
        border-radius: 12px;
        margin-bottom: 5px;
        box-shadow: 0px 3px 5px rgb(0,138,211,.3);
    }
    .explain{
        color: #000b;
    }
</style>