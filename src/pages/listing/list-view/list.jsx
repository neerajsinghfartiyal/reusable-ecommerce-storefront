import React from "react";

import Select from 'react-select'

import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import PaginationTwo from "../../../component/pagination-two";
import Switcher from "../../../component/switcher";
import { properties } from "../../../component/data/data";

import { LuSearch } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { AiOutlineDollarCircle } from "react-icons/ai";

const Houses = [
    { value: 'AF', label: 'Apartment' },
    { value: 'AZ', label: ' Offices' },
    { value: 'BS', label: 'Townhome' },
]
const minPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]
const maxPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]

export default function List() {
    return (
        <>
            <Navbar navClass="navbar-white" />
            <section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">List View Layout</h3>
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
            <div className="container relative -mt-16 z-1">
                <div className="grid grid-cols-1">
                    <form className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700">
                        <div className="registration-form text-dark text-start">
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                <div>
                                    <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <LuSearch className="icons"/>
                                        <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" placeholder="Search your Keywords" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <RxHome className=" icons"/>
                                        <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />

                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <AiOutlineDollarCircle className="icons"/>
                                        <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />

                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                    <div className="filter-search-form relative mt-2">
                                        <AiOutlineDollarCircle className="icons"/>
                                        <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={maxPrice} />

                                    </div>
                                </div>

                                <div className="lg:mt-6">
                                    <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded" value="Search" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <PaginationTwo itemsPerPage={6} items={properties} gridClass={`grid lg:grid-cols-2 grid-cols-1 gap-7.5`} />
                </div>
            </section>
            {/* <!-- End --> */}
            <Footer />
            <Switcher />
        </>
    );

}

