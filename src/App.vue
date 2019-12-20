<template>
  <div id="app">
    <div id="nav">
      <h2>みんなのPSNリスト</h2>
      <textarea id="publishkey" v-model="publishkey" placeholder="input publish key"></textarea><br />
      <button v-on:click="writeKey">公開鍵 書き込み</button>

      <div v-if="endpointInfo !== ''">
        <p>{{ state }}</p>
        <textarea id="endpointInfo" v-model="endpointInfo"></textarea><br />
      </div>
    </div>

  </div>
</template>

<script>
import { ServiceWorker } from 'aws-amplify';
const serviceWorker = new ServiceWorker();

export default {
  name: 'app',
  data(){
    return {
      registeredServiceWorker: null,
      publishkey: localStorage.getItem('publicKey'),
      state: '',
      endpointInfo: '',
    }
  },
  methods :{
    isPushSupported() {
      return ('serviceWorker' in navigator && 'PushManager' in window)
    },
    writeKey() {
      localStorage.setItem('publicKey', this.publishkey);
    },
    async updateUI() {
      if (!this.isPushSupported()) {
        this.state = 'Push Notification is not suppoted';
        this.endpointInfo = '';
        return;
      }

      if (Notification.permission == 'denied') {
        this.state = 'blocked';
        this.endpointInfo = '';
      } else {
        var subscription = await this.registeredServiceWorker.pushManager.getSubscription();
        if (subscription) {
          this.state = 'subscribed';
          this.endpointInfo = JSON.stringify(subscription);
        } else {
          this.state = 'Unsubscribed';
          this.endpointInfo = '';
        }
      }
    }, 
  },
  async mounted(){

    this.registeredServiceWorker = await serviceWorker.register('/service-worker.js', '/');

    if ('permissions' in navigator) {
      let notificationPermission = await navigator.permissions.query({name:'notifications'});
      notificationPermission.onchange = () => {
        this.updateUI();
      };
    }

    if (Notification.permission !== 'denied') {
      await serviceWorker.enablePush(this.publishkey);
    }
    this.updateUI();
  },     
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#publishkey {
  width: 400px;
  height: 30px;
}

#endpointInfo {
  width: 400px;
  height: 100px;
}
</style>