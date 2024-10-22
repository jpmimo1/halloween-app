'use client'
import { guest, costume } from '@prisma/client';
import React from 'react';
import { ImageWithTransformations } from '../ImageWithTransformations';
import { Card } from '@nextui-org/react';

export interface guestCostume extends guest {
  costume: costume | null
}

interface IProps {
  guest: guestCostume
}

export const ShowInvitation = ({
  guest
}: IProps) => {
  const { photo_costume_url, name: nameGuest, costume } = guest;

  const { name: nameCostume } = costume || {}

  return (
    <div className='w-[450px] flex flex-col items-center gap-4 mx-auto'>
      <h3 className='text-center text-3xl text-primary uppercase font-creepster'>
        {`Congratulations ${nameGuest}, your invitation was confirmed`}
      </h3>
      <Card className='w-[300px] h-[390px] flex justify-center items-center'>
        <ImageWithTransformations url={photo_costume_url} />
      </Card>
      <div className='flex flex-col justify-center items-center flex-wrap'>
        {'You will be dressed as :'} <div className='ml-3 text-primary-400 text-xl font-creepster'>{nameCostume}</div>
      </div>
    </div>
  )
};
