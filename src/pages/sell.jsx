import React, { useEffect } from "react";
import Navbar from "../component/navbar";

import BackgroundImage from "../assets/images/bg/01.jpg";
import Feature from "../component/feature";
import Footer from "../component/footer";
import Switcher from "../component/switcher";
import GetInTuch from "../component/get-in-tuch";

export default function Sell() {

    useEffect(() => {
        const rangeSlider = document.getElementById('slider');
        const value = rangeSlider.value;
        document.getElementById('amount-label').innerHTML = value;
        document.getElementById('saving-label').innerHTML = parseFloat(value * 0.01).toFixed(2);
        window.scrollTo(0, 0)
    });

    const handleChange = (e) => {
        console.log(e.target.value, '32');
        const value = e.target.value;
        document.getElementById('amount-label').innerHTML = value;
        document.getElementById('saving-label').innerHTML = parseFloat(value * 0.01).toFixed(2);
    }


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
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Sell Faster. Save Thousands.</h3>
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

            {/* End Hero  */}
            <section className="relative md:pb-24 pb-16">
                <Feature />
                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Brokerage Calculator</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <div className="md:flex justify-center mt-8">
                        <div className="lg:w-3/5 md:w-4/5">
                            <div className="p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md" role="form">
                                <ul className="list-none flex justify-between">
                                    <li className="h6">Min $ 10000</li>
                                    <li className="h6">Max $ 200000</li>
                                </ul>

                                <div className="row">
                                    <div className="col-sm-12 mb-4">
                                        <label htmlFor="slider" className="form-label"></label>
                                        <input id="slider" onInput={handleChange} type="range" defaultValue="10000" min="10000" max="200000" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                                    </div>
                                </div>

                                <ul className="list-none text-center md:flex justify-between">
                                    <li>
                                        <ul className="text-md-start brokerage-form list-none">
                                            <li className="font-medium"><label className="control-label">Total Value ($)</label></li>
                                            <li><input type="hidden" id="amount" className="form-control" /><span className="text-primary">$</span> <p className="inline-block h5 text-primary" id="amount-label"></p></li>
                                        </ul>
                                    </li>

                                    <li className="mt-2 mt-sm-0">
                                        <ul className="text-md-end brokerage-form list-none">
                                            <li className="font-medium"><label className="control-label">Brokerage Fee ($)</label></li>
                                            <li><input type="hidden" id="saving" className="form-control" /><span className="text-primary">$</span> <p className="inline-block h5 text-primary" id="saving-label"></p></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

               <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
