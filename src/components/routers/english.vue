<script>
  export default {
    props: {
        value: String
    },
    data(){
        return {
            result: {},
            type:undefined,
            explanation: [],
            displaymore:false
        }
    },
    methods: {
        search(){
            fetch("/api/searchEng?value=" + this.value, {
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
            }).then(r=>r.json()).then(r=>{
                this.result = r.result
                console.log(r);
            })
        }
    },
    watch: {
        value:{
            handler:async function  (newVal){
                this.search()
            },
            deep:true
        }
    },
    created(){
        this.search()
    }
    
  };</script>

<template>
    <div v-if="this.result !=(null || undefined)" class="dictionary">英语字典</div>
    <div class="box" v-if="result">
        <div class="word">
            {{ result.headWord }}
        </div>
        <p class="more">
            <span v-if="result.content.word.content.usphone == result.content.word.content.ukphone">
                英&美 /{{ result.content.word.content.usphone }}/
            </span>
            <span v-if="result.content.word.content.usphone != result.content.word.content.ukphone">
                英 /{{ result.content.word.content.ukphone }}/ 
                美 /{{ result.content.word.content.usphone }}/
            </span><br>
                释义: <span v-for="(item,index) in result.content.word.content.trans">
                    {{ item.pos }}.{{ item.tranCn }}
            </span>
        </p>
        <div class="bottom" @click="displaymore = true" v-if="displaymore == false">
            显示更多
        </div>
        <div v-if="displaymore == true" class="phrase ">
            <span v-for="(item,index) in result.content.word.content.phrase.phrases">
                {{ item.pContent + ' ' + item.pCn}} 
            </span>
        </div>
    </div>

</template>
<style scoped>
    .dictionary{
        margin-top: 10px;
        color: #0003;
        font-size: 10px;
    }
    .word{
        font-size: 54px;
        float: left;
        padding-right: 12px;
    }
    .more{
        font-size: 17px;
        white-space:pre-line
        /* line-height: ; */
    }
    .more>span{
        padding-left: 0.5em;
    }
    div.phrase{
        clear:both;
        display: flex;
        flex-direction: column;
    }
    .bottom{
        text-decoration: underline;
        color: rgb(0,138,211);
        cursor: pointer;
    }
</style>