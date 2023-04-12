import React from 'react';

import Header from '@components/template/Header';
import PageIllustration from '@components/template/PageIllustration';
import HeroHome from '@components/template/HeroHome';
import FeaturesBlocks from '@components/template/FeaturesBlocks';
import FeaturesZigZag from '@components/template/FeaturesZigzag';
import Testimonials from '@components/template/Testimonials';
import Newsletter from '@components/template/Newsletter';

import Footer from '@components/template/Footer';
import Jobs from '@components/template/Jobs';

function Home() {
    return (
        <div className="bg-gray-900 font-inter antialiased  text-gray-200 tracking-tight flex flex-col min-h-screen overflow-hidden">
            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className="grow">
                {/*  Paxge illustration */}
                <div
                    className="relative max-w-6xl mx-auto h-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <PageIllustration />
                </div>

                {/*  Page sections */}
                <HeroHome />
                <Jobs />
                <FeaturesBlocks />
                <FeaturesZigZag />
                <Testimonials />
                <Newsletter />
            </main>

            {/*  Site footer */}
            <Footer />
        </div>
    );
}

export default Home;
