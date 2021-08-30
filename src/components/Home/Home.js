import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getApprovedBlogsThunk } from '../../store/thunks'
import BlogWrapper from './BlogWrapper'

const Home = () => {
    const blogsList = useSelector(state => state.store.approvedBlogs)
    const [isFetching, setIsFetching] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getApprovedBlogsThunk({username:'ADMIN', page:0, limit:5}))
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
        dispatch(getApprovedBlogsThunk({username:"ADMIN", page:currentPage+1, limit:5}))
            setIsFetching(false)
            setCurrentPage(prevState => (prevState+1))
      }
    return (
        <>
          <ul className="list-group mb-2">
          {blogsList && blogsList.map(blog => <BlogWrapper blog = {blog} ></BlogWrapper>)}
          </ul>
          {isFetching && 'Fetching more list items...'}
        </>
      ) 
}

export default Home
