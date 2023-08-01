<script setup >
    import { ref, watchEffect, watch, computed } from 'vue';


    const nowAlarm = ref(localStorage.getItem('alarm'))
    console.log(nowAlarm);
    if(nowAlarm.value != null) {
        nowAlarm.value = JSON.parse(nowAlarm.value)
        
    } else {
        
    }

    const data = ref({
        timeContent: '',
        hour: 0,
        minute: 0,
        seconds: 0,
        todaysSeconds: 0,
        nowThings:[],
        display:{
            title: '--',
            remainingTime: '--:--',
            finishwork: false,
            index: 0
        }
    })
    let toTwoLength=(num)=>{
            if(Number(num)<10){
                return '0'+ num
            } else {
                return num
            }
        }

    function gettodaysSeconds(hour,minute,seconds){
        
        return ((((isNaN(hour))?0:hour) * 60 * 60) + (((isNaN(minute))?0:minute) * 60) + ((isNaN(seconds))?0:seconds))
    }

        let updateTime=()=> {
            let tempTime = new Date()
            let tempTimeMil = Date.now()
            data.value.hour = tempTime.getHours()
            data.value.minute = tempTime.getMinutes()
            data.value.seconds = tempTime.getSeconds()
            data.value.todaysSeconds = gettodaysSeconds(data.value.hour ,data.value.minute,data.value.seconds)
            data.value.timeDisplay = timeDisplay()
            
            if(nowAlarm.value != null) {
                let nowThingsIndex = nowAlarm.value.timePoint.findIndex((item)=>item.time > tempTimeMil)
                let nowThings = nowAlarm.value.timePoint[nowThingsIndex]

                
                if(nowThings){
                    data.value.display.index = nowThingsIndex
                    data.value.display.title = (nowThings.type == 'work')?'请工作':'休息时间到'
                    let offsetMil = (nowThings.time - tempTimeMil)
                    data.value.display.remainingTime  = toTwoLength(Math.trunc( offsetMil / 1000 / 60 ))+ ':' + toTwoLength((( offsetMil / 1000 % 60 ) - 1).toFixed(0))
                } else {
                    data.value.display.title = '完成啦！'
                    data.value.display.finishwork = true
                }
            }

            
            setTimeout(() => {
            updateTime()
            }, 1000);   
        } 
        updateTime()


    function timeDisplay(){

        return toTwoLength(data.value.hour) + ':' + toTwoLength(data.value.minute)
    }

    function getMillisecond(hour,minute,seconds){
        return ((((isNaN(hour))?0:hour) * 60 * 60 * 1000) + (((isNaN(minute))?0:minute) * 60 * 1000) + ((isNaN(seconds))?0:(seconds * 1000)))
    }

    const createANewAlarm = ref({
        times: 1,
        startTime:null  
    })

    let startAlarm=()=>{

        let theAlarm = createANewAlarm.value
        theAlarm.startTime = Date.now()
        theAlarm['timePoint'] = []
        
        let tempLastTime = theAlarm.startTime
        for (let i = 1; i <= theAlarm.times; i++) {
            if(i != 1){
                theAlarm.timePoint.push({
                    type:'rest',
                    time: tempLastTime + getMillisecond(0,5)
                })
                tempLastTime = tempLastTime + getMillisecond(0,5)
                console.log(new Date(tempLastTime));
            }
            theAlarm.timePoint.push({
                type:'work',
                time: tempLastTime + getMillisecond(0,25)
            })
            tempLastTime = tempLastTime + getMillisecond(0,25)
            console.log(new Date(tempLastTime));

        }

        console.log(theAlarm);

        // document.body.requestFullscreen()

        localStorage.setItem('alarm',JSON.stringify(theAlarm))
        nowAlarm.value = theAlarm
    }

    let cleanAlarm=()=>{
        localStorage.setItem('alarm',null)
        nowAlarm.value = undefined
    }
</script>
<template>
    <div>
        <!-- <h1 ref="">{{  timeDisplay() }}</h1> -->
        <div v-if="nowAlarm == null" class="alarm">
            <h2>专注</h2>
            <div>使用<a > 番茄工作法 </a>可以提升专注力和工作效率</div>

            <div class="setter">
                
                <div @click="(createANewAlarm.times>1)?createANewAlarm.times--:undefined" class="buttom">
                    -
                </div>
                <div class="count">
                    {{createANewAlarm.times * 25 + ((createANewAlarm.times - 1) * 5)}}
                    <span>分钟</span>
                </div>
                <div @click="createANewAlarm.times++" class="buttom">
                    +
                </div>
            </div>
            <div @click="startAlarm" class="alarmStart">开始</div>
        </div>
        <div class="alarm" v-if="nowAlarm">
            <h2>
                {{ data.display.title }} {{ '('+ (data.display.index + 1) + '/' + (nowAlarm.timePoint.length) +')' }}
            </h2>
            <div>还有 {{ data.display.remainingTime }} 结束</div>
            <br>

            <div @click="cleanAlarm" class="alarmStart">清除闹钟</div>
        </div>
        
    </div>
</template>
<style scoped>
    h2{
        margin: 6px 0;
    }
    h2+div{
        color: #888;
    }
    .alarm{
        background-color: #00000008;
        border-radius: 13px;
        /* box-sizing: border-box; */
        padding: 10px;
        margin: 20px -10px;
    }
    .setter{
        display: flex;
        flex-direction: row;
        height: 80px;
        width: fit-content;
        margin: 12px 0;
        gap: 10px;
        position: relative;
    }
    .count{
        background-color: #fff;
        min-width: 120px;
        border-radius: 13px;
        display: flex;
        width: fit-content;
        height: inherit;   
        justify-content: center;
        align-items: center;
        font-size: 28px;
    }
    .count span{
        position: absolute;
        font-size: 10px;
        color: #0005;
        bottom: 3px;
    }
    .buttom{
        background-color: #fff;
        min-width: 50px;
        border-radius: 13px;
        display: flex;
        height: inherit;   
        justify-content: center;
        align-items: center;
        font-size: 28px;
        cursor: pointer;
        user-select: none;
    }
    .alarmStart{
        background-color: rgb(0,138,211);
        color: white;
        width: fit-content;
        cursor: pointer;
        padding: 12px 18px;
        border-radius: 12px;
        margin-bottom: 5px;
        box-shadow: 0px 3px 5px rgb(0,138,211,.3);
    }
</style>
    