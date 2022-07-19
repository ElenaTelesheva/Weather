<template>
  <div>
    <div v-for="value in forecast">
      <p>{{ value.date[1] }}</p>
      <img :src="value.imgUrl">
      <p>{{ value.temperature }} °С</p>
    </div>
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
<style scoped>
#day-forecast {
  display: flex;
  flex-direction: row;

}

#day-forecast>* {
  flex-direction: colomn;
}
</style>