import React from 'react'
import { teamdata } from './data/data'
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function TeamOne() {
  return (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-7.5">
            {teamdata.map((item, index) =>{
                return(
                    <div className="lg:col-span-3 md:col-span-6" key={index}>
                        <div className="group text-center">
                            <div className="relative inline-block mx-auto size-52 rounded-full overflow-hidden">
                                <img src={item.image} className="" alt="" />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900 size-52 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                                <ul className="list-none absolute inset-s-0 inset-e-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                                    <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><FiFacebook className="size-4" /></Link></li>
                                    <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><FiInstagram className="size-4" /></Link></li>
                                    <li className="inline ms-1"><Link to="#" className="btn btn-icon btn-sm rounded-full! border border-primary bg-primary hover:border-primary hover:bg-primary text-white"><FiLinkedin  className="size-4" /></Link></li>
                                </ul>
                            </div>

                            <div className="content mt-3">
                                <Link to="#" className="text-xl font-medium hover:text-primary transition-all duration-500 ease-in-out">{item.name}</Link>
                                <p className="text-slate-400">{item.title}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
  )
}
