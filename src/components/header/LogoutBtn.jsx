import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'


function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {

        authService.logout().then(() => {
            dispatch(logout())
        });

    };

    return (
        <div className='cursor-pointer' onClick={logoutHandler}>Logout</div>
    )
}

export default LogoutBtn