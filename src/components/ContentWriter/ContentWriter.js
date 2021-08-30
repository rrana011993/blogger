import React, { Fragment, useState } from 'react'
import AddBlog from './AddBlog'
import ViewBlogs from './ViewBlogs'

const ContentWriter = () => {
    const [addBlog, setAddBlog] = useState(false)
    const [viewBlogs, setViewBlogs] = useState(false)

    const handleAddBlog = (event) => {
        event.preventDefault()
        setAddBlog(true)
        setViewBlogs(false)
    }

    const handleViewBlogs = (event) => {
        event.preventDefault()
        setViewBlogs(previousState => {return !previousState})
        setAddBlog(false)
    }

    return (
        <Fragment>
        <button onClick = {handleAddBlog}>add blog</button>
        <button onClick = {handleViewBlogs}>view blogs</button>
        <br></br>
        <br></br>
        {addBlog && <AddBlog/>}
        <br></br>
        {viewBlogs && <ViewBlogs/>}
       
        </Fragment>
    )
}

export default ContentWriter