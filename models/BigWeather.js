class BigWeather{
    constructor(){
        this.date = null
        this.icon = null
        this.temperature = null
        this.humidity = null
        this.wind = null
        this.rain = 0
    }

    static createByResponse(response){
        const weather = new BigWeather;
        weather.date = response.dt_txt.split(" ", 2);
        weather.date[0] = weather.date[0].split("-", 3);
        weather.icon = response.weather[0].icon;
        weather.temperature = parseInt(response.main.temp - 273);
        weather.humidity = response.main.humidity;
        weather.wind = response.wind.speed;
        if (typeof response.rain != 'undefined'){
            weather.rain = response.rain;
        }
        
        // console.log(weather)

        return weather;
        
    }

    get imgUrl() {
        return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
    }
}

export default BigWeather