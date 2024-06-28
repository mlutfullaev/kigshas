import './loginPage.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseInput from "@/components/BaseInput/BaseInput.tsx";

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
      <label className="base-label">Логин</label>
      <BaseInput
        error={error}
        state={login}
        setState={setLogin}
      />
      <label className="base-label" htmlFor="password">Пароль</label>
      <BaseInput
        error={error}
        state={password}
        type="password"
        setState={setPassword}
      />
      <button className="btn btn-blue" onClick={onLogin}>Войти</button>
    </div>
  )
}

export default LoginPage