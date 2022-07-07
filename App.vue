<template>
  <div id="app">
    <p>Брянск</p>
    <Search @search="startSearch" />
    <CurrentWeather v-if="currentWeather" v-bind:weather="currentWeather" />

    <button @click="switchMode('Today')">Today</button>
    <button @click="switchMode('Tomorrow')">Tomorrow</button>
    <button>Next 5 Days</button>
    <WeatherForecast v-if="forecast.length > 1" v-bind:forecast="forecast" />

  </div>
</template>

<script>
import Search from './components/Search.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Weather from './models/Weather';
import BigWeather from './models/BigWeather'
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
      commonForecast: [],
      mode: 'Today',
      forecast: [],
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
        .then(r => {
          r.data.list.forEach(el => {
            this.commonForecast.push(
              BigWeather.createByResponse(el)
            )
          });
          this.show();
        });

    },
    show() {
      this.forecast.length = 0;
      if (this.mode == 'Today') {
        let now = new Date();
        let month = (now.getMonth() + 1).toString().length == 2 ? now.getMonth() : '0' + (now.getMonth() + 1);
        let day = now.getDate().toString().length == 2 ? now.getDate() : '0' + now.getDate();

        this.commonForecast.forEach(el => {
          if (el.date[0][0] == now.getFullYear() && el.date[0][1] == month && el.date[0][2] == day) {
            this.forecast.push(el);
          }
        })
      }
      else if (this.mode == 'Tomorrow') {
        console.log('мы тут')
        console.log(this.commonForecast)

        let now = new Date();
        let tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        let month = (tomorrow.getMonth() + 1).toString().length == 2 ? tomorrow.getMonth() : '0' + (tomorrow.getMonth() + 1);
        let day = tomorrow.getDate().toString().length == 2 ? tomorrow.getDate() : '0' + tomorrow.getDate();

        this.commonForecast.forEach(el => {
          console.log(el)
          if (el.date[0][0] == tomorrow.getFullYear() && el.date[0][1] == month && el.date[0][2] == day) {
            this.forecast.push(el);
          }
        })
      }
    },
    switchMode(mode) {
      this.mode = mode;
      this.show();
    }
  },

}

</script>

<style scoped>
</style>
