<template>
    <div>
          <ul ref="scencI">
            <li v-html="sceneInfoC.UUbhjq" style="height:1000px" ref="jqxz">
            </li>
            <li v-html="sceneInfoC.UUjqts" style="height:5000px" ref="jqjj"></li>
            <li v-html="sceneInfoC.UUjtz" style="height:5000px;background:red" ref="jtzn"></li>
            <li v-html="sceneInfoC.UUtopics" style="height:500px" ref="lyzt"></li> 
        </ul>  
    </div>
</template>

<script>
export default {
    props: {
        sceneInfoC: Object,

    },
    watch: {
      
    },
    data: () => ({

    }),
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>

</style>
