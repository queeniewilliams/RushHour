import React, { useState } from 'react'
import { Login } from '../services/AuthServices'
import { useHistory } from 'react-router-dom'

const SignIn = (props) => {
  const [loginForm, handleLoginForm] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Login(loginForm)
      localStorage.setItem('token', res.token)
      props.setAuthenticated(true)
      props.setCurrentUser(res.user)
      handleLoginForm({ email: '', password: '' })
      return history.push('/')
    } catch (error) {
      console.log(error)
      return alert('Your username or password is incorrect')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    handleLoginForm({ ...loginForm, [name]: value })
  }

  return (
    <div className="signup">
      <h2 className="signform">
        Hello there, <br></br>Welcome back
      </h2>
      <form className="signform" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        <br></br>
        <button
          type="submit"
          className="signBtn"
          disabled={!loginForm.email || !loginForm.password}
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
