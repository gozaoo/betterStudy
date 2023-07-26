<script>
  import searchBar from './components/searchBar.vue'
  import router from './components/router.vue'

  export default {
    name: 'app',
    components:{
      'search-bar': searchBar,
       'router': router
    },
    data(){
      return {
        text: '',
        renderingText: '',
        renderingState: 'first'
      }
    },
    methods: {

        updateSearchText(value) {
          if(!(value instanceof InputEvent)){
            this.text = value
            // console.log(value);
          } 

        },
        onEnter(){
          this.renderingText = this.text
          this.renderingState = 'not first' 
        }
    }
  };

</script>

<template>


  <router v-model:renderingState="renderingState" v-model:renderingText="this.renderingText"></router>
  <search-bar @onEnter="onEnter"  @inputMethods="updateSearchText"  v-model="text"></search-bar>

</template>

<style scoped>
</style>
  