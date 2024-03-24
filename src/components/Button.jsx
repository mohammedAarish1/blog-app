import React from 'react'

const Button = ({ text }) => {
    return (
        <div className=''>
            <a href="#_" className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white  rounded-md shadow-2xl group">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>

                <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

                <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

                <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

                <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                <span className="relative text-black hover:text-white ">{text}</span>
            </a>
        </div>
    )
}

export default Button
