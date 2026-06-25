import React from "react";
import { Link } from "react-router-dom";

import Select from 'react-select'

import Navbar from "../../../component/navbar";
import Pagination from "../../../component/pagination";
import Switcher from "../../../component/switcher";

import { properties } from "../../../component/data/data";
import { LuSearch } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

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

export default function GridMap() {

    return (
        <>
            <Navbar topnavClass="bg-white !dark:bg-slate-900" />

            <section className="relative">
                <div className="container-fluid">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2">
                        <div>
                            <div className="relative mt-12 md:p-8 py-8 px-3">
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
                                                        <RxHome className="icons"/>
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

                                <Pagination itemsPerPage={6} items={properties} gridClass={`grid lg:grid-cols-2 grid-cols-1 mt-8 gap-7.5`} />


                            </div>

                            <footer className="relative bg-neutral-900">
                                <div className="py-7.5 px-0">
                                    <div className="container text-center px-6">
                                        <div className="grid md:grid-cols-2 items-center gap-6">
                                            <div className="md:text-start text-center">
                                                <p className="mb-0 text-gray-300">© {(new Date().getFullYear())}{" "} Hously. Design & Develop with <i className="ri-heart-fill text-red-600"></i> by <Link rel="noreferrer" to="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                                            </div>

                                            <ul className="list-none md:text-end text-center">
                                                <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><FiFacebook className="size-4" /></Link></li>
                                                <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><FiInstagram  className="size-4" /></Link></li>
                                                <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><FiTwitter  className="size-4" /></Link></li>
                                                <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800! rounded-md hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"><FiLinkedin  className="size-4" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </footer>

                        </div>

                        <div className="relative md:block hidden">
                            <div className="map border-0 fixed w-full leading-0">
                                <iframe title="grid-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{ border: 0 }} className="w-full h-screen" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    );

}

