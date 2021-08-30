import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {actions} from '../src/store/store'
import { useDispatch } from 'react-redux'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Admin from './components/Admin/Admin'
import ContentWriter from './components/ContentWriter/ContentWriter'


function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.store.isAuthenticated)
  const role = useSelector(state => state.store.role)

  useEffect(() => {
    dispatch(actions.resetStates())
  }, [])

  const logoutHandler = (event) => {
    event.preventDefault()
    dispatch(actions.logout())
  }

  return (
    <Fragment>
      {isAuth && <button onClick = {logoutHandler}>logout</button>}
      <br></br>
      <br></br>
      <br></br>
      {!isAuth && <Login />}
      <br></br>
      {!isAuth && <Home />}
      {(isAuth && role === 'ADMIN') && <Admin />}
      {(isAuth && role === 'CONTENT-WRITER') && <ContentWriter />}
    </Fragment>
  )
}

export default App