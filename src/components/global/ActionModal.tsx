import React from "react";
import { useActivateCoacheMutation } from "../../lib/redux/services/sections/Coaches";
import { toast } from "react-toastify";
import { toastMessage } from "../../utils/utils";
import logo from "../../assets/icons/logo.png";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
import Button from "../global/Button";

type propsType = {
  toggleModal?: () => void;
  useApiAction?: any;
  ApiBody?: any;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  firstButtonTitle?: string;
  secondButtonTitle?: string;
  firstButtonClassName?: string;
  secondButtonClassName?: string;
  buttonsContainerClassName?: string;
  firstButtonCallback?: any;
  secondButtonCallback?: any;
};
const ActionModal = ({
  toggleModal,
  useApiAction,
  ApiBody,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  buttonsContainerClassName,
  firstButtonTitle,
  firstButtonClassName,
  firstButtonCallback,
  secondButtonCallback,
  secondButtonTitle,
  secondButtonClassName,
}: propsType) => {
  const [apiAction] = useApiAction() || [null];

  const apiActionHandler = async () => {
    try {
      await toast.promise(apiAction(ApiBody).unwrap(), toastMessage());
      toggleModal && toggleModal();
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-8 px-12 py-5 ">
      <div className="flex flex-col justify-center items-center gap-4 text-center ">
        <img loading="lazy" width={200} height={200} src={logo} alt="mocion-logo" />
        <div>
          <h2
            className={` text-3xl text-primary dark:text-white ${titleClassName}`}
          >
            {title}
          </h2>
          <p
            className={`text-lg font-normal  text-[#1E1850] dark:text-white break-words leading-relaxed whitespace-pre-wrap ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        </div>
        <div
          className={`mt-6 flex flex-col items-center justify-center gap-6  w-full ${buttonsContainerClassName}`}
        >
          <Button
            customeStyle={`bg-primary text-white dark:text-primary dark:bg-primaryYellow  w-full rounded-full text-lg py-4 ${firstButtonClassName}`}
            text={firstButtonTitle || ""}
            width="max-w-[400px] w-full"
            onClick={() => {
              firstButtonCallback
                ? firstButtonCallback()
                : toggleModal && toggleModal();
            }}
          />

          <Button
            customeStyle={`bg-white text-primary dark:text-white dark:bg-primary  w-full rounded-full border border-primary hover:bg-[#f3f3f3]  text-lg py-4 ${secondButtonClassName} `}
            text={secondButtonTitle || ""}
            width="max-w-[400px] w-full"
            onClick={() => {
              secondButtonCallback
                ? secondButtonCallback()
                : apiActionHandler();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
