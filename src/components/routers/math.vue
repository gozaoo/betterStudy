<script>
    import {
        evaluate, isFunction
    } from 'mathjs'
    export default {
        props: {
            value: String
        },
        data() {
            return {
                result: ''
            }
        },
        methods: {
            evaluate() {
                this.result = evaluate(this.value)
                if(isFunction(this.result)){
                    this.$emit('destroyThisItem')
                }
            }
        },
        watch: {
            value: {
                handler: async function (newVal) {
                    this.evaluate()
                },
                deep: true
            }
        },
        created() {
            this.evaluate()
        }

    };
</script>

<template>
    <div v-if="this.result !=undefined" class="dictionary">计算结果</div>
    <h1 class="box" v-if="result">
        {{ result }}
    </h1>
</template>
<style scoped>
    h2 {
        margin: 0.3em 0 0em 0;
        font-size: 1em;
    }
    h1{
        margin: 0.3em 0 0em 0;
        font-size: 2em;
    }
</style>