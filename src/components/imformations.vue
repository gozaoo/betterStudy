<script>
    import timeFormater from '../js/timeFormater';
    import card from './card.vue';
    import alarm from './routers/alarm.vue';
    export default {
        name: 'imformations',
        props: {},
        components: {card,alarm},
        data() {
            return {
                time: timeFormater.formatTime({
                    type: 'time'
                }),
                intervalIds: [

                ]
            }
        },
        created()  {
            this.intervalIds.push(
                setInterval(
                    ()=>{this.time = timeFormater.formatTime({
                        type: 'time'
                    })},
                    1000
                )
            )
        },
        beforeDestroy(){
            this.intervalIds.forEach((value,index)=>{
                clearInterval(value)
            })
        },
        methods: {
            ...timeFormater
        },
        watch: {}

    };
</script>

<template>
    <card >
        <alarm/>
    </card>
    <card >
        <div class="time">
            {{ time }}
        </div>
    </card>
</template>
<style scoped>
.time{
    font-size: 5em;
    padding: .2em .3em;
    font-weight: 999;
    letter-spacing: 0px;
    font-family: "Lucida Console", Consolas, "Courier New", Courier, monospace;  
}
</style>