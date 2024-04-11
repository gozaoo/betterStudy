<script>
    export default {
        props: {
            value: String
        },
        data() {
            return {
                result: {},
                type: undefined,
                explanation: []
            }
        },
        methods: {
            search() {
                fetch("/api/searchHan?value=" + this.value, {
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(r => r.json()).then(r => {
                    if (!r.result || r.result.length == 0) {
                        this.$emit('destroyThisItem')
                        return
                    }
                    this.result = r.result
                    this.type = r.type
                    if (this.result != (null || undefined)) {
                        this.explanation = (this.result.explanation) ? this.result.explanation.split('\n') : [];
                    }

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
    <div v-if="this.result !=(null || undefined)" class="dictionary">汉语字典</div>
    <div class="box" v-if="type == 'word'">
        <div class="word">
            {{ result.word }}
        </div>
        <p class="more">{{ result.pinyin }} 部首：{{ result.radicals }} 解释：<span
                v-for="(item,index) in this.explanation">{{ item }}</span></p>
    </div>

    <div class="box" v-if="type == 'ci' && result">
        <div class="word">
            {{ result.ci }}
        </div>
        <p class="more"> 解释：<span v-for="(item,index) in this.explanation">{{ item }}</span></p>
    </div>

    <div class="box" v-if="type == 'idiom' && result" v-for="(result, index) in result" :key="index">
        <div class="word">
            {{ result.word }}
        </div>
        <p class="more">{{ result.pinyin }} 解释：<span v-for="(item,index) in result.explanation">{{ item }}</span>
            例子：{{ result.derivation }}</p>
    </div>
    汉英互译
    <div v-for="(item,index) in result.toEnglish">
        {{ item.headWord }} <span v-for="(item_,index) in item.content.word.content.trans">
            {{ item_.pos }}.{{ item_.tranCn }}
        </span>
    </div>
    <br>
</template>
<style scoped>
    .box {
        clear: both
    }

    .dictionary {
        font-size: 10px;
    }

    .word {
        font-family: LXGWWenKai;
        font-size: 54px;
        float: left;
        padding-right: 12px;
    }

    .more {
        font-family: LXGWWenKai;
        font-size: 17px;
        white-space: pre-line
            /* line-height: ; */
    }

    .more>span {
        padding-left: 0.5em;
        font-family: LXGWWenKai;

    }
</style>