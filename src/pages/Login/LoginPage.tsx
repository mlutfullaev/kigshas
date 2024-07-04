import './loginPage.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseInput from '@/components/BaseInput/BaseInput.tsx'
import axios from 'axios'
import { API_URL } from '@/main.tsx'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const onLogin = () => {
    if (!username.length || !password.length) {
      setError(true)
      return
    }

    if (error) setError(false)

    const data = {
      username,
      password
    }

    localStorage.setItem('user', JSON.stringify(data))
    axios.get(`${API_URL}/coefficient`)
      .then(() => {
        navigate('/')
      })
      .catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem('user')
          setErrorMessage('Неверный логин или пароль')
        }
      })
  }
  
  return (
    <div className="login-page">
      <label className="base-label">Логин</label>
      <BaseInput
        error={error}
        state={username}
        setState={setUsername}
      />
      <label className="base-label" htmlFor="password">Пароль</label>
      <BaseInput
        error={error}
        state={password}
        type="password"
        setState={setPassword}
      />
      {
        errorMessage && <p className="error-message">{errorMessage}</p>
      }
      <button className="btn btn-blue" onClick={onLogin}>Войти</button>
    </div>
  )
}

export default LoginPage