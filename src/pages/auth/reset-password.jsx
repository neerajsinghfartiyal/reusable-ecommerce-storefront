import React from "react";
import { Link } from "react-router-dom";

import Switcher from "../../component/switcher";

import Icon from "../../assets/images/logo-icon-64.png";
import BackgroudImage from "../../assets/images/bg/01.jpg";

export default function ResetPassword() {

    return (
        <>
            <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
                <div
                    style={{ backgroundImage: `url(${BackgroudImage})` }}
                    className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover"></div>
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
                
                <div className="container z-3">
                    <div className="flex justify-center">
                        <div className="max-w-100 w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md">
                            <Link to="/"><img src={Icon} className="mx-auto" alt="" /></Link>
                            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
                            <div className="grid grid-cols-1">
                                <p className="text-slate-400 mb-6">Please enter your email address. You will receive a link to create a new password via email.</p>
                                <form className="text-start">
                                    <div className="grid grid-cols-1">
                                        <div className="mb-4">
                                            <label className="font-medium" htmlFor="LoginEmail">Email Address:</label>
                                            <input id="LoginEmail" type="email" className="form-input border border-gray-200! dark:border-gray-800! mt-3" placeholder="name@example.com" />
                                        </div>

                                        <div className="mb-4">
                                            <Link to="#" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Send</Link>
                                        </div>

                                        <div className="text-center">
                                            <span className="text-slate-400 me-2">Remember your password ? </span><Link to="/auth-login" className="text-slate-900 dark:text-white font-bold">Sign in</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    );
    
}
