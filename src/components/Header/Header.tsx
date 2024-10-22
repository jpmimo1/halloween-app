import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GiDualityMask } from 'react-icons/gi'

export const Header = () => {
  return (
    <header className='border-b-divider border-b py-3 fixed w-full z-10 top-0 bg-background/85 backdrop-blur-sm'>
      <div className='mainContainer  flex justify-between items-center'>
        <Link href={'/'} className='flex gap-1 md:gap-3 items-center'>
          <Image src={'/assets/homeIcon.png'} width={150} height={150} alt='home' className='w-[50px] h-auto' />
          <div className='font-creepster font text-lg md:text-2xl pt-2 text-primary-300'>Halloween Party</div>
        </Link>
        <Button href='/guests' as={Link} color='primary' variant='ghost' endContent={<GiDualityMask />} className='uppercase'>
          See all guests
        </Button>
      </div>
    </header>
  )
}
