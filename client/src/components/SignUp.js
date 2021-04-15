import React, { useState } from 'react'
import { Register } from '../services/AuthServices'

const SignUp = (props) => {
  const [registerForm, handleRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async () => {
    console.log('firing')
    try {
      await Register(registerForm)
      handleRegisterForm({
        name: '',
        email: '',
        password: ''
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    handleRegisterForm({ ...registerForm, [name]: value })
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    if (registerForm.password === registerForm.confirmPassword) {
      return handleSubmit()
    } else {
      alert('Your password does not match, please try again!')
    }
  }

  return (
    <div>
      <h2 style={{ color: 'black' }}>Sign Up</h2>
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={registerForm.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email@example.com"
          value={registerForm.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerForm.passwordDigest}
          onChange={handleChange}
          required
        />
        <input
          className="form-sign"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerForm.confirmPassword}
          onChange={handleChange}
          required
        />
        <br></br>
        <button
          type="submit"
          disabled={
            !registerForm.email || !registerForm.password || !registerForm.name
          }
          className="signBtn"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
