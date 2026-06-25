import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ScrollToTop(){
    const [visible, setVisible] = useState(false) 
  
    const toggleVisible = () => { 
      const scrolled = document.documentElement.scrollTop; 
      if (scrolled > 300){ 
        setVisible(true) 
      }  
      else if (scrolled <= 300){ 
        setVisible(false) 
      } 
    }; 
    
    const scrollToTop = () =>{ 
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
      }); 
    }; 
    
    window.addEventListener('scroll', toggleVisible); 
    return(
        <Link to="#" onClick={scrollToTop}  id="back-to-top" className={`back-to-top fixed  text-lg rounded-full z-10 bottom-5 inset-e-5 size-9 text-center bg-primary text-white justify-center items-center ${visible ? 'flex' : 'hidden'}`}><FiArrowUp /></Link>
    )
}