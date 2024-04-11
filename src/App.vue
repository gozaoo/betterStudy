<script>
  import searchBar from './components/searchBar.vue'
  import router from './components/router.vue'
import imformations from './components/imformations.vue';
  export default {
    name: 'app',
    components: {
      'search-bar': searchBar,
      'router': router,
      imformations
    },
    data() {
      return {
        text: '',
        renderingText: '',
        renderingState: 'first'
      }
    },
    methods: {

      updateSearchText(value) {
        if (!(value instanceof InputEvent)) {
          this.text = value
        }

      },
      onEnter() {
        this.renderingText = this.text
        this.renderingState = 'not first'
      }
    }
  };
</script>

<template>
  <div class="menu">
    <div class="leftSide">
      <router v-model:renderingState="renderingState" v-model:renderingText="this.renderingText"></router>
      <search-bar @onEnter="onEnter" @inputMethods="updateSearchText" v-model="text"></search-bar>
    </div>
    <div class="rightSide">
      <imformations></imformations>
    </div>
  </div>

</template>

<style scoped>
  .menu {
    display: grid;
    position: relative;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    padding-bottom: 5vw;

    height: 100vh;
    width: 100%;
    gap: 5vw;
  }

  .leftSide {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    grid-row-start: 1;
    grid-column-start: 1;
    padding-bottom: 5vw;
    grid-row-end: 3;
    gap: 1.3rem;
    grid-column-end: 2;
  }
  .rightSide {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 5vw;
    gap: 1.3rem;
   grid-row-start: 1;
   grid-column-start: 2;
align-items: flex-end;
   grid-row-end: 3;
   grid-column-end: 3;
  }
</style>