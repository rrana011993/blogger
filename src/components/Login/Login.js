import { useDispatch } from 'react-redux'
import React, { useRef } from 'react'

import { loginThunk } from '../../store/thunks'

const Login = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const loginHandler = (event) => {
    event.preventDefault()
    dispatch(loginThunk({username:usernameRef.current.value, password:passwordRef.current.value}))
  }

  return (
    <main>
      <section>
        <form onSubmit={loginHandler}>
          <div>
            <label >  Username </label>
            <input type='text' id='username' ref = {usernameRef} />
          </div>
          <div>
            <label >  Password </label>
            <input type='password' id='password' ref = {passwordRef}/>
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  )
}

export default Login