<template>
    <div id="app">
        <button @click="switchMode('Today')">Today</button>
        <button @click="switchMode('Tomorrow')">Tomorrow</button>
        <button>Next 5 Days</button>

        <vue-glide class="demo" :bullet="true">
            <vue-glide-slide v-for="(value,i) in show()" :key="i">
                <p>{{ value.date[1] }}</p>
                <img :src="value.imgUrl">
                <p>{{ value.temperature }}</p>
            </vue-glide-slide>
        </vue-glide>

        <!-- <vue-glide>
            <vue-glide-slide v-for="i in 10" :key="i">
                {{ i }}
            </vue-glide-slide>
        </vue-glide> -->

      

    </div>
</template>

<script>
import Slider from './Slider.vue';
import VueGlide from './Glide'
import VueGlideSlide from './GlideSlide'

export default {
    data() {
        return {
            options: {
                items: 8,
                margin: 5,
                nav: true,
                dots: true,
                loop: false,
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
            mode: 'Tomorrow'
        }
    },
    props: [
        'forecast'
    ],
    components: {
        Slider,
        [VueGlide.name]: VueGlide,
        [VueGlideSlide.name]: VueGlideSlide
    },
    methods: {
        show() {
            console.log('вошли')
            if (this.mode == 'Today') {

                return this.forecast.filter(function (forecast) {
                    let now = new Date();
                    let month = (now.getMonth() + 1).toString().length == 2 ? now.getMonth() : '0' + (now.getMonth() + 1);
                    let day = now.getDate().toString().length == 2 ? now.getDate() : '0' + now.getDate();

                    return forecast.date[0][0] == now.getFullYear() && forecast.date[0][1] == month && forecast.date[0][2] == day;
                })


            }
            else if (this.mode == 'Tomorrow') {
                return this.forecast.filter(function (forecast) {
                    let now = new Date();
                    let tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
                    let month = (tomorrow.getMonth() + 1).toString().length == 2 ? tomorrow.getMonth() : '0' + (tomorrow.getMonth() + 1);
                    let day = tomorrow.getDate().toString().length == 2 ? tomorrow.getDate() : '0' + tomorrow.getDate();

                    return forecast.date[0][0] == tomorrow.getFullYear() && forecast.date[0][1] == month && forecast.date[0][2] == day;
                })
            }

        },

        switchMode(mode) {
            this.mode = mode;
            // $('.demo').empty();
        }
    },
    mounted() {
        //console.log(this.forecast)
        //console.log(this.forecast[0])
    }
}
</script>
<!-- flex-direction: column;  -->
<style lang="scss" scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .demo {
    .glide {
      &__slide {
        display: flex;
        border: 2px solid #ccc;
        height: 200px;
        align-items: center;
        justify-content: center;
        color: #aaa;
        font-size: 36px;
        font-weight: 600;
        border-radius: 5px;
        transition: all .3s;
        opacity: .3;
        &--active {
          border: none;
          color: #fff;
           opacity: 1;
          // background: linear-gradient(-45deg,#ed145b,#7b31f4);
          background-color: limegreen;
        }
      }
    }
  }
}

</style>