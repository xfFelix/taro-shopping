<template>
  <div class="payment-unit">
    <Header class="navbar" :show-more="true">选择缴费单位</Header>
    <ul class="content">
      <li @click="goGeolocation">
        缴费单位
        <span class="address">{{config.city || address}}<i class="cubeic-arrow"></i></span>
      </li>
      <li v-for="item of companies" :key="item.id">
        {{item.com}}
      </li>
    </ul>
    <div id="allmap"></div>
  </div>
</template>

<script>
import Header from 'components/Header'
import Geolocation from 'util/geolocation'
import { mapActions, mapGetters } from 'vuex';
import { getCompaniesByCity } from 'api'
export default {
  components: {
    Header
  },
  data: () => ({
    address: '',
    companies: []
  }),
  mounted() {
    this.getGeolocation()
  },
  computed: {
    ...mapGetters({
      config: 'life/getConfig'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'life/setConfig'
    }),
    async getGeolocation() {
      let geolocation = new Geolocation()
      let result = await geolocation.getIP()
      this.address = result.name
      this.getCompanies()
    },
    goGeolocation() {
      this.$router.push('geolocation')
    },
    async getCompanies() {
      const { type, city } = this.config
      let address = this.address
      address = address.replace('市', '')
      const { code, data } = await getCompaniesByCity({type, city: city || address})
      if (code !== '1') return
      this.companies = data
    }
  }
}
</script>

<style scoped lang='scss'>
.payment-unit{
  .navbar{
    background: #000;
    color: #fff;
  }
  .content{
    background: #fff;
    li{
      color: #4A4A4A;
      font-size: 14px;
      font-weight: bold;
      padding: 20px 0;
      margin: 0 15px;
      border-bottom: 1px solid #dedede;
      &:last-of-type{
        border-bottom: 0;
      }
      .address{
        float: right;
        i{
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
