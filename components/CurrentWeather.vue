<template>
<div>
    <p>{{ weather.place }}</p>
    <img v-bind:src="weather.imgUrl">
    <p>Температура: {{ weather.temperature }}</p>
    <p>Влажность: {{ weather.humidity }}</p>
</div>
</template>

<script>
export default {
    props: [
        'weather'
    ]
}
</script>


<style lang="scss">
img {
    width: 115px
}
</style>
