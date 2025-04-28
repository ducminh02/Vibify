import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function NavBar() {
  return (
    <header className='py-3 bg-green shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center w-full'>
            <Link href='/'>
                <Image src='/vibify_v2.png' alt='logo' width={80} height={10} />
            </Link>
        </nav>
    </header>
  )
}

export default NavBar