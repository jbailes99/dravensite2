import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

import opgg from '../assets/opgg.jpeg'

const Footer = () => {
  return (
    <footer className='bg-gray-900 py-2 text-white relative'>
      <div className='container mx-auto'>
        <div className='flex justify-center space-x-14 mb-6'>
          <section className='text-center'>
            <a
              href='https://www.op.gg/summoners/euw/razr708x54e3328-5451'
              target='_blank'
              rel='noopener noreferrer'
              className='max-w-xl w-60 inline-block px-4 py-2'
            >
              <img src={opgg} alt='OP.GG Profile' className='inline-block w-12 h-12 mr-2' />
            </a>
          </section>
        </div>

        {/* Copyright */}
        <div className='text-center mt-6'>
          <p className='text-gray-400'>© 2024 Best Draven Player. All rights reserved.</p>
        </div>

        {/* Made with love */}
        <div className='absolute  bottom-0 right-0 p-4 text-gray-400 text-xxs'>
          <p className='flex items-center'>
            made with <FaHeart className='text-red-500 mx-1' /> by yak
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
