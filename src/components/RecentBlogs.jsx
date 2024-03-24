import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFirebaseContext } from '../context/FirebaseContext';
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';
import { toast } from 'react-toastify';
import Button from './Button';

const RecentBlogs = ({ blog, id, setAllBlogs }) => {
    const [url, setUrl] = useState(null);
    const { getImage, user, handleDeleteBtn, getAllBlogs } = useFirebaseContext()
    useEffect(() => {
        getImage(blog.imgURL).then((url) => setUrl(url))
    }, [])

    const handleBlogDeletion = () => {
        handleDeleteBtn(id).then(() => getAllBlogs()).then((blogs) => setAllBlogs(blogs.docs))
        toast.success("Blog deleted successfully")
    }
    // console.log(user);
    // console.log(blog);


    return (

        <div className='flex md:flex-row flex-col p-5 shadow-md shadow-gray-500 md:gap-3 gap-5'>
            <div className='md:w-1/2 '>
                <img className='w-full h-full object-cover ' src={url} alt="" />
            </div>
            <div className='flex flex-col gap-2 md:w-1/2'>
                <h3 className='bg-purple-500 text-white rounded py-1 text-end px-4 max-w-min'>{blog.category}</h3>
                <p className='text-xl px-2'><span className='text-gray-500 text-md'>Title:</span> {`${blog.title.substring(0, 30)}...`}</p>
                <p className='font-bold text-gray-800 ps-2'>{blog.userName}<span className='text-xs text-gray-500'> {blog.timeStamp?.toDate().toDateString()} </span></p>
                <p className='text-gray-500 px-2'>{`${blog.des.substring(0, 150)}...`}</p>
                <div className='flex justify-between items-center'>
                    <Link to={`/blog-detail/${id}`}>
                        <Button text="Read More" />
                        {/* <button type="button" className="text-white bg-indigo-800 hover:bg-indigo-600  font-medium rounded text-sm px-2 py-2  ">Read More</button> */}
                    </Link>
                    <div className='flex gap-1 text-2xl'>
                        <Link to={`/update-post/${id}`} className=' max-h-0 relative' >
                            <button className={`${user?.uid === blog?.userId ? 'text-green-500 cursor-pointer hover:text-green-700' : 'text-yellow-200'}`} disabled={user?.uid !== blog.userId}>
                                <FaEdit />
                            </button>

                        </Link>

                        <button className={`${user?.uid === blog?.userId ? 'text-red-600 cursor-pointer hover:text-red-800' : 'text-red-200'}`} disabled={user?.uid !== blog.userId} onClick={handleBlogDeletion}>
                            <RiDeleteBin6Line />
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default RecentBlogs
