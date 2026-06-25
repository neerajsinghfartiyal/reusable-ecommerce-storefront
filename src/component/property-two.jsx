import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import { LiaBathSolid, LiaCompressArrowsAltSolid } from "react-icons/lia";
import { BiBed } from "react-icons/bi";
import { properties } from "./data/data";

export default function PropertyTwo() {
    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid grid-cols-1 mt-8 relative">
                    <div className="tiny-home-slide-three">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={12}
                            slidesPerView={1}
                            speed={400}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                767: { slidesPerView: 2 },
                                992: { slidesPerView: 3 }
                            }}
                            grabCursor={true}
                        >
                            {properties.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md dark:hover:shadow-md shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 m-3">
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
                                                    <span>8000sqf</span>
                                                </li>

                                                <li className="flex items-center me-4">
                                                    <BiBed className="text-2xl me-2 text-primary"/>
                                                    <span>4 Beds</span>
                                                </li>

                                                <li className="flex items-center">
                                                    <LiaBathSolid className="text-2xl me-2 text-primary"/>
                                                    <span>4 Baths</span>
                                                </li>
                                            </ul>

                                            <ul className="pt-6 flex justify-between items-center list-none">
                                                <li>
                                                    <span className="text-slate-400">Price</span>
                                                    <p className="text-lg font-medium">$5000</p>
                                                </li>

                                                <li>
                                                    <span className="text-slate-400">Rating</span>
                                                    <ul className="text-lg font-medium text-amber-400 list-none">
                                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                        <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                        <li className="inline ms-1 text-slate-900 dark:text-white">5.0(30)</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* end property content */}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>


        </>
    );
}
