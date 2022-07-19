<template>
<div>
    <p>{{ weather.place }}</p>
    <img v-bind:src="weather.imgUrl">
    <p>{{ weather.description }}</p>
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

</style>
