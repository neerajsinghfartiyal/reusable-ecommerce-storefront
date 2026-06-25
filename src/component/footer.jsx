import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoLight from "../assets/images/logo-light.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { getPublicSettings } from "../api/publicSettingsApi.js";

export default function Footer() {
    const [storeSettings, setStoreSettings] = useState(null);

    useEffect(() => {
        let active = true;

        const loadSettings = async () => {
            try {
                const settings = await getPublicSettings();
                if (active) setStoreSettings(settings || null);
            } catch {
                // Keep defaults.
            }
        };

        loadSettings();

        return () => {
            active = false;
        };
    }, []);

    const storeName = storeSettings?.storeName || 'Reusable Ecommerce Storefront';
    const contactEmail = storeSettings?.contactEmail || storeSettings?.email || 'contact@example.com';
    const contactPhone = storeSettings?.contactPhone || storeSettings?.phone || '';
    const contactAddress = storeSettings?.address || storeSettings?.storeAddress || '';

    return (
        <>
            <footer className="relative bg-slate-900 dark:bg-slate-800 mt-24">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="relative py-16">
                            <div className="relative w-full">
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                                    <div className="lg:col-span-4 md:col-span-12">
                                        <Link to="/" className="text-[22px] focus:outline-none">
                                            <img src={LogoLight} alt={storeName} />
                                        </Link>
                                        <p className="mt-6 text-gray-300">
                                            Shop products, manage your cart, and checkout online with {storeName}.
                                        </p>
                                    </div>

                                    <div className="lg:col-span-4 md:col-span-6">
                                        <h5 className="tracking-[1px] text-gray-100 font-semibold">Shop</h5>
                                        <ul className="list-none footer-list mt-6">
                                            <li><Link to="/" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Home</Link></li>
                                            <li className="mt-2.5"><Link to="/products" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Products</Link></li>
                                            <li className="mt-2.5"><Link to="/cart" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Cart</Link></li>
                                            <li className="mt-2.5"><Link to="/contact" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Contact</Link></li>
                                        </ul>
                                    </div>

                                    <div className="lg:col-span-4 md:col-span-6">
                                        <h5 className="tracking-[1px] text-gray-100 font-semibold">Legal</h5>
                                        <ul className="list-none footer-list mt-6">
                                            <li><Link to="/terms" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Terms of Service</Link></li>
                                            <li className="mt-2.5"><Link to="/privacy" className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"><MdKeyboardArrowRight className="me-1 text-xl"/> Privacy Policy</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                {(contactAddress || contactEmail || contactPhone) ? (
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-10 pt-10 border-t border-gray-800 dark:border-gray-700">
                                        {contactAddress ? (
                                            <div className="flex">
                                                <FiMapPin className="size-5 text-primary me-3 shrink-0"/>
                                                <p className="text-gray-300 text-sm">{contactAddress}</p>
                                            </div>
                                        ) : null}
                                        {contactEmail ? (
                                            <div className="flex">
                                                <FiMail className="size-5 text-primary me-3 shrink-0"/>
                                                <Link to={`mailto:${contactEmail}`} className="text-slate-300 hover:text-slate-400 text-sm">{contactEmail}</Link>
                                            </div>
                                        ) : null}
                                        {contactPhone ? (
                                            <div className="flex">
                                                <FiPhone className="size-5 text-primary me-3 shrink-0"/>
                                                <Link to={`tel:${contactPhone}`} className="text-slate-300 hover:text-slate-400 text-sm">{contactPhone}</Link>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-7.5 px-0 border-t border-gray-800 dark:border-gray-700">
                    <div className="container text-center">
                        <p className="mb-0 text-gray-300">
                            © {new Date().getFullYear()} {storeName}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );

}
