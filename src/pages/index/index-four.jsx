import React, { useState } from "react";
import { Link } from "react-router-dom";

import Image from "../../assets/images/hero.jpg";

import Navbar from "../../component/navbar";
import Client from "../../component/client";
import Property from "../../component/Properties/property";
import Footer from "../../component/footer";
import About from "../../component/about";
import Feature from "../../component/feature";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";

// import ModalVideo from "react-modal-video";
// import "../../node_modules/react-modal-video/scss/modal-video.scss";
import { FiSearch } from "react-icons/fi";


export default function IndexFour() {
    const [isOpen, setOpen] = useState(false)

    const [activeTabIndex, setActiveIndex] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveIndex(tabIndex);
    };

    return (
        <>
            <Navbar />
            {/* Hero Start  */}

            <section className="relative py-40 lg:h-screen flex justify-center items-center bg-primary/10">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-7.5 mt-10 items-center">
                        <div className="md:text-start text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Find Your <span className="text-primary">Perfect <br /> & Wonderful</span> Home</h1>
                            <p className="text-slate-400 text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                            <div className="relative mt-8">
                                <div className="grid grid-cols-1">
                                    <ul className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl shadow-sm shadow-gray-200 dark:shadow-gray-700" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                                        <li role="presentation" className="inline-block">
                                            <button onClick={() => handleTabClick(0)} className={`px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="buy-home-tab" data-tabs-target="#buy-home" type="button" role="tab" aria-controls="buy-home" aria-selected="true">Buy</button>
                                        </li>
                                        <li role="presentation" className="inline-block">
                                            <button onClick={() => handleTabClick(1)} className={`px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="sell-home-tab" data-tabs-target="#sell-home" type="button" role="tab" aria-controls="sell-home" aria-selected="false">Sell</button>
                                        </li>
                                        <li role="presentation" className="inline-block">
                                            <button onClick={() => handleTabClick(2)} className={`px-6 py-2 text-base font-medium rounded-full w-full transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-primary' : 'hover:text-primary'}`} id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">Rent</button>
                                        </li>
                                    </ul>

                                    <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                        {activeTabIndex === 0 && (
                                            <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                                <div className="subcribe-form z-1">
                                                    <form className="relative max-w-2xl mx-auto">
                                                        <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                                        <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                                                        <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        {activeTabIndex === 1 && (
                                            <div id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                                                <div className="subcribe-form z-1">
                                                    <form className="relative max-w-2xl mx-auto">
                                                        <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                                        <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                                                        <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        {activeTabIndex === 2 && (
                                            <div id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                                                <div className="subcribe-form z-1">
                                                    <form className="relative max-w-2xl mx-auto">
                                                        <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                                        <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                                                        <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:ms-10">
                            <div className="p-5 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-t-full bg-white dark:bg-slate-900">
                                <img src={Image} className="shadow-md rounded-t-full rounded-md" alt="" />
                            </div>
                            <div className="absolute bottom-2/4 translate-y-2/4 inset-s-0 inset-e-0 text-center">
                                <Link to="#" onClick={()=>setOpen(!isOpen)} className="lightbox size-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-primary">
                                    <i className="ri-play-fill inline-flex items-center justify-center text-2xl"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero End */}

            <section className="relative md:pb-24 pb-16">
                <About />
                <Feature />
                <Property />
                <Client />
                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
            {isOpen && 
                <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-1 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-1 md:p-1 space-y-4">
                                <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );

}
