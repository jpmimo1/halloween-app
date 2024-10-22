'use client'

import { Button } from '@nextui-org/react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GiDualityMask } from 'react-icons/gi'

export const Header = () => {

  const [scrollYOpVal, setScrollYOpVal] = useState<number>(0);
  const scrollYPrev = useRef<number>(0);
  const timeoutOp = useRef<NodeJS.Timeout>();

  const onScrollEvent = (e: Event) => {
    if (timeoutOp.current) {
      clearTimeout(timeoutOp.current);
    }

    if (Math.abs(scrollYOpVal - window.scrollY) > 200) {
      setScrollYOpVal(window.scrollY);
    }

    timeoutOp.current = setTimeout(() => {
      setScrollYOpVal(window.scrollY);
    }, 100);
  }


  useEffect(() => {
    setScrollYOpVal(window.scrollY);
    scrollYPrev.current = window.scrollY;
    document.addEventListener('scroll', onScrollEvent);

    return () => {
      document.removeEventListener('scroll', onScrollEvent);
    }
  }, []);

  const showHeader = useMemo(() => {
    let valueR = true;
    if (scrollYOpVal === 0) {
      valueR = true;
    }

    if (scrollYOpVal - scrollYPrev.current > 0) {
      valueR = false;
    }
    else {
      valueR = true;
    }

    scrollYPrev.current = scrollYOpVal;
    return valueR;
  }, [scrollYOpVal]);

  return (
    <header
      className={
        classNames(
          'border-b-divider border-b py-3 fixed w-full z-10 top-0 bg-background/85 backdrop-blur-sm transition-transform duration-300 shadow-md',
          { '-translate-y-full': !showHeader }
        )
      }
    >
      <div className='mainContainer  flex justify-between items-center'>
        <Link href={'/'} className='flex gap-1 md:gap-3 items-center'>
          <Image src={'/assets/homeIcon.png'} width={150} height={150} alt='home' className='w-[50px] h-auto md:w-[70px] ' />
          <div className='font-creepster font text-lg md:text-2xl lg:text-3xl pt-2 text-primary-300'>Halloween Party</div>
        </Link>
        <Button href='/guests' as={Link} color='primary' variant='ghost' endContent={<GiDualityMask />} className='uppercase'>
          See all guests
        </Button>
      </div>
    </header>
  )
}
