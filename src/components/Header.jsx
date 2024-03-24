import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import { IoMdPerson } from 'react-icons/io';
import { RiMenu3Fill } from "react-icons/ri";

const Header = () => {
    const [mobMenu, setMobmenu] = useState(false)
    const navigate = useNavigate();
    const { user, handleLogout, logoutBtn, setLogoutBtn } = useFirebaseContext();

    return (
        <header className=''>
            <nav className="bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 px-4 lg:px-6 py-1 shadow-md ">
                <div className=" flex justify-between items-center">
                    <Link to="/" className="flex  items-center">
                        <div className=' '>

                            <img src='logo.png' className="mr-3 w-48 h-1/3 " />
                        </div>
                    </Link>
                    <div className="hidden md:block ">
                        <ul className="flex space-x-4 text-white font-medium">
                            <li className='   rounded'>
                                <NavLink to="/" className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700 hover:bg-indigo-800 dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">Home</NavLink>
                            </li>
                            <li className='  rounded'>
                                <NavLink to='/create-post' className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700  hover:bg-indigo-800 dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">Create Blog</NavLink>
                            </li>
                            <li className='   rounded'>
                                <NavLink to="/about" className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700 hover:bg-indigo-800  dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">About</NavLink>
                            </li>
                            <li className='   rounded'>
                                <NavLink to="/contact-us" className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700 hover:bg-indigo-800  dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">Contact</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4 ">
                        {user ? (
                            <div className='sm:block hidden'>
                                <div className="flex  items-center space-x-2 text-white">
                                    <IoMdPerson onClick={() => setLogoutBtn(!logoutBtn)} className="cursor-pointer" />
                                    <p>{user.displayName}</p>
                                    {logoutBtn && (
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                navigate('/auth');
                                            }}
                                            className="bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                                        >
                                            Log Out
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <NavLink
                                to="/auth"
                                className="bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                            >
                                Log in
                            </NavLink>
                        )}

                        <div className=" md:hidden flex items-center relative">
                            <button className="text-white focus:outline-none" onClick={() => {
                                setMobmenu(!mobMenu)
                            }}>

                                <RiMenu3Fill className='text-xl' />
                            </button>
                            <div className={` block md:hidden  absolute -right-4 ${mobMenu ? 'flex' : 'hidden'} justify-center top-10 w-screen bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 z-10 py-4`}>
                                <ul className=" flex flex-col items-center gap-4  text-white font-medium">
                                    <li className='   rounded ' onClick={() => setMobmenu(false)}>
                                        <NavLink to="/" className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700 hover:bg-indigo-800 dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">Home</NavLink>
                                    </li>
                                    <li className='  rounded ' onClick={() => setMobmenu(false)}>
                                        <NavLink to='/create-post' className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700  hover:bg-indigo-800 dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">Create Blog</NavLink>
                                    </li>
                                    <li className='   rounded ' onClick={() => setMobmenu(false)}>
                                        <NavLink to="/about" className={({ isActive }) => `block rounded px-5 py-2 lg:text-primary-700 hover:bg-indigo-800  dark:text-white ${isActive ? 'bg-indigo-800' : null} `} aria-current="page">About</NavLink>
                                    </li>
                                    <li className='sm:hidden'>
                                        {user ? (
                                            <div className="flex items-center space-x-2 text-white">
                                                <IoMdPerson onClick={() => setLogoutBtn(!logoutBtn)} className="cursor-pointer" />
                                                <p>{user.displayName}</p>
                                                {logoutBtn && (
                                                    <button
                                                        onClick={() => {
                                                            handleLogout();
                                                            navigate('/auth');
                                                        }}
                                                        className="bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                                                    >
                                                        Log Out
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <NavLink
                                                to="/auth"
                                                className="bg-white text-indigo-600 font-medium px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                                            >
                                                Log in
                                            </NavLink>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
            </nav>
        </header>
    );
};

export default Header;


