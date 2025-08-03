import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "react-phone-input-2/lib/bootstrap.css";

import "react-phone-input-2/lib/high-res.css";

import ar from "react-phone-input-2/lang/ar.json";
import { useSelector } from "react-redux";

interface PhoneNumberInputProps {
  name: string;
  value: string;
  handleChange: (value: string, countryCode: string) => void; // Accepts value and country code
  label?: string;
  margin?: string;
  field?: any;
  countryCode?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  name,
  value,
  handleChange,
  label,
  margin,
  isDisabled = false,
  field,
  countryCode,
  isRequired = true,
}) => {
  const handlePhoneInputChange = (value: string, countryData: any) => {
    const countryCode = countryData.countryCode; // Get the country code (e.g., "ae")
    handleChange(`+${value}`, countryCode); // Pass value and country code to the parent
  };
  const [country, setCountry] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (!value) setCountry(data.address.country_code);
          console.log(data.address.country_code);
          //setCountry(data.address.country);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  return (
    <div className={`flex flex-col ${margin || ""} text-gray-700`}>
      {label && (
        <label className="text-sm font-medium mb-2 text-primary dark:text-white">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        dir="ltr"
        className="relative text-xs text-[#747474] shadow-none   dark:text-white bg-white dark:bg-primaryLight rounded-lg "
      >
        <PhoneInput
          // {...field}

          countryCodeEditable={false}
          country={country ? country : "ae"}
          disabled={isDisabled}
          value={value}
          onChange={handlePhoneInputChange}
          inputProps={{
            name: name,
            id: name,
            onblur: field?.onBlur,
            ref: field?.ref,
          }}
          buttonStyle={{
            backgroundColor: "transparent",
            outline: "none",
            boxShadow: "none",
          }}
          buttonClass="outline-none"
          dropdownClass="customScroll text-primary"
          inputStyle={{
            fontSize: "13px",
            color: "inherit",
            backgroundColor: isDisabled ? "#f3f3f3" : "transparent",
            border: "1px solid #d1d5db",
            outline: "none",
            // borderRadius: "0.5rem",
            width: "100%",
            height: "40px",
            boxShadow: "none",
          }}
          enableSearch
          disableSearchIcon
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
