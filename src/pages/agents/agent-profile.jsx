import React from 'react'
import { Link, useParams } from 'react-router-dom'

import client1 from '../../assets/images/client/03.jpg'

import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'
import { agentData, properties } from '../../component/data/data'

import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin, FiPhone, FiTwitter } from 'react-icons/fi'
import { LiaBathSolid, LiaCompressArrowsAltSolid } from 'react-icons/lia'
import { BiBed } from 'react-icons/bi'


export default function AgentProfile() {
    let params = useParams()

    let data = agentData.find((agent) =>agent.id === parseInt(params.id))
  return (
    <>
    <Navbar/>
    <section className="relative md:py-24 pt-24 pb-16">
      <div className="container relative">
          <div className="grid grid-cols-1">
              <div className="p-6 rounded-md bg-primary/10 dark:bg-primary/20">
                  <div className="md:flex items-center">
                      <img src={data?.image ? data?.image : client1} className="rounded-full size-28" alt=""/>

                      <div className="md:ms-4 md:mt-0 mt-4 md:flex justify-between items-end">
                          <div>
                              <h5 className="text-2xl font-medium">{data?.name ? data?.name : 'Amber Durden '}<span className="text-base md:inline block md:mt-0 mt-2"><span className="text-slate-400"><span className="ri-circle-fill text-[12px] md:inline-block hidden"></span> Broker</span> of <Link to="/agency-profile" className="hover:text-primary">Highrises Realty</Link></span></h5>

                              <ul className="list-none mt-2 md:flex items-center md:divide-x divide-slate-400">
                                  <li className="md:inline-flex flex">
                                      <ul className="text-amber-400 list-none">
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0"><i className="ri-star-s-fill align-middle"></i></li>
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0"><i className="ri-star-s-fill align-middle"></i></li>
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0"><i className="ri-star-s-fill align-middle"></i></li>
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0"><i className="ri-star-s-fill align-middle"></i></li>
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0"><i className="ri-star-s-fill align-middle"></i></li>
                                          <li className="inline ms-1 rtl:me-1 rtl:ms-0 text-slate-900 dark:text-white">4.84(30)</li>
                                      </ul>
                                  </li>

                                  <li className="md:inline-flex flex items-center md:mx-2 md:mt-0 mt-2 md:px-2"><FiPhone className="size-4 align-middle text-primary me-2"/> +(458) 456-7854</li>

                                  <li className="md:inline-flex flex items-center md:mx-2 md:mt-0 mt-2 md:px-2">
                                      <ul className="list-none">
                                          <li className="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><Link to="" className="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><FiFacebook className="size-4"/></Link></li>

                                          <li className="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><Link to="" className="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><FiInstagram className="size-4"/></Link></li>
                                          <li className="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><Link to="" className="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><FiTwitter className="size-4"/></Link></li>
                                          <li className="inline me-1 rtl:me-0 ms-0 rtl:ms-1"><Link to="" className="btn btn-icon btn-sm border border-gray-300 dark:border-gray-400 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary dark:hover:border-primary"><FiLinkedin className="size-4"/></Link></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="container relative mt-6">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-7.5">
              <div className="lg:col-span-4 md:col-span-5 order-1 md:order-1">
                  <div className="p-6 rounded-sm shadow-sm shadow-gray-200 dark:shadow-gray-700 sticky top-20">
                      <h5 className="text-xl font-medium mb-4">Contact me</h5>

                      <form>
                          <p className="mb-0" id="error-msg"></p>
                          <div id="simple-msg"></div>
                          <div className="grid grid-cols-1 gap-3">
                              <div>
                                  <label htmlFor="name" className="font-medium">Your Name:</label>
                                  <input name="name" id="name" type="text" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Name :"/>
                              </div>

                              <div>
                                  <label htmlFor="email" className="font-medium">Your Email:</label>
                                  <input name="email" id="email" type="email" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Email :"/>
                              </div>

                              <div>
                                  <label htmlFor="subject" className="font-medium">Your Question:</label>
                                  <input name="subject" id="subject" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Subject :"/>
                              </div>

                              <div>
                                  <label htmlFor="comments" className="font-medium">Your Comment:</label>
                                  <textarea name="comments" id="comments" className="form-input border border-gray-200! dark:border-gray-800! mt-2 textarea" placeholder="Message :"></textarea>
                              </div>

                              <button type="submit" id="submit" name="send" className="btn bg-primary hover:bg-primary-dark text-white rounded-md">Send Message</button>
                          </div>
                      </form>
                  </div>
              </div>

              <div className="lg:col-span-8 md:col-span-7 order-1 md:order-2">
                  <h5 className="text-xl font-medium">About me</h5>
                  
                  <p className="text-slate-400 mt-3">Obviously I'M Property Broker. Property Broker with over 3 years of experience. Experienced with all stages of the agent or broker cycle for dynamic properties. The as opposed to using 'Content here, content here', making it look like readable English.</p>
                  <p className="text-slate-400 mt-3">Data Structures and Algorithms are the heart of programming. Initially most of the developers do not realize its importance but when you will start your career in software development, you will find your code is either taking too much time or taking too much space.</p>
                  
                  <h5 className="text-xl font-medium mt-6">My Listings</h5>

                  <div className="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-7.5">
                    {properties.map((item,index)=>{
                        return(
                            <div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500" key={index}>
                                <div className="relative">
                                    <img src={item.image} alt=""/>
        
                                    <div className="absolute top-4 inset-e-4">
                                        <Link to="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-full! text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="ri-heart-fill text-[20px]"></i></Link>
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
                                                <li className="inline"><i className="ri-star-s-fill"></i></li>
                                                <li className="inline"><i className="ri-star-s-fill"></i></li>
                                                <li className="inline"><i className="ri-star-s-fill"></i></li>
                                                <li className="inline"><i className="ri-star-s-fill"></i></li>
                                                <li className="inline"><i className="ri-star-s-fill"></i></li>
                                                <li className="inline text-slate-900 dark:text-white">5.0(30)</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                  </div>
  
                  <div className="md:flex justify-center text-center mt-6">
                      <div className="md:w-full">
                          <Link to="/grid" className="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View More Properties <FiArrowRight className="ms-1"/></Link>
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
