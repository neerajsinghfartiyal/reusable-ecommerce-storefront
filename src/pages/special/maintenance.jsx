import React, { useState, useEffect } from "react";

import LogoLight from "../../assets/images/logo-icon-64.png";
import BackgroundImage from "../../assets/images/bg/01.jpg";

import Switcher from "../../component/switcher";

export default function Maintenance() {
    const [minutes, setMinutes] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    
    useEffect(() => {

        let intervalId = setInterval(() => {
            calculateTimeRemaining()
        }, 1000);

        var seconds = 3599;
        function calculateTimeRemaining() {

            const minutes = Math.round((seconds - 30) / 60);
            const remainingSeconds = seconds % 60;

            setMinutes(minutes);
            setRemainingSeconds(remainingSeconds);

            if (seconds === 0) {
                clearInterval(intervalId);
            } else {
                seconds = seconds - 1;
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <>

            <section className="md:h-screen py-36 flex items-center justify-center relative overflow-hidden zoom-image">
                <div  style={{ backgroundImage: `url(${BackgroundImage})` }} className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 z-2"></div>
                <div className="container relative z-3 text-center">

                    <div className="grid grid-cols-1">
                        <img src={LogoLight} className="mx-auto" alt="" />
                        <h1 className="text-white mb-6 mt-8 md:text-5xl text-3xl font-bold">We Are Back Soon...</h1>
                        <p className="text-white/70 text-lg max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>
                    <div className="grid grid-cols-1 mt-10">
                        <div className="text-center">
                            <span id="maintenance" className="timer text-white text-[56px] tracking-[1px]">{minutes}:{remainingSeconds}</span>
                            <span className="block text-base font-semibold uppercase text-white">Minutes</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-8">
                        <div className="text-center subcribe-form">
                            <form className="relative mx-auto max-w-xl">
                                <input type="email" id="subemail" name="name" className="pt-4 pe-40 pb-4 ps-6 w-full h-12.5 outline-none text-slate-900 dark:text-white rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-200 dark:border-gray-700" placeholder="Enter your email id.." />
                                <button type="submit" className="btn absolute top-0.5 inset-e-0.75 h-11.5 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full">Subcribe Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--end section --> */}
            <Switcher />
        </>
    );

}