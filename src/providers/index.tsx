'use client'
import React, { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';


interface IProps {
  children: ReactNode
}

export const Providers = ({ children }: IProps) => {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}
