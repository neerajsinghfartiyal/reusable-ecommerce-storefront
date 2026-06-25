import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { properties } from "../../../component/data/data";
import Navbar from "../../../component/navbar";
import Switcher from "../../../component/switcher";
import Footer from "../../../component/footer";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Image1 from "../../../assets/images/property/single/1.jpg";
import Image2 from "../../../assets/images/property/single/2.jpg";
import Image3 from "../../../assets/images/property/single/3.jpg";
import Image4 from "../../../assets/images/property/single/4.jpg";
import Image5 from "../../../assets/images/property/single/5.jpg";

import { AiOutlineCamera } from "react-icons/ai";
import { LiaBathSolid, LiaCompressArrowsAltSolid } from "react-icons/lia";
import { BiBed } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";

const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5
];

export default function PropertyDetail() {
    const { id } = useParams();
    const [photoIndex, setActiveIndex] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const slides = images.map((image) => ({ src: image }));

    const property = properties.find((user) => user.id === parseInt(id));

    const handleCLick = (index) => {
        setActiveIndex(index)
        setOpen(true);
    }

    return (
        <>
            <Navbar />
            {/* <!-- Hero Start --> */}
            <section className="relative md:pb-24 pb-16 mt-20">
                <div className="container-fluid">
                    <div className="md:flex mt-4">
                        <div className="lg:w-1/2 md:w-1/2 p-1">
                            <div className="group relative overflow-hidden">
                                <img src={Image1} alt="" />
                                <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                                    <Link to="#" onClick={() => handleCLick(0)} className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full! lightbox"><AiOutlineCamera className="text-lg"/></Link>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 md:w-1/2">
                            <div className="flex">
                                <div className="w-1/2 p-1">
                                    <div className="group relative overflow-hidden">
                                        <img src={Image2} alt="" />
                                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                        <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                                            <Link to="#" onClick={() => handleCLick(1)} className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full! lightbox"><AiOutlineCamera className="text-lg"/></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2 p-1">
                                    <div className="group relative overflow-hidden">
                                        <img src={Image3} alt="" />
                                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                        <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                                            <Link to="#" onClick={() => handleCLick(2)} className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full! lightbox"><AiOutlineCamera className="text-lg"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 p-1">
                                    <div className="group relative overflow-hidden">
                                        <img src={Image4} alt="" />
                                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                        <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                                            <Link to="#" onClick={() => handleCLick(3)} className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full! lightbox"><AiOutlineCamera className="text-lg"/></Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2 p-1">
                                    <div className="group relative overflow-hidden">
                                        <img src={Image5} alt="" />
                                        <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                        <div className="absolute top-1/2 -translate-y-1/2 inset-s-0 inset-e-0 text-center invisible group-hover:visible">
                                            <Link to="#" onClick={() => handleCLick(4)} className="btn btn-icon bg-primary hover:bg-primary-dark text-white rounded-full! lightbox"><AiOutlineCamera className="text-lg"/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container md:mt-24 mt-16">
                    <div className="md:flex">
                        <div className="lg:w-2/3 md:w-1/2 md:p-4 px-3">
                            <h4 className="text-2xl font-medium">{property?.name}</h4>

                            <ul className="py-6 flex items-center list-none">
                                <li className="flex items-center lg:me-6 me-4">
                                    <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-primary"/>
                                    <span className="lg:text-xl">{property?.square}sqf</span>
                                </li>

                                <li className="flex items-center lg:me-6 me-4">
                                    <BiBed className="lg:text-3xl text-2xl me-2 text-primary"/>
                                    <span className="lg:text-xl">{property?.beds} Beds</span>
                                </li>

                                <li className="flex items-center">
                                    <LiaBathSolid className="lg:text-3xl text-2xl me-2 text-primary"/>
                                    <span className="lg:text-xl">{property?.baths} Baths</span>
                                </li>
                            </ul>

                            <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                            <p className="text-slate-400 mt-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                            <p className="text-slate-400 mt-4">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>

                            <div className="w-full leading-0 border-0 mt-6">
                                <iframe title="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{ border: "0" }} className="w-full h-125" allowFullScreen></iframe>
                            </div>
                        </div>

                        <div className="lg:w-1/3 md:w-1/2 md:p-4 px-3 mt-8 md:mt-0">
                            <div className="sticky top-20">
                                <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                    <div className="p-6">
                                        <h5 className="text-2xl font-medium">Price:</h5>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xl font-medium">$ {property?.price}</span>

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
                                            <Link to="#" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Book Now</Link>
                                        </div>
                                        <div className="p-1 w-1/2">
                                            <Link to="#" className="btn bg-primary hover:bg-primary-dark text-white rounded-md w-full">Offer Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <h3 className="mb-6 text-xl leading-normal font-medium text-slate-900 dark:text-white">Have Question ? Get in touch!</h3>

                                    <div className="mt-6">
                                        <Link to="/contact" className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md"><BsTelephone className="align-middle me-2"/> Contact us</Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Lightbox open={isOpen} close={() => isOpen(false)} slides={slides} index={photoIndex}/>

            <Footer />
            <Switcher />
        </>
    );
}
