import { createSlice, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
const jwt = require('jsonwebtoken')

const initialState = {
  isAuthenticated: false,
  username:'',
  role:'',
  blogs:[],
  users:[],
  approvedBlogs:[]
}

const storeSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated
      state.role = action.payload.role
      state.username = action.payload.username
    },
    logout(state) {
      state.isAuthenticated = false
      state.role = ''
      state.username = ''
      state.blogs = []
      state.users = []
      state.approvedBlogs = []
    },
    loadUserBlogs(state, action) {
      let updatedBlogs= [...action.payload.blogs.filter(blog => !state.blogs.includes(blog))]
      state.blogs = [...state.blogs.concat(updatedBlogs)]
    },
    removeBlog(state, action) {
      state.blogs = [...state.blogs.filter(blog => blog.title !== action.payload.blog.title)]
    },
    approveBlog(state, action) {
      let currentStateBlogsCopy = [...state.blogs]
      const index = currentStateBlogsCopy.findIndex((blog) => blog.title == action.payload.title)
      currentStateBlogsCopy[index].approved = true
      state.blogs = [...currentStateBlogsCopy]
    },
    loadUsers(state, action) {
      let updatedUsers= [...action.payload.users.filter(user => !state.users.includes(user))]
      state.users = [...state.users.concat(updatedUsers)]
    },
    removeUser(state, action) {
      console.log("user:- "+action.payload.username)
      state.users = [...state.users.filter(user => user.username !== action.payload.username)]
    },
    loadApprovedBlogs(state, action) {
      console.log(state.approvedBlogs)
      let updatedBlogs= [...action.payload.blogs.filter(blog => !state.approvedBlogs.includes(blog))]
      state.approvedBlogs = [...state.approvedBlogs.concat(updatedBlogs)]
    },
    resetStates(state) {
      state.approvedBlogs = []
      state.blogs = []
      state.users = []
    }
  },
})

const reducers = combineReducers({ store : storeSlice.reducer })

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)



const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store

export const actions = storeSlice.actions