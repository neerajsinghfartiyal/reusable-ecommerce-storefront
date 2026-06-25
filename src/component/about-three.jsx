import React from 'react'
import { FiHexagon } from 'react-icons/fi'
import bg1 from '../assets/images/property/1.jpg'
import bg2 from '../assets/images/property/2.jpg'
import bg3 from '../assets/images/property/3.jpg'

let images = [bg1, bg2, bg3]

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import { Link } from 'react-router-dom'

let data = [
    {
        icon:'ri-heart-2-fill',
        title:'Comfortable',
        desc:`If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon:'ri-shield-flash-fill',
        title:'Extra Security',
        desc:`If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon:'ri-star-s-fill',
        title:'Luxury',
        desc:`If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
    {
        icon:'ri-money-dollar-circle-line',
        title:'Best Price',
        desc:`If the distribution of letters and 'words' is random, the reader will not be distracted from making.`
    },
]

export default function AboutThree() {
  return (
        <div className="grid lg:grid-cols-12 grid-cols-1 items-center mt-8 gap-7.5">
            <div className="lg:col-span-4">
                <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-7.5">
                    {data.slice(0,2).map((item,index)=>( 
                        <div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center" key={index}>
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto"/>
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <i className={item.icon}></i>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to="#" className="text-xl hover:text-primary font-medium">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="rounded-full shadow-lg dark:shadow-gray-800 relative overflow-hidden border-8 border-white dark:border-slate-900">
                    <div className="grid grid-cols-1 relative">
                        <div className="tiny-single">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={12}
                                slidesPerView={1}
                                speed={400}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                grabCursor={true}
                            >
                                {images.map((item,index)=>( 
                                    <SwiperSlide key={index}>
                                        <img src={item} className="object-cover w-full lg:h-150 md:h-96 h-125" alt=""/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-7.5">
                    {data.slice(2,4).map((item,index)=>( 
                        <div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center" key={index}>
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto"/>
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <i className={item.icon}></i>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to="#" className="text-xl hover:text-primary font-medium">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}
