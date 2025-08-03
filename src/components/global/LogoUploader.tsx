import { useEffect, useState } from "react";
import camera from "../../assets/icons/cam.svg";
import {
  getImageDimensions,
  ImageSizeAndDimensionChecker,
} from "../../utils/utils";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import { X } from "lucide-react";

type LogoUploaderProps = {
  register: any;
  setValue: any;
  height?: string;
  fieldName: string;
  data?: any;
  imageWidth?: string;
  imageheight?: string;
  clickHereRef: string;
  errors?: any;
  title?: string;
  sizeTitle?: string;
  dimension: any;
  cameraWidth?: string;
  hideDimension?: boolean;
  trigger?: any;
  isRequired?: boolean;
  borderRadius?: string;
  readonly?: boolean;
};

const LogoUploader = ({
  register,
  setValue,
  height,
  fieldName,
  data,
  imageWidth,
  errors,
  clickHereRef,
  title,
  sizeTitle,
  cameraWidth,
  dimension,
  hideDimension,
  trigger,
  borderRadius,
  imageheight,
  isRequired = true,
  readonly = false,
}: LogoUploaderProps) => {
  const [preview, setPreview] = useState(data ? data : "");
  const { image_uploader }: DictionaryType = useGetDictionary();
  useEffect(() => {
    setPreview(data);
  }, [data]);
  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const file = e.target.files[0];
    if (file) {
      try {
        const { width, height } = await getImageDimensions(file);
        if (
          !ImageSizeAndDimensionChecker(
            width,
            height,
            dimension[0],
            dimension[1],
            file.size
          )
        ) {
          e.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setValue(fieldName, reader.result);
          trigger && trigger(fieldName, reader.result);
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
      } catch (error) {
        console.error("Error reading image:", error);
      }
    }
  };

  return (
    <div className="dark:bg-primaryLight py-2 px-4 dark:rounded-xl">
      {!preview ? (
        <>
          <div className=" text-center  text-sm ">
            <>
              <input
                type="file"
                hidden
                id={clickHereRef}
                {...register(fieldName, {
                  required: isRequired,
                })}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
              <div className="flex gap-2 justify-center items-center mobile:flex-col">
                <img loading="lazy"
                  src={camera}
                  alt="camera"
                  className={`${cameraWidth || "w-[55px]"}`}
                />
                <div className="flex flex-col text-start items-start">
                  <p className="font-bold text-sm">
                    {image_uploader?.click}
                    <label
                      htmlFor={clickHereRef}
                      className="text-red-500 mx-1 cursor-pointer"
                    >
                      {image_uploader?.here}
                    </label>
                    {image_uploader?.to_upload} {title}
                  </p>

                  <p className="block text-xs mt-1  ">
                    {!hideDimension && (
                      <>
                        <p className="inline"> {dimension[0]}</p>
                        <X className="inline w-3" />
                        <p className="inline">
                          {dimension[1]} Px, PNG, JPG{" "}
                          {image_uploader?.max_size_5MB}
                        </p>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <div
            className={` flex flex-col  rounded-full ${
              borderRadius ? borderRadius : ""
            } overflow-hidden  gap-2 justify-center items-center `}
          >
            <img loading="lazy"
              src={preview}
              alt="Uploaded"
              className={` ${imageWidth ? imageWidth : "w-[80px]"} ${
                borderRadius ? borderRadius : "rounded-md"
              } ${
                imageheight ? imageheight : "h-full"
              }  border object-cover   shadow-md `}
            />
          </div>
          {!readonly && (
            <label
              onClick={() => setPreview("")}
              className="text-red-500 mx-1 font-medium text-sm   cursor-pointer"
            >
              {image_uploader?.remove} {image_uploader?.logo}
            </label>
          )}
        </div>
      )}

      {errors?.[fieldName] && !preview && (
        <p className="text-red-500 text-sm mt-2 block ">
          {"Please upload image"}
        </p>
      )}
    </div>
  );
};

export default LogoUploader;
