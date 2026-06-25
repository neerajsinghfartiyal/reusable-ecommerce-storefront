import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../component/navbar'

import BackgroundImage from "../../assets/images/bg/bg2.png";

import Categories from '../../component/categories';
import Property from '../../component/Properties/property';
import Cta from '../../component/cta';
import Partner from '../../component/partner';
import Client from '../../component/client';
import GetInTuch from '../../component/get-in-tuch';
import Footer from '../../component/footer';
import Switcher from '../../component/switcher';

import { aboutData } from '../../component/data/data';
import { FiArrowRight, FiHexagon, FiSearch } from 'react-icons/fi';
import TeamOne from '../../component/team-one';

export default function IndexEight() {
  return (
    <>
      <Navbar/>
      <section className="relative overflow-hidden md:h-screen pt-36 md:pb-48 pb-64 bg-primary/10 dark:bg-primary/20 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="container relative">
            <div className="grid grid-cols-1 items-center mt-10">
                <div className="text-center">
                    <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Explore Listings and <br/> Make Move Today</h1>
                    <p className="text-slate-400 text-xl max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                    <div className="subcribe-form z-1 max-w-2xl mx-auto mt-8">
                        <form className="relative">
                            <FiSearch className="size-5 absolute top-[47%] -translate-y-1/2 inset-s-4"></FiSearch>
                            <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ps-12!" placeholder="City, Address, Zip :"/>
                            <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white rounded-full!">Find Out</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
            <Categories/>
        </div>

        <div className="container relative lg:mt-24 mt-16">
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

        <Property/>
      </section>

      <Cta/>
      <Partner/>

      <section className="relative md:py-24 py-16">
        <Client mt={false}/>

        <div className="container relative lg:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
            </div>

            <TeamOne/>
        </div>

        <GetInTuch/>
      </section>
      <Footer/>
      <Switcher/>
    </>

    
  )
}
