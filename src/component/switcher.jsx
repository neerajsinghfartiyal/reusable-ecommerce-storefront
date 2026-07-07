import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { Link } from "react-router-dom";
import * as Scroll from 'react-scroll';

var scroll = Scroll.animateScroll;

export default function Switcher() {

    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    const changeMode = (mode, event) => {
        switch (mode) {
            case 'mode':
                if (document.documentElement.className.includes("dark")) {
                    document.documentElement.className = 'light'
                } else {
                    document.documentElement.className = 'dark'
                }
                break;
            case 'layout':
                if (event.target?.innerText === "LTR") {
                    document.documentElement.dir = "ltr"
                }
                else {
                    document.documentElement.dir = "rtl"
                }
                break;

            default:
                break;
        }
    }


    return (
        <>
            {/* Theme / dark mode toggle — lower-left, clear of product content */}
            <div className="velmora-switcher-theme fixed left-4 bottom-24 z-30 max-sm:bottom-20">
                <input
                    type="checkbox"
                    className="checkbox opacity-0 absolute"
                    id="chk"
                    onClick={(event) => changeMode('mode', event)}
                />
                <label
                    className="label relative bg-slate-900 dark:bg-white shadow-md shadow-gray-200 dark:shadow-gray-700 cursor-pointer rounded-full flex justify-between items-center p-2 w-14 h-8"
                    htmlFor="chk"
                >
                    <BsMoon className="text-yellow-500"/>
                    <BsSun className="text-yellow-500"/>
                    <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-0.5 left-0.5 size-7"></span>
                </label>
            </div>

            {/* RTL toggle — stacked above theme toggle on desktop; hidden on small screens */}
            <div className="velmora-switcher-rtl fixed left-2 bottom-44 z-30 max-sm:hidden">
                <Link to="#" id="switchRtl">
                    <span className="py-1 px-3 relative inline-block rounded-md bg-white dark:bg-slate-900 shadow-md dark:shadow-sm dark:shadow-gray-800 font-semibold rtl:block ltr:hidden text-sm" onClick={(event) => changeMode('layout', event)}>LTR</span>
                    <span className="py-1 px-3 relative inline-block rounded-md bg-white dark:bg-slate-900 shadow-md dark:shadow-sm dark:shadow-gray-800 font-semibold ltr:block rtl:hidden text-sm" onClick={(event) => changeMode('layout', event)}>RTL</span>
                </Link>
            </div>

            <Link to="#"
                onClick={scrollToTop}
                id="back-to-top" className="hidden back-to-top fixed text-lg rounded-full z-10 bottom-5 inset-e-5 size-9 text-center bg-primary text-white justify-center items-center"><GoArrowUp/></Link>
        </>
    );

}
