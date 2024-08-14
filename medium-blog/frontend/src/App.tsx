import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Blog} from "./pages/Blog"
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { HomePage } from './pages/HomePage'
// import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/publish' element={<Publish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
