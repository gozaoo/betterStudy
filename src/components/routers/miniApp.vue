<script>
    export default {
        props: {
            value: String,
            destination: String,
            miniAppValue: String
        },
        data() {
            return {
                src: null,
                style: {

                },
                nameMap: {
                    sydy: {
                        path: 'www.shenyandayi.com/wantQuotesResult',
                        basicParam: {
                            lang: 'zh',
                            mode: 1
                        },
                        paramValueName: 'query',
                        style: {
                            'margin-top': '-63px',
                            '--left': '-296px'
                        }
                    },
                    bing: {
                        path: 'bing.com/search',
                        basicParam: {
                            // lang: 'zh',
                            // mode: 1
                        },
                        paramValueName: 'q',
                        style: {
                            'margin-top': '-150px'
                        }
                    },
                    tran: {
                        path: 'cn.bing.com/translator',
                        basicParam: {
                        },
                        paramValueName: 'text',
                        style: {
                            'margin-top': '-150px',
                        }
                    }
                }
            }
        },
        methods: {
            linkCreate(path, param) {

                let paramContent = ''
                let first = false
                for (const key in param) {
                    if (param.hasOwnProperty.call(param, key)) {
                        if (first == true) {
                            paramContent += '&'
                        }
                        first = true
                        const element = param[key];
                        paramContent += key + '=' + element
                    }
                }
                return '//' + path + '?' + paramContent
            },
            search() {
                // return
                this.src = this.linkCreate(this.nameMap[this.destination].path, {
                    ...this.nameMap[this.destination].basicParam,
                    [this.nameMap[this.destination].paramValueName]: this.miniAppValue
                })
            }
        },
        watch: {
            value: {
                handler: async function (newVal) {
                    this.search()
                },
                deep: true
            }
        },
        created() {
            this.search()
        }

    };
</script>

<template>
    <div v-if="miniAppValue != ''">
        <span></span>
        <iframe  :style="nameMap[this.destination].style" :src="src" frameborder="0"></iframe>
    </div>
</template>
<style scoped>
div{
    width: calc(var(--paddingValue) * 2 + 100%);
        overflow: hidden;
        height: calc(100vh - 242px);
        margin-left: calc(var(--paddingValue) * -1);
        position: relative;

}
    iframe {
        --left:0px;
        width: calc(100% + var(--left) * -1);
        height: calc(100% + 242px);
        position: absolute;
        margin-left: var(--left);
    }
</style>