import React, { useEffect, useState } from 'react';
import { useFirebaseContext } from '../context/FirebaseContext';
import { Link } from 'react-router-dom';

const Trending = ({ blog, id }) => {
    const [url, setUrl] = useState(null);
    const { getImage } = useFirebaseContext()
    useEffect(() => {
        getImage(blog.imgURL).then((url) => setUrl(url))
    }, [])


    return (
        <>
            <Link to={`blog-detail/${id}`}>
                <div className="relative overflow-hidden hover:scale-110 transform transition duration-700 cursor-pointer rounded-3xl mr-5 ">
                    <img
                        className="w-full h-64 object-cover object-center transform transition duration-500 "
                        src={url}
                        alt="Hero"
                    />
                    <div className="absolute bottom-0 left-0 right-0 text-white p-4 backdrop-blur-sm">
                        <div className="bg-black bg-opacity-50 p-2  text-center rounded-md">
                            <span className="text-xl">{blog.category}</span>
                        </div>
                        <div className=" p-2 text-center">
                            <span className="text-sm  font-bold">{blog.userName}</span>
                            <span className="text-sm ml-2"> {blog.timeStamp?.toDate().toDateString()}</span>
                        </div>
                    </div>
                </div>


            </Link>

        </>

    );
};

export default Trending;
