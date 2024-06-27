import './loginPage.scss'
import Header from '@/components/Header/Header.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const onLogin = () => {
    if (!login.length || !password.length) {
      setError(true)
      return
    }

    if (error) setError(false)

    const data = {
      login,
      password
    }

    localStorage.setItem('user', JSON.stringify(data))
    
    navigate('/')
  }
  
  return (
    <div className="login-page">
      <Header title="Рабочий стол администратора" />
      <div className="login-content">
        <label htmlFor="login">Логин</label>
        <input
          type="text"
          id="login"
          className={`base-input${error && !login.length ? ' error' : ''}`}
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          className={`base-input${error && !password.length ? ' error' : ''}`}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-blue" onClick={onLogin}>Войти</button>
      </div>
    </div>
  )
}

export default LoginPage