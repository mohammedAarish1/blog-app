import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebaseContext } from '../context/FirebaseContext'
import Loading from '../components/Loading'
import PopularBlogs from '../components/PopularBlogs'

const BlogDetail = () => {
    const { id } = useParams()
    const { getDataById, getImage } = useFirebaseContext()
    const [blog, setBlog] = useState(null)
    const [url, setUrl] = useState(null);
    const [allBlogs, setAllBlogs] = useState([])
    const { getAllBlogs } = useFirebaseContext()

    useEffect(() => {
        getDataById(id).then((value) => {
            setBlog(value.data())
        })
    }, [id])



    useEffect(() => {
        if (blog) {
            getImage(blog.imgURL).then((url) => setUrl(url))
        }
    }, [blog])




    if (blog === null) {
        return (
            <Loading />
        )
    }
    return (
        <div className="bg-gray-100">
            <div className="relative">
                {/* Hero Image Section */}
                <div className="h-[400px] bg-cover bg-center relative" style={{ backgroundImage: `url(${url})` }}>
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="text-center">
                            <h3 className="text-white text-6xl font-semibold">{blog.category}</h3>
                            <p className="text-white text-sm">{blog.timeStamp.toDate().toDateString()}</p>
                        </div>
                    </div>
                </div>
                {/* End of Hero Image Section */}

                {/* Blog Details */}
                <div className="px-4 py-8 md:px-8 md:py-12 relative z-10">
                    <div className="max-w- mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{blog.title.toUpperCase()}</h2>
                        <p className="text-base text-gray-700 mb-4">{blog.des}</p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <p>Author: <span className='font-bold'> {blog.userName}</span></p>
                            <p>Date: <span className='font-bold'>{blog.timeStamp.toDate().toDateString()}</span></p>
                        </div>
                    </div>
                </div>
                {/* End of Blog Details */}
            </div>

        </div>
    );
}

export default BlogDetail
