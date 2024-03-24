import React, { useEffect, useState } from 'react';
import Trending from '../components/Trending'
import { useFirebaseContext } from '../context/FirebaseContext';
import RecentBlogs from '../components/RecentBlogs';
import Tags from '../components/Tags';
import PopularBlogs from '../components/PopularBlogs';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '../components/Loading'



const Home = () => {
    // Sample blog data
    const [allBlogs, setAllBlogs] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(true)
    const [trendingBlogs, setTrendingblogs] = useState({})
    const { getAllBlogs, getTags, getTrendingBlogs } = useFirebaseContext()



    useEffect(() => {
        getAllBlogs().then((allBlogs) => setAllBlogs(allBlogs.docs))
    }, [])


    // to get the tags from all blogs
    useEffect(() => {
        const tagsArray = []

        getTags().then((value) => value.docs.map((doc) => {
            tagsArray.push(...doc.get('tags'))
            const uniqueTags = [...new Set(tagsArray)]
            setTags(uniqueTags)
        }))
        // console.log(tags)

    }, [])

    // to get trending blogs using query
    useEffect(() => {
        if (loading) {

            getTrendingBlogs().then((value) => {
                setTrendingblogs(value)
                setLoading(false)
            })
        }
    }, [])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };



    return (
        <div className=' '>
            <div className=' '>
                <div className=''>
                    <h1 className='text-xl w-[87%] mx-auto  py-5 b'>Trending</h1>

                    <div className='slider-container w-[90%] mx-auto '>

                        {loading ? <Loading /> : (
                            <Slider {...settings}>

                                {trendingBlogs.docs?.map((blogs) => {

                                    return <Trending key={blogs.id} id={blogs.id} blog={blogs.data()} />



                                })}

                            </Slider>
                        )}


                    </div>
                </div>
            </div>

            {/* Recetn Blogs */}
            <div className=' flex sm:flex-row flex-col justify-center gap-20 my-20 '>
                <div className='sm:w-1/2 flex flex-col gap-7'>
                    <h1 className='text-xl sm:w-full w-[90%] mx-auto'>Recent Blogs</h1>
                    {allBlogs.map((blogs) => <RecentBlogs key={blogs.id} id={blogs.id} blog={blogs.data()} setAllBlogs={setAllBlogs} />)}

                </div>
                <div className=' sm:w-1/4'>
                    <div className='flex flex-col gap-8'>
                        <div className="flex flex-col gap-2 ">
                            <h1 className='sm:w-full w-[90%] mx-auto'>Popular Tags</h1>
                            <div className=' flex flex-wrap gap-2 p-2'>
                                {tags.map((tag, i) => <Tags key={i} tag={tag} />)}
                            </div>
                        </div>
                        {/* popolar blogs */}
                        <div className='mt-3  '>
                            <h1 className='text-xl sm:w-full w-[90%] mx-auto'>Popular blogs</h1>
                            {allBlogs.map((blogs) => <PopularBlogs key={blogs.id} id={blogs.id} blog={blogs.data()} />)}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
