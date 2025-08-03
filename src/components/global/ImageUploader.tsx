import { useEffect, useState } from "react";
import camera from "../../assets/icons/cam.svg";
import Modal from "./Modal";
import closeIcon from "../../assets/icons/close.svg";
import Carousel from "./Carousel";
import pdfFile from "../../assets/images/pdfImage.jpg";
import {
  decreaseImageSize,
  getImageDimensions,
  ImageSizeAndDimensionChecker,
  resizeImage,
} from "../../utils/utils";
import { toast } from "react-toastify";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import { X } from "lucide-react";
type ImageUploaderProps = {
  register: any;
  setValue: any;
  height?: string;
  fieldName: string;
  data?: any;
  imageWidth?: string;
  clickHereRef: string;
  errors?: any;
  title?: string;
  imageView?: boolean;
  isRequired?: boolean;
  dimension?: any;
  removeMessage?: string;
  commercial_license_type?: string;
  trn_image_type?: string;
  checkDimension?: boolean;
  hideDimension?: boolean;
  readOnly?: boolean;
};

const ImageUploader = ({
  register,
  setValue,
  height,
  fieldName,
  data,
  imageWidth,
  errors,
  clickHereRef,
  title,
  imageView,
  isRequired,
  dimension,
  removeMessage,
  commercial_license_type,
  trn_image_type,
  checkDimension = false,
  hideDimension = false,
  readOnly = false,
}: ImageUploaderProps) => {
  const { image_uploader }: DictionaryType = useGetDictionary();
  const [preview, setPreview] = useState(data ? data : "");
  const [pdfFileName, setPdfFileName] = useState(
    commercial_license_type == "pdf" || trn_image_type == "pdf" ? "pdf" : ""
  );

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setPreview(data);
  }, [data]);

  // useEffect(() => {
  //   if (preview && pdfFileName) {
  //     setPdfFileName("");
  //   }
  // }, [preview]);
  return (
    <>
      <label htmlFor={!preview && !readOnly ? clickHereRef : ""}>
        <div
          className={` ${
            !preview
              ? `border-primary border-dotted border-2 mb-6 cursor-pointer ${
                  height ? height : "h-[180px]"
                }  bg-white`
              : ""
          } relative flex flex-col dark:bg-primaryLight  justify-center items-center    rounded-lg  gap-5 `}
        >
          {!preview ? (
            <>
              <img loading="lazy" src={camera} alt="camera" className="w-[43px]" />
              <div className=" text-center  text-sm  ">
                <>
                  <input
                    type="file"
                    hidden
                    accept={
                      clickHereRef == "trn_image_upload" ||
                      clickHereRef == "commercial_license"
                        ? "image/*,.pdf"
                        : "image/*"
                    }
                    id={clickHereRef}
                    {...register(fieldName, {
                      required: isRequired ? isRequired : true,
                    })}
                    onChange={async (e) => {
                      //@ts-ignore
                      let file = e.target.files[0];
                      if (file) {
                        if (file.type == "application/pdf") {
                          if (file.size > 5000000) {
                            toast.error("file is larger than 5MB");
                            return;
                          }
                          setPdfFileName(file.name);
                        } else {
                          setPdfFileName("");

                          const { width, height } = await getImageDimensions(
                            file
                          );
                          if (
                            !ImageSizeAndDimensionChecker(
                              width,
                              height,
                              dimension[0],
                              dimension[1],
                              file.size,
                              checkDimension
                            )
                          ) {
                            e.target.value = "";
                            return;
                          }
                        }

                        const reader = new FileReader();
                        reader.onloadend = async () => {
                          // const resizedImage = await resizeImage(
                          //   reader.result,
                          //   dimension[0],
                          //   dimension[1]
                          // );
                          //
                          // setPreview(reader.result);
                          // setValue(fieldName, reader.result);
                          setPreview(reader.result);
                          setValue(fieldName, reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  <p className="font-bold text-sm">
                    {image_uploader?.click}
                    <span
                      //htmlFor={clickHereRef}
                      className="text-red-500 mx-1 cursor-pointer"
                    >
                      {image_uploader?.here}
                    </span>
                    {image_uploader?.to_upload} {title}
                  </p>

                  <p className="block text-xs mt-4  ">
                    {hideDimension ? (
                      image_uploader?.you_can_upload
                    ) : (
                      <>
                        {" "}
                        <p className="inline"> {dimension[0]}</p>
                        <X className="inline w-3" />
                        <p className="inline">{dimension[1]} Px, PNG</p>
                        {clickHereRef == "trn_image_upload" ||
                        clickHereRef == "commercial_license"
                          ? ".PDF"
                          : ""}
                        <br />
                        {image_uploader?.max_size_5MB}
                      </>
                    )}
                  </p>
                </>
              </div>
            </>
          ) : (
            <div className="w-full ">
              {imageView && !pdfFileName && (
                <>
                  <div
                    className={`absolute w-full bg-white/70 z-20 hover:cursor-pointer h-[100%]`}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <div className=" text-center text-primary dark:text-white py-20 h-[inherit] ">
                      <img loading="lazy"
                        src={camera}
                        alt="camera"
                        className="w-[43px] m-auto"
                      />
                      <p>
                        {" "}
                        {image_uploader?.click_to_see} {title} A4
                      </p>{" "}
                    </div>
                  </div>
                  {preview && (
                    <Modal
                      modalMaxWidth="max-w-fit"
                      isOpen={isOpen}
                      onClose={() => {
                        setIsOpen(false);
                      }}
                    >
                      <>
                        <div
                          className=" max-w-fit  hover:cursor-pointer max-h-[700px] w-full "
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          <img loading="lazy"
                            className=" bg-white  left-1 top-2 rounded-full  absolute z-40 "
                            width={35}
                            src={closeIcon}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col items-center max-h-[700px] ">
                          <img loading="lazy" src={preview} alt="commercial_license_url" />
                        </div>
                      </>
                    </Modal>
                  )}
                </>
              )}

              {/* <Carousel images={preview}/> */}

              <div
                className={`${imageWidth ? imageWidth : "w-full"} ${
                  height ? height : "h-full"
                }  group-hover:scale-110 transition-all duration-300 ease-in-out`}
                onClick={() => {
                  if (pdfFileName) {
                    const link = document.createElement("a");
                    link.href = preview; // Assuming `preview` contains the base64 or file URL of the PDF
                    link.download = pdfFileName; // Use the stored filename for download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
                <div
                  style={{
                    backgroundImage: `url('${
                      pdfFileName ? pdfFile : preview
                    }')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </label>
      {preview && !readOnly && (
        <p
          onClick={() => {
            setPreview("");
            setPdfFileName("");
          }}
          className="text-red-500 mx-1 font-medium text-sm cursor-pointer"
        >
          {image_uploader?.remove}{" "}
          {pdfFileName
            ? pdfFileName
            : removeMessage
            ? removeMessage
            : (trn_image_type == "pdf" || commercial_license_type == "pdf") &&
              pdfFileName
            ? "pdf"
            : image_uploader?.image}
        </p>
      )}
      {errors?.[fieldName] && (
        <p className="text-red-500 text-sm mt-4  ">
          {image_uploader?.image_validation}
        </p>
      )}
    </>
  );
};

export default ImageUploader;
