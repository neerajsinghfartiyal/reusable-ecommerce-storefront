import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";

import ContactImage from "../../assets/images/svg/contact.svg";
import { FiHexagon, FiMapPin } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";

export default function Contact() {
    return (
        <>
            <Navbar />
            {/* <!-- Google Map --> */}
            <div className="container-fluid relative mt-20">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-0 border-0">
                        <iframe title="contact-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{ border: '0' }} className="w-full h-125" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            {/* <!-- Google Map --> */}

            {/* <!-- Start Section--> */}
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5">
                        <div className="lg:col-span-7 md:col-span-6">
                            <img src={ContactImage} alt="" />
                        </div>

                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="lg:me-5">
                                <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6">
                                    <h3 className="mb-6 text-2xl leading-normal font-medium">Get in touch !</h3>

                                    <form method="post" name="myForm" id="myForm" >
                                        <p className="mb-0" id="error-msg"></p>
                                        <div id="simple-msg"></div>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="name" className="font-medium">Your Name:</label>
                                                <input name="name" id="name" type="text" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Name :" />
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="email" className="font-medium">Your Email:</label>
                                                <input name="email" id="email" type="email" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Email :" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <label htmlFor="subject" className="font-medium">Your Question:</label>
                                                <input name="subject" id="subject" className="form-input border border-gray-200! dark:border-gray-800! mt-2" placeholder="Subject :" />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="comments" className="font-medium">Your Comment:</label>
                                                <textarea name="comments" id="comments" className="form-input border border-gray-200! dark:border-gray-800! mt-2 textarea" placeholder="Message :"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" id="submit" name="send" className="btn bg-primary hover:bg-primary-dark text-white rounded-md">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-7.5">
                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <BsTelephone className="text-3xl"/>
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Phone</h5>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="tel:+152534-468-854" className="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">+152 534-468-854</Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <MdMailOutline className="text-3xl"/>
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Email</h5>
                                <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                <div className="mt-5">
                                    <Link to="mailto:contact@example.com" className="btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">contact@example.com</Link>
                                </div>
                            </div>
                        </div>

                        <div className="text-center px-6">
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-primary/5 mx-auto" />
                                <div className="absolute top-2/4 -translate-y-2/4 inset-s-0 inset-e-0 mx-auto text-primary rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <FiMapPin className="text-3xl"/>
                                </div>
                            </div>

                            <div className="content mt-7">
                                <h5 className="title h5 text-xl font-medium">Location</h5>
                                <p className="text-slate-400 mt-3">C/54 Northwest Freeway, Suite 558, <br /> Houston, USA 485</p>

                                <div className="mt-5">
                                    <Link to="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                                        data-type="iframe" className="video-play-icon read-more lightbox btn btn-link text-primary hover:text-primary after:bg-primary transition duration-500">View on Google map</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Section--> */}

            <Footer />
            <Switcher />
        </>
    );

}

