import React from 'react'
import ContactForm from '../Components/ContactPage/ContactForm'
import ContactDetails from '../Components/ContactPage/ContactDetails'

const Contact = () => {
  return (
    <div>
    <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-row justify-between gap-10 text-white lg:flex-row"'>
    {/* contactdetails */}
    <div className='lg:w-[40%]'>
    <ContactDetails/>
    </div>
    {/* conatctform */}
    <div className='lg:w-[60%]'>
    <ContactForm/>
    </div>
    </div>
    

    </div>
  )
}

export default Contact
