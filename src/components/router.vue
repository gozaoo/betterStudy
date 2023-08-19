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
        components: routerMap,
        data() {
            return {
                text: this.renderingText,
                templates: ["welcome"],
                miniApp: {
                    destination: null,
                    info: ''
                }
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

                    let searchInfo = searchRulers.fitContent(newVal)
                    console.log(searchInfo);
                    if (searchInfo instanceof Array) {
                        this.templates = ['alarm', ...searchInfo]
                    } else {
                        this.templates = ['alarm',(searchInfo.info == '')?'adviseList':null, searchInfo.type]
                        this.miniApp.destination = searchInfo.destination
                        this.miniApp.info = searchInfo.info
                    }

                    // 清空展示表

                    if (this.renderingState == 'not first' && this.renderingText == '') {
                        this.templates = ['alarm', 'adviseList']
                    }
                },
                deep: true
            }
        }

    };
</script>

<template>
    <component 
        :value="renderingText" 
        :miniAppValue="miniApp.info" 
        :destination="miniApp.destination" 
        :is="item"
        v-for="item in templates" :key="item"></component>
    <footer></footer>
</template>
<style scoped>
    footer {
        margin-bottom: 134px;
    }
</style>