import React from "react";
import { Link } from "react-router-dom";

import Switcher from "../../component/switcher";
import Icon from "../../assets/images/logo-icon-64.png";
import BackgroudImage from "../../assets/images/bg/01.jpg";

export default function Signup() {
    return (
        <>
            <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
                <div
                    style={{ backgroundImage: `url(${BackgroudImage})` }}
                    className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
                <div className="container z-3">
                    <div className="flex justify-center">
                        <div className="max-w-100 w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md">
                            <Link to="/"><img src={Icon} className="mx-auto" alt="" /></Link>
                            <h5 className="my-6 text-xl font-semibold">Signup</h5>
                            <form className="text-start">
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                                        <input id="RegisterName" type="text" className="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="Harry" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" className="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input id="LoginPassword" type="password" className="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="Password:" />
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center w-full mb-0">
                                            <input className="form-checkbox size-4 appearance-none rounded-sm border border-gray-200 dark:border-gray-800 accent-primary checked:appearance-auto dark:accent-primary focus:border-primary-300 focus:ring-0 focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C" />
                                            <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">I Accept <Link to="#" className="text-primary">Terms And Condition</Link></label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <Link to="#" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Register</Link>
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">Already have an account ? </span> <Link to="/auth-login" className="text-slate-900 dark:text-white font-bold">Sign in</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    );
   
}
