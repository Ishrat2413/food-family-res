import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Food Family | Home</title>
            </Helmet>
            <Banner />
            <div className='max-w-screen-2xl mx-auto'>
                <Category />
                <PopularMenu />
                <Featured />
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;