<template>
    <div class="main">
        <button>Today</button>
        <button>Tomorrow</button>
        <button>Next 5 Days</button>

        <Slider v-bind="options">
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
            <div class="item">4</div>
            <div class="item">5</div>
        </Slider>

    </div>
</template>

<script>
import Slider from './Slider.vue';

export default {
    data() {
        return {
            options: {
                items: 5,
                margin: 20,
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
            forecast: [null]
        }
    },
    props: [
        'forecast'
    ],
    components: {
        Slider
    },
    methods: {
        
    },
    mounted() {
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
    padding: 100px 0;
    color: #fff;
    font-size: 26px;
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