class Weather {
    constructor() {
        this.humidity = null
        this.pressure = null
        this.temperature = null
        this.icon = null
        this.description = null
    }

    static createByResponse(getWeatherResponse) {
        const weather = new Weather;
        getWeatherResponse = getWeatherResponse.data;
        weather.place = getWeatherResponse.name;
        weather.temperature = parseInt(getWeatherResponse.main.temp-273);
        weather.humidity = parseInt(getWeatherResponse.main.humidity/10);
        weather.description = getWeatherResponse.weather[0].main;
        weather.icon = getWeatherResponse.weather[0].icon;
        return weather;
    }

    get imgUrl() {
        console.log({imgUrl: this})
        return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    }
}

export default Weather
