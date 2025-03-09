import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify'; // Thêm dòng này

const app = createApp(App)
app.use(vuetify); // Thêm dòng này

// Cấu hình Axios
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') 
  ? `Bearer ${localStorage.getItem('token')}` 
  : ''

app.config.globalProperties.$axios = axios

app.use(router) // Sửa lỗi ở đây
import './styles.css'

app.mount('#app')
