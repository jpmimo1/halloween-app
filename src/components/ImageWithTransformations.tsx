import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaUser } from 'react-icons/fa';

interface IProps {
  url: string
  onStateChange?: (status: StatusImage) => void
}

const fetchImageData = async (url: string) => {
  try {

    const resp = await axios({ method: 'GET', url, responseType: 'blob' });

    if (resp.status === 200) {
      return URL.createObjectURL(resp.data);
    }
    else {
      return ''
    }
  } catch (ex) {
    console.error(ex);
    return '';
  }
}

export type StatusImage = 'success' | 'loading' | 'error';

const maxTryings = 5;

const createPause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

export const ImageWithTransformations = (
  { url, onStateChange = () => { } }: IProps
) => {
  const [imageUrlBlob, setImageUrlBlob] = useState('');
  const tryings = useRef(0);
  const [currentState, setCurrentState] = useState<StatusImage>('loading');

  const getImageHandle = async () => {
    tryings.current = 0;
    while (tryings.current <= maxTryings) {
      const imageData = await fetchImageData(url);
      if (imageData === '') {
        setCurrentState('loading');
        await createPause();
        tryings.current = tryings.current + 1;
      }
      else if (imageData) {
        setImageUrlBlob(imageData);
        setCurrentState('success');
        return;
      }
    }
    setCurrentState('error');
  };


  useEffect(() => {
    if (url) {
      setCurrentState('loading');
      getImageHandle();
    }
  }, [url]);

  useEffect(() => {
    onStateChange(currentState);
  }, [currentState])

  if (url === '') {
    return <FaUser size={150} />;
  }
  if (currentState === 'loading') {
    return <Spinner size='lg' />
  }
  if (currentState === 'success') {
    return <Image src={imageUrlBlob} alt='photo' width={500} height={500} className='w-full h-auto' />
  }
  return <FaUser size={150} />;
}
