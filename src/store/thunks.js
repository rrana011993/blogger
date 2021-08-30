import {actions} from './store'
const jwt = require('jsonwebtoken')

export const loginThunk = (user) => {
    return async (dispatch) => {
        const authenticateUser = async () => {
            const response = await fetch('https://blogger-server-1.herokuapp.com/api/bloggerServer/login', {
                method:'POST',
                body: JSON.stringify(user),
                headers: {
                  Authorization: 'Bearer ' + getToken('/login', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while validating the credentials')
            }
            
            const data = await response.json()

            return data
        }
        try{    
            const userData = await authenticateUser()
            if(!userData.isAuthenticated){
                alert('Invalid Username or password')
            } else{
                await dispatch(actions.login({isAuthenticated:userData.isAuthenticated, role:userData.role, username:userData.username}))
            }
        } catch (error){
            await dispatch(actions.login({isAuthenticated:false, role:''}))
        }
    }
}

export const addWriterThunk = (writer) => {
    return async (dispatch) => {
        const addWriter = async () => {
            const response = await fetch('api/bloggerServer/addUser', {
                method:'POST',
                body: JSON.stringify(writer),
                headers: {
                  Authorization: 'Bearer ' + getToken('/addUser', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while adding the content writer')
            }
        }
        try{    
            await addWriter()
            alert('User added Successfully')
        } catch (error){
            alert('User addition Failed'+ error)
        }
    }
}

export const addBlogThunk = (blog) => {
    return async (dispatch) => {
        const addBlog= async () => {
            const response = await fetch('api/bloggerServer/addBlog', {
                method:'POST',
                body: JSON.stringify(blog),
                headers: {
                  Authorization: 'Bearer ' + getToken('/addBlog', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while adding the blog')
            }
        }
        try{    
            await addBlog()
            alert('Blog added Successfully')
        } catch (error){
            alert('Blog addition Failed')
        }
    }
}

export const getUserBlogsThunk = (payload) => {
    return async (dispatch) => {
        const getBlogs = async () => {
            const response = await fetch('api/bloggerServer/getBlogs', {
                method:'POST',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/getBlogs', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while fetching the blogs')
            }
            
            const data = await response.json()

            return data
        }
        try{    
            const blogs = await getBlogs()
            if(blogs.length !==0){
                await dispatch(actions.loadUserBlogs({blogs}))
            }
        } catch (error){
            alert('Unable to fetch blogs' + error)
        }
    }
}

export const deleteBlogThunk = (payload) => {
    return async (dispatch) => {
        const deleteBlog = async () => {
            const response = await fetch('api/bloggerServer/deleteBlogs', {
                method:'DELETE',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/deleteBlogs', 'DELETE'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while deleting the blog')
            }
            
            const data = await response.json()

            return data
        }
        try{    
            const blog = await deleteBlog()
            alert("Blog Removed Successfully")
            await dispatch(actions.removeBlog({blog}))
        } catch (error){
            alert('Unable to remove blog' + error)
        }
    }
}

export const approveBlogThunk = (payload) => {
    return async (dispatch) => {
        const approveBlog = async () => {
            const response = await fetch('api/bloggerServer/approveBlogs', {
                method:'POST',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/approveBlogs', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while approving the blog')
            }
            
            const data = await response.json()
            return data
        }
        try{    
            const blog = await approveBlog()
            alert("Blog Approved Successfully")
            await dispatch(actions.approveBlog(blog))
        } catch (error){
            alert('Unable to approve blog' + error)
        }
    }
}

export const getUserThunk = (payload) => {
    return async (dispatch) => {
        const getUsers = async () => {
            const response = await fetch('api/bloggerServer/getUsers', {
                method:'POST',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/getUsers', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while fetching the blogs')
            }
            
            const data = await response.json()

            return data
        }
        try{    
            const users = await getUsers()
            if(users.length !==0){
                await dispatch(actions.loadUsers({users}))
            }
        } catch (error){
            alert('Unable to fetch blogs' + error)
        }
    }
}

export const deleteUserThunk = (payload) => {
    return async (dispatch) => {
        const deleteUser = async () => {
            const response = await fetch('api/bloggerServer/deleteUsers', {
                method:'DELETE',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/deleteUsers', 'DELETE'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while deleting the blog')
            }
            
            const data = await response.json()
            console.log("data:- "+JSON.stringify(data))
            return data
        }
        try{    
            const user = await deleteUser()
            alert("User Removed Successfully")
            console.log("user in think:- "+JSON.stringify(user))
            await dispatch(actions.removeUser(user))
        } catch (error){
            alert('Unable to remove user' + error)
        }
    }
}

export const getApprovedBlogsThunk = (payload) => {
    return async (dispatch) => {
        const getApprovedBlogs = async () => {
            const response = await fetch('api/bloggerServer/getApprovedBlogs', {
                method:'POST',
                body: JSON.stringify(payload),
                headers: {
                  Authorization: 'Bearer ' + getToken('/getApprovedBlogs', 'POST'),
                  'Content-Type': 'application/json',
                  'Accept':'application/json'
                }
            })

            if(!response.ok){
                throw new Error('Something went wrong while fetching the blogs')
            }
            
            const data = await response.json()
            
            return data
        }
        try{    
            const blogs = await getApprovedBlogs()
            console.log(JSON.stringify(blogs))
            if(blogs.length !==0){
                await dispatch(actions.loadApprovedBlogs({blogs}))
            }
        } catch (error){
            alert('Unable to fetch blogs' + error)
        }
    }
}

function getToken(url, method) {
    return jwt.sign({
      url,
      method
    }, 'testjwtSecret')
  }
