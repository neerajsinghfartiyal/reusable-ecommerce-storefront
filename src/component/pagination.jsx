import React from 'react';
import { BiBed } from 'react-icons/bi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LiaBathSolid, LiaCompressArrowsAltSolid } from 'react-icons/lia';
import { Link } from "react-router-dom";

export default function Pagination({ items, gridClass }) {

    return (
        <>
            <div className={gridClass}>
                {items.map((item, index) => (
                    <div key={index} className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                        <div className="relative">
                            <img src={item.image} alt="" />

                            <div className="absolute top-4 inset-e-4">
                                <Link to="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="ri-heart-fill text-lg"></i></Link>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="pb-6">
                                <Link to={`/property-detail/${item.id}`} className="text-lg hover:text-primary font-medium ease-in-out duration-500">{item.name}</Link>
                            </div>

                            <ul className="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                <li className="flex items-center me-4">
                                    <LiaCompressArrowsAltSolid className="text-2xl me-2 text-primary"/>
                                    <span>{item.square}sqf</span>
                                </li>

                                <li className="flex items-center me-4">
                                    <BiBed className="text-2xl me-2 text-primary"/>
                                    <span>{item.beds} Beds</span>
                                </li>

                                <li className="flex items-center">
                                    <LiaBathSolid className="text-2xl me-2 text-primary"/>
                                    <span>{item.baths} Baths</span>
                                </li>
                            </ul>

                            <ul className="pt-6 flex justify-between items-center list-none">
                                <li>
                                    <span className="text-slate-400">Price</span>
                                    <p className="text-lg font-medium">${item.price}</p>
                                </li>

                                <li>
                                    <span className="text-slate-400">Rating</span>
                                    <ul className="text-lg font-medium text-amber-400 list-none">
                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                        <li className="inline ms-1 text-slate-900 dark:text-white">{item.rating}(30)</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                <div className="md:col-span-12 text-center">
                    <nav>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <Link to="#" className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                                    <FiChevronLeft className="text-[20px]"/>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">1</Link>
                            </li>
                            <li>
                                <Link to="#" className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">2</Link>
                            </li>
                            <li>
                                <Link to="#" aria-current="page" className="z-10 size-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-primary shadow-xs shadow-gray-200 dark:shadow-gray-700">3</Link>
                            </li>
                            <li>
                                <Link to="#" className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">4</Link>
                            </li>
                            <li>
                                <Link to="#" className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary">
                                    <FiChevronRight className="text-[20px]"/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );

}

