import { v2 as cloudinary, SignApiOptions } from 'cloudinary';
import './init';



const apiSecret = cloudinary.config().api_secret;

const signUploadWidget = (params: SignApiOptions) => {
  if (!apiSecret) {
    throw 'Failed signature'
  }

  const signature = cloudinary.utils.api_sign_request(params, apiSecret);

  return signature;
}

export { signUploadWidget };
