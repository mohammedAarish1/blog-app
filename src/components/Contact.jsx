import React, { useRef } from 'react'
import Button from './Button'
// import emailjs from '@emailjs/browser';

export default function Contact() {

    // const form = useRef();


    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs
    //         .sendForm('service_madjr6z', 'template_363n9ij', form.current, {
    //             publicKey: 'fUQ68sl_vOgF2uC8u',
    //         })
    //         .then(
    //             () => {
    //                 console.log('SUCCESS!');
    //                 alert('Email Sent')
    //                 e.target = ''
    //             },
    //             (error) => {
    //                 console.log('FAILED...', error.text);
    //             },
    //         );
    // };

    return (
        <section id="contact">
            <div className='md:px-[100px] px-[30px] py-5 relative'>
                <div className='mainGradient absolute sm:top-60 sm:right-0  '></div>
                <div className='mainGradient absolute left-0'></div>
                {/* <div className='mainGradient absolute xm:right-0 -bottom-[100px]'></div> */}

                <h2 className=' text-center text-3xl font-bold'> Contact us</h2>

                <div className='grid md:grid-cols-2 gap-2 mt-5 bg-[#36474D] sm:justify-items-stretch justify-items-center  rounded-xl sm:p-8 p-4'>
                    <div className='flex justify-center items-center sm:px-4 py-6'>
                        <img src="contact.png" alt="contact" className='w-9/12' />
                    </div>
                    <div className='sm:px-4 py-6'>
                        <form className='flex flex-col gap-6'  >
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='text-white text-xl'>Name</label>
                                <input type="text" id='name' placeholder='Enter Your Name' name='from_name' className='px-4 py-2 rounded-lg text-black border-0 outline-none w-full z-10' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='text-white text-xl'>Email</label>
                                <input type="eamil" id='email' placeholder='Enter Your Email' name='from_email' className='px-4 py-2 rounded-lg text-black border-0 outline-none w-full z-10' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="message" className='text-white text-xl'>Message</label>
                                <textarea name="message" id="message" cols="30" rows="8" className='rounded-lg px-4 py-2 border-0 outline-none w-full text-black z-10' placeholder='Enter Your Message Here' ></textarea>
                            </div>
                            <Button text='Send' />
                            {/* <button type='submit' value='Send' className='lg:px-12 px-5 py-2 mt-3 rounded shadow-sm shadow-[white] font-bold border bg-white text-purple-600 w-max'>Send</button> */}

                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}
