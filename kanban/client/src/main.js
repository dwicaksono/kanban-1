import Vue from 'vue'
import App from './App.vue'
// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: "362042157345-lkhu4o1p6f96kacjqad7ff0gd27uff82.apps.googleusercontent.com"
  // scope: 'profile email',
  // prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({ render: createElement => createElement(App) })
  .$mount('#app')
