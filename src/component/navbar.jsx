import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'

import LogoLight from '../assets/images/logo-light.png'
import LogoDark from '../assets/images/logo-dark.png'
import { useCart } from '../context/useCart.js'

const isHomePath = (pathname) =>
  pathname === '/' || pathname === '/index'

export default function Navbar(props) {
  const { navClass, topnavClass, tagLine } = props
  const location = useLocation()
  const { itemCount } = useCart()
  const [toggle, setToggle] = useState(false)
  const [scroll, setScroll] = useState(false)

  const checkoutPath = itemCount > 0 ? '/checkout' : '/cart'

  useEffect(() => {
    window.scrollTo(0, 0)

    const windowScroll = () => {
      setScroll(window.scrollY > 50)
    }

    window.addEventListener('scroll', windowScroll)

    return () => {
      window.removeEventListener('scroll', windowScroll)
    }
  }, [location.pathname])

  const closeMobileMenu = () => setToggle(false)

  const navLinkClass = ({ isActive }) =>
    `sub-menu-item${isActive ? ' active' : ''}`

  return (
    <nav
      id="topnav"
      className={`defaultscroll is-sticky ${scroll ? 'nav-sticky' : ''} ${tagLine ? 'tagline-height' : ''} ${topnavClass ? 'nav-sticky' : ''}`}
    >
      <div
        className={`${topnavClass !== '' && topnavClass !== undefined ? 'container-fluid md:px-8 px-3' : 'container'}`}
      >
        {navClass === '' || navClass === undefined ? (
          <Link className="logo" to="/" onClick={closeMobileMenu}>
            <img src={LogoDark} className="inline-block dark:hidden" alt="" />
            <img src={LogoLight} className="hidden dark:inline-block" alt="" />
          </Link>
        ) : (
          <Link className="logo" to="/" onClick={closeMobileMenu}>
            <span className="inline-block dark:hidden">
              <img src={LogoDark} className="l-dark" height="24" alt="" />
              <img src={LogoLight} className="l-light" height="24" alt="" />
            </span>
            <img src={LogoLight} height="24" className="hidden dark:inline-block" alt="" />
          </Link>
        )}

        <div className="menu-extras">
          <div className="menu-item">
            <Link
              to="#"
              className={`${toggle ? 'open' : ''} navbar-toggle`}
              id="isToggle"
              onClick={() => setToggle(!toggle)}
            >
              <div className="lines">
                <span />
                <span />
                <span />
              </div>
            </Link>
          </div>
        </div>

        <ul className="buy-button list-none mb-0">
          <li className="inline mb-0 relative">
            <Link
              to="/cart"
              className="btn btn-icon bg-primary hover:bg-primary-dark border-primary dark:border-primary text-white! rounded-full!"
              onClick={closeMobileMenu}
            >
              <FiShoppingCart className="size-4 stroke-3" />
            </Link>
            {itemCount > 0 ? (
              <span className="absolute -top-1 -end-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] leading-5 text-center font-medium">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </li>
        </ul>

        <div id="navigation" style={{ display: toggle ? 'block' : 'none' }}>
          <ul
            className={`navigation-menu ${navClass === '' || navClass === undefined ? '' : 'nav-light'} ${topnavClass !== '' && topnavClass !== undefined ? 'justify-center!' : 'justify-end!'}`}
          >
            <li className={isHomePath(location.pathname) ? 'active' : ''}>
              <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li
              className={
                location.pathname === '/products' || location.pathname.startsWith('/products/')
                  ? 'active'
                  : ''
              }
            >
              <NavLink to="/products" className={navLinkClass} onClick={closeMobileMenu}>
                Products
              </NavLink>
            </li>
            <li className={location.pathname === '/cart' ? 'active' : ''}>
              <NavLink to="/cart" className={navLinkClass} onClick={closeMobileMenu}>
                Cart
              </NavLink>
            </li>
            <li
              className={
                location.pathname === '/checkout' || location.pathname === checkoutPath
                  ? 'active'
                  : ''
              }
            >
              <Link to={checkoutPath} className="sub-menu-item" onClick={closeMobileMenu}>
                Checkout
              </Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <NavLink to="/contact" className={navLinkClass} onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
