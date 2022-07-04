<template>
  <div id="app">
    <Search @search="startSearch"/>
    <CurrentWeather v-if="currentWeather" v-bind:weather="currentWeather" />
  </div>
   
</template>

<script>
import Search from './components/Search.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Weather from './models/Weather';
import GetWeather from './services/getWeather.js';


export default {
  components: {
    Search,
    CurrentWeather
  }, 
  data() {
    return {
      currentWeather: null
      }
  }, 
  methods: {
    //передаём сюда введенный город
    startSearch(data){
      console.log('мы получили город '+ data)
      GetWeather
        .getCurrentByQuery(data)
        .then(r => this.currentWeather = Weather.createByResponse(r));
    }
  }
}
</script>

<style scoped>

</style>
