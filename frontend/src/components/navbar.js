import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-gray-800 p-6 relative'>
      <div className='container mx-auto flex items-center justify-center'>
        {/* Left-aligned username */}
        <div className='absolute left-12 text-red-500 text-3xl font-bold'>
          <Link to='/'>bestdraven.world</Link>
        </div>

        {/* Centered links */}
        <div className='flex justify-end space-x-12 text-xl bg-gray-800 rounded-lg'>
          <Link to='/' className=' py-2 text-gray-300 hover:text-white transition duration-300 ease-in-out'>
            Home
          </Link>
          <Link to='/profile' className=' py-2 text-gray-300 hover:text-white transition duration-300 ease-in-out'>
            Recent Matches
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
