import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const { username, password } = JSON.parse(localStorage.getItem('user') || '')

    if (username && password) {
      config.auth = { username, password }
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export const API_URL = import.meta.env.VITE_APP_API_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
