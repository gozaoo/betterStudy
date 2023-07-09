<script>
  export default {
    name: 'search-bar',
    props: ['value'],
    data(){
        return {
            text: '',
            componentState: 'wating',
            textareaState: 'blur',
            lastEnterTime: Date.now()
        }
    },
    methods: {
        focusEvent(event){
            this.textareaState = event.type
        },
        enterEvent(event){
            // console.log(event);
            if(event.shiftKey){ return }
            event.preventDefault()

            let tempTime = Date.now()
            console.log(tempTime - this.lastEnterTime );
            if((tempTime - this.lastEnterTime )<= 500){
                this.text = ''
                
                // console.log(1);

            }
            this.lastEnterTime = tempTime
            this.$nextTick(()=>{
                this.$emit('onEnter'); 
                // console.log(1);
            })
        }
    },
    watch: {
      text: {
        handler: async function (newVal) {
            this.$emit('inputMethods', newVal); // 触发一个自定义事件input，并将inputText的值作为参数传递给父组件
            
        },
        deep: true
      }
    }
    
  };
</script>

<template>
    <div class="inputBar">

        <h1>Better Study</h1>

        <div class="input">
            <div class="leftControl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
            <div class="content">
                <span>{{ text }}</span>
                <textarea @keydown.enter="enterEvent" placeholder="键入你的内容"  @focus="focusEvent" @blur="focusEvent" v-model="text"></textarea>
            </div>

            
            <div class="rightControl">
                <div :class="['send',(text != '')?'visible':'']">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                </div>
            </div> 
        </div>

    </div>

</template>
<style scoped>
.inputBar{
    position: fixed;
    bottom: 20px;
    width: calc(100% - var(--paddingValue) * 2);
}
    h1{
        margin: 10px 0;
        font-size: 1rem;
        color: #0005;

}

textarea::placeholder{
    color: #0005;
}
.input{
    width: 100%;
    margin-top: 1.3rem;
    /* min-height: 3em; */
    height: fit-content;
    border-radius: 1em;
    box-shadow: 0 0 1em #0001;
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    cursor: text;
    flex-direction: row;
    overflow: hidden;
}
.leftControl{
    color: #0006;
    max-width: 1.2em;
    min-width: 1.2em;
    flex-shrink: 0;
}
.content{
    display: block;
    margin:0 6px;
    position: relative;
    /* width: 100%; */
    /* flex: ; */
    flex-grow: 1;
    overflow: hidden;
    font-size: 0.9rem;
}
.content textarea{
    border: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    resize:none;
    /* overflow: hidden; */
    outline: none;
    height: 100%;
    bottom: 100%;
    width: 100%;
    font-size: 0.9rem;
    color: #000b;
    overflow: hidden;
        
    white-space: pre-wrap;
    word-wrap: break-word;
  /* visibility: hidden; */
  /* visibility: visible; */

}
.content span {
  display: block;
  min-height: 24px;
  /* white-space: ; */
  word-wrap: break-word;
  visibility: hidden;
    font-size: 0.9rem;
  white-space: pre-wrap  
}
.rightControl{
    color: #0006;
    /* max-width: 1.2em; */
    min-width: 1.2em;
    flex-shrink: 0;
    height: 100%;
    /* margin-left: 5px; */
}
.rightControl > .send{
    display: block;
    width:1.2em;
    height: 1.2em;
    color: rgb(0,138,211,0);

    box-sizing: border-box;
    /* aspect-ratio: 1 / 1; */
    cursor: pointer;
    transition: 0.3s linear;
    scale: 0.8;
}
.send.visible{
    color: rgb(0,138,211);
    scale: 1;
}
</style> 