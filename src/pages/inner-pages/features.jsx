import React from "react";
import { Link } from "react-router-dom";

import BackgroudImage from "../../assets/images/bg/01.jpg";

import Navbar from "../../component/navbar";
import Client from "../../component/client";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import { featureTwo } from "../../component/data/data";
import { FiHexagon } from "react-icons/fi";

export default function Features() {
    return (
        <>
            <Navbar navClass="navbar-white" />
            {/* <!-- Start Hero --> */}
            <section
                style={{ backgroundImage: `url(${BackgroudImage})` }} className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                 <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
                 <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Services / Features</h3>
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

            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[50px]">
                        {featureTwo.map((item,index) =>{
                            return(
                                <div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden" key={index}>
                                    <div className="relative overflow-hidden text-transparent -m-3">
                                        <FiHexagon className="size-32 fill-primary/5"></FiHexagon>
                                        <div className="absolute top-[50%] -translate-y-[50%] inset-s-11.25 text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                            <i className={item.icon}></i>
                                        </div>
                                    </div>
        
                                    <div className="mt-6">
                                        <Link to="#" className="text-xl hover:text-primary font-medium">{item.title}</Link>
                                        <p className="text-slate-400 mt-3">{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>

                <Client />

                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
