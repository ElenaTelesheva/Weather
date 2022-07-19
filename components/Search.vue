<template>
<div>
    <input placeholder="Search..." type="text" v-model="searchText">
    <button @click="startSearch">O</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            searchText: null
        }
    },
    methods: {
        startSearch: function () {
            this.$emit('search', this.searchText)
        }
    }
}
</script>

<style>

</style>
