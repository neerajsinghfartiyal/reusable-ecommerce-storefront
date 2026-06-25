import React, { useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { RxHome } from 'react-icons/rx'

import Select from 'react-select'

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

export default function FormTab() {
    
    const [activeTabIndex, setActiveIndex] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveIndex(tabIndex);
    };

  return (
        <div className="lg:col-span-5 md:col-span-6">
            <ul className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                <li role="presentation" className="inline-block">
                    <button onClick={() => handleTabClick(0)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-primary' : 'hover:text-primary'}`} >Buy</button>
                </li>
                <li role="presentation" className="inline-block">
                    <button onClick={() => handleTabClick(1)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-primary' : 'hover:text-primary'}`}>Sell</button>
                </li>
                <li role="presentation" className="inline-block">
                    <button onClick={() => handleTabClick(2)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-primary' : 'hover:text-primary'}`}>Rent</button>
                </li>
            </ul>

            <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700">
                {activeTabIndex === 0 && 
                    <div className="">
                        <form action="#">
                            <div className="registration-form text-slate-900 text-start">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="form-label font-medium text-slate-900 dark:text-white">Search : <span className="text-red-600">*</span></label>
                                        <div className="filter-search-form relative mt-2">
                                            <FiSearch className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                        </div>
                                    </div>
                                    

                                    <div>
                                        <label htmlFor="buy-properties" className="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <RxHome className="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary"></RxHome>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label htmlFor="buy-min-price" className="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <AiOutlineDollarCircle className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />
                                        </div>
                                    </div>

                                    <div>
                                        <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                {activeTabIndex === 1 && 
                    <div className="">
                        <form action="#">
                            <div className="registration-form text-slate-900 text-start">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="form-label font-medium text-slate-900 dark:text-white">Search : <span className="text-red-600">*</span></label>
                                        <div className="filter-search-form relative mt-2">
                                            <FiSearch className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                        </div>
                                    </div>
                                    

                                    <div>
                                        <label htmlFor="buy-properties" className="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <RxHome className="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary"></RxHome>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label htmlFor="buy-min-price" className="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <AiOutlineDollarCircle className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />
                                        </div>
                                    </div>

                                    <div>
                                        <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                {activeTabIndex === 2 && 
                    <div className="">
                        <form action="#">
                            <div className="registration-form text-slate-900 text-start">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="form-label font-medium text-slate-900 dark:text-white">Search : <span className="text-red-600">*</span></label>
                                        <div className="filter-search-form relative mt-2">
                                            <FiSearch className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 rounded-md!" placeholder="Search your keaywords"/>
                                        </div>
                                    </div>
                                    

                                    <div>
                                        <label htmlFor="buy-properties" className="form-label font-medium text-slate-900 dark:text-white">Select Categories:</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <RxHome className="ri-home-line absolute top-4.25 inset-s-4 text-xl z-1 text-primary"></RxHome>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={Houses} />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label htmlFor="buy-min-price" className="form-label font-medium text-slate-900 dark:text-white">Min Price :</label>
                                        <div className="filter-search-form relative rounded-md! mt-2">
                                            <AiOutlineDollarCircle className="absolute top-4.25 inset-s-4 text-xl z-1 text-primary"/>
                                            <Select className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0" options={minPrice} />
                                        </div>
                                    </div>

                                    <div>
                                        <input type="submit" id="search-buy" name="search" className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! lg:rounded-md!" value="Search"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
  )
}
