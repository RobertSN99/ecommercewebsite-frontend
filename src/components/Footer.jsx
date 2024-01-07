import React from 'react'
import {ImGithub} from "react-icons/im"
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa"
import {logoDark, payment} from "../assets/index"

const Footer = () => {

  return (
    <div id='footer' className='bg-black text-[#949494] sm:p-4 py-20 font-titleFont'>
        <div className='max-w-screen-xl mx-auto flex items-center justify-between md:px-24 lg:px-48 xl:px-56'>
            <div className='flex flex-col gap-7'>
                <img className='w-32' src={logoDark} alt="logoLight" />
                <p className="text-white text-sm tracking-wide">© TimeHub.com</p>
                <img className='w-56 sm:w-32' src={payment} alt="payment" />
                <div className='flex gap-5 text-lg sm:text-sm text-gray-400'>
                    <a href='https://github.com/RobertSN99/' target='_blank'><ImGithub className='hover:text-white duration-300 cursor-pointer'/></a>
                    <a href='https://www.linkedin.com/in/robert-spinoiu-06a9b120a/' target='_blank'><FaLinkedin className='hover:text-white duration-300 cursor-pointer'/></a>
                    <a href='' target='_blank'><FaFacebookF className='hover:text-white duration-300 cursor-pointer'/></a>
                    <a href='' target='_blank'><FaTwitter className='hover:text-white duration-300 cursor-pointer'/></a>
                    <a href='https://instagram.com/srobertn99' target='_blank'><FaInstagram className='hover:text-white duration-300 cursor-pointer'/></a>
                </div>
            </div>
            <div className='text-base flex flex-col gap-2'>
                <h2 className='sm:text-xl text-2xl font-semibold text-white mb-4'>LOCATE US</h2>
                <div className="sm:text-sm sm:h-32">
                    <p>Pitesti, Romania</p>
                    <p>Telefon: 0737039952</p>
                    <p>E-mail: robertsrn15@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer