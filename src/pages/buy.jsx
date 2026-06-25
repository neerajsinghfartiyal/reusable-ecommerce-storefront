import React from "react";
import Navbar from "../component/navbar";

import BackgroundImage from "../assets/images/bg/01.jpg";
import Property from "../component/Properties/property";
import Feature from "../component/feature";
import Footer from "../component/footer";
import BuyTab from "../component/buy-tab";
import Switcher from "../component/switcher";
import GetInTuch from "../component/get-in-tuch";
import { FiSearch } from "react-icons/fi";

export default function Buy() {

    return (
        <>
            <Navbar navClass="navbar-white" />
            {/* <!-- Start Hero --> */}
            <section
                style={{ backgroundImage: `url(${BackgroundImage})` }}
                className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Find Your Dream Home</h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative md:pb-24 pb-16">
                <div className="container relative -mt-6.25">
                    <div className="grid grid-cols-1">
                        <div className="subcribe-form z-1">
                            <form className="relative max-w-2xl mx-auto">
                                <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4"></FiSearch>
                                <input type="name" id="search_name" name="name" className="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                                <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-md">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* End Hero  */}
                <Property />
                <Feature />
                <BuyTab />
                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
