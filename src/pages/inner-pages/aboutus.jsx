import React, { useEffect, useState } from "react";

import BackgroudImage from "../../assets/images/bg/01.jpg";

import Navbar from "../../component/navbar";
import About from "../../component/about";
import Feature from "../../component/feature";
import ClientTwo from "../../component/client-two";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";
import GetInTuch from "../../component/get-in-tuch";

import { counterData } from "../../component/data/data";
import TeamOne from "../../component/team-one";

export default function Aboutus() {

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
            <Navbar navClass="navbar-white" />
            {/* <!-- Start Hero --> */}
            <section
                style={{ backgroundImage: `url(${BackgroudImage})` }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                 <div className="absolute inset-0 bg-slate-900/80"></div>
                 <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">About Us</h3>
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
            <section className="relative md:pb-24 pb-16">
                <About />
                <Feature />
            </section>
            {/* <!-- Start CTA --> */}
            <section
                style={{ backgroundImage: `url(${BackgroudImage})` }}
                className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover">
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                        <div className="lg:col-start-2 lg:col-span-10">
                            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                                {counterData.map((item, index) =>{
                                    return(
                                        <div className="counter-box text-center" key={index}>
                                            <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                                                {counts[index]}+
                                            </h1>
                                            <h5 className="counter-head text-white text-lg font-medium">{item.title}</h5>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End CTA --> */}

            <section className="relative md:pb-24 pb-16">
                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <TeamOne/>
                </div>
                <ClientTwo />
                <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
