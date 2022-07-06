<template>
    <div class="main">
        <button @click="mode = 'Today'">Today</button>
        <button @click="mode = 'Tomorrow'">Tomorrow</button>
        <button>Next 5 Days</button>

        <Slider v-bind="options">
            <div class="item" v-for="value in show">
                <p>{{ value.date[1] }}</p>
                <img :src="value.imgUrl">
                <p>{{ value.temperature }}</p>
                {{ value.icon }}
            </div>
        </Slider>

        <!-- {{ forecast[0] }} -->

    </div>
</template>

<script>
import Slider from './Slider.vue';

export default {
    data() {
        return {
            options: {
                items: 8    ,
                margin: 5,
                nav: true,
                dots: true,
                loop: true,
                timing: 'cubic-bezier(0, 0.72, 0.64, 1.06)',
                offset: 1,
                prevNav: 'Туда',
                nextNav: 'Сюда',
                sibling: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    999: {
                        items: 5
                    }
                }
            },
            mode: 'Today'
        }
    },
    props: [
        'forecast'
    ],
    components: {
        Slider
    },
    computed: {
        show: function(){

            return this.forecast.filter(function(forecast) {
                return forecast.date[0] == "2022-07-06"
            })

        }
    },
    mounted() {
        //console.log(this.forecast)
        //console.log(this.forecast[0])
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    border: 0;
    max-height: 99999999px;
    -webkit-font-smoothing: antialiased;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

#main {
    font-family: "Roboto", Arial, sans-serif;
    font-size: 14px;
}

.item {
    background: #00800b;
    text-align: center;
    padding: 50px 0;
    color: #fff;
    font-size: 20px;
    font-style: italic;
    font-weight: 300;
}

.item.active {
    background: #ff3f4d;
}

.item.super {
    background: #04a0c5;
}
</style>