import React, { Fragment, useState } from 'react'
import AddContentWriter from './AddContentWriter'
import ManageBlogs from './ManageBlogs'
import ManageUsers from './ManageUsers'

const Admin = () => {
    const [addContentWriter, setAddContentWriter] = useState(false)
    const [manageBlogs, setManageBlogs] = useState(false)
    const [manageUsers, setManageUsers] = useState(false)

    const handleAddContentWriter = (event) => {
        event.preventDefault()
        setAddContentWriter(true)
        setManageBlogs(false)
        setManageUsers(false)
    }

    const handleManageBlogs = (event) => {
        event.preventDefault()
        setManageBlogs(true)
        setAddContentWriter(false)
        setManageUsers(false)
    }

    const handleManageUsers = (event) => {
        event.preventDefault()
        setManageBlogs(false)
        setAddContentWriter(false)
        setManageUsers(true)
    }

    return (
        <Fragment>
        <button onClick = {handleAddContentWriter}>Add content-writer</button>
        <button onClick = {handleManageBlogs}>Manage blogs</button>
        <button onClick = {handleManageUsers}>Manage Users</button>
        {addContentWriter && <AddContentWriter/>}
        {manageBlogs && <ManageBlogs/>}
        {manageUsers && <ManageUsers/>}
        </Fragment>
    )
}

export default Admin