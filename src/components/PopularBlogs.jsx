import React, { useEffect, useState } from 'react'
import { useFirebaseContext } from '../context/FirebaseContext';
import { Link } from 'react-router-dom';

const PopularBlogs = ({ id, blog }) => {

    const [url, setUrl] = useState(null);
    const { getImage } = useFirebaseContext()
    useEffect(() => {
        getImage(blog.imgURL).then((url) => setUrl(url))
    }, [])

    return (
        <Link to={`/blog-detail/${id}`}>
            <div className='flex gap-3  p-4 hover:bg-slate-100 cursor-pointer shadow-lg w-full'>
                <div className='w-1/2'>
                    <img src={url} alt='img' />
                </div>
                <div className='flex flex-col gap-1 '>
                    <p className=''>{blog.category}</p>
                    <p>{blog.timeStamp.toDate().toDateString()}</p>
                </div>
            </div>
        </Link>


    )
}

export default PopularBlogs
