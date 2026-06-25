import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { review } from "./data/data";

export default function ClientTwo() {


    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What Our Client Say ?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="flex justify-center relative mt-8">
                    <div className="relative w-full">
                        <div className="tiny-three-item">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={12}
                                slidesPerView={1}
                                speed={400}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    el: '.custom-pagination',
                                    clickable: true
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    767: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 }
                                }}
                                grabCursor={true}
                            >
                                {review.map((el, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="text-center mx-3">
                                            <p className="text-lg text-slate-400 italic"> " {el.description} " </p>

                                            <div className="text-center mt-5">
                                                <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                    <li className="inline ms-1"><i className="ri-star-s-fill"></i></li>
                                                </ul>

                                                <img src={el.profile} className="size-14 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 mx-auto" alt="" />
                                                <h6 className="mt-2 fw-semibold">{el.name}</h6>
                                                <span className="text-slate-400 text-sm">{el.designation}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            
                            {/* CUSTOM DOTS */}
                            <div className="custom-pagination flex justify-center mt-6"></div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}


