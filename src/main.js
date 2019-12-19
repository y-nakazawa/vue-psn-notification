import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import awsconfig from './aws-exports';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';

Amplify.configure(awsconfig);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
