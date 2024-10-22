'use client'

import { Autocomplete, AutocompleteItem, Button, Tooltip } from '@nextui-org/react'
import { costume } from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import { PhotoCostumeTransformation } from './PhotoCostumeTransformation'
import { FaRandom } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StatusImage } from '../ImageWithTransformations'
import { axiosResponseHandler } from '@/utils/client/axiosResponseHandler'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

interface IProps {
  listCostumes: costume[],
  photoId: string,
  guestName: string
}

export const FormCostume = (
  {
    listCostumes = [],
    photoId,
    guestName
  }: IProps
) => {
  const router = useRouter();
  const [keyCostume, setKeyCostume] = useState<null | string>(null);
  const [statePhoto, setStatePhoto] = useState<StatusImage>('loading');
  const [photoCostume, setPhotoCostume] = useState<string>('');
  const [keyCostumeError, setKeyCostumeError] = useState('');
  const [createGuestLoading, setCreateGuestLoading] = useState(false);

  const costumeSelect = useMemo(() => {
    return listCostumes.find(({ id }) => id === keyCostume);
  }, [keyCostume]);

  const selectRandomCostume = () => {
    const randonIndex = Math.floor(Math.random() * (listCostumes.length));
    setKeyCostume(listCostumes[randonIndex].id);
  };

  const onConfirm = async () => {
    try {
      setCreateGuestLoading(true);

      if (!keyCostume) {
        setKeyCostumeError('Please select a costume');
        return;
      }

      const dataGuest = {
        costumeId: keyCostume,
        name: guestName,
        photo_costume_url: photoCostume,
        photo_id: photoId,
      };

      const resp = await axios.post('/api/db/costume/createGuest', dataGuest);

      const { guestId } = axiosResponseHandler<{ guestId: string }>(resp);

      toast.success(`${guestName}'s invitation confirmed successfully!`);

      setCookie('guestId', guestId);

      router.push('/');
    } catch (ex) {
      toast.error(ex as string);
    } finally {
      setCreateGuestLoading(false);
    }
  };

  useEffect(() => {
    if (keyCostumeError && keyCostume) {
      setKeyCostumeError('');
    }
  }, [keyCostume]);

  return (
    <div className='flex flex-col gap-4 w-[300px] mx-auto'>
      <div className='flex gap-2'>
        <Autocomplete
          label='Select a costume'
          onSelectionChange={(key) => {
            setKeyCostume(key?.toString() || null);
          }}
          selectedKey={keyCostume}
          size='sm'
          errorMessage={keyCostumeError}
          isInvalid={keyCostumeError !== ''}
          variant='bordered'
        >
          {listCostumes.map((costume) => (
            <AutocompleteItem key={costume.id} value={costume.id}>{costume.name}</AutocompleteItem>
          ))}
        </Autocomplete>
        <Tooltip content="Random costume">
          <Button
            isIconOnly
            size='lg'
            color='primary'
            onClick={() => { selectRandomCostume() }}
          >
            <FaRandom />
          </Button>
        </Tooltip>
      </div>
      <PhotoCostumeTransformation
        costume={costumeSelect}
        photoId={photoId}
        onUrlGenerated={(photoUrl) => { setPhotoCostume(photoUrl); }}
        onStateChange={(state) => { setStatePhoto(state); }}
      />

      {
        costumeSelect ?
          <div className='flex flex-col justify-center items-center flex-wrap'>
            {`${guestName} will be dressed as :`} <div className='ml-3 text-primary-400 text-xl font-creepster'>{costumeSelect.name}</div>
          </div> :
          null
      }

      <Button
        size='lg'
        color='primary'
        isLoading={statePhoto === 'loading' || createGuestLoading}
        onClick={() => { onConfirm() }}
      >
        Confirm
      </Button>
    </div>
  )
}
