<script>
    import anime from 'animejs'
    import audio1 from '../../assets/classBegin.mp3?url'
    import audio2 from '../../assets/overCLass.mp3?url'

    export default {
        data() {
            return {
                PomodoroTimerInfo: null,
                audio: document.createElement("audio"),
                useAudio: false,
                audioLastClickTime: new Date(),
                state: {
                    currentIndex: 0,
                    tempOldIndex: 0,
                    currentPomodoroEventInfo: {
                        progress: 0,
                        title: "",
                        remainingTime: null,
                    },
                    progress: 0,
                    remainingTime: null,
                    finished: false,
                },
                interval: null,
                pomodoroCreater: {
                    num: 1,
                    origNum: 1,
                    tempPomodoroTimerInfo: this.createPomodoroTimer(1)
                }
            }
        },
        created() {
            let localStorageInfo = localStorage.getItem('alarm')


            if (localStorageInfo != null) {
                this.PomodoroTimerInfo = JSON.parse(localStorageInfo)
                console.log(this.PomodoroTimerInfo);
                this.timerInterval()
            }

        },
        components: {},
        methods: {
            formatDate(date) {
                const hour = date.getHours();
                const min = date.getMinutes();
                let h = '';
                let m = '';
                if (hour < 10) {
                    h += '0'
                }
                if (min < 10) {
                    m += '0'
                }
                h += hour;
                m += min;
                return h + ':' + m

            },
            // 将时间格式化
            formatTime(time) {
                // 计算总秒数
                let totalSeconds = Math.floor(time / 1000);

                // 计算小时数
                let hours = Math.floor(totalSeconds / 3600);

                // 计算剩余的秒数
                let remainingSecondsAfterHours = totalSeconds % 3600;

                // 计算分钟数
                let minutes = Math.floor(remainingSecondsAfterHours / 60);

                // 计算剩余的秒数
                let seconds = remainingSecondsAfterHours % 60;

                // 返回格式化后的时间字符串
                return `${(hours == 0)?"":(hours+":")}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            },
            // 计算剩余时长、过去时长以及时间状态
            calculateTime(endTime) {
                // 获取当前时间
                let now = new Date().getTime();
                // 获取结束时间
                let end = new Date(endTime).getTime();

                // 计算时间差（以毫秒为单位）
                let diff = end - now;

                // 格式化时间差
                let formattedTime = this.formatTime(Math.abs(diff));

                // 判断时间状态
                let isPast = diff < 0;

                // 返回结果
                return {
                    formattedTime: formattedTime,
                    state: isPast
                };
            },
            // 创建番茄钟
            createPomodoroTimer(pomodoroCount) {
                let pomodoroDuration = 25; // 番茄钟时长（分钟）
                let shortBreakDuration = 5; // 短休息时长（分钟）
                let longBreakDuration = 15; // 长休息时长（分钟）
                let currentTime = Date.now();
                let pomodoroTimer = {
                    pomodoroCount: pomodoroCount,
                    createdAt: currentTime,
                    endAt: null,
                    duration: null,
                    schedule: [],
                    use: false,
                };
                let currentPomodoro = 1;
                let currentTimePlusDuration;
                // 添加一个事件到番茄钟表
                let addEventToSchedule = (schedule, startTime, eventDuration, event) => {
                    const endTime = startTime + eventDuration * 60000;
                    schedule.push({
                        startTime: startTime,
                        endTime: endTime,
                        event: event
                    });
                    return endTime;
                }

                while (currentPomodoro <= pomodoroCount) {
                    // 添加专注事件
                    currentTime = addEventToSchedule(pomodoroTimer.schedule, currentTime, pomodoroDuration, '专注中');

                    // 根据当前番茄钟数量决定是长休息还是短休息
                    if (currentPomodoro != pomodoroCount)
                        if (currentPomodoro % 4 === 0) {
                            currentTime = addEventToSchedule(pomodoroTimer.schedule, currentTime, longBreakDuration,
                                '长休息');
                        } else {
                            currentTime = addEventToSchedule(pomodoroTimer.schedule, currentTime, shortBreakDuration,
                                '短休息');
                        }

                    currentPomodoro++;
                }
                let endAt = pomodoroTimer.schedule[pomodoroTimer.schedule.length - 1].endTime
                pomodoroTimer = {
                    ...pomodoroTimer,
                    endAt,
                    duration: endAt - pomodoroTimer.createdAt
                }
                return pomodoroTimer;
            },
            // 启动一个番茄钟事件
            startNewPomodoroTimer(pomodoroCount) {
                let PomodoroTimerInfo = this.createPomodoroTimer(pomodoroCount)
                PomodoroTimerInfo.use = true
                localStorage.setItem('alarm', JSON.stringify(PomodoroTimerInfo))
                this.PomodoroTimerInfo = PomodoroTimerInfo
                this.state.finished = false
                this.timerInterval()
            },
            // 番茄钟事件循环
            timerInterval(isReFreshen) {
                let calculate = () => {
                    let PomodoroTimerInfo = this.PomodoroTimerInfo;


                    if (PomodoroTimerInfo == null) return clearInterval(this.interval);


                    let currentTime = new Date().getTime();

                    // 找到当前番茄钟事件
                    let result = PomodoroTimerInfo.schedule.find((val, ind, obj) => {
                        if (val.startTime <= currentTime && currentTime < val.endTime) {
                            this.state.currentIndex = ind;
                            this.state.currentPomodoroEventInfo = {
                                progress: this.progressCalculate(val.startTime, val.endTime,
                                    currentTime),
                                title: val.event,
                                remainingTime: this.calculateTime(val.endTime)
                            }
                            return true
                        }
                    })
                    if (result == undefined) {
                        this.state = {
                            ...this.state,
                            remainingTime: null,
                            finished: true,
                            progress: 1
                        }
                        clearInterval(this.interval);
                    }
                    this.state = {
                        ...this.state,
                        remainingTime: this.calculateTime(PomodoroTimerInfo.schedule[PomodoroTimerInfo.schedule
                            .length - 1].endTime),
                        progress: this.progressCalculate(PomodoroTimerInfo.createdAt, PomodoroTimerInfo
                            .schedule[PomodoroTimerInfo.schedule.length - 1].endTime,
                            currentTime)
                    }
                    // console.log(this.state);
                }
                calculate()
                if (isReFreshen != true) {
                    this.interval = setInterval(() => calculate(), 1000)
                }
            },
            progressCalculate(start, end, cur) {
                return (start - cur) / (start - end)
            },
            cleanAlarm() {
                localStorage.setItem('alarm', null)
                clearInterval(this.interval)
                this.interval = null
                this.PomodoroTimerInfo = null
                this.state.finished = false
            },
            playActionAudiolet() {
                if (this.useAudio == false || !this.audio.paused) return;
                this.audio.volume = 1
                let timetemp = new Date();
                this.audioLastClickTime = timetemp
                
                let pause = () => {
                    if (this.audioLastClickTime != timetemp) return;
                    anime({
                        targets: this.audio,
                        volume: [1, 0],
                        easing: 'steps(100)',
                        duration: 2000,
                        finished: () => {
                            this.audio.pause()
                        }
                    })
                }

                switch (this.state.currentPomodoroEventInfo.title) {
                    case "专注中":
                        this.audio.src = audio1
                        this.audio.currentTime = 3;
                        this.audio.play()
                        setTimeout(pause, 14000);
                        break;
                    default:
                        this.audio.src = audio2
                        this.audio.currentTime = 0;
                        this.audio.play()
                        setTimeout(pause, 21000);
                        break;
                }
            }
        },
        watch: {
            pomodoroCreater: {
                handler: async function (newVal, oldVal) {
                    if (newVal.num != oldVal.origNum) {
                        newVal.origNum = newVal.num
                        newVal.tempPomodoroTimerInfo = this.createPomodoroTimer(newVal.num)
                    }
                },
                deep: true
            },
            state: {
                handler: async function (newVal, oldVal) {
                    console.log( newVal.finished == true,newVal.currentIndex != oldVal.tempOldIndex);
                    if (newVal.finished == true || newVal.currentIndex != oldVal.tempOldIndex) {
                        this.state.tempOldIndex = newVal.currentIndex
                        this.playActionAudiolet()
                    }
                },
                deep: true
            }
        }

    };
</script>
<template>
    <div class="alarmBox">
        <div v-if="state.finished == true">
            <div :style="{'--per': '100%'}" class="background">
                <div class="progressLine"></div>
                <div class="inner" id="box">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 600 140" class="box-waves">
                        <path d="M 0 70 Q 75 20,150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z">
                        </path>
                    </svg>
                </div>
                <div class="text">
                    100%
                </div>
            </div>
            <h2>
                完成了
            </h2>
            <h1> 结束了{{  formatTime(PomodoroTimerInfo.duration) }}的专注。</h1>
            <div class="buttomArea">
                <button @click="cleanAlarm()">
                    结束
                </button>
                <div
                    style="margin-top:auto;font-size:12px;text-align: right;color:#0002;font-weight: bolder; margin-left: auto;">
                    总进度100%<br />结束时间{{ formatDate(new Date(PomodoroTimerInfo.endAt))}}
                </div>
            </div>

        </div>
        <div v-if="interval != null && PomodoroTimerInfo!=null && state.finished == false">
            <div :style="{'--per': ((state.currentPomodoroEventInfo.progress * 100).toFixed(0))+'%'}"
                class="background">
                <div class="progressLine"></div>
                <div class="inner" id="box">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 600 140" class="box-waves">
                        <path d="M 0 70 Q 75 20,150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z">
                        </path>
                    </svg>
                </div>
                <div class="text">
                    {{ ((state.currentPomodoroEventInfo.progress * 100).toFixed(0))+'%' }}
                </div>
            </div>
            <h2>
                {{ state.currentPomodoroEventInfo.title }}
                <span>({{ (state.currentIndex + 1) + "/" + (PomodoroTimerInfo.schedule.length) }})</span>
            </h2>
            <h1> {{  state.currentPomodoroEventInfo.remainingTime.formattedTime }}</h1>
            <div class="buttomArea">
                <button @click="cleanAlarm()">
                    结束
                </button>
                <button @click="this.audio.pause();useAudio = !useAudio;this.playActionAudiolet()">
                    <svg v-if="!useAudio" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
                    </svg>
                    <svg v-if="useAudio" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-volume-down-fill" viewBox="0 0 16 16">
                        <path
                            d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm3.025 4a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
                    </svg>
                </button>
                <div
                    style="margin-top:auto;font-size:12px;text-align: right;color:#0002;font-weight: bolder; margin-left: auto;">
                    总进度{{ ((state.progress * 100).toFixed(0))+'%' }}<br />结束时间{{ formatDate(new Date(PomodoroTimerInfo.endAt))}}
                </div>
            </div>

        </div>
        <div v-if="PomodoroTimerInfo==null">
            <h2>开始专注</h2>
            <h1>选择持续至的工作时间</h1>
            <div>使用番茄钟工作法，能够有效提升工作效率</div>
            <div class="numSetter buttomArea">
                <div @click="(pomodoroCreater.num != 1)?(pomodoroCreater.num--):''" class="button">-</div>
                <div class="button">

                    {{ formatDate(new Date(this.pomodoroCreater.tempPomodoroTimerInfo.endAt))}}结束
                </div>
                <div @click="pomodoroCreater.num++" class="button">+</div>
            </div>
            <button @click="startNewPomodoroTimer(this.pomodoroCreater.num)">
                创建
            </button>
        </div>
    </div>

</template>
<style scoped>
    h2 {
        margin: 0.5em 0 -.2em 0;
        font-size: 20px;
    }

    h1 {

        margin: 0px 0 0.2em 0;
    }

    .buttomArea {
        display: flex;
        gap: 5px;
        user-select: none;
    }

    .numSetter {
        margin: 10px 0;
    }

    button,
    .button {
        background-color: #0001;
        outline: none;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 9px;
        backdrop-filter: blur(8px);
        /* color: #fff; */
        box-shadow: 0 0 10px #00000010;
    }

    .alarmBox {
        position: relative;
        padding: 10px;
        overflow: hidden;
        border-radius: 15px;
        background: #0001;
        color: #000a;
        margin: 6px 0 0 0px;
    }

    .background {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        z-index: -1;
        width: 100%;
        overflow: hidden;
        --fillColor: rgb(160, 220, 255)
    }

    .background>.text {
        position: absolute;
        right: 0px;
        top: 0;
        font-size: 7em;
        color: #00000007;
        font-weight: 900
    }

    .progressLine {
        position: absolute;
        height: 100%;
        width: calc(var(--per) - 50px);
        background-color: var(--fillColor);
        transition: width 2.5s cubic-bezier(.2, .7, .3, 1) ;
        left: 0;
        top: 0;
    }

    .inner {
        position: absolute;

        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
        left: var(--per);
        transition: 2.5s cubic-bezier(.2, .7, .3, 1);
        animation: spawn 1s cubic-bezier(.2, .7, .3, 1);
    }

    @keyframes spawn {
        from {
            left: -20%
        }

        to {
            left: var(--per)
        }
    }

    .inner>svg {
        transform: rotate(90deg) translate(-70px);
        transform-origin: 0 50%;
        fill: var(--fillColor);

        height: 100%;
        animation: waveMove 5s linear infinite;
    }

    @keyframes waveMove {
        from {
            transform: rotate(90deg) translate(-100px);
        }

        to {
            transform: rotate(90deg) translate(calc(-100px - 50%));
        }
    }
</style>