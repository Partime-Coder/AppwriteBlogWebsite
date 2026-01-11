import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import {Header,Footer} from './components/index.js'
import { Outlet } from 'react-router-dom';


function App() {
const [ loading , setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  })
  .finally(()=> setLoading(false))
},[]);


if (loading) {
return null;
}
else {
 return (
  <div className="min-h-screen flex flex-col bg-purple-50">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);
}
}

export default App