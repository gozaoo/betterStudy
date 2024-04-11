<script>
    export default {
        // name: 'search-bar',
        props: {
            hidden: Boolean,
            value: String
        },
        data() {
            return {
                keywordAdvise: [{
                        key: '[双击回车]',
                        explain: '清空输入栏'
                    },
                    {
                        key: '中文字/词典',
                        explain: '键入中文'
                    },
                    {
                        key: '英文字/词典',
                        explain: '键入英文'
                    },
                    {
                        key: '数学',
                        explain: '数学计算'
                    },
                    {
                        key: '/',
                        explain: '智能搜索'
                    }
                ],
                CommendAdvise:[{
                    key: '[任意内容]',
                    explain: '使用必应搜索'
                },{
                    key: 'sydy',
                    explain: '使用深言达意搜索句子'
                },{
                    key: 'tran',
                    explain: '翻译'
                }],
                usingCommend: false

            }
        },
        methods: {
            // focusEvent(event){
            //     this.textareaState = event.type
            // }
        },
        watch: {
            value: {
                handler: async function (newVal) {
                    this.usingCommend = (newVal[0] == '/'||newVal[0] == '、')?true:false;
                },
                deep: true
            }
        },
        created(){
            if(!this.value){
                return
            }
            this.usingCommend = (this.value[0] == '/'||this.value[0] == '、')?true:false;
        }

    };
</script>

<template>
    <h1 v-if="hidden != true">我能干这些</h1>
    <div class="flex">
        <div class="adviseBox" v-for="(item,index) in (usingCommend)?CommendAdvise:keywordAdvise">
            <div class="advise">{{item.key}}</div>
            <div class="explain">{{ item.explain }}</div>
        </div>
    </div>
</template>
<style scoped>
    div.flex {
        display: flex;
        gap: 10px;
        margin-top: 0px;
        max-width: 100%;
        overflow: hidden;
        flex-wrap: wrap;
    }
    h1{
        margin-top: 2px;
    }
    .adviseBox {
        min-width: fit-content;
        min-height: fit-content;
    }

    .advise {
        background-color: rgb(0, 138, 211);
        color: white;
        width: fit-content;
        padding: 3px 5px;
        border-radius: 6px;
        margin-bottom: 3px;
        font-size: 0.5em;
        box-shadow: 0px 3px 5px rgb(0, 138, 211, .3);
    }

    .explain {
        font-size: 0.5em;
        color: #000b;
    }
</style>