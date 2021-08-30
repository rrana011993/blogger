import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {getUserThunk, deleteUserThunk} from '../../store/thunks'
import UserWrapper from './UserWrapper'

const ManageUsers = () => {
  const usersList = useSelector(state => state.store.users)
  const [isFetching, setIsFetching] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUserThunk({username:'ADMIN', page:0, limit:10}))
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])

      useEffect(() => {
        if (!isFetching) return
        fetchMoreUsers()
      }, [isFetching])

      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        setIsFetching(true)
      }

      function fetchMoreUsers() {
        dispatch(getUserThunk({username:"ADMIN", page:currentPage+1, limit:5}))
            setIsFetching(false)
            setCurrentPage(prevState => (prevState+1))
      }

      function deleteUser(username) {
        dispatch(deleteUserThunk({username}))
      }

    return (
        <>
          <ul className="list-group mb-2">
            {usersList.map(user => <UserWrapper user = {user} onDeleteUser = {deleteUser}></UserWrapper>)}
          </ul>
          {isFetching && 'Fetching more list items...'}
        </>
      ) 
}

export default ManageUsers