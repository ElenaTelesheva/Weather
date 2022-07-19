<template>
    <div>
        <div class="days" v-for="value in forecast">
            <p id="date">{{ value[0] }}</p>
            <p id="max">{{ value[1] }} °С</p>
            <p id="min">{{ value[2] }} °С</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'forecast'
    ]
}

</script>

<style>
#week-forecast {
    flex-direction: colomn;
}

#week-forecast>* {
    display: flex;
    flex-direction: row;
}

.days > p {
    height: 10px;
    padding-left: 0.3em;
    padding-right: 0.3em;
}

#max{
    color:brown;
}
#min{
    color:blue
}
</style>