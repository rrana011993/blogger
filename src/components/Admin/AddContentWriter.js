import { useDispatch } from 'react-redux'
import React, { useRef } from 'react'
import {addWriterThunk} from '../../store/thunks'

const AddContentWriter = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const HandleAddWriter = (event) => {
    event.preventDefault()
    dispatch(addWriterThunk({username:usernameRef.current.value, password:passwordRef.current.value, role:'CONTENT-WRITER'}))
  }

    return (
        <form onSubmit={HandleAddWriter}>
          <div>
            <label > Content Writer name </label>
            <input type='text' id='username' ref = {usernameRef} />
          </div>
          <div>
            <label >  Password </label>
            <input type='password' id='password' ref = {passwordRef}/>
          </div>
          <button>AddWriter</button>
        </form>
    ) 
}

export default AddContentWriter