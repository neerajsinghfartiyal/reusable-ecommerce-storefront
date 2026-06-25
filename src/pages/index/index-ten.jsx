import React from 'react'
import Navbar from '../../component/navbar'

import { Link } from 'react-router-dom'

import map from '../../assets/images/map.svg'
import property1 from '../../assets/images/property/1.jpg'
import property2 from '../../assets/images/property/2.jpg'
import property3 from '../../assets/images/property/3.jpg'

import client1 from '../../assets/images/client/01.jpg'
import client2 from '../../assets/images/client/02.jpg'
import client3 from '../../assets/images/client/03.jpg'
import client4 from '../../assets/images/client/04.jpg'
import client5 from '../../assets/images/client/05.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import Partner from '../../component/partner'
import About from '../../component/about'
import Categories from '../../component/categories'
import Property from '../../component/Properties/property'
import ClientTwo from '../../component/client-two'
import GetInTuch from '../../component/get-in-tuch'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import TeamOne from '../../component/team-one'
import BlogOne from '../../component/blog-one'

import { aboutData,  } from '../../component/data/data'
import { FiArrowRight,  FiHexagon } from 'react-icons/fi'

let images = [property1,property2,property3]

export default function IndexTen() {

  return (
    <>
     <Navbar/> 

    <section className="relative py-24">
        <div className="absolute inset-0 opacity-40 dark:opacity-[0.03] bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:`url(${map})`}}></div>
        <div className="container relative mt-10">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5">
                <div className="md:col-span-4">
                    <div className="md:text-start text-center">
                        <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl">Let's Find a Home That's Perfect For You!</h1>

                        <div className="mt-4">
                            <Link to="#" className="btn bg-primary hover:bg-primary-dark text-white rounded-md md:mt-20">Learn More <i className="ri-arrow-right-s-line ms-1 align-middle"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-5">
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
                                    {images.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={index}>
                                                <img src={item} className="object-cover w-full lg:h-150 md:h-96 h-125" alt=""/>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="md:text-end text-center">
                        <p className="text-slate-400 text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                        <div className="mt-4">
                            <ul className="list-none relative md:mt-20">
                                <li className="inline-block relative"><Link to="#"><img src={client1} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to="#"><img src={client2} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to="#"><img src={client3} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to="#"><img src={client4} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to="#"><img src={client5} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Partner/>
    </section>

        <section className="relative md:pb-24 pb-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What We Do?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-7.5">
                    
                    {aboutData.map((item,index)=>{
                    return(
                        <div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center" key={index}>
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto"/>
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <img src={item.image} className="size-12" alt=""/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to="" className="text-xl font-medium hover:text-primary">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.desc}</p>

                                <div className="mt-4">
                                    <Link to="" className="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">Read More <FiArrowRight className="ms-1"/></Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
            </div>

            <About/>

            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                    <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <Categories/>
            </div>

            <Property/>

            <ClientTwo/>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <TeamOne/>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <BlogOne/>
            </div>

            <GetInTuch/>
        </section>

        <Footer/>
        <Switcher/>

        
    </>
  )
}
