<script>
  import routerMap from './routers/index.js'

  import searchRulers from './routers/index.js'


console.log(components);

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
            this.templates = []
            // 清空展示表

            if(this.renderingState == 'not first' && this.renderingText == ''){
                this.templates.push('adviseList')
            }
        },
        deep: true
      }
    }
    
  };</script>

<template>
    <!-- {{ renderingText }} -->
    <!-- <welcome></welcome> -->
    <!-- <app>/</app> -->
    <div v-if="renderingText != ''&& renderingState == 'not first'">
        <h1>
        正在展示 <span style="text-decoration:underline"> {{ renderingText }} </span> 的内容
        </h1>
        <p style="color:#0006">提示：双击回车清空输入栏</p>
    </div>
    <component  :is="item" v-for="item in templates" :key="item"></component>
</template>
