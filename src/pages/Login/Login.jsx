import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import firebaseAuth from '../../firebase.js'
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Login() {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSignState = () => {
    setSignState((s) => s === 'Sign In' ? 'Sign Up' : 'Sign In');
  }

  const handleInputChange = (e) => {
    setName(e.target.value)
  }
  const handleInputEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (signState === 'Sign In') {
      await firebaseAuth.login(email, password)
    } else {
      await firebaseAuth.signup(name, email, password)
    }
    setLoading(false)
  }

  return (
    loading ? <div className='login-spinner'>
      <img src={netflix_spinner} alt='loading netflix spinner image' />
    </div>
      :
      <div className='login'>
        <img src={logo} className='login-logo' alt='login logo' />
        <div className='login-form'>
          <h1>{signState}</h1>
          <form>
            {signState === 'Sign Up' &&
              <input type='text' value={name} onChange={handleInputChange} placeholder='Enter your name' />
            }
            <input type='email' value={email} onChange={handleInputEmail} placeholder='Enter your email' />
            <input type='password' value={password} onChange={handleInputPassword} placeholder='Enter your password' />
            <button onClick={user_auth} type='submit'>{signState}</button>
            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' />
                <label>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className='form-switch'>
            {signState === 'Sign In' ?
              <p>New to Netflix? <span onClick={handleSignState}>Sign Up Now</span></p>
              :
              <p>Already have account? <span onClick={handleSignState}>Sign In Now</span></p>
            }
          </div>
        </div>
      </div>
  )
}

export default Login
