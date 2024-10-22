'use client'

import { Pagination } from '@nextui-org/react';
import React from 'react'
import { useRouter } from 'next/navigation'

interface IProps {
  total: number,
  currentPage: number,
  baseUrl: string
}

export const PaginationGuests = ({
  total,
  currentPage,
  baseUrl
}: IProps) => {
  const router = useRouter();

  const onChangePage = (page: number) => {
    router.push(`/${baseUrl}/${page}`);
  };

  return (
    <div className='flex justify-center'>
      <Pagination
        total={total}
        color='primary'
        page={currentPage}
        onChange={onChangePage}
        showControls
      />
    </div>
  )
};
