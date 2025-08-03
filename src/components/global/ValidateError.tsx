import React from "react";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";

type propsType = {
  errorMessage?: string | undefined | any;
  customStyle?: string;
};
const ValidateError = ({ errorMessage, customStyle }: propsType) => {
  const { shared }: DictionaryType = useGetDictionary();
  return (
    <p className={`${customStyle} text-red-500 text-sm mt-1 `}>
      {errorMessage ? errorMessage : shared.this_filed_is_required}
    </p>
  );
};

export default ValidateError;
