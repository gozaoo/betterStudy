<script>
    import routerMap from './routers/index.js'
    import searchCard from './card.vue';
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
        components: {
            ...routerMap,
            searchCard
        },
        data() {
            return {
                text: this.renderingText,
                templates: ['adviseList'],
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
                        this.templates = [ ...searchInfo]
                    } else {
                        this.templates = [(searchInfo.info == '')?'adviseList':null, searchInfo.type]
                        this.miniApp.destination = searchInfo.destination
                        this.miniApp.info = searchInfo.info
                    }

                    // 清空展示表

                    if (this.renderingState == 'not first' && this.renderingText == '') {
                        this.templates = ['adviseList']
                    }
                },
                deep: true
            }
        }

    };
</script>

<template>
    <searchCard v-for="item in templates" :key="item">
        <component 
            :value="renderingText" 
            :miniAppValue="miniApp.info" 
            :destination="miniApp.destination" 
            :is="item"
            @destroyThisItem="templates = templates.filter(items => items != item);"
            
            >
        </component>
    </searchCard>
</template>
<style scoped>
    footer {
    }
</style>