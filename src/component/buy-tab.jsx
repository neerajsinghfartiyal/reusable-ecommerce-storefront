import React, { useState } from "react";

import Agent from "../assets/images/svg/Agent_Monochromatic.svg";
import Presentation from "../assets/images/svg/presentation_Flatline.svg";
import Session from "../assets/images/svg/session_Flatline.svg";
import Startup from "../assets/images/svg/Startup_Flatline.svg";
import Team from "../assets/images/svg/team_Flatline.svg";
import Meeting from "../assets/images/svg/Team_meeting_Two.svg";

export default function BuyTab() {
    const [activeTabIndex, setactiveTabIndex] = useState(0);

    const handleTabClick = (tabIndex) => {
        setactiveTabIndex(tabIndex)
    };


    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-7.5">
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <ul className="flex-column text-center p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(0)}
                                        id="letter-tab" data-tabs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="true">Pre Approval Letter</button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(1)}
                                        id="schedule-tab" data-tabs-target="#schedule" type="button" role="tab" aria-controls="schedule" aria-selected="false">Schedule a Showing</button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(2)} id="offer-tab" data-tabs-target="#offer" type="button" role="tab" aria-controls="offer" aria-selected="false">Submit an Offer</button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 3 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(3)} id="inspection-tab" data-tabs-target="#inspection" type="button" role="tab" aria-controls="inspection" aria-selected="false">Property Inspection</button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 4 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(4)} id="appraisal-tab" data-tabs-target="#appraisal" type="button" role="tab" aria-controls="appraisal" aria-selected="false">Appraisal</button>
                                </li>
                                <li role="presentation">
                                    <button className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 5 ? 'text-white bg-primary' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-primary'}`}
                                        onClick={() => handleTabClick(5)} id="closing-tab" data-tabs-target="#closing" type="button" role="tab" aria-controls="closing" aria-selected="false">Closing Deal</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8 md:col-span-7">
                        <div id="myTabContent">
                            {activeTabIndex === 0 && (
                                <div className="" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                    <img src={Agent} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Pre Approval Letter</h5>
                                        <p className="text-slate-400 mt-3">Most buyers think the first step is finding their dream house, but the truth is finding the funding is the first step. Hously streamlines the Loan Pre-Approval process with our ecosystem of Premier Partners or simply upload your own Pre-Approval letter.</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 1 && (
                                <div id="schedule" role="tabpanel" aria-labelledby="schedule-tab">
                                    <img src={Presentation} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Schedule a Showing</h5>
                                        <p className="text-slate-400 mt-3">Hously allows a buyer to schedule an instant showing and gain a private viewing without the need for multiple parties to be involved. You pick the time that works for you!</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 2 && (
                                <div id="offer" role="tabpanel" aria-labelledby="offer-tab">
                                    <img src={Session} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Submit an Offer</h5>
                                        <p className="text-slate-400 mt-3">Hously walks a buyer through the purchase agreement process making the paperwork appear effortless. With our custom workflows and progress analytics, you will always know where your purchase stands. No more phone tag and unreturned emails!</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 3 && (
                                <div id="inspection" role="tabpanel" aria-labelledby="inspection-tab">
                                    <img src={Startup} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Property Inspection</h5>
                                        <p className="text-slate-400 mt-3">No one wants to buy a lemon. Book an inspection with a licensed inspector, then submit the repair requests all via the Hously platform.</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 4 && (
                                <div id="appraisal" role="tabpanel" aria-labelledby="appraisal-tab">
                                    <img src={Team} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Appraisal</h5>
                                        <p className="text-slate-400 mt-3">Hously monitors the appraisal process ensuring the home you are purchasing meets or exceeds the price you are paying.</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 5 && (
                                <div id="closing" role="tabpanel" aria-labelledby="closing-tab">
                                    <img src={Meeting} alt="" />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">Closing Deal</h5>
                                        <p className="text-slate-400 mt-3">Finally the closing packet is sent to the Title office, and the day has come… You have Hously the home of your dreams!</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
