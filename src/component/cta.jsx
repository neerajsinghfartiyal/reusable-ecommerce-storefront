import React, { useEffect, useState } from 'react'

export default function Cta() {

    // For Counter
    const [counts, setCounts] = useState([1010, 5, 1]);

    useEffect(() => {
        const starts = [1010, 5, 1];
        const ends = [1548, 25, 9];

        const duration = 500;

        const increments = starts.map((start, i) => (ends[i] - start) / (duration / 16));

        let current = [...starts];

        const timer = setInterval(() => {
            let completed = true;

            current = current.map((value, i) => {
                value += increments[i];

                if (value < ends[i]) {
                    completed = false;
                    return value;
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
        <section className="relative py-24 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="absolute inset-0 bg-slate-900/60"></div>
            <div className="container relative">
                <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                    <div className="lg:col-start-2 lg:col-span-10">
                        <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                            
                            <div className="counter-box text-center">
                                <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">{counts[0]}+</h1>
                                <h5 className="counter-head text-white text-lg font-medium">Properties Sell</h5>
                            </div>
        
                            
                            <div className="counter-box text-center">
                                <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">{counts[1]}+</h1>
                                <h5 className="counter-head text-white text-lg font-medium">Award Gained</h5>
                            </div>
        
                            
                            <div className="counter-box text-center">
                                <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">{counts[2]}+</h1>
                                <h5 className="counter-head text-white text-lg font-medium">Years Experience</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
