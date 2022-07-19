<template>
  <div id="app">
    <div id="left-panel">
      <Search @search="startSearch" />
      <CurrentWeather v-if="currentWeather" v-bind:weather="currentWeather" />
    </div>

    <div id="right-panel">
      <button @click="switchMode('Today')">Today</button>
      <button @click="switchMode('Week')">Next 5 Days</button>
      <WeatherForecast id="day-forecast" v-if="forecast.length > 0" v-bind:forecast="forecast" />
      <div v-if="currentWeather && mode == 'Today'">
        <p>Wind speed: {{ currentWeather.wind }}</p>
        <p>Humidity: {{ currentWeather.humidity }}</p>
        <p>Pressure: {{ currentWeather.pressure }}</p>
      </div>
      <WeekForecast id="week-forecast" v-if="week.length > 0" v-bind:forecast="week" />
    </div>

  </div>
</template>

<script>
import Search from './components/Search.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Weather from './models/Weather';
import BigWeather from './models/BigWeather'
import GetWeather from './services/getWeather.js';
import WeatherForecast from './components/WeatherForecast.vue';
import WeekForecast from './components/WeekForecast.vue';

export default {
  components: {
    Search,
    CurrentWeather,
    WeatherForecast,
    WeekForecast
  },
  data() {
    return {
      currentWeather: null,
      searchText: 'Брянск',
      commonForecast: [],
      mode: 'Today',
      forecast: [],
      week: []
    }
  },
  methods: {
    //передаём сюда введенный город
    startSearch(data) {
      this.currentWeather = null;
      this.commonForecast = [];
      this.forecast = [];
      this.searchText = data;
      GetWeather
        .getCurrentByQuery(data)
        .then(r => this.currentWeather = Weather.createByResponse(r));

      GetWeather
        .getNext5DaysByQuery(data)
        .then(r => {
          console.log(r)
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

        let weekEl = document.getElementById('week-forecast')
        if (weekEl != null) weekEl.style.visibility = 'hidden';

        let now = new Date();
        let month = (now.getMonth() + 1).toString().length == 2 ? now.getMonth() : '0' + (now.getMonth() + 1);
        let day = now.getDate().toString().length == 2 ? now.getDate() : '0' + now.getDate();

        this.commonForecast.forEach(el => {

          if (el.date[0][0] == now.getFullYear() && el.date[0][1] == month && el.date[0][2] == day) {
            this.forecast.push(el);
          }
        })
      }
      else if (this.mode == 'Week') {

        let dayEl = document.getElementById('week-forecast')
        if (dayEl != null) dayEl.style.visibility = 'visible';

        let now = new Date();
        let tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        let month = (tomorrow.getMonth() + 1).toString().length == 2 ? tomorrow.getMonth() : '0' + (tomorrow.getMonth() + 1);
        let day = tomorrow.getDate().toString().length == 2 ? tomorrow.getDate() : '0' + tomorrow.getDate();

        this.commonForecast.forEach(el => {
          // console.log(el)
          if (el.date[0][0] == tomorrow.getFullYear() && el.date[0][1] == month && el.date[0][2] == day) {
            this.forecast.push(el);
          }
        })

        this.week = [];

        let dayForecast = [];
        let index = 0;
        let isValid = true;

        for (let i = 0; isValid && i < this.commonForecast.length; i++) {
          if (this.commonForecast[i].date[0][0] != tomorrow.getFullYear() || this.commonForecast[i].date[0][1] != month || this.commonForecast[i].date[0][2] != day) {
            index++;
          } else isValid = false
        }

        for (let i = index; i < this.commonForecast.length; i++) {
          dayForecast = [];
          let step = this.commonForecast.length - i >= 8 ? 8 : this.commonForecast.length - i
          for (let j = i; j < i + step; j++) {
            dayForecast.push(this.commonForecast[j].temperature);
          }
          const maxTemp = Math.max.apply(null, dayForecast);
          const minTemp = Math.min.apply(null, dayForecast);
          this.week.push([this.commonForecast[i].fullDate.toString(), maxTemp, minTemp]);
          i += 7;
        }
      }
    },
    switchMode(mode) {
      this.mode = mode;
      this.show();
    }
  },
  mounted() {
    this.startSearch('Брянск')

    let weekEl = document.getElementById('week-forecast')
    if (weekEl != null) el.style.visibility = 'hidden';
  }
}


</script>

<style>
body {
  background: linear-gradient(to right, #eec871a3, #e38604dc);
  font-size: 18px;

}

#app {
  display: flex;
  margin-top: 1em;
  margin-left: 1em;
  height: 500px;
}

#app>div {
  background: rgba(255, 255, 255, 0.3);
}



#left-panel {
  padding: 1em 1em;
}

#right-panel {
  padding: 1em 1em;

}
</style>
