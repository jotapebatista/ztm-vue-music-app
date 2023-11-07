import './assets/base.css'
import './assets/main.css'

import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'

const firebaseConfig = {
  apiKey: 'AIzaSyASmo2PPC5TcU-VnlnHC44E37lzoNgqKYI',
  authDomain: 'music-app-vue-5917d.firebaseapp.com',
  projectId: 'music-app-vue-5917d',
  storageBucket: 'music-app-vue-5917d.appspot.com',
  appId: '1:787310312409:web:549639985027c7856777c8'
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

app.mount('#app')
