"use client";

import { axiosResponseHandler } from "@/utils/client/axiosResponseHandler";
import { Button, Card } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ImageWithTransformations } from "./ImageWithTransformations";
import classNames from "classnames";

const generateSignature = (callback, paramsToSign) => {
  axios.post("/cloudinary/signUploadWidget", paramsToSign).then((resp) => {
    const signature = axiosResponseHandler(resp);

    callback(signature);
  });
};

const CloudinaryUploadWidget = ({
  setImageData,
  url,
  isInvalid = false,
  errorMessage = "",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [widgetCreated, setWidgetCreated] = useState(false);
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

  const loadWidget = () => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    } else {
      createWidget();
    }
  };

  useEffect(() => {
    loadWidget();
  }, [loaded]);

  const initializeCloudinaryWidget = async () => {
    widgetRef.current.open();
  };

  if (!loaded || !widgetCreated) {
    return null;
  }

  return (
    <>
      <Card
        className={classNames(
          "w-[250px] h-[250px] flex justify-center items-center",
          { "border-danger border-2": isInvalid }
        )}
        isPressable
        onClick={initializeCloudinaryWidget}
      >
        <ImageWithTransformations url={url} />
      </Card>
      {isInvalid ? (
        <div className="text-tiny text-danger">{errorMessage}</div>
      ) : null}
      <div className="flex justify-end mt-2">
        <Button color="primary" onClick={initializeCloudinaryWidget}>
          Upload photo
        </Button>
      </div>
    </>
  );
};

export { CloudinaryUploadWidget };
