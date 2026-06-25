import React from 'react'
import image1 from '../assets/images/client/amazon.svg'
import image2 from '../assets/images/client/google.svg'
import image3 from '../assets/images/client/lenovo.svg'
import image4 from '../assets/images/client/paypal.svg'
import image5 from '../assets/images/client/shopify.svg'
import image6 from '../assets/images/client/spotify.svg'

export default function Partner() {
  return (
        <section className="pt-10">
            <div className="container relative">
                <div className="grid md:grid-cols-6 grid-cols-2 justify-center gap-7.5">
                    <div className="mx-auto py-4">
                        <img src={image1} className="h-6" alt=""/>
                    </div>

                    <div className="mx-auto py-4">
                        <img src={image2} className="h-6" alt=""/>
                    </div>
                    
                    <div className="mx-auto py-4">
                        <img src={image3} className="h-6" alt=""/>
                    </div>
                    
                    <div className="mx-auto py-4">
                        <img src={image4} className="h-6" alt=""/>
                    </div>
                    
                    <div className="mx-auto py-4">
                        <img src={image5} className="h-6" alt=""/>
                    </div>
                    
                    <div className="mx-auto py-4">
                        <img src={image6} className="h-6" alt=""/>
                    </div>
                </div>
            </div>
        </section>
  )
}
