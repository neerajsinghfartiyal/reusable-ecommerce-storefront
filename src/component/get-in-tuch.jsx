import React from 'react'
import { FiPhone } from 'react-icons/fi';
import { Link } from "react-router-dom";

export default function GetInTuch(){
    return(
        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-slate-900 dark:text-white">Have Question ? Get in touch!</h3>

                <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                <div className="mt-6">
                    <Link to="/contact" className="btn bg-primary hover:bg-primary-dark text-white rounded-md!"><FiPhone  className="align-middle me-2"/> Contact us</Link>
                </div>
            </div>
        </div>
    )
}
