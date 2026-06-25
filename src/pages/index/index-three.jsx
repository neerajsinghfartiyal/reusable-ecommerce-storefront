import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../component/navbar";
import Client from "../../component/client";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import FooterLight from "../../component/footer-light";
import TeamOne from "../../component/team-one";

import { counterData, properties } from "../../component/data/data";

import { FiSearch } from "react-icons/fi";
import { LiaBathSolid, LiaCompressArrowsAltSolid } from "react-icons/lia";
import { BiBed } from "react-icons/bi";
import { LuArrowRight } from "react-icons/lu";

export default function IndexThree() {

    // For Counter
    const [counts, setCounts] = useState(counterData.map(() => 0));

    useEffect(() => {
        const duration = 1000;

        const starts = counterData.map(() => 0);
        const ends = counterData.map(item => item.target);

        const increments = ends.map((end, i) => (end - starts[i]) / (duration / 16));

        let current = [...starts];

        const timer = setInterval(() => {
            let completed = true;

            current = current.map((val, i) => {
                val += increments[i];

                if (val < ends[i]) {
                    completed = false;
                    return val;
                } else {
                    return ends[i];
                }
            });

            setCounts(current.map(v => Math.floor(v)));

            if (completed) clearInterval(timer);

        }, 16);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Navbar />
            {/* <!-- Google Map --> */}
            <div className="container-fluid relative mt-20">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-0 border-0">
                        <iframe title="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{ border: "0" }} className="w-full h-125" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="container relative -mt-6.25">
                <div className="grid grid-cols-1">
                    <div className="subcribe-form z-1">
                        <form className="relative max-w-2xl mx-auto">
                            <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4" />
                            <input type="name" id="search_name" name="name" className="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :" />
                            <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-md">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Google Map --> */}
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-7.5">
                        {properties.map((item, index) => (
                            <div key={index} className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto">
                                <div className="md:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover md:w-48" src={item.image} alt="" />
                                        <div className="absolute top-4 inset-e-4">
                                            <Link to="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="ri-heart-fill text-lg"></i></Link>
                                        </div>
                                    </div>
                                    <div className="p-6 w-full">
                                        <div className="md:pb-4 pb-6">
                                            <Link to={`/property-detail/${item.id}`} className="text-lg hover:text-primary font-medium ease-in-out duration-500">10765 Hillshire Ave, Baton Rouge, LA 70810, USA</Link>
                                        </div>

                                        <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center justify-between list-none">
                                            <li className="flex items-center me-4">
                                                <LiaCompressArrowsAltSolid className="text-2xl me-2 text-primary"/>
                                                <span>{item.square}sqf</span>
                                            </li>

                                            <li className="flex items-center me-4">
                                                <BiBed className="text-2xl me-2 text-primary"/>
                                                <span>{item.beds} Beds</span>
                                            </li>

                                            <li className="flex items-center">
                                                <LiaBathSolid className="text-2xl me-2 text-primary"/>
                                                <span>{item.baths} Baths</span>
                                            </li>
                                        </ul>

                                        <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                                            <li>
                                                <span className="text-slate-400">Price</span>
                                                <p className="text-lg font-medium">${item.price}</p>
                                            </li>

                                            <li>
                                                <span className="text-slate-400">Rating</span>
                                                <ul className="text-lg font-medium text-amber-400 list-none">
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1 text-slate-900 dark:text-white">{item.rating}(30)</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:flex justify-center text-center mt-6">
                        <div className="md:w-full">
                            <Link to="/list" className="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <LuArrowRight className="ms-1 text-xs"/></Link>
                        </div>
                    </div>
                </div>
                <div className="container relative lg:mt-24 mt-16 lg:pt-24 pt-16">
                    <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-[url('../../assets/images/map.png')] bg-no-repeat bg-center bg-cover"></div>
                    <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Trusted by more than 10K users</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-7.5 z-1">
                        {counterData.map((item, index) =>{
                            return(
                                <div className="counter-box text-center" key={index}>
                                    <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white">{counts[index]}+</h1>
                                    <h5 className="counter-head text-lg font-medium">{item.title}</h5>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <TeamOne/>
                </div>
                <Client />
               <GetInTuch/>
            </section>
            <FooterLight />
            <Switcher />
        </>
    );
}

