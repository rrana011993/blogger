import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {getUserBlogsThunk} from '../../store/thunks'

export const ViewBlogs = () => {
    const username = useSelector(state => state.store.username)
    const blogsList = useSelector(state => state.store.blogs)
    const [isFetching, setIsFetching] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if(blogsList.length === 0){
            dispatch(getUserBlogsThunk({username, page:0, limit:5}))
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [dispatch,username,blogList.length])

      useEffect(() => {
        if (!isFetching) return
        fetchMoreBlogs()
      }, [isFetching,fetchMoreBlogs])

      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        setIsFetching(true)
      }

      function fetchMoreBlogs() {
        dispatch(getUserBlogsThunk({username, page:currentPage+1, limit:4}))
            setIsFetching(false)
            setCurrentPage(prevState => (prevState+1))
      }

    return (
        <>
          <ul className="list-group mb-2">
            {blogsList && blogsList.map(blog => <li
            className="list-group-item"> 
            <h2>{"Title: "+blog.title}</h2>
            <h3>{"Body: "+blog.body}</h3>
            <p>{"Approved? " + blog.approved}</p>
            <p>{"Author: "+blog.author}</p>
            <hr></hr>
            <br></br>
            </li>)}
          </ul>
          {isFetching && 'Fetching more blogs...'}
        </>
      ) 
}

export default ViewBlogs
