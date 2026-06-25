import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../component/navbar'
import GetInTuch from '../../component/get-in-tuch'
import Footer from '../../component/footer'
import Switcher from '../../component/switcher'

import { agencyData } from '../../component/data/data'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'


export default function Agencies() {
  return (
    <>
    <Navbar navClass="navbar-white"/>

    <section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-slate-900/80"></div>
      <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-10">
              <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Agencies</h3>
          </div>
      </div>
    </section>
    <div className="relative">
      <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
      </div>
    </div>

    <section className="relative lg:py-24 py-16">
      <div className="container relative">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5">
            {agencyData.map((item,index)=>{
              return(
                <div className="group text-center" key={index}>
                    <div className="relative inline-block mx-auto size-64 rounded-full overflow-hidden shadow-sm shadow-gray-200 dark:shadow-gray-700">
                        <img src={item.image} className="" alt=""/>
                    </div>

                    <div className="content mt-3">
                        <Link to={`/agency-profile/${item.id}`} className="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">{item.name}</Link>
                        <p className="text-slate-400">{item.title}</p>

                        <ul className="list-none mt-2">
                            <li className="inline ms-1 rtl:me-1 rtl:ms-0"><Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><FiFacebook className="size-4"/></Link></li>
                            <li className="inline ms-1 rtl:me-1 rtl:ms-0"><Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><FiInstagram className="size-4"/></Link></li>
                            <li className="inline ms-1 rtl:me-1 rtl:ms-0"><Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><FiTwitter className="size-4"/></Link></li>
                            <li className="inline ms-1 rtl:me-1 rtl:ms-0"><Link to="" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary"><FiLinkedin className="size-4"/></Link></li>
                        </ul>
                    </div>
                </div>
              )
            })}
          </div>
      </div>

     <GetInTuch/>
    </section>
    <Footer/>
    <Switcher/>
    </>
  )
}
