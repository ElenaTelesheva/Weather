import axios from 'axios';

const key = '5e08f2cac1a8a305717f93206aa77fa2';

export default {
    getCurrentByQuery(data) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${key}`)
    },

    getByLatLon(lat, lon) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    },

    getNext5DaysByQuery(data) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${key}`)
    }
}
