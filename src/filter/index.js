import filters from './filters';
import Vue from 'vue'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
