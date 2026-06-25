import React, { useState } from "react";
import Select from 'react-select'

import BackgroudImage from "../../assets/images/bg/04.jpg";

import Navbar from "../../component/navbar";
import ClientTwo from "../../component/client-two";
import PropertyTwo from "../../component/property-two";
import Footer from "../../component/footer";
import About from "../../component/about";
import Feature from "../../component/feature";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import Cta from "../../component/cta";
import Partner from "../../component/partner";

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

export default function IndexTwo() {

    const [activeTabIndex, setActiveIndex] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveIndex(tabIndex);
    };


    return (
        <>
            <Navbar navClass="navbar-white" />
            {/* Hero Start  */}
            <section className="relative table w-full lg:py-44 py-36 overflow-hidden">
                <div className="zoom-image">
                    <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/04.jpg')] bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${BackgroudImage})` }}></div>
                    <div className="absolute inset-0 bg-slate-900/70 z-2"></div>
                </div>
                <div className="container relative z-3">
                    <div className="grid grid-cols-1 mt-10">
                        <div className="text-center">
                            <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Easy way to find your <br /> dream property</h1>
                            <p className="text-white/70 text-xl max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                        </div>
                        <ul className="inline-block mx-auto sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 backdrop-blur-sm rounded-t-xl border-b border-gray-200 dark:border-gray-800 mt-10" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                            <li role="presentation" className="inline-block">
                                <button onClick={() => handleTabClick(0)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="buy-home-tab" data-tabs-target="#buy-home" type="button" role="tab" aria-controls="buy-home" aria-selected="true">Buy</button>
                            </li>
                            <li role="presentation" className="inline-block">
                                <button onClick={() => handleTabClick(1)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="sell-home-tab" data-tabs-target="#sell-home" type="button" role="tab" aria-controls="sell-home" aria-selected="false">Sell</button>
                            </li>
                            <li role="presentation" className="inline-block">
                                <button onClick={() => handleTabClick(2)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">Rent</button>
                            </li>
                        </ul>

                        <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 md:rounded-xl rounded-none shadow-md dark:shadow-gray-700">
                        {activeTabIndex === 0 && (
                            <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                <form action="#">
                                    <div className="registration-form text-dark text-start">
                                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
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
                                                    <RxHome className="icons"/>
                                                    <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />

                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                <div className="filter-search-form relative filter-border mt-2">
                                                    <LuSearch className="icons"/>
                                                    <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />

                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                <div className="filter-search-form relative mt-2">
                                                    <LuSearch className="icons"/>
                                                    <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={maxPrice} />

                                                </div>
                                            </div>

                                            <div className="lg:mt-6">
                                                <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        {activeTabIndex === 1 && (
                            <div id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                                <form action="#">
                                <div className="registration-form text-dark text-start">
                                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
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
                                                    <RxHome className="icons"/>
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
                                                <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        {activeTabIndex === 2 && (
                            <div id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                                <form action="#">
                                <div className="registration-form text-dark text-start">
                                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
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
                                                    <RxHome className="icons"/>
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
                                                <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero End */}

            <section className="relative md:pb-24 pb-16">
                <About />
                <Feature />

                <div className="relative md:pb-24 pb-16">
                    <PropertyTwo />
                </div>

                <Cta/>

                <Partner/>

                <ClientTwo />

                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
            {/* <!-- End --> */}
        </>
    );

}
