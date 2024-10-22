'use client'

import React from 'react'
import { guestCostume } from './ShowInvitation/ShowInvitation'
import { Card } from '@nextui-org/react'
import { ImageWithTransformations } from './ImageWithTransformations'

interface IProps {
  guests: guestCostume[]
}

export const GridGuests = ({ guests }: IProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {
        guests.map((guest) => {
          const { photo_costume_url, name: guestName, costume } = guest;

          const { name: costumeName } = costume || {};

          return (
            <div>
              <Card className='flex justify-center items-center'>
                <ImageWithTransformations url={photo_costume_url} />
              </Card>
              <div className='text-center text-xl'>{guestName}
                <div className='flex text-medium justify-center gap-3'>
                  Costume:
                  <div className='font-creepster text-primary text-lg'>{costumeName}</div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}
