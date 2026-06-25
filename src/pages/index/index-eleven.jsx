import React from 'react'
import Navbar from '../../component/navbar'
import bg from '../../assets/images/bg/bg4.png'
import c1 from '../../assets/images/client/01.jpg'
import c2 from '../../assets/images/client/02.jpg'
import c3 from '../../assets/images/client/03.jpg'
import c4 from '../../assets/images/client/04.jpg'
import c5 from '../../assets/images/client/05.jpg'
import { Link } from 'react-router-dom'
import FeatureProperty from '../../component/feature-property'
import Categories from '../../component/categories'
import About from '../../component/about'
import ClientTwo from '../../component/client-two'
import BlogOne from '../../component/blog-one'
import GetInTuch from '../../component/get-in-tuch'
import TeamOne from '../../component/team-one'
import Footer from '../../component/footer'
import AboutThree from '../../component/about-three'
import Switcher from '../../component/switcher'

export default function IndexEleven() {
  return (
    <>
        <Navbar/>

         <section className="relative h-screen pt-30 bg-no-repeat md:bg-top bg-cover" style={{backgroundImage:`url(${bg})`}}>
            <div className="container relative">
                <div className="grid grid-cols-1 items-center mt-10">
                    <div className="text-center">
                        <h1 className="font-bold lg:leading-normal leading-normal text-5xl lg:text-7xl mb-6">Buy, Sell & Rent.</h1>

                        <p className="text-xl max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                        <div className="mt-6">
                            <ul className="list-none relative">
                                <li className="inline-block relative"><Link to=""><img src={c1} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to=""><img src={c2} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to=""><img src={c3} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to=""><img src={c4} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                                <li className="inline-block relative -ms-4"><Link to=""><img src={c5} className="size-12 rounded-full shadow-md shadow-slate-100 dark:shadow-slate-800 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            </ul>
                        </div>

                        <div className="subcribe-form z-1 max-w-xl mx-auto mt-8">
                            <form className="relative">
                                <i class="ri-search-line text-xl absolute top-3.5 inset-s-4"></i>
                                <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :"/>
                                <button type="submit" className="btn bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white rounded-full!">Find Out</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>   

        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <FeatureProperty/>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Why Choose Us?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <AboutThree/>
            </div>
            
            <div className="container relative mt-16">
                <Categories/>
            </div>

            <About/>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <TeamOne/>
            </div>
                
            <ClientTwo/>

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
