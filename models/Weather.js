class Weather {
    constructor() {
        this.humidity = null
        this.pressure = null
        this.temperature = null
        this.icon = null
        this.description = null
        this.wind = null
    }

    static createByResponse(getWeatherResponse) {
        const weather = new Weather;
        getWeatherResponse = getWeatherResponse.data;

        console.log(getWeatherResponse)
        weather.place = getWeatherResponse.name;
        weather.temperature = parseInt(getWeatherResponse.main.temp-273);
        weather.humidity = getWeatherResponse.main.humidity;
        weather.description = getWeatherResponse.weather[0].main;
        weather.icon = getWeatherResponse.weather[0].icon;
        weather.wind = getWeatherResponse.wind.speed;
        weather.pressure = getWeatherResponse.main.pressure;
        return weather;
    }

    get imgUrl() {
        console.log({imgUrl: this})
        return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    }
}

export default Weather
