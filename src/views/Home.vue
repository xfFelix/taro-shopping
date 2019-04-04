<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getInfo} from 'api'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted () {
    console.log(process.env)
    this.getInfo()
  },
  methods:{
    async getInfo() {
      let data = await getInfo({token:'f7512935295b36d9b469e672c531d4c8'})
      console.log(data)
    }
  }
}
</script>
