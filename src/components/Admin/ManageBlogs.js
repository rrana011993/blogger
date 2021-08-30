import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {getUserBlogsThunk, deleteBlogThunk, approveBlogThunk} from '../../store/thunks'
import BlogWrapper from './BlogWrapper'

const ManageBlogs = () => {
    const blogsList = useSelector(state => state.store.blogs)
    const [isFetching, setIsFetching] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBlogsThunk({username:'ADMIN', page:0, limit:5}))
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [dispatch])

      useEffect(() => {
        if (!isFetching) return
        fetchMoreBlogs()
      }, [isFetching,fetchMoreBlogs])

      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        setIsFetching(true)
      }

      function fetchMoreBlogs() {
        dispatch(getUserBlogsThunk({username:"ADMIN", page:currentPage+1, limit:5}))
            setIsFetching(false)
            setCurrentPage(prevState => (prevState+1))
      }

      function deleteBlog(title) {
        dispatch(deleteBlogThunk({title}))
      }

      function approveBlog(title) {
        dispatch(approveBlogThunk({title}))
      }

    return (
        <>
          <ul className="list-group mb-2">
          {blogsList && blogsList.map(blog => <BlogWrapper blog = {blog} onDeleteBlog = {deleteBlog} onApproveBlog = {approveBlog}></BlogWrapper>)}
          </ul>
          {isFetching && 'Fetching more list items...'}
        </>
      ) 
}

export default ManageBlogs
