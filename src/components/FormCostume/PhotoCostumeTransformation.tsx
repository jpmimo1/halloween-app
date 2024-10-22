import { costume } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { ImageWithTransformations, StatusImage } from '../ImageWithTransformations'
import { Card } from '@nextui-org/react'
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen'

interface IProps {
  costume?: costume
  photoId: string
  onUrlGenerated?: (urlImage: string) => void
  onStateChange?: (status: StatusImage) => void
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

const transformations = {
  'firstResize': 'c_fill,g_face,h_520,w_400',
  'secondResize': 'b_gen_fill,c_pad,g_south,h_650,w_500',
  'darken': 'e_brightness:-20/e_contrast:40',
  'format': 'f_auto',
  'quality': 'q_auto',
};

const normalizeText = (text: string) => {
  return text
    .replace(/[^a-zA-Z\s]/g, "")
    .toLowerCase();
}

const replacementPromp = 'clothes';

const generateCostumeTransformation = (costume?: costume): string[] => {
  if (!costume) {
    return [];
  }
  let costumeTransformations: string[] = [];
  if (costume.background_promp) {
    const promp = `e_gen_background_replace:prompt_${normalizeText(costume.background_promp)}`;
    costumeTransformations = [...costumeTransformations, promp];
  }

  if (costume.costume_promp) {
    const promp = `e_gen_replace:from_${replacementPromp};to_${normalizeText(costume.costume_promp)}`;
    costumeTransformations = [...costumeTransformations, promp];
  }

  return costumeTransformations;
}


export const PhotoCostumeTransformation = ({
  costume,
  photoId,
  onUrlGenerated = () => { },
  onStateChange = () => { }
}: IProps) => {
  const [imageCld, setImageCld] = useState<CloudinaryImage | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (photoId === '') {
      setImageCld(null);
    }

    const imagePrev = cld.image(photoId);
    imagePrev.addTransformation(
      [
        transformations.firstResize,
        transformations.secondResize,
        ...generateCostumeTransformation(costume),
        transformations.darken,
        transformations.format,
        transformations.quality
      ].join('/')
    );

    setImageCld(imagePrev);

  }, [costume, photoId]);

  useEffect(() => {
    if (!imageCld) {
      setImageUrl('');
      return;
    }
    setImageUrl(imageCld.toURL());
  }, [imageCld]);


  useEffect(() => {
    onUrlGenerated(imageUrl);
  }, [imageUrl]);


  return (
    <Card className='w-[300px] h-[390px] flex justify-center items-center'>
      <ImageWithTransformations url={imageUrl} onStateChange={onStateChange} />
    </Card>
  )
}
