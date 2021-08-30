import { useDispatch } from 'react-redux'
import React, { useRef } from 'react'
import {addBlogThunk} from '../../store/thunks'

const AddBlog = () => {
  const titleRef = useRef()
  const bodyRef = useRef()
  const authorRef = useRef()
  const dispatch = useDispatch()

  const handleAddBlog = (event) => {
    event.preventDefault()
    dispatch(addBlogThunk({title:titleRef.current.value, body:bodyRef.current.value, author:authorRef.current.value}))
  }

    return (
        <div className="col-12 col-lg-6 offset-lg-3">
          <input
            className="form-control my-3"
            placeholder="Blog Title"
            ref = {titleRef}
          />
          <br></br>
          <br></br>
          <textarea
            className="form-control my-3"
            placeholder="Blog Body"
            ref = {bodyRef}>
          </textarea>
          <br></br>
          <br></br>
          <input
            className="form-control my-3"
            placeholder="Blog Author"
            ref = {authorRef}
          />
          <br></br>
          <br></br>
          <button onClick={handleAddBlog} className="btn btn-primary float-right">Submit</button>
        </div>
      )
}

export default AddBlog