import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import store from './store'
import './registerServiceWorker'
// import { mapMutations, mapActions } from 'vuex'

Vue.router = router

Vue.config.productionTip = false

const app = new Vue({
    el    : '#app',
    router,
    vuetify,
    // store,
    render: h => h(App),
})
export default app

global.app     = app
// global.appData = app.$store.state