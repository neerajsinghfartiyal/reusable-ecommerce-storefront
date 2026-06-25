import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../../component/navbar'
import Footer from '../../../component/footer'
import Switcher from '../../../component/switcher'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import single1 from '../../../assets/images/property/single/1.jpg'
import single2 from '../../../assets/images/property/single/2.jpg'
import single3 from '../../../assets/images/property/single/3.jpg'
import single4 from '../../../assets/images/property/single/4.jpg'
import single5 from '../../../assets/images/property/single/5.jpg'

import { LiaCompressArrowsAltSolid } from 'react-icons/lia';
import { LuBath, LuBedDouble } from 'react-icons/lu';
import { FiMapPin, FiPhone } from 'react-icons/fi';

export default function PropertyDetailTwo() {

  let images = [single1, single2, single3, single4, single5]
  return (
    <>
      <Navbar/>

          <section className="relative md:py-24 pt-24 pb-16">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                    <div className="lg:col-span-8 md:col-span-7">
                        <div className="grid grid-cols-1 relative">
                            <div className="tiny-one-item">
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    spaceBetween={12}
                                    slidesPerView={1}
                                    speed={400}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false
                                    }}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                >
                                    {images.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <img src={item} className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>

                                <button className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                                    <i className="ri-arrow-left-s-line text-2xl"></i>
                                </button>

                                <button className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 size-8 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-primary hover:text-white transition cursor-pointer">
                                    <i className="ri-arrow-right-s-line text-2xl"></i>
                                </button>

                            </div>
                        </div>
                        
                        <h4 className="text-2xl font-medium mt-6 mb-3">4BHK Luxury Family Home</h4>
                        <span className="text-slate-400 flex items-center"><FiMapPin className="size-5 me-2"/> 10765 Hillshire Ave, Baton Rouge, LA 70810, USA</span>

                        <ul className="py-6 flex items-center list-none">
                            <li className="flex items-center lg:me-6 me-4">
                                <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-primary"/>
                                <span className="lg:text-xl">8000sqf</span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <LuBedDouble className="lg:text-3xl text-2xl me-2 text-primary"/>
                                <span className="lg:text-xl">4 Beds</span>
                            </li>

                            <li className="flex items-center">
                                <LuBath className="lg:text-3xl text-2xl me-2 text-primary"/>
                                <span className="lg:text-xl">4 Baths</span>
                            </li>
                        </ul>

                        <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                        <p className="text-slate-400 mt-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                        <p className="text-slate-400 mt-4">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                    
                        <div className="w-full leading-0 border-0 mt-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{border:'0'}} title='myfram' className="w-full h-125" allowFullScreen></iframe>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">Price:</h5>
    
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-medium">$ 45,231</span>
    
                                        <span className="bg-primary/10 text-primary text-sm px-2.5 py-0.75 rounded-sm h-6">For Sale</span>
                                    </div>
    
                                    <ul className="list-none mt-4">
                                        <li className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Days on Hously</span>
                                            <span className="font-medium text-sm">124 Days</span>
                                        </li>
    
                                        <li className="flex justify-between items-center mt-2">
                                            <span className="text-slate-400 text-sm">Price per sq ft</span>
                                            <span className="font-medium text-sm">$ 186</span>
                                        </li>
    
                                        <li className="flex justify-between items-center mt-2">
                                            <span className="text-slate-400 text-sm">Monthly Payment (estimate)</span>
                                            <span className="font-medium text-sm">$ 1497/Monthly</span>
                                        </li>
                                    </ul>
                                </div>
    
                                <div className="flex">
                                    <div className="p-1 w-1/2">
                                        <Link to="" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Book Now</Link>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <Link to="" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Offer Now</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <h3 className="mb-6 text-xl leading-normal font-medium text-slate-900 dark:text-white">Have Question ? Get in touch!</h3>

                                <div className="mt-6">
                                    <Link to="/contact" className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md"><FiPhone className="align-middle me-2"/> Contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <Switcher/>
    </>
  )
}
