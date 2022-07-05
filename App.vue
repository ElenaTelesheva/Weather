<template>
  <div id="app">
    <p>Брянск</p>
    <Search @search="startSearch" />
    <CurrentWeather v-if="currentWeather" v-bind:weather="currentWeather" />
    <WeatherForecast v-if="forecast.length > 0" v-bind:forecast="forecast" />

    {{ forecast[0] }}
  </div>

</template>

<script>
import Search from './components/Search.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Weather from './models/Weather';
import GetWeather from './services/getWeather.js';
import WeatherForecast from './components/WeatherForecast.vue';

export default {
  components: {
    Search,
    CurrentWeather,
    WeatherForecast
  },
  data() {
    return {
      currentWeather: null,
      searchText: null,
      forecast: []
    }
  },
  methods: {
    //передаём сюда введенный город
    startSearch(data) {
      this.searchText = data;
      GetWeather
        .getCurrentByQuery(data)
        .then(r => this.currentWeather = Weather.createByResponse(r));

      GetWeather
        .getNext5DaysByQuery(data)
        .then(r => {this.forecast = r.data.list;})

    }
  }
}
</script>

<style scoped>
</style>
