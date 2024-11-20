import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/style.css';
import '@/css/out.css';
import '@/css/header.css';


function setFavicon(url) {
    const link = document.createElement('link');
    link.rel = 'shortcut icon';
    link.type = 'image/png';
    link.href = url;
    document.head.appendChild(link);
  }
  
setFavicon(require('@/assets/images/git.png'));


createApp(App)
  .use(store)
  .mount('#app');