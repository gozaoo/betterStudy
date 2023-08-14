<script>
  import routerMap from './routers/index.js'

  import searchRulers from './searchRulers/index.js'

  export default {
    name: 'router',
    props: {
        renderingText: {
            type: String
        },
        renderingState: {
            type: String
        }
    },
    components: routerMap
,
    data(){
        return {
            text: this.renderingText,
            templates: ["welcome"]
        }
    },
    methods: {
        // focusEvent(event){
            // this.textareaState = event.type
        // }
    },
    watch: {
      renderingText: {
        handler: async function (newVal) {
            
            this.templates = ['alarm',...searchRulers.fitContent(newVal)]
            // 清空展示表

            if(this.renderingState == 'not first' && this.renderingText == ''){
                this.templates=['alarm','adviseList']
            }


        },
        deep: true
      }
    }
    
  };</script>

<template>

    <div v-if="renderingText != ''&& renderingState == 'not first'">
        <h1>
        正在展示 <span style="text-decoration:underline"> {{ renderingText }} </span> 的内容
        </h1>
        <p style="color:#0006">提示：双击回车清空输入栏</p>
    </div>
    <component :value="renderingText"  :is="item" v-for="item in templates" :key="item"></component>
    <footer></footer>
</template>
<style scoped>
    footer{
        margin-bottom: 134px;
    }
</style>