import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { DEFAULT_BANNERS } from '../data/defaultCrafts';

const Banner = () => {

    const dispatch = useDispatch()
    const {banners} = useSelector(state => state.home)
    const displayBanners = banners && banners.length > 0 ? banners : DEFAULT_BANNERS
 
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    }

    useEffect(() => {
        dispatch(get_banners())
    },[])

    return (
        <div className='w-full md-lg:mt-6'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                <Carousel
                    autoPlay={true}
                    infinite={true}
                    arrows={true}
                    showDots={true}
                    responsive={responsive}
                >
                {
                   displayBanners.map((b, i) => <Link key={i} to={`product/details/${b.link}`}>
                        <img className='w-full h-[380px] md-lg:h-[260px] object-cover rounded-sm' src={b.banner} alt={`Craftoras showcase ${i + 1}`} />
                    </Link> )
                }
                </Carousel>        
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default Banner;