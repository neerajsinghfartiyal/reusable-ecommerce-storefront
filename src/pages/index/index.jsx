import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bg1 from "../../assets/images/bg/01.jpg";
import bg2 from "../../assets/images/bg/02.jpg";
import bg3 from "../../assets/images/bg/03.jpg";

import Property from "../../component/Properties/property";
import Categories from "../../component/categories";
import Footer from "../../component/footer";
import Switcher from "../../component/switcher";
import Navbar from "../../component/navbar";

import { LuSearch } from "react-icons/lu";
import { FiShoppingBag, FiTruck, FiShield } from "react-icons/fi";
import { getFeaturedProducts } from "../../api/catalogApi.js";
import { getPublicSettings } from "../../api/publicSettingsApi.js";
import { mapProductsToCards } from "../../lib/productMappers.js";

export default function Index() {
    const navigate = useNavigate();
    const images = [bg1, bg2, bg3];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState('');
    const [storeSettings, setStoreSettings] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
          );
        }, 5000);

        return () => clearInterval(interval);
      }, [images.length]);

    useEffect(() => {
        let active = true;

        const loadCatalogData = async () => {
            setProductsLoading(true);
            setProductsError('');

            try {
                const [settingsResult, featuredResult] = await Promise.allSettled([
                    getPublicSettings(),
                    getFeaturedProducts(),
                ]);

                if (!active) return;

                if (settingsResult.status === 'fulfilled') {
                    setStoreSettings(settingsResult.value || null);
                }

                if (featuredResult.status === 'fulfilled') {
                    setFeaturedProducts(mapProductsToCards(featuredResult.value?.products || []));
                } else {
                    setFeaturedProducts([]);
                    setProductsError(
                        featuredResult.reason?.message || 'Could not load featured products.',
                    );
                }
            } catch (err) {
                if (!active) return;
                setFeaturedProducts([]);
                setProductsError(err?.message || 'Could not load featured products.');
            } finally {
                if (active) setProductsLoading(false);
            }
        };

        loadCatalogData();

        return () => {
            active = false;
        };
    }, []);

    const handleProductSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();

        if (query) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            return;
        }

        navigate('/products');
    };

    const storeName = storeSettings?.storeName || 'our store';
    const currencySymbol = storeSettings?.currencySymbol || '$';

    const shopHighlights = [
        {
            icon: FiShoppingBag,
            title: 'Browse products',
            desc: 'Explore the live catalog with categories, search, and product details.',
        },
        {
            icon: FiTruck,
            title: 'Delivery options',
            desc: 'Choose shipping at checkout after you enter your delivery address.',
        },
        {
            icon: FiShield,
            title: 'Secure checkout',
            desc: 'Review your cart, select payment, and place your order in a few steps.',
        },
    ];

    return (
        <>
            <Navbar />
            <section className="relative mt-20">
                <div className="container-fluid md:mx-4 mx-2">
                    <div style={{backgroundImage:`url(${images[currentImageIndex]})`}} className="relative pt-40 pb-52 table w-full! rounded-2xl shadow-md overflow-hidden bg-no-repeat bg-center bg-cover" id="home">
                        <div className="absolute inset-0 bg-slate-900/60"></div>

                        <div className="container relative">
                            <div className="grid grid-cols-1">
                                <div className="md:text-start text-center">
                                <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Shop the latest from <br/> <span className="text-primary">{storeName}</span></h1>
                                <p className="text-white/70 text-xl max-w-xl">Discover products, browse categories, and checkout online with live catalog data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative md:pb-24 pb-16">
                <div className="container">
                    <div className="grid grid-cols-1 justify-center">
                        <div className="relative -mt-32">
                            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700">
                                <form onSubmit={handleProductSearch}>
                                    <div className="registration-form text-dark text-start">
                                        <label className="form-label text-slate-900 dark:text-white font-medium" htmlFor="product-search">
                                            Search products
                                        </label>
                                        <div className="grid lg:grid-cols-[1fr_auto] grid-cols-1 gap-4 mt-2">
                                            <div className="filter-search-form relative">
                                                <LuSearch className="icons"/>
                                                <input
                                                    id="product-search"
                                                    name="search"
                                                    type="search"
                                                    value={searchQuery}
                                                    onChange={(event) => setSearchQuery(event.target.value)}
                                                    className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0"
                                                    placeholder="Search by product name, SKU, or keyword"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded"
                                            >
                                                Search products
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-3">
                                            Or <Link to="/products" className="text-primary hover:underline">browse all products</Link>
                                            {' · '}
                                            <Link to="/cart" className="text-primary hover:underline">view cart</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-7.5">
                        <div className="md:col-span-5">
                            <div className="rounded-xl bg-primary/5 dark:bg-primary/10 p-8">
                                <h4 className="mb-4 md:text-3xl text-2xl font-semibold">Your online store</h4>
                                <p className="text-slate-400 max-w-xl">
                                    Shop featured products, filter by category, and complete checkout with
                                    shipping and payment options configured for {storeName}.
                                </p>
                                <Link to="/products" className="btn bg-primary hover:bg-primary-dark text-white rounded-md mt-6">
                                    Shop now
                                </Link>
                            </div>
                        </div>
                        <div className="md:col-span-7">
                            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                                {shopHighlights.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="text-center sm:text-start">
                                            <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-4">
                                                <Icon className="size-5" />
                                            </div>
                                            <h5 className="text-lg font-medium">{item.title}</h5>
                                            <p className="text-slate-400 mt-2 text-sm">{item.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Shop by Category</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">Browse products by category from the live store catalog.</p>
                    </div>
                    <Categories />
                </div>
                <Property
                    products={featuredProducts}
                    loading={productsLoading}
                    error={productsError}
                    currencySymbol={currencySymbol}
                    title="Featured Products"
                    description="Latest published products from the store catalog."
                />

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 text-center">
                        <h3 className="mb-6 md:text-3xl text-2xl font-medium text-slate-900 dark:text-white">Ready to checkout?</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Add items to your cart, review totals, and complete your order with delivery and payment on checkout.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Link to="/products" className="btn bg-primary hover:bg-primary-dark text-white rounded-md!">
                                Browse products
                            </Link>
                            <Link to="/cart" className="btn bg-transparent hover:bg-primary border border-primary text-primary hover:text-white rounded-md!">
                                Go to cart
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
