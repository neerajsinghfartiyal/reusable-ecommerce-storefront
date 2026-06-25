import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

import { LuSearch } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { AiOutlineDollarCircle } from "react-icons/ai";

import bg8 from '../../assets/images/bg/8.jpg'

import Navbar from '../../component/navbar'
import Categories from '../../component/categories';
import About from '../../component/about';
import Feature from '../../component/feature';
import FeatureProperty from '../../component/feature-property';
import TeamOne from '../../component/team-one';
import Client from '../../component/client';
import BlogOne from '../../component/blog-one';
import GetInTuch from '../../component/get-in-tuch';
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'

export default function IndexThirteen() {

    const Houses = [
        { value: 'AF', label: 'Apartment' },
        { value: 'AZ', label: ' Offices' },
        { value: 'BS', label: 'Townhome' },
    ]
    const minPrice = [
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '5', label: '5000' },
        { value: '5', label: '6000' },
    ]

  return (
    <>
        <Navbar navClass="navbar-white" />

        <section className="relative xl:pt-120 lg:pt-112 md:pt-108 pt-80 pb-8 bg-no-repeat bg-center bg-cover bg-fixed" style={{backgroundImage:`url(${bg8})`}}>
            <div className="absolute inset-0 bg-slate-950/20"></div>
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                    <div className="lg:col-span-9 md:col-span-6 col-span-12">
                        <h1 className="font-semibold text-white leading-none text-4xl xl:text-7xl lg:text-6xl">Property Buy & Sell <br/> Made Easy & Transparent</h1>
                    </div>
                    <div className="lg:col-span-3 md:col-span-6 col-span-12 md:mt-0 mt-6">
                        <p className="text-white/70 text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-6">
                    <form className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-gray-700 lg:ms-auto max-w-3xl">
                        <div className="registration-form text-slate-900 text-start">
                            <div className="grid md:grid-cols-4 grid-cols-1 md:gap-0 gap-6">
                                <div>
                                    <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <LuSearch className="icons"/>
                                        <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Categories:</label>                                                        
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <RxHome className=" icons"/>
                                        <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />

                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Price :</label>                                                        
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <AiOutlineDollarCircle className="icons"/>
                                        <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />

                                    </div>
                                </div>

                                <div className="md:mt-6">
                                    <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! lg:rounded-s-none! lg:rounded-sm! mt-2" value="Search" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <Categories/>
            </div>

            <About/>

            <Feature />

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <FeatureProperty/>
            </div>

            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <TeamOne/>
            </div>

            <Client />

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
