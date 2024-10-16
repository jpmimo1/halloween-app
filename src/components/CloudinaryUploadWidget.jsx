"use client";

import { axiosResponseHandler } from "@/utils/client/axiosResponseHandler";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const generateSignature = (callback, paramsToSign) => {
  axios.post("/cloudinary/signUploadWidget", paramsToSign).then((resp) => {
    const signature = axiosResponseHandler(resp);

    callback(signature);
  });
};

const CloudinaryUploadWidget = ({ setImageData }) => {
  const [loaded, setLoaded] = useState(false);
  const [widgetCreated, setWidgetCreated] = useState(false);
  const buttonRef = useRef(null);
  const widgetRef = useRef(null);

  const createWidget = async () => {
    try {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          resourceType: "image",
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          folder: "halloween_guests",
          multiple: false,
          sources: ["local", "url", "camera"],
          detection: "human-anatomy",
          clientAllowedFormats: ["gif", "png", "webp", "jpg", "jpeg"],
          uploadSignature: generateSignature,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setImageData(result.info);
          }
        }
      );

      setWidgetCreated(true);
    } catch (ex) {
      setWidgetCreated(false);
      console.error(ex);
    }
  };

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      }
    } else {
      createWidget();
    }
  }, [loaded]);

  const initializeCloudinaryWidget = async () => {
    widgetRef.current.open();
  };

  if (!loaded || !widgetCreated) {
    return null;
  }

  return (
    <button ref={buttonRef} onClick={initializeCloudinaryWidget}>
      Upload
    </button>
  );
};

export { CloudinaryUploadWidget };
