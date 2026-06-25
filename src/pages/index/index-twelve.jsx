import React from 'react'
import { Link } from 'react-router-dom'

import bg from '../../assets/images/bg/7.jpg'

import Navbar from '../../component/navbar'
import FormTab from '../../component/form-tab'
import AboutThree from '../../component/about-three'
import Categories from '../../component/categories'
import FeatureProperty from '../../component/feature-property'
import About from '../../component/about'
import TeamOne from '../../component/team-one'
import ClientTwo from '../../component/client-two'
import BlogOne from '../../component/blog-one'
import GetInTuch from '../../component/get-in-tuch'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'

export default function IndexTwelve() {
  return (
    <>
        <Navbar navClass="navbar-white"/>

        <section className="relative md:h-screen flex items-center md:py-0 py-30 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url(${bg})`}}>
            <div className="absolute inset-0 bg-slate-950/40"></div>
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5 mt-10">
                    <div className="lg:col-span-7 md:col-span-6">
                        <h1 className="font-bold lg:leading-normal leading-normal text-white text-5xl lg:text-7xl mb-4">Discover Your Dream Home</h1>

                        <p className="text-xl max-w-xl text-white/70">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                        <div className="mt-8">
                            <Link to="" className="btn bg-primary hover:bg-primary-dark border border-primary text-white rounded-md">Explore More</Link>
                            <Link to="" className="btn border border-white text-white hover:bg-primary hover:border-primary rounded-md">Contact Us</Link>
                        </div>
                    </div>

                    <FormTab/>
                </div>
            </div>
        </section>

         <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Why Choose Us?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <AboutThree/>
            </div>
            
            <div className="container relative mt-16">
                <Categories/>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <FeatureProperty/>
            </div>

            <About/>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <TeamOne/>
            </div>
                
            <div className="container relative lg:mt-24 mt-16">
                <ClientTwo/>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <BlogOne/>
            </div>

            <GetInTuch/>
        </section>

        <Footer/>
        <Switcher/>
    </>
  )
}
