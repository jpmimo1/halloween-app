'use client'
import React, { useEffect, useState } from 'react';
import { CloudinaryUploadWidget } from './CloudinaryUploadWidget';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { toast } from 'react-toastify';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validPhoto = (imageData: any | null) => {
  if (
    !imageData ||
    !imageData.info ||
    !imageData.info.detection ||
    !imageData.info.detection.object_detection ||
    !imageData.info.detection.object_detection.data ||
    !imageData.info.detection.object_detection.data['human-anatomy'] ||
    !imageData.info.detection.object_detection.data['human-anatomy'].tags
  ) {
    return false;
  }

  const tags = imageData.info.detection.object_detection.data['human-anatomy'].tags;

  const leftFace = tags['left-face'];
  const rightFace = tags['right-face'];

  if (!leftFace || !rightFace) {
    return false;
  }

  return true;
};


const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});


interface IProps {
  onImageSelect: (imageId: string) => void
  isInvalid?: boolean
  errorMessage?: string
}

export const UploadValidImageShow = ({
  onImageSelect,
  errorMessage = '',
  isInvalid = false
}: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imageData, setImageData] = useState<any | null>(null);
  const [imageCld, setImageCld] = useState<CloudinaryImage | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!imageData) {
      return;
    }
    const isValid = validPhoto(imageData);
    if (!isValid) {
      toast.warn('Invalid image. Please select a photo with your face.');
      return;
    }

    generateCldImage();
  }, [imageData]);

  const generateCldImage = () => {
    if (!imageData || !imageData.public_id) {
      setImageCld(null);
    }

    const imagePrev = cld.image(imageData.public_id);

    imagePrev
      .resize(fill().width(400).height(400).gravity(focusOn(face())))
      .format('auto')
      .quality('auto');

    // .resize(pad().width(500).height(600).background(generativeFill()))
    // .effect(generativeBackgroundReplace().prompt('cemetery at night with fog'))
    // .effect(generativeReplace().from('clothes').to('vampire costume'))

    setImageCld(imagePrev);
  }


  useEffect(() => {
    if (imageCld) {
      setImageUrl(imageCld.toURL());
      onImageSelect(imageData.public_id);
    }
  }, [imageCld]);

  return (
    <>
      <CloudinaryUploadWidget
        setImageData={setImageData}
        url={imageUrl}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
      />
    </>
  );
}
