import React from "react";
import { Link } from "react-router-dom";

import BackgroudImage from "../../assets/images/bg/01.jpg";

import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";
import { pricing } from "../../component/data/data";
import { BsCheckCircle } from "react-icons/bs";

export default function Pricing() {
  
    return (
        <>
            <Navbar navClass="navbar-white" />
            {/* <!-- Start Hero --> */}
            <section style={{ backgroundImage: `url(${BackgroudImage})` }} className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900 opacity-80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Pricing Plans</h3>
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
                        {pricing.map((item,index)=>{
                            const Icon = item.icon
                            return(
                                <div key={index} className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 hover:shadow-md dark:hover:shadow-gray-700 duration-500 ease-in-out">
                                    <div className="border-b border-gray-200 dark:border-gray-800 p-6 text-center">
                                        <div className="size-24 bg-primary/5 text-primary flex items-center justify-center text-3xl rounded-full mx-auto">
                                            <Icon className="text-3xl"/>
                                        </div>
                                        <h3 className="text-2xl text-primary font-medium mt-4">{item.title}</h3>

                                        <div className="flex justify-center mt-4">
                                            <span className="text-xl">$</span>
                                            <span className="text-3xl font-semibold">{item.amount}</span>
                                            <span className="text-xl self-end">/month</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h5>Pricing Features:</h5>
                                        <ul className="list-none">
                                            {item.features.map((el,index)=>{
                                                return(
                                                    <li key={index} className="text-slate-400 mt-2 flex items-center"><span className="text-primary text-lg me-2 "><BsCheckCircle className="align-middle"/></span>{el}</li>
                                                )
                                            })}
                                        </ul>
                                        <Link to="#" className="btn bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white rounded-md w-full mt-4">Get Started</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

               <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
        </>
    );
}

