'use client'
import { AdvancedImage } from '@cloudinary/react';
import React, { useEffect, useMemo, useState } from 'react';
import { CloudinaryUploadWidget } from './CloudinaryUploadWidget';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { backgroundRemoval, dropShadow } from '@cloudinary/url-gen/actions/effect';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

export const UploadValidImageShow = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageData, setImageData] = useState<any | null>(null);

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  const imageCld = useMemo(() => {
    if (!imageData || !imageData.public_id) {
      return null;
    }

    const imagePrev = cld.image(imageData.public_id);

    imagePrev
    .effect(backgroundRemoval())
    // .effect(dropShadow().azimuth(90).elevation(45).spread(50))
    .resize(scale().width(500).height(600))
    .format('auto')
    .quality('auto')

    return imagePrev;

  }, [imageData]);

  useEffect(() => {
    if (imageCld) {
      console.log(imageCld.toURL())
    }
  }, [imageCld]);

  return (
    <>
      <CloudinaryUploadWidget setImageData={setImageData} />
      {imageCld ? <AdvancedImage cldImg={imageCld} /> : null}
    </>
  )
}
