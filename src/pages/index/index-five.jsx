import React, { useState } from "react";
import { Link } from "react-router-dom";

import BackgroundImage from "../../assets/images/bg/05.jpg";

// import ModalVideo from "react-modal-video";
// import "../../node_modules/react-modal-video/scss/modal-video.scss";

import Navbar from "../../component/navbar";
import Client from "../../component/client";
import Footer from "../../component/footer";
import About from "../../component/about";
import Feature from "../../component/feature";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import Categories from "../../component/categories";
import { FiSearch } from "react-icons/fi";
import PropertyTwo from "../../component/property-two";

export default function IndexFive() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Navbar />
            {/* Hero Start  */}
            <section className="relative md:pt-44 pt-36 bg-linear-to-b from-slate-50 dark:from-slate-800 to-transparent">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Are you ready to find your dream home</h1>
                            <p className="text-slate-400 mx-auto text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                            <div className="subcribe-form relative z-1 mt-8">
                                <form className="relative max-w-2xl mx-auto">
                                    <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                                    <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                                    <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="relative -mt-6.25">
                            <img src={BackgroundImage} className="rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700" alt="" />
                            <div className="absolute bottom-2/4 translate-y-2/4 inset-s-0 inset-e-0 text-center">
                                <Link to="#" onClick={()=>setOpen(!isOpen)} className="lightbox size-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-primary">
                                    <i className="ri-play-fill inline-flex items-center justify-center text-2xl"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid grid-cols-1 pb-8">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                        <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <Categories/>
                </div>

                {/* Hero End */}
                <About />
                <Feature />
                <PropertyTwo />
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
