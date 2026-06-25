import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";

import { blogList } from "../../component/data/data";
import { LuArrowRight, LuCalendarDays } from "react-icons/lu";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function Blogs() {

    return (
        <>
            <Navbar navClass="navbar-white" />
            {/* <!-- Start Hero --> */}
            <section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0  bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Blogs & News</h3>
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
            {/* <!-- End Hero --> */}

            {/* <!-- Start --> */}

            <section className="relative md:py-24 py-16" >
                <div className="container">

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5" >
                        {blogList.map((item, index) => (
                            <div key={index} className="group relative h-fit hover:-mt-1.25 overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500">
                                <div className="relative overflow-hidden">
                                    <img src={item.image} className="" alt="" />
                                    <div className="absolute inset-e-4 top-4">
                                        <span className="bg-primary text-white text-[14px] px-2.5 py-1 font-medium rounded-full h-5">{item.type}</span>
                                    </div>
                                </div>

                                <div className="relative p-6">
                                    <div className="">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-slate-400 text-sm flex"><LuCalendarDays className="text-slate-900 dark:text-white me-2 text-sm"/>{item.date}</span>
                                            <span className="text-slate-400 text-sm ms-3 flex"><AiOutlineClockCircle className="text-slate-900 dark:text-white me-2 text-sm"/>5 min read</span>
                                        </div>

                                        <Link to={`/blog-detail/${item.id}`} className="title text-xl font-medium hover:text-primary duration-500 ease-in-out">{item.title}</Link>

                                        <div className="mt-3">
                                            <Link to={`/blog-detail/${item.id}`} className="btn btn-link hover:text-primary after:bg-primary duration-500 ease-in-out">Read More <LuArrowRight className="ms-1 text-xs"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Switcher />
            <Footer />

        </>
    );

}