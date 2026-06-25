import React from "react";
import { Link } from "react-router-dom";

import Select from 'react-select'
import { TypeAnimation } from 'react-type-animation';

import Navbar from "../../component/navbar";
import Client from "../../component/client";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import PropertyTwo from "../../component/property-two";
import AboutTwo from "../../component/about-two";
import Categories from "../../component/categories";
import { LuSearch } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { AiOutlineDollarCircle } from "react-icons/ai";

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
const maxPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]

export default function IndexSix() {

    return (
        <>
            <Navbar navClass="navbar-white"/>
            {/* Hero Start  */}
            <section className="relative table w-full py-36 md:py-44 lg:py-56 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/50"></div>
                    <div className="container relative z-3">
                        <div className="grid md:grid-cols-12 mt-10">
                            <div className="lg:col-span-8 md:col-span-6">
                                <h1 className="font-semibold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6">Find the perfect <br/> 
                                <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed out once, initially
                                        'home',
                                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                                        'villa',
                                        1000,
                                        'office',
                                        1000,
                                    ]}
                                    wrapper="span"
                                    speed={40}
                                    style={{ fontSize: '1ren', display: 'inline-block' }}
                                    repeat={Infinity}
                                    cursor={false}
                                    /> for you</h1>
                                <p className="text-white/70 text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                                <div className="mt-4">
                                    <Link to="" className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-3">Learn More </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
                {/* Hero End */}

            <section className="relative md:pb-24 pb-16">
                <div className="container">
                    <div className="grid grid-cols-1 justify-center">
                        <div className="relative -mt-32">
                            <div className="grid grid-cols-1">
                                <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                    <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                        <form action="#">
                                            <div className="registration-form text-dark text-start">
                                                <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                    <div>
                                                        <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                        <div className="filter-search-form relative filter-border mt-2">
                                                            <LuSearch className="icons"/>
                                                            <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                        <div className="filter-search-form relative filter-border mt-2">
                                                            <RxHome className=" icons"/>
                                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />

                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                        <div className="filter-search-form relative filter-border mt-2">
                                                            <AiOutlineDollarCircle className="icons"/>
                                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />

                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                        <div className="filter-search-form relative mt-2">
                                                            <AiOutlineDollarCircle className="icons"/>
                                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={maxPrice} />

                                                        </div>
                                                    </div>

                                                    <div className="lg:mt-6">
                                                        <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-15! lg:rounded-none rounded-sm mt-2" value="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <About/> */}
                <AboutTwo/>
                <PropertyTwo/>
                <div className="relative md:pt-24 pt-16">
                    <div className="container">
                        <div className="grid grid-cols-1 pb-8">
                            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                            <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                        </div>

                        <Categories/>
                    </div>
                </div>
                <Client />
                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
            {/* <!-- End --> */}
        </>
    );

}
