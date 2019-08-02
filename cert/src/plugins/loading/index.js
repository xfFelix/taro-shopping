import Loading from './Loading'

export default {
  install (Vue, options = {}) {
    const LoadingComponent = Vue.extend(Loading)

    let loading = null

    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    function $loading() {
      return new Promise((resolve) => {
        // 第一次调用
        if (!loading) {
          loading = new LoadingComponent()
          // 手动创建一个未挂载的实例
          loading.$mount()
          // 挂载
          document.querySelector('#app').appendChild(loading.$el)
        }
        // 显示loading
        loading.show = true
        resolve()
      })
    }
    // 定义关闭loading方法
    $loading.hide = () => {
      return new Promise((resolve) => {
        loading.show = false
      })
    }

    Vue.loading = Vue.prototype.$loading = $loading
  }
}
