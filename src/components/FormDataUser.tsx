'use client'

import React, { useEffect, useState } from 'react'
import { UploadValidImageShow } from './UploadValidImageShow'
import { Button, Input } from '@nextui-org/react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const FormDataUser = () => {
  const router = useRouter();
  const [guestName, setGuestName] = useState('');
  const [imageId, setImageId] = useState('');

  const [guestNameError, setGuestNameError] = useState('');
  const [imageIdError, setImageIdError] = useState('');

  const validateForm = (): boolean => {
    if (guestName === '') {
      setGuestNameError('Please enter a valid Name');
    }

    if (imageId === '') {
      setImageIdError('Please select a valid Photo');
    }

    return guestName !== '' && imageId !== '';
  };

  useEffect(() => {
    if (guestNameError && guestName) {
      setGuestNameError('');
    }
  }, [guestName]);

  useEffect(() => {
    if (imageIdError && imageId) {
      setImageIdError('');
    }
  }, [imageId]);

  const continueHandler = () => {
    const isValid = validateForm();

    if (isValid) {
      setCookie('guestName', guestName);
      setCookie('photoId', imageId);
      router.push('/costume');
    }
  };

  return (
    <div className='max-w-[250px] flex flex-col gap-5 mx-auto'>
      <div>
        <p className='text-center mb-1 text-primary'>Select your photo</p>
        <UploadValidImageShow
          onImageSelect={(imageSelect) => { setImageId(imageSelect); }}
          errorMessage={imageIdError}
          isInvalid={!!imageIdError}
        />
      </div>
      <Input
        value={guestName}
        onChange={(e) => { setGuestName(e.target.value) }}
        size='md'
        type="text"
        label="Name"
        placeholder='Enter your name'
        isInvalid={!!guestNameError}
        errorMessage={guestNameError}
        variant='bordered'
      />
      <Button
        color='primary'
        onClick={() => {
          continueHandler();
        }}
      >
        Continue
      </Button>
    </div>
  )
}
