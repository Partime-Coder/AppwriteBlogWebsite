import React, { useState } from 'react'
import { Logo, Container, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiMenu, FiX } from "react-icons/fi";

function Header() {

   const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    // {
    //   name: "Login",
    //   slug: "/login",
    //   active: !authStatus,
    // },
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   active: !authStatus,
    // },
  ]

  const authItem = [
    {
      name: "Login",
      slug: "/login",
    },
    {
      name: "Signup",
      slug: "/signup", 
    },
  ]

  return (
    <header className='w-full h-18 shadow bg-purple-300'>
      <Container className={'h-full'}>
        <nav className='h-full flex items-center justify-between '>
          <div className=''>
            <Link to='/' className='cursor-pointer'>
              <Logo width={110} />
            </Link>
          </div>
          <ul className='hidden md:flex gap-5 text-lg text-purple-600'>

            {
              navItems.map((item)=>
                item.active? (
                  <li key={item.name} >
                    <button className='cursor-pointer' onClick={() => navigate(item.slug)}>{item.name}</button>
                  </li>
                ) : null
              )
            }
            {
              !authStatus? (

                authItem.map((item)=>
                  <li key={item.name}>
                     <button className='cursor-pointer' onClick={() => navigate(item.slug)}>{item.name}</button>
                  </li>
                )

              ):(<li><LogoutBtn/></li>)
            }

          </ul>
          <button
          onClick={() => setOpen(!open)}
          className="md:hidden  text-3xl focus:outline-none text-purple-600"
        >
          <FiMenu />
        </button>
        {/* mobile */}
         <div
        className={`fixed inset-0 bg-purple-300 flex flex-col items-center justify-center gap-8
        transform transition-transform duration-500 ease-in-out 
        ${open ? "translate-x-0" : "translate-x-full"}
        md:hidden z-40`}
      ><button
          onClick={() => setOpen(false)}
          className="md:hidden  text-3xl focus:outline-none text-purple-600 absolute top-5 right-5"
        >
          <FiX />
        </button>
        <ul className='flex flex-col gap-8  justify-center items-center text-3xl text-purple-600'>

            {
              navItems.map((item)=>
                item.active? (
                  <li key={item.name} >
                    <button className='cursor-pointer' onClick={() =>{navigate(item.slug);setOpen(false)} }>{item.name}</button>
                  </li>
                ) : null
              )
            }
            {
              !authStatus? (

                authItem.map((item)=>
                  <li key={item.name}>
                     <button className='cursor-pointer' onClick={() => {navigate(item.slug); setOpen(false)}}>{item.name}</button>
                  </li>
                )

              ):(<li onClick={() => setOpen(false)} ><LogoutBtn/></li>)
            }

          </ul>
      </div>
    
        </nav>
      </Container>
    </header>
  )
}

export default Header
