import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const moveToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (


        <footer className="bg-white  shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex sm:flex-row flex-col sm:items-center justify-center items-center gap-3 sm:justify-between">
                    <div className=' '>

                        <img src='logo.png' className="mr-3 w-48 h-1/3 " />
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <Link to='/'>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6" onClick={moveToTop}>Home</a>
                            </li>
                        </Link>
                        <Link to='/about'>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6" onClick={moveToTop}>About</a>
                            </li>
                        </Link>
                        <Link to='/contact-us'>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6" onClick={moveToTop}>Contact</a>
                            </li>
                        </Link>

                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 text-center dark:text-gray-400">© 2024 blogBuZZ. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer
