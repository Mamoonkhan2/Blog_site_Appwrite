import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import EditPost from './pages/EditPost.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import SingUPPage from './pages/SingUPPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Post from './pages/Post.jsx'
import SignUp from './compounents/SignUp.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HomePage />} />
      <Route path='/post/:slug' element={<Post />} />
      <Route path='/add-post' element={<AddPost />} />
      <Route path='/all-posts' element={<AllPost />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/edit-post/:slug' element={<EditPost/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
)
