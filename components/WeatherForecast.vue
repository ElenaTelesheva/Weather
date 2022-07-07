<template>
    <div id="app">
       <vue-glide class="demo" :bullet="true">
            <vue-glide-slide v-for="(value,i) in forecast" :key="i">
                <p>{{ value.date[1] }}</p>
                <img :src="value.imgUrl">
                <p>{{ value.temperature }}</p>
            </vue-glide-slide>
        </vue-glide>
    </div>
</template>

<script>
import Slider from './Slider.vue';
import VueGlide from './Glide'
import VueGlideSlide from './GlideSlide'

export default {
    props: [
        'forecast'
    ],
    components: {
        Slider,
        [VueGlide.name]: VueGlide,
        [VueGlideSlide.name]: VueGlideSlide
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