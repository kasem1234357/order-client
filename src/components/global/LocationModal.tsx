import React from "react";
import ModalButton from "./ModalButton";
import locationIcon from "../../assets/icons/AddressInputimage.svg";
import MapComponent from "./MapComponent";
import Map from "./Map";
import closeIcon from "../../assets/icons/close.svg";
import { useGetDictionary } from "../../hooks/useGetDictionary";
import { DictionaryType } from "../../types";
const LocationModalContent = ({
  setValue,
  toggleModal,
  lat,
  lng,
  address,
}: any) => {
  const { map, shared }: DictionaryType = useGetDictionary();
  return (
    <div className="w-full relative">
      <h3 className="text-center text-2xl text-primary dark:text-white py-2">
        {map?.pick_up_location}
      </h3>

      <div className="px-5">
        <MapComponent
          setLat={(lat) => setValue("lat", lat)}
          setLng={(lon) => setValue("lon", lon)}
          setGeoLocation={(geoLocation) => {
            setValue("geo_location", geoLocation);
            setValue("address", geoLocation);
          }}
          height="300px"
          lat={lat}
          lng={lng}
        />
      </div>
      <div className=" flex justify-center py-2   ">
        {/* <img loading="lazy" width={40} src={closeIcon} alt="" /> */}
        <p
          onClick={toggleModal}
          className="px-10 py-1 hover:cursor-pointer text-lg   rounded-lg hover:bg-red-600 hover:text-white transition duration-300 border-red-600 border text-red-600 w-fit"
        >
          {shared.close}
        </p>
      </div>
    </div>
  );
};

const LocationModal = ({ setValue, lat, lng, address }: any) => {
  return (
    <ModalButton
      buttonContent={
        <div className="w-fit h-fit  rounded-lg ">
          <img loading="lazy" className=" w-8" src={locationIcon} alt="" />
        </div>
      }
      portal={true}
      modalContent={
        <LocationModalContent
          lat={lat}
          lng={lng}
          setValue={setValue}
          address={address}
        />
      }
    />
  );
};

export default LocationModal;
